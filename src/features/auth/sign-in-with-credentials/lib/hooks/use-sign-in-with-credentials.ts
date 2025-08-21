import { useMutation } from "@tanstack/react-query";

import { signInWithCredentialsApi } from "../../model";

export const useSignInWithCredentials = () => {
    return useMutation({
        mutationFn: signInWithCredentialsApi.signInWithCredentials
    });
};
