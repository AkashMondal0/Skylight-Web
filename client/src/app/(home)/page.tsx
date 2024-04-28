'use client'
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import dynamic from 'next/dynamic';

const ExploreSuggestion = dynamic(() => import('./components/Explore'), {
  loading: () => <p>Loading...</p>
});
const Stories_bar = dynamic(() => import('./components/Storiesbar'), {
  loading: () => <p>Loading...</p>
});
const FeedPost = dynamic(() => import('./components/FeedPost'), {
  loading: () => <p>Loading...</p>
});

export default function Page() {
  const profile = useSelector((state: RootState) => state.profile);
  return (
    <>
      <div className="flex h-full
         min-h-[100dvh] w-full justify-center">
        <div className="md:flex w-full justify-center">
          {/* feed posts */}
          <div className="grow h-full
            min-h-[100dvh] lg:px-3 mx-auto
            w-full max-w-[650px]">
            <Stories_bar />
            <FeedPost />
          </div>
          {/* suggestions */}
          <div className="h-full
            min-h-[100dvh] 
            hidden lg:flex lg:w-full 
            lg:max-w-[400px] ease-in-out 
            duration-300">
            <ExploreSuggestion user={profile.user} />
          </div>
        </div>
      </div>
    </>
  );
}
