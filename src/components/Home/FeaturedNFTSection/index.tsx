import * as React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
    Button,
    Skeleton,
    Tooltip
} from '@mui/material';
import { Section, LinkBar } from './styles';
import { LoadingComponent } from '@/components/Loading';

import { actionGetFeaturedMarketItem } from '@/store/actions';
import { selectFeaturedMarketItem } from '@/store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

export default function FeaturedNFTSection() {
    const router = useRouter();
    const dispatch = useDispatch();
    const marketItem = useSelector(selectFeaturedMarketItem);
    const [linkActive, setLinkActive] = React.useState({
        ayra: false,
        ithd: false
    })
    const [featuredItem, setFeaturedItem] = React.useState({
        logo: '',
        itemId: 0,
        name: '',
        description: '',
        image: '',
    });

    const handleFeaturedItem = (type: any, value: any) => {
        setFeaturedItem((state) => ({ ...state, [type]: value }));
    };

    const imgLoader = ({ src, width, quality }: { src: any, width?: any, quality?: any }) => {
        return `https://ipfs.infura.io/ipfs/${src}?w=${width || 300}&q=${quality || 75}`
    }

    const handleCreate = () => {
        router.push(`/create`);
    }

    const handleExplore = () => {
        router.push('/marketplace/all');
    }

    const handleLinkClick = (type: any) => () => {
        if (type === 'ayra') {
            setLinkActive(state => ({ ...state, ayra: !linkActive.ayra }));
            if (linkActive.ithd) setLinkActive(state => ({ ...state, ithd: !linkActive.ithd }));
        } else {
            setLinkActive(state => ({ ...state, ithd: !linkActive.ithd }));
            if (linkActive.ayra) setLinkActive(state => ({ ...state, ayra: !linkActive.ayra }));
        }
    }
    React.useEffect(() => {
        if (marketItem) {
            handleFeaturedItem('logo', marketItem.collectionLogo);
            handleFeaturedItem('itemId', marketItem.itemId);
            handleFeaturedItem('name', marketItem.name);
            handleFeaturedItem('description', marketItem.description);
            handleFeaturedItem('image', marketItem.image);
        }
    }, [marketItem]);

    React.useEffect(() => {
        dispatch(actionGetFeaturedMarketItem());
    }, []);

    return (
        <>
            <LinkBar className='link-bar'>
                <div className='link-out' onClick={handleLinkClick('ayra')}>
                    <div className='border'>
                        <span /><span />
                    </div>
                    <button className='link-button'>
                        <Tooltip arrow title="For more information about this token, you can see in https://www.ayratokens.com or Please click now.">
                            <div className='link-image'>
                                <Image src={'/images/token/ayra.png'} layout={'fill'} objectFit={'fill'} />
                            </div>
                        </Tooltip>
                    </button>
                </div>
                <div className={clsx('link-pannel', linkActive.ayra && 'active')}>
                    <div className='border'>
                        <span /><span />
                    </div>
                    <a href={'https://www.ayratokens.com/'} target="_blank" rel="noreferrer">
                        <div>https://www.ayratokens.com</div>
                    </a>
                </div>
                <div className='link-out' onClick={handleLinkClick('ithd')}>
                    <div className='border'>
                        <span /><span />
                    </div>
                    <button className='link-button'>
                        <Tooltip arrow title="For more information about this token, you can see in https://www.ithdiamond.tk or Please click now.">
                            <div className='link-image'>
                                <Image src={'/images/token/ithd.png'} layout={'fill'} objectFit={'fill'} />
                            </div>
                        </Tooltip>
                    </button>
                </div>
                <div className={clsx('link-pannel', linkActive.ithd && 'active')}>
                    <div className='border'>
                        <span /><span />
                    </div>
                    <a href={'https://www.ithdiamond.tk'} target="_blank" rel="noreferrer">
                        <div>https://www.ithdiamond.tk</div>
                    </a>
                </div>
            </LinkBar>
            <Section id="featured-section" aria-label="section" >
                {featuredItem ? (
                    <>
                        <div className='featured-background-container'>
                            <div className='coverImg' style={{ backgroundImage: `url(https://ipfs.infura.io/ipfs/${featuredItem.image})` }}>
                            </div>
                        </div>
                        <div className='featured-container'>
                            <div className='featured-title'>
                                <h1 className='featured-header'>
                                    Create, sell or give away magical Nfts
                                </h1>
                                <span className='featured-subheader'>
                                    7% of each NFT sale is shared among all active buyers in the last 60 days.
                                    We also allow you to set up to 10% royalty on your NFTS for life.
                                    And we only charge 1% of each transaction!
                                    And If you use AYRA or ITHD, FEE will be 50% off!
                                </span>
                                <div className='featured-button-container'>
                                    <div>
                                        <Button className='exploreBtn font-bold mr-2' onClick={handleExplore}>
                                            Explore
                                        </Button>
                                        <Button className='createBtn font-bold mr-2' onClick={handleCreate}>
                                            Create
                                        </Button>
                                    </div>
                                </div>
                                <div className='about-magics'>
                                    <a>Learn more about NFTMagics</a>
                                </div>
                            </div>
                            <div className='featured-image'>
                                <article className='featured-image-card'>
                                    <a className='featured-image-card-link'>
                                        <div className='featured-image-card-link-meida'>
                                            <div className='media-img'>
                                                <div className='asset-media-image'>
                                                    <Skeleton className='' sx={{ height: '100%', width: '100%', borderRadius: 'inherit', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} animation="wave" variant="rectangular" />
                                                    {
                                                        featuredItem.image && (
                                                            <Image loader={imgLoader} src={featuredItem.image} layout="fill" objectFit="fill" />
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <footer className='featured-image-text-area'>
                                            <div className='logo'>
                                                <Skeleton variant="circular" animation="wave" />
                                                {
                                                    featuredItem.logo && (
                                                        <Image loader={imgLoader} src={featuredItem.logo} layout="fill" objectFit="fill" />
                                                    )
                                                }
                                            </div>
                                            <div className='content'>
                                                <div>{featuredItem.name || <Skeleton variant="text" />}</div>
                                                <div>{featuredItem.description || <Skeleton variant="text" />}</div>
                                            </div>
                                            <div className='info'>
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" /></svg>
                                            </div>
                                        </footer>
                                    </a>
                                </article>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className=''>
                        <LoadingComponent />
                    </div>
                )}
            </Section>
        </>
    )
}