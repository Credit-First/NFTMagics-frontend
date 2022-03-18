import * as React from 'react';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout/Layout';

const MarketplaceSection = dynamic(() => import('@/components/Home/MarketplaceSection/index'));

export default function Marketplace() {
    return (
        <Layout>
            <MarketplaceSection />
        </Layout>
    );
}
