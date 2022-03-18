import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const Section = styled('div')(({ theme }) => {

    const sm = useMediaQuery('(max-width:600px)');
    const md = useMediaQuery('(max-width:900px)');
    const lg = useMediaQuery('(max-width:1200px)');

    return ({
        display: 'flex',
        height: 600,
        ...((sm || md) && {
            height: '100%',
        }),
        '& .featured-background-container': {
            width: '100%',
            position: 'absolute',
            overflow: 'hidden',
            '& .coverImg': {
                height: 600,
                ...((sm || md) && {
                    height: 780
                }),
                // backgroundImage: "url(/assets/template/10.jpg)",
                backgroundSize: 'fill',
                backgroundPosition: 'center',
                // opacity: 0.5,
                filter: 'blur(8px)',
                mask: 'linear-gradient(rgb(255 255 255 / 50%), transparent)',
                '& img': {
                    width: '100%',
                    height: '100%'
                }
            },
        },
        '& .featured-container': {
            display: 'flex',
            justifyContent: 'center',
            margin: '0px auto',
            width: '100%',
            maxWidth: 'min(1280px, 100% - 40px)',
            flexWrap: 'wrap',
            '& .featured-title': {
                flexDirection: 'column',
                padding: '80px 20px 44px 30px',
                alignItems: 'flex-start',
                display: 'flex',
                width: '50%',
                lineHeight: 2,
                ...((sm || md) && {
                    alignItems: 'center',
                    width: '100%'
                }),
                '& .featured-header': {
                    margin: 0,
                    fontSize: '3vw',
                    fontWeight: 600,
                    textAlign: 'left',
                    lineHeight: 1.5,
                    ...((sm || md) && {
                        fontSize: 30,
                        maxWidth: 550,
                        textAlign: 'center',
                    }),
                    zIndex: 2,
                },
                '& .featured-subheader': {
                    marginTop: 20,
                    fontSize: 24,
                    textAlign: 'left',
                    ...((sm || md) && {
                        textAlign: 'center',
                        maxWidth: 400,
                        fontSize: 18
                    }),
                    zIndex: 2,
                },
                '& .featured-button-container': {
                    marginTop: 40,
                    zIndex: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...((sm || md) && {
                        marginTop: 20,
                        textAlign: 'center',
                    }),
                    '& div': {
                        '& .createBtn': {
                            marginTop: 10,
                            width: 200,
                            ...((sm || md) && {
                                width: 140,
                            }),
                            clipPath: 'polygon( calc(0px + 15px) 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, calc(0px + 15px) 100%, 0 50% )',
                            display: 'inline-block',
                            fontWeight: 700,
                            fontSize: 24,
                            color: '#fff',
                            lineHeight: 1,
                            padding: '14px 26px',
                            transition: 'all 0.3s',
                            position: 'relative',
                            background: '#5c49d0',
                            textTransform: 'capitalize'
                        },
                        '& .exploreBtn': {
                            marginTop: 10,
                            width: 200,
                            ...((sm || md) && {
                                width: 140,
                            }),
                            clipPath: 'polygon( calc(0px + 15px) 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, calc(0px + 15px) 100%, 0 50% )',
                            display: 'inline-block',
                            fontWeight: 700,
                            fontSize: 24,
                            color: '#fff',
                            backgroundColor: '#ff6050',
                            lineHeight: 1,
                            padding: '14px 26px',
                            transition: 'all 0.3s',
                            position: 'relative',
                            textTransform: 'capitalize'
                        },
                    },
                },
                '& .about-magics': {
                    display: 'flex',
                    height: '100%',
                    alignItems: 'flex-end',
                    marginTop: 40,
                    marginBottom: 10,
                    ...((sm || md) && {
                        width: '100%',
                        justifyContent: 'center'
                    })
                }
            },
            '& .featured-image': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                padding: '80px 40px 40px 40px',
                width: '50%',
                ...((sm || md) && {
                    width: '100%',
                    paddingTop: 0,
                    alignItems: 'center',
                }),
                '& .featured-image-card': {
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    borderRadius: 15,
                    zIndex: 2,
                    maxWidth: '550px',
                    boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 10px 0px',
                    ...((sm || md) && {
                        maxWidth: '355px',
                    }),
                    '&:hover': {
                        transition: 'box-shadow 0.3s ease-in 0s',
                        boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 50px 0px'
                    },
                    '& .featured-image-card-link': {
                        borderRadius: 15,
                        color: 'rgb(32, 129, 226)',
                        textDecoration: 'none',
                        '& .featured-image-card-link-meida': {
                            height: 420,
                            zIndex: 2,
                            borderBottom: '1px solid background.default',
                            minHeight: 'inherit',
                            borderRadius: 'inherit',
                            ...((sm || md) && {
                                height: 300,
                            }),
                            '& .media-img': {
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                display: 'flex',
                                height: '100%',
                                minHeight: 'inherit',
                                width: '100%',
                                position: 'relative',
                                borderRadius: 'inherit',
                                '& .asset-media-image': {
                                    height: 550,
                                    width: 550,
                                    borderRadius: 'inherit',
                                    borderBottomLeftRadius: 0,
                                    borderBottomRightRadius: 0,
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    maxHeight: '100%',
                                    maxWidth: '100%',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    color: `${theme.palette.text.primary}`,
                                    backgroundColor: `${theme.palette.background.default}`,
                                    '& img': {
                                        objectFit: 'fill',
                                        width: '100%',
                                        height: '100%',
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        borderTopLeftRadius: 'inherit',
                                        borderTopRightRadius: 'inherit',
                                        borderBottomRightRadius: 0,
                                        borderBottomLeftRadius: 0,
                                    }
                                }
                            }
                        }
                    },
                    '& .featured-image-text-area': {
                        display: 'flex',
                        borderRadius: '0px 0px 15px 15px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        fontWeight: 600,
                        padding: 16,
                        // border: '1px solid rgb(229, 232, 235)',
                        color: `${theme.palette.text.primary}`,
                        backgroundColor: `${theme.palette.background.default}`,
                        textAlign: 'left',
                        '& .logo': {
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
                        '& .content': {
                            flex: '1 1 auto',
                            flexFlow: 'column',
                            justifyContent: 'center',
                            marginRight: 16,
                            fontSize: 16,
                            alignItems: 'flex-start',
                        },
                        '& .info': {

                        }
                    }
                }
            },
        }
    })
});