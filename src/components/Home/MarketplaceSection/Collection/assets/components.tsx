import * as React from 'react';
import { Checkbox } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Config from '@/config/app';
import { DropdownMenu, DropdownSelectMenu } from './styles';
import { useDispatch } from 'react-redux';
import { actionGetLogList, actionGetPriceHistory } from '@/store/actions';

export const HistoryDropDownMenu = ({itemId}:{itemId:any}) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState('All Time');
    const handleOpen = () => {
        setOpen(!open);
    }

    const handleListClick = (text: any, key: any) => () => {
        setText(text);
        dispatch(actionGetPriceHistory({ itemId, key }));
    }

    React.useEffect(() => {
        itemId && dispatch(actionGetPriceHistory({ itemId, key: 0 }));
    }, [itemId]);

    return (
        <DropdownMenu open={open} onClick={handleOpen} width={200}>
            <div className='dropdownBtn' >
                {text}
                <ExpandMoreIcon />
            </div>
            <div className='subMenuContent'>
                <div className='submenu'>
                    <ul>
                        <li onClick={handleListClick('Last 7 Days', 1)}><a style={{ fontSize: 15 }}>Last 7 Days</a></li>
                        <li onClick={handleListClick('Last 14 Days', 2)}><a style={{ fontSize: 15 }}>Last 14 Days</a></li>
                        <li onClick={handleListClick('Last 30 Days', 4)}><a style={{ fontSize: 15 }}>Last 30 Days</a></li>
                        <li onClick={handleListClick('Last 60 Days', 8)}><a style={{ fontSize: 15 }}>Last 60 Days</a></li>
                        <li onClick={handleListClick('Last 90 Days', 12)}><a style={{ fontSize: 15 }}>Last 90 Days</a></li>
                        <li onClick={handleListClick('Last 1 Year', 48)}><a style={{ fontSize: 15 }}>Last Year</a></li>
                        <li onClick={handleListClick('All Time', 0)}><a style={{ fontSize: 15 }}>All Time</a></li>
                    </ul>
                </div>
                <div className='back' onClick={handleOpen}></div>
            </div>
        </DropdownMenu>
    )
}

export const HistoryFilterMenu = ({ itemId }: { itemId: any }) => {
    const dispatch = useDispatch();
    const [checked, setChecked] = React.useState({
        'all': true,
        'list': false,
        'purchase': false,
        'mint': false
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


    React.useEffect(() => {
        if (itemId > 0) dispatch(actionGetLogList({ itemId, checked }))
    }, [itemId, checked]);

    return (
        <DropdownSelectMenu open={open}>
            <section className='menu-container'>
                <div className='menu-header' onClick={() => setOpen(!open)}>
                    <div>filter</div>
                    {open ? (<ExpandLessIcon />) : (<ExpandMoreIcon />)}
                </div>
                <div className='back' onClick={() => setOpen(!open)}></div>
                <ul className='menu-items'>
                    <li className='item' onClick={handleChange('all')}>
                        <div className='option'>
                            <Checkbox
                                checked={checked['all']}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <div>
                                All
                            </div>
                        </div>
                    </li>
                    <li className='item' onClick={handleChange('list')}>
                        <div className='option'>
                            <Checkbox
                                checked={checked['list']}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <div>
                                List
                            </div>
                        </div>
                    </li>
                    <li className='item' onClick={handleChange('purchase')}>
                        <div className='option'>
                            <Checkbox
                                checked={checked['purchase']}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <div>
                                purchase
                            </div>
                        </div>
                    </li>
                    <li className='item' onClick={handleChange('mint')}>
                        <div className='option'>
                            <Checkbox
                                checked={checked['mint']}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                            <div>
                                Mint
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
    const [text, setText] = React.useState('BNB');

    const list = [
        { label: 'BNB', value: Config.Token.BNB.address },
        { label: 'AYRA', value: Config.Token.AYRA.address },
        { label: 'ITHD', value: Config.Token.ITHD.address },
    ]

    const handleClick = () => {
        setOpen(!open);
    }

    const handleSelect = (item: any) => () => {
        setText(item.label);
        setInputData({ ...inputData, saleTokenType: item.value })
    }
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