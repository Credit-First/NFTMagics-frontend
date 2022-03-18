import { styled } from "@mui/material/styles";
import { Badge } from '@mui/material';

export const SidebarWalletLSection = styled('div')(({ theme, openwalletlist, connectloading }: { theme?: any, openwalletlist: any, connectloading?: any }) => {

    return ({
        position: 'fixed',
        right: 0,
        bottom: 0,
        top: 80,
        width: '420px',
        zIndex: 90,
        backgroundColor: `${theme.palette.background.default}`,
        color: 'text.primary',
        height: 'calc((100 % - 0px) - 72px)',
        border: `1px solid ${theme.palette.divider}`,
        overflow: 'auto',
        filter: 'drop-shadow(rgba(0, 0, 0, 0.25) 0px 4px 4px)',
        transition: 'transform 0.3s ease 0s, opacity 0.3s ease 0s',
        visibility: 'visible',
        transform: 'translate3d(100%, 0px, 0px)',
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))',
        opacity: 1,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            zIndex: 100,
            borderWidth: 0,
        },
        ...(openwalletlist && {
            boxShadow: `0px 2px 4px -1px ${theme.palette.divider}, 0px 4px 5px 0px ${theme.palette.divider}, 0px 1px 10px 0px ${theme.palette.divider}`,
            transform: 'translate3d(0px, 0px, 0px)'
        }),
        '& .sidebar-wallet-header': {
            fontWeight: 700,
            padding: 20,
            borderBottom: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            justifyContent: 'space-between',
            height: 72,
            '& .header-title': {
                fontWeight: 600,
                fontSize: 16,
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                '& .header-title-left': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                '& .header-title-right': {
                    cursor: 'default',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }
            }
        },
        '& .sidebar-wallet-body': {
            padding: 20,
            height: 'calc(100% - 144px)',
            paddingBottom: 72,
            '& .body-header': {
                '& p': {
                    margin: 0,
                    fontWeight: 500,
                    fontSize: 15,
                    color: 'rgb(112, 122, 131)',
                    '& .wallet-info': {
                        padding: '0px 5px',
                        fontWeight: 700,
                        color: 'rgb(32, 129, 226)',
                        textDecoration: 'none',
                    }
                },
            },
            '& .body-content': {
                marginBottom: 25,
                marginTop: 25,
                '& .wallet-list': {
                    borderRadius: 10,
                    borderBottom: 'none',
                    border: `1px solid ${theme.palette.divider}`,
                    margin: 0,
                    paddingLeft: 0,
                    '& .wallet-item': {
                        width: '100%',
                        '&:first-of-type': {
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                        },
                        '&:not(:last-of-type)': {
                            borderBottom: `1px solid ${theme.palette.divider}`,
                        },
                        '& button': {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: 'none',
                            width: '100%',
                            fontWeight: 600,
                            padding: '16px',
                            textAlign: 'left',
                            fontSize: '100%',
                            '&:hover': {
                                transition: 'all 0.2s ease 0s',
                                boxShadow: `${theme.palette.divider} 0px 0px 8px 3px`,
                                ...(connectloading && {
                                    boxShadow: 'none'
                                }),
                            },
                            ...(connectloading && {
                                opacity: 0.5,
                            }),
                            '& .wallet-img': {
                                height: 24,
                                width: 24,
                                marginRight: 16,
                                objectFit: 'contain'
                            },
                            '& .wallet-name': {
                                alignSelf: 'stretch',
                                flex: '1 1 auto',
                                flexFlow: 'column',
                                justifyContent: 'center',
                                marginRight: 16,
                                order: 3,
                                overflow: 'hidden',
                                fontSize: 16,
                                alignItems: 'flex-start',
                                '& .span': {
                                    fontWeight: 700,
                                    fontSize: 14,
                                }
                            },
                            '& .wallet-info': {
                                alignSelf: 'stretch',
                                display: 'flex',
                                flex: '0 0 auto',
                                flexFlow: 'row',
                                justifyContent: 'center',
                                maxWidth: '40%',
                                order: 4,
                                overflow: 'hidden',
                                textAlign: 'right',
                                '& .type': {
                                    marginRight: 10,
                                },
                                '& .loading': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    '& .loading-progress': {
                                        width: 20,
                                        height: 20
                                    }
                                }
                            }
                        },
                        '&:first-of-type > button': {
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        },
                        '&:last-of-type > button': {
                            // borderBottomLeftRadius: 10,
                            // borderBottomRightRadius: 10,
                        },
                    },
                    '& .more-options': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: 'none',
                        width: '100%',
                        fontWeight: 600,
                        padding: '16px',
                        textAlign: 'left',
                        fontSize: '100%',
                        borderTop: `1px solid ${theme.palette.divider}`,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        '&:hover': {
                            transition: 'all 0.2s ease 0s',
                            boxShadow: `${theme.palette.divider} 0px 0px 8px 3px`,
                        },
                    }
                },
                '& .token-list': {
                    borderRadius: 10,
                    borderBottom: 'none',
                    border: `1px solid ${theme.palette.divider}`,
                    margin: '0px 25px',
                    paddingLeft: 0,
                    '& .token-item': {
                        width: '100%',
                        '&:first-of-type': {
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                        },
                        '&:not(:last-of-type)': {
                            borderBottom: `1px solid ${theme.palette.divider}`,
                        },
                        '& .token': {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 10,
                            '& img': {
                                width: 30,
                                height: 30
                            }
                        }
                    },
                },
                '& .reward-info': {
                    marginTop: 50,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& .reward-token-list': {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 10,
                        borderBottom: 'none',
                        border: `1px solid ${theme.palette.divider}`,
                        margin: '0px 25px',
                        paddingLeft: 0,
                        width: '50%',
                        '& .token-item': {
                            width: '100%',
                            '&:first-of-type': {
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                            },
                            '&:not(:last-of-type)': {
                                borderBottom: `1px solid ${theme.palette.divider}`,
                            },
                            '& .token': {
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: 10,
                                '& img': {
                                    width: 30,
                                    height: 30
                                }
                            }
                        }
                    },
                    '& .button': {
                        marginTop: 30
                    }
                }
            },
            '& .body-footer': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }
        }
    })
})

