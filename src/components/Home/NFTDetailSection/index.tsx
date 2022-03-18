import * as React from 'react';
import { Section } from './styles';
import Image from 'next/image';

export default function NFTDetailSection() {

    return (
        <Section>
            <div className='section-header'>
                Create and sell your NFTS
            </div>
            <div className='section-body'>
                <div className='cell'>
                    <div className='cell-img'>
                        <Image src='/images/icons/wallet.svg' layout='fill' objectFit='cover' />
                    </div>
                    <div className='cell-title'>
                        Set up your wallet
                    </div>
                    <div className='cell-content'>
                        Add the Binance Smart Chain network to the compatible wallet you are going to use. 
                        Add <span color='#39befd'>ITHD</span> and <span style={{color: '#39befd'}}>Ayra Bsc</span> as custom tokens. 
                        Load your wallet with <span color='#39befd'>BNB</span>.
                    </div>
                </div>
                <div className='cell'>
                    <div className='cell-img'>
                        <Image src='/images/icons/sale.svg' layout='fill' objectFit='cover' />
                    </div>
                    <div className='cell-title'>
                        Add or design your NFT's
                    </div>
                    <div className='cell-content'>
                        Tap Create in the menu. Choose to upload your own photo or make your own design online with our editor. You can use our templates. Express your magic!
                    </div>
                </div>
                <div className='cell'>
                    <div className='cell-img'>
                        <Image src='/images/icons/nft.svg' layout='fill' objectFit='cover' />
                    </div>
                    <div className='cell-title'>
                        Sell or Give your NFT's
                    </div>
                    <div className='cell-content'>
                        You can sell at a fixed price or auction. But you can also give NFTS to whoever you want and when they sell those NFTS earn commissions.
                    </div>
                </div>
            </div>
        </Section>
    )
}