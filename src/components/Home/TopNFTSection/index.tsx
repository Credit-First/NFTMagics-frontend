import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Grid,
    Skeleton
} from '@mui/material';
import { Section, Item } from './styles';
import { actionGetTopMarketItems } from '@/store/actions';
import { selectTopMarketItems } from '@/store/selectors';
import Config from '@/config/app';

const tokenImg = {
    [Config.Token.BNB.address]: '/images/token/bnb.png',
    [Config.Token.AYRA.address]: '/images/token/ayra.png',
    [Config.Token.ITHD.address]: '/images/token/ithd.png'
}
export default function TopNFTs() {
    const router = useRouter();
    const dispatch = useDispatch();
    const topMarketItems = useSelector(selectTopMarketItems);
    const [itemsData, setItemsData] = React.useState([]);

    const imgLoader = ({ src, width, quality }: { src: any, width?: any, quality?: any }) => {
        return `https://ipfs.infura.io/ipfs/${src}?w=${width || 300}&q=${quality || 75}`
    }

    React.useEffect(() => {
        if (topMarketItems && topMarketItems.length > 0) {
            setItemsData(topMarketItems)
        }
    }, [topMarketItems]);

    React.useEffect(() => {
        dispatch(actionGetTopMarketItems());
    }, []);

    return (
        <Section>
            <div className='title'>
                <div>
                    Top NFTs over
                    <div className='dropdown'>
                        <p>
                            last 7 days
                        </p>
                    </div>
                </div>
            </div>
            <Grid container className='list' spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
                {
                    itemsData && itemsData.map((item: any, key) => {
                        return (
                            <Grid item key={key} className='' xs={4} sm={8} md={6} lg={4}>
                                <Item>
                                    <div className='item-no'>
                                        <span>{key}</span>
                                    </div>
                                    <div className='item-avatar'>
                                        <Skeleton variant="circular" animation="wave" />
                                        {
                                            item.collectionLogo && (
                                                <Image loader={imgLoader} src={item.collectionLogo} layout="fill" objectFit="fill" />
                                            )
                                        }
                                    </div>
                                    <div className='item-detail'>
                                        <div>{item.name}</div>
                                    </div>
                                    <div className='item-info'>
                                        <div className='tokenImg'>
                                            {!item && <Skeleton variant="text" style={{ width: 30, height: 30 }} />}
                                            {item.price ? (
                                                <img src={tokenImg[item.saleToken]} width={30} height={30} />
                                            ) : (
                                                <>---</>
                                            )}
                                        </div>
                                        <div className='price'>{item.price / 1e18}</div>
                                    </div>
                                </Item>
                            </Grid>
                        )
                    })
                }
            </Grid>
            <div className='button-action'>
                <Button className='rankingBtn button button-regular'>
                    Go to Ranking
                </Button>
            </div>
        </Section>
    )
}
