import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
    CssBaseline,
    Skeleton
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import toast from "@/components/Toast";
import "react-toastify/dist/ReactToastify.css";
import { Section, MarketplaceHeader, Main } from './styles';
import AssetList from './AssetList';
import { actionGetCollectionList, actionGetMarketInfo } from '@/store/actions';
import { selectCollectionList, selectMarketInfo } from '@/store/selectors';
import { useWeb3React } from "@web3-react/core";
import PageLoading from '@/components/PageLoading';

export default function Marketplace() {
    const router = useRouter();
    const { active, address } = router.query;
    
    const { account }: any = useWeb3React();
    const dispatch = useDispatch();
    const collectionList = useSelector(selectCollectionList);
    const marketInfo = useSelector(selectMarketInfo);
    const [readMore, setReadMore] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [assetList, setAssetList] = React.useState([]);
    const [marketDetail, setMarketDetail] = React.useState({
        total_nfts: 0,
        total_collections: 0,
        total_owners: 0,
        floor_price: 0,
        max_price: 0
    });
    const [preview, setPreview] = React.useState({
        banner: '',
        createdAt: '',
        description: '',
        featured: '',
        itemId: 0,
        logo: '',
        name: '',
        owner: '',
        total_nfts: 0,
        total_owners: 0,
        floor_price: 0,
        max_price: 0,
        count: 0,
        updatedAt: ''
    })

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const handleReadMore = () => {
        setReadMore(!readMore);
    }

    const imgLoader = ({ src, width, quality }: { src: any, width?: any, quality?: any }) => {
        return `https://ipfs.infura.io/ipfs/${src}?w=${width || 300}&q=${quality || 75}`
    }
    const handleAddCollection = () => {
        if (!account) return notify('error', 'please connect your wallet');
        setLoading(true);
        router.push('/marketplace/collection/create');
    }
    const getData = () => {
        if(address && (address === account)) dispatch(actionGetCollectionList({account: address}));
        else dispatch(actionGetCollectionList({}));
        dispatch(actionGetMarketInfo());
    }
    React.useEffect(() => {
        if (collectionList.length > 0) {
            let previewCollection = collectionList[0];

            setPreview(previewCollection);
            setAssetList(collectionList);
        }

    }, [collectionList]);

    React.useEffect(() => {
        if (marketInfo) {
            setMarketDetail(marketInfo);
        }
    }, [marketInfo]);

    React.useEffect(() => {
        getData();
    }, [address]);

    return (
        <Section>
            <MarketplaceHeader readmore={readMore ? 1 : 0}>
                <div className='marketplace-banner'>
                    <Skeleton className='' sx={{ height: '100%', width: '100%', borderRadius: 'inherit', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} animation="wave" variant="rectangular" />
                    {
                        preview.banner && (
                            <Image loader={imgLoader} src={preview.banner} layout="fill" objectFit="fill" />
                        )
                    }
                </div>
                <div className='marketplace-info'>
                    <div className='marketplace-title'>
                        {preview.name || <Skeleton variant="text" width={200} />}
                    </div>
                    <div className='collection-add'>
                        <button className='add' onClick={handleAddCollection}>
                            <AddIcon className='add-icon' />
                            <span>Add collection</span>
                        </button>
                    </div>
                    <div className='marketplace-owner'>
                        <div>Created by</div>
                        {preview.owner && (
                            <div className='address'>
                                {preview.owner.toString().substring(0, 15)} ... {preview.owner.toString().substring(preview.owner.length - 8)}
                            </div>
                        )}
                    </div>
                    <div className='marketplace-toolbar'>
                        <div className='button-group'>
                            <button>
                                <div className='value'>{marketInfo ? (<div>{marketDetail.total_nfts}</div>) : <Skeleton variant="text" />}</div>
                                <div>items</div>
                            </button>
                            <button>
                                <div className='value'>{marketInfo ? (<div>{marketDetail.total_collections}</div>) : <Skeleton variant="text" />}</div>
                                <div>collections</div>
                            </button>
                            <button>
                                <div className='value'>{marketInfo ? (<div>{marketDetail.total_owners}</div>) : <Skeleton variant="text" />}</div>
                                <div>owners</div>
                            </button>
                            <button>
                                <div className='value'>{marketInfo ? (<div>{marketDetail.floor_price / 1e18}</div>) : <Skeleton variant="text" />}</div>
                                <div>floor price</div>
                            </button>
                            <button>
                                <div className='value'>{marketInfo ? (<div>{marketDetail.max_price / 1e18}</div>) : <Skeleton variant="text" />}</div>
                                <div>max price</div>
                            </button>
                        </div>
                    </div>
                    <div className='marketplace-description' >
                        <p>
                            {preview.description}
                        </p>
                    </div>
                    <div className='marketplace-description-more'>
                        <button className='read-more' onClick={handleReadMore}>
                            {readMore ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </button>
                    </div>
                </div>
            </MarketplaceHeader>
            <div className='marketplace-wraper'>
                <CssBaseline />
                <div className='marketplace-body'>
                    <Main>
                        {/* <div className='assets-search-view-header'>
                            <div className='assets-search-view-container'>
                                <div className='search-icon-wrapper'>
                                    <SearchIcon />
                                </div>
                                <input placeholder="Search" />
                            </div>
                            <div className='assets-search-view-dropdowns'>
                            </div>
                        </div> */}
                        <div className='assets-container'>
                            {collectionList && assetList.length > 0 ? (
                                <AssetList assetList={assetList} />
                            ) : (
                                <div className='no-items'>
                                    There is no collections...
                                </div>
                            )}
                        </div>
                    </Main>
                </div>
            </div>
            <PageLoading loading={loading} />
        </Section >
    );
}


