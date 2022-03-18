import React from "react";
import dynamic from "next/dynamic";
import Layout from '@/components/Layout/Layout';

const CreateSection = dynamic(() => import('@/components/Home/CreateSection'), {ssr: false});

function Create() {
    return (
        <Layout>
            <CreateSection />
        </Layout>
    )
}
export default Create;