import { styled, Theme, CSSObject, alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = 350;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(7)} + 1px)`,
    },
});

interface DrawerProps {
    theme?: any,
    open?: boolean
}

export const Drawer = styled('div')(({ theme, open }: DrawerProps) => {
    return ({
        position: 'sticky',
        top: 80,
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        heigth: '100%',
        '& .drawer-header': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: theme.spacing(0, 1),
            marginBottom: '10px',
            transition: 'all 0.2s ease 0s',
            '&:hover': {
                boxShadow: '0px 0px 8px 0px grey',
            },
            ...theme.mixins.toolbar,
            ...(open && {
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            }),
            ...(!open && {
                '& .filter-header': {
                    transition: 'all 0.2s ease 0s',
                    display: 'none'
                },
            }),
        },
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
            '& .drawer-content': {
                '& .navbar-list': {
                    width: '100%',
                    '& .navbar-list-button': {
                        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                    },
                    '& .navbar-list-content': {
                        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                        '& .filter-panel': {
                            display: 'flex',
                            flexFlow: 'wrap',
                            padding: 20,
                            '& .filter-panel-item': {
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                border: '1px solid rgba(0, 0, 0, 0.12)',
                                borderRadius: 10,
                                display: 'flex',
                                height: 40,
                                margin: 4,
                                padding: 10,
                                width: 'calc(50% - 8px)',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease 0s',
                                '&:hover': {
                                    boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 8px 0px',
                                    transition: 'all 0.2s ease 0s',
                                },
                                '&.isSelected': {
                                    color: 'white',
                                    backgroundColor: `${theme.palette.primary.main}`
                                }
                            }
                        }
                    }
                }
            }
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
            '& .drawer-content': {
                visibility: 'hidden'
            }
        }),
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    })
})

export const Section = styled('div')(({ theme }: DrawerProps) => {
    return ({
        '& .collection-wraper': {
            display: 'flex',
            paddingTop: 20,
            '& .collection-body': {
                display: 'flex',
                width: '100%',
                borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                [theme.breakpoints.down('sm')]: {
                    flexDirection: 'column'
                },
                '& .sticky': {
                    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
                }
            },
        }
    })
})
export const CollectionHeader = styled('div')(({ theme, readmore }: { theme?: any, readmore: any }) => {
    return ({
        position: 'relative',
        '& .collection-banner': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: 250,
            top: 0,
            left: 0,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            position: 'relative',
            '& .collection-text': {
                fontSize: '4rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                textShadow: '2px 2px white'
            },
            '& img': {
                width: '100%',
                height: '100%',
                maxWidth: '100%',
                maxHeight: '100%',
            }
        },
        '& .collection-info': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
            '& .collection-logo': {
                borderRadius: '100%',
                width: 100,
                height: 100,
                border: `2px solid white`,
                boxShadow: 'rgb(26 26 26) 0px 0px 3px 0px',
                maxHeight: '100%',
                maxWidth: '100%',
                overflow: 'hidden',
                position: 'relative',
                marginTop: '-50px',
                '& img': {
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    borderTopLeftRadius: 'inherit',
                    borderTopRightRadius: 'inherit',
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                }
            },
            '& .collection-title': {
                fontSize: 30,
                fontWeight: 500,
                marginTop: 20,
                marginBottom: 20,
            },
            '& .collection-owner': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'grey',
                '& .address': {
                    marginLeft: 10
                }
            },
            '& .collection-toolbar': {
                marginTop: 20,
                '& .button-group': {
                    borderRadius: 10,
                    display: 'flex',
                    '& button': {
                        border: `1px solid ${theme.palette.divider}`,
                        borderRight: 'none',
                        padding: 10,
                        fontSize: 12,
                        width: 100,
                        height: 80,
                        color: 'grey',
                        '&:hover': {
                            boxShadow: `0px 0px 8px 0px ${theme.palette.divider}`,
                            transition: 'all 0.2s ease 0s',
                        },
                        '& .value': {
                            fontWeight: 600,
                            fontSize: 20,
                            color: `${theme.palette.text.primary}`,
                            marginBottom: 5
                        }
                    },
                    '& button:first-of-type': {
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10
                    },
                    '& button:last-of-type': {
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        borderRight: `1px solid ${theme.palette.divider}`,
                    }
                }
            },
            '& .collection-description': {
                wordBreak: 'break-word',
                textAlign: 'center',
                padding: 20,
                overflow: 'hidden',
                transition: 'all 1s ease 0s',
                maxWidth: 800,
                ...(!readmore && {
                    WebkitMask: 'linear-gradient(rgb(255, 255, 255) 45%, transparent)',
                    maxHeight: 100,
                }),
            },
            '& .collection-description-more': {
                display: 'flex',
                maxWidth: 400,
                width: '100%',
                transition: 'all 1s ease 0s',
                '& .read-more': {
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    transition: 'all 1s ease 0s',
                    fontSize: '100%',
                    border: 0,
                    padding: 0,
                    background: 'inherit',
                }
            }
        },
    })
})
export const Main = styled('div')(({ theme, open }: DrawerProps) => {

    return ({
        padding: 15,
        width: '100%',
        '& .assets-search-view-header': {
            display: 'flex',
            [theme.breakpoints.down('md')]: {
                flexDirection: 'column'
            },
            '& .assets-search-view-container': {
                flex: 1,
                position: 'relative',
                borderRadius: 5,
                backgroundColor: 'rgb(255 255 255 / 2%)',
                marginRight: 5,
                [theme.breakpoints.down('md')]: {
                    width: '100%',
                },
                '& .search-icon-wrapper': {
                    padding: theme.spacing(0, 2),
                    height: '100%',
                    position: 'absolute',
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                '& input': {
                    outline: 'none',
                    color: 'inherit',
                    backgroundColor: 'inherit',
                    padding: '11px',
                    height: 48,
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    borderRadius: 5,
                    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                    transition: theme.transitions.create('width'),
                    width: '100%',
                    '&:focus-visible': {
                        boxShadow: '0px 0px 7px 1px rgba(0, 0, 0, 0.12)'
                    }
                }
            },
            '& .assets-search-view-dropdowns': {
                display: 'flex',
                marginRight: 5,
                [theme.breakpoints.down('md')]: {
                    marginTop: 5,
                    width: '100%',
                    flexDirection: 'column'
                },
            }
        },
        '& .no-items': {
            fontSize: 25,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 50
        }
    })
})

export const DropdownMenu = styled('div')(({ theme, open, width }: { theme?: any, open: any, width?: any }) => ({
    ...(width && {
        width: width
    }),
    overflowY: 'auto',
    ...(open && {
        zIndex: 10,
    }),
    [theme.breakpoints.down('md')]: {
        marginTop: 5,
        marginBottom: 5,
        width: '100%',
    },
    marginRight: 5,
    '& .dropdownBtn': {
        display: 'flex',
        justifyContent: 'space-between',
        cursor: 'pointer',
        position: 'relative',
        padding: 10,
        borderRadius: 5,
        height: 48,
        border: `1px solid ${theme.palette.divider}`,
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
            width: '100vw',
            height: '100vh',
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
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
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
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                '& li': {
                    cursor: 'pointer',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '& a': {
                        padding: 15,
                        display: 'flex',
                        textDecoration: 'none',
                        color: `${theme.palette.text.primary}`,
                        '& .menu-image': {
                            height: 24,
                            width: 24,
                            marginRight: 8,
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            maxHeight: '100%',
                            maxWidth: '100%',
                            overflow: 'hidden',
                            position: 'relative',
                            borderRadius: 10,
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