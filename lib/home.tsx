"use server";

import { apiGETFetch } from "./api";
import {
    IntroProps
} from "@/types/api";

export const getIntroduction = async () => apiGETFetch<IntroProps>(`home/introduction`);