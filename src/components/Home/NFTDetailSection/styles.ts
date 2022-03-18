import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export const Section = styled('div')(({theme}) => {

    const sm = useMediaQuery('(max-width:600px)');
    const md = useMediaQuery('(max-width:900px)');

    return ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3% 10%',
        '& .section-header': {
            margin: 50,
            fontSize: 40,
            fontWeight: 500,
            textAlign: 'center',
            fontFamily: 'poppin-bold'
        },
        '& .section-body': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...( ( sm || md ) && {
                flexWrap: 'wrap'
            }),
            '& .cell': {
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'justify',
                ...( ( sm || md ) && {
                    width: '100%',
                }),
                '& .cell-img': {
                    width: 80,
                    height: 80,
                    position: 'relative'
                },
                '& .cell-title': {
                    padding: 15,
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 700
                },
                '& .cell-content': {
                    padding: 20,
                    fontSize: '1rem',
                    textAlign: 'center',
                }
            }
        }
    })
});