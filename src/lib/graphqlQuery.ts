import { configs } from "@/configs";
interface GraphqlResponse<T> {
    data: T;
    errors: GraphqlError[];
    error: GraphqlError;
}
export type GraphqlQueryType = {
    name: string;
    operation: string;
    query: string;
};
export interface GraphqlError {
    message: string;
    locations?: { line: number; column: number }[];
    path?: string[];
    extensions?: any;
}

export const graphqlQuery = async <T>({
    query,
    variables,
    skipToken = false,
}: {
    query: string;
    variables?: any;
    skipToken?: boolean;
    withCredentials?: boolean;
    errorCallBack?: (error: GraphqlError[]) => void;
}): Promise<T | any> => {
    let response: Response;
    const url = `${configs.serverApi.baseUrl}/graphql`.replace("/v1", "");
    const option: any = (bearerToken: string | undefined = undefined) => {
        return {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${bearerToken}`,
            },
            body: JSON.stringify({
                query,
                variables,
            }),
            cache: "no-cache",
        };
    };

    if (skipToken) {
        response = await fetch(url, option());
    } else {
        let BearerToken = await fetch(`/api/cookies`)
        if (!BearerToken.ok) {
            throw new Error("Network response was not ok");
        }
        BearerToken = await BearerToken.json()
        response = await fetch(url, option(BearerToken));
    }

    if (!response.ok) {
        const responseBody: GraphqlResponse<any> = await response.json();
        console.error(responseBody);
        throw new Error("Network response was not ok");
    }

    const responseBody: GraphqlResponse<any> = await response.json();

    if (responseBody?.errors || !responseBody?.data || responseBody?.error) {
        console.error(responseBody);
        throw new Error("Error in response");
    }

    return responseBody.data[Object.keys(responseBody.data)[0]];
};
