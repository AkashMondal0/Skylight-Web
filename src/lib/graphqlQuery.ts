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
}: {
    query: string;
    variables?: any;
    withCredentials?: boolean;
    errorCallBack?: (error: GraphqlError[]) => void;
}): Promise<T | any> => {
    const BearerToken = await fetch(`/api/cookies`).then((res) => res.json())
        .then((res) => res).catch((err) => {
            console.error(err);
            throw new Error("Unauthorized");
        });
    const response = await fetch(
        `${configs.serverApi.baseUrl}/graphql`.replace("/v1", ""),
        {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${BearerToken}`,
            },
            body: JSON.stringify({
                query,
                variables,
            }),
            cache: "no-cache",
        },
    );

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
