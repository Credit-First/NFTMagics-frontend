import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

export const BuyModal = styled(Dialog)(({ theme, loading }: { theme?: any, loading?: any }) => {
    return ({
        '& .MuiBackdrop-root': {
            background: '#ffffff59'
        },
        '& .MuiDialog-paper': {
            background: 'none',
            boxShadow: 'none'
        },
        '& .modal-body': {
            minWidth: 280,
            maxWidth: 320,
            overflow: 'hidden',
            background: 'rgb(39, 38, 44)',
            boxShadow: 'rgb(14 14 44 / 10%) 0px 20px 36px -8px, rgb(0 0 0 / 5%) 0px 1px 1px',
            border: '1px solid rgb(56, 50, 65)',
            borderRadius: 32,
            width: '100%',
            maxHeight: '100vh',
            zIndex: 100,
            '& .modal-title': {
                alignItems: 'center',
                background: 'linear-gradient(166.77deg, rgb(59, 65, 85) 0%, rgb(58, 48, 69) 100%)',
                borderBottom: '1px solid rgb(56, 50, 65)',
                display: 'flex',
                padding: '12px 24px',
                '& .title': {
                    alignItems: 'center',
                    flex: '1 1 0%',
                    display: 'flex',
                    '& h2': {
                        fontSize: 20,
                        fontWeight: 600,
                        lineHeight: 1.1,
                        color: 'rgb(244, 238, 255)',
                    }
                },
                '& button': {
                    alignItems: 'center',
                    border: 0,
                    borderRadius: 16,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    fontSize: 16,
                    fontWeight: 600,
                    justifyContent: 'center',
                    letterSpacing: '0.03em',
                    lineHeight: 1,
                    opacity: 1,
                    outline: 0,
                    transition: 'background-color 0.2s ease 0s, opacity 0.2s ease 0s',
                    height: 48,
                    padding: '0px 10px',
                    backgroundColor: 'transparent',
                    color: 'rgb(31, 199, 212)',
                    boxShadow: 'none',
                }
            },
            '& .modal-content': {
                flexDirection: 'column',
                maxHeight: '90vh',
                overflowY: 'auto',
                display: 'flex',
                padding: 24,
                '& .content-title': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                    '& .textSubtle': {
                        color: 'rgb(184, 173, 210)',
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: 1.5,
                    },
                    '& .ticket': {
                        display: 'flex',
                        alignItems: 'center',
                        minWidth: 70,
                        '& .text': {
                            color: 'rgb(244, 238, 255)',
                            fontSize: 16,
                            fontWeight: 600,
                            lineHeight: 1.5,
                            marginRight: 4,
                        },
                        '& svg': {
                            alignSelf: 'center',
                            fill: 'rgb(244, 238, 255)',
                            flexShrink: 0,
                        }
                    }
                },
                '& .content-input': {
                    backgroundColor: 'rgb(55, 47, 71)',
                    border: '1px solid rgb(38, 33, 48)',
                    borderRadius: 16,
                    boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px inset',
                    padding: '8px 16px',
                    '& .input-wraper': {
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        '& .input-number': {
                            display: 'flex',
                            alignItems: 'center',
                            '&  input': {
                                background: 'transparent',
                                borderRadius: 0,
                                boxShadow: 'none',
                                paddingLeft: 0,
                                paddingRight: 0,
                                textAlign: 'right',
                                border: 'none',
                                backgroundColor: 'rgb(55, 47, 71)',
                                color: 'rgb(244, 238, 255)',
                                display: 'block',
                                fontSize: 16,
                                height: 40,
                                outline: 0,
                                padding: '0px 16px',
                                width: '100%',
                                '&:-webkit-inner-spin-button': {
                                    WebkitAppearance: 'none',
                                    margin: 0
                                }
                            }
                        },
                        '& .textSubtle': {
                            color: 'rgb(184, 173, 210)',
                            fontWeight: 400,
                            lineHeight: 1.5,
                            fontSize: 12,
                            textAlign: 'right',
                        }
                    }
                },
                '& .divider': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginTop: 4,
                    marginBottom: 12,
                },
                '& .content-detail': {
                    display: 'flex',
                    flexDirection: 'column',
                    '& .pay': {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: 8,
                        marginBottom: 24,
                        '& .textSubtle': {
                            color: 'rgb(184, 173, 210)',
                            fontSize: 16,
                            fontWeight: 400,
                            lineHeight: 1.5,
                        },
                        '& .price': {
                            '& .text': {
                                color: 'rgb(184, 173, 210)',
                                fontSize: 16,
                                fontWeight: 400,
                                lineHeight: 1.5,
                            }
                        }
                    },
                    '& .buy-button': {
                        alignItems: 'center',
                        border: 0,
                        borderRadius: 16,
                        boxShadow: 'rgb(14 14 44 / 40%) 0px -1px 0px 0px inset',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        fontSize: 16,
                        fontWeight: 600,
                        justifyContent: 'center',
                        letterSpacing: '0.03em',
                        lineHeight: 1,
                        opacity: 1,
                        outline: 0,
                        transition: 'background-color 0.2s ease 0s, opacity 0.2s ease 0s',
                        height: 48,
                        padding: '0px 24px',
                        backgroundColor: 'rgb(31, 199, 212)',
                        color: 'white',
                        ...(loading && {
                            opacity: 0.5
                        })
                    },
                    '& .loading': {
                        position: 'absolute',
                        top: 'calc(50% - 5px)',
                        left: 'calc(50% - 5px)'
                    },
                    '& .description': {
                        color: 'rgb(184, 173, 210)',
                        fontWeight: 400,
                        lineHeight: 1.5,
                        marginTop: 24,
                        fontSize: 12,
                    }
                }
            }
        }
    })
})

