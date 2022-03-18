import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

export const Modal = styled('div')(({ theme }: { theme?: any }) => {

  const sm = useMediaQuery('(max-width:600px)');
  const md = useMediaQuery('(max-width:900px)');

  return ({
    // backgroundImage: 'linear-gradient(rgb(255 255 255 / 9%), rgb(137 137 137 / 99%))',
    '& .put-list-modal': {
      margin: 0,
      padding: 0,
      '& .modal-title': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '1.2rem',
        fontWeight: 600,
        textAlign: 'center',
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
      '& .modal-body': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& .item-detail': {
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          width: '100%',
          padding: 20,
          borderBottom: `1px solid ${theme.palette.divider}`,
          '& .img': {
            width: 100,
            height: 100,
            paddingRight: '10px 20px',
            position: 'relative',
            borderRadius: 5,
            boxShadow: `0px 0px 3px 0px grey`,
            border: `3px solid white`,
            marginRight: 20,
            '& span': {
            }
          },
          '& .content': {
            flex: 1,
            '& .name': {
              fontSize: 25,
              paddingBottom: 10,
            },
            '& .description': {
              fontSize: 15
            },
            '& .count': {

            }
          },
          '& .price': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginLeft: 10,
            '& .price-info': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
              marginBottom: 10,
              '& .token-img': {
                width: 30,
                height: 30,
                marginRight: 5
              },
              '& .token-amount': {
                fontWeight: 600,
                fontSize: 25
              },
              '& .token-name': {
                marginLeft: 10,
                fontSize: 20,
                fontWeight: 700
              },
            }
          }
        },
        '& .wallet-detail': {
          padding: '0px 20px',
          marginTop: 10,
          fontSize: 15
        },
        '& .progress-detail': {
          padding: 20,
          '& .title': {
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            '& .title-name': {
              fontWeight: 600,
              marginLeft: 10,
              fontSize: 22
            }
          }
        }
      }
    }
  })
})

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