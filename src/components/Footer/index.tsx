import * as React from 'react';
import { Section } from './styles';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import SickIcon from '@mui/icons-material/Sick';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function Footer() {

    return (
        <Section>
            <div className='footer-container'>
                <div className='footer-row'>
                    <div className='footer-left'>
                        <div className='footer-section-header'>Stay in the loop</div>
                        <div className='footer-text'>
                            Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating OpenSea.
                        </div>
                        <form className='form-footer'>
                            <div>
                                <div className='form-error'></div>
                                <div className='form-input'>
                                    <input className='form-input-text' aria-invalid="false" placeholder="Your email address" name="email" />
                                </div>
                            </div>
                            <button className='submitBtn'>Sign Up</button>
                        </form>
                    </div>
                    <div className='footer-right'>
                        <div className='footer-section-header'>Join the community</div>
                        <div className='footer-text'>
                            <button className='subBtn'><TwitterIcon /></button>
                            <button className='subBtn'><InstagramIcon /></button>
                            <button className='subBtn'><SickIcon /></button>
                            <button className='subBtn'><SlideshowIcon /></button>
                            <button className='subBtn'><MailOutlineIcon /></button>
                        </div>
                    </div>
                </div>
                <div className='footer-link'>
                    <div className='footer-com'>© 2022 Networks, Inc</div>
                    <div className='footer-sublnk'>
                        <a className='mr-2' href="/privacy">Privacy Policy</a>
                        <a href="/tos">Terms of Service</a>
                    </div>
                </div>
            </div>
        </Section>
    )
}