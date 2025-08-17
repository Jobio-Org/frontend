import { z } from "zod";

import { signInSchema } from "./config";

export type {
    SignInCredentialsDto,
    TokensResultDto as TokensResult
} from "@jobio-org/api-client";

export type SignInFormData = z.infer<typeof signInSchema>;
