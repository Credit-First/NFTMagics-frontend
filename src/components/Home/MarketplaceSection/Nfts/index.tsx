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
import { Section, Drawer, Main } from './styles';
import { SearchModalDropdownMenu, SearchSortDropDowonMenu, SearchToggleButton } from './SearchItems';
import AssetList from './AssetList';
import { actionGetMarketplace } from '@/store/actions';
import { selectMarketplace } from '@/store/selectors';
import Web3 from "web3";

export default function Nft() {
    // const theme = useTheme();
    const router = useRouter()
    const { collectionId, address } = router.query;
    const dispatch = useDispatch();
    const marketplace = useSelector(selectMarketplace);
    const [sideBaropen, setsideBarOpen] = React.useState(true);
    const [searchText, setSearchText] = React.useState('');
    const [selectFilterItem, setSelectFilterItem] = React.useState({
        sales: false,
        forGift: false,
        purchase: false,
        followings: false
    });
    const [rangePrice, setRangePrice] = React.useState([0, 35]);

    const [assetList, setAssetList] = React.useState([]);

    interface listProps {
        status: boolean,
        price: boolean,
        chains: boolean,
    }
    const [listOpen, setListOpen] = React.useState<listProps>({
        status: true,
        price: true,
        chains: true,
    });

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
        dispatch(actionGetMarketplace({ [item]: true, collectionId }));
    }

    const sleep = (ms: any) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    const handleSearch = async (event: any) => {
        if (event.keyCode == 13) {
            await sleep(1000);
            dispatch(actionGetMarketplace({ ...listOpen, name: searchText, collectionId }));
        }
    }

    const handleChangePrice = (event: any, newValue: any) => {
        setRangePrice(newValue);
    };

    const handleSearchPrice = () => {
        dispatch(actionGetMarketplace({ ...listOpen, rangePrice, name: searchText, collectionId }));
    }

    React.useEffect(() => {
        let filter = {};
        if (address) filter = { ...selectFilterItem, account: address }
        dispatch(actionGetMarketplace(filter)); 
    }, [selectFilterItem]);

    React.useEffect(() => {
        setAssetList(marketplace);
    }, [marketplace]);

    return (
        <Section>
            <div className='collection-wraper'>
                <CssBaseline />
                <div className='collection-body' style={{}}>
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
                                    <SearchModalDropdownMenu />
                                </div>
                                <div className='assets-search-view-sort-dropdown'>
                                    <SearchSortDropDowonMenu />
                                </div>
                                <div className='assets-search-view-toggle-dropdown'>
                                    <SearchToggleButton />
                                </div>
                            </div>
                        </div>
                        <div className='assets-container'>
                            {assetList.length > 0 ? (
                                <AssetList assetList={assetList} sideBarOpen={sideBaropen} />
                            ) : (
                                <div className='no-items'>
                                    There is no items...
                                </div>
                            )}
                        </div>
                    </Main>
                </div>
            </div >
        </Section >
    );
}


