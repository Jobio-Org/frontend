import { SignInCredentialsDto } from "@jobio-org/api-client";

import { apiService } from "@/shared/api";
import { ErrorContext } from "@/shared/api/modify-error";

import { TokensResult } from "../types";

export const signInWithCredentials = async (
    credentials: SignInCredentialsDto
): Promise<TokensResult | ErrorContext> => {
    try {
        const response = await apiService().auth.signIn({
            requestBody: credentials
        });

        return response;
    } catch (error) {
        if (error instanceof Error) {
            return { error: { message: error.message } };
        } else {
            return { error: { message: "Unknown error" } };
        }
    }
};
