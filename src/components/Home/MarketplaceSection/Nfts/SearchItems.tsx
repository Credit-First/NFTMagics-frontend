
import * as React from 'react';
import {
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import ViewComfySharpIcon from '@mui/icons-material/ViewComfySharp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { DropdownMenu } from './styles';

export const SearchModalDropdownMenu = () => {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('Single Items');
  const handleClick = () => {
    setOpen(!open);
  }

  const handleListClick = (text: any, key: any) => () => {
    setText(text);
  }

  return (
    <DropdownMenu open={open} onClick={handleClick} >
      <div className='dropMenu'>
        <div className='dropdownBtn'>
          {text}
          {open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </div>
        <div className='subMenuContent'>
          <div className='submenu'>
            <ul>
              <li onClick={handleListClick('Recently Sold', 1)}>
                <a href=''>
                  Recently Sold
                </a>
              </li>
              <li onClick={handleListClick('All Items', 2)}><a href=''>All Items</a></li>
              <li onClick={handleListClick('Bundles', 3)}><a href=''>Bundles</a></li>
            </ul>
          </div>
          <div className='back' onClick={handleClick}></div>
        </div>
      </div>
    </DropdownMenu>
  )
}

export const SearchSortDropDowonMenu = () => {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('Recently sold');
  const handleClick = () => {
    setOpen(!open);
  }

  const handleListClick = (text: any, key: any) => () => {
    setText(text);
  }

  return (
    <DropdownMenu open={open} onClick={handleClick}>
      <div className='dropdownBtn'>
        {text}
        {open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </div>
      <div className='subMenuContent'>
        <div className='submenu'>
          <ul>
            <li onClick={handleListClick('Recently Sold', 1)}>
              <a href=''>
                Recently Sold
              </a>
            </li>
            <li onClick={handleListClick('Oldest', 2)}><a href=''>Oldest</a></li>
            <li onClick={handleListClick('Lastest', 3)}><a href=''>Lastest</a></li>
          </ul>
        </div>
        <div className='back' onClick={handleClick}></div>
      </div>
    </DropdownMenu>
  )
}

export const SearchToggleButton = () => {
  const [view, setView] = React.useState('list');

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
  };

  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="list" aria-label="list">
        <GridViewSharpIcon />
      </ToggleButton>
      <ToggleButton value="table" aria-label="table">
        <ViewComfySharpIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}