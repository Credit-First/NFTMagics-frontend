import React from "react";
import dynamic from "next/dynamic";
import Layout from '@/components/Layout/Layout';

const GiftSection = dynamic(() => import('@/components/Home/GiftSection'));

function Gift() {
    return (
        <Layout>
            <GiftSection />
        </Layout>
    )
}
export default Gift;