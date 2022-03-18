import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const Section = styled('div')(({ theme: any }) => {

    const sm = useMediaQuery('(max-width:600px)');
    const md = useMediaQuery('(max-width:900px)');

    return ({    
        color: 'rgb(255, 255, 255)',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        backgroundColor: 'rgb(24, 104, 183)',
        '& .footer-container': {
            width: '80%',
            '& .footer-row': {
                paddingBottom: 40,
                marginBottom: 20,
                borderBottom: '1px solid rgba(229, 232, 235, 0.25)',
                display: 'flex',
                ...( ( sm || md ) && {
                    flexDirection: 'column',
                }),
                '& .footer-left': {
                    padding: 10,
                    paddingTop: 30,
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    ...( ( sm || md ) && {
                        width: '100%',
                        alignItems: 'center',
                        textAlign: 'center',
                    }),
                    '& .footer-section-header': {
                        color: 'rgb(255, 255, 255)',
                        fontSize: 30,
                        fontWeight: 600,
                        marginBottom: 8,
                        marginTop: 8,
                    },
                    '& .footer-text': {
                        fontSize: 16,
                        color: 'rgb(251, 253, 255)',
                    },
                    '& .form-footer': {
                        display: 'flex',
                        flexDirection: 'colimn',
                        marginTop: 20,
                        '& .form-input': {
                            boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 8px 0px',
                            cursor: 'text',
                            display: 'flex',
                            backgroundColor: 'rgb(255, 255, 255)',
                            borderRadius: 10,
                            border: '1px solid rgb(229, 232, 235)',
                            width: '100%',
                            padding: 12,
                            '& .form-input-text': {
                                cursor: 'text',
                                backgroundColor: 'transparent',
                                border: 'none',
                                outline: 'none',
                                width: '100%',
                            }
                        },
                        '& .submitBtn': {
                            // clipPath: 'polygon( calc(0px + 15px) 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, calc(0px + 15px) 100%, 0 50% )',
                            borderRadius: 10,
                            marginLeft: 10,
                            display: 'inline-block',
                            fontSize: 20,
                            color: '#fff',
                            backgroundColor: 'rgb(32, 129, 226)',
                            lineHeight: 1,
                            padding: '10px 20px',
                            transition: 'all 0.3s',
                            position: 'relative',
                            textTransform: 'capitalize',
                            '&:hover': {
                                backgroundColor: 'rgb(77 150 223)',
                            }
                        }
                    },
                    '& .subBtn': {
                        // clipPath: 'polygon( calc(0px + 15px) 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, calc(0px + 15px) 100%, 0 50% )',
                        borderRadius: 10,
                        marginLeft: 10,
                        display: 'inline-block',
                        fontSize: 20,
                        color: '#fff',
                        backgroundColor: 'rgb(32, 129, 226)',
                        lineHeight: 1,
                        padding: '10px',
                        transition: 'all 0.3s',
                        position: 'relative',
                        textTransform: 'capitalize',
                        '&:hover': {
                            backgroundColor: 'rgb(77 150 223)',
                        }
                    }
                },
                '& .footer-right': {
                    padding: 10,
                    paddingTop: 30,
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    textAlign: 'left',
                    ...( ( sm || md ) && {
                        width: '100%',
                        alignItems: 'center',
                        textAlign: 'center',
                    }),
                    '& .footer-section-header': {
                        color: 'rgb(255, 255, 255)',
                        fontSize: 30,
                        fontWeight: 600,
                        marginBottom: 8,
                        marginTop: 8,
                    },
                    '& .footer-text': {
                        fontSize: 16,
                        color: 'rgb(251, 253, 255)',
                    },
                    '& .form-footer': {
                        display: 'flex',
                        flexDirection: 'colimn',
                        marginTop: 20,
                        '& .form-input': {
                            boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 8px 0px',
                            cursor: 'text',
                            display: 'flex',
                            backgroundColor: 'rgb(255, 255, 255)',
                            borderRadius: 10,
                            border: '1px solid rgb(229, 232, 235)',
                            width: '100%',
                            padding: 12,
                            '& .form-input-text': {
                                cursor: 'text',
                                backgroundColor: 'transparent',
                                border: 'none',
                                outline: 'none',
                                width: '100%',
                            }
                        },
                        '& .submitBtn': {
                            // clipPath: 'polygon( calc(0px + 15px) 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, calc(0px + 15px) 100%, 0 50% )',
                            borderRadius: 10,
                            marginLeft: 10,
                            display: 'inline-block',
                            fontSize: 20,
                            color: '#fff',
                            backgroundColor: 'rgb(32, 129, 226)',
                            lineHeight: 1,
                            padding: '10px 20px',
                            transition: 'all 0.3s',
                            position: 'relative',
                            textTransform: 'capitalize',
                            '&:hover': {
                                backgroundColor: 'rgb(77 150 223)',
                            }
                        }
                    },
                    '& .subBtn': {
                        // clipPath: 'polygon( calc(0px + 15px) 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, calc(0px + 15px) 100%, 0 50% )',
                        borderRadius: 10,
                        marginLeft: 10,
                        display: 'inline-block',
                        fontSize: 20,
                        color: '#fff',
                        backgroundColor: 'rgb(32, 129, 226)',
                        lineHeight: 1,
                        padding: '10px',
                        transition: 'all 0.3s',
                        position: 'relative',
                        textTransform: 'capitalize',
                        '&:hover': {
                            backgroundColor: 'rgb(77 150 223)',
                        }
                    }
                }
            },
            '& .footer-link': {
                display: 'flex',
                paddingBottom: 20,
                justifyContent: 'space-between',
                '& .footer-com': {
                    flex: 1
                },
                '& .footer-sublnk a': {
                    color: 'white'
                }
            }
        }
    })
});