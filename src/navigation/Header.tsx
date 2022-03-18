import * as React from 'react';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { ColorModeContext } from '@/providers/ThemeProvider';
import ExplorerMenu from '../components/Header/ExplorerMenu';
import StatusMenu from '@/components/Header/StatusMenu';
import SearchBar from '@/components/Header/SearchBar';
import { Header } from './styles';
import CreateNFTOptionModal from '@/components/Header/CreateNFTOptionModal/index';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Account from '@/components/Header/Account';


export default function HeaderComponent(props: any) {
  const { setToggleWalletList } = props;
  const [dropMenuOpen, setDropMenuOpen] = React.useState(false);
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const handleDropMenu = () => {
    setDropMenuOpen(!dropMenuOpen);
  }

  return (
    <Header>
      <AppBar position="sticky" className='sticky' sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
        <Toolbar className='toolbar'>
          <Link href='/'>
            <div className='magics-logo'>
              <img src="/images/logo.png" />
              <div className='logo-title'>
                NFTMAGICS
              </div>
            </div>
          </Link>
          <div className='grow' />
          <div className='menu-search'>
            <SearchBar />
          </div>
          <div className='menu-group'>
            <div className='menu-button-group'>
              <ExplorerMenu />
              <StatusMenu />
              <div className='createNFT-button'>
                <CreateNFTOptionModal />
              </div>
            </div>
          </div>
          <div className='dropMenuIcon menu-button' onClick={handleDropMenu}>
            {dropMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </div>
          <div className='themeIcon' onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </div>
          <div className='walletIcon' onClick={setToggleWalletList}>
            <AccountBalanceWalletOutlinedIcon fontSize='large' />
          </div>
          <div className='avatarIcon'>
            <Account />
          </div>
        </Toolbar>
      </AppBar>
      <div className='dropmenu-group' style={{ ...(dropMenuOpen && { transition: 'all 1s', display: 'block' }) }}>
        <DropMenu />
      </div>
    </Header>
  );
}

function DropMenu() {
  const [explorerOpen, setExplorerOpen] = React.useState(false);
  const [statusOpen, setStatusOpen] = React.useState(false);

  const handleExplorerClick = () => {
    setExplorerOpen(!explorerOpen);
  };

  const handleStatusClick = () => {
    setStatusOpen(!statusOpen);
  };

  return (
    <List
      sx={{ width: '100%', padding: '10px', boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 8px 0px', bgcolor: 'background.default' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    // subheader={
    //   <ListSubheader component="div" id="nested-list-subheader">
    //     DropMenu
    //   </ListSubheader>
    // }
    >
      <ListItemButton onClick={handleExplorerClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Explorer" />
        {explorerOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={explorerOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="All NFTs" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="All Catagories" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleStatusClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Status" />
        {statusOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={statusOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Activity" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Ranking" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
