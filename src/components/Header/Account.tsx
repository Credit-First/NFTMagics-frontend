import Link from 'next/link';
import * as React from 'react';
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppsIcon from '@mui/icons-material/Apps';
import RedeemIcon from '@mui/icons-material/Redeem';
// import SettingsIcon from '@mui/icons-material/Settings';
import { DropdownMenu, StyledBadge } from '@/navigation/styles';
import { useWeb3React } from "@web3-react/core";
import { useRouter } from 'next/router';
import toast from "@/components/Toast";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {
  const router = useRouter();
  const { active, account } = useWeb3React();
  const [open, setOpen] = React.useState(false);

  const notify = React.useCallback((type, message) => {
    toast({ type, message });
  }, []);

  const handleClick = () => {
    setOpen(!open);
  }
  const handleLink = (path: any) => (event: any) => {
    if (!account) return notify('error', 'please connect your wallet');

    if (path === "/collection") {
      router.push(`/account/${account}/collection`);
    }
    if (path === "/nft") {
      router.push(`/account/${account}/all`);
    }
    if (path === "/gift") {
      router.push(`/account/${account}/gift`);
    }
    if (path === "/favorite") {
      router.push({
        pathname: `/marketplace/all`,
        query: { favorite: account },
      })
    }
  };
  return (
    <DropdownMenu open={open} width={55} height={'100%'} onClick={handleClick} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div className='dropdownBtn'>
        {active ? (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            {/* <Avatar></Avatar> */}
            <AccountCircleIcon />
          </StyledBadge>
        ) : (
          <AccountCircleIcon />
        )}
      </div>
      <div className='submenu' style={{ right: 0 }}>
        <ul>
          {/* <li>
            <a href=''>
              <div className='menu-image'>
                <PersonIcon />
              </div>
              Profile
            </a>
          </li> */}
          <li>
            <a onClick={handleLink("/favorite")}>
              <div className='menu-image'>
                <FavoriteBorderIcon />
              </div>
              Favorites
            </a>
          </li>
          {/* <li>
            <a href=''>
              <div className='menu-image'>
                <VisibilityIcon />
              </div>
              WatchList
            </a>
          </li> */}
          <li>
            <a onClick={handleLink("/collection")}>
              <div className='menu-image'>
                <AppsIcon />
              </div>
              My Collections
            </a>
          </li>
          <li>
            <a onClick={handleLink("/nft")}>
              <div className='menu-image'>
                <AppsIcon />
              </div>
              My Nfts
            </a>
          </li>
          <li>
            <a onClick={handleLink("/gift")}>
              <div className='menu-image'>
                <RedeemIcon />
              </div>
              My Gifts
            </a>
          </li>
          {/* <li>
            <a href=''>
              <div className='menu-image'>
                <SettingsIcon />
              </div>
              Settings
            </a>
          </li> */}
        </ul>
      </div>
    </DropdownMenu>
  )
}
export default Account;