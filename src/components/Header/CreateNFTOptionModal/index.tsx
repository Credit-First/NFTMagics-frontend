import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Section, CreateNFTModal } from './styles';
import Link from 'next/link';
import PageLoading from '@/components/PageLoading';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateNFTOptionModal() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLink = () => {
        setLoading(true);
        setOpen(false);
    }
    return (
        <Section>
            <button className='button button-primary' onClick={handleClickOpen}>
                Create NFT
            </button>
            <Dialog
                maxWidth={'md'}
                open={open}
                PaperProps={{
                    style: { borderRadius: 20 }
                }}
                TransitionComponent={Transition}
                onClose={handleClose}
                aria-labelledby="create-nft-modal-title"
                className='create-modal'
                style={{ borderRadius: 20 }}
            >
                <CreateNFTModal>
                    <div className="modal-body">
                        <div id="create-nft-modal-title" className='modal-title'>
                            Change the World with your design
                        </div>
                        <div className='modal-content'>
                            <Link href={'/createself'}>
                                <a href="" className='select-item' onClick={handleLink}>
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
                                <a className='select-item' onClick={handleLink}>
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
            <PageLoading loading={loading} />
        </Section>
    );
}
