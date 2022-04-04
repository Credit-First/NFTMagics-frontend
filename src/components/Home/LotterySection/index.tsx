import * as React from 'react';
import {
    CircularProgress,
    Tooltip
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ClearIcon from '@mui/icons-material/Clear';
import Footer from '@/components/Footer';
import toast from "@/components/Toast";
import "react-toastify/dist/ReactToastify.css";
import Countdown from 'react-countdown';
import { HeaderSection, TicketSection, CheckSection, FinishedRoundSection, HowPlaySection, BuyModal, DropdownMenu } from './styles';

import { CopyToClipboard } from "react-copy-to-clipboard";
import ApproveTokenModal from '@/components/Home/ApproveTokenModal';
import Config from '@/config/app';
import BigNumber from 'bignumber.js';
import moment from 'moment';
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import clsx from 'clsx';

import { actionGetLotteryList, actionGetTicketList, actionGetCurrentLotteryItem } from '@/store/actions';
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentLotteryItem, selectLotteryList, selectTicketList } from '@/store/selectors';

const rx_live = /^[0-9]*[.,]?[0-9]{0,18}$/;
const BIG_TEN = new BigNumber(10);
const tokenAddress = [
    Config.Token.BNB.address,
    Config.Token.AYRA.address,
    Config.Token.ITHD.address
]

