import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
    Button,
    Skeleton,
    Tooltip,
    CircularProgress
} from '@mui/material';
import SwitchUnstyled from '@mui/base/SwitchUnstyled';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RefreshIcon from '@mui/icons-material/Refresh';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CopyToClipboard } from "react-copy-to-clipboard";

import { LargeSection, SmallSection, Input, SwitchButton } from './styles';
import { TokenDropDownMenu } from './components';

import AppConfig from "@/utils/AppConfig";
import Config from '@/config/app';
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import toast from "@/components/Toast";
import "react-toastify/dist/ReactToastify.css";

import { actionGetMarketItem } from '@/store/actions';
import { selectMarketItem, selectErrorMarketplace } from '@/store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import PageLoading from '@/components/PageLoading';

const tokenImg = {
    [Config.Token.WBNB.address]: '/images/token/bnb.png',
    [Config.Token.AYRA.address]: '/images/token/ayra.png',
    [Config.Token.ITHD.address]: '/images/token/ithd.png'
}
export default function EditAssets() {
    const router = useRouter()
    const { itemId } = router.query;

    const web3 = new Web3(Web3.givenProvider);

    const marketItem = useSelector(selectMarketItem);
    const errorNft = useSelector(selectErrorMarketplace);
    const dispatch = useDispatch();
    const { active, account }: any = useWeb3React();

    const [loading, setLoading] = React.useState(false);
    const [pageLoading, setPadgeLoading] = React.useState(false);
    const [selected, setSelected] = React.useState({
        salePriceSelected: '',
        royaltySelected: '',
        giftSelected: '',
    })
    const [itemData, setItemData] = React.useState({
        collectionId: 0,
        collectionName: '',
        tokenImg: '',
        saleToken: '',
        salePrice: 0,
        favorites: 0,
        image: null,
        minter: '',
        seller: '',
        owner: '',
        giftAddress: '',
        itemId: 0,
        name: '',
        description: '',
        activeItem: false,
    });
    const [inputData, setInputData] = React.useState({
        saleTokenType: 0,
        salePrice: 0,
        royalty: 0,
        giftAddress: ''
    })

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
    const handleSelected = (type: any) => (event: any) => {
        setSelected((value) => ({ ...value, [type]: event.target.checked }))
    }
    const handleInputChange = (type: any) => (event: any) => {
        setInputData((value) => ({ ...value, [type]: event.target.value }))
    }
    const handleItemChange = (type: any, value: any) => {
        setItemData((state) => ({ ...state, [type]: value }));
    }
    const handleRefreshItem = () => {
        setPadgeLoading(true);
        dispatch(actionGetMarketItem({ itemId: itemId }));
    }
    const toWei = React.useCallback((web3, val) => {
        if (val) {
            val = val.toString();
            return web3.utils.toWei(val, 'ether');
        } else {
            return "0"
        }
    }, []);

    const handleCollectionLink = () => {
        setPadgeLoading(true);
        router.push(`/marketplace/collection${itemData.collectionId}`);
    }
    const handleEditAction = async () => {
        if (!active) return notify('error', 'please connect your wallet!');
        if (!selected.giftSelected && !selected.salePriceSelected) return notify('error', 'please input price or gift address');
        if (selected.salePriceSelected && (inputData.salePrice == 0 || !inputData.saleTokenType)) return notify('error', 'please input price or select token type');
        if (selected.giftSelected && (!inputData.giftAddress)) return notify('error', 'please input gift address');

        const web3 = new Web3(Web3.givenProvider);
        const Market = new web3.eth.Contract(
            Config.Market.abi as [],
            Config.Market.address as string
        );

        setLoading(true);

        const salePrice = toWei(web3, inputData.salePrice);
        const saleTokenType = inputData.saleTokenType
        const giftAddress = inputData.giftAddress === '' ? '0x0000000000000000000000000000000000000000' : inputData.giftAddress;
        const royalty = inputData.royalty;

        try {
            await Market.methods
                .updateMarketItem(
                    itemId,
                    salePrice,
                    saleTokenType,
                    giftAddress,
                    royalty
                )
                .send({ from: account })
                .on('receipt', async (receipt: any) => {
                    handleItemChange('salePrice', Number(inputData.salePrice));
                    handleItemChange('giftAddress', inputData.giftAddress);
                    handleItemChange('saleTokenType', inputData.saleTokenType);

                    setInputData({
                        saleTokenType: 0,
                        salePrice: 0,
                        royalty: 0,
                        giftAddress: ''
                    });
                    await dispatch(actionGetMarketItem({ itemId: itemId }));
                    setLoading(false);
                    setPadgeLoading(true);
                    router.push(`/marketplace/assets/${itemId}/get`);
                })
                .then((_tx: any) => {
                    notify('success', 'You have update the item');
                });
        } catch (err: any) {
            if (err.code == 4001) notify('error', err.message);
            else notify('error', 'Error updating the item');
            console.log('Error updating the item : ', err);
            setLoading(false);
        }

        setLoading(false);
    }

    React.useEffect(() => {
        if (errorNft) {
            setPadgeLoading(false);
            notify('error', 'Network connection Error');
            return;
        }
    }, [errorNft]);

    React.useEffect(() => {
        if (marketItem) {
            const salePrice = marketItem.price ? fromWei(web3, marketItem.price) : 0;
            handleItemChange('collectionId', marketItem.collectionId);
            handleItemChange('collectionName', marketItem.collectionName);
            handleItemChange('tokenImg', tokenImg[marketItem.saleToken]);
            handleItemChange('saleToken', marketItem.saleToken);
            handleItemChange('salePrice', salePrice);
            handleItemChange('favorites', marketItem.likes ? marketItem.likes : 0);
            handleItemChange('image', marketItem.image);
            handleItemChange('minter', marketItem.minter);
            handleItemChange('seller', marketItem.seller ? marketItem.seller : marketItem.minter);
            handleItemChange('seller', marketItem.owner ? marketItem.owner : marketItem.minter);
            handleItemChange('description', marketItem.description);
            handleItemChange('itemId', marketItem.itemId);
            handleItemChange('name', marketItem.name);
            handleItemChange('giftAddress', marketItem.giftAddress === '0x0000000000000000000000000000000000000000' ? '' : marketItem.giftAddress);
            handleItemChange('activeItem', marketItem.active);
            setInputData((value) => ({ ...value, salePrice: 0 }));
            setInputData((value) => ({ ...value, saleTokenType: 0 }));
            setInputData((value) => ({ ...value, royalty: 0 }));
            setInputData((value) => ({ ...value, giftAddress: '' }));

            setPadgeLoading(false);
        }
    }, [marketItem]);

    React.useEffect(() => {
        setPadgeLoading(true);
        itemId && dispatch(actionGetMarketItem({ itemId: itemId }));
    }, [itemId]);

    return (
        <div className='item-container'>
            <LargeSection className='item-large' loading={loading ? 1 : 0}>
                <div className='item-wrapper'>
                    <div className='item-main'>
                        <section className='item-header'>
                            <div className='item-info'>
                                <div className='item-detail'>
                                    <a className='item-link' onClick={handleCollectionLink}>{itemData.collectionName ? itemData.collectionName : <Skeleton variant="text" style={{ width: '50%' }} />}</a>
                                </div>
                                <div className='item-toolbar'>
                                    <div className='button-group'>
                                        <button onClick={handleRefreshItem}><RefreshIcon /></button>
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
                                <div>Owned by yours</div>
                            </div>
                            <button className='favorite-by'>
                                <FavoriteIcon className='icon' />
                                <div className='count'>{itemData.favorites ? itemData.favorites : <Skeleton variant="text" style={{ width: '50%' }} />}</div>
                                <div>favorites</div>
                            </button>
                        </section>
                        <div className='item-frame'>
                            <div className='tradeStation-main'>
                                <div className='price-container'>
                                    <div className='tradeStation-ask-label'>
                                        Current Price
                                    </div>
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
                                                </>
                                            ) : (
                                                <div className='not-price'>The sale price is yet to be determined.</div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='edit-container'>
                                    <div className="tradeStation-sale">
                                        <div className='sub'>
                                            <div className="sub-title">Select sale option of your NFT in the marketplace.</div>
                                            <SwitchUnstyled className='sale' component={SwitchButton} onChange={handleSelected('salePriceSelected')} />
                                        </div>
                                        <div className='sub-content'>
                                            <Input className="input-text" disabled={!selected.salePriceSelected}>
                                                <div className='input-prefix'></div>
                                                <input value={inputData.salePrice} onChange={handleInputChange('salePrice')} autoCapitalize="off" autoComplete="off" autoCorrect="off" data-testid="Input" id="salePrice" name="salePrice" placeholder="Input sale price" spellCheck="false" type="number" disabled={!selected.salePriceSelected}></input>
                                            </Input>
                                            <TokenDropDownMenu disabled={!selected.salePriceSelected} setInputData={setInputData} inputData={inputData} />
                                        </div>
                                    </div>
                                    {itemData.owner === account && (
                                        <div className="tradeStation-royalty">
                                            <div className='sub'>
                                                <div className="sub-title">Select royalty of your NFT in the marketplace.</div>
                                                <SwitchUnstyled className='sale' component={SwitchButton} onChange={handleSelected('royaltySelected')} />
                                            </div>
                                            <div className='sub-content'>
                                                <Input className="input-text" disabled={!selected.royaltySelected}>
                                                    <div className='input-prefix'></div>
                                                    <input value={inputData.royalty} onChange={handleInputChange('royalty')} autoCapitalize="off" autoComplete="off" autoCorrect="off" data-testid="Input" id="salePrice" name="salePrice" placeholder="Input sale price" spellCheck="false" type="number" disabled={!selected.royaltySelected}></input>
                                                </Input>
                                            </div>
                                        </div>
                                    )}
                                    <div className="tradeStation-gift">
                                        <div className='sub'>
                                            <div className="sub-title">Select gift option of your NFT to give your person.</div>
                                            <SwitchUnstyled className='gift' component={SwitchButton} onChange={handleSelected('giftSelected')} />
                                        </div>
                                        <Input className="input-text" disabled={!selected.giftSelected}>
                                            <div className='input-prefix'></div>
                                            <input value={inputData.giftAddress} onChange={handleInputChange('giftAddress')} autoCapitalize="off" autoComplete="off" autoCorrect="off" data-testid="Input" id="gift" name="gift" placeholder="Input the wallet address of your person" spellCheck="false" type="text" disabled={!selected.giftSelected}></input>
                                        </Input>
                                    </div>
                                    {
                                        itemData.giftAddress && (
                                            <div className='tradeStation-detail'>
                                                <div>
                                                    {itemData.activeItem ? 'You have sent the NFT as a gift:' : 'You have set the address of gift:'}
                                                </div>
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
                                </div>
                            </div>
                        </div>
                    </div>
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
                                        <div className='asset-media-image'>
                                            <Skeleton className='' sx={{ height: '100%', width: '100%', borderRadius: 'inherit', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} animation="wave" variant="rectangular" />
                                            {itemData.image && (
                                                <Image loader={imgLoader} src={itemData.image} layout="fill" objectFit="fill" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                        <div className='item-action'>
                            <button className="button button-regular" onClick={handleEditAction} disabled={loading}>Update NFT</button>
                            {loading && (
                                <CircularProgress className='loading' size={24} />
                            )}
                        </div>
                    </div>
                </div>
            </LargeSection>
            <SmallSection className='item-sm' loading={loading ? 1 : 0}>
                <div className='item-wrapper'>
                    <section className='item-header'>
                        <div className='item-info'>
                            <div className='item-detail'>
                                <a className='item-link' href=''>Nft Magics</a>
                            </div>
                            <div className='item-toolbar'>
                                <div className='button-group'>
                                    <button onClick={handleRefreshItem}><RefreshIcon /></button>
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
                                    <div className='asset-media-image'>
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
                        <div className='tradeStation-main'>
                            <div className='price-container'>
                                <div className='tradeStation-ask-label'>
                                    Current Price
                                </div>
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
                                            </>
                                        ) : (
                                            <div className='not-price'>The sale price is yet to be determined.</div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className='edit-container'>
                                <div className="tradeStation-sale">
                                    <div className='sub'>
                                        <div className="sub-title">Select sale option of your NFT in the marketplace.</div>
                                        <SwitchUnstyled className='sale' component={SwitchButton} onChange={handleSelected('salePriceSelected')} />
                                    </div>
                                    <div className='sub-content'>
                                        <Input className="input-text" disabled={!selected.salePriceSelected}>
                                            <div className='input-prefix'></div>
                                            <input value={inputData.salePrice} onChange={handleInputChange('salePrice')} autoCapitalize="off" autoComplete="off" autoCorrect="off" data-testid="Input" id="salePrice" name="salePrice" placeholder="Input sale price" spellCheck="false" type="number" disabled={!selected.salePriceSelected}></input>
                                        </Input>
                                        <TokenDropDownMenu disabled={!selected.salePriceSelected} setInputData={setInputData} inputData={inputData} />
                                    </div>
                                </div>
                                <div className="tradeStation-royalty">
                                    <div className='sub'>
                                        <div className="sub-title">Select royalty of your NFT in the marketplace.</div>
                                        <SwitchUnstyled className='sale' component={SwitchButton} onChange={handleSelected('royaltySelected')} />
                                    </div>
                                    <div className='sub-content'>
                                        <Input className="input-text" disabled={!selected.royaltySelected}>
                                            <div className='input-prefix'></div>
                                            <input value={inputData.royalty} onChange={handleInputChange('royalty')} autoCapitalize="off" autoComplete="off" autoCorrect="off" data-testid="Input" id="salePrice" name="salePrice" placeholder="Input sale price" spellCheck="false" type="number" disabled={!selected.royaltySelected}></input>
                                        </Input>
                                    </div>
                                </div>
                                <div className="tradeStation-gift">
                                    <div className='sub'>
                                        <div className="sub-title">Select gift option of your NFT to give your person.</div>
                                        <SwitchUnstyled className='gift' component={SwitchButton} onChange={handleSelected('giftSelected')} />
                                    </div>
                                    <Input className="input-text" disabled={!selected.giftSelected}>
                                        <div className='input-prefix'></div>
                                        <input value={inputData.giftAddress} onChange={handleInputChange('giftAddress')} autoCapitalize="off" autoComplete="off" autoCorrect="off" data-testid="Input" id="gift" name="gift" placeholder="Input the wallet address of your person" spellCheck="false" type="text" disabled={!selected.giftSelected}></input>
                                    </Input>
                                </div>
                                {
                                    itemData.giftAddress && (
                                        <div className='tradeStation-detail'>
                                            <div>
                                                {itemData.activeItem ? 'You have sent the NFT as a gift:' : 'You have set the address of gift:'}
                                            </div>
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
                                    <button className="button button-regular" onClick={handleEditAction} disabled={loading}>Update NFT</button>
                                    {loading && (
                                        <CircularProgress className='loading' size={24} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SmallSection>
            <PageLoading loading={pageLoading ? 1 : 0} />
        </div >
    )
}