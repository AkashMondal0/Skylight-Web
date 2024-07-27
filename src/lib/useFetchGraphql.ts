import { configs } from '@/configs';
import { GraphqlError } from '@/types';
import { useState, useEffect } from 'react';
import { graphqlErrorTypes } from './graphqlQuery';
type UseGraphqlQueryResult<TData> = {
    data: TData | null;
    loading: boolean;
    error: any | null;
};
interface UseGraphqlQueryOptions<TVariables> {

}

function useGraphqlQuery<TData = any, TVariables = Record<string, any>>(
    {
        BearerToken, 
        url = `${configs.serverApi.baseUrl}/graphql`, 
        query, 
        variables
    }: {
        query: string;
        variables?: TVariables;
        url?: string;
        BearerToken?: string;
        withCredentials?: boolean;
        errorCallBack?: (error: GraphqlError[]) => void;
    }
): UseGraphqlQueryResult<TData> {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any | null>(null);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            try {
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

                const responseBody = await response.json() as {
                    data: any,
                    errors: GraphqlError[]
                }

                if (responseBody.errors) {
                    await graphqlErrorTypes(responseBody.errors[0])
                }
                setData(responseBody.data)
                return responseBody.data;
            } catch (error) {
                if (!abortController.signal.aborted) {
                    setError(error);
                }
            } finally {
                if (!abortController.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            abortController.abort();
        };
    }, [url]);

    return { data, loading, error };
}

export default useGraphqlQuery;