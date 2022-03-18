import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';
import { blue, grey } from '@mui/material/colors';

export const OwnerSticky = styled('div')(({ theme, active, loading }: { theme?: any, active: any, loading: any }) => {
    return ({
        position: 'sticky',
        top: 80,
        width: '100%',
        height: 70,
        display: 'flex',
        zIndex: 1,
        alignItems: 'center',
        backgroundColor: `${theme.palette.background.default}`,
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))',
        boxShadow: `0px 0px 8px 0px ${theme.palette.divider}`,
        padding: '0px 100px',
        ...(!active && {
            display: 'none'
        }),
        '& .button-group': {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            '& .item-action': {
                position: 'relative',
                display: 'flex',
                marginRight: 10,
                justifyContent: 'center',
                '& .button': {
                    cursor: 'pointer',
                    textAlign: 'center',
                    width: 120,
                    ...((loading.gift || loading.sale) && {
                        opacity: 0.5
                    }),
                    '&.Mui-disabled': {
                        color: 'white'
                    }
                },
                '& .loading': {
                    position: 'absolute',
                    top: 'calc(50% - 12px)',
                    left: 'calc(50% - 12px)'
                }
            }                
        }
    })
});

export const LargeSection = styled('div')(({ theme }: { theme: any }) => {
    return ({
        [theme.breakpoints.up('lg')]: {
            padding: '20px 100px',
        },
        [theme.breakpoints.down('md')]: {
            padding: '20px 50px',
            display: 'none'
        },
        '& .item-wrapper': {
            display: 'flex',
            flexDirection: 'row',
            '& .item-summary': {
                flex: '4 0 0%',
                maxWidth: '43%',
                width: 0,
                [theme.breakpoints.down('sm')]: {
                    width: '100%',
                    maxWidth: '100%',
                },
                '& .item-media-frame': {
                    margin: 20,
                    borderRadius: 10,
                    border: `1px solid ${theme.palette.divider}`,
                    overflow: 'hidden',
                    '& header': {
                        alignItems: 'center',
                        display: 'flex',
                        fontWeight: 500,
                        padding: 12,
                        height: 42,
                        width: '100%',
                        backgroundColor: `${theme.palette.background.default}`,
                        justifyContent: 'space-between',
                        '& .header-left': {
                            '& img': {
                                width: 25,
                                height: 25
                            },
                        },
                        '& .header-right': {
                            display: 'flex',
                            '&:hover': {
                                color: 'rgb(235, 87, 87)',
                            }
                        }
                    },
                    '& .item-media': {
                        cursor: 'pointer',
                        maxHeight: 1000,
                        width: '100%',
                        minHeight: 200,
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
                                cursor: 'zoom-in',
                                width: '100%',
                                height: 450,
                                borderRadius: 'inherit',
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                                maxHeight: '100%',
                                maxWidth: '100%',
                                overflow: 'hidden',
                                position: 'relative',
                                '& img': {
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: 400,
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    borderBottomLeftRadius: 'inherit',
                                    borderBottomRightRadius: 'inherit',
                                    borderTopRightRadius: 0,
                                    borderTopLeftRadius: 0,
                                }
                            }
                        }
                    }
                },
                '& section': {
                    margin: 20,
                    '& .item-description': {
                        padding: 5,
                        '& .link': {
                            padding: '10px 0px',
                            display: 'flex',
                            fontWeight: 700,
                            alignItems: 'center',
                            '& a': {
                                textDecoration: 'none',
                                paddingLeft: 5
                            }
                        }
                    },
                    '& .item-properties': {
                        display: 'flex',
                        flexFlow: 'wrap',
                        '& .item-property': {
                            flex: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid rgb(21, 178, 229)',
                            backgroundColor: 'rgb(219 245 253)',
                            borderRadius: 6,
                            margin: 5,
                            padding: 10,
                            textAlign: 'center',
                            '& .property-type': {
                                fontSize: 10,
                                textTransform: 'uppercase',
                                color: 'rgb(21, 178, 229)'
                            },
                            '& .property-value': {
                                fontWeight: 600,
                            },
                            '& .property-rarity': {
                                fontSize: 14,
                                color: 'rgb(0 0 0 / 45%)'
                            }
                        }
                    },
                    '& .item-details': {
                        display: 'flex',
                        flexDirection: 'column',
                        '& .item-detail': {
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: 5,
                            '& a': {
                                color: `${theme.palette.primary.default}`,
                                '&:hover': {
                                    fontWeight: 500   
                                }
                            }
                        }
                    }
                }
            },
            '& .item-main': {
                flex: '4 0 0%',
                marginLeft: -20,
                '& .item-header': {
                    margin: '20px 20px 15px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    '& .item-info': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 5,
                        maxWidth: '100%',
                        '& .item-detail': {
                            display: 'flex',
                            alignItems: 'center',
                            maxWidth: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            '& .item-link': {
                                fontSize: 20,
                                fontWeight: 600,
                                textDecoration: 'none',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }
                        },
                        '& .item-toolbar': {
                            maxWidth: 'fit-content',
                            '& .button-group': {
                                display: 'flex',
                                borderRadius: 10,
                                '& button': {
                                    border: `1px solid ${theme.palette.divider}`,
                                    borderRight: 'none',
                                    padding: 10,
                                    '&:hover': {
                                        boxShadow: `0px 0px 8px 0px ${theme.palette.divider}`,
                                        transition: 'all 0.2s ease 0s',
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
                        }
                    }
                },
                '& .item-count': {
                    margin: 20,
                    display: 'flex',
                    alignItems: 'center',
                    '& .link': {
                        padding: '10px 0px',
                        display: 'flex',
                        fontWeight: 700,
                        alignItems: 'center',
                        marginRight: 20,
                        '& a': {
                            textDecoration: 'none',
                            paddingLeft: 5
                        }
                    },
                    '& .favorite-by': {
                        display: 'flex',
                        '& .icon': {
                            marginRight: 10,
                        },
                        '& .count': {

                        }
                    }
                },
                '& .item-frame': {
                    margin: 20,
                    '& .section': {
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 10,
                        overFlow: 'hidden',
                        '& .tradeStation-main': {
                            padding: 20,
                            '& .tradeStation-price-container': {
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                marginBottom: 20,
                                marginTop: 20,
                                '& .price': {
                                    fontSize: 40,
                                    alignItems: 'center',
                                    display: 'flex',
                                    fontWeight: 600,
                                    width: '100%',
                                    maxWidth: '100%',
                                    marginRight: 10,
                                    '& .price-amount': {
                                        marginLeft: 15,
                                        fontWeight: 600,
                                        fontSize: 40
                                    },
                                    '& .flat-price': {
                                        marginLeft: 10,
                                        fontSize: 20,
                                        color: 'grey'
                                    },
                                    '& .status': {
                                        flex:1,
                                        textAlign: 'right',
                                        fontSize: 25,
                                        fontWeight: 400
                                    },
                                    '& .not-price': {
                                        fontSize: 20,
                                        color: `${theme.palette.divider}`
                                    }
                                }
                            },
                            '& .tradeStation-detail': {
                                margin: 10,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                marginTop: 20,
                                '& .gift-address': {
                                    cursor: 'pointer',
                                    marginLeft: 30
                                }
                            },
                            '& .item-action': {
                                display: 'flex',
                                marginTop: 30,
                                '& button': {
                                    width: 120,
                                    marginRight: 10
                                }
                            }
                        }
                    }
                },
                '& .item-history': {
                    margin: 20,
                    '& .history-graph': {
                    }
                },
                '& .item-listing': {
                    margin: 20,
                    '& .panel-body': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }
                },
                '& .item-orders': {
                    margin: 20,
                    '& .panel-body': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }
                }
            }
        },
        '& .item-trading-history': {
            margin: '20px 20px 15px',
            '& .history-filter': {
                width: '100%',
                padding: 10,
            },
            '& .filter-pills': {
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                margin: '0px',
                padding: '0px 10px 10px 10px',
                '& .filter-pill': {
                    marginRight: 5,
                    '& .pill': {
                        alignItems: 'center',
                        cursor: 'pointer',
                        display: 'flex',
                        minHeight: 35,
                        padding: '10px 15px',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        backgroundColor: 'rgba(21, 178, 229, 0.06)',
                        borderColor: 'rgb(21, 178, 229)',
                        borderRadius: 10,
                        border: '1px solid rgb(229, 232, 235)',
                        overflow: 'hidden',
                        '& .pill-delete': {
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                            display: 'flex',
                            fontSize: 20,
                            marginLeft: 8,
                            color: 'rgb(112, 122, 131)',
                            border: 0,
                            padding: 0,
                            background: 'inherit',
                        }
                    },
                    '&:last-of-type': {
                        marginRight: 0
                    }
                },
                '& .clear-all': {
                    display: 'flex',
                    color: 'rgb(32, 129, 226)',
                    cursor: 'pointer',
                    opacity: 0.9
                }
            },
            '& .history-table': {
                width: '100%',
                borderTop: `1px solid ${theme.palette.divider}`,
            }
        }
    })
});