export const HeaderSection = styled('section')(({ theme }: { theme: any }) => {
    return ({
        fontFamily: 'Kanit',
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 0,
        background: 'linear-gradient(rgb(118, 69, 217) 0%, rgb(69, 42, 122) 100%)',
        padding: '48px 0px',
        '& .content': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            '& .bg': {
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'url(/svg/bg-star.svg) center 0px no-repeat',
            },
            '& .title': {
                fontFamily: 'Kanit-Bold',
                fontSize: 25,
                fontWeight: 700,
                color: 'white',
                marginBottom: 10,
            },
            '& .price': {
                fontFamily: 'Kanit-Bold',
                backgroundImage: 'linear-gradient(rgb(255, 216, 0) 0%, rgb(253, 171, 50) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'rgb(244, 238, 255)',
                fontWeight: 800,
                lineHeight: 1.5,
                marginBottom: 10,
                fontSize: 64,
            },
            '& .text': {
                fontSize: 20,
                fontWeight: 700,
                color: 'white',
                marginBottom: 50,
            },
            '& .action': {
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 288,
                height: 113,
                animation: '3s ease-in-out 0s infinite normal none running rotate',
                '& .action-btn': {
                    zIndex: 1,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) rotate(-4deg)',
                    '& button': {
                        width: 240,
                        background: 'linear-gradient(rgb(118, 69, 217) 0%, rgb(69, 42, 122) 100%)',
                        alignItems: 'center',
                        border: 0,
                        borderRadius: 16,
                        boxShadow: 'rgb(14 14 44 / 40%) 0px -1px 0px 0px inset',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        fontFamily: 'inherit',
                        fontSize: 16,
                        fontWeight: 600,
                        WebkitBoxPack: 'center',
                        justifyContent: 'center',
                        letterSpacing: '0.03em',
                        lineHeight: 1,
                        opacity: 1,
                        outline: 0,
                        transition: 'background-color 0.2s ease 0s, opacity 0.2s ease 0s',
                        height: 48,
                        padding: '0px 24px',
                        backgroundColor: 'rgb(31, 199, 212)',
                        color: 'white',
                    }
                },
                '& .action-bg': {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: 'rotate(-4deg)',
                },
            }
        },
        '@keyframes rotate': {
            '0%': {
                transform: 'rotate(0deg)',
            },
            '50%': {
                transform: 'rotate(6deg)',
            },
            '100%': {
                transform: 'rotate(0deg)',
            }
        },
    })
})

