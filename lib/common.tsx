"use server";

import { apiGETFetch } from "./api";
import { getAuthToken } from './auth';
import {
    MetaData,
    Banner
} from "@/types/api";

export const buildHeaders = async () => {
    const { token } = await getAuthToken();
    
    return {
        Authorization: `Bearer ${token}`
    };
}

export const getMetaData = async (page_name: string) => apiGETFetch<MetaData>(`meta-data?page_name=${page_name}`);

export const getBanner = async (page_name: string) => apiGETFetch<Banner>(`banner?page_name=${page_name}`);