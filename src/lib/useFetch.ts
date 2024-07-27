import { useState, useEffect } from 'react';

function useFetch(url: string) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any | null>(null);

    useEffect(() => {
        const abortController = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url, { signal: abortController.signal });
                if (response.ok) {
                    const data = await response.json();
                    setData(data);
                } else {
                    throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
                }
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

export default useFetch;