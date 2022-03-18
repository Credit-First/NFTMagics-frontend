import * as React from 'react';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout/Layout';

const MarketplaceAllSection = dynamic(() => import('@/components/Home/MarketplaceSection/Nfts'));

export default function Marketplace() {
    return (
        <Layout>
            <MarketplaceAllSection />
        </Layout>
    );
}