export const TicketSection = styled('section')(({ theme, loading }: { theme?: any, loading?: any }) => {
    return ({
        marginTop: '-30px',
        '& .shape-content': {
            background: 'none',
            zIndex: 2,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            '& .clip-path': {
                width: '100%',
                height: 20,
                clipPath: 'url(#topConcaveCurve)',
                background: 'rgb(118, 69, 217)',
                transform: 'translate(0px, 1px)',
            },
        },
        '& .content': {
            position: 'relative',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 1,
            padding: '14px 0px 48px',
            display: 'flex',
            background: 'linear-gradient(rgb(118, 69, 217) 0%, rgb(81, 33, 177) 100%)',
            '& .buy-content': {
                paddingTop: 48,
                paddingBottom: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            },
            '& .title': {
                fontFamily: 'Kanit-Bold',
                color: 'white',
                fontSize: 40,
                fontWeight: 700,
                marginBottom: 20
            },
            '& .draw-time': {
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginBottom: 8,
                '& .count-time': {
                    backgroundImage: 'linear-gradient(rgb(255, 216, 0) 0%, rgb(253, 171, 50) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'rgb(244, 238, 255)',
                    fontWeight: 800,
                    lineHeight: 1,
                    fontSize: 50,
                    '& .time-value': {
                        fontFamily: 'Kanit-Bold',
                    },
                    '& .time-hour': {
                        fontFamily: 'Kanit-Bold',
                        fontSize: 15,
                        fontWeight: 800,
                        padding: '0px 10px'
                    }
                },
                '& .text': {
                    fontFamily: 'Kanit-Bold',
                    color: 'white'
                }
            },
            '& .draw-dialog': {
                fontFamily: 'Kanit',
                width: 750,
                borderRadius: 24,
                color: 'rgb(244, 238, 255)',
                overflow: 'hidden',
                position: 'relative',
                padding: '1px',
                background: 'rgb(39, 38, 44)',
                '& .dialog-title': {
                    borderRadius: 24,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 24px',
                    color: 'white',
                    fontWeight: 700,
                    background: 'linear-gradient(166.77deg, rgb(59, 65, 85) 0%, rgb(58, 48, 69) 100%)',
                    '& .left-title': {
                        fontFamily: 'Kanit-Bold',
                        fontSize: 30
                    },
                    '& .right-date': {
                        fontFamily: 'Kanit',
                        fontWeight: 400,
                        fontSize: 15,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '& .date-time': {
                            marginLeft: 10
                        }
                    }
                },
                '& .dialog-content': {
                    '& .buy-content': {
                        display: 'flex',
                        alignItems: 'flex-start',
                        padding: 20,
                        '& .content-grid': {
                            columnGap: 32,
                            gridTemplateColumns: 'auto 1fr',
                            display: 'grid',
                            '& .prize-title': {
                                fontSize: 20,
                                fontWeight: 700,
                            },
                            '& .prize-pot': {
                                fontSize: 40,
                                fontWeight: 700,
                                lineHeight: 1,
                                color: 'rgb(154, 106, 255)',
                                marginBottom: 10,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                '& .token-name': {
                                    marginLeft: 10,
                                    fontSize: 20,
                                    fontWeight: 500
                                }
                            },
                            '& .prize-empty': {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 10
                            },
                            '& .ticket-title': {
                                fontSize: 20,
                                fontWeight: 700
                            },
                            '& .ticket-amount': {
                                display: 'flex',
                                alignItems: 'center',
                                '& .ticket-count': {
                                    marginLeft: 5,
                                    marginRight: 5,
                                }
                            }
                        },
                    },
                    '& .buy-action': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 20,
                        position: 'relative',
                        '& button': {
                            alignItems: 'center',
                            border: 0,
                            borderRadius: 16,
                            boxShadow: 'rgb(14 14 44 / 40%) 0px -1px 0px 0px inset',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            fontFamily: 'inherit',
                            fontSize: 16,
                            fontWeight: 600,
                            justifyContent: 'center',
                            letterSpacing: '0.03em',
                            lineHeight: 1,
                            opacity: 1,
                            outline: 0,
                            transition: 'background-color 0.2s ease 0s, opacity 0.2s ease 0s',
                            height: 48,
                            padding: '0px 24px',
                            backgroundColor: 'rgb(31, 199, 212)',
                            color: 'white',
                            maxWidth: 280,
                            ...(loading && {
                                opacity: 0.5
                            })
                        },
                        '& .loading': {
                            position: 'absolute',
                            top: 'calc(50% - 5px)',
                            left: 'calc(50% - 5px)'
                        }
                    }
                },
                '& .dialog-footer': {
                    '& .dialog-detail': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        background: 'rgb(8, 6, 11)',
                        padding: 24,
                        '& .detail-list': {
                            marginTop: 20,
                            '& .detail-item': {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                '& .ticket-number': {
                                    width: 100,
                                    textAlign: 'center'
                                },
                                '& .ticket-id': {
                                    width: 300,
                                    textAlign: 'center'
                                },
                                '& .buy-token': {
                                    width: 200,
                                    textAlign: 'center'
                                },
                                '& .winning': {
                                    width: 200,
                                    textAlign: 'center'
                                }
                            }
                        }
                    },
                    '& .dialog-action': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8px 24px',
                        color: 'white',
                        fontWeight: 700,
                        background: 'rgb(56, 50, 65)',
                        borderRadius: 24,
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        '& button': {
                            alignItems: 'center',
                            border: 0,
                            borderRadius: 16,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            fontSize: 16,
                            fontWeight: 600,
                            justifyContent: 'center',
                            letterSpacing: '0.03em',
                            lineHeight: 1,
                            opacity: 1,
                            outline: 0,
                            transition: 'background-color 0.2s ease 0s, opacity 0.2s ease 0s',
                            height: 48,
                            padding: '0px 24px',
                            color: 'rgb(31, 199, 212)',
                            boxShadow: 'none',
                        }
                    }
                }
            }
        }
    })
})

