'use client';
import React, { useEffect, useRef } from 'react'
import { Heart, MessageCircle, Send, BookMarked } from 'lucide-react'
import { useRouter } from 'next/navigation';
const Page = ({
  params
}: {
  params: {
    id: string;
  };
}) => {
  const ref = useRef<any>(null);

  return (
    <div className="snap-y snap-mandatory h-[100dvh]
     w-full mx:auto overflow-scroll hideScrollbar
      scroll-smooth md:space-y-2" ref={ref}>
      {[...Array(10)].map((_, i) => {
        return <ReelPost key={i} index={i} defaultPlay={params.id === i.toString()} />
      })}
    </div>
  )
}

export default Page


const ReelPost = ({ defaultPlay, index }: { defaultPlay: boolean, index: number }) => {
  const videoRef = useRef<any>(null);
  const [playing, setPlaying] = React.useState(defaultPlay);
  const [muted, setMuted] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const router = useRouter();

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const handleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  const handleProgress = () => {
    setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
  };

  const handleSeek = (e: any) => {
    videoRef.current.currentTime = (e.target.value / 100) * videoRef.current.duration;
  };

  useEffect(() => {
    if (defaultPlay) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }

  }, [defaultPlay, index]);

  return <>
    <div className="snap-center">
      <div className='flex justify-center h-[100dvh] items-center'>
        <video
          onClick={handlePlayPause}
          ref={videoRef}
          loop={true}
          autoPlay={true}
          className="md:rounded-3xl md:h-[85dvh] w-full md:w-96 object-cover cursor-pointer"
          src={"/reel-sample.mp4"}
          onTimeUpdate={handleProgress} />
        <VideoControls
          playing={playing}
          muted={muted}
          progress={0}
          handlePlayPause={handlePlayPause}
          handleMute={handleMute}
          handleSeek={handleSeek} />
      </div>
      {/* <Progress value={progress} className="w-[60%]" /> */}
    </div>
  </>
}

const VideoControls = ({
  playing,
  muted,
  progress,
  handlePlayPause,
  handleMute,
  handleSeek
}: {
  playing: boolean,
  muted: boolean,
  progress: number,
  handlePlayPause: () => void,
  handleMute: () => void,
  handleSeek: (e: any) => void
}) => {
  return (
    <div className="h-[76dvh] items-end md:flex hidden">
      <div className='space-y-5 p-5'>
        <Heart className='w-7 h-7' />
        <MessageCircle className='w-7 h-7' />
        <Send className='w-7 h-7' />
        <BookMarked className='w-7 h-7' />
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
          className="lucide lucide-ellipsis w-6 h-6">
          <circle cx={12} cy={12} r={1} />
          <circle cx={19} cy={12} r={1} />
          <circle cx={5} cy={12} r={1} />
        </svg>
      </div>
    </div>
  )
}