import { configs } from "@/configs"
import axios from "axios"

export const graphqlQuery = async ({
    query,
    variables,
    url = `${configs.serverApi.baseUrl}/graphql`,
    BearerToken,
    withCredentials = false
}: {
    query: string
    variables?: any
    url?: string
    BearerToken?: string
    withCredentials?: boolean
}) => {
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

    const responseBody = await response.json();

    if (responseBody.errors) {
        throw new Error('Error fetching data: ' + responseBody.errors.map((e: any) => e.message).join(', '));
    }
    return responseBody.data;
}