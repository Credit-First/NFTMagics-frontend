import * as React from 'react';
import { styled } from '@mui/material/styles';

const Loader = styled('div')(({ theme, loading } : { theme?:any, loading: any}) => {
    return ({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#ffffff80',
        zIndex: 10,
        ...( !loading && {
            display: 'none',
        }),
        '& .loader-content': {
            position: 'relative',
            width: 150,
            height: 150,
            borderRadius: '50%',
        },
        '& .logo': {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            fontSize: 30,
            textTransform: 'uppercase',
            color: 'white',
            fontWeight: 700,
            '& img': {
                opacity: 0.7,
                width: 120,
                height: 120
            }
        },
        '& .loader': {
            position: 'absolute',
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: 'linear-gradient(#f07e6e, #84cdfa, #5ad1cd)',
            animation: 'animate 2s linear infinite',
        },
        '@keyframes animate': {
            '0%': {
                transform: 'rotate(0deg)',
            },
            '100%': {
                transform: 'rotate(360deg)',
            }
        },
        '& .loader span': {
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'linear-gradient(#f07e6e, #84cdfa, #5ad1cd)',
        },
        '& .loader span:nth-of-type(1)': {
            filter: 'blur(5px)',
        },
        '& .loader span:nth-of-type(2)': {
            filter: 'blur(10px)',
        },
        '& .loader span:nth-of-type(3)': {
            filter: 'blur(25px)',
        },
        '& .loader span:nth-of-type(4)': {
            filter: 'blur(50px)',
        },
        '& .loader:after': {
            content: '""',
            position: 'absolute',
            top: 10,
            left: 10,
            right: 10,
            bottom: 10,
            border: 'solid white 3px',
            borderRadius: '50%',
        }
    })
});

const PageLoading = ({loading}: {loading: any}) => {
    return (
        <Loader loading={loading ? 1 : 0}>
            <div className='loader-content'>
                <div className='loader'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                {/* <div className='logo'><img src='/images/logo.png'/></div> */}
                <div className='logo'>Magic</div>
            </div>
        </Loader>
    )
}
export default PageLoading;