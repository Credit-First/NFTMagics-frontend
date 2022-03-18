import { styled } from '@mui/material/styles';

export const Section = styled('div')(({ theme, loading } : {theme?:any, loading: any}) => {
    return ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        '& .collection-panel': {
            width: '80%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: 40,
            '& .left-panel': {
                flex: 1 / 2,
                padding: 20
            },
            '& .right-panel': {
                flex: 1 / 2,
                padding: 20,
                '& .collection-name': {
                    maring: 10,
                    paddingBottom: 15,
                    '& .input-text': {
                        margin: 0
                    },
                    '& .sub': {
                        width: '100%',
                        paddingBottom: 10,
                    }
                },
                '& .collection-description': {
                    maring: 10,
                    paddingBottom: 15,
                    paddingTop: 15,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '& .sub': {
                        paddingBottom: 10,
                    },
                    '& textarea': {
                        backgroundColor: 'inherit',
                    }
                },
                '& .collection-action': {
                    maring: 10,
                    paddingBottom: 15,
                    paddingTop: 30,
                    width: '100%',
                    position: 'relative',
                    '& .button': {
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'center',
                        ...(loading && {
                            opacity: 0.5
                        })
                    },
                    '& .loading': {
                        position: 'absolute',
                        top: 'calc(50% - 5px)',
                        left: 'calc(50% - 5px)'
                    }
                },
            }
        }
    })
})
export const CollectionHeader = styled('div')(({ theme, readmore }: { theme?: any, readmore: any }) => {
    return ({
        position: 'relative',
        width: '100%',
        '& .collection-banner': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            top: 0,
            left: 0,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            position: 'relative',
            flex: 1,
            border: '2px dashed rgb(204, 204, 204)',
            padding: 5,
            height: 250,
            '& .image-content': {
                width: '100%',
                height: '100%',
                position: 'relative',
                padding: 5,
                '& .image-input': {
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    height: '100%',
                    fontSize: '1.5rem',
                    fontWeight: 500,
                    color: 'rgb(204, 204, 204)',
                    '& .upload-img': {
                        fontSize: 50,
                        '& path:hover': {
                            boxShadow: '0px 0px 7px 1px rgb(0 0 0 / 20%)',
                        }
                    }
                },
                '& .image-clear': {
                    display: 'none',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 1,
                    color: 'rgb(204, 204, 204)'
                },
                '& .image-preview': {
                    display: 'none',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    borderRadius: 10,
                },
            }
        },
        '& .collection-info': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
            '& .collection-logo': {
                width: 100,
                height: 100,
                borderRadius: '50%',
                maxHeight: '100%',
                maxWidth: '100%',
                overflow: 'hidden',
                position: 'relative',
                marginTop: '-50px',
                display: 'flex',
                border: '2px dashed rgb(204, 204, 204)',
                padding: 1,
                background: `${theme.palette.background.default}`,
                '& .image-content': {
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    borderRadius: '50%',
                    '& .image-input': {
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        height: '100%',
                        fontSize: '1.5rem',
                        fontWeight: 500,
                        color: 'rgb(204, 204, 204)',
                        '& .upload-img': {
                            fontSize: 30,
                            '& path:hover': {
                                boxShadow: '0px 0px 7px 1px rgb(0 0 0 / 20%)',
                            }
                        }
                    },
                    '& .image-clear': {
                        display: 'none',
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        zIndex: 1,
                        color: 'rgb(204, 204, 204)'
                    },
                    '& .image-preview': {
                        display: 'none',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        borderRadius: '50%',
                        top: 0,
                        left: 0,
                    },
                }
            },
            '& .collection-name': {
                fontSize: 30,
                fontWeight: 500,
                marginTop: 20,
                marginBottom: 20,
                minHeight: 30,
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

export const DropdownMenu = styled('div')(({ theme, open, width }: { theme?: any, open: any, width?: any }) => ({
    width: 200,
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
export const Input = styled('div')(({ theme, disabled }: { theme?: any, disabled: boolean }) => {
    return ({
        borderRadius: 10,
        border: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        position: 'relative',
        outline: 'none',
        margin: 5,
        '&:focus-within': {
            borderColor: 'transparent',
            boxShadow: '0px 0px 7px 1px rgb(0 0 0 / 20%)',
            ...(disabled && {
                borderColor: `${theme.palette.divider}`,
                boxShadow: 'none'
            }),
        },
        ...(disabled && {
            opacity: 0.5,
            color: `${theme.palette.divider}`,
            boxShadow: 'none'
        }),
        '& .input-prefix': {
            alignItems: 'center',
            backgroundColor: 'transparent',
            display: 'flex',
            paddingLeft: 12,
        },
        '& input': {
            backgroundColor: 'transparent',
            border: 'none',
            flex: '1 0 0%',
            height: 48,
            outline: 'none',
            padding: '0px 12px 0px 0px',
            minWidth: 0,
            width: '100%',
            '&:focus': {
                border: 'none',
                boxShadow: 'none'
            }
        }
    })
});
export const TextArea = styled('textarea')(({ theme }: { theme?: any }) => {
    return ({
        height: 200,
        outline: 'none',
        width: '100%',
        padding: 12,
        resize: 'vertical',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 10,
        '&:focus': {
            boxShadow: '0px 0px 7px 1px rgb(0 0 0 / 20%)',
            outline: 'none',
            border: 'none'
        }
    })
});

export const CardDiv = styled('div')(({ theme }: { theme?: any }) => {

    return ({
        '& .card-image-card': {
            position: 'relative',
            display: 'flex',
            width: 350,
            textAlign: "center",
            margin: '10px 20px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            maxWidth: '550px',
            transition: 'all 0.3s',
            border: '1px solid rgba(0, 0, 0, 0.15)',
            boxSizing: 'content-box',
            boxShadow: 'rgb(0 0 0 / 5%) 0px 0px 10px 0px',
            '& .card-edit': {
                zIndex: 1,
                position: 'absolute',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                top: 10,
                right: 10,
                width: 40,
                height: 40,
                borderRadius: 5,
                background: '#ffffffa1',
                boxShadow: '0px 0px 5px 0px grey'
            },
            '& .card-image-card-link': {
                borderRadius: 15,
                color: 'rgb(32, 129, 226)',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                '& .card-image-card-link-meida': {
                    height: 200,
                    borderBottom: '1px solid background.default',
                    minHeight: 'inherit',
                    borderRadius: 'inherit',
                    '& .image-content': {
                        position: 'relative',
                        padding: 5,
                        height: '100%',
                        width: 350,
                        '& .image-input': {
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            height: '100%',
                            fontSize: '1.5rem',
                            fontWeight: 500,
                            color: 'rgb(204, 204, 204)',
                            '& .upload-img': {
                                fontSize: 50,
                                '& path:hover': {
                                    boxShadow: '0px 0px 7px 1px rgb(0 0 0 / 20%)',
                                }
                            }
                        },
                        '& .image-clear': {
                            display: 'none',
                            position: 'absolute',
                            top: 0,
                            left: 20,
                            zIndex: 1,
                            color: 'rgb(204, 204, 204)'
                        },
                        '& .image-preview': {
                            display: 'none',
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        },
                    }
                }
            },
            '& .logo': {
                position: 'relative',
                width: 60,
                height: 60,
                border: `2px solid white`,
                borderRadius: '50%',
                marginTop: '-30px',
                boxShadow: `#e7e7e7 0px 0px 5px 0px`,
                '& img': {
                    borderRadius: '50%',
                    width: '100%',
                    height: '100%',
                }
            },
            '& .card-image-text-area': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: `${theme.palette.text.primary}`,
                padding: 10,
                width: '100%',
                height: 150,
                marginBottom: 30,
                '& .name': {
                    fontWeight: 500,
                    fontSize: 20,
                    display: '-webkit-box',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'break-spaces',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    width: '80%'
                },
                '& .owner': {
                    padding: 10,
                    fontSize: 13,
                    color: `${theme.palette.text.primary}`,
                    opacity: 0.7,
                },
                '& .description': {
                    fontWeight: 400,
                    fontSize: 15,
                    display: '-webkit-box',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'break-spaces',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    width: '80%'
                }
            },
            '&:hover': {
                cursor: 'pointer',
                transform: 'translateY(-4px)',
                boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 10px 0px',
                '& .card-edit': {
                    display: 'flex',
                }
            }
        }
    })
})