export default function Home() {
  return (
    <>
      <div className="flex h-full
         min-h-[100dvh] w-full justify-center">
        <div className="md:flex w-full justify-center">
          {/* feed posts */}
          <div className="grow h-full 
            min-h-[100dvh] 
            w-full max-w-[650px]">
            post
          </div>
          {/* suggestions */}
          <div className="h-full
            min-h-[100dvh] 
            hidden lg:flex lg:w-full 
            lg:max-w-[400px] ease-in-out 
            duration-300">
            suggestions
          </div>
        </div>
      </div>
    </>
  );
}
