import * as React from "react";
import { keyframes } from '@mui/styled-engine';
import { experimentalStyled as styled } from '@mui/material';

const ring = keyframes`
    0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingComponent = styled("div")(({ theme }) => ({
    display: 'inline-block',
    width: 80,
    height: 80,
    '&:after ': {
        content: '""',
        display: 'block',
        width: 64,
        height: 64,
        margin: 8,
        borderRadius: '50%',
        border: '6px solid #fff',
        borderColor: `${theme.palette.divider} transparent ${theme.palette.divider} transparent`,
        animation: `${ring} 1.2s linear infinite`,
    },
}));