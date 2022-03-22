import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const Section = styled('div')((theme) => {
  return ({
  })
})
export const CreateNFTModal = styled('div')((theme) => {

  const sm = useMediaQuery('(max-width:600px)');
  const md = useMediaQuery('(max-width:900px)');

  return ({
    position: 'relative',
    ...(sm && {
      overflow: 'auto'
    }),
    '& .modal-border': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      animation: 'o-rotate-360 linear 12s infinite',
      ...(sm && {
        display: 'none'
      }),
      '& span': {
        display: 'block',
        width: '100%',
        height: '100%',
        position: 'relative',
        transform: 'translate(-50%, -50%)',
        '&:after': {
          display: 'block',
          content: '""',
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: '100%',
        },
        '&:first-of-type': {
          background: '#d900c0',
          '&:after': {
            background: '#40ffce'
          }
        },
        '&:last-of-type': {
          background: '#ff5f2d',
          '&:after': {
            background: '#9058ff'
          }
        }
      },
      '@keyframes o-rotate-360': {
        '0%': {
          transform: 'rotate(0)'
        },
        '100%': {
          transform: 'rotate(360deg)'
        }
      }
    },
    '& .modal-body': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      background: 'white',
      border: '2px solid transparent',
      /* background-origin: border-box, */
      backgroundClip: 'padding-box, border-box',
      ...(md && {
        height: '100vh'
      }),
      '& .modal-title': {
        fontSize: '1.7rem',
        fontWeight: 600,
        textAlign: 'center',
        padding: '40px 50px'
      },
      '& .modal-content': {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '0px 30px 30px 40px',
        position: 'relative',
        ...(sm && {
          flexDirection: 'column'
        }),
        '& .select-item': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          textDecoration: 'none',
          transition: 'all 0.3s',
          '& img': {
            height: 400,
            transition: 'all 0.3s',
          },
          '&:hover img': {
            transition: 'all 0.3s',
            // transform: 'scale(1.1)'
          },
          '& button': {
            marginTop: 30,
            width: 200,
            clipPath: 'polygon( calc(0px + 15px) 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, calc(0px + 15px) 100%, 0 50% )',
            display: 'inline-block',
            fontWeight: 700,
            fontSize: 20,
            color: '#fff',
            lineHeight: 1,
            padding: '14px 26px',
            transition: 'all 0.3s',
            position: 'relative',
            background: '#5c49d0',
            textTransform: 'capitalize',
            ...((sm || md) && {
              width: 160,
              fontSize: 15,
            }),
            '&:hover': {
              background: '#cf3464',
            }
          },
          '&:hover button': {
            background: '#cf3464',
          },
        },
        '& .separater': {
          padding: '0 25px',
          ...(sm && {
            display: 'none'
          }),
          '& .vertical-line': {
            backgroundColor: '#DCE2E6',
            width: 1,
            height: '90%',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          },
          '& .mark': {
            backgroundColor: '#DCE2E6',
            padding: '10px',
            borderRadius: '50%',
            fontSize: '24px',
            color: 'white',
            textAlign: 'center',
            position: 'relative',
            marginTop: '180px',
            width: 50,
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }
        }
      },
      '& .modal-actions button': {
        display: 'none',
        ...((sm || md) && {
          display: 'block',
        })
      }
    },
  })
})