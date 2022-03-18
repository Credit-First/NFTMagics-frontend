import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { useMediaQuery } from '@mui/material';
import { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';
import { blue, grey } from '@mui/material/colors';

export const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

export const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
        color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
        ...(ownerState.active && {
            color: '#784af4',
        }),
        '& .QontoStepIcon-completedIcon': {
            color: '#784af4',
            zIndex: 1,
            fontSize: 18,
        },
        '& .QontoStepIcon-circle': {
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor',
        },
    }),
);

export const Section = styled('div')(({ theme }) => {

    return ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& .section-container': {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            '& .form-container': {
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                marginBottom: 50,
                [theme.breakpoints.up('md')]: {
                    width: '80%',
                },
            },
        }
    })
});
export const UploadSection = styled('div')(({ theme }) => {

    return ({
        margin: '30px 50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        '& .upload-content': {
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '80%'
            },
            minHeight: 450,
            '& .upload-ipfs': {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                '& .title': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 35,
                    fontWeight: 700,
                    marginBottom: 30
                },
                '& .upload-progress': {
                    paddingTop: 25,
                    paddingBottom: 25,
                },
                '& .summary': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '0px 100px'
                }
            },
            '& .upload-image': {
                display: 'flex',
                flexDirection: 'column',
                '& .file-supported': {
                    textAign: 'center',
                    margin: 20,
                    // color: `${theme.palette.divider}`,
                },
                '& .upload-dropzone': {
                    flex: 1,
                    borderRadius: 10,
                    border: '3px dashed rgb(204, 204, 204)',
                    padding: 5,
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
                                fontSize: 80,
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
                '& .image-hastag': {
                    maring: 10,
                    paddingBottom: 15,
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: 10,
                    position: 'relative',
                    '& .sub': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    },
                    '& .hastag': {
                    }
                },
            },
        },
        '& .upload-action': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
            '& button': {
                width: 200,
            }
        },
    })
});

export const MintSection = styled('div')(({ theme, loading } : {theme?: any, loading:any}) => {

    const sm = useMediaQuery('(max-width:600px)');
    const md = useMediaQuery('(max-width:900px)');

    return ({
        display: 'flex',
        margin: 10,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        },
        '& .item-preview': {
            width: '50%',
            padding: 30,
            [theme.breakpoints.down('sm')]: {
                flex: 1
            },
        },
        '& .item-descriptioin': {
            width: '50%',
            padding: 30,
            [theme.breakpoints.down('sm')]: {
                flex: 1
            },
            '& .description-header': {
                fontSize: 30,
                fontWeight: 600,
                textAlign: 'center'
            },
            '& .description-summary': {
                paddingTop: 40,
                paddingBottom: 40,
            },
            '& .description-info': {
                '& .description-title': {
                    maring: 10,
                    paddingBottom: 15,
                    '& .input-text': {
                        margin: 0
                    },
                    '& .title': {
                        width: '100%'
                    }
                },
                '& .description-detail': {
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
                '& .description-amount': {
                    maring: 10,
                    paddingBottom: 15,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: 15,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '& .sub': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        '& .sub-title': {
                            marginBottom: 5,
                            marginRight: 5,
                            display: 'flex',
                            justifyContent: 'flex-start'
                        },
                        '& .sub-content': {
                            marginBottom: 5,
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }
                    }
                },
                '& .description-collection': {
                    maring: 10,
                    paddingBottom: 15,
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: 15,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '& .sub': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    },
                    '& .sub-content': {
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: 10,
                        '& .input-text': {
                            flex: 1
                        }
                    }
                },
                '& .description-total-price': {
                    maring: 10,
                    paddingBottom: 15,
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: 15,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '& .sub-title': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    },
                    '& .price': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10,
                        padding: 10,
                        fontSize: 30,
                        fontWeight: 600
                    }
                },
                '& .description-action': {
                    maring: 10,
                    paddingBottom: 15,
                    paddingTop: 30,
                    width: '100%',
                    position: 'relative',
                    '& .button': {
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'center',
                        fontSize: 25,
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
            }
        },
    })
})

export const ListSection = styled('div')(({ theme }) => {

    return ({
        display: 'flex',
        margin: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& .description-header': {
            fontSize: 30,
            fontWeight: 600,
            textAlign: 'center',
        },
        '& .description-summary': {
            paddingTop: 40,
            paddingBottom: 40,
        },
        '& .description-action': {
            '& .view': {
                cursor: 'pointer'
            }
        }
    })
})

export const CardDiv = styled('div')(({ theme }: { theme: any }) => {

    const sm = useMediaQuery('(max-width:600px)');
    const md = useMediaQuery('(max-width:900px)');
    const lg = useMediaQuery('(max-width:1200px)');

    return ({
        '& .image-card': {
            display: 'flex',
            textAlign: "center",
            marginRight: 20,
            flexDirection: 'column',
            borderRadius: 10,
            zIndex: 2,
            maxWidth: '550px',
            transition: 'all 0.3s',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            ...((sm || md) && {
                maxWidth: '355px',
            }),
            '& .image-card-link': {
                borderRadius: 10,
                color: 'rgb(32, 129, 226)',
                textDecoration: 'none',
                '& .image-card-link-meida': {
                    zIndex: 2,
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                    minHeight: 'inherit',
                    borderRadius: 'inherit',
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    ...((sm || md) && {
                        // height: 300,
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
                            height: 400,
                            width: '100%',
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
            '& .image-text-area': {
                display: 'flex',
                flexDirection: 'column',
                '& .image-title': {
                    padding: 10,
                    fontSize: 20,
                    fontWeight: 600,
                    color: `${theme.palette.text.primary}`,
                    backgroundColor: `${theme.palette.background.default}`,
                },
                '& .image-detail': {
                    display: 'flex',
                    borderRadius: '0px 0px 10px 10px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    fontWeight: 600,
                    padding: 10,
                    // border: '1px solid rgb(229, 232, 235)',
                    color: `${theme.palette.text.primary}`,
                    backgroundColor: `${theme.palette.background.default}`,
                    textAlign: 'left',
                    '& .avatar': {
                        position: 'relative',
                        width: 50,
                        height: 50,
                        marginRight: 16,
                        border: `1px solid white`,
                        borderRadius: '50%',
                        boxShadow: `${theme.palette.text.primary} 0px 0px 3px 0px`,
                        '& span': {
                            borderRadius: '50%',
                        }
                    },
                    '& .content': {
                        flex: '1 1 auto',
                        flexFlow: 'column',
                        justifyContent: 'center',
                        marginRight: 16,
                        fontSize: 16,
                        textAlign: 'center',
                        alignItems: 'flex-start',
                    },
                    '& .price': {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        fontSize: 13,
                        color: 'rgba(0, 0, 0, 0.70)',
                        '& .amount': {
                            fontSize: 15,
                            fontWeight: 700
                        }
                    }
                },
                '& .footer': {
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: 10,
                    '& .action': {
                        '& img': {
                            width: 25,
                            height: 25
                        },
                        '& .link': {
                            cursor: 'pointer',
                            fontWeight: 600,
                            display: 'none'
                        },
                    },
                    '& .like': {
                        display: 'flex',
                        color: 'rgba(0, 0, 0, 0.15)',
                        '&:hover': {
                            color: 'rgb(235, 87, 87)',
                        }
                    }
                }
            }
        }
    })
})
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
        height: 135,
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
      opacity: 0.5;
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