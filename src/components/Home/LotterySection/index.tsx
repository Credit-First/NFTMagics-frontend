import * as React from 'react';
import Footer from '@/components/Footer';
import { HeaderSection, TicketSection, CheckSection, FinishedRoundSection, HowPlaySection } from './styles';

const LotterySection = () => {
    return (
        <div style={{ height: 'calc(100vh - 80px)' }}>
            <HeaderSection>
                <div className='content'>
                    <div className='bg'></div>
                    <div className='title'>
                        The NFTMaigcs Lottery
                    </div>
                    <div className='price'>$217,439</div>
                    <div className='text'>
                        in prizes!
                    </div>
                    <div className='action'>
                        <div className='action-btn'>
                            <button className=''>Buy Ticket</button>
                        </div>
                        <div className='action-bg'>
                            <svg viewBox="0 0 296 121" width="100%" color="text" xmlns="http://www.w3.org/2000/svg" className="sc-5a69fd5e-0 bcGsoh"><g filter="url(#filter0_dd_ticket_purchase_card)"><path d="M4 16C4 7.16344 11.1634 0 20 0H66V113H20C11.1634 113 4 105.837 4 97V16Z" fill="#FFB237"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M69.4931 2.94568C68.9511 1.38001 67.6569 0 66 0V10H90V0C88.3431 0 87.0489 1.38001 86.5069 2.94568C85.2868 6.4696 81.9389 9 78 9C74.0611 9 70.7132 6.4696 69.4931 2.94568Z" fill="#FFB237"></path><rect x="66" y="10" width="10" height="93" fill="#FFB237"></rect><path d="M78 103V10" stroke="#FFB237" stroke-width="4" stroke-dasharray="4 4"></path><rect x="80" y="10" width="10" height="93" fill="#FFB237"></rect><path fill-rule="evenodd" clip-rule="evenodd" d="M69.4931 110.054C68.9511 111.62 67.6569 113 66 113V103H90V113C88.3431 113 87.0489 111.62 86.5069 110.054C85.2868 106.53 81.9389 104 78 104C74.0611 104 70.7132 106.53 69.4931 110.054Z" fill="#FFB237"></path><path d="M90 0H276C284.837 0 292 7.16344 292 16V97C292 105.837 284.837 113 276 113H90V0Z" fill="#FFB237"></path></g><defs><filter id="filter0_dd_ticket_purchase_card" x="0" y="0" width="296" height="121" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dx="2" dy="2"></feOffset><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.686275 0 0 0 0 0 0 0 0 1 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_ticket_purchase_card"></feBlend><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix><feOffset dy="4"></feOffset><feGaussianBlur stdDeviation="2"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix><feBlend mode="normal" in2="effect1_dropShadow_ticket_purchase_card" result="effect2_dropShadow_ticket_purchase_card"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_ticket_purchase_card" result="shape"></feBlend></filter></defs></svg>
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
                            <div className='time'>
                                <span className='time-value'>1</span>
                                <span className='time-hour'>h</span>
                                <span className='time-value'>57</span>
                                <span className='time-hour'>m</span>
                            </div>
                            <div className='text'>until the draw</div>
                        </div>
                    </div>
                    <div className='draw-dialog'>
                        <div className='dialog-title'>
                            <div className='left-title'>Next Draw</div>
                            <div className='right-date'>Draw: Mar 20, 2022, 10:00 PM</div>
                        </div>
                        <div className='dialog-content'>
                            <div className='buy-content'>
                                <div className='content-grid'>
                                    <div className='prize-title'>
                                        <div>Prize Pot</div>
                                    </div>
                                    <div className='prize-pot'>
                                        <div>~$25,235</div>
                                    </div>
                                    <div className='ticket-title'>Your tickets</div>
                                    <div className='ticket-pot'>You have 0 ticket this round</div>
                                </div>
                            </div>
                            <div className='buy-action'>
                                <button>
                                    Buy Tickets
                                </button>
                            </div>
                        </div>
                        <div className='dialog-footer'>
                            <div className='dialog-detail'>
                                Match the winning number in the same order to share prizes. Current prizes up for grabs:
                            </div>
                            <div className='dialog-action'>
                                <button>Detail</button>
                            </div>
                        </div>
                    </div>
                </div>
            </TicketSection>
            <CheckSection>
                <div className='check-content'>
                    <div className='left-image'>
                        <img src={'/images/design/ticket-l.png'} />
                    </div>
                    <div className='check-body'>
                        <div className='check-title'>Are you a winner?</div>
                        <div className='check-action'>
                            <button>
                                Check tickets
                            </button>
                        </div>
                    </div>
                    <div className='right-image'>
                        <img src={'/images/design/ticket-r.png'} />
                    </div>
                </div>
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
                </div>
            </CheckSection>
            <FinishedRoundSection>
                <div className='round-content'>
                    <div className='round-title'>
                        Finished Rounds
                    </div>
                    <div className='round-switch'>
                        <button className='all-history'>
                            All history
                        </button>
                        <button className='your-history'>
                            Your history
                        </button>
                    </div>
                    <div className='round-dialog'>
                        <div className='round-dialog-title'>
                            <div className='round-count-detail'>
                                <div className='count-detail'>
                                    <div>Round</div>
                                    <div className='round-count'>478</div>
                                </div>
                                <div className='navigator'>
                                    <div></div>
                                </div>
                            </div>
                            <div className='round-date'>
                                Mar 20, 2022, 10:00 PM
                            </div>
                        </div>
                        <div className='round-body'>
                            <div className='badge'>
                                Latest
                            </div>
                            <div className='body-title'>
                                Winning Number
                            </div>
                            <div className='body-number'>
                                <div className='number-item'>
                                    <svg viewBox="0 0 32 32" width="100%" height="100%" color="text" xmlns="http://www.w3.org/2000/svg" className="sc-5a69fd5e-0 bcGsoh"><circle cx="16" cy="16" r="16" fill="#D750B2"></circle><g opacity="0.1"><path fill-rule="evenodd" clip-rule="evenodd" d="M24.3428 3.13232C28.9191 8.87177 28.5505 17.2573 23.2373 22.5706C17.528 28.2799 8.27148 28.2799 2.56223 22.5706C2.2825 22.2909 2.01648 22.0026 1.76416 21.7067C4.02814 27.3486 9.54881 31.3326 16 31.3326C24.4683 31.3326 31.3332 24.4677 31.3332 15.9994C31.3332 10.6078 28.5504 5.8661 24.3428 3.13232Z" fill="black"></path></g><g opacity="0.1" ><path fill-rule="evenodd" clip-rule="evenodd" d="M25.7713 4.18262C30.6308 10.2119 30.2607 19.061 24.6609 24.6608C19.0615 30.2602 10.2132 30.6307 4.18396 25.7722C6.99643 29.1689 11.2455 31.3329 16 31.3329C24.4683 31.3329 31.3332 24.468 31.3332 15.9997C31.3332 11.2446 29.1687 6.99508 25.7713 4.18262Z" fill="black"></path></g><g><path fill-rule="evenodd" clip-rule="evenodd" d="M3.48969 24.8677C0.151051 18.7651 0.974979 11.0636 6.01931 6.01927C11.0639 0.974682 18.7659 0.15093 24.8687 3.49016C22.365 1.71201 19.3046 0.666603 16 0.666603C7.53165 0.666603 0.666733 7.53152 0.666733 15.9998C0.666733 19.3041 1.7119 22.3642 3.48969 24.8677Z" fill="white"></path></g><g><path fillRule="evenodd" clip-rule="evenodd" d="M2.10075 9.5143C3.77271 5.93677 6.78528 3.11129 10.4921 1.68422C10.546 1.73235 10.5987 1.78219 10.6502 1.83374C12.4838 3.66728 10.9119 5.7442 8.66145 7.99465C6.411 10.2451 4.33417 11.8169 2.50064 9.98335C2.35338 9.83609 2.22013 9.6793 2.10075 9.5143Z" fill="white"></path></g></svg>
                                    <div className='number-bg'>
                                        <div className='number-left'>9</div>
                                    </div>
                                </div>
                                <div className='number-item'>
                                    <svg viewBox="0 0 32 32" width="100%" height="100%" color="text" xmlns="http://www.w3.org/2000/svg" className="sc-5a69fd5e-0 bcGsoh"><circle cx="16" cy="16" r="16" fill="#A881FC"></circle><g opacity="0.1"><path fill-rule="evenodd" clip-rule="evenodd" d="M24.3428 3.13232C28.9191 8.87177 28.5505 17.2573 23.2373 22.5706C17.528 28.2799 8.27148 28.2799 2.56223 22.5706C2.2825 22.2909 2.01648 22.0026 1.76416 21.7067C4.02814 27.3486 9.54881 31.3326 16 31.3326C24.4683 31.3326 31.3332 24.4677 31.3332 15.9994C31.3332 10.6078 28.5504 5.8661 24.3428 3.13232Z" fill="black"></path></g><g opacity="0.1"><path fill-rule="evenodd" clip-rule="evenodd" d="M25.7713 4.18262C30.6308 10.2119 30.2607 19.061 24.6609 24.6608C19.0615 30.2602 10.2132 30.6307 4.18396 25.7722C6.99643 29.1689 11.2455 31.3329 16 31.3329C24.4683 31.3329 31.3332 24.468 31.3332 15.9997C31.3332 11.2446 29.1687 6.99508 25.7713 4.18262Z" fill="black"></path></g><g><path fill-rule="evenodd" clip-rule="evenodd" d="M3.48969 24.8677C0.151051 18.7651 0.974979 11.0636 6.01931 6.01927C11.0639 0.974682 18.7659 0.15093 24.8687 3.49016C22.365 1.71201 19.3046 0.666603 16 0.666603C7.53165 0.666603 0.666733 7.53152 0.666733 15.9998C0.666733 19.3041 1.7119 22.3642 3.48969 24.8677Z" fill="white"></path></g><g><path fill-rule="evenodd" clip-rule="evenodd" d="M2.10075 9.5143C3.77271 5.93677 6.78528 3.11129 10.4921 1.68422C10.546 1.73235 10.5987 1.78219 10.6502 1.83374C12.4838 3.66728 10.9119 5.7442 8.66145 7.99465C6.411 10.2451 4.33417 11.8169 2.50064 9.98335C2.35338 9.83609 2.22013 9.6793 2.10075 9.5143Z" fill="white"></path></g></svg>
                                    <div className='number-bg'>
                                        <div className='number-right'>5</div>
                                    </div>
                                </div>
                                <div className='number-item'>
                                    <svg viewBox="0 0 32 32" width="100%" height="100%" color="text" xmlns="http://www.w3.org/2000/svg" className="sc-5a69fd5e-0 bcGsoh"><circle cx="16" cy="16" r="16" fill="#1FC7D4"></circle><g opacity="0.1"><path fill-rule="evenodd" clip-rule="evenodd" d="M24.3428 3.13232C28.9191 8.87177 28.5505 17.2573 23.2373 22.5706C17.528 28.2799 8.27148 28.2799 2.56223 22.5706C2.2825 22.2909 2.01648 22.0026 1.76416 21.7067C4.02814 27.3486 9.54881 31.3326 16 31.3326C24.4683 31.3326 31.3332 24.4677 31.3332 15.9994C31.3332 10.6078 28.5504 5.8661 24.3428 3.13232Z" fill="black"></path></g><g opacity="0.1" ><path fill-rule="evenodd" clip-rule="evenodd" d="M25.7713 4.18262C30.6308 10.2119 30.2607 19.061 24.6609 24.6608C19.0615 30.2602 10.2132 30.6307 4.18396 25.7722C6.99643 29.1689 11.2455 31.3329 16 31.3329C24.4683 31.3329 31.3332 24.468 31.3332 15.9997C31.3332 11.2446 29.1687 6.99508 25.7713 4.18262Z" fill="black"></path></g><g><path fill-rule="evenodd" clip-rule="evenodd" d="M3.48969 24.8677C0.151051 18.7651 0.974979 11.0636 6.01931 6.01927C11.0639 0.974682 18.7659 0.15093 24.8687 3.49016C22.365 1.71201 19.3046 0.666603 16 0.666603C7.53165 0.666603 0.666733 7.53152 0.666733 15.9998C0.666733 19.3041 1.7119 22.3642 3.48969 24.8677Z" fill="white"></path></g><g><path fill-rule="evenodd" clip-rule="evenodd" d="M2.10075 9.5143C3.77271 5.93677 6.78528 3.11129 10.4921 1.68422C10.546 1.73235 10.5987 1.78219 10.6502 1.83374C12.4838 3.66728 10.9119 5.7442 8.66145 7.99465C6.411 10.2451 4.33417 11.8169 2.50064 9.98335C2.35338 9.83609 2.22013 9.6793 2.10075 9.5143Z" fill="white"></path></g></svg>
                                    <div className='number-bg'>
                                        <div className='number'>9</div>
                                    </div>
                                </div>
                                <div className='number-item'>
                                    <svg viewBox="0 0 32 32" width="100%" height="100%" color="text" xmlns="http://www.w3.org/2000/svg" className="sc-5a69fd5e-0 bcGsoh"><circle cx="16" cy="16" r="16" fill="#93D45A"></circle><g opacity="0.1"><path fill-rule="evenodd" clip-rule="evenodd" d="M24.3428 3.13232C28.9191 8.87177 28.5505 17.2573 23.2373 22.5706C17.528 28.2799 8.27148 28.2799 2.56223 22.5706C2.2825 22.2909 2.01648 22.0026 1.76416 21.7067C4.02814 27.3486 9.54881 31.3326 16 31.3326C24.4683 31.3326 31.3332 24.4677 31.3332 15.9994C31.3332 10.6078 28.5504 5.8661 24.3428 3.13232Z" fill="black"></path></g><g opacity="0.1"><path fill-rule="evenodd" clip-rule="evenodd" d="M25.7713 4.18262C30.6308 10.2119 30.2607 19.061 24.6609 24.6608C19.0615 30.2602 10.2132 30.6307 4.18396 25.7722C6.99643 29.1689 11.2455 31.3329 16 31.3329C24.4683 31.3329 31.3332 24.468 31.3332 15.9997C31.3332 11.2446 29.1687 6.99508 25.7713 4.18262Z" fill="black"></path></g><g><path fill-rule="evenodd" clip-rule="evenodd" d="M3.48969 24.8677C0.151051 18.7651 0.974979 11.0636 6.01931 6.01927C11.0639 0.974682 18.7659 0.15093 24.8687 3.49016C22.365 1.71201 19.3046 0.666603 16 0.666603C7.53165 0.666603 0.666733 7.53152 0.666733 15.9998C0.666733 19.3041 1.7119 22.3642 3.48969 24.8677Z" fill="white"></path></g><g><path fill-rule="evenodd" clip-rule="evenodd" d="M2.10075 9.5143C3.77271 5.93677 6.78528 3.11129 10.4921 1.68422C10.546 1.73235 10.5987 1.78219 10.6502 1.83374C12.4838 3.66728 10.9119 5.7442 8.66145 7.99465C6.411 10.2451 4.33417 11.8169 2.50064 9.98335C2.35338 9.83609 2.22013 9.6793 2.10075 9.5143Z" fill="white"></path></g></svg>
                                    <div className='number-bg'>
                                        <div className='number-right'>0</div>
                                    </div>
                                </div>
                                <div className='number-item'>
                                    <svg viewBox="0 0 32 32" width="100%" height="100%" color="text" xmlns="http://www.w3.org/2000/svg" className="sc-5a69fd5e-0 bcGsoh"><circle cx="16" cy="16" r="16" fill="#FFC43C"></circle><g opacity="0.1"><path fill-rule="evenodd" clip-rule="evenodd" d="M24.3428 3.13245C28.9191 8.87189 28.5505 17.2575 23.2373 22.5707C17.528 28.28 8.27148 28.28 2.56223 22.5707C2.2825 22.291 2.01648 22.0028 1.76416 21.7068C4.02814 27.3487 9.54881 31.3327 16 31.3327C24.4683 31.3327 31.3332 24.4678 31.3332 15.9995C31.3332 10.6079 28.5504 5.86622 24.3428 3.13245Z" fill="black"></path></g><g opacity="0.1"><path fill-rule="evenodd" clip-rule="evenodd" d="M25.7714 4.18262C30.6309 10.2119 30.2608 19.061 24.661 24.6608C19.0616 30.2602 10.2134 30.6307 4.18408 25.7722C6.99655 29.1689 11.2456 31.3329 16.0001 31.3329C24.4685 31.3329 31.3334 24.468 31.3334 15.9997C31.3334 11.2446 29.1689 6.99508 25.7714 4.18262Z" fill="black"></path></g><g><path fill-rule="evenodd" clip-rule="evenodd" d="M3.48969 24.8677C0.151051 18.7651 0.974979 11.0636 6.01931 6.01927C11.0639 0.974682 18.7659 0.15093 24.8687 3.49016C22.365 1.71201 19.3046 0.666603 16 0.666603C7.53165 0.666603 0.666733 7.53152 0.666733 15.9998C0.666733 19.3041 1.7119 22.3642 3.48969 24.8677Z" fill="white"></path></g><g><path fill-rule="evenodd" clip-rule="evenodd" d="M2.10087 9.51443C3.77283 5.93689 6.78541 3.11142 10.4922 1.68435C10.5461 1.73247 10.5988 1.78231 10.6504 1.83387C12.4839 3.6674 10.912 5.74432 8.66157 7.99477C6.41112 10.2452 4.33429 11.817 2.50076 9.98347C2.3535 9.83621 2.22025 9.67943 2.10087 9.51443Z" fill="white"></path></g></svg>
                                    <div className='number-bg'>
                                        <div className='number-left'>5</div>
                                    </div>
                                </div>
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
        </div>
    )
}

export default LotterySection;