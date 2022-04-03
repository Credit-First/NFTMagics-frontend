
import React from "react";
import Image from "next/image";
import {
    Box,
    Button,
    CircularProgress,
    Skeleton,
    Stepper,
    Step,
    StepLabel,
} from '@mui/material';
import SwitchUnstyled from '@mui/base/SwitchUnstyled';
import ImageIcon from '@mui/icons-material/Image';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import toast from "@/components/Toast";
import "react-toastify/dist/ReactToastify.css";
import Check from '@mui/icons-material/Check';
import { StepIconProps } from '@mui/material/StepIcon';
import LinearProgress from '@mui/material/LinearProgress';
import { Section, QontoConnector, QontoStepIconRoot, UploadSection, MintSection, ListSection, CardDiv, DropdownMenu, Input, TextArea, SwitchButton } from "./styles";
import Link from "next/link";
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { actionGetMarketplace } from '@/store/actions/index';
import { useDispatch, useSelector } from "react-redux";

import Config from '@/config/app';
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import BigNumber from 'bignumber.js';

import { actionGetCollectionList } from "@/store/actions/collection";
import { selectCollectionList } from "@/store/selectors";

const ipfs = ipfsHttpClient({ url: 'https://ipfs.infura.io:5001/api/v0' })

const BIG_TEN = new BigNumber(10);

const watermark = window !== undefined ? require('watermarkjs') : null;

export default function CreateSelfNFT() {
    return (
        <Section>
            <div className='form-container'>
                <CreateStepForm />
            </div>
        </Section>
    )
}

const steps = ['Upload', 'Mint', 'List'];

