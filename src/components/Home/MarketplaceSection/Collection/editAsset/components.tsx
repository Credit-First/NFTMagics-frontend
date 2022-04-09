import * as React from 'react';
import {
    Button,
    CircularProgress,
    Checkbox,
    Skeleton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Config from '@/config/app';
import { DropdownMenu, DropdownSelectMenu } from './styles';

export const HisttoryDropDownMenu = () => {
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState('All Time');
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
                <ExpandMoreIcon />
            </div>
            <div className='subMenuContent'>
                <div className='submenu'>
                    <ul>
                        <li onClick={handleListClick('Last 7 Days', 1)}><a href=''>Last 7 Days</a></li>
                        <li onClick={handleListClick('Last 14 Days', 2)}><a href=''>Last 14 Days</a></li>
                        <li onClick={handleListClick('Last 30 Days', 3)}><a href=''>Last 30 Days</a></li>
                        <li onClick={handleListClick('Last 60 Days', 4)}><a href=''>Last 60 Days</a></li>
                        <li onClick={handleListClick('Last 90 Days', 5)}><a href=''>Last 90 Days</a></li>
                        <li onClick={handleListClick('Last 1 Year', 6)}><a href=''>Last Year</a></li>
                        <li onClick={handleListClick('All Time', 0)}><a href=''>All Time</a></li>
                    </ul>
                </div>
                <div className='back' onClick={handleClick}></div>
            </div>
        </DropdownMenu>
    )
}

export const HisttoryFilterMenu = () => {
    const [checked, setChecked] = React.useState({
        'listings': false,
        'sales': false,
        'transfer': false
    });
    const [open, setOpen] = React.useState(false);

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleChange = (type: string) => () => {
        function typedKeys<T>(o: T): (keyof T)[] {
            return Object.keys(o) as (keyof T)[];
        }
        typedKeys(checked).filter(k => {
            if (k === type) {
                setChecked({
                    ...checked, [type]: !checked[k]
                });
            }
        });
    };

    return (
        <DropdownSelectMenu open={open}>
            <section className='menu-container'>
                <div className='menu-header' onClick={() => setOpen(!open)}>
                    <div>filter</div>
                    {open ? (<ExpandLessIcon />) : (<ExpandMoreIcon />)}
                </div>
                <div className='back' onClick={() => setOpen(!open)}></div>
                <ul className='menu-items'>
                    <li className='item'>
                        <div className='option' onClick={handleChange('listings')}>
                            <Checkbox
                                checked={checked['listings']}
                                inputProps={{ 'aria-label': 'controlled' }}
                            // icon={<FavoriteBorder />}
                            // checkedIcon={<Favorite />} 
                            />
                            <div>
                                Listings
                            </div>
                        </div>
                    </li>
                    <li className='item'>
                        <div className='option' onClick={handleChange('sales')}>
                            <Checkbox
                                checked={checked['sales']}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <div>
                                Sales
                            </div>
                        </div>
                    </li>
                    <li className='item'>
                        <div className='option' onClick={handleChange('transfer')}>
                            <Checkbox
                                checked={checked['transfer']}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <div>
                                Transfer
                            </div>
                        </div>
                    </li>
                </ul>
            </section>
        </DropdownSelectMenu>
    )
}

export const TokenDropDownMenu = ({ disabled, setInputData, inputData }: { disabled: any, setInputData: any, inputData: any }) => {
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState('');

    const list = [
        { label: 'BNB', value: Config.Token.BNB.address },
        { label: 'AYRA', value: Config.Token.AYRA.address },
        { label: 'ITHD', value: Config.Token.ITHD.address },
    ]

    const handleClick = () => {
        !disabled && setOpen(!open);
    }

    const handleSelect = (item: any) => () => {
        setText(item.label);
        setInputData({ ...inputData, saleTokenType: item.value })
    }
    React.useEffect(() => {

        list.map(item => {
            if(item.value === inputData.saleTokenType) {
                return setText(item.label);
            }
        })
    },[inputData]);

    return (
        <DropdownMenu open={open} onClick={handleClick} width={120} disabled={disabled}>
            <button className='dropdownBtn' disabled={disabled}>
                <div>{text}</div>
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
            <div className='subMenuContent'>
                <div className='submenu' style={{ width: 120 }}>
                    <ul>
                        {
                            list.map(item => (
                                <li key={item.value} onClick={handleSelect(item)} value={item.value}>
                                    <a>
                                        {item.label}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='back' onClick={handleClick}></div>
            </div>
        </DropdownMenu>
    )
}