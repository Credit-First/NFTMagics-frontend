import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
    CircularProgress,
    Skeleton,
    Typography,
    Tooltip
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import SubjectIcon from '@mui/icons-material/Subject';
import LabelIcon from '@mui/icons-material/Label';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import BallotIcon from '@mui/icons-material/Ballot';
import RefreshIcon from '@mui/icons-material/Refresh';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import CloseIcon from '@mui/icons-material/Close';
import { CopyToClipboard } from "react-copy-to-clipboard";

import HistoryChart from './HistoryChart';
import HistoryTable from './HistoryTable';
import { OwnerSticky, LargeSection, SmallSection, Accordion, AccordionSummary, AccordionDetails } from './styles';
import { HisttoryDropDownMenu, HisttoryFilterMenu } from './components';

import ImageViewer from 'react-simple-image-viewer';
import AppConfig from "@/utils/AppConfig";
import toast from "@/components/Toast";
import "react-toastify/dist/ReactToastify.css";
import Config from '@/config/app';
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { actionGetMarketItem } from '@/store/actions';
import { selectMarketItem } from '@/store/selectors';
import { useDispatch, useSelector } from 'react-redux';

import ApproveTokenModal from '@/components/Home/ApproveTokenModal';
import PutListModal from '@/components/Home/putListModal';
import PageLoading from '@/components/PageLoading';

