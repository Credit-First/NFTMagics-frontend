import * as React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { actionGetMarketplace } from '@/store/actions';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 15,
    backgroundColor: 'rgb(255 255 255 / 2%)',
    // '&:hover': {
    //     backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    marginRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
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
    const dispatch = useDispatch();
    const router = useRouter()

    const [searchText, setSearchText] = React.useState('');

    const sleep = (ms: any) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    const handleSearch = async (event: any) => {
        if (event.keyCode == 13) {
            await sleep(1000);
            router.push({
              pathname: `/marketplace/all`,
              query: { search: searchText },
            })
        }
    }
    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…" onKeyDown={handleSearch} onChange={e => setSearchText(e.target.value)} value={searchText}
            />
        </Search>
    );
}