export const CheckSection = styled('section')(({ theme }: { theme: any }) => {
    return ({
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 1,
        background: 'linear-gradient(139.73deg, rgb(49, 61, 92) 0%, rgb(61, 42, 84) 100%)',
        padding: '48px 0px',
        display: 'flex',
        '& .check-content': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& .left-image': {
                width: 100,
            },
            '& .right-image': {
                width: 100,
            },
            '& .torn-left-image': {
                width: 100,
            },
            '& .torn-right-image': {
                width: 100,
            },
            '& .check-body': {
                padding: 20,
                '& .check-title': {
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 700,
                    marginBottom: 30
                },
                '& .check-action': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& button': {
                        alignItems: 'center',
                        border: 0,
                        borderRadius: 16,
                        boxShadow: 'rgb(14 14 44 / 40%) 0px -1px 0px 0px inset',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        fontFamily: 'inherit',
                        fontSize: 16,
                        fontWeight: 600,
                        justifyContent: 'center',
                        letterSpacing: '0.03em',
                        lineHeight: 1,
                        opacity: 1,
                        outline: 0,
                        transition: 'background-color 0.2s ease 0s, opacity 0.2s ease 0s',
                        height: 48,
                        padding: '0px 24px',
                        backgroundColor: 'rgb(31, 199, 212)',
                        color: 'white',
                        maxWidth: 280,
                    }
                }
            }
        }
    })
})

