import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

export const Section = styled('div')((theme: any) => {

    return ({
        width: '100%',
        flexDirection: 'column',
        display: 'flex',
        padding: '3% 10%',
        '& .title': {
            justifyContent: 'center',
            flexDirection: 'column',
            display: 'flex',
            marginTop: 50,
            marginBottom: 50,
            fontSize: 40,
            fontWeight: 600,
            textAlign: 'center',
            '& div': {
                fontFamily: 'poppin-bold'
            },
            '& .dropdown': {
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer',
                justifyContent: 'center',
                marginLeft: 8,
                '& p': {
                    fontWeight: 600,
                    color: 'rgb(32, 129, 226)',
                    margin: 0,
                    fontSize: 24,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                }
            }
        },
        '& .button-action': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 40,
            '& .rankingBtn': {
                width: 250,
                fontWeight: 700,
                fontSize: 20,
                color: '#fff',
                padding: '5px 18px',
                transition: 'all 0.3s',
            }
        }
    })
});

export const Item = styled('a')(({ theme }) => {

    const sm = useMediaQuery('(max-width:600px)');
    const md = useMediaQuery('(max-width:900px)');

    return ({
        cursor: 'pointer',
        width: '100%',
        color: 'inherit',
        fontWeight: 600,
        padding: 16,
        borderRadius: 15,
        borderBottom: '1px solid background.default',
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 9%), rgba(0 0 0 / 9%))',
        textAlign: 'left',
        height: 88,
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        ...((md || sm) && {
            maxWidth: 450,
            minWidth: 300
        }),
        '&:hover': {
            boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 10px 0px',
            borderRadius: 15,
            borderColor: 'transparent'
        },
        '& .item-no': {
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            display: 'flex',
            marginRight: 15,
            width: 10,
            '& span': {
                fontWeight: 600,
                fontSize: 16,
                width: '100%',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
            }
        },
        '& .item-avatar': {
            marginRight: 16,
            borderRadius: '50%',
            padding: 0,
            position: 'relative',
            border: `1px solid white`,
            boxShadow: 'rgb(26 26 26) 0px 0px 3px 0px',
            '& span': {
                width: 50,
                height: 50,
                borderRadius: '50%',
            },
            '& img': {
                position: 'absolute',
                top: 0,
                width: 50,
                height: 50,
                borderRadius: '50%',
            }
        },
        '& .item-detail': {
            paddingLeft: 10,
            flex: 1
        },
        '& .item-info': {
            display: 'flex',
            justifyContent: 'center',
            aligItems: 'center',
            '& .tokenImg': {
                width:30,
                '$ span': {
                    position: 'absolute'
                }
            },
            '& .price': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 10,
                fontSize: 20,
                fontWeight: 600
            }
        }
    })
})
export const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    }
}));