const LotterySection = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const lotteryList = useSelector(selectLotteryList);
    const currentLottery = useSelector(selectCurrentLotteryItem);
    const ticketList = useSelector(selectTicketList);
    const { account, library } = useWeb3React();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [modal, setModal] = React.useState(false);
    const [historyActive, setHistoryActive] = React.useState('all');
    const [totalPrice, setTotalPrice] = React.useState(new BigNumber(0));
    const [approveModal, setApproveModal] = React.useState(false);
    const [buyData, setBuyData] = React.useState({
        ticketAmount: 0,
        buyToken: tokenAddress[0]
    })
    const [detailState, setDetailState] = React.useState(false);
    const [winningState, setWinningState] = React.useState(false);
    const [checkState, setCheckState] = React.useState(false);
    const [countTime, setCountTime] = React.useState(0);
    const [totalUSD, setTotalUSD] = React.useState('0');
    const [currentLotteryEndDate, setCurrentLotteryEndDate] = React.useState('');
    const [previewLotteryEndDate, setPreviewLotteryEndDate] = React.useState('');
    const [currentTickets, setCurrentTickets] = React.useState([]);
    const [tickets, setTickets] = React.useState([]);
    const [currentPreviewLotteryIndex, setCurrenPreviewLotteryIndex] = React.useState(0);
    const [currentLotteryData, setCurrentLotteryData] = React.useState({
        lotteryId: 0,
        firstTicketId: 0,
        secondTicketId: 0,
        thirdTicketId: 0,
        startDate: 0,
        endDate: 0,
        totalAmountBNB: 0,
        totalAmountAYRA: 0,
        totalAmountITHD: 0,
        ticketAmount: 0,
        firstWinnerAddress: '',
        secondWinnerAddress: '',
        thirdWinnerAddress: '',
    })
    const [previewLotteryData, setPreviewLotteryData] = React.useState({
        lotteryId: 0,
        firstTicketId: 0,
        secondTicketId: 0,
        thirdTicketId: 0,
        startDate: 0,
        endDate: 0,
        totalAmountBNB: 0,
        totalAmountAYRA: 0,
        totalAmountITHD: 0,
        ticketAmount: 0,
        firstWinnerAddress: '',
        secondWinnerAddress: '',
        thirdWinnerAddress: '',
    })
    const [loading, setLoading] = React.useState(false);

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, [])
    const handleOpen = () => {
        setModal(true);
    }
    const handleClose = () => {
        setBuyData({ ...buyData, ticketAmount: 0 })
        setModal(false);
    }
    const handleDetail = () => {
        setDetailState(!detailState);
    }
    const allowanceBalanceof = async (tokenType: any, onAddress: any) => {
        if (tokenType == Config.Token.BNB.address) return true;
        let token_abi = Config.Token.AYRA.abi;
        let token_address = Config.Token.AYRA.address;

        if (tokenType === Config.Token.ITHD.address) {
            token_abi = Config.Token.ITHD.abi;
            token_address = Config.Token.ITHD.address;
        }

        const web3 = new Web3(Web3.givenProvider);
        const contract = new web3.eth.Contract(token_abi, token_address);
        const allowanceBalanceof = await contract.methods
            .allowance(account, onAddress)
            .call();
        return (Math.floor(allowanceBalanceof / 1e18) > 100);
    };
    const handleBuyTicket = async () => {
        if (!account) return notify('error', 'please connect your wallet');
        if (buyData.ticketAmount == 0) return notify('error', 'please input ticket amount');
        if (!currentLotteryData) return notify('error', 'lottery does not work');
        setLoading(true);

        const web3 = new Web3(library.provider);
        const LOTTERY = new web3.eth.Contract(
            Config.Lottery.abi as [],
            Config.Lottery.address as string
        )
        const allowance = await allowanceBalanceof(buyData.buyToken, Config.Lottery.address);

        if (!allowance) {
            setLoading(false);
            return setApproveModal(true);
        }
        let balance = '';
        if (buyData.buyToken === Config.Token.BNB.address) {
            balance = await web3.eth.getBalance(account);
        }
        else if (buyData.buyToken === Config.Token.AYRA.address) {
            const ContractAYRA = new web3.eth.Contract(
                Config.Token.AYRA.abi as [],
                Config.Token.AYRA.address as string
            );
            balance = await ContractAYRA.methods.balanceOf(account).call();
        }
        else if (buyData.buyToken === Config.Token.ITHD.address) {
            const ContractITHD = new web3.eth.Contract(
                Config.Token.ITHD.abi as [],
                Config.Token.ITHD.address as string
            );
            balance = await ContractITHD.methods.balanceOf(account).call();
        }
        let total_price = totalPrice.multipliedBy(BIG_TEN.pow(18));

        if (parseInt(balance, 10) < total_price.toNumber()) {
            setLoading(false);
            return notify('error', "Don't have enough token");
        }
        if (buyData.buyToken != Config.Token.BNB.address) {
            total_price = new BigNumber(0);
        }
        try {
            await LOTTERY.methods
                .buyTicket(
                    currentLotteryData.lotteryId,
                    buyData.ticketAmount,
                    buyData.buyToken
                )
                .send({ from: account, value: total_price.toNumber() })
                .on('receipt', function (receipt: any) {
                    setLoading(false);
                    setBuyData({ ...buyData, ticketAmount: 0 });
                    setBuyData({ ...buyData, buyToken: tokenAddress[0] });
                    setTotalPrice(new BigNumber(0));
                    dispatch(actionGetCurrentLotteryItem());
                    dispatch(actionGetTicketList({ account }));
                })
                .then((_tx: any) => {
                    notify('success', 'you have New ticket');
                })
        } catch (err: any) {
            setLoading(false);
            if (err.code == 4001) notify('error', err.message);
            else notify('error', 'Error buy the ticket');
            console.log('Error buy the ticket : ', err);
        }
        setModal(false);
        setBuyData({ ...buyData, ticketAmount: 0 });
        setBuyData({ ...buyData, buyToken: tokenAddress[0] });
        setTotalPrice(new BigNumber(0));
    }
    const handleChangeNumber = (event: any) => {
        if (rx_live.test(event.target.value))
            setBuyData(state => ({ ...state, ticketAmount: event.target.value }));
    }
    const handleActiveHistory = (type: any) => () => {
        setHistoryActive(type);
    }
    const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
        if (completed) {
            // Render a completed state
            return 'Time is over';
        } else {
            // Render a countdown
            return <>
                <span className='time-value'>{days}</span>
                <span className='time-hour'>days</span>
                <span className='time-value'>{hours}</span>
                <span className='time-hour'>hours</span>
                <span className='time-value'>{minutes}</span>
                <span className='time-hour'>minutes</span>
                <span className='time-value'>{seconds}</span>
                <span className='time-hour'>seconds</span>
            </>
        }
    };

    const loadLastLottery = async (lastLottery: any) => {
        const endDate = new Date(lastLottery.endDate * 1000);
        const priceBNB = new BigNumber(lastLottery.totalAmountBNB);
        const priceAYRA = new BigNumber(lastLottery.totalAmountAYRA);
        const priceITHD = new BigNumber(lastLottery.totalAmountITHD);
        const usdBNB = new BigNumber(priceBNB).multipliedBy(430).dividedBy(BIG_TEN.pow(18));
        const usdAYRA = new BigNumber(priceAYRA).multipliedBy(0.05).dividedBy(BIG_TEN.pow(18));
        const usdITHD = new BigNumber(priceITHD).multipliedBy(0.03).dividedBy(BIG_TEN.pow(18));
        const totalUSD = new BigNumber(usdBNB).plus(usdAYRA).plus(usdITHD).toFixed(2, BigNumber.ROUND_DOWN);

        setTotalUSD(totalUSD);
        setCurrentLotteryEndDate(moment(endDate).format('LLLL'));
        setCountTime(lastLottery.endDate * 1000);
        setCurrentLotteryData(lastLottery);
    }

    const loadPreviewLottery = async (index: any) => {
        if (index < 0) index = 0;
        if (index > lotteryList.length - 2) index = lotteryList.length - 2;

        setCurrenPreviewLotteryIndex(index);
        const lottery = lotteryList[index];

        if(lottery) {
            const endDate = new Date(lottery.endDate * 1000);
            setPreviewLotteryEndDate(moment(endDate).format('LLLL'));
    
            setPreviewLotteryData(lottery);
        }
    }

    const handlePrevLottery = () => {
        loadPreviewLottery(currentPreviewLotteryIndex - 1);
    }

    const handleNextLottery = () => {
        loadPreviewLottery(currentPreviewLotteryIndex + 1);
    }

    const handleCheckTicket = async () => {
        if(!account) return notify('error', 'please connect your wallet');

        setCheckState(true);

        const web3 = new Web3(library.provider);
        const LOTTERY = new web3.eth.Contract(
            Config.Lottery.abi as [],
            Config.Lottery.address as string
        )
        const amountBnbDueTo = await LOTTERY.methods.amountBnbDueTo(account).call();
        const amountAyraDueTo = await LOTTERY.methods.amountAyraDueTo(account).call();
        const amountIthdDueTo = await LOTTERY.methods.amountIthdDueTo(account).call();

        if (
            amountBnbDueTo > 0 ||
            amountAyraDueTo > 0 ||
            amountIthdDueTo > 0
        ) {
            setWinningState(true);
        }
    }

    const handleClaim = async () => {
        if (!account) return notify('error', 'please connect your wallet');
        setLoading(true);

        const web3 = new Web3(library.provider);
        const LOTTERY = new web3.eth.Contract(
            Config.Lottery.abi as [],
            Config.Lottery.address as string
        )
        const ContractITHD = new web3.eth.Contract(
            Config.Token.ITHD.abi as [],
            Config.Token.ITHD.address as string
        );
        const balance = await ContractITHD.methods.balanceOf(Config.Lottery.address).call();

        try {
            await LOTTERY.methods
                .claim(
                )
                .send({ from: account })
                .on('receipt', function (receipt: any) {
                    setLoading(false);
                    handleCheckTicket();
                })
                .then((_tx: any) => {
                    notify('success', 'you have claimed now');
                })
        } catch (err: any) {
            setLoading(false);
            if (err.code == 4001) notify('error', err.message);
            else notify('error', 'Error claim');
            console.log('Error buy the ticket : ', err);
        }
        setModal(false);
        handleCheckTicket();
    }

    React.useEffect(() => {
        let token_price = 0;
        if (buyData.buyToken == tokenAddress[0]) token_price = Config.bnbTicketPrice;
        if (buyData.buyToken == tokenAddress[1]) token_price = Config.ayraTicketPrice;
        if (buyData.buyToken == tokenAddress[2]) token_price = Config.ithdTicketPrice;

        const tokenPrice = new BigNumber(token_price);
        const amount = new BigNumber(buyData.ticketAmount);
        const totalPrice = new BigNumber(tokenPrice).multipliedBy(amount).dividedBy(BIG_TEN.pow(18));

        setTotalPrice(new BigNumber(totalPrice));
    }, [buyData]);

    React.useEffect(() => {
        dispatch(actionGetLotteryList());
        dispatch(actionGetCurrentLotteryItem());
    }, []);

    React.useEffect(() => {
        if (lotteryList.length > 0) {
            loadPreviewLottery(lotteryList.length - 2);
        }
    }, [lotteryList]);

    React.useEffect(() => {
        if (currentLottery) {
            loadLastLottery(currentLottery);
        }
    }, [currentLottery]);

    React.useEffect(() => {
        if (ticketList) {
            const currentLotteryTickets = ticketList.filter((item: any) => item.lotteryId == currentLotteryData.lotteryId)
            setTickets(ticketList);
            setCurrentTickets(currentLotteryTickets);
        }
    }, [ticketList]);

    React.useEffect(() => {
        if (account) {
            dispatch(actionGetTicketList({ account }));
            handleCheckTicket();
            setCheckState(false);
        }
    }, [account]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            dispatch(actionGetCurrentLotteryItem());
        }, 10 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ height: 'calc(100vh - 80px)' }}>
            <HeaderSection>
                <div className='content'>
                    <div className='bg'></div>
                    <div className='title'>
                        The NFTMaigcs Lottery
                    </div>
                    <div className='price'>${totalUSD}</div>
                    <div className='text'>
                        in prizes!
                    </div>
                    <div className='action' onClick={handleOpen}>
                        <div className='action-btn'>
                            <button className=''>Buy Ticket</button>
                        </div>
                        <div className='action-bg'>
                            <svg viewBox="0 0 296 121" width="100%" color="text" xmlns="http://www.w3.org/2000/svg" className="sc-5a69fd5e-0 bcGsoh"><g filter="url(#filter0_dd_ticket_purchase_card)"><path d="M4 16C4 7.16344 11.1634 0 20 0H66V113H20C11.1634 113 4 105.837 4 97V16Z" fill="#FFB237"></path><path fillRule="evenodd" clipRule="evenodd" d="M69.4931 2.94568C68.9511 1.38001 67.6569 0 66 0V10H90V0C88.3431 0 87.0489 1.38001 86.5069 2.94568C85.2868 6.4696 81.9389 9 78 9C74.0611 9 70.7132 6.4696 69.4931 2.94568Z" fill="#FFB237"></path><rect x="66" y="10" width="10" height="93" fill="#FFB237"></rect><path d="M78 103V10" stroke="#FFB237" strokeWidth="4" strokeDasharray="4 4"></path><rect x="80" y="10" width="10" height="93" fill="#FFB237"></rect><path fillRule="evenodd" clipRule="evenodd" d="M69.4931 110.054C68.9511 111.62 67.6569 113 66 113V103H90V113C88.3431 113 87.0489 111.62 86.5069 110.054C85.2868 106.53 81.9389 104 78 104C74.0611 104 70.7132 106.53 69.4931 110.054Z" fill="#FFB237"></path><path d="M90 0H276C284.837 0 292 7.16344 292 16V97C292 105.837 284.837 113 276 113H90V0Z" fill="#FFB237"></path></g><defs><filter id="filter0_dd_ticket_purchase_card" x="0" y="0" width="296" height="121" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dx="2" dy="2"></feOffset><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.686275 0 0 0 0 0 0 0 0 1 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_ticket_purchase_card"></feBlend><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="4"></feOffset><feGaussianBlur stdDeviation="2"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix><feBlend mode="normal" in2="effect1_dropShadow_ticket_purchase_card" result="effect2_dropShadow_ticket_purchase_card"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_ticket_purchase_card" result="shape"></feBlend></filter></defs></svg>
                        </div>
                    </div>
                </div>
            </HeaderSection>
            <TicketSection>
                <div className='shape-content'>
                    <div className='clip-path'>
                        <svg width="0" height="0"><defs><clipPath id="topConcaveCurve" clipPathUnits="objectBoundingBox"><path d="M 0,0 L 0,1 L 1,1 L 1,0 C .75 1, .25 1, 0 0 Z"></path></clipPath></defs></svg>
                    </div>
                </div>
                <div className='content'>
                    <div className='buy-content'>
                        <h2 className='title'>Get yours tickets now!</h2>
                        <div className='draw-time'>
                            <div className='count-time'>
                                {countTime > 0 &&
                                    <Countdown
                                        date={countTime}
                                        renderer={renderer}
                                    />
                                }
                            </div>
                            <div className='text'>until the draw</div>
                        </div>
                    </div>
                    <div className='draw-dialog'>
                        <div className='dialog-title'>
                            <div className='left-title'>Next Draw</div>
                            <div className='right-date'>
                                <div>Draw:</div>
                                <div className='date-time'>{currentLotteryEndDate}</div>
                            </div>
                        </div>
                        <div className='dialog-content'>
                            <div className='buy-content'>
                                <div className='content-grid'>
                                    <div className='prize-title'>
                                        <div>Prize BNB Pot</div>
                                    </div>
                                    {currentLotteryData.totalAmountBNB > 0 ? (
                                        <div className='prize-pot'>
                                            <div>{currentLotteryData.totalAmountBNB / 1e18}</div>
                                            <div className='token-name'>BNB</div>
                                        </div>
                                    ) : (
                                        <div className='prize-empty'>
                                            <div>...</div>
                                        </div>
                                    )}
                                    <div className='prize-title'>
                                        <div>Prize AYRA Pot</div>
                                    </div>
                                    {currentLotteryData.totalAmountAYRA > 0 ? (
                                        <div className='prize-pot'>
                                            <div>{currentLotteryData.totalAmountAYRA / 1e18}</div>
                                            <div className='token-name'>AYRA</div>
                                        </div>
                                    ) : (
                                        <div className='prize-empty'>
                                            <div>...</div>
                                        </div>
                                    )}
                                    <div className='prize-title'>
                                        <div>Prize ITHD Pot</div>
                                    </div>
                                    {currentLotteryData.totalAmountITHD > 0 ? (
                                        <div className='prize-pot'>
                                            <div>{currentLotteryData.totalAmountITHD / 1e18}</div>
                                            <div className='token-name'>ITHD</div>
                                        </div>
                                    ) : (
                                        <div className='prize-empty'>
                                            <div>...</div>
                                        </div>
                                    )}
                                    <div className='ticket-title'>Your tickets</div>
                                    <div className='ticket-amount'>
                                        <div>You have</div>
                                        <div className='ticket-count'>{currentTickets.length}</div>
                                        <div>ticket this round</div>
                                    </div>
                                </div>
                            </div>
                            <div className='buy-action'>
                                <button onClick={handleOpen}>
                                    Buy Tickets
                                </button>
                            </div>
                        </div>
                        <div className='dialog-footer'>
                            <div className='dialog-detail' style={{ transition: 'all 0.3s ease 0s', ...(!detailState && { width: 0, display: 'none' }) }}>
                                <div>Match the winning number in the same order to share Prizes.</div>
                                <div className='detail-list'>
                                    <div className='detail-item'>
                                        <div className='ticket-number'>
                                            No.
                                        </div>
                                        <div className='ticket-id'>
                                            Ticket Number
                                        </div>
                                        <div className='buy-token'>
                                            Buy Token
                                        </div>
                                    </div>
                                    {
                                        currentTickets.map((ticket: any, key: any) => {
                                            return (
                                                <div key={key} className='detail-item'>
                                                    <div className='ticket-number'>
                                                        {key}
                                                    </div>
                                                    <div className='ticket-id'>
                                                        {ticket.ticketId}
                                                    </div>
                                                    <div className='buy-token'>
                                                        {ticket.buyToken == tokenAddress[0] && 'BNB'}
                                                        {ticket.buyToken == tokenAddress[1] && 'AYRA'}
                                                        {ticket.buyToken == tokenAddress[2] && 'ITHD'}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='dialog-action'>
                                <button onClick={handleDetail}>Detail</button>
                            </div>
                        </div>
                    </div>
                </div>
            </TicketSection>
            <CheckSection>
                {
                    checkState ? (
                        <>
                            {
                                winningState ? (
                                    <div className='check-content'>
                                        <div className='torn-left-image'>
                                            <img src={'/images/design/ticket-l.png'} />
                                        </div>
                                        <div className='check-body'>
                                            <div className='check-title'>
                                                <div>you win this lottery</div>
                                                <div>Butter luck next time!</div>
                                            </div>
                                            <div className='check-action'>
                                                <button onClick={handleClaim}>
                                                    Claim
                                                </button>
                                            </div>
                                        </div>
                                        <div className='torn-right-image'>
                                            <img src={'/images/design/ticket-r.png'} />
                                        </div>
                                    </div >
                                ) : (
                                    <div className='check-content'>
                                        <div className='torn-left-image'>
                                            <img src={'/images/design/torn-ticket-l.png'} />
                                        </div>
                                        <div className='check-body'>
                                            <div className='check-title'>
                                                <div>No prizes to collect...</div>
                                                <div>Butter luck next time!</div>
                                            </div>
                                            <div className='check-action'>
                                            </div>
                                        </div>
                                        <div className='torn-right-image'>
                                            <img src={'/images/design/torn-ticket-r.png'} />
                                        </div>
                                    </div >
                                )
                            }
                        </>
                    ) : (
                        <div className='check-content'>
                            <div className='left-image'>
                                <img src={'/images/design/ticket-l.png'} />
                            </div>
                            <div className='check-body'>
                                <div className='check-title'>Are you a winner?</div>
                                <div className='check-action'>
                                    <button onClick={handleCheckTicket}>
                                        Check tickets
                                    </button>
                                </div>
                            </div>
                            <div className='right-image'>
                                <img src={'/images/design/ticket-r.png'} />
                            </div>
                        </div>
                    )
                }
            </CheckSection >
            <FinishedRoundSection>
                <div className='round-content'>
                    <div className='round-title'>
                        Finished Rounds
                    </div>
                    <div className='round-switch'>
                        <button className={clsx('all history', historyActive == 'all' && 'active')} onClick={handleActiveHistory('all')}>
                            All history
                        </button>
                        <button className={clsx('yours history', historyActive == 'yours' && 'active')} onClick={handleActiveHistory('yours')}>
                            Your history
                        </button>
                    </div>
                    <div className={clsx('round-dialog-all', historyActive == 'all' && 'active')}>
                        <div className='round-dialog-title'>
                            <div className='round-count-detail'>
                                <div className='count-detail'>
                                    <div>Round</div>
                                    <div className='round-count'>{previewLotteryData.lotteryId}</div>
                                </div>
                                <div className='navigator'>
                                    <div className='prev-button' onClick={handlePrevLottery}>
                                        <ChevronLeftIcon />
                                    </div>
                                    <div className='next-button' onClick={handleNextLottery}>
                                        <ChevronRightIcon />
                                    </div>
                                </div>
                            </div>
                            <div className='round-date'>
                                {previewLotteryEndDate}
                            </div>
                        </div>
                        <div className='round-body'>
                            <div className='badge'>
                                Latest
                            </div>
                            <div className='level'>
                                <div className='ticket-id'>
                                    1.
                                </div>
                                <div className='ticket-address'>
                                    <CopyToClipboard text={previewLotteryData.firstWinnerAddress} >
                                        <Tooltip arrow title="Copy address">
                                            {
                                                previewLotteryData.firstWinnerAddress ? (
                                                    <div>
                                                        {previewLotteryData.firstWinnerAddress.substring(0, 10)} ... {previewLotteryData.firstWinnerAddress.substring(previewLotteryData.firstWinnerAddress.length - 10)}
                                                    </div>
                                                ) : (
                                                    <div></div>
                                                )
                                            }
                                        </Tooltip>
                                    </CopyToClipboard>
                                </div>
                                <div className='ticket-number'>
                                    <TicketNumber ticketId={previewLotteryData.firstTicketId.toString()} />
                                </div>
                            </div>
                            <div className='level'>
                                <div className='ticket-id'>
                                    2.
                                </div>
                                <div className='ticket-title'>
                                    <CopyToClipboard text={previewLotteryData.secondWinnerAddress} >
                                        <Tooltip arrow title="Copy address">
                                            {
                                                previewLotteryData.firstWinnerAddress ? (
                                                    <div>
                                                        {previewLotteryData.firstWinnerAddress.substring(0, 10)} ... {previewLotteryData.firstWinnerAddress.substring(previewLotteryData.firstWinnerAddress.length - 10)}
                                                    </div>
                                                ) : (
                                                    <div></div>
                                                )
                                            }
                                        </Tooltip>
                                    </CopyToClipboard>
                                </div>
                                <div className='ticket-number'>
                                    <TicketNumber ticketId={previewLotteryData.secondTicketId.toString()} />
                                </div>
                            </div>
                            <div className='level'>
                                <div className='ticket-id'>
                                    3.
                                </div>
                                <div className='ticket-title'>
                                    <CopyToClipboard text={previewLotteryData.thirdWinnerAddress} >
                                        <Tooltip arrow title="Copy address">
                                            {
                                                previewLotteryData.thirdWinnerAddress ? (
                                                    <div>
                                                        {previewLotteryData.thirdWinnerAddress.substring(0, 10)} ... {previewLotteryData.thirdWinnerAddress.substring(previewLotteryData.firstWinnerAddress.length - 10)}
                                                    </div>
                                                ) : (
                                                    <div></div>
                                                )
                                            }
                                        </Tooltip>
                                    </CopyToClipboard>
                                </div>
                                <div className='ticket-number'>
                                    <TicketNumber ticketId={previewLotteryData.thirdTicketId.toString()} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={clsx('round-dialog-yours', historyActive == 'yours' && 'active')}>
                        <div className='round-dialog-title'>
                            <div className='round-count-detail'>
                                <div className='count-detail'>
                                    <div>History</div>
                                </div>
                                <div className='navigator'>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                        <div className='round-body'>
                            <div className='detail-list'>
                                <div className='detail-item'>
                                    <div className='ticket-number'>
                                        No.
                                    </div>
                                    <div className='lottery-id'>
                                        lottery Number
                                    </div>
                                    <div className='ticket-id'>
                                        Ticket Number
                                    </div>
                                    <div className='buy-token'>
                                        Buy Token
                                    </div>
                                    <div className='winning'>
                                        winning
                                    </div>
                                </div>
                                {
                                    tickets.map((ticket: any, key: any) => {
                                        return (
                                            <div key={key} className='detail-item'>
                                                <div className='ticket-number'>
                                                    {key}
                                                </div>
                                                <div className='ticket-id'>
                                                    {ticket.lotteryId}
                                                </div>
                                                <div className='ticket-id'>
                                                    {ticket.ticketId}
                                                </div>
                                                <div className='buy-token'>
                                                    {ticket.buyToken == tokenAddress[0] && 'BNB'}
                                                    {ticket.buyToken == tokenAddress[1] && 'AYRA'}
                                                    {ticket.buyToken == tokenAddress[2] && 'ITHD'}
                                                </div>
                                                <div className='winning'>
                                                    {ticket.winning}
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </FinishedRoundSection>
            <HowPlaySection>
                <div className='shape-content'>
                    <div className='clip-path'>
                        <svg width="0" height="0"><defs><clipPath id="topConvexCurve" clipPathUnits="objectBoundingBox"><path d="M 0,1 L 0,0 L 1,0 L 1,1 C 0.75 0, .25 0, 0 1 Z"></path></clipPath></defs></svg>
                    </div>
                </div>
                <div className='content'>
                    <div className='header'>
                        <div className='title'>
                            How to Play
                        </div>
                        <div className='detail'>
                            If the digits on your tickets match the winning numbers in the correct order, you win a portion of the prize pool.
                        </div>
                    </div>
                    <div className='body'>
                        <div className='pannel'>
                            <div className='pannel-content'>
                                <div className='pannel-content-step'>
                                    step 1
                                </div>
                                <div className='pannel-content-title'>
                                    Buy Tickets
                                </div>
                                <div className='pannel-content-detail'>
                                    Prices are set when the round starts, equal to 5 USD in CAKE per ticket.
                                </div>
                            </div>
                        </div>
                        <div className='pannel'>
                            <div className='pannel-content'>
                                <div className='pannel-content-step'>
                                    step 2
                                </div>
                                <div className='pannel-content-title'>
                                    Wait for the Draw
                                </div>
                                <div className='pannel-content-detail'>
                                    There is one draw every day alternating between 0 AM UTC and 12 PM UTC
                                </div>
                            </div>
                        </div>
                        <div className='pannel'>
                            <div className='pannel-content'>
                                <div className='pannel-content-step'>
                                    step 3
                                </div>
                                <div className='pannel-content-title'>
                                    Check for Prizes
                                </div>
                                <div className='pannel-content-detail'>
                                    Once the round’s over, come back to the page and check to see if you’ve won!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </HowPlaySection>
            <Footer />
            <BuyModal
                fullScreen={fullScreen}
                open={modal}
                onClose={handleClose}
            >
                <div className='modal-body'>
                    <div className='modal-title'>
                        <div className='title'>
                            <h2>Buy Ticket</h2>
                        </div>
                        <button onClick={handleClose}>
                            <ClearIcon />
                        </button>
                    </div>
                    <div className="modal-content">
                        <div className='content-title'>
                            <div className='textSubtle'>
                                Buy:
                            </div>
                            <div className='ticket'>
                                <div className='text'>tickets</div>
                                <svg viewBox="0 0 80 80" color="text" width="20px" xmlns="http://www.w3.org/2000/svg" className="sc-5a69fd5e-0 bcGsoh"><path d="M76.2856 28.6526C77.0883 29.4553 77.1989 30.7184 76.548 31.6485C64.6385 48.6643 49.9116 63.5221 33.0019 75.5817L31.6665 76.5341C30.6872 77.2325 29.3467 77.121 28.4962 76.2705L22.4847 70.259C26.0334 66.5844 25.9945 60.7286 22.3678 57.1019C18.7411 53.4752 12.8853 53.4362 9.21067 56.985L3.68116 51.4555C2.62962 50.4039 2.77462 48.6597 3.98536 47.7962L5.32156 46.8433C21.8225 35.0751 36.1934 20.5765 47.815 3.97204C48.6291 2.80897 50.296 2.66297 51.2998 3.66682L56.9276 9.29459C53.3922 12.97 53.4356 18.8158 57.0578 22.438C60.6799 26.0601 66.5257 26.1035 70.2011 22.5681L76.2856 28.6526Z" fill="#DBCDF9"></path><path d="M78.9507 30.3151L57.459 57.5291L29.6615 78.5708L24.3156 73.1863L22.3868 70.8482L24.3156 68.0575L24.9915 65.2668L24.6194 62.29L23.5031 59.4993L21.6426 57.2668L19.4101 55.7784L16.9915 55.0342H14.0147L10.8519 56.1505L8.99148 57.8249L4.52637 52.4296L11.7898 51.3463C34.3187 47.9863 55.6053 38.8899 73.6048 24.9307L78.9507 30.3151Z" fill="#A28BD4"></path><path fillRule="evenodd" clipRule="evenodd" d="M19.7724 70.5193C19.7732 69.7287 20.0885 68.971 20.6487 68.4131L20.6586 68.4032C23.1622 65.8996 23.1622 61.8405 20.6586 59.3369C18.155 56.8333 14.0958 56.8333 11.5922 59.3369L11.5823 59.3468C11.0245 59.907 10.2667 60.2223 9.47617 60.2231C8.68561 60.2239 7.92718 59.9103 7.36817 59.3512L1.57656 53.5596C-0.776282 51.2068 -0.451848 47.304 2.25722 45.372L3.59342 44.419L5.32184 46.8426L3.98564 47.7955C2.7749 48.659 2.6299 50.4032 3.68144 51.4548L9.47304 57.2464L9.48735 57.232C9.49192 57.2275 9.49649 57.2229 9.50106 57.2183C13.1682 53.5659 19.1019 53.5705 22.7635 57.232C26.4247 60.8933 26.4295 66.8263 22.778 70.4936C22.7731 70.4984 22.7683 70.5033 22.7635 70.5081L22.7491 70.5224L28.4965 76.2698C29.347 77.1203 30.6875 77.2318 31.6668 76.5334L33.0022 75.581C49.9119 63.5214 64.6388 48.6636 76.5483 31.6478C77.1992 30.7178 77.0886 29.4546 76.2859 28.6519L70.2487 22.6148C70.2268 22.6371 70.2047 22.6594 70.1825 22.6816C70.1603 22.7038 70.138 22.7259 70.1156 22.7479C66.4445 26.3475 60.5503 26.3254 56.9064 22.6816C53.2625 19.0376 53.2405 13.1434 56.8404 9.47221C56.8623 9.44989 56.8843 9.42764 56.9064 9.40548C56.9286 9.38329 56.9509 9.36124 56.9733 9.33932L51.3001 3.66613C50.2962 2.66229 48.6293 2.80829 47.8153 3.97136C36.1937 20.5758 21.8228 35.0744 5.32184 46.8426L3.59342 44.419C19.8185 32.8476 33.9492 18.5913 45.3766 2.26445C47.252 -0.415092 51.0922 -0.751452 53.4049 1.56125L59.0781 7.23444C59.64 7.79626 59.9539 8.55937 59.95 9.35389C59.9461 10.1484 59.6247 10.9084 59.0574 11.4647C59.042 11.4798 59.0267 11.495 59.0113 11.5104C56.5077 14.014 56.5077 18.0731 59.0113 20.5767C61.5149 23.0803 65.5741 23.0803 68.0777 20.5767C68.0929 20.5615 68.1081 20.5461 68.1233 20.5306C68.6796 19.9633 69.4396 19.6419 70.2341 19.6381C71.0287 19.6342 71.7918 19.9481 72.3536 20.5099L78.3907 26.547C80.2148 28.3711 80.4662 31.2413 78.987 33.3547C66.8832 50.648 51.9161 65.7482 34.7306 78.0046L33.3952 78.9569C31.2319 80.4997 28.2705 80.2536 26.3916 78.3747L20.6442 72.6273C20.0852 72.0683 19.7715 71.3099 19.7724 70.5193Z" fill="#633001"></path><path fillRule="evenodd" clipRule="evenodd" d="M39.9888 14.0672L41.3044 15.3827C41.8856 15.964 41.8856 16.9064 41.3044 17.4876C40.7231 18.0688 39.7808 18.0688 39.1995 17.4876L37.884 16.1721C37.3027 15.5908 37.3027 14.6484 37.884 14.0672C38.4652 13.4859 39.4076 13.4859 39.9888 14.0672Z" fill="#633001"></path><path fillRule="evenodd" clipRule="evenodd" d="M45.5142 19.5926L46.8298 20.9081C47.411 21.4894 47.411 22.4317 46.8298 23.013C46.2485 23.5942 45.3062 23.5942 44.7249 23.013L43.4094 21.6974C42.8281 21.1162 42.8281 20.1738 43.4094 19.5926C43.9906 19.0113 44.933 19.0113 45.5142 19.5926Z" fill="#633001"></path><path fillRule="evenodd" clipRule="evenodd" d="M52.3542 28.5384C51.773 29.1196 50.8306 29.1196 50.2493 28.5384L48.6707 26.9597C48.0894 26.3785 48.0894 25.4361 48.6707 24.8549C49.2519 24.2736 50.1943 24.2736 50.7755 24.8549L52.3542 26.4335C52.9354 27.0148 52.9354 27.9571 52.3542 28.5384Z" fill="#633001"></path><path fillRule="evenodd" clipRule="evenodd" d="M57.8796 34.0638C57.2983 34.645 56.356 34.645 55.7747 34.0638L54.1961 32.4851C53.6148 31.9039 53.6148 30.9615 54.1961 30.3802C54.7773 29.799 55.7197 29.799 56.3009 30.3802L57.8796 31.9589C58.4608 32.5401 58.4608 33.4825 57.8796 34.0638Z" fill="#633001"></path><path fillRule="evenodd" clipRule="evenodd" d="M61.8267 35.9051L63.1423 37.2206C63.7235 37.8019 63.7235 38.7442 63.1423 39.3255C62.561 39.9067 61.6187 39.9067 61.0374 39.3255L59.7219 38.0099C59.1406 37.4287 59.1406 36.4863 59.7219 35.9051C60.3031 35.3238 61.2455 35.3238 61.8267 35.9051Z" fill="#633001"></path><path fillRule="evenodd" clipRule="evenodd" d="M67.3521 41.4305L68.6677 42.746C69.2489 43.3273 69.2489 44.2696 68.6677 44.8509C68.0864 45.4321 67.144 45.4321 66.5628 44.8509L65.2472 43.5353C64.666 42.9541 64.666 42.0117 65.2472 41.4305C65.8285 40.8492 66.7709 40.8492 67.3521 41.4305Z" fill="#633001"></path><path fillRule="evenodd" clipRule="evenodd" d="M32.2915 37.1288C30.6927 35.53 30.6927 32.9378 32.2915 31.3389C34.1033 29.5272 37.1152 29.806 38.5636 31.9196L42.2107 37.2416C45.3939 36.2204 48.7719 36.3559 51.0104 38.5945C53.0227 40.6067 53.3281 43.5721 52.6459 46.3981C51.9561 49.256 50.2117 52.2664 47.6467 54.8314C45.0817 57.3964 42.0713 59.1408 39.2134 59.8306C36.3874 60.5128 33.422 60.2073 31.4098 58.1951C29.1842 55.9696 29.0377 52.6168 30.0388 49.4519L24.694 45.7892C22.5804 44.3408 22.3016 41.3289 24.1134 39.5171C25.7122 37.9183 28.3044 37.9183 29.9032 39.5171L33.6067 43.2206C33.9734 42.7908 34.3625 42.3691 34.7735 41.9582C35.1704 41.5613 35.5772 41.1847 35.9918 40.8291L32.2915 37.1288Z" fill="#633001"></path><ellipse cx="36.9019" cy="50.5685" rx="1.79015" ry="2.60385" transform="rotate(-45 36.9019 50.5685)" fill="#DBCDF9"></ellipse><ellipse rx="1.79015" ry="2.60385" transform="matrix(0.707107 -0.707106 0.707107 0.707106 43.5768 43.8947)" fill="#DBCDF9"></ellipse></svg>
                            </div>
                        </div>
                        <div className='content-input'>
                            <div className='input-wraper'>
                                <div className='buyToken'>
                                    <TokenDropDownMenu buyData={buyData} setBuyData={setBuyData} />
                                </div>
                                <div>
                                    <div className='input-number'>
                                        <input min="0" max="10" step="0.25" disabled={loading} pattern="^[0-9]*[.,]?[0-9]{0,18}$" placeholder="0" value={buyData.ticketAmount} onChange={handleChangeNumber} />
                                    </div>
                                    <div className='textSubtle'>
                                        ~0.00
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='divider'></div>
                        <div className='content-detail'>
                            <div className='pay'>
                                <div className='textSubtle'>
                                    cost:
                                </div>
                                <div className='price'>
                                    <div className='text'>{totalPrice.toString()}</div>
                                </div>
                            </div>
                            <button className="buy-button" onClick={handleBuyTicket} disabled={loading} style={{ ...(loading && { opacity: 0.5 }) }}>Buy Ticket</button>
                            {loading && (
                                <CircularProgress className='loading' size={24} />
                            )}
                            <div className='description'>
                                "Buy Instantly" chooses random numbers, with no duplicates among your tickets. Prices are set before each round starts, equal to $5 at that time. Purchases are final.
                            </div>
                        </div>
                    </div>
                    <div className='modal-actions'>
                    </div>
                </div>
            </BuyModal>
            <ApproveTokenModal modal={approveModal} setModal={setApproveModal} approveTokenType={buyData.buyToken} onAddress={Config.Lottery.address} />
        </div >
    )
}

export default LotterySection;

const TokenDropDownMenu = ({ setBuyData, buyData }: { setBuyData?: any, buyData?: any }) => {
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState('BNB');

    const list = [
        { label: 'BNB', value: tokenAddress[0] },
        { label: 'AYRA', value: tokenAddress[1] },
        { label: 'ITHD', value: tokenAddress[2] },
    ]

    const handleClick = () => {
        setOpen(!open);
    }

    const handleSelect = (item: any) => () => {
        setText(item.label);
        setBuyData({ ...buyData, buyToken: item.value })
    }
    return (
        <DropdownMenu open={open} onClick={handleClick} >
            <button className='dropdownBtn'>
                <div>{text}</div>
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </button>
            <div className='subMenuContent'>
                <div className='submenu' >
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

const TicketNumber = ({ ticketId }: { ticketId: any }) => {
    
    const NumberImage = [
        <svg viewBox="0 0 32 32" width="100%" height="100%" color="text" xmlns="http://www.w3.org/2000/svg" className="sc-5a69fd5e-0 bcGsoh"><circle cx="16" cy="16" r="16" fill="#D750B2"></circle><g opacity="0.1"><path fillRule="evenodd" clipRule="evenodd" d="M24.3428 3.13232C28.9191 8.87177 28.5505 17.2573 23.2373 22.5706C17.528 28.2799 8.27148 28.2799 2.56223 22.5706C2.2825 22.2909 2.01648 22.0026 1.76416 21.7067C4.02814 27.3486 9.54881 31.3326 16 31.3326C24.4683 31.3326 31.3332 24.4677 31.3332 15.9994C31.3332 10.6078 28.5504 5.8661 24.3428 3.13232Z" fill="black"></path></g><g opacity="0.1" ><path fillRule="evenodd" clipRule="evenodd" d="M25.7713 4.18262C30.6308 10.2119 30.2607 19.061 24.6609 24.6608C19.0615 30.2602 10.2132 30.6307 4.18396 25.7722C6.99643 29.1689 11.2455 31.3329 16 31.3329C24.4683 31.3329 31.3332 24.468 31.3332 15.9997C31.3332 11.2446 29.1687 6.99508 25.7713 4.18262Z" fill="black"></path></g><g><path fillRule="evenodd" clipRule="evenodd" d="M3.48969 24.8677C0.151051 18.7651 0.974979 11.0636 6.01931 6.01927C11.0639 0.974682 18.7659 0.15093 24.8687 3.49016C22.365 1.71201 19.3046 0.666603 16 0.666603C7.53165 0.666603 0.666733 7.53152 0.666733 15.9998C0.666733 19.3041 1.7119 22.3642 3.48969 24.8677Z" fill="white"></path></g><g><path fillRule="evenodd" clipRule="evenodd" d="M2.10075 9.5143C3.77271 5.93677 6.78528 3.11129 10.4921 1.68422C10.546 1.73235 10.5987 1.78219 10.6502 1.83374C12.4838 3.66728 10.9119 5.7442 8.66145 7.99465C6.411 10.2451 4.33417 11.8169 2.50064 9.98335C2.35338 9.83609 2.22013 9.6793 2.10075 9.5143Z" fill="white"></path></g></svg>,
        <svg viewBox="0 0 32 32" width="100%" height="100%" color="text" xmlns="http://www.w3.org/2000/svg" className="sc-5a69fd5e-0 bcGsoh"><circle cx="16" cy="16" r="16" fill="#A881FC"></circle><g opacity="0.1"><path fillRule="evenodd" clipRule="evenodd" d="M24.3428 3.13232C28.9191 8.87177 28.5505 17.2573 23.2373 22.5706C17.528 28.2799 8.27148 28.2799 2.56223 22.5706C2.2825 22.2909 2.01648 22.0026 1.76416 21.7067C4.02814 27.3486 9.54881 31.3326 16 31.3326C24.4683 31.3326 31.3332 24.4677 31.3332 15.9994C31.3332 10.6078 28.5504 5.8661 24.3428 3.13232Z" fill="black"></path></g><g opacity="0.1"><path fillRule="evenodd" clipRule="evenodd" d="M25.7713 4.18262C30.6308 10.2119 30.2607 19.061 24.6609 24.6608C19.0615 30.2602 10.2132 30.6307 4.18396 25.7722C6.99643 29.1689 11.2455 31.3329 16 31.3329C24.4683 31.3329 31.3332 24.468 31.3332 15.9997C31.3332 11.2446 29.1687 6.99508 25.7713 4.18262Z" fill="black"></path></g><g><path fillRule="evenodd" clipRule="evenodd" d="M3.48969 24.8677C0.151051 18.7651 0.974979 11.0636 6.01931 6.01927C11.0639 0.974682 18.7659 0.15093 24.8687 3.49016C22.365 1.71201 19.3046 0.666603 16 0.666603C7.53165 0.666603 0.666733 7.53152 0.666733 15.9998C0.666733 19.3041 1.7119 22.3642 3.48969 24.8677Z" fill="white"></path></g><g><path fillRule="evenodd" clipRule="evenodd" d="M2.10075 9.5143C3.77271 5.93677 6.78528 3.11129 10.4921 1.68422C10.546 1.73235 10.5987 1.78219 10.6502 1.83374C12.4838 3.66728 10.9119 5.7442 8.66145 7.99465C6.411 10.2451 4.33417 11.8169 2.50064 9.98335C2.35338 9.83609 2.22013 9.6793 2.10075 9.5143Z" fill="white"></path></g></svg>,
        <svg viewBox="0 0 32 32" width="100%" height="100%" color="text" xmlns="http://www.w3.org/2000/svg" className="sc-5a69fd5e-0 bcGsoh"><circle cx="16" cy="16" r="16" fill="#1FC7D4"></circle><g opacity="0.1"><path fillRule="evenodd" clipRule="evenodd" d="M24.3428 3.13232C28.9191 8.87177 28.5505 17.2573 23.2373 22.5706C17.528 28.2799 8.27148 28.2799 2.56223 22.5706C2.2825 22.2909 2.01648 22.0026 1.76416 21.7067C4.02814 27.3486 9.54881 31.3326 16 31.3326C24.4683 31.3326 31.3332 24.4677 31.3332 15.9994C31.3332 10.6078 28.5504 5.8661 24.3428 3.13232Z" fill="black"></path></g><g opacity="0.1" ><path fillRule="evenodd" clipRule="evenodd" d="M25.7713 4.18262C30.6308 10.2119 30.2607 19.061 24.6609 24.6608C19.0615 30.2602 10.2132 30.6307 4.18396 25.7722C6.99643 29.1689 11.2455 31.3329 16 31.3329C24.4683 31.3329 31.3332 24.468 31.3332 15.9997C31.3332 11.2446 29.1687 6.99508 25.7713 4.18262Z" fill="black"></path></g><g><path fillRule="evenodd" clipRule="evenodd" d="M3.48969 24.8677C0.151051 18.7651 0.974979 11.0636 6.01931 6.01927C11.0639 0.974682 18.7659 0.15093 24.8687 3.49016C22.365 1.71201 19.3046 0.666603 16 0.666603C7.53165 0.666603 0.666733 7.53152 0.666733 15.9998C0.666733 19.3041 1.7119 22.3642 3.48969 24.8677Z" fill="white"></path></g><g><path fillRule="evenodd" clipRule="evenodd" d="M2.10075 9.5143C3.77271 5.93677 6.78528 3.11129 10.4921 1.68422C10.546 1.73235 10.5987 1.78219 10.6502 1.83374C12.4838 3.66728 10.9119 5.7442 8.66145 7.99465C6.411 10.2451 4.33417 11.8169 2.50064 9.98335C2.35338 9.83609 2.22013 9.6793 2.10075 9.5143Z" fill="white"></path></g></svg>,
        <svg viewBox="0 0 32 32" width="100%" height="100%" color="text" xmlns="http://www.w3.org/2000/svg" className="sc-5a69fd5e-0 bcGsoh"><circle cx="16" cy="16" r="16" fill="#93D45A"></circle><g opacity="0.1"><path fillRule="evenodd" clipRule="evenodd" d="M24.3428 3.13232C28.9191 8.87177 28.5505 17.2573 23.2373 22.5706C17.528 28.2799 8.27148 28.2799 2.56223 22.5706C2.2825 22.2909 2.01648 22.0026 1.76416 21.7067C4.02814 27.3486 9.54881 31.3326 16 31.3326C24.4683 31.3326 31.3332 24.4677 31.3332 15.9994C31.3332 10.6078 28.5504 5.8661 24.3428 3.13232Z" fill="black"></path></g><g opacity="0.1"><path fillRule="evenodd" clipRule="evenodd" d="M25.7713 4.18262C30.6308 10.2119 30.2607 19.061 24.6609 24.6608C19.0615 30.2602 10.2132 30.6307 4.18396 25.7722C6.99643 29.1689 11.2455 31.3329 16 31.3329C24.4683 31.3329 31.3332 24.468 31.3332 15.9997C31.3332 11.2446 29.1687 6.99508 25.7713 4.18262Z" fill="black"></path></g><g><path fillRule="evenodd" clipRule="evenodd" d="M3.48969 24.8677C0.151051 18.7651 0.974979 11.0636 6.01931 6.01927C11.0639 0.974682 18.7659 0.15093 24.8687 3.49016C22.365 1.71201 19.3046 0.666603 16 0.666603C7.53165 0.666603 0.666733 7.53152 0.666733 15.9998C0.666733 19.3041 1.7119 22.3642 3.48969 24.8677Z" fill="white"></path></g><g><path fillRule="evenodd" clipRule="evenodd" d="M2.10075 9.5143C3.77271 5.93677 6.78528 3.11129 10.4921 1.68422C10.546 1.73235 10.5987 1.78219 10.6502 1.83374C12.4838 3.66728 10.9119 5.7442 8.66145 7.99465C6.411 10.2451 4.33417 11.8169 2.50064 9.98335C2.35338 9.83609 2.22013 9.6793 2.10075 9.5143Z" fill="white"></path></g></svg>,
        <svg viewBox="0 0 32 32" width="100%" height="100%" color="text" xmlns="http://www.w3.org/2000/svg" className="sc-5a69fd5e-0 bcGsoh"><circle cx="16" cy="16" r="16" fill="#FFC43C"></circle><g opacity="0.1"><path fillRule="evenodd" clipRule="evenodd" d="M24.3428 3.13245C28.9191 8.87189 28.5505 17.2575 23.2373 22.5707C17.528 28.28 8.27148 28.28 2.56223 22.5707C2.2825 22.291 2.01648 22.0028 1.76416 21.7068C4.02814 27.3487 9.54881 31.3327 16 31.3327C24.4683 31.3327 31.3332 24.4678 31.3332 15.9995C31.3332 10.6079 28.5504 5.86622 24.3428 3.13245Z" fill="black"></path></g><g opacity="0.1"><path fillRule="evenodd" clipRule="evenodd" d="M25.7714 4.18262C30.6309 10.2119 30.2608 19.061 24.661 24.6608C19.0616 30.2602 10.2134 30.6307 4.18408 25.7722C6.99655 29.1689 11.2456 31.3329 16.0001 31.3329C24.4685 31.3329 31.3334 24.468 31.3334 15.9997C31.3334 11.2446 29.1689 6.99508 25.7714 4.18262Z" fill="black"></path></g><g><path fillRule="evenodd" clipRule="evenodd" d="M3.48969 24.8677C0.151051 18.7651 0.974979 11.0636 6.01931 6.01927C11.0639 0.974682 18.7659 0.15093 24.8687 3.49016C22.365 1.71201 19.3046 0.666603 16 0.666603C7.53165 0.666603 0.666733 7.53152 0.666733 15.9998C0.666733 19.3041 1.7119 22.3642 3.48969 24.8677Z" fill="white"></path></g><g><path fillRule="evenodd" clipRule="evenodd" d="M2.10087 9.51443C3.77283 5.93689 6.78541 3.11142 10.4922 1.68435C10.5461 1.73247 10.5988 1.78231 10.6504 1.83387C12.4839 3.6674 10.912 5.74432 8.66157 7.99477C6.41112 10.2452 4.33429 11.817 2.50076 9.98347C2.3535 9.83621 2.22025 9.67943 2.10087 9.51443Z" fill="white"></path></g></svg>
    ]
    const ImageDirection = [
        'number',
        'number-left',
        'number-right',
    ]

    const NumberComponent = ({ number }: { number: any }) => {
        if (number == '') number = 0;
        return (
            <div className='number-item'>
                {NumberImage[number % 5]}
                <div className='number-bg'>
                    <div className={ImageDirection[number % 3]}>{number}</div>
                </div>
            </div>
        )
    }

    const numberLength = ticketId.length;
    switch (numberLength) {
        case 1: ticketId = '0000' + ticketId; break;
        case 2: ticketId = '000' + ticketId; break;
        case 3: ticketId = '00' + ticketId; break;
        case 4: ticketId = '0' + ticketId; break;
        default: ticketId;
    }
    
    return (
        <>
            <NumberComponent number={ticketId.slice(0, 1)} />
            <NumberComponent number={ticketId.slice(1, 2)} />
            <NumberComponent number={ticketId.slice(2, 3)} />
            <NumberComponent number={ticketId.slice(3, 4)} />
            <NumberComponent number={ticketId.slice(4, 5)} />
        </>
    )
}