export class ApiError extends Error {
    constructor(
        public status: number,
        public body: string,
    ) {
        super(`API error ${status}: ${body}`);
        this.name = "ApiError";
    }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
    body?: unknown;
}

export async function apiClient<T>(
    endpoint: string,
    options: RequestOptions = {},
): Promise<T> {
    const { body, headers, ...rest } = options;

    const response = await fetch(`/api${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        ...rest,
    });

    if (!response.ok) {
        throw new ApiError(response.status, await response.text());
    }

    return response.json();
}
