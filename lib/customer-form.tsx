"use server";

import { CustomerFormProps, PropertyDataProps } from "@/types/api";
import { apiGETFetch, apiPOSTFetch } from "./api";
import { buildHeaders } from "./common";

export const getProperties = async () => apiGETFetch<PropertyDataProps[]>(`form/properties`);

export const getInvestmentTimelines = async () => apiGETFetch<string[]>(`form/investment-timelines`);

export const submitCustomerForm = async (formData: CustomerFormProps) => apiPOSTFetch<CustomerFormProps>(`form/submit`, {
    headers: await buildHeaders(),
    body: JSON.stringify(formData)
})