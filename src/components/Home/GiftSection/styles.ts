import { styled } from '@mui/material/styles';

export const GiftSection = styled('section')(({ theme }: { theme: any }) => {
    return ({
        height: '100%',
        width: '100%',
        paddingTop: 500,
        marginBottom: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        background: 'url(/images/gift/background.jpg)',
        backgroundSize: '100% 100% !important',
        '& .dialog': {
            background: 'transparent !important',
            boxShadow: 'none',
            '& .dialog-content': {
                position: 'relative',
                '& .button': {
                    position: 'absolute',
                    bottom: 0
                }
            }
        },
        '& .floor': {
            top: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            height: '10em',
            position: 'relative',
            width: '20em',
            transformOrigin: '0% 0%',
            left: '7%',
            transform:
                'rotateX(70deg) rotateZ(45deg)',
            transformStyle: 'preserve-3d',
            perspective: '1200px',
        },
        '& .shadow2': {
            position: 'absolute',
            top: '50%',
            left: '50%',
            zIndex: 2,
            height: '20em',
            width: '6em',
            background: 'linear-gradient(#4446, rgba(0,0,0,0))',
            transform:
                'translateZ(3em)',
        },
        '& .shadow3': {
            position: 'absolute',
            top: '45%',
            left: '36.5%',
            zIndex: 2,
            height: '22em',
            width: '8em',
            borderRadius: '0 50% 0 0',
            background: 'linear-gradient(#4446, rgba(0,0,0,0))',
            transform:
                'rotateZ(13deg) translateZ(3em)',
        },
        '& .box': {
            zIndex: 1,
            position: 'relative',
            transform: 'translateZ(6em)',
            transformStyle: 'preserve-3d',
        },

        '& .qmark': {
            fontSize: '3em',
            fontWeight: 700,
            textShadow: '0 0 1em 0em rgba(250,250,0,1)',
            position: 'absolute',
            transform: 'translateZ(1em) translateX(.6em) translateY(.5em) rotateX(-90deg) rotateY(45deg)',
        },
        '& .heart-gift': {
            color: '#ef3535ab',
            animation: 'rotate 2s infinite linear, fade-in 1.5s ease',
            opacity: 1,
            fontSize: '3em',
            zIndex: 2,
            position: 'absolute',
            transformOrigin: '50% 50%',
            textShadow: '0 0 .1em red',
        },
        '& .face': {
            height: '6em',
            width: '6em',
            position: 'absolute',
            zIndex: 1,
            boxShadow:
                '0 0 .5em .25em rgba(0,0,0,.2) inset',
        },
        '& .top': {
            backgroundColor: 'black',
            backgroundImage:
                'linear-gradient(-90deg,transparent 49%,rgb(50,110,160)), linear-gradient(0deg,transparent 49%,rgb(50,110,160))',
            transform: 'translateZ(3em)',
            boxShadow:
                '0 0 0 .4em rgba(50,150,200,1) inset',
        },
        '& .right': {
            backgroundImage: 'linear-gradient(to top,rgba(0,0,0,0) 33%,rgba(225,225,0,1) 34% 65%,rgba(0,0,0,0) 66%)',
            backgroundColor: 'rgb(20,130,170)',
            transform: 'rotateY(90deg) translateZ(3em)',
        },
        '& .left': {
            backgroundImage: 'linear-gradient(to right,rgba(0,0,0,0) 33%,rgba(200,200,0,1) 33% 66%,rgba(0,0,0,0) 66%)',
            backgroundColor: 'rgb(0,110,150)',
            transform: 'rotateX(-90deg) translateZ(3em)',
        },
        '& .lid': {
            animation:
                'wiggle 1.5s infinite cubic-bezier(.2,1.2,.6,1.1)',
            position: 'absolute',
            height: '6.5em',
            width: '6.5em',
            transformStyle: 'preserve-3d',
            zIndex: 2,
        },
        '& .open': {
            transform: 'translateZ(13em)',
            animation: 'up 1s ease-out, floaty 2s 1s infinite linear',
        },
        '& .close': {
            transform: 'translateZ(4em)',
            animation: 'down 1s ease-out, wiggle 1.5s  1s infinite cubic-bezier(.2,1.2,.6,1.1)',
        },
        '& .ltop': {
            height: '6.5em',
            width: '6.5em',
            backgroundColor: 'rgb(50,150,200)',
            backgroundImage: 'linear-gradient(to right,rgba(0,0,0,0) 33%,rgba(225,225,0,1) 34% 65%,rgba(0,0,0,.1) 66% 68%,rgba(0,0,0,0) 69%),linear-gradient(to top,rgba(0,0,0,0) 33%,rgba(200,200,0,1) 34% 65%,rgba(0,0,0,0) 66%)',
        },
        '& .lright': {
            zIndex: 2,
            backgroundColor: 'rgb(20,130,170)',
            width: '3em',
            height: '6.5em',
            transform: 'rotateY(90deg) translateX(1.5em) translateZ(5em)',
            backgroundImage: 'linear-gradient(to top,rgba(0,0,0,0) 33%,rgba(200,200,0,1) 34% 65%,rgba(0,0,0,0) 66%)',
        },
        '& .lleft': {
            height: '3em',
            width: '6.5em',
            backgroundImage: 'linear-gradient(to right,rgba(0,0,0,0) 33%,rgba(225,225,0,1) 33% 66%,rgba(0,0,0,0) 66%)',
            backgroundColor: 'rgb(0,110,150)',
            transform: 'rotateX(-90deg) translateY(1.5em) translateZ(5em)',
        },
        '& .shadow': {
            position: 'absolute',
            top: '54%',
            left: '57.3%',
            zIndex: 2,
            height: '18em',
            width: '7.9em',
            borderRadius: '25% 0 0 0',
            background: 'linear-gradient(#4446, rgba(0,0,0,0))',
            transform: 'rotateZ(-20deg) translateZ(3em)',
        },
        '& .gift-font': {
            textAlign: 'center',
            marginTop: 60,
            color: '#474747',
            font: '5em/1em Anton',
            textTransform: 'uppercase',
            textShadow: '1px 1px black, 2px 2px black, 3px 3px black, 4px 4px black, 5px 5px black, 6px 6px black, 7px 7px 5px rgba(0,0,0,0.5)',
        },
        '& .gift-font > span': {
            cursor: 'pointer',
            display: 'inline-block',
            position: 'relative',
            transition: 'all 0.2s ease-in-out',
        },
        '& .gift-font>span:nth-of-type(2):hover': {
            color: '#4aacb8',
            top: 2,
            left: 2,
            textShadow: '1px 1px #1b818d, 2px 2px #1b818d, 3px 3px #1b818d, 4px 4px #1b818d, 4px 4px 5px rgba(0,0,0,0.5)',
        },
        '& .gift-font>span:nth-of-type(3):hover': {
            color: '#49b8ff',
            top: '-8px',
            left: '-8px',
            textShadow: '1px 1px #116295, 2px 2px #116295, 3px 3px #116295, 4px 4px #116295, 5px 5px #116295, 6px 6px #116295, 7px 7px #116295, 8px 8px #116295, 9px 9px #116295, 10px 10px #116295, 11px 11px #116295, 12px 12px #116295, 13px 13px #116295, 14px 14px 5px rgba(0,0,0,0.5)',
        },
        '& .gift-font>span:nth-of-type(4):hover': {
            color: '#cc3fd9',
            top: 4,
            left: 4,
            textShadow: '1px 1px #870d92, 2px 2px #870d92, 2px 2px 3px rgba(0,0,0,0.5)',
        },
        '& .gift-font>span:nth-of-type(6):hover': {
            color: '#d34a87',
            top: '-10px',
            left: '-10px',
            textShadow: '1px 1px #8b1b4d, 2px 2px #8b1b4d, 3px 3px #8b1b4d, 4px 4px #8b1b4d, 5px 5px #8b1b4d, 6px 6px #8b1b4d, 7px 7px #8b1b4d, 8px 8px #8b1b4d, 9px 9px #8b1b4d, 10px 10px #8b1b4d, 11px 11px #8b1b4d, 12px 12px #8b1b4d, 13px 13px #8b1b4d, 14px 14px #8b1b4d, 15px 15px #8b1b4d, 16px 16px #8b1b4d, 16px 16px 8px rgba(0,0,0,0.5), 17px 17px 10px rgba(0,0,0,0.3), 18px 18px 5px rgba(0,0,0,0.5)',
        },
        '& .gift-font>span:nth-of-type(7):hover': {
            color: '#d13153',
            textShadow: '1px 1px #83142c, 2px 2px #83142c, 3px 3px #83142c, 4px 4px #83142c, 5px 5px #83142c, 6px 6px #83142c, 7px 7px #83142c, 8px 8px #83142c, 9px 9px 3px rgba(0,0,0,0.5)',
        },
        '& .gift-font>span:hover': {
            color: '#acd335',
            textShadow: '1px 1px #749218, 2px 2px #749218, 3px 3px #749218, 4px 4px #749218, 5px 5px #749218, 6px 6px #749218, 7px 7px #749218, 8px 8px #749218, 9px 9px 3px rgba(0,0,0,0.5)',
            top: '-2px',
            left: '-2px',
            transition: 'all 0.1s ease-in-out',
        },
        '@keyframes fade-in': {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 }
        },
        '@keyframes floaty': {
            '0%': {
                transform: 'translateZ(13em)'
            },
            '50%': {
                transform: 'translateZ(12.5em)'
            }
        },
        '@keyframes rotate': {
            '0%': {
                transform: 'rotateZ(0deg) translateZ(2em) rotateX(-90deg) rotateY(45deg)'
            },
            '50%': {
                transform: 'rotateZ(180deg) translateZ(1.5em) rotateX(-90deg) rotateY(45deg)'
            },
            '100%': {
                transform: 'rotateZ(360deg) translateZ(2em) rotateX(-90deg) rotateY(45deg)'
            }
        },
        '@keyframes wiggle': {
            '0%': {
                transform: 'translateZ(4em) rotateX(0deg) rotateY(0deg)'
            },
            '11%': {
                transform: 'translateZ(4em) rotateX(1deg) rotateY(-1deg)'
            },
            '22%': {
                transform: 'translateZ(4em) rotateX(1deg) rotateY(1deg)'
            },
            '33%': {
                transform: 'translateZ(4em) rotateX(1deg) rotateY(0deg)'
            },
            '44%': {
                transform: 'translateZ(4em) rotateX(-1deg) rotateY(-1deg)'
            },
            '55%': {
                transform: 'translateZ(4em) rotateX(1deg) rotateY(1deg)'
            },
            '66%': {
                transform: 'translateZ(4em) rotateX(-1deg) rotateY(0deg)'
            },
            '100%': {
                transform: 'translateZ(4em) rotateX(0deg)'
            }
        },
        '@keyframes down': {
            '0%': { transform: 'translateZ(13em)' },
            '100%': { transform: 'translateZ(4em)' }
        },
        '@keyframes up': {
            '0%': {
                transform: 'translateZ(4em) rotateX(0deg)'
            },
            '100%': {
                transform: 'translateZ(13em) rotateX(0deg)'
            }
        }
    })
})