export const DropdownMenu = styled('div')(({ theme, open, width }: { theme?: any, open: any, width?: any }) => ({
    width: 200,
    ...(width && {
        width: width
    }),
    overflowY: 'auto',
    ...(open && {
        transition: 'all 0.3s ease 0s',
        zIndex: 10,
    }),
    '& .dropdownBtn': {
        display: 'flex',
        justifyContent: 'space-between',
        cursor: 'pointer',
        position: 'relative',
        padding: 10,
        transition: 'all 0.3s ease 0s',
        // borderRadius: 15,
        // border: `1px solid ${theme.palette.divider}`,
        ...(open && {
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
        }),
    },
    '& .subMenuContent': {
        width: 'inherit',
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
            width: 'inherit',
            display: 'none',
            overflowY: 'auto',
            backgroundColor: `${theme.palette.background.default}`,
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))',
            borderRadius: 10,
            transition: 'all 0.3s ease 0s',
            boxShadow: `0px 0px 10px 0px ${theme.palette.divider}`,
            ...(open && {
                transition: 'all 0.3s ease 0s',
                display: 'block',
                zIndex: 11
            }),
            '& ul': {
                margin: 0,
                padding: 0,
                borderRadius: 10,
                '& li': {
                    cursor: 'pointer',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '& a': {
                        padding: 15,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        textDecoration: 'none',
                        color: `${theme.palette.text.primary}`,
                        '& .icon': {
                            width: 20,
                            height: 20,
                            marginRight: 10
                        },
                        '& svg': {
                            marginRight: 10
                        }
                    },
                    '&:hover a': {
                        transition: 'all 0.3s ease 0s',
                        boxShadow: `0px 0px 8px 6px ${theme.palette.divider}`,
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
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));
