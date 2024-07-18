"use client"
import React from "react";
import axios from "axios";

const page = () => {
    const fetchData = async () => {

        fetch("https://skylight-backend.skysolo.me/v1/auth/login", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            redirect: "follow",
            body: JSON.stringify({
                "email": "akash@gmail.com",
                "password": "123456"
            }),
            credentials:"include"
        })
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    };

    const fetchData2 = async () => {
        try {
            const response = await axios.get("https://skylight-backend.skysolo.me/v1/cookie", {
                withCredentials: true
            });
            console.log(response.data);
            // Process the response data here
        } catch (error) {
            console.error(error);
            // Handle the error here
        }
    };

    return (
        <>
            <button onClick={fetchData}>Fetch Data</button>
            <button onClick={fetchData2}>Fetch cookie</button>

            <p>hi baby</p>
        </>
    );
};

export default page;

// "use client"
// import React from "react";

// const page = () => {
//     const fetchData = async () => {

//         fetch("http://localhost:5000/v1/cookie-set", {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             method: "GET",
//             redirect: "follow",
//             credentials: "include"
//         })
//             .then((response) => response.text())
//             .then((result) => console.log(result))
//             .catch((error) => console.error(error));
//     };

//     const fetchData2 = async () => {
//         fetch("http://localhost:5000/v1/cookie", {
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             method: "GET",
//             redirect: "follow",
//             credentials: "include"
//         })
//             .then((response) => response.text())
//             .then((result) => console.log(result))
//             .catch((error) => console.error(error));
//     };

//     return (
//         <>
//             <button onClick={fetchData}>Fetch Data</button>
//             <button onClick={fetchData2}>Fetch cookie</button>

//             <p>hi baby</p>
//         </>
//     );
// };

// export default page;