import VirtualizePost from '@/components/home/VirtualizePost';
import LikeViewModal from '@/components/home/dialog/LikeViewModal';
import Sm_Navigation from '@/components/home/navigation/sm-navigation';
import Sm_Header from '@/components/home/navigation/sm-header';
import Lg_Navigation from '@/components/home/navigation/lg-navigation';


export default async function Page() {
  
  return (
    <>
      {/* <LikeViewModal /> */}
      <div className='w-full h-full flex'>
        <Lg_Navigation />
        <div className='w-full md:py-0 py-14'>
          <Sm_Header />
          <VirtualizePost />
          <Sm_Navigation />
        </div>
      </div>
    </>
  )
}