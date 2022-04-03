import * as React from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { CircularProgress } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import ClearIcon from '@mui/icons-material/Clear';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { Modal, Accordion, AccordionSummary, AccordionDetails } from './styles';
import toast from "@/components/Toast";
import "react-toastify/dist/ReactToastify.css";
import Config from '@/config/app';
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { actionGetMarketItem } from '@/store/actions';
const tokenImg = {
    [Config.Token.BNB.address]: '/images/token/bnb.png',
    [Config.Token.AYRA.address]: '/images/token/ayra.png',
    [Config.Token.ITHD.address]: '/images/token/ithd.png'
}

const tokenName = {
    [Config.Token.BNB.address]: 'BNB',
    [Config.Token.AYRA.address]: 'AYRA',
    [Config.Token.ITHD.address]: 'ITHD'
}

export default function PutListModal({ modal, setModal, item, handleLoading }: { modal: any, setModal: any, item: any, handleLoading: any }) {
    const dispatch = useDispatch()
    const theme = useTheme();
    const [summaryExpanded, setSummaryExpanded] = React.useState<string | false>('panel2');
    const [loadingApprove, setLoadingApprove] = React.useState(false);
    const [loadingConfirm, setLoadingConfirm] = React.useState(false);

    const { account }: any = useWeb3React();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const imgLoader = ({ src, width, quality }: { src: any, width?: any, quality?: any }) => {
        return `https://ipfs.infura.io/ipfs/${src}?w=${width || 300}&q=${quality || 75}`
    }

    const handleSummaryChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setSummaryExpanded(newExpanded ? panel : false);
        };

    const handleClose = () => {
        setModal(false);
    };

    const putList = async () => {
        setLoadingApprove(true);

        const web3 = new Web3(Web3.givenProvider);
        const Nft = new web3.eth.Contract(
            Config.NFT.abi as [],
            Config.NFT.address as string
        );
        const Market = new web3.eth.Contract(
            Config.Market.abi as [],
            Config.Market.address as string
        );

        try {
            await Nft.methods.approve(
                Config.Market.address,
                item.tokenId
            ).send({ from: account })
                .on('receipt', async (receipt: any) => {
                    setLoadingApprove(false);
                })
                .then(async (_tx: any) => {
                    notify('success', 'You have approve the NFT on Marketplace');

                    setLoadingConfirm(true);

                    try {
                        await Market.methods
                            .createMarketSale(
                                item.itemId
                            )
                            .send({ from: account })
                            .on('receipt', async (receipt: any) => {
                                setLoadingConfirm(false);
                                handleLoading('sale', false);
                                handleLoading('gift', false);
                                setModal(false);
                            })
                            .then((_tx: any) => {
                                notify('success', 'You have put the NFT on Marketplace');
                            });
                    } catch (err:any) {
                        if(err.code == 4001) notify('error', err.message);
                        else notify('error', 'Error putting the NFT');
                        console.log('Error putting the NFT : ', err);
                        setLoadingConfirm(false);
                        handleLoading('sale', false);
                        handleLoading('gift', false);
                        setModal(false);
                    }
                    dispatch(actionGetMarketItem({ itemId: item.itemId }));
                });
        } catch (err:any) {
            if(err.code == 4001) notify('error', err.message);
            else notify('error', 'Error putting the NFT');
            console.log('Error approving the NFT : ', err);
            setLoadingApprove(false);
            setLoadingConfirm(false);
            handleLoading('sale', false);
            handleLoading('gift', false);
            setModal(false);
        }

    }
    React.useEffect(() => {
        modal && putList();
    }, [modal]);

    return (
        <Dialog
            fullScreen={fullScreen}
            open={modal}
        >
            <Modal>
                <DialogContent className='put-list-modal'>
                    <DialogTitle className='modal-title'>
                        <div>
                            Complete your listing
                        </div>
                        <div onClick={() => setModal(false)}>
                            <ClearIcon />
                        </div>
                    </DialogTitle>
                    <div className="modal-body">
                        <div className='item-detail'>
                            <div className='img'>
                                <Image loader={imgLoader} src={item.image} layout='fill' objectFit='fill' />
                            </div>
                            <div className='content'>
                                <div className='name'>{item.name}</div>
                                <div className='description'>{item.description}</div>
                                {/* <div className='count'>1</div> */}
                            </div>
                            <div className='price'>
                                <div className='title'>Price</div>
                                <div className='price-info'>
                                    <div className='token-img'>
                                        <img src={tokenImg[item.saleToken]} />
                                    </div>
                                    <div className='token-amount'>
                                        {item.salePrice}
                                    </div>
                                    <div className='token-name'>
                                        {tokenName[item.saleToken]}
                                    </div>
                                </div>
                                <div className='flat-price'>${item.usdPrice}</div>
                            </div>
                        </div>
                        <div className='wallet-detail'>
                            Your wallet balance is below 0.05 BNB. The next steps require small transaction fees, so you may have to deposit additional funds to complete them
                        </div>
                        <div className='progress-detail'>
                            {/* <Accordion expanded={summaryExpanded === 'panel1'} onChange={handleSummaryChange('panel1')} disableGutters elevation={0}>
                                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}>
                                    <div className='title'>
                                        <CircularProgress size={24} />
                                        <div className="title-name">Initialize your wallet</div>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    To get set up for selling on OpenSea for the first time, you must initialize your wallet, which requires a one-time gas fee.

                                    Waiting for initialization...
                                </AccordionDetails>
                            </Accordion> */}
                            <Accordion expanded={summaryExpanded === 'panel2'} onChange={handleSummaryChange('panel2')} disableGutters elevation={0}>
                                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}>
                                    <div className='title'>
                                        {loadingApprove && <CircularProgress size={24} />}
                                        <div className="title-name">Approve this item for sale</div>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    To get set up for auction listings for the first time, you must approve this item for sale, which requires a one-time gas fee.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={summaryExpanded === 'panel3'} onChange={handleSummaryChange('panel3')} disableGutters elevation={0}>
                                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}>
                                    <div className='title'>
                                        {loadingConfirm && <CircularProgress size={24} />}
                                        <div className="title-name">Confirm 1 listing</div>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    Accept the signature request in your wallet and wait for your listing to process.
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions className='modal-actions'>
                </DialogActions>
            </Modal>
        </Dialog>
    );
}

