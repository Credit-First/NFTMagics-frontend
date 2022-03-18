import * as React from 'react';
import { useTheme, styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 15,
    backgroundColor: 'rgb(255 255 255 / 2%)',
    // '&:hover': {
    //     backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled('input')(({ theme }) => ({
    outline: 'none',
    color: 'inherit',
    backgroundColor: 'inherit',
    padding: theme.spacing(1, 1, 1, 0),
    border: '1px solid rgb(0 0 0 / 5%)',
    borderRadius: 15,
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    // [theme.breakpoints.up('md')]: {
    //     width: '40ch',
    // },
    '&:focus-visible': {
        borderColor: 'transparent',
        boxShadow: '0px 0px 7px 1px rgb(0 0 0 / 20%)'
    }
}));

export default function SearchBar() {
    const theme = useTheme();

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
            />
        </Search>
    );
}
