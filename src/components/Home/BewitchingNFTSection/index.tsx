import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
    Skeleton
} from '@mui/material';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Section, NFTItem } from './styles';
import PageLoading from '@/components/PageLoading';
import { actionGetBewitchMarketItems } from '@/store/actions';
import { selectBewitchMarketItems } from '@/store/selectors';
import { useDispatch, useSelector } from 'react-redux';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

export default function BewitchingNFTSection() {
    const dispatch = useDispatch();
    const router = useRouter()
    const [pageLoading, setPageLoading] = React.useState(false);
    const marketItems = useSelector(selectBewitchMarketItems);
    const [itemsData, setItemsData] = React.useState([])

    const imgLoader = ({ src, width, quality }: { src: any, width?: any, quality?: any }) => {
        return `https://ipfs.infura.io/ipfs/${src}?w=${width || 300}&q=${quality || 75}`
    }

    type RightArrowProps = {
        onClick?: any,
        onMove?: any,
        carouselState?: {
            currentSlide: any,
            deviceType: any
        }
    }

    type LeftArrowProps = {
        onClick?: any,
        onMove?: any,
        carouselState?: {
            currentSlide: any,
            deviceType: any
        }
    }

    const CustomRightArrow = ({ onClick, onMove, carouselState }: RightArrowProps) => {
        // onMove means if dragging or swiping in progress.
        return <button onClick={() => onClick()} >ddd</button>;
    };

    const CustomLeftArrow = ({ onClick, onMove, carouselState }: LeftArrowProps) => {
        // onMove means if dragging or swiping in progress.
        return <button onClick={() => onClick()} />;
    };

    const handleLink = (id: any) => () => {
        setPageLoading(true);
        router.push(`/marketplace/assets/${id}/get`);
    };

    const handleCollectionLink = (id: any) => () => {
        setPageLoading(true);
        router.push(`/marketplace/collection/${id}/get`);
    };

    React.useEffect(() => {
        if (marketItems && marketItems.length > 0) {
            setItemsData(marketItems);
        }
    }, [marketItems]);

    React.useEffect(() => {
        dispatch(actionGetBewitchMarketItems());
    }, []);

    return (
        <div>
            <Section>
                <div className='section-header'>
                    <div>BewitchingNFTs</div>
                </div>
                <Carousel
                    swipeable={false}
                    draggable={false}
                    showDots={true}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    autoPlay={false}
                    autoPlaySpeed={2000}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    containerClass="carousel-container"
                    itemClass="carousel-item-padding-40-px"
                >
                    {
                        itemsData && itemsData.map((item: any, key: any) => {

                            let random = (item.itemId * 1 - Math.floor(item.itemId * 1 / 20) * 20);
                            let avatar = '/profile/' + (random > 0 ? random : 1) + '.png';

                            return (
                                <NFTItem key={key}>
                                    <div className="nft-wrap">
                                        <a onClick={handleLink(item.collectionId)}>
                                            <Skeleton className='' sx={{ height: '100%', width: '100%', borderRadius: 'inherit', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} animation="wave" variant="rectangular" />
                                            {
                                                item.image && (
                                                    <Image loader={imgLoader} src={item.image} className="lazy img-fluid" alt="" layout='fill' objectFit='cover' />
                                                )
                                            }
                                        </a>
                                    </div>
                                    <div className="nft-col-pp">
                                        <a onClick={handleCollectionLink(item.collectionId)}>
                                            <Skeleton className='' sx={{ height: '100%', width: '100%', background: 'grey' }} animation="wave" variant="rectangular" />
                                            {
                                                item.collectionLogo && (
                                                    <Image loader={imgLoader} className="lazy pp-coll" src={item.collectionLogo} alt="" layout='fill' objectFit='fill' />
                                                )
                                            }
                                        </a>
                                    </div>
                                    <div className="nft-col-info">
                                        <a><h4>{item.name}</h4></a>
                                        <span>{item.description}</span>
                                    </div>
                                </NFTItem>
                            )
                        })
                    }
                </Carousel>
            </Section>
            <PageLoading loading={pageLoading ? 1 : 0} />
        </div>
    )
}