export const FinishedRoundSection = styled('section')(({ theme }: { theme: any }) => {
    return ({
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 1,
        background: 'linear-gradient(rgb(67, 69, 117) 0%, rgb(102, 87, 141) 100%)',
        padding: '48px 0px',
        '& .round-content': {
            margin: 0,
            width: '100%',
            paddingTop: 48,
            paddingBottom: 48,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            '& .round-title': {
                fontSize: 40,
                fontWeight: 700,
                color: 'white',
                marginBottom: 30
            },
            '& .round-switch': {
                backgroundColor: 'rgb(55, 47, 71)',
                borderRadius: 16,
                display: 'inline-flex',
                border: '1px solid rgb(38, 33, 48)',
                width: 'auto',
                marginBottom: 30,
                '& button': {
                    boxShadow: 'none',
                    flex: '1 1 auto',
                    alignItems: 'center',
                    border: 0,
                    borderRadius: 16,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    fontSize: 16,
                    fontWeight: 600,
                    justifyContent: 'center',
                    letterSpacing: '0.03em',
                    lineHeight: 1,
                    opacity: 1,
                    outline: 0,
                    transition: 'background-color 0.2s ease 0s, opacity 0.2s ease 0s',
                    height: 32,
                    padding: '0px 16px',
                },
                '& .history': {
                    color: 'rgb(184, 173, 210)',
                    '&.active': {
                        backgroundColor: 'rgb(184, 173, 210)',
                        color: 'rgb(39, 38, 44)',
                    }
                },
            },
            '& .round-dialog-all': {
                display: 'none',
                width: 756,
                background: 'rgb(39, 38, 44)',
                borderRadius: 24,
                color: 'rgb(244, 238, 255)',
                overflow: 'hidden',
                position: 'relative',
                padding: '1px 1px 3px',
                '&.active': {
                    display: 'block'
                },
                '& .round-dialog-title': {
                    fontSize: 20,
                    borderBottom: '1px solid rgb(56, 50, 65)',
                    background: 'rgb(39, 38, 44)',
                    borderRadius: '24px 24px 0px 0px',
                    padding: 24,
                    '& .round-count-detail': {
                        zIndex: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        '& .count-detail': {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '& .round-count': {
                                width: 60,
                                height: '100%',
                                marginLeft: 10,
                                padding: '4px 16px',
                                textAlign: 'center',
                                backgroundColor: 'rgb(55, 47, 71)',
                                borderRadius: 16,
                                boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px inset',
                                color: 'rgb(244, 238, 255)',
                                display: 'block',
                                fontSize: 16,
                                outline: 0,
                                border: '1px solid rgb(38, 33, 48)',
                            }
                        },
                        '& .navigator': {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '& .prev-button': {
                                border: '1px solid transparent',
                                '&:hover': {
                                    cursor: 'pointer',
                                    border: '1px solid rgb(56, 50, 65)',
                                },
                            },
                            '& .next-button': {
                                border: '1px solid transparent',
                                '&:hover': {
                                    cursor: 'pointer',
                                    border: '1px solid rgb(56, 50, 65)',
                                },
                            }
                        }
                    },
                    '& .round-date': {
                        fontSize: 12
                    }
                },
                '& .round-body': {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 20,
                    position: 'relative',
                    overflow: 'hidden',
                    '& .badge': {
                        right: '-10px',
                        top: '-10px',
                        zIndex: 10,
                        backgroundColor: 'rgb(154, 106, 255)',
                        color: 'white',
                        margin: 0,
                        padding: '8px 0px',
                        position: 'absolute',
                        textAlign: 'center',
                        transform: 'translateX(30%) translateY(0%) rotate(45deg)',
                        transformOrigin: 'left top',
                        width: 96,
                        '&:before': {
                            right: '100%',
                            backgroundColor: 'rgb(154, 106, 255)',
                            content: '""',
                            height: '100%',
                            margin: '0px -1px',
                            position: 'absolute',
                            top: 0,
                            width: '100%',
                        },
                        '&:after': {
                            left: '100%',
                            backgroundColor: 'rgb(154, 106, 255)',
                            content: '""',
                            height: '100%',
                            margin: '0px -1px',
                            position: 'absolute',
                            top: 0,
                            width: '100%',
                        }
                    },
                    '& .level': {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 10,
                        '& .ticket-id': {
                            fontSize: 30
                        },
                        '& .ticket-number': {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 50,
                            '& .number-item': {
                                width: 70,
                                height: 70,
                                position: 'relative',
                                padding: '0px 2px',
                                '& .number-bg': {
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    position: 'absolute',
                                    '& .number-left': {
                                        fontWeight: 700,
                                        lineHeight: 1.5,
                                        fontSize: 42,
                                        color: 'rgb(0, 0, 0)',
                                        textShadow: 'white -0.75px -0.75px 0px, white 0.75px -0.75px 0px, white -0.75px 0.75px 0px, white 0.75px 0.75px 0px',
                                        transform: 'rotate(-13deg)',
                                    },
                                    '& .number-right': {
                                        fontWeight: 700,
                                        lineHeight: 1.5,
                                        fontSize: 42,
                                        color: 'rgb(0, 0, 0)',
                                        textShadow: 'white -0.75px -0.75px 0px, white 0.75px -0.75px 0px, white -0.75px 0.75px 0px, white 0.75px 0.75px 0px',
                                        transform: 'rotate(13deg)',
                                    },
                                    '& .number': {
                                        fontWeight: 700,
                                        lineHeight: 1.5,
                                        fontSize: 42,
                                        color: 'rgb(0, 0, 0)',
                                        textShadow: 'white -0.75px -0.75px 0px, white 0.75px -0.75px 0px, white -0.75px 0.75px 0px, white 0.75px 0.75px 0px',
                                        transform: 'rotate(0deg)',
                                    },
                                }
                            }
                        }
                    }
                }
            },
            '& .round-dialog-yours': {
                display: 'none',
                width: 756,
                background: 'rgb(39, 38, 44)',
                borderRadius: 24,
                color: 'rgb(244, 238, 255)',
                overflow: 'hidden',
                position: 'relative',
                padding: '1px 1px 3px',
                '&.active': {
                    display: 'block'
                },
                '& .round-dialog-title': {
                    fontSize: 20,
                    borderBottom: '1px solid rgb(56, 50, 65)',
                    background: 'rgb(39, 38, 44)',
                    borderRadius: '24px 24px 0px 0px',
                    padding: 24,
                    '& .round-count-detail': {
                        zIndex: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        '& .count-detail': {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '& .round-count': {
                                width: 60,
                                height: '100%',
                                marginLeft: 10,
                                padding: '4px 16px',
                                backgroundColor: 'rgb(55, 47, 71)',
                                borderRadius: 16,
                                boxShadow: 'rgb(74 74 104 / 10%) 0px 2px 2px -1px inset',
                                color: 'rgb(244, 238, 255)',
                                display: 'block',
                                fontSize: 16,
                                outline: 0,
                                border: '1px solid rgb(38, 33, 48)',
                            }
                        }
                    },
                    '& .round-date': {
                        fontSize: 12
                    }
                },
                '& .round-body': {
                    '& .detail-list': {
                        marginTop: 20,
                        padding: 20,
                        '& .detail-item': {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            paddingBottom: 5,
                            '& .ticket-number': {
                                width: 100,
                                textAlign: 'center'
                            },
                            '& .lottery-id': {
                                width: 300,
                                textAlign: 'center'
                            },
                            '& .ticket-id': {
                                width: 300,
                                textAlign: 'center'
                            },
                            '& .buy-token': {
                                width: 200,
                                textAlign: 'center'
                            },
                            '& .winning': {
                                width: 200,
                                textAlign: 'center'
                            }
                        }
                    }
                }
            }
        }
    })
})