const tokenImg = {
    [Config.Token.WBNB.address]: '/images/token/bnb.png',
    [Config.Token.AYRA.address]: '/images/token/ayra.png',
    [Config.Token.ITHD.address]: '/images/token/ithd.png'
}
export default function Assets() {
    const router = useRouter()
    const { itemId } = router.query;

    const web3 = new Web3(Web3.givenProvider);
    const marketItem = useSelector(selectMarketItem);
    const dispatch = useDispatch();
    const [approveModal, setApproveModal] = React.useState(false);
    const [putListModal, setPutListModal] = React.useState(false);
    const [isViewerOpen, setIsViewerOpen] = React.useState(false);
    const [pageLoading, setPadgeLoading] = React.useState(false);
    const [summaryExpanded, setSummaryExpanded] = React.useState<string | false>('summarypanel1');
    const [historyExpanded, setHistoryExpanded] = React.useState<string | false>('historypanel1');
    const [listingExpanded, setListingExpanded] = React.useState<string | false>('listingpanel1');
    const [orderExpanded, setOrderExpanded] = React.useState<string | false>('orderpanel1');
    const [tradeHistoryExpanded, setTradeHistoryExpanded] = React.useState<string | false>('tradeHistorypanel1');
    const { active, account, library }: any = useWeb3React();

    const [loading, setLoading] = React.useState({
        gift: false,
        sale: false
    });

    const [selected, setSelected] = React.useState({
        salePriceSelected: '',
        giftSelected: '',
    })
    const [itemData, setItemData] = React.useState({
        collectionId: 0,
        collectionName: '',
        tokenImg: '',
        tokenId: 0,
        saleToken: '',
        salePrice: 0,
        favorites: 0,
        image: null,
        minter: '',
        seller: '',
        giftAddress: '',
        itemId: 0,
        name: '',
        description: '',
        activeItem: false,
    });

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const imgLoader = ({ src, width, quality }: { src: any, width?: any, quality?: any }) => {
        return `https://ipfs.infura.io/ipfs/${src}?w=${width || 300}&q=${quality || 75}`
    }
    const fromWei = React.useCallback((web3, val) => {
        if (val) {
            val = val.toString();
            return web3.utils.fromWei(val);
        } else {
            return "0"
        }
    }, []);
    const allowanceBalanceof = async (tokenType: any, onAddress: any) => {
        if (tokenType != Config.Token.AYRA.address || tokenType != Config.Token.ITHD.address) return true;
        let token_abi = Config.Token.AYRA.abi;
        let token_address = Config.Token.AYRA.address;

        if (tokenType === Config.Token.ITHD.address) {
            token_abi = Config.Token.ITHD.abi;
            token_address = Config.Token.ITHD.address;
        }

        const web3 = new Web3(Web3.givenProvider);
        const contract = new web3.eth.Contract(token_abi, token_address);
        const allowanceBalanceof = await contract.methods
            .allowance(account, onAddress)
            .call();

        return (Math.floor(allowanceBalanceof / 1e18) > 100);
    };

    const handleLoading = (type: any, state: any) => {
        setLoading((value) => ({ ...value, [type]: state }))
    }
    const handleItemChange = (type: any, value: any) => {
        setItemData((state) => ({ ...state, [type]: value }));
    }
    const handleSummaryChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setSummaryExpanded(newExpanded ? panel : false);
        };
    const handleHistoryChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setHistoryExpanded(newExpanded ? panel : false);
        };
    const handleListingChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setListingExpanded(newExpanded ? panel : false);
        };
    const handleOrderChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setOrderExpanded(newExpanded ? panel : false);
        };
    const handleTradeHistoryChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setTradeHistoryExpanded(newExpanded ? panel : false);
        };
    const handleRefeshItem = () => {
        dispatch(actionGetMarketItem({ itemId: itemId }));
    }
    const handleEditLink = () => {
        setPadgeLoading(true);
        router.push(`/marketplace/assets/${itemData.itemId}/edit`);
    }
    const handleCollectionLink = () => {
        setPadgeLoading(true);
        router.push(`/marketplace/collection/${itemData.collectionId}`);
    }
    const handlePutAction = (type: any) => async () => {
        if (!active) return notify('error', 'please connect your wallet!');
        if (type === 'gift' && itemData.giftAddress == '' || itemData.giftAddress == '0x0000000000000000000000000000000000000000') return notify('error', 'please input the address of gift');
        if (type === 'sale' && itemData.salePrice == 0) return notify('error', 'please input sale price');

        handleLoading(type, true);

        setPutListModal(true);

    }
    const handleBuyAction = async () => {
        if (!active) return notify('error', 'please connect your wallet!');

        const web3 = new Web3(Web3.givenProvider);
        const Market = new web3.eth.Contract(
            Config.Market.abi as [],
            Config.Market.address as string
        );
        const allowance = await allowanceBalanceof(itemData.saleToken, Config.Market.address);

        if (!allowance) {
            return setApproveModal(true);
        }

        handleLoading('sale', true);

        let value = itemData.salePrice * 1e18;
        if (itemData.saleToken !== Config.Token.WBNB.address) value = 0;

        try {
            await Market.methods
                .buyMarketItem(
                    itemId
                )
                .send({ from: account, value: value })
                .on('receipt', async (receipt: any) => {
                    dispatch(actionGetMarketItem({ itemId: itemId }));
                    handleLoading('sale', false);
                    handleItemChange('activeItem', false);
                })
                .then((_tx: any) => {
                    notify('success', 'You have bought the NFT on Marketplace');
                });
        } catch (err: any) {
            if (err.code == 4001) notify('error', err.message);
            else notify('error', 'Error buying the NFT');
            console.log('Error buying the NFT : ', err);
            handleLoading('sale', false);
        }

        handleLoading('sale', false);
    }

    React.useEffect(() => {
        if (marketItem) {
            const salePrice = marketItem.price ? fromWei(web3, marketItem.price) : 0;
            handleItemChange('collectionId', marketItem.collectionId);
            handleItemChange('collectionName', marketItem.collectionName);
            handleItemChange('tokenImg', tokenImg[marketItem.saleToken]);
            handleItemChange('tokenId', marketItem.tokenId);
            handleItemChange('saleToken', marketItem.saleToken);
            handleItemChange('salePrice', salePrice);
            handleItemChange('favorites', marketItem.likes ? marketItem.likes : 0);
            handleItemChange('image', marketItem.image);
            handleItemChange('minter', marketItem.minter);
            handleItemChange('seller', marketItem.seller ? marketItem.seller : marketItem.minter);
            handleItemChange('description', marketItem.description);
            handleItemChange('itemId', marketItem.itemId);
            handleItemChange('name', marketItem.name);
            handleItemChange('giftAddress', marketItem.giftAddress === '0x0000000000000000000000000000000000000000' ? '' : marketItem.giftAddress);
            handleItemChange('activeItem', marketItem.active);
        }
    }, [marketItem]);

    React.useEffect(() => {
        itemId && dispatch(actionGetMarketItem({ itemId: itemId }));
    }, [itemId]);

    return (
        <div className='item-container'>
            <OwnerSticky active={(itemData.seller === account && !itemData.activeItem) ? 1 : 0} loading={loading}>
                <div className='button-group'>
                    <div className='item-action'>
                        <button className='button button-regular' onClick={handleEditLink}>
                            Edit
                        </button>
                    </div>
                    <div className='item-action'>
                        <button className='button button-primary' disabled={loading.gift || loading.sale} onClick={handlePutAction('gift')}>Send Gift</button>
                        {loading.gift && (
                            <CircularProgress className='loading' size={24} />
                        )}
                    </div>
                    <div className='item-action'>
                        <button className='button button-primary' disabled={loading.gift || loading.sale} onClick={handlePutAction('sale')}>Sell</button>
                        {loading.sale && (
                            <CircularProgress className='loading' size={24} />
                        )}
                    </div>
                </div>
            </OwnerSticky >
            <LargeSection className='item-large'>
                <div className='item-wrapper'>
                    <div className='item-summary'>
                        <article className='item-media-frame'>
                            <header>
                                <div className='header-left'>
                                    {
                                        itemData.tokenImg ? (
                                            <img src={itemData.tokenImg} />
                                        ) : (
                                            <Skeleton variant="text" style={{ width: '50%' }} />
                                        )
                                    }
                                </div>
                                <div className='header-right'>
                                    <FavoriteBorderIcon />
                                    {
                                        itemData.favorites ? (
                                            <div>{itemData.favorites}</div>
                                        ) : (
                                            <Skeleton variant="text" style={{ width: '50%' }} />
                                        )
                                    }
                                </div>
                            </header>
                            <div className='item-media-content'>
                                <div className='item-media'>
                                    <div className='media-img'>
                                        <div className='asset-media-image' onClick={() => setIsViewerOpen(true)}>
                                            <Skeleton className='' sx={{ height: '100%', width: '100%', borderRadius: 'inherit', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} animation="wave" variant="rectangular" />
                                            {itemData.image && (
                                                <Image loader={imgLoader} src={itemData.image} layout="fill" objectFit="fill" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <section>
                            <Accordion expanded={true} disableGutters elevation={0}>
                                <AccordionSummary aria-controls="summarypanel1d-content" id="summarypanel1d-header" >
                                    <Typography><SubjectIcon style={{ marginRight: 5 }} />Description</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='item-description'>
                                        <div className='link'>
                                            <div>Created by</div>
                                            {
                                                itemData.minter ? (
                                                    <a href=''>
                                                        <CopyToClipboard text={itemData.minter} >
                                                            <Tooltip arrow title="Copy address">
                                                                <div>
                                                                    {itemData.minter.substring(0, 8)} ... ${itemData.minter.substring(itemData.minter.length - 4)}
                                                                </div>
                                                            </Tooltip>
                                                        </CopyToClipboard>
                                                    </a>
                                                ) : (
                                                    <Skeleton variant="text" style={{ width: '50%' }} />
                                                )
                                            }
                                        </div>
                                        <Typography>
                                            {
                                                itemData.description ? itemData.description : <Skeleton variant="text" style={{ width: '50%' }} />
                                            }
                                        </Typography>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={summaryExpanded === 'summarypanel2'} onChange={handleSummaryChange('summarypanel2')} disableGutters elevation={0}>
                                <AccordionSummary aria-controls="summarypanel2d-content" id="summarypanel2d-header" expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}>
                                    <Typography><LabelIcon style={{ marginRight: 5 }} />Properties</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='item-properties'>
                                        <div className='item-property'>
                                            <div className='property-type'>Background</div>
                                            <div className='property-value'>Tosca</div>
                                            <div className='property-rarity'>7% has this trait</div>
                                        </div>
                                        <div className='item-property'>
                                            <div className='property-type'>Background</div>
                                            <div className='property-value'>Tosca</div>
                                            <div className='property-rarity'>7% has this trait</div>
                                        </div>
                                        <div className='item-property'>
                                            <div className='property-type'>Background</div>
                                            <div className='property-value'>Tosca</div>
                                            <div className='property-rarity'>7% has this trait</div>
                                        </div>
                                        <div className='item-property'>
                                            <div className='property-type'>Background</div>
                                            <div className='property-value'>Tosca</div>
                                            <div className='property-rarity'>7% has this trait</div>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={summaryExpanded === 'summarypanel3'} onChange={handleSummaryChange('summarypanel3')} disableGutters elevation={0}>
                                <AccordionSummary aria-controls="summarypanel3d-content" id="summarypanel3d-header" expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}>
                                    <Typography><VerticalSplitIcon style={{ marginRight: 5 }} />About</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        Karafuru is home to 5,555 generative arts where colors reign supreme. Leave the drab reality and enter the world of Karafuru by Museum of Toys.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={summaryExpanded === 'summarypanel4'} onChange={handleSummaryChange('summarypanel4')} disableGutters elevation={0}>
                                <AccordionSummary aria-controls="summarypanel4d-content" id="summarypanel4d-header" expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}>
                                    <Typography><BallotIcon style={{ marginRight: 5 }} />Detail</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='item-details'>
                                        <div className='item-detail'>
                                            <div>Contract Address</div>
                                            {
                                                itemData.minter ? (
                                                    <a href=''>
                                                        <CopyToClipboard text={itemData.minter} >
                                                            <Tooltip arrow title="Copy address">
                                                                <div>
                                                                    {itemData.minter.substring(0, 8)} ... ${itemData.minter.substring(itemData.minter.length - 4)}
                                                                </div>
                                                            </Tooltip>
                                                        </CopyToClipboard>
                                                    </a>
                                                ) : (
                                                    <Skeleton variant="text" style={{ width: '50%' }} />
                                                )
                                            }
                                        </div>
                                        <div className='item-detail'>
                                            <div>NFT ID</div>
                                            <div>{itemData.itemId}</div>
                                        </div>
                                        <div className='item-detail'>
                                            <div>NFT Standard</div>
                                            <div>ERC-721</div>
                                        </div>
                                        <div className='item-detail'>
                                            <div>Blockchain</div>
                                            <div>Binance Smart Chain</div>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </section>
                    </div>
                    <div className='item-main'>
                        <section className='item-header'>
                            <div className='item-info'>
                                <div className='item-detail'>
                                    <a className='item-link' onClick={handleCollectionLink}>{itemData.collectionName ? itemData.collectionName : <Skeleton variant="text" style={{ width: '50%' }} />}</a>
                                </div>
                                <div className='item-toolbar'>
                                    <div className='button-group'>
                                        <button onClick={handleRefeshItem}><RefreshIcon /></button>
                                        <button>
                                            <a
                                                href={`${AppConfig.test_network}address/${Config.NFT.address}`}
                                                target="_blank"
                                            >
                                                <OpenInNewIcon />
                                            </a>
                                        </button>
                                        <button><ShareIcon /></button>
                                        <button><MoreVertIcon /></button>
                                    </div>
                                </div>
                            </div>
                            {
                                itemData.name ? <h1>{itemData.name} #{itemData.itemId}</h1> : <h1><Skeleton variant="text" style={{ width: '50%' }} /></h1>
                            }
                        </section>
                        <section className='item-count'>
                            <div className='link'>
                                <div style={{ marginRight: 10 }}>Owned by</div>
                                <CopyToClipboard text={itemData.seller}>
                                    <Tooltip arrow title="Copy address">
                                        <div style={{ fontWeight: 400 }}>
                                            {itemData.seller.substring(0, 15)} ... ${itemData.seller.substring(itemData.seller.length - 8)}
                                        </div>
                                    </Tooltip>
                                </CopyToClipboard>
                            </div>
                            <button className='favorite-by'>
                                <FavoriteIcon className='icon' />
                                <div className='count'>{itemData.favorites ? itemData.favorites : <Skeleton variant="text" style={{ width: '50%' }} />}</div>
                                <div>favorites</div>
                            </button>
                        </section>
                        <div className='item-frame'>
                            <section className='section'>
                                <div className='tradeStation-main'>
                                    <div className='tradeStation-ask-label'>
                                        Price
                                    </div>
                                    <div className='tradeStation-price-container'>
                                        <div className='price'>
                                            {
                                                itemData.salePrice > 0 ? (
                                                    <>
                                                        <div>
                                                            {marketItem ? (
                                                                <img src={itemData.tokenImg} width={40} height={40} />
                                                            ) : (
                                                                <Skeleton variant="text" style={{ width: 50, height: 50 }} />
                                                            )}
                                                        </div>
                                                        <div className='price-amount'>{marketItem ? itemData.salePrice : <Skeleton variant="text" style={{ width: 100, height: 50 }} />}</div>
                                                        <div className='flat-price'>{itemData.salePrice ? '($2.00)' : ''}</div>
                                                        {
                                                            itemData.activeItem && (
                                                                <div className='status'>Actived</div>
                                                            )
                                                        }
                                                    </>
                                                ) : (
                                                    <div className='not-price'>The sale price is yet to be determined.</div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    {
                                        itemData.giftAddress && (
                                            <div className='tradeStation-detail'>
                                                {
                                                    itemData.seller === account ? (
                                                        <div>
                                                            {itemData.activeItem ? 'You have sent the NFT as a gift:' : 'You have set the address of gift:'}
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            {itemData.activeItem ? 'This NFT has been sent as a gift:' : 'This NFT has been set the address of gift:'}
                                                        </div>
                                                    )
                                                }
                                                <div className='gift-address'>
                                                    <CopyToClipboard text={itemData.giftAddress}>
                                                        <Tooltip arrow title="Copy address">
                                                            <div>
                                                                {itemData.giftAddress.substring(0, 15)} ... ${itemData.giftAddress.substring(itemData.giftAddress.length - 8)}
                                                            </div>
                                                        </Tooltip>
                                                    </CopyToClipboard>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div className='item-action'>
                                        {
                                            account ? (
                                                itemData.seller === account ? (
                                                    <div>Owned by yours</div>
                                                ) : (
                                                    <div>
                                                        {
                                                            itemData.activeItem ? (
                                                                <button className='button button-primary' onClick={handleBuyAction}>Buy Now</button>
                                                            ) : (
                                                                <div>This Nft is yet not sold</div>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            ) : (
                                                <div>Connect your wallet</div>
                                            )
                                        }
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className='item-history'>
                            <Accordion expanded={historyExpanded === 'historypanel1'} onChange={handleHistoryChange('historypanel1')} disableGutters elevation={0}>
                                <AccordionSummary aria-controls="historypanel1d-content" id="historypanel1d-header" expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}>
                                    <Typography><ShowChartIcon style={{ marginRight: 5 }} />Price History</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='history-interface'>
                                        <HisttoryDropDownMenu />
                                    </div>
                                    <div className='history-graph'>
                                        <HistoryChart />
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        <div className='item-listing'>
                            <Accordion expanded={listingExpanded === 'listingpanel1'} onChange={handleListingChange('listingpanel1')} disableGutters elevation={0}>
                                <AccordionSummary aria-controls="listingpanel1d-content" id="listingpanel1d-header" expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}>
                                    <Typography><LocalOfferIcon style={{ marginRight: 5 }} />Listings</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='panel-body'>
                                        <div className='list-empty'>
                                            <div className='empty-img flex justify-center'>
                                                <img src='/svg/empty-bids.svg' width={140} height={140} />
                                                {/* <img src={'/svg/empty-bids.svg'} width={40} height={40} /> */}
                                                {/* <Skeleton variant="circular" width={40} height={40} /> */}
                                            </div>
                                            <div className='no-text flex justify-center'>No Offers yet</div>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        {/* <div className='item-orders'>
                            <Accordion expanded={orderExpanded === 'orderpanel1'} onChange={handleOrderChange('orderpanel1')} disableGutters elevation={0}>
                                <AccordionSummary aria-controls="orderpanel1d-content" id="orderpanel1d-header" expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}>
                                    <Typography><TocIcon style={{ marginRight: 5 }} />Orders</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className='panel-body'>
                                        <div className='list-empty'>
                                            <div className='empty-img flex justify-center'>
                                                <img src='/svg/empty-bids.svg' width={140} height={140} />
                                            </div>
                                            <div className='no-text flex justify-center'>No Offers yet</div>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div> */}
                    </div>
                </div>
                <div className='item-trading-history'>
                    <Accordion expanded={tradeHistoryExpanded === 'tradeHistorypanel1'} onChange={handleTradeHistoryChange('tradeHistorypanel1')} disableGutters elevation={0}>
                        <AccordionSummary aria-controls="tradeHistorypanel1d-content" id="tradeHistorypanel1d-header" expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}>
                            <Typography><SwapVertIcon style={{ marginRight: 5 }} />Item Activity</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ padding: 0 }}>
                            <div className='history-filter'>
                                <HisttoryFilterMenu />
                            </div>
                            <ul className='filter-pills'>
                                <li className='filter-pill'>
                                    <div className='pill'>
                                        <span>Listings</span>
                                        <button className='pill-delete'>
                                            <CloseIcon />
                                        </button>
                                    </div>
                                </li>
                                <li className='filter-pill'>
                                    <div className='pill'>
                                        <span>Sales</span>
                                        <button className='pill-delete'>
                                            <CloseIcon />
                                        </button>
                                    </div>
                                </li>
                                <div className='clear-all'>
                                    <button>Clear All</button>
                                </div>
                            </ul>
                            <div className='history-table'>
                                {/* <HistoryTable /> */}
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div className='item-frame'></div>
            </LargeSection>
            <SmallSection className='item-sm'>
                <div className='item-wrapper'>
                    <section className='item-header'>
                        <div className='item-info'>
                            <div className='item-detail'>
                                <a className='item-link' onClick={handleCollectionLink}>{itemData.collectionName ? itemData.collectionName : <Skeleton variant="text" style={{ width: '50%' }} />}</a>
                            </div>
                            <div className='item-toolbar'>
                                <div className='button-group'>
                                    <button onClick={handleRefeshItem}><RefreshIcon /></button>
                                    <button>
                                        <a
                                            href={`${AppConfig.test_network}address/${Config.NFT.address}`}
                                            target="_blank"
                                        >
                                            <OpenInNewIcon />
                                        </a>
                                    </button>
                                    <button><ShareIcon /></button>
                                    <button><MoreVertIcon /></button>
                                </div>
                            </div>
                        </div>
                        {
                            marketItem ? <h1>{itemData.name} #{itemData.itemId}</h1> : <h1><Skeleton variant="text" style={{ width: '50%' }} /></h1>
                        }
                    </section>
                    <article className='item-media-frame'>
                        <header>
                            <div className='header-left'>
                                {
                                    itemData.tokenImg ? (
                                        <img src={itemData.tokenImg} />
                                    ) : (
                                        <Skeleton variant="text" style={{ width: '50%' }} />
                                    )
                                }
                            </div>
                            <div className='header-right'>
                                <FavoriteBorderIcon />
                                {
                                    itemData.favorites ? (
                                        <div>{itemData.favorites}</div>
                                    ) : (
                                        <Skeleton variant="text" style={{ width: '50%' }} />
                                    )
                                }
                            </div>
                        </header>
                        <div className='item-media-content'>
                            <div className='item-media'>
                                <div className='media-img'>
                                    <div className='asset-media-image' onClick={() => setIsViewerOpen(true)}>
                                        <Skeleton className='' sx={{ height: '100%', width: '100%', borderRadius: 'inherit', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} animation="wave" variant="rectangular" />
                                        {itemData.image && (
                                            <Image loader={imgLoader} src={itemData.image} layout="fill" objectFit="fill" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                    <section className='item-count'>
                        <div className='link'>
                            <div>Owned by</div>
                            <a href=''>{itemData.seller ? itemData.seller : <Skeleton variant="text" style={{ width: '50%' }} />}</a>
                        </div>
                        <button className='favorite-by'>
                            <FavoriteIcon className='icon' />
                            <div className='count'>{itemData.favorites ? itemData.favorites : <Skeleton variant="text" style={{ width: '50%' }} />}</div>
                            <div>favorites</div>
                        </button>
                    </section>
                    <div className='item-frame'>
                        <div>
                            <section className='section'>
                                <div className='tradeStation-main'>
                                    <div className='tradeStation-ask-label'>
                                        Price
                                    </div>
                                    <div className='tradeStation-price-container'>
                                        <div className='price'>
                                            {
                                                itemData.salePrice ? (
                                                    <>
                                                        <div>
                                                            {marketItem ? (
                                                                <img src={itemData.tokenImg} width={40} height={40} />
                                                            ) : (
                                                                <Skeleton variant="text" style={{ width: 50, height: 50 }} />
                                                            )}
                                                        </div>
                                                        <div className='price-amount'>{marketItem ? itemData.salePrice : <Skeleton variant="text" style={{ width: 100, height: 50 }} />}</div>
                                                        <div className='flat-price'>{itemData.salePrice ? '($2.00)' : ''}</div>
                                                        {
                                                            itemData.activeItem && (
                                                                <div className='status'>Actived</div>
                                                            )
                                                        }
                                                    </>
                                                ) : (
                                                    <div className='not-price'>The sale price is yet to be determined.</div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    {
                                        itemData.giftAddress && (
                                            <div className='tradeStation-detail'>
                                                {
                                                    itemData.seller === account ? (
                                                        <div>
                                                            {itemData.activeItem ? 'You have sent the NFT as a gift:' : 'You have set the address of gift:'}
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            {itemData.activeItem ? 'This NFT has been sent as a gift:' : 'This NFT has been set the address of gift:'}
                                                        </div>
                                                    )
                                                }
                                                <div className='gift-address'>
                                                    <CopyToClipboard text={itemData.giftAddress}>
                                                        <Tooltip arrow title="Copy address">
                                                            <div>
                                                                {itemData.giftAddress.substring(0, 15)} ... ${itemData.giftAddress.substring(itemData.giftAddress.length - 8)}
                                                            </div>
                                                        </Tooltip>
                                                    </CopyToClipboard>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <div className='item-action'>
                                        {
                                            itemData.seller === account ? (
                                                <div>Owned by yours</div>
                                            ) : (
                                                <div>
                                                    {
                                                        itemData.activeItem ? (
                                                            <div>This Nft is sold by {itemData.seller}</div>
                                                        ) : (
                                                            <button className='button button-primary'>Buy Now</button>
                                                        )
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className='item-history'>
                        <Accordion expanded={historyExpanded === 'historypanel1'} onChange={handleHistoryChange('historypanel1')} disableGutters elevation={0}>
                            <AccordionSummary aria-controls="historypanel1d-content" id="historypanel1d-header" expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}>
                                <Typography><ShowChartIcon style={{ marginRight: 5 }} />Price History</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='history-interface'>
                                    <HisttoryDropDownMenu />
                                </div>
                                <div className='history-graph'>
                                    <HistoryChart />
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    <div className='item-listing'>
                        <Accordion expanded={listingExpanded === 'listingpanel1'} onChange={handleListingChange('listingpanel1')} disableGutters elevation={0}>
                            <AccordionSummary aria-controls="listingpanel1d-content" id="listingpanel1d-header" expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}>
                                <Typography><LocalOfferIcon style={{ marginRight: 5 }} />Listings</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='panel-body'>
                                    <div className='list-empty'>
                                        <div className='empty-img flex justify-center'>
                                            <img src='/svg/empty-bids.svg' width={140} height={140} />
                                            {/* <img src={'/svg/empty-bids.svg'} width={40} height={40} /> */}
                                            {/* <Skeleton variant="circular" width={40} height={40} /> */}
                                        </div>
                                        <div className='no-text flex justify-center'>No Offers yet</div>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                    {/* <div className='item-orders'>
                        <Accordion expanded={orderExpanded === 'orderpanel1'} onChange={handleOrderChange('orderpanel1')} disableGutters elevation={0}>
                            <AccordionSummary aria-controls="orderpanel1d-content" id="orderpanel1d-header" expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}>
                                <Typography><TocIcon style={{ marginRight: 5 }} />Orders</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='panel-body'>
                                    <div className='list-empty'>
                                        <div className='empty-img flex justify-center'>
                                            <img src='/svg/empty-bids.svg' width={140} height={140} />
                                        </div>
                                        <div className='no-text flex justify-center'>No Offers yet</div>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div> */}
                    {/* <div className='item-trading-history'>
                        <Accordion expanded={tradeHistoryExpanded === 'tradeHistorypanel1'} onChange={handleTradeHistoryChange('tradeHistorypanel1')} disableGutters elevation={0}>
                            <AccordionSummary aria-controls="tradeHistorypanel1d-content" id="tradeHistorypanel1d-header" expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}>
                                <Typography><SwapVertIcon style={{ marginRight: 5 }} />Item Activity</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ padding: 0 }}>
                                <div className='history-filter'>
                                    <HisttoryFilterMenu />
                                </div>
                                <ul className='filter-pills'>
                                    <li className='filter-pill'>
                                        <div className='pill'>
                                            <span>Listings</span>
                                            <button className='pill-delete'>
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </li>
                                    <li className='filter-pill'>
                                        <div className='pill'>
                                            <span>Sales</span>
                                            <button className='pill-delete'>
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </li>
                                    <div className='clear-all'>
                                        <button>Clear All</button>
                                    </div>
                                </ul>
                                <div className='history-table'>
                                    <HistoryTable />
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div> */}
                </div>
            </SmallSection>
            <ApproveTokenModal modal={approveModal} setModal={setApproveModal} approveTokenType={itemData.saleToken} onAddress={Config.Market.address} />
            <PutListModal modal={putListModal} setModal={setPutListModal} item={itemData} handleLoading={handleLoading} />
            {isViewerOpen && (
                <ImageViewer
                    src={[`https://ipfs.infura.io/ipfs/${itemData.image}`]}
                    currentIndex={0}
                    disableScroll={false}
                    closeOnClickOutside={true}
                    backgroundStyle={{ zIndex: 9999, background: '#0000008f' }}
                    onClose={() => setIsViewerOpen(false)}
                />
            )}
            <PageLoading loading={pageLoading ? 1 : 0} />
        </div >
    )
}