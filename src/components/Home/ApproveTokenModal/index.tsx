import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import ClearIcon from '@mui/icons-material/Clear';
import { useTheme } from '@mui/material/styles';
import { Modal } from './styles';
import toast from "@/components/Toast";
import "react-toastify/dist/ReactToastify.css";
import Config from '@/config/app';
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

const tokenImg = {
    [Config.Token.WBNB.address]: '/images/token/bnb.png',
    [Config.Token.AYRA.address]: '/images/token/ayra.png',
    [Config.Token.ITHD.address]: '/images/token/ithd.png'
}

export default function ApproveTokenModal({ modal, setModal, approveTokenType, onAddress }: { modal: any, setModal: any, approveTokenType: any, onAddress: any }) {
    const { account, library }: any = useWeb3React();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    let token_abi = Config.Token.AYRA.abi;
    let token_address = Config.Token.AYRA.address;
    let token_name = 'AYRA';

    if (approveTokenType === Config.Token.ITHD.address) {
        token_abi = Config.Token.ITHD.abi;
        token_address = Config.Token.ITHD.address;
        token_name = 'ITHD';
    }

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const handleClose = () => {
        setModal(false);
    };

    const approve = async () => {

        const web3 = new Web3(library.provider);

        const contract = new web3.eth.Contract(token_abi, token_address);
        await contract.methods
            .approve(Config.Market.address, '100000000000000000000000000')
            .send({ from: account })
            .once('transactionHash', () => {
                notify('info', 'Approving purchase with Token');
            })
            .then((_tx: any) => {
                notify('success', 'You have approved the purchase with Token');
                handleClose();
            })
            .catch((e: any) => {
                if (e.code === 4001) {
                    notify('error', 'You need to approve the spending of Token in your wallet');
                }
            });
    }
    return (
        <Dialog
            fullScreen={fullScreen}
            open={modal}
            onClose={handleClose}
        >
            <Modal>
                <DialogTitle className='modal-title'>
                    <div className='title'>Approve Token</div>
                    <div onClick={handleClose}>
                        <ClearIcon />
                    </div>
                </DialogTitle>
                <DialogContent className=''>
                    <div className="modal-body">
                        <div><img src={tokenImg[token_address]} width={100} height={100} /></div>
                        <div>
                            <span>Please approve</span>
                            <span className='token-name'>{token_name}</span>
                            <span>token to the Marketplace...</span>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions className='modal-actions'>
                    <button autoFocus className='button button-primary' onClick={approve}>
                        Approve
                    </button>
                </DialogActions>
            </Modal>
        </Dialog>
    );
}

