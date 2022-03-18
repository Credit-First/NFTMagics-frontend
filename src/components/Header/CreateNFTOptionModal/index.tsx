import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { CreateNFTModal } from './styles';
import Link from 'next/link';

export default function CreateNFTOptionModal() {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button className='button button-primary' onClick={handleClickOpen}>
                Create NFT
            </button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="create-nft-modal-title"
            >
                <CreateNFTModal>
                    <DialogContent className=''>
                        <DialogTitle id="create-nft-modal-title" className='modal-title'>
                            {"Change the World with your design"}
                        </DialogTitle>
                        <div className="modal-body">
                            <Link href={'/createself'}>
                                <a href="" className='select-item'>
                                    <img src="/images/design/self-logo.png" alt="" />
                                    <button>YOUR SELF</button>
                                </a>
                            </Link>
                            <Link href={'/create'}>
                                <a className='select-item'>
                                    <img src="/images/design/desingn-logo.png" alt="" />
                                    <button>DESIGN NOW</button>
                                </a>
                            </Link>
                        </div>
                    </DialogContent>
                    <DialogActions className='modal-actions'>
                        <Button autoFocus onClick={handleClose}>
                            Cancel
                        </Button>
                    </DialogActions>
                </CreateNFTModal>
            </Dialog>
        </div>
    );
}
