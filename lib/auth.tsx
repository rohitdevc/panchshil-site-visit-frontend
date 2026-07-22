"use server";

import { apiGETFetch } from "./api";
import { TokenResponse } from "@/types/api";

export async function getAuthToken() {
    return apiGETFetch<TokenResponse>("auth/token", {
        headers: {
            'x-secret-key': process.env.FRONTEND_TOKEN_KEY as string
        }
    });
}