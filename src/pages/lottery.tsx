import * as React from 'react';
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('@/components/Layout/Layout'));
const LotterySection = dynamic(() => import('@/components/Home/LotterySection'));

function Lottery() {

  return (
    <Layout>
      <div className='sections'>
          <LotterySection />
      </div>
    </Layout>
  );
}
export default Lottery;
