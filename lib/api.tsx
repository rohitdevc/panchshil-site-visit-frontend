"use server";

export async function apiGETFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if(!endpoint) {
        return false as T;
    }

    const baseUrl = process.env.API_DOMAIN_NAME;

    if (!baseUrl) {
        throw new Error("API_DOMAIN_NAME is undefined — check your .env.local");
    }

    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string>),
    };

    headers["Content-Type"] = "application/json";

    const url = `${baseUrl}${endpoint}`;
    
    const res = await fetch(`${url}`, {
        method: 'get',
        ...options,
        headers,
        cache: "no-store",
    });
    
    if (!res.ok) {
        const body = await res.text();

        console.error("=== API ERROR ===");
        console.error("URL:", url);
        console.error("Method:", options.method ?? "GET");
        console.error("Status:", res.status);
        console.error("Body:", body);

        if (res.status === 404) {
            return null as T;
        }

        return null as T;
    }
    
    const body = await res.text();

    if (!body || body.trim() === "" || body.trim() === "null") {
        return null as T;
    }

    try {
        return JSON.parse(body) as T;
    } catch (err) {
        console.error("=== INVALID JSON RESPONSE ===");
        console.error("URL:", url);
        console.error("Method:", options.method ?? "GET");
        console.error("Status:", res.status);
        console.error("Content-Type:", res.headers.get("content-type"));
        console.error("Parse Error:", err);

        throw err;
    }
}

export async function apiPOSTFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if(!endpoint) {
        return false as T;
    }

    const baseUrl = process.env.API_DOMAIN_NAME;

    if (!baseUrl) {
        throw new Error("API_DOMAIN_NAME is undefined — check your .env.local");
    }

    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string>),
    };

    headers["Content-Type"] = "application/json";

    const url = `${baseUrl}${endpoint}`;
    
    const res = await fetch(`${url}`, {
        method: 'post',
        ...options,
        headers,
        cache: "no-store",
    });
    
    if (!res.ok) {
        const body = await res.text();

        console.error("=== API ERROR ===");
        console.error("URL:", url);
        console.error("Method:", options.method ?? "GET");
        console.error("Status:", res.status);
        console.error("Body:", body);

        throw new Error(
            JSON.stringify({
                status: res.status,
                message: body || "Request failed",
            })
        );
    }
    
    const body = await res.text();

    if (!body || body.trim() === "" || body.trim() === "null") {
        return null as T;
    }

    try {
        return JSON.parse(body) as T;
    } catch (err) {
        console.error("=== INVALID JSON RESPONSE ===");
        console.error("URL:", url);
        console.error("Method:", options.method ?? "GET");
        console.error("Status:", res.status);
        console.error("Content-Type:", res.headers.get("content-type"));
        console.error("Parse Error:", err);

        throw err;
    }
}