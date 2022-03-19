import * as React from 'react';
import dynamic from 'next/dynamic';
// import 'bootstrap/dist/css/bootstrap.min.css';
const Layout = dynamic(() => import('@/components/Layout/Layout'));
const FeaturedNFTSection = dynamic(() => import('@/components/Home/FeaturedNFTSection/index'));
const BewitchingNFTSection = dynamic(() => import('@/components/Home/BewitchingNFTSection/index'));
const TopNFTSection = dynamic(() => import('@/components/Home/TopNFTSection/index'));
const NFTDetailSection = dynamic(() => import('@/components/Home/NFTDetailSection/index'));

function Home() {

  return (
    <Layout>
      <div className='sections'>
        {/* <FeaturedNFTSection />
        <BewitchingNFTSection />
        <TopNFTSection />
        <NFTDetailSection /> */}
      </div>
    </Layout>
  );
}
export default Home;
