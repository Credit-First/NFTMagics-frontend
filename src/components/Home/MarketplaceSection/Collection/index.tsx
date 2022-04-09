import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import {
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    CssBaseline,
    Skeleton,
    IconButton,
    Slider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { Section, CollectionHeader, Drawer, Main } from './styles';
import { SearchModalDropdownMenu, SearchSortDropDowonMenu, SearchToggleButton } from './SearchItems';
import AssetList from './AssetList';
import { actionGetMarketplace, actionGetCollectionItem } from '@/store/actions';
import { selectMarketplace, selectCollectionItem } from '@/store/selectors';
import toast from "@/components/Toast";
import "react-toastify/dist/ReactToastify.css";
import { useWeb3React } from "@web3-react/core";

export default function Collection() {
    const router = useRouter()
    const { collectionId, gift, address, search, favorite}: any = router.query;
    const { active, account }: any = useWeb3React();
    const dispatch = useDispatch();
    const marketplace = useSelector(selectMarketplace);
    const collectionItem = useSelector(selectCollectionItem);
    const [sideBaropen, setsideBarOpen] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');
    const [sortFilter, setSortFilter] = React.useState(-1);
    const [selectFilterItem, setSelectFilterItem] = React.useState({
        sales: false,
        forGift: false,
        purchase: false,
        followings: false
    });
    const [rangePrice, setRangePrice] = React.useState([0, 35]);
    const [readMore, setReadMore] = React.useState(false);

    const [assetList, setAssetList] = React.useState([]);
    const [collection, setCollection] = React.useState({
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

    interface listProps {
        status: boolean,
        price: boolean,
        chains: boolean,
        mycollection: boolean
    }
    const [listOpen, setListOpen] = React.useState<listProps>({
        status: true,
        price: true,
        chains: true,
        mycollection: true
    });

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const handleToggleSideBar = () => {
        setsideBarOpen(!sideBaropen);
    };

    const handleListClick = (type: string) => () => {
        function typedKeys<T>(o: T): (keyof T)[] {
            return Object.keys(o) as (keyof T)[];
        }
        typedKeys(listOpen).filter(k => {
            if (k === type) {
                setListOpen({
                    ...listOpen, [type]: !listOpen[k]
                });
            }
        });
        dispatch(actionGetMarketplace({ collectionId }));
    };

    const handleSelectFilterItem = (item: string) => () => {
        if(!account) return notify('error', 'please connect your wallet');
        if (item === 'sales') {
            setSelectFilterItem(value => ({ ...value, sales: !selectFilterItem.sales }));
        }
        if (item === 'forGift') {
            setSelectFilterItem(value => ({ ...value, forGift: !selectFilterItem.forGift }));
        }
        if (item === 'purchase') {
            setSelectFilterItem(value => ({ ...value, purchase: !selectFilterItem.purchase }));
        }
        if (item === 'followings') {
            setSelectFilterItem(value => ({ ...value, followings: !selectFilterItem.followings }));
        }
    }

    const handleReadMore = () => {
        setReadMore(!readMore);
    }
    const imgLoader = ({ src, width, quality }: { src: any, width?: any, quality?: any }) => {
        return `https://ipfs.infura.io/ipfs/${src}?w=${width || 300}&q=${quality || 75}`
    }

    const sleep = (ms: any) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    const handleSearch = async (event: any) => {
        if (event.keyCode == 13) {
            await sleep(1000);
            getData();
        }
    }

    const handleChangePrice = (event: any, newValue: any) => {
        setRangePrice(newValue);
    };

    const handleSearchPrice = () => {
        getData();
    }

    const handleSortFilter = (key:any) => {
        setSortFilter(key);
    }

    const getData = () => {
        if (collectionId) dispatch(actionGetCollectionItem({ collectionId }));
        // if (gift) setSelectFilterItem(value => ({ ...value, forGift: true }));
        if (search) setSearchText(search);

        dispatch(actionGetMarketplace({
            ...selectFilterItem,
            sales: selectFilterItem.sales,
            forGift: !!gift || selectFilterItem.forGift,
            followings: (!!favorite || selectFilterItem.followings),
            account: account || address,
            collectionId: collectionId,
            name: searchText,
            sort: sortFilter
        }));
    }

    React.useEffect(() => {
        setAssetList(marketplace);
    }, [marketplace]);

    React.useEffect(() => {
        collectionItem && setCollection(collectionItem);
    }, [collectionItem]);

    React.useEffect(() => {
        getData();
    }, [collectionId, address, gift, search, selectFilterItem, rangePrice, favorite, sortFilter]);

    return (
        <Section>
            {
                collectionId && (
                    <CollectionHeader readmore={readMore ? 1 : 0}>
                        <div className='collection-banner'>
                            <Skeleton className='' sx={{ height: '100%', width: '100%', borderRadius: 'inherit', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} animation="wave" variant="rectangular" />
                            {
                                collection.banner && (
                                    <Image loader={imgLoader} src={collection.banner} layout="fill" objectFit="fill" />
                                )
                            }
                        </div>
                        <div className='collection-info'>
                            <div className='collection-logo'>
                                <Skeleton className='' sx={{ height: '100%', width: '100%', background: '#e3e3e3' }} animation="wave" variant="rectangular" />
                                {
                                    collection.logo && (
                                        <Image loader={imgLoader} src={collection.logo} layout="fill" objectFit="fill" />
                                    )
                                }
                            </div>
                            <div className='collection-title'>{collection.name || <Skeleton variant="text" />}</div>
                            <div className='collection-owner'>
                                <div>Created by</div>
                                {collection.owner && (
                                    <div className='name'>
                                        {collection.owner.toString().substring(0, 15)} ... {collection.owner.toString().substring(collection.owner.length - 8)}
                                    </div>
                                )}
                            </div>
                            <div className='collection-toolbar'>
                                <div className='button-group'>
                                    <button>
                                        <div className='value'>{collectionItem ? (<div>{collection.total_nfts}</div>) : <Skeleton variant="text" />}</div>
                                        <div>items</div>
                                    </button>
                                    <button>
                                        <div className='value'>{collectionItem ? (<div>{collection.total_owners}</div>) : <Skeleton variant="text" />}</div>
                                        <div>owners</div>
                                    </button>
                                    <button>
                                        <div className='value'>{collectionItem ? (<div>{collection.floor_price / 1e18}</div>) : <Skeleton variant="text" />}</div>
                                        <div>floor price</div>
                                    </button>
                                    <button>
                                        <div className='value'>{collectionItem ? (<div>{collection.max_price / 1e18}</div>) : <Skeleton variant="text" />}</div>
                                        <div>max price</div>
                                    </button>
                                </div>
                            </div>
                            <div className='collection-description' >
                                <p>
                                    {collection.description}
                                </p>
                            </div>
                            <div className='collection-description-more'>
                                <button className='read-more' onClick={handleReadMore}>
                                    {readMore ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </button>
                            </div>
                        </div>
                    </CollectionHeader>
                )
            }
            <div className='collection-wraper'>
                <CssBaseline />
                <div className='collection-body'>
                    <div className='sticky'>
                        <Drawer className='drawer' open={sideBaropen}>
                            <div className='drawer-header'>
                                <div className='filter-header'>
                                    <FilterListIcon />
                                    Filter
                                </div>
                                <IconButton onClick={handleToggleSideBar}>
                                    {sideBaropen ? <ArrowBackIcon /> : <ArrowForwardIcon />}
                                </IconButton>
                            </div>
                            <div className='drawer-content'>
                                <List className='navbar-list' component="nav" >
                                    <ListItemButton className='navbar-list-button' onClick={handleListClick('status')}>
                                        <ListItemText primary="Status" />
                                        {listOpen.status ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </ListItemButton>
                                    <Collapse className='navbar-list-content' in={listOpen.status} timeout="auto" unmountOnExit>
                                        <List className='filter-panel' component="div">
                                            <button className={clsx('filter-panel-item', (selectFilterItem.sales ? 'isSelected' : ''))} onClick={handleSelectFilterItem('sales')}>Sales</button>
                                            <button className={clsx('filter-panel-item', (selectFilterItem.forGift ? 'isSelected' : ''))} onClick={handleSelectFilterItem('forGift')}>For Gift</button>
                                            <button className={clsx('filter-panel-item', (selectFilterItem.purchase ? 'isSelected' : ''))} onClick={handleSelectFilterItem('purchase')}>Purchase</button>
                                            <button className={clsx('filter-panel-item', (selectFilterItem.followings ? 'isSelected' : ''))} onClick={handleSelectFilterItem('followings')}>Followings</button>
                                        </List>
                                    </Collapse>
                                    <ListItemButton className='navbar-list-button' onClick={handleListClick('price')}>
                                        <ListItemText primary="Price" />
                                        {listOpen.price ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </ListItemButton>
                                    <Collapse className='navbar-list-content' in={listOpen.price} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <div style={{ padding: 20 }}>
                                                <Slider
                                                    getAriaLabel={() => 'Price range'}
                                                    value={rangePrice}
                                                    onChange={handleChangePrice}
                                                    valueLabelDisplay="auto"
                                                    step={0.05}
                                                    max={100}
                                                    min={0}
                                                    onChangeCommitted={handleSearchPrice}
                                                />
                                            </div>
                                        </List>
                                    </Collapse>
                                    <ListItemButton className='navbar-list-button' onClick={handleListClick('chains')}>
                                        <ListItemText primary="Chains" />
                                        {listOpen.chains ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </ListItemButton>
                                    <Collapse className='navbar-list-content' in={listOpen.chains} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <ListItemButton sx={{ pl: 4 }}>
                                                <ListItemText primary="BSC Chains" />
                                            </ListItemButton>
                                            <ListItemButton sx={{ pl: 4 }}>
                                                <ListItemText primary="ETH Chains" />
                                            </ListItemButton>
                                        </List>
                                    </Collapse>
                                </List>
                            </div>
                        </Drawer >
                    </div>
                    <Main>
                        <div className='assets-search-view-header'>
                            <div className='assets-search-view-container'>
                                <div className='search-icon-wrapper'>
                                    <SearchIcon />
                                </div>
                                <input placeholder="Search" onKeyDown={handleSearch} onChange={e => setSearchText(e.target.value)} value={searchText} />
                            </div>
                            <div className='assets-search-view-dropdowns'>
                                <div className='assets-search-view-modal-dropdown'>
                                    {/* <SearchModalDropdownMenu /> */}
                                </div>
                                <div className='assets-search-view-sort-dropdown'>
                                    <SearchSortDropDowonMenu setSort={handleSortFilter}/>
                                </div>
                                <div className='assets-search-view-toggle-dropdown'>
                                    <SearchToggleButton />
                                </div>
                            </div>
                        </div>
                        <div className='assets-container'>
                            { assetList.length > 0 ? (
                                <AssetList assetList={assetList} sideBarOpen={sideBaropen} />
                            ) : (
                                <div className='no-items'>
                                    There are no items...
                                </div>
                            )}
                        </div>
                    </Main>
                </div>
            </div >
        </Section >
    );
}


