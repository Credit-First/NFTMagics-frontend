import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const Modal = styled('div')((theme) => {

  const sm = useMediaQuery('(max-width:600px)');
  const md = useMediaQuery('(max-width:900px)');

  return ({
    // backgroundImage: 'linear-gradient(rgb(255 255 255 / 9%), rgb(137 137 137 / 99%))',
    '& .modal-title': {
      textAlign: 'center',
      display: 'flex',
      alignItem: 'center',
      justifyContent: 'space-between',
      padding: 10,
      '& .title': {
        padding: 10,
        fontFamily: 'upheaval',
      }
    },
    '& .modal-body': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      '& span': {
        fontFamily: 'Sansation',
      },
      '& .token-name': {
        fontSize: 25,
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily: 'upheaval',
      }
    },
    '& .modal-actions': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10
    }
  })
})