import * as React from 'react';
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
import { useWeb3React } from "@web3-react/core";

export default function AffiliateSetModal({ modal, setModal, refLink }: { modal: any, setModal: any, refLink?: any }) {
    const { account }: any = useWeb3React();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const handleClose = () => {
        setModal(false);
    };

    const agree = async () => {
        localStorage.setItem('magic-affiliate-link', refLink);
        window.history.replaceState(null, '', '/');
        notify('success', 'You have choosen the address to the affiliate link');
        setModal(false);
    }
    return (
        <Dialog
            fullScreen={fullScreen}
            open={modal}
            onClose={handleClose}
        >
            <Modal>
                <DialogTitle className='modal-title'>
                    <div className='title'>Referal affiliate link</div>
                    <div onClick={handleClose}>
                        <ClearIcon />
                    </div>
                </DialogTitle>
                <DialogContent className=''>
                    <div className="modal-body">
                        <span>Please set affiliate link</span>
                        {
                            refLink && (
                                <span className='link-name'>{refLink.substring(0, 10)} ... ${refLink.substring(refLink.length - 10)}</span>
                            )
                        }
                        <span>to the Marketplace...</span>
                    </div>
                </DialogContent>
                <DialogActions className='modal-actions'>
                    <button autoFocus className='button button-primary' onClick={agree}>
                        Agree
                    </button>
                </DialogActions>
            </Modal>
        </Dialog>
    );
}

