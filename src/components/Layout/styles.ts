import { styled } from '@mui/material/styles';

export const LayoutSection = styled('div')(({theme}) => {
    return ({
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: `${theme.palette.background.default}`,
        color: `${theme.palette.text.primary}`,
        '& .header': {
            position: 'sticky',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 110,
        },
        '& .main': {
            flex: '1 1 0%',
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100% - 80px)',
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))',
            '& .section': {
                flex: '1 1 0%',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 'calc(100vh - 80px)'
            }
        }
    })
})

