import { NextRequest, NextResponse } from "next/server";
import { submitCustomerForm } from "@/lib/customer-form";
import { checkEnquiryRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-real-ip")?.trim() || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  if (!ip) {
    return NextResponse.json({ error: "Unable to determine client IP" }, { status: 503 });
  }
  try {
    try {
      const rateLimit = await checkEnquiryRateLimit(ip);

      if (!rateLimit.allowed) {
        return NextResponse.json({ error: "Too many enquiry submissions. Please try again later." },
          {
            status: 429,
            headers: {
              "Retry-After": String(rateLimit.retryAfter),
              "Cache-Control": "no-store",
            },
          }
        );
      }
    } catch(error: any) {
      console.error("Enquiry rate limiter failed:", error);
      
      return NextResponse.json({ error: "Service temporarily unavailable. Please try again later." }, { status: 503 });
    }

    const body = await req.json();

    const result = await submitCustomerForm(body);

    return NextResponse.json(
      { success: true, result },
      { status: 200 }
    );
  } catch (error: any) {
    const { status, message } = JSON.parse(error.message);
    
    return NextResponse.json({ error: message }, { status });
  }
}