import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
    Skeleton,
    Button,
    CircularProgress
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageIcon from '@mui/icons-material/Image';
import ClearIcon from '@mui/icons-material/Clear';
import Edit from '@mui/icons-material/Edit';
import { Section, CollectionHeader, Input, TextArea, CardDiv } from './styles';
import { actionGetCollectionItem, actionGetCollectionList } from '@/store/actions';
import { selectCollectionItem } from '@/store/selectors';
import toast from "@/components/Toast";
import "react-toastify/dist/ReactToastify.css";
import { create as ipfsHttpClient } from 'ipfs-http-client';
import Config from '@/config/app';
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

const ipfs = ipfsHttpClient({ url: 'https://ipfs.infura.io:5001/api/v0' })

export default function CreateCollection() {
    const router = useRouter()
    const { collectionId } = router.query;
    const { account, active }: any = useWeb3React();
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const collectionItem = useSelector(selectCollectionItem);

    const inputBannerFile = React.useRef<HTMLInputElement>(null);
    const inputLogoFile = React.useRef<HTMLInputElement>(null);
    const inputFeaturedFile = React.useRef<HTMLInputElement>(null);
    const [imagePreview, setImagePreview] = React.useState<any>({
        banner: null,
        logo: null,
        featured: null,
    });
    const [image, setImage] = React.useState({
        banner: null,
        logo: null,
        featured: null,
    })
    const [readMore, setReadMore] = React.useState(false);
    const [inputData, setInputData] = React.useState({
        itemId: 0,
        name: '',
        description: '',
        logo: '',
        banner: '',
        featured: '',
        owner: '',
    })

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const createPreview = (type: any) => (e: any) => {
        if (e.target.value !== '') {
            setImage((inputData) => ({ ...inputData, [type]: e.target.files[0] }))
            const src = URL.createObjectURL(e.target.files[0]);
            setImagePreview((imagePreview: any) => ({ ...imagePreview, [type]: src }));
        } else {
            setImagePreview((imagePreview: any) => ({ ...imagePreview, [type]: null }));
        }
    }
    const openfileBrowser = (type: any) => () => {
        if (type === 'banner' && inputBannerFile.current) {
            inputBannerFile.current.click();
        }
        if (type === 'logo' && inputLogoFile.current) {
            inputLogoFile.current.click();
        }
        if (type === 'featured' && inputFeaturedFile.current) {
            inputFeaturedFile.current.click();
        }
    }
    const imageClear = (type: any) => () => {
        setImagePreview((imagePreview: any) => ({ ...imagePreview, [type]: null }));
        setImage((image: any) => ({ ...image, [type]: null }));
    }
    const handleReadMore = () => {
        setReadMore(!readMore);
    }
    const handleInputChange = (type: any) => (event: any) => {
        setInputData((value) => ({ ...value, [type]: event.target.value }))
    }

    const handleUpdateAction = async () => {
        if (!active) return notify('error', 'please connect your wallet');
        if (inputData.name==='') return notify('error', 'please input collection name');
        if (inputData.description==='') return notify('error', 'please input collection descriptioin');
        if (inputData.itemId && account !== inputData.owner) return notify('error', 'you are not this collection`s owner');

        const web3 = new Web3(Web3.givenProvider);
        const Market = new web3.eth.Contract(
            Config.Market.abi as [],
            Config.Market.address as string
        );

        try {
            setLoading(true);

            let logo_url = inputData.logo;
            let banner_url = inputData.banner;
            let featured_url = inputData.featured;
            if (image.logo) {
                const logo = await ipfs.add(image.logo);
                logo_url = logo.path;
                setInputData(state => ({...state, logo: logo_url}));
            }
            if (image.banner) {
                const banner = await ipfs.add(image.banner);
                banner_url = banner.path;
                setInputData(state => ({...state, banner: banner_url}));
            }
            if (image.featured) {
                const featured = await ipfs.add(image.featured);
                featured_url = featured.path;
                setInputData(state => ({...state, featured: featured_url}));
            }

            if (!logo_url) return notify('error', 'please choose collection logo image');
            if (!banner_url) return notify('error', 'please choose collection banner image');
            if (!featured_url) return notify('error', 'please choose collection featured image');
            
            try {
                if (inputData.itemId) {
                    await Market.methods.updateCollectionItem(
                        inputData.itemId,
                        inputData.name,
                        inputData.description,
                        logo_url,
                        banner_url,
                        featured_url
                    )
                        .send({ from: account })
                        .on('receipt', function (receipt: any) {
                            setLoading(false);
                            router.push('/marketplace/collections');
                            dispatch(actionGetCollectionList({}));
                        })
                        .then((_tx: any) => {
                            notify('success', 'You have updated the collection');
                        })
                } else {
                    await Market.methods.createCollection(
                        inputData.owner,
                        inputData.name,
                        inputData.description,
                        logo_url,
                        banner_url,
                        featured_url
                    )
                        .send({ from: account })
                        .on('receipt', function (receipt: any) {
                            setLoading(false);
                            router.push('/marketplace/collections');
                            dispatch(actionGetCollectionList({}));
                        })
                        .then((_tx: any) => {
                            notify('success', 'You have created the collection');
                        })
                }
            } catch (err: any) {
                if (err.code == 4001) notify('error', err.message);
                else notify('error', 'Error the collection');
                console.log('Error the collection : ', err);
                setLoading(false);
            }
        } catch (err) {
            notify('error', 'Error uploading the file');
            console.log('Error uploading the file : ', err)
        }
    }

    React.useEffect(() => {
        if (collectionItem) {
            setInputData(inputData => ({ ...inputData, itemId: collectionItem.itemId }));
            setInputData(inputData => ({ ...inputData, owner: collectionItem.owner }));
            setInputData(inputData => ({ ...inputData, name: collectionItem.name }));
            setInputData(inputData => ({ ...inputData, description: collectionItem.description }));
            setInputData(inputData => ({ ...inputData, logo: collectionItem.logo }));
            setInputData(inputData => ({ ...inputData, banner: collectionItem.banner }));
            setInputData(inputData => ({ ...inputData, featured: collectionItem.featured }));
            setImagePreview((imagePreview: any) => ({ ...imagePreview, logo: 'https://ipfs.infura.io/ipfs/' + collectionItem.logo }));
            setImagePreview((imagePreview: any) => ({ ...imagePreview, banner: 'https://ipfs.infura.io/ipfs/' + collectionItem.banner }));
            setImagePreview((imagePreview: any) => ({ ...imagePreview, featured: 'https://ipfs.infura.io/ipfs/' + collectionItem.featured }));
        }
    }, [collectionItem])

    React.useEffect(() => {
        collectionId && dispatch(actionGetCollectionItem({ collectionId }));
    }, [collectionId]);

    React.useEffect(() => {
        setInputData(state => ({...state, owner: account}));
    }, [account]);

    return (
        <Section loading={loading ? 1 : 0}>
            <CollectionHeader readmore={readMore ? 1 : 0}>
                <div className='collection-banner'>
                    <div className="image-content">
                        <input type='file' id='banner-file' ref={inputBannerFile} style={{ display: 'none' }} onChange={createPreview('banner')} />
                        <div className='image-input' onClick={openfileBrowser('banner')} style={{ ...(imagePreview.banner && { display: 'none' }) }}>
                            <ImageIcon className='upload-img' />
                            Upload your banner image here
                        </div>
                        <img
                            className='image-preview'
                            src={imagePreview.banner}
                            style={{ ...(imagePreview.banner && { display: 'block' }) }}
                            onClick={openfileBrowser('banner')}
                        />
                        <div className='image-clear' style={{ ...(imagePreview.banner && { display: 'block' }) }} >
                            <ClearIcon onClick={imageClear('banner')} />
                        </div>
                    </div>
                </div>
                <div className='collection-info'>
                    <div className='collection-logo'>
                        <div className="image-content">
                            <input type='file' id='logo-file' ref={inputLogoFile} style={{ display: 'none' }} onChange={createPreview('logo')} />
                            <div className='image-input' onClick={openfileBrowser('logo')} style={{ ...(imagePreview.logo && { display: 'none' }) }}>
                                <ImageIcon className='upload-img' />
                            </div>
                            <img
                                className='image-preview'
                                src={imagePreview.logo}
                                style={{ ...(imagePreview.logo && { display: 'block' }) }}
                                onClick={openfileBrowser('logo')}
                            />
                            <div className='image-clear' style={{ ...(imagePreview.logo && { display: 'block' }) }} >
                                <ClearIcon onClick={imageClear('logo')} />
                            </div>
                        </div>
                    </div>
                    <div className='collection-name'>
                        {inputData.name}
                    </div>
                    <div className='collection-owner'>
                        <div>Created by</div>
                        <div className='address'>{inputData.owner || account}</div>
                    </div>
                    <div className='collection-description' >
                        <p>
                            {inputData.description}
                        </p>
                    </div>
                    <div className='collection-description-more'>
                        <button className='read-more' onClick={handleReadMore}>
                            {readMore ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </button>
                    </div>
                </div>
            </CollectionHeader>
            <div className='collection-panel'>
                <div className='left-panel'>
                    <CardDiv>
                        <article className='card-image-card'>
                            <div className='card-edit'>
                                <Edit />
                            </div>
                            <a className='card-image-card-link'>
                                <div className='card-image-card-link-meida'>
                                    <div className="image-content">
                                        <input type='file' id='featured-file' ref={inputFeaturedFile} style={{ display: 'none' }} onChange={createPreview('featured')} />
                                        <div className='image-input' onClick={openfileBrowser('featured')} style={{ ...(imagePreview.featured && { display: 'none' }) }}>
                                            <ImageIcon className='upload-img' />
                                            Upload your featured image here
                                        </div>
                                        <img
                                            className='image-preview'
                                            src={imagePreview.featured}
                                            style={{ ...(imagePreview.featured && { display: 'block' }) }}
                                            onClick={openfileBrowser('featured')}
                                        />
                                        <div className='image-clear' style={{ ...(imagePreview.featured && { display: 'block' }) }} >
                                            <ClearIcon onClick={imageClear('featured')} />
                                        </div>
                                    </div>
                                </div>
                                <div className='logo'>
                                    {imagePreview.logo && (
                                        <img
                                            className='image-preview'
                                            src={imagePreview.logo}
                                            style={{ borderRaius: '50%', ...(imagePreview.logo && { display: 'block' }) }}
                                        />
                                    )}
                                </div>
                                <div className='card-image-text-area'>
                                    <div className='name'>{inputData.name || <Skeleton variant="text" />}</div>
                                    <div className='owner'>{(inputData.owner || account) ? (<>Owner</>) : <Skeleton variant="text" />}</div>
                                    <div className='description'>{inputData.description || (
                                        <>
                                            <Skeleton variant="text" /><Skeleton variant="text" />
                                        </>
                                    )}</div>
                                </div>
                            </a>
                        </article>
                    </CardDiv>
                </div>
                <div className='right-panel'>
                    <div className='collection-name'>
                        <div className='sub'>Collection Name</div>
                        <Input className="input-text" disabled={false}>
                            <div className='input-prefix'></div>
                            <input autoCapitalize="off" autoComplete="off" autoCorrect="off" data-testid="Input" id="name" name="name" placeholder="Provide a detailed name of your item." spellCheck="false" type="text" value={inputData.name} onChange={handleInputChange('name')}></input>
                        </Input>
                    </div>
                    <div className='collection-description' >
                        <div className="sub">Collection Description</div>
                        <TextArea id="description" name="description" placeholder="Provide a detailed description of your item." rows={4} value={inputData.description} onChange={handleInputChange('description')}></TextArea>
                    </div>
                    <div className='collection-action'>
                        <Button className="button button-regular" onClick={handleUpdateAction} disabled={loading}>
                            {inputData.itemId ? 'Create' : 'Update'}
                            <span>Collection</span>
                        </Button>
                        {loading && (
                            <CircularProgress className='loading' size={24} />
                        )}
                    </div>
                </div>
            </div>
        </Section >
    );
}


