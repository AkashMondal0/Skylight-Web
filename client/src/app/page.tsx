import SkeletonPostCard from '@/components/home/loading/PostCard';
import { SkeletonStoriesCard } from '@/components/home/loading/StoriesCard';
import dynamic from 'next/dynamic';

const ExploreSuggestion = dynamic(() => import('@/components/home/Explore'), {
  loading: () => <p>Loading...</p>
});
const StoriesPage = dynamic(() => import('@/components/home/StoriesPage'), {
  loading: () => <SkeletonStoriesCard />
});

const FeedsPage = dynamic(() => import('@/components/home/FeedsPage'), {
  loading: () => <SkeletonPostCard />
});


export default async function Page() {

  return (
    <>
      <div className="flex h-full
           min-h-[100dvh] w-full justify-center">
        <div className="md:flex w-full justify-center">
          {/* feed posts */}
          <div className="grow h-full
              min-h-[100dvh] lg:px-3 mx-auto
              w-full max-w-[650px]">
            <StoriesPage />
            <FeedsPage />
          </div>
          {/* suggestions */}
          <div className="h-full
              min-h-[100dvh] 
              hidden lg:flex lg:w-full 
              lg:max-w-[400px] ease-in-out 
              duration-300">
            <ExploreSuggestion />
          </div>
        </div>
      </div>
    </>
  );
}