export const HowPlaySection = styled('section')(({ theme }: { theme: any }) => {
    return ({
        '& .shape-content': {
            background: 'rgb(8, 6, 11)',
            zIndex: 2,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            '& .clip-path': {
                width: '100%',
                height: 20,
                clipPath: 'url(#topConvexCurve)',
                background: 'rgb(102, 87, 141)',
                transform: 'translate(0px, -1px)',
            }
        },
        '& .content': {
            position: 'relative',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 1,
            background: 'rgb(8, 6, 11)',
            padding: 40,
            '& .header': {
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                '& .title': {
                    color: 'rgb(154, 106, 255)',
                    fontSize: 40,
                    fontWeight: 700,
                    marginBottom: 50
                },
                '& .detail': {
                    color: 'white',
                    marginBottom: 50
                }
            },
            '& .body': {
                flexDirection: 'row',
                gap: 24,
                width: '100%',
                display: 'flex',
                marginBottom: 30,
                '& .pannel': {
                    display: 'flex',
                    alignSelf: 'baseline',
                    position: 'relative',
                    background: 'rgb(56, 50, 65)',
                    padding: '1px 1px 3px',
                    borderRadius: 24,
                    '& .pannel-content': {
                        width: '100%',
                        padding: 25,
                        background: 'rgb(39, 38, 44)',
                        borderRadius: 24,
                        '& .pannel-content-step': {
                            color: 'white',
                            fontWeight: 600,
                            lineHeight: 1.5,
                            textTransform: 'uppercase',
                            marginBottom: 16,
                            fontSize: 12,
                            textAlign: 'right',
                        },
                        '& .pannel-content-title': {
                            fontSize: 24,
                            fontWeight: 600,
                            lineHeight: 1.1,
                            color: 'rgb(154, 106, 255)',
                            marginBottom: 16,
                        },
                        '& .pannel-content-detail': {
                            color: 'rgb(184, 173, 210)',
                            fontSize: 16,
                            fontWeight: 400,
                            lineHeight: 1.5,
                        }
                    }
                }
            }
        }
    })
})