const CreateStepForm = () => {
    const [ipfsImage, setIpfsImage] = React.useState(null);
    const [activeStep, setActiveStep] = React.useState(0);
    const [hastag, setHastag] = React.useState('');

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    function QontoStepIcon(props: StepIconProps) {
        const { active, completed, className } = props;

        return (
            <QontoStepIconRoot ownerState={{ active }} className={className}>
                {completed ? (
                    <Check className="QontoStepIcon-completedIcon" />
                ) : (
                    <div className="QontoStepIcon-circle" />
                )}
            </QontoStepIconRoot>
        );
    }

    const handleSteps = (step: number) => {
        switch (step) {
            case 0:
                return <UploadStep handleNext={handleNext} setIpfsImage={setIpfsImage} setHastag={setHastag} />
            case 1:
                return <MintStep handleNext={handleNext} ipfsImage={ipfsImage} hastag={hastag} />
            case 2:
                return <ListStep />
            default:
                throw new Error('Unknown step')
        }
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel StepIconComponent={QontoStepIcon} >{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {handleSteps(activeStep)}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}

const UploadStep = ({ setIpfsImage, handleNext, setHastag }: { setIpfsImage: any, handleNext: any, setHastag?: any }) => {
    const [image, setImage] = React.useState<any>(null);
    const [imagePreview, setImagePreview] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(false);
    const [imgHastag, setImgHastag] = React.useState('');
    const [hastagSelected, setHastagSelected] = React.useState(false);
    const { active } = useWeb3React();
    const inputFile = React.useRef<HTMLInputElement>(null);

    const createPreview = (e: any) => {
        if (e.target.value !== '') {
            setImage(e.target.files[0])

            const src = URL.createObjectURL(e.target.files[0]);
            setImagePreview(src)
        } else {
            setImagePreview(null)
        }
    }
    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);
    const handleMakeHasTag = (text: any) => {
        if (!image) {
            setImgHastag('');
            setHastagSelected(false);
            return notify('error', 'please select your image');
        }
        watermark([image])
            .dataUrl(watermark.text.lowerRight(text, '30px Josefin Slab', '#fff', 0.5))
            .then(function (imgData: any) {
                const file = dataURLtoFile(imgData, 'hello.txt');

                setImage(file);
                setImagePreview(imgData);
            });
    }
    function dataURLtoFile(dataurl: any, filename: any) {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }
    const handleUpload = async () => {
        if (!active) {
            return notify('error', 'You have to connect your wallet..');
        }
        if (!image) return notify('error', 'You have to select image..');

        setLoading(true);

        try {
            const added = await ipfs.add(image)
            const url = added.path;
            setHastag(imgHastag);
            setIpfsImage(url);
            handleNext();
        } catch (err) {
            notify('error', 'Error uploading the file');
            console.log('Error uploading the file : ', err)
        }
        setLoading(false)
    }
    const handleCancelUpload = async () => {
        setLoading(false);
    }
    const openfileBrowser = () => {
        if (inputFile.current) {
            inputFile.current.click();
        }
    }
    const imageClear = () => {
        setImagePreview(null);
        setImage(null);
    }
    const handleHastagSwitch = () => {
        setHastagSelected(!hastagSelected);
    }
    React.useEffect(() => {
        if (hastagSelected) {
            handleMakeHasTag(imgHastag);
        }
    }, [imgHastag]);

    return (
        <UploadSection>
            <div className="upload-content">
                {
                    loading ? (
                        <div className="upload-ipfs">
                            <div className="title">Uploading to IPFS...</div>
                            <div className="upload-progress">
                                <LinearProgress />
                            </div>
                            <div className="summary">
                                The InterPlanetary File System, known as IPFS, is a peer to peer network for sharing data in a distributed file system
                            </div>
                        </div>
                    ) : (
                        <div className="upload-image">
                            <div className="file-supported">
                                File types supported: JPG, PNG, GIF, SVG, GLTF. Max size: 10 MB
                            </div>
                            <div className="upload-dropzone">
                                <div className="image-content">
                                    <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={createPreview} />
                                    <div className='image-input' onClick={openfileBrowser} style={{ ...(imagePreview && { display: 'none' }) }}>
                                        <ImageIcon className='upload-img' />
                                        Upload your image here
                                    </div>
                                    <img
                                        className='image-preview'
                                        src={imagePreview}
                                        style={{ ...(imagePreview && { display: 'block' }) }}
                                        onClick={openfileBrowser}
                                    />
                                    <div className='image-clear' style={{ ...(imagePreview && { display: 'block' }) }} >
                                        <ClearIcon onClick={imageClear} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="image-hastag">
                                    <div className='sub'>
                                        <div className="sub-title">Select the Hastag in your NFT.</div>
                                        <SwitchUnstyled className='hastag' component={SwitchButton} onChange={handleHastagSwitch} />
                                    </div>
                                    <div className="sub-content">
                                        <HasTagDropDownMenu setImgHastag={setImgHastag} imgHastag={imgHastag} disabled={!hastagSelected} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="upload-action">
                {
                    loading ? (
                        <button className="button button-primary" onClick={handleCancelUpload} >Cancel Upload</button>
                    ) : (
                        <button className="button button-regular" onClick={handleUpload} >Upload</button>
                    )
                }
            </div>
        </UploadSection>
    )
}

const MintStep = ({ handleNext, ipfsImage, hastag }: { handleNext: any, ipfsImage: any, hastag?: any }) => {
    const { active, account, library }: any = useWeb3React();
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [total_price, setTotalPrice] = React.useState('0');

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);
    const tokenType = [
        Config.Token.BNB.address,
        Config.Token.AYRA.address,
        Config.Token.ITHD.address,
    ];
    const [mintData, setMintData] = React.useState({
        collectionId: 0,
        name: '',
        description: '',
        image: ipfsImage,
        amount: 1,
        hastag_flag: !!hastag,
        hastag: hastag,
        gift_address: '',
        sale_price: 0,
        sale_token_type: 0,
        mint_token_type: 0,
        mintPrice: 0
    });

    const handleInputChange = (type: any) => (event: any) => {
        setMintData((value) => ({ ...value, [type]: event.target.value }))
    }

    const handleGenerateNFT = async () => {
        if (!active) {
            return notify('error', 'Please connect your wallet!');
        }
        if (mintData.name === '' || mintData.description === '') {
            return notify('error', 'Please input nft detail')
        }
        setLoading(true)
        try {
            const metaData = {
                name: mintData.name,
                description: mintData.description,
                image: ipfsImage,
                hastag: mintData.hastag,
            }
            const added = await ipfs.add(JSON.stringify(metaData));
            const ipfsUrl = added.path;
            // const ipfsUrl = '123123123';

            const web3 = new Web3(library.provider);
            const NFT = new web3.eth.Contract(
                Config.NFT.abi as [],
                Config.NFT.address as string
            )

            let balance = '';
            const mintTokenAddress = tokenType[mintData.mint_token_type];

            if (mintData.mint_token_type === 0) {
                balance = await web3.eth.getBalance(account);
            }
            else if (mintData.mint_token_type === 1) {
                const ContractAYRA = new web3.eth.Contract(
                    Config.Token.AYRA.abi as [],
                    Config.Token.AYRA.address as string
                );
                balance = await ContractAYRA.methods.balanceOf(account).call();
            }
            else if (mintData.mint_token_type === 2) {
                const ContractITHD = new web3.eth.Contract(
                    Config.Token.ITHD.abi as [],
                    Config.Token.ITHD.address as string
                );
                balance = await ContractITHD.methods.balanceOf(account).call();
            }
            let totalPrice = new BigNumber(total_price).multipliedBy(BIG_TEN.pow(18));

            if (parseInt(balance, 10) < Number(totalPrice)) {
                setLoading(false);
                return notify('error', "Don't have enough token");
            }
            if (mintData.mint_token_type != 0) {
                totalPrice = new BigNumber(0);
            }

            NFT.events.mintedNFT({
                filter: { to: account }
            })
                .on('data', function (event: any) {
                    console.log('event: ', event);
                })
                .on('error', console.error);

            await NFT.methods
                .mint(
                    mintData.collectionId,
                    ipfsImage.toString(),
                    ipfsUrl.toString(),
                    mintData.amount,
                    mintTokenAddress,
                    mintData.hastag_flag
                )
                .send({ from: account, value: totalPrice.toString() })
                .on('receipt', function (receipt: any) {
                    const newIds = receipt.events.mintedNFT.returnValues.newIds;
                    setLoading(false);
                    handleNext();
                    localStorage.removeItem('nft_image_ipfs_url');
                    dispatch(actionGetMarketplace({}));
                })
                .then((_tx: any) => {
                    notify('success', 'You have created the new NFT');
                })

        } catch (err: any) {
            setLoading(false);
            if (err.code == 4001) notify('error', err.message);
            else notify('error', 'Error minting the item');
            console.log('Error minting the item : ', err);
        }

    }

    const approveTokenToNFT = async () => {
        const web3 = new Web3(library.provider);
        const ContractITHD = new web3.eth.Contract(
            Config.Token.ITHD.abi,
            Config.Token.ITHD.address
        );

        const ContractAYRA = new web3.eth.Contract(
            Config.Token.AYRA.abi,
            Config.Token.AYRA.address
        );

        const approve = async (contract: any) => {
            const allowanceBalanceof = await contract.methods
                .allowance(account, Config.NFT.address)
                .call();

            if (Math.floor(allowanceBalanceof / 1e18) < 100) {
                await contract.methods
                    .approve(Config.NFT.address, '100000000000000000000000000')
                    .send({ from: account })
                    .once('transactionHash', () => {
                        notify('info', 'Approving purchase with ITHD');
                    })
                    .then((_tx: any) => {
                        notify('success', 'You have approved the purchase  with ITHD');
                    })
                    .catch((e: any) => {
                        if (e.code === 4001) {
                            notify('error', 'You need to approve the spending of ITHD in your wallet');
                        }
                    });
            }
        }
        await approve(ContractITHD);
        await approve(ContractAYRA);
    }

    React.useEffect(() => {
        const mint_token_type = mintData.mint_token_type;
        const amount = mintData.amount;
        const hastag_flag = mintData.hastag_flag;
        let price = new BigNumber(0);

        if ((mint_token_type == 0) && hastag_flag) price = new BigNumber(Config.bnbPrice).multipliedBy(2);
        if ((mint_token_type == 0) && !hastag_flag) price = new BigNumber(Config.bnbPrice);
        if ((mint_token_type == 1) && hastag_flag) price = new BigNumber(Config.ayraPrice).multipliedBy(2);
        if ((mint_token_type == 1) && !hastag_flag) price = new BigNumber(Config.ayraPrice);
        if ((mint_token_type == 2) && hastag_flag) price = new BigNumber(Config.ithdPrice).multipliedBy(2);
        if ((mint_token_type == 2) && !hastag_flag) price = new BigNumber(Config.ithdPrice);

        let totalPrice = new BigNumber(price).multipliedBy(amount).dividedBy(BIG_TEN.pow(18));
        setTotalPrice(totalPrice.toString());
    }, [mintData]);
    React.useEffect(() => {
        approveTokenToNFT();
        dispatch(actionGetCollectionList({ account: account }));
        setMintData({ ...mintData, hastag_flag: !!hastag, hastag: hastag });
    }, [])

    const imgLoader = ({ src, width, quality }: { src: any, width?: any, quality?: any }) => {
        return `https://ipfs.infura.io/ipfs/${src}?w=${width || 300}&q=${quality || 75}`
    }

    return (
        <MintSection loading={loading ? 1 : 0}>
            <div className="item-preview">
                <CardDiv>
                    <article className='image-card'>
                        <a className='image-card-link'>
                            <div className='image-card-link-meida'>
                                <div className='media-img'>
                                    <div className='asset-media-image'>
                                        <Skeleton className='' sx={{ height: '100%', width: '100%', borderRadius: 'inherit', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} animation="wave" variant="rectangular" />
                                        <Image loader={imgLoader} src={mintData.image} layout="fill" objectFit="fill" />
                                    </div>
                                </div>
                            </div>
                            <footer className='image-text-area'>
                                <div className="image-title">
                                    {mintData.name}
                                </div>
                                <div className='image-detail'>
                                    {/* <div className='avatar'>
                                        <Image src={'/avatars/2.png'} layout="fill" objectFit="fill" />
                                    </div> */}
                                    <div className='content'>
                                        {account.substring(0, 15)} ... ${account.substring(account.length - 8)}
                                    </div>
                                    <div className='price'>
                                    </div>
                                </div>
                            </footer>
                        </a>
                    </article>
                </CardDiv>
            </div>
            <div className="item-descriptioin">
                <div className="description-header">
                    Title and Descriptioin
                </div>
                <div className="description-summary">
                    Once your NFT is minted on the Binance smart chain, you will not be able to edit or update any of its information.
                </div>
                <div className="description-info">
                    <div className="description-title">
                        <Input className="input-text" disabled={false}>
                            <div className='input-prefix'></div>
                            <input autoCapitalize="off" autoComplete="off" autoCorrect="off" data-testid="Input" id="name" name="name" placeholder="NFT name" spellCheck="false" type="text" value={mintData.name} onChange={handleInputChange('name')}></input>
                        </Input>
                    </div>
                    <div className="description-detail">
                        <div className="sub">The description will be included on the item's detail page underneath its image. Markdown syntax is supported.</div>
                        <TextArea id="description" name="description" placeholder="Provide a detailed description of your item." rows={4} value={mintData.description} onChange={handleInputChange('description')}></TextArea>
                    </div>
                    <div className="description-amount">
                        <div className="sub">
                            <div className="sub-title">You can create 1, 5, 10, 20 nfts at once.</div>
                            <div className="sub-content">
                                <AmountDropDownMenu setMintData={setMintData} mintData={mintData} />
                            </div>
                        </div>
                    </div>
                    <div className="description-collection">
                        <div className='sub'>
                            <div className="sub-title">Select collection in the marketplace.</div>
                        </div>
                        <div className="sub-content">
                            <CollectionDropDownMenu mintData={mintData} setMintData={setMintData} />
                        </div>
                    </div>
                    <div className="description-total-price">
                        <div className="sub-title">
                            <div className="sub">Select token type to mint your NFT.</div>
                            <TokenDropDownMenu setMintData={setMintData} mintData={mintData} />
                        </div>
                        <div className="sub-content">
                            <div className='price'>{total_price}</div>
                        </div>
                    </div>
                    <div className="description-action">
                        <div>
                            <button className="button button-primary" onClick={handleGenerateNFT} disabled={loading}>Mint NFT</button>
                            {loading && (
                                <CircularProgress className='loading' size={24} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MintSection>
    )
}

const ListStep = () => {
    const item = { id: "1", src: "/assets/template/12.jpg", avatar: "/avatars/2.jpg", title: "Abstraction", content: "content" };

    return (
        <ListSection>
            <div className="description-header">
                Your NFT has been created!
            </div>
            <div className="description-summary">
                Your NFT has been successfully listed on our marketplace.
            </div>
            <div className="description-action">
                <Link href="/marketplace/all">
                    <div className="button button-primary view" >View NFT</div>
                </Link>
            </div>
        </ListSection>
    )
}

const AmountDropDownMenu = ({ setMintData, mintData }: { setMintData: any, mintData: any }) => {
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState('1 NFT');

    const list = [
        { label: '1 NFT', value: 1 },
        { label: '5 NFTs', value: 5 },
        { label: '10 NFTs', value: 10 },
        { label: '20 NFTs', value: 20 },
    ]

    const handleClick = () => {
        setOpen(!open);
    }

    const handleSelect = (item: any) => () => {
        setText(item.label);
        setMintData({ ...mintData, amount: item.value })
    }

    return (
        <DropdownMenu open={open} width={120} onClick={handleClick}>
            <div className='dropdownBtn'>
                <div>{text}</div>
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            <div className='subMenuContent'>
                <div className='submenu'>
                    <ul>
                        {
                            list.map(item => (
                                <li key={item.value} onClick={handleSelect(item)} value={item.value}>
                                    <a>
                                        {item.label}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='back' onClick={handleClick}></div>
            </div>
        </DropdownMenu>
    )
}
const HasTagDropDownMenu = ({ setImgHastag, imgHastag, disabled }: { setImgHastag: any, imgHastag: any, disabled: any }) => {
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState(imgHastag);

    const list = [
        'Nft Magics Royalty',
        'Nft Magics Automatic Reward'
    ]

    const handleClick = () => {
        !disabled && setOpen(!open);
    }

    const handleSelect = (item: any) => () => {
        setImgHastag(item);
    }
    React.useEffect(() => {
        setText(imgHastag);
    }, [imgHastag]);

    return (
        <DropdownMenu open={open} onClick={handleClick} width={'100%'} disabled={disabled}>
            <button className='dropdownBtn' disabled={disabled} >
                <div>{text}</div>
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
            <div className='subMenuContent'>
                <div className='submenu'>
                    <ul>
                        {
                            list.map(item => (
                                <li key={item} onClick={handleSelect(item)} value={item}>
                                    <a>
                                        {item}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='back' onClick={handleClick}></div>
            </div>
        </DropdownMenu>
    )
}
const TokenDropDownMenu = ({ setMintData, mintData }: { setMintData: any, mintData: any }) => {
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState('BNB');

    const list = [
        { label: 'BNB', value: 0 },
        { label: 'AYRA', value: 1 },
        { label: 'ITHD', value: 2 },
    ]

    const handleClick = () => {
        setOpen(!open);
    }

    const handleSelect = (item: any) => () => {
        setText(item.label);
        setMintData({ ...mintData, mint_token_type: item.value })
    }
    return (
        <DropdownMenu open={open} onClick={handleClick} >
            <button className='dropdownBtn'>
                <div>{text}</div>
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
            <div className='subMenuContent'>
                <div className='submenu' >
                    <ul>
                        {
                            list.map(item => (
                                <li key={item.value} onClick={handleSelect(item)} value={item.value}>
                                    <a>
                                        {item.label}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='back' onClick={handleClick}></div>
            </div>
        </DropdownMenu>
    )
}
const CollectionDropDownMenu = ({ setMintData, mintData }: { setMintData: any, mintData: any }) => {
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState('');
    const collectionList = useSelector(selectCollectionList);

    const handleClick = () => {
        setOpen(!open);
    }

    const handleSelect = (item: any) => () => {
        setText(item.name);
        setMintData({ ...mintData, collectionId: item.itemId })
    }
    const imgLoader = ({ src, width, quality }: { src: any, width?: any, quality?: any }) => {
        return `https://ipfs.infura.io/ipfs/${src}?w=${width || 300}&q=${quality || 75}`
    }
    return (
        <DropdownMenu open={open} onClick={handleClick} width={'100%'} >
            <button className='dropdownBtn' >
                <div>{text}</div>
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
            <div className='subMenuContent'>
                <div className='submenu'>
                    <ul>
                        <li onClick={handleSelect({ name: '', itemId: 0 })}>
                            <a></a>
                        </li>
                        {
                            collectionList.map((item: any) => (
                                <li key={item.itemId} onClick={handleSelect(item)} value={item.itemId}>
                                    <a>
                                        <div className='collection-logo'>
                                            <Image loader={imgLoader} src={item.logo} layout="fill" objectFit="fill" />
                                        </div>
                                        <div>
                                            {item.name}
                                        </div>
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='back' onClick={handleClick}></div>
            </div>
        </DropdownMenu>
    )
}