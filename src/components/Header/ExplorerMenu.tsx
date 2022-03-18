import * as React from 'react';
import Link from 'next/link';
import { DropdownMenu } from '@/navigation/styles';
import { useTheme } from '@mui/material';

const ExploreMenu = () => {
  const theme = useTheme();
  const theme_mode = theme.palette.mode;

  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  }

  const handleListClick = (text: any, key: any) => () => {

  }

  return (
    <DropdownMenu open={open} onClick={handleClick} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div className='dropdownBtn' onClick={handleClick}>
        Explore
      </div>
      <div className='submenu'>
        <ul>
          <li onClick={handleListClick('All NFTs', 1)}>
            <Link href={'/marketplace/all'}>
              <a>
                <div className='menu-image'>
                  <img src={`/svg/allnfts-${theme_mode}.svg`} />
                </div>
                All NFTs
              </a>
            </Link>
          </li>
          <li onClick={handleListClick('Collection', 2)}>
            <Link href={'/marketplace/collections'}>
              <a>
                <div className='menu-image'>
                  <img src={`/svg/art-${theme_mode}.svg`} />
                </div>
                Collections
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </DropdownMenu>
  )
}
export default ExploreMenu;
