import * as React from 'react';
import { DropdownMenu } from '@/navigation/styles';
import Link from 'next/link';

const StatusMenu = () => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  }

  const handleListClick = (text: any, key: any) => () => {

  }

  return (
    <DropdownMenu open={open} onClick={handleClick} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div className='dropdownBtn' onClick={handleClick}>
        Status
      </div>
      <div className='submenu'>
        <ul>
          <li onClick={handleListClick('Activity', 1)}><a>Activity</a></li>
          <li onClick={handleListClick('Ranking', 2)}><a>Ranking</a></li>
        </ul>
      </div>
    </DropdownMenu>
  )
}
export default StatusMenu;