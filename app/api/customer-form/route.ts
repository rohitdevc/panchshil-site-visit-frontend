import { NextRequest, NextResponse } from "next/server";
import { submitCustomerForm } from "@/lib/customer-form";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const blocked = await checkRateLimit(req, "contact");

  if (blocked) return blocked;
  
  try {
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