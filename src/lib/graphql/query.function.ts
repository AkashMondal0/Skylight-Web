import { configs } from '@/configs';
import axios from 'axios';

const GraphqlQuery = async (query: string, variables: unknown) => {
    const data = JSON.stringify({
        query,
        variables
    });

    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${configs.serverApi.baseUrl}/graphql`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFrYXNobW9uZGFsIiwiaWQiOiIyYzEwOTY4MS0zYmQ2LTQ4NTktYTczNS0zOGU0Zjg5OTk5ZWQiLCJlbWFpbCI6ImFrYXNoQGdtYWlsLmNvbSIsIm5hbWUiOiJha2FzaCIsInByb2ZpbGVQaWN0dXJlIjpudWxsLCJjcmVhdGVkQXQiOiIyMDI0LTA2LTE1VDE0OjIzOjQzLjMwM1oiLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTcxODY1OTA3NiwiZXhwIjoxNzIxMjUxMDc2fQ.TVoPLaA-fjsRcwdAOS8YrMxtkc0dDtffcJsZhKQ_Fl4',
        },
        data: data
    };

    const res = await axios.request(config)

    if (res.data.errors) {
        return {
            data: null,
            message: res.data.errors[0].message,
            code: 0
        }
    }

    return {
        data: res.data.data,
        message: "Fetch profile feed successful",
        code: 1
    }
}

export default GraphqlQuery;