export const DropdownMenu = styled('div')(({ theme, open, width, disabled }: { theme?: any, open: any, width?: any, disabled?: any }) => ({
    width: 70,
    ...(width && {
        width: width
    }),
    // overflowY: 'auto',
    ...(open && {
        zIndex: 10,
    }),
    ...(disabled && {
        opacity: 0.5,
    }),
    '& .dropdownBtn': {
        display: 'flex',
        justifyContent: 'space-between',
        cursor: 'pointer',
        position: 'relative',
        padding: 12,
        width: '100%',
        color: 'rgb(244, 238, 255)',
        ...(open && {
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
        }),
    },
    '& .subMenuContent': {
        width: 'inherit',
        position: 'relative',
        '& .back': {
            display: 'none',
            position: 'fixed',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            ...(open && {
                display: 'block',
                zIndex: 10
            }),
        },
        '& .submenu': {
            position: 'absolute',
            zIndex: 9,
            width: '100%',
            display: 'none',
            overflowY: 'auto',
            backgroundImage: 'linear-gradient(166.77deg, rgb(59, 65, 85) 0%, rgb(58, 48, 69) 100%)',
            borderRadius: 10,
            transition: 'all 0.3s ease 0s',
            boxShadow: `0px 0px 10px 0px ${theme.palette.divider}`,
            ...(open && {
                transition: 'all 0.3s ease 0s',
                display: 'block',
                zIndex: 11,
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
            }),
            '& ul': {
                margin: 0,
                padding: 0,
                borderRadius: 10,
                '& li': {
                    cursor: 'pointer',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '& a': {
                        padding: 10,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: 'rgb(244, 238, 255)',
                        minHeight: 45,
                        '& .icon': {
                            width: 20,
                            height: 20,
                            marginRight: 10
                        },
                        '& svg': {
                            marginRight: 10
                        },
                        '& .collection-logo': {
                            position: 'relative',
                            width: 50,
                            height: 50,
                            border: `2px solid white`,
                            borderRadius: '50%',
                            boxShadow: `grey 0px 0px 5px 0px`,
                            marginRight: 10,
                            '& img': {
                                borderRadius: '50%',
                                width: '100%',
                                height: '100%'
                            }
                        }
                    },
                    '&:hover a': {
                        transition: 'all 0.3s ease 0s',
                        boxShadow: `0px 0px 10px 0px ${theme.palette.divider}`,
                    },
                },
                '& li:last-of-type': {
                    border: 'none',
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                },
            }
        }
    }
}))