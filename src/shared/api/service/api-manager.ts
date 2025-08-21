import { ApiClient } from "@jobio-org/api-client";

import { ProxyHandler } from "./proxy-handler";
import { ProxyOptions } from "./types";

export class ApiManager implements Api {
    private token?: string;

    public updateAccessToken(newToken: string) {
        this.token = newToken;
    }

    public resetAccessToken() {
        this.token = undefined;
    }

    public generateConfiguration() {
        return new ApiClient({
            BASE: process.env.NEXT_PUBLIC_API_BASE_URL,
            TOKEN: this.token
        });
    }

    public generateConfigurationWithProxyHandler({
        handleErrorResponse
    }: ProxyOptions): ApiClient {
        const apiClient = this.generateConfiguration();
        const middleware = new ProxyHandler(apiClient, { handleErrorResponse });

        return middleware.createProxy(this);
    }
}

export interface Api {
    updateAccessToken: (newToken: string) => void;
    resetAccessToken: () => void;
    generateConfiguration: (options: ProxyOptions) => ApiClient;
}
