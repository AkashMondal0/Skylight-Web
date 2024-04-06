// pages/index.js
"use client"
import { configs } from '@/configs';
import axios from 'axios';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  const getUser = async () => {
    const data = await axios.get(`/api/profile`)
    console.log(data)
  }
  return (
    <div>
      <h1>NextAuth.js Example{configs.serverApi.baseUrl}</h1>
      {!session && (
        <div>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      )}
      {session && (
        <div>
          Signed in as {session?.user?.email} <br />
          <button onClick={()=>{
            signOut()
          }}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
