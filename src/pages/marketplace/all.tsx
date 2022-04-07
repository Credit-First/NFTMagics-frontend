import * as React from 'react';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout/Layout';
import Footer from "@/components/Footer";
const MarketplaceAllSection = dynamic(() => import('@/components/Home/MarketplaceSection/Collection'));

export default function Marketplace() {
    return (
        <Layout>
            <MarketplaceAllSection />
        </Layout>
    );
}
