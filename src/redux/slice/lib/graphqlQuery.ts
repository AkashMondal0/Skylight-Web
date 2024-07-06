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
    try {
        return await axios.request({
            method: 'post',
            maxBodyLength: Infinity,
            url: url,
            withCredentials: withCredentials,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': BearerToken,
            },
            data: JSON.stringify({
                query: query,
                variables: variables
            })
        })
    } catch (e) {
        console.log(e)
        throw e
    }
}