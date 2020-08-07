import Container from '@material-ui/core/Container';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import paymentMethod from '../../assets/img/payment-method.png';
import social from '../../assets/img/social.png';
import { Link } from '@material-ui/core';

export default function Footer() {
  return (
    <footer className='primary-footer'>
      <Container maxWidth='lg'>
        <div className='primary-footer--wrap'>
          <div className='primary-footer--col'>
            <h4>Policy Info</h4>
            <ul>
              <li>
                <Link to='/'>Privacy Policy</Link>
              </li>
              <li>
                <Link to='/'>Terms of Sale</Link>
              </li>
              <li>
                <Link to='/'>Terms of Use</Link>
              </li>
              <li>
                <Link to='/'>Report Absue </Link>
              </li>
              <li>
                <Link to='/'>Takedown Policy</Link>
              </li>
            </ul>
          </div>

          <div className='primary-footer--col'>
            <h4>Company</h4>
            <ul>
              <li>
                <Link component={RouterLink} to='/about-us'>
                  About Us
                </Link>
              </li>
              <li>
                <Link to='/'>Core Values</Link>
              </li>
              <li>
                <Link to='/'>Careers</Link>
              </li>
              <li>
                <Link to='/'>Sitemap</Link>
              </li>
            </ul>
          </div>

          <div className='primary-footer--col'>
            <h4>Hetchly Business</h4>
            <ul>
              <li>
                <Link to='/'>Sell on Hetchly</Link>
              </li>
              <li>
                <Link to='/'>Advertise on Hetchly</Link>
              </li>
              <li>
                <Link to='/'>Media Enquiries</Link>
              </li>
              <li>
                <Link to='/'>Be an Affiliate</Link>
              </li>
            </ul>
          </div>

          <div className='primary-footer--col'>
            <h4>Need Help?</h4>
            <ul>
              <li>
                <Link to='/'>FAQ's</Link>
              </li>
              <li>
                <Link to='/'>Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className='primary-footer--col'>
            <h4>Payment Methods</h4>
            <ul>
              <li>
                <Link to='/'>
                  <img src={paymentMethod} alt='Payment Method' />
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <img src={paymentMethod} alt='Payment Method' />
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <img src={paymentMethod} alt='Payment Method' />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <div className='sub-footer'>
        <Container maxWidth='lg'>
          <p>&copy; Hetchly, Inc. 2020. We love our users!</p>
          <div className='social-links'>
            <p>Follow us:</p>
            <ul>
              <li>
                <Link to='/'>
                  <img src={social} alt='Social' />
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <img src={social} alt='Social' />
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <img src={social} alt='Social' />
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <img src={social} alt='Social' />
                </Link>
              </li>
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  );
}
