import * as React from 'react';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout/Layout';
import AssetsSection from '@/components/Home/MarketplaceSection/Collection/assets';

function Assets() {
  return (  
    <Layout>
      <AssetsSection />
    </Layout>
  );
}
export default Assets;