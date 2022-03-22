import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Section, CreateNFTModal } from './styles';
import Link from 'next/link';

export default function CreateNFTOptionModal() {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Section>
            <button className='button button-primary' onClick={handleClickOpen}>
                Create NFT
            </button>
            <Dialog
                maxWidth={'lg'}
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="create-nft-modal-title"
                className='create-modal'
            >
                <CreateNFTModal>
                    <div className="modal-body">
                        <div id="create-nft-modal-title" className='modal-title'>
                            {"Change the World with your design"}
                        </div>
                        <div className='modal-content'>
                            <Link href={'/createself'}>
                                <a href="" className='select-item'>
                                    <img src="/images/design/self-logo.png" alt="" />
                                    <button>YOUR SELF</button>
                                </a>
                            </Link>
                            <div className='separater'>
                                <div className='vertical-line'></div>
                                <div className='mark'>
                                    <div>OR</div>
                                </div>
                            </div>
                            <Link href={'/create'}>
                                <a className='select-item'>
                                    <img src="/images/design/desingn-logo.png" alt="" />
                                    <button>DESIGN NOW</button>
                                </a>
                            </Link>
                        </div>
                        <div className='modal-actions'>
                            <Button autoFocus onClick={handleClose}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </CreateNFTModal>
            </Dialog>
        </Section>
    );
}
