import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';
import { blue, grey, red } from '@mui/material/colors';

export const LargeSection = styled('div')(({ theme, loading }: { theme?: any, loading: any }) => {
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
                marginRight: 20,
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
                '& .item-action': {
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    '& .button': {
                        cursor: 'pointer',
                        textAlign: 'center',
                        ...(loading && {
                            opacity: 0.5
                        })
                    },
                    '& .loading': {
                        position: 'absolute',
                        top: 'calc(50% - 12px)',
                        left: 'calc(50% - 12px)'
                    }
                }
            },
            '& .item-main': {
                flex: '4 0 0%',
                marginLeft: 20,
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
                    '& .tradeStation-main': {
                        '& .price-container': {
                            marginBottom: 20,
                            marginTop: 20,
                            borderRadius: 10,
                            padding: 20,
                            overFlow: 'hidden',
                            border: `1px solid ${theme.palette.divider}`,
                            '& .price': {
                                fontSize: 25,
                                padding: '20px 0px',
                                alignItems: 'center',
                                display: 'flex',
                                fontWeight: 600,
                                width: 'fit-content',
                                maxWidth: '100%',
                                marginRight: 10,
                                '& .price-amount': {
                                    margin: '0px 15px',
                                    fontWeight: 600,
                                    fontSize: 40
                                },
                                '& .not-price': {
                                    fontSize: 20,
                                    color: `${theme.palette.divider}`
                                }
                            }
                        },
                        '& .edit-container': {
                            marginBottom: 20,
                            marginTop: 20,
                            borderRadius: 10,
                            padding: 20,
                            overFlow: 'hidden',
                            border: `1px solid ${theme.palette.divider}`,
                            '& .tradeStation-sale': {
                                marginTop: 20,
                                '& .sub': {
                                    margin: 5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                },
                                '& .sub-content': {
                                    margin: 5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    '& .input-text': {
                                        flex:1,
                                        marginRight: 5
                                    },
                                }
                            },
                            '& .tradeStation-royalty': {
                                marginTop: 20,
                                '& .sub': {
                                    margin: 5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                },
                                '& .sub-content': {
                                    margin: 5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    '& .input-text': {
                                        flex:1
                                    }
                                }
                            },
                            '& .tradeStation-gift': {
                                marginTop: 20,
                                '& .sub': {
                                    margin: 5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                },
                                '& .sub-detail': {
                                    margin: 5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: 20,
                                    '& .gift-address': {
                                        cursor: 'pointer'
                                    }
                                }
                            },
                            '& .tradeStation-detail': {
                                margin: 5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                marginTop: 20,
                                '& .gift-address': {
                                    cursor: 'pointer',
                                    marginLeft: 30
                                }
                            },
                        },
                    }
                },
            }
        },
    })
});

export const SmallSection = styled('div')(({ theme, loading }: { theme?: any, loading: any }) => {
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
                flexDirection: 'column',
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
                '& .tradeStation-main': {
                    '& .price-container': {
                        marginBottom: 20,
                        marginTop: 20,
                        borderRadius: 10,
                        padding: 20,
                        overFlow: 'hidden',
                        border: `1px solid ${theme.palette.divider}`,
                        '& .price': {
                            fontSize: 25,
                            padding: '20px 0px',
                            alignItems: 'center',
                            display: 'flex',
                            fontWeight: 600,
                            width: 'fit-content',
                            maxWidth: '100%',
                            marginRight: 10,
                            '& .price-amount': {
                                margin: '0px 15px',
                                fontWeight: 600,
                                fontSize: 40
                            },
                            '& .not-price': {
                                fontSize: 20,
                                color: `${theme.palette.divider}`
                            }
                        }
                    },
                    '& .edit-container': {
                        marginBottom: 20,
                        marginTop: 20,
                        borderRadius: 10,
                        padding: 20,
                        overFlow: 'hidden',
                        border: `1px solid ${theme.palette.divider}`,
                        '& .tradeStation-sale': {
                            marginTop: 20,
                            '& .sub': {
                                margin: 5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            },
                            '& .sub-content': {
                                margin: 5,
                                display: 'flex',
                                alignItems: 'center'
                            }
                        },
                        '& .tradeStation-gift': {
                            marginTop: 20,
                            '& .sub': {
                                margin: 5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            },
                            '& .sub-detail': {
                                margin: 5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 20,
                                '& .gift-address': {
                                    cursor: 'pointer'
                                }
                            }
                        },
                        '& .tradeStation-detail': {
                            margin: 5,
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
                            margin: 10,
                            marginTop: 30,
                            paddingTop: 20,
                            position: 'relative',
                            display: 'flex',
                            borderTop: `1px solid ${theme.palette.divider}`,
                            justifyContent: 'center',
                            '& .button': {
                                cursor: 'pointer',
                                textAlign: 'center',
                                ...(loading && {
                                    opacity: 0.5
                                })
                            },
                            '& .loading': {
                                position: 'absolute',
                                top: 'calc(50% - 12px)',
                                left: 'calc(50% - 12px)'
                            }
                        }
                    },
                }
            },
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