export const SmallSection = styled('div')(({ theme }: { theme: any }) => {
    return ({
        display: 'none',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
            padding: '10px 50px',
            display: 'flex',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '5px 10px',
            display: 'flex',
        },
        '& .item-wrapper': {
            '& .item-header': {
                margin: '20px 20px 15px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                '& .item-info': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 5,
                    maxWidth: '100%',
                    '& .item-detail': {
                        display: 'flex',
                        alignItems: 'center',
                        maxWidth: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        '& .item-link': {
                            fontSize: 20,
                            fontWeight: 600,
                            textDecoration: 'none',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        },
                    },
                    '& .item-toolbar': {
                        maxWidth: 'fit-content',
                        '& .button-group': {
                            borderRadius: 10,
                            '& button': {
                                border: `1px solid ${theme.palette.divider}`,
                                borderRight: 'none',
                                padding: 10,
                                '&:hover': {
                                    boxShadow: `0px 0px 8px 0px ${theme.palette.divider}`,
                                    transition: 'all 0.2s ease 0s',
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
                    [theme.breakpoints.down('sm')]: {
                        flexDirection: 'column'
                    },
                }
            },
            '& .item-media-frame': {
                margin: 20,
                borderRadius: 10,
                border: `1px solid ${theme.palette.divider}`,
                overflow: 'hidden',
                '& header': {
                    alignItems: 'center',
                    display: 'flex',
                    fontWeight: 500,
                    padding: 12,
                    height: 42,
                    width: '100%',
                    backgroundColor: `${theme.palette.background.default}`,
                    justifyContent: 'space-between',
                    '& .header-left': {
                        '& img': {
                            width: 25,
                            height: 25
                        },
                    },
                    '& .header-right': {
                        display: 'flex',
                        '&:hover': {
                            color: 'rgb(235, 87, 87)',
                        }
                    }
                },
                '& .item-media': {
                    cursor: 'pointer',
                    maxHeight: 1000,
                    width: '100%',
                    minHeight: 200,
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
                            cursor: 'zoom-in',
                            width: '100%',
                            height: 450,
                            borderRadius: 'inherit',
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            maxHeight: '100%',
                            maxWidth: '100%',
                            overflow: 'hidden',
                            position: 'relative',
                            '& img': {
                                objectFit: 'cover',
                                width: '100%',
                                height: 400,
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderBottomLeftRadius: 'inherit',
                                borderBottomRightRadius: 'inherit',
                                borderTopRightRadius: 0,
                                borderTopLeftRadius: 0,
                            }
                        }
                    }
                },
            },
            '& .item-count': {
                margin: '5px 20px',
                display: 'flex',
                alignItems: 'center',
                '& .link': {
                    padding: '10px 0px',
                    display: 'flex',
                    fontWeight: 700,
                    alignItems: 'center',
                    marginRight: 20,
                    '& a': {
                        textDecoration: 'none',
                        paddingLeft: 5
                    }
                },
                '& .favorite-by': {
                    display: 'flex',
                    '& .icon': {
                        marginRight: 10,
                    },
                    '& .count': {

                    }
                }
            },
            '& .item-frame': {
                margin: '5px 20px',
                '& .section': {
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 10,
                    overFlow: 'hidden',
                    '& .tradeStation-main': {
                        padding: 20,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        '& .tradeStation-price-container': {
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            marginBottom: 20,
                            marginTop: 20,
                            '& .price': {
                                fontSize: 40,
                                alignItems: 'center',
                                display: 'flex',
                                fontWeight: 600,
                                width: 'fit-content',
                                maxWidth: '100%',
                                marginRight: 10,
                                '& .price-amount': {
                                    marginLeft: 15,
                                    fontWeight: 600,
                                    fontSize: 40
                                },
                                '& .flat-price': {
                                    marginLeft: 10,
                                    fontSize: 20,
                                    color: 'grey'
                                },
                                '& .status': {
                                    flex:1,
                                    textAlign: 'right',
                                    fontSize: 25,
                                    fontWeight: 400
                                },
                                '& .not-price': {
                                    fontSize: 20,
                                    color: `${theme.palette.divider}`
                                }
                            }
                        },
                        '& .tradeStation-detail': {
                            margin: 10,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            marginTop: 20,
                            '& .gift-address': {
                                cursor: 'pointer'
                            }
                        },
                        '& .item-action': {
                            display: 'flex',
                            marginTop: 30,
                            '& button': {
                                width: 120,
                                marginRight: 10
                            }
                        }
                    }
                }
            },
            '& .item-history': {
                margin: '5px 20px',
                '& .history-graph': {
                }
            },
            '& .item-listing': {
                margin: '5px 20px',
                '& .panel-body': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            },
            '& .item-orders': {
                margin: '5px 20px',
                '& .panel-body': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            },
            '& .item-trading-history': {
                margin: '5px 20px',
                '& .history-filter': {
                    width: '100%',
                    padding: 10,
                },
                '& .filter-pills': {
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: '0px',
                    padding: '0px 10px 10px 10px',
                    '& .filter-pill': {
                        margin: 5,
                        '& .pill': {
                            alignItems: 'center',
                            cursor: 'pointer',
                            display: 'flex',
                            minHeight: 35,
                            padding: '10px 15px',
                            borderWidth: 1,
                            borderStyle: 'solid',
                            backgroundColor: 'rgba(21, 178, 229, 0.06)',
                            borderColor: 'rgb(21, 178, 229)',
                            borderRadius: 10,
                            border: '1px solid rgb(229, 232, 235)',
                            overflow: 'hidden',
                            '& .pill-delete': {
                                alignItems: 'center',
                                backgroundColor: 'transparent',
                                display: 'flex',
                                fontSize: 20,
                                marginLeft: 8,
                                color: 'rgb(112, 122, 131)',
                                border: 0,
                                padding: 0,
                                background: 'inherit',
                            }
                        },
                    },
                    '& .clear-all': {
                        display: 'flex',
                        color: 'rgb(32, 129, 226)',
                        cursor: 'pointer',
                        opacity: 0.9
                    }
                },
                '& .history-table': {
                    width: '100%',
                    borderTop: `1px solid ${theme.palette.divider}`,
                }
            }
        },
    })
});
export const Accordion = styled(MuiAccordion)(({ theme }: { theme: any }) => ({
    border: `1px solid ${theme.palette.divider}`,
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))',
    '&:first-of-type': {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    '&:last-of-type': {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

export const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => ({
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
    '& .MuiTypography-root': {
        fontWeight: 600,
        fontSize: 18,
    },
    '& .content': {
        flexGrow: 0,
        margin: "auto",
        "&$expanded": {
            flexGrow: 0,
            margin: "auto",
        },
        "&:last-child": {
            marginLeft: "auto"
        }
    },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
}));

export const DropdownMenu = styled('div')(({ theme, open, width, disabled }: { theme?: any, open: any, width?: any, disabled?: any }) => ({
    width: 120,
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
        minHeigth: 48,
        borderRadius: 10,
        width: '100%',
        border: `1px solid ${theme.palette.divider}`,
        ...(open && {
            boxShadow: '0px 0px 7px 1px rgb(0 0 0 / 20%)',
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

export const DropdownSelectMenu = styled('div')(({ theme, open }: { theme?: any, open: any }) => {
    return ({
        cursor: 'pointer',
        height: 48,
        outline: 'none',
        userSelect: 'none',
        '& .menu-container': {
            position: 'relative',
            borderRadius: 10,
            border: `1px solid ${theme.palette.divider}`,
            overflow: 'hidden',
            ...(open && {
                zIndex: 2,
                boxShadow: `0px 0px 10px 0px ${theme.palette.divider}`,
            }),
            '& .menu-header': {
                alignItems: 'center',
                display: 'flex',
                height: 48,
                justifyContent: 'space-between',
                padding: ' 0px 12px',
                ...(open && {
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }),
            },
            '& .menu-items': {
                color: 'rgb(4, 17, 29)',
                maxHeight: 0,
                margin: 0,
                padding: 0,
                overflowY: 'auto',
                position: 'relative',
                ...(open && {
                    zIndex: 9,
                    maxHeight: 'fit-content',
                }),
                '& .item': {
                    backgroundColor: `${theme.palette.background.default}`,
                    alignItems: 'center',
                    borderTop: `1px solid ${theme.palette.divider}`,
                    display: 'flex',
                    height: 48,
                    padding: '0px 12px',
                    '&:first-of-type': {
                        borderTop: 'none'
                    },
                    '& .option': {
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '100%',
                    }
                }
            },
            '& .back': {
                ...(open && {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                })
            }
        }
    })
})
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
            '&:focus': {
                border: 'none',
                boxShadow: 'none'
            }
        }
    })
});

export const SwitchButton = styled('span')(
    ({ theme }) => `
    font-size: 0;
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    margin: 10px;
    cursor: pointer;
  
    &.${switchUnstyledClasses.disabled} {
      opacity: 0.4;
      cursor: not-allowed;
    }
  
    & .${switchUnstyledClasses.track} {
      background: ${theme.palette.mode === 'dark' ? grey[600] : grey[400]};
      border-radius: 10px;
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
    }
  
    & .${switchUnstyledClasses.thumb} {
      display: block;
      width: 14px;
      height: 14px;
      top: 3px;
      left: 3px;
      border-radius: 16px;
      background-color: #fff;
      position: relative;
      transition: all 200ms ease;
    }
  
    &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
      background-color: ${grey[500]};
      box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
    }
  
    &.${switchUnstyledClasses.checked} {
      .${switchUnstyledClasses.thumb} {
        left: 22px;
        top: 3px;
        background-color: #fff;
      }
  
      .${switchUnstyledClasses.track} {
        background: ${blue[500]};
      }
    }
  
    & .${switchUnstyledClasses.input} {
      cursor: inherit;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: 1;
      margin: 0;
    }
    `,
);
