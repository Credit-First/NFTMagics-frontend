import React from "react";
import dynamic from "next/dynamic";
import Layout from '@/components/Layout/Layout';

const CreateSelfNFT = dynamic(() => import('@/components/Home/CreateSelfSection'), {ssr: false});

function CreateSelf() {
    return (
        <Layout>
            <CreateSelfNFT />
        </Layout>
    )
}
export default CreateSelf;
