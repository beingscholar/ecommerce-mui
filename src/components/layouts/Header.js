import React, { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "@material-ui/core";
import MediaQuery from "react-responsive";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import PropTypes from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import closeIcon from "../../assets/img/close.svg";
import logo from "../../assets/img/logo.png";
import navIcon from "../../assets/img/menu.svg";
import { useUser } from "../utilities/user";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";

const Header = (props) => {
  const { push } = useHistory();
  const { user, logout } = useUser();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchBar, setSearchBar] = useState(false);

  const handleSignOut = async () => {
    await logout().then(() => window.location.replace("/signin"));
  };

  return (
    <>
      <MediaQuery minWidth={768}>
        <div className="topbar">
          <Container maxWidth="lg">
            <ul>
              <li>
                <Link component={RouterLink} to="/">
                  Sell on Hetchly
                </Link>
              </li>
              <li>
                <Link component={RouterLink} to="/">
                  Track my order
                </Link>
              </li>
              <li>
                <Link component={RouterLink} to="/">
                  Help Center
                </Link>
              </li>
            </ul>
          </Container>
        </div>
      </MediaQuery>

      {/* Add ".in" class to show */}
      <MediaQuery maxWidth={768}>
        <div className={`mobile-menu ${mobileMenu && "in"}`}>
          <div className="mobile-menu--container">
            <img
              src={closeIcon}
              className="close-icon"
              width="16"
              alt="Close"
              onClick={() => setMobileMenu(false)}
            />
            <div className="wrap">
              <div className="logo">
                <img src={logo} alt="Logo" />
              </div>
              <ul className="links">
                <li>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Categories</Typography>
                    </AccordionSummary>
                    <ul className="links">
                      <li>
                        <Link to="/">Electronic Devices</Link>
                      </li>
                      <li>
                        <Link to="/">Electronic Accessories</Link>
                      </li>
                      <li>
                        <Link to="/">TV & Home Appliances</Link>
                      </li>
                      <li>
                        <Link to="/">Health &amp; Beauty</Link>
                      </li>
                      <li>
                        <Link to="/">Babies &amp; Toys</Link>
                      </li>
                      <li>
                        <Link to="/">Groceries &amp; Pets</Link>
                      </li>
                      <li>
                        <Link to="/">Home &amp; Living</Link>
                      </li>
                      <li>
                        <Link to="/">Women's Fashion</Link>
                      </li>
                      <li>
                        <Link to="/">Men's Fashion</Link>
                      </li>
                      <li>
                        <Link to="/">Fashion Accessories</Link>
                      </li>
                      <li>
                        <Link to="/">Sports &amp; Lifestyle</Link>
                      </li>
                      <li>
                        <Link to="/">Automotive &amp; Motorcycles</Link>
                      </li>
                    </ul>
                  </Accordion>
                </li>
                <li>
                  <Link component={RouterLink} to="/">
                    Sell on Hetchly
                  </Link>
                </li>
                <li>
                  <Link component={RouterLink} to="/">
                    Track my order
                  </Link>
                </li>
                <li>
                  <Link component={RouterLink} to="/">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <ul>
              <li>
                {user ? (
                  <Link
                    onClick={() => setMobileMenu(false)}
                    component={RouterLink}
                    to="/profile"
                  >
                    <PersonOutlinedIcon />
                    Profile
                  </Link>
                ) : (
                  <Link
                    onClick={() => setMobileMenu(false)}
                    component={RouterLink}
                    to="/signin"
                  >
                    <PersonOutlinedIcon />
                    Login
                  </Link>
                )}
              </li>
              <li>
                {user ? (
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={() => {
                      handleSignOut();
                      setMobileMenu(false);
                    }}
                    // to="/signup"
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={() => {
                      push("/signup");
                      setMobileMenu(false);
                    }}
                    // to="/signup"
                  >
                    Sign up
                  </Button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </MediaQuery>

      <header className="primary-header">
        <Container maxWidth="lg">
          <div className="logo">
            <MediaQuery maxWidth={768}>
              <img
                src={navIcon}
                width="20"
                alt="Menu"
                onClick={() => setMobileMenu(true)}
              />
            </MediaQuery>
            <Link component={RouterLink} to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>

          {/* Add ".show" class to show search bar in mobile */}
          <div className={`search-box ${searchBar && "show"}`}>
            <input type="text" placeholder="Search products &amp; brands..." />
            <Button variant="contained" color="secondary" disableElevation>
              <SearchIcon />
            </Button>
          </div>

          <ul className="links">
            <li>
              <Link component={RouterLink} to="/cart">
                <ShoppingCartOutlinedIcon />
                Cart
              </Link>
            </li>
            <MediaQuery maxWidth={767}>
              <li>
                <Link>
                  <SearchIcon onClick={() => setSearchBar(!searchBar)} />
                </Link>
              </li>
            </MediaQuery>
            <MediaQuery minWidth={768}>
              <li>
                {user ? (
                  <Link component={RouterLink} to="/profile">
                    <PersonOutlinedIcon />
                    Profile
                  </Link>
                ) : (
                  <Link component={RouterLink} to="/signin">
                    <PersonOutlinedIcon />
                    Login
                  </Link>
                )}
              </li>
              <li>
                {user ? (
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={() => {
                      handleSignOut();
                    }}
                    // to="/signup"
                  >
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={() => push("/signup")}
                    // to="/signup"
                  >
                    Sign up
                  </Button>
                )}
              </li>
            </MediaQuery>
          </ul>
        </Container>
        <MediaQuery minWidth={768}>
          <Container maxWidth="lg">
            <div className="primary-dropdown">
              <span>
                Categories <ExpandMoreIcon />
              </span>
              <div className="primary-dropdown--menu">
                <ul>
                  <li>
                    <Link to="/">Electronic Devices</Link>
                  </li>
                  <li>
                    <Link to="/">Electronic Accessories</Link>
                  </li>
                  <li>
                    <Link to="/">TV & Home Appliances</Link>
                  </li>
                  <li>
                    <Link to="/">Health &amp; Beauty</Link>
                  </li>
                  <li>
                    <Link to="/">Babies &amp; Toys</Link>
                  </li>
                  <li>
                    <Link to="/">Groceries &amp; Pets</Link>
                  </li>
                  <li>
                    <Link to="/">Home &amp; Living</Link>
                  </li>
                  <li>
                    <Link to="/">Women's Fashion</Link>
                  </li>
                  <li>
                    <Link to="/">Men's Fashion</Link>
                  </li>
                  <li>
                    <Link to="/">Fashion Accessories</Link>
                  </li>
                  <li>
                    <Link to="/">Sports &amp; Lifestyle</Link>
                  </li>
                  <li>
                    <Link to="/">Automotive &amp; Motorcycles</Link>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </MediaQuery>
      </header>
    </>
  );
};

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};

export default Header;
