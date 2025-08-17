export interface ErrorContext {
    error: ResponseError;
}

export interface ResponseError {
    message: string;
    status?: number;
}

export const modifyError = (context: unknown): ResponseError => {
    if (hasBodyError(context)) {
        const { message, status } = context.error;

        if (message) {
            return { message: message, status };
        }

        return new Error(`${status}: Unknown error`);
    }

    return new Error(`${context}: Unknown error`);
};

// eslint-disable-next-line
const hasBodyError = (context: any): context is ErrorContext =>
    Boolean(context && typeof context === "object" && context?.error);
