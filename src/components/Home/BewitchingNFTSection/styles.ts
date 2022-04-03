import { styled } from '@mui/material/styles';

export const Section = styled('section')(({ theme }: { theme: any }) => {
    return ({
        marginRight: '10%',
        marginLeft: '10%',
        marginTop: '5%',
        marginBottom: '5%',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            margin: '10px',
        },
        '& .section-header': {
            marginTop: 50,
            marginBottom: 50,
            fontSize: 40,
            fontWeight: 600,
            '& div': {
                fontFamily: 'poppin-bold'
            }
        },
        '& .react-multiple-carousel__arrow': {
            zIndex: 1
        },
        '& .react-multiple-carousel__arrow--left': {
            left: 5,
            boxShadow: `${theme.palette.divider} 0px 0px 10px 2px`,
            backgroundColor: `${theme.palette.background.default}`,
            '&:hover': {
                backgroundColor: `${theme.palette.background.default}`,
                boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 10px 2px',
            }
        },
        '& .react-multiple-carousel__arrow::before': {
            fontSize: 15,
            color: `${theme.palette.text.primary}`
        },
        '& .react-multiple-carousel__arrow--right': {
            right: 5,
            boxShadow: `${theme.palette.divider} 0px 0px 10px 2px`,
            backgroundColor: `${theme.palette.background.default}`,
            '&:hover': {
                backgroundColor: `${theme.palette.background.default}`,
                boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 10px 2px',
            }
        }
    })
})
export const NFTItem = styled('div')(({ theme }: { theme: any }) => {

    return ({
        margin: '20px 20px 50px',
        borderRadius: 10,
        border: `1px solid ${theme.palette.background.default}`,
        transition: 'box-shadow 0.1s ease-in 0s',
        backgroundColor: `${theme.palette.background.default}`,
        boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 10px 2px',
        '&:hover': {
            boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 10px 6px',
        },
        '& .nft-wrap': {
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '10px 10px 0 0',
            width: '100%',
            height: 300,
        },
        '& .nft-col-pp': {
            width: 50,
            height: 50,
            display: 'block',
            margin: '0 auto',
            marginTop: '-25px',
            position: 'relative',
            boxShadow: `0px 0px 5px 0px #e7e7e7`,
            borderRadius: '50%',
            border: '2px solid white',
            '& span': {
                borderRadius: '50%',
                border: '1px solid white',
            },
            '& .pp-coll': {
                display: 'block',
                width: 50,
                height: 50,
                borderRadius: '50%',
            },
            '$ i': {
                fontSize: 10,
                borderRadius: '50%',
                padding: 3,
                position: 'absolute',
                bottom: 4,
                right: 5,
            }
        },
        '& .nft-col-info': {
            padding: 10,
            paddingBottom: 20,
            textAlign: 'center',
            '& a': {
                color: `${theme.palette.text.primary}`,
                textDecoration: 'none'
            },
            '& span': {
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
            }
        }
    })
})