import * as React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import { LayoutSection } from '@/components/Layout/styles';

const MainMenu = dynamic(() => import('@/navigation/Header'));
const SidebarWalletList = dynamic(() => import('@/components/Home/SidebarWalletList/index'));
const Footer = dynamic(() => import('@/components/Footer/index'));

export default function Layout({ children }: { children: React.ReactNode }) {
  const [openwalletlist, setOpenwalletlist] = React.useState(false);

  const setToggleWalletList = () => {
    setOpenwalletlist(!openwalletlist);
  }
  return (
    <LayoutSection>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <title>NFTMagics</title>
        <meta name="description" content="NFTMagics" />
        <link rel="icon" href="/favicon.png" type="image/gif" sizes="16x16" />
      </Head>
      <div>
        <header className='header'>
          <MainMenu setToggleWalletList={setToggleWalletList} />
        </header>
        <SidebarWalletList setToggleWalletList={setToggleWalletList} openwalletlist={openwalletlist} />
        <main className='main'>
          <div className='section'>
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </LayoutSection>
  );
}