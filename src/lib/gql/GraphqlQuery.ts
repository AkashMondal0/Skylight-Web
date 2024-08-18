import { configs } from "@/configs"
interface GraphqlResponse<T> {
    data: T;
    errors: GraphqlError[];
}
export type GraphqlQueryType = {
    name: string
    operation: string
    query: string
}
export interface GraphqlError {
    message: string;
    locations?: { line: number; column: number }[];
    path?: string[];
    extensions?: any;
}

export const graphqlQuery = async <T>({
    query,
    variables,
    url = `${configs.serverApi.baseUrl}/graphql`,
    BearerToken,
    withCredentials = false,
    errorCallBack
}: {
    query: string;
    variables?: any;
    url?: string;
    BearerToken?: string;
    withCredentials?: boolean;
    errorCallBack?: (error: GraphqlError[]) => void;
}): Promise<T | any> => {
    BearerToken = await fetch(`/api/cookies`).then(res => res.json()).then(res => res).catch(err => {
        throw new Error("Unauthorized")
    })

    const response = await fetch(url, {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            ...(BearerToken && { Authorization: `Bearer ${BearerToken}` }),
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const responseBody: GraphqlResponse<any> = await response.json();

    if (responseBody.errors) {
        throw new Error(responseBody.errors[0].extensions.code)
    }

    return responseBody.data;
}