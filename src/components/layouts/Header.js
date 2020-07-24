import React from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import logo from "../../assets/img/logo.png";
import { useHistory } from "react-router";

const Header = (props) => {
  const { push } = useHistory();
  return (
    // <header className="primary-header">
    //   <div className=""
    // </header>
    <>
      <div className="topbar">
        <Container maxWidth="lg">
          <ul>
            <li>
              <Link to="/">Sell on Hetchly</Link>
            </li>
            <li>
              <Link to="/">Track my order</Link>
            </li>
            <li>
              <Link to="/">Help Center</Link>
            </li>
          </ul>
        </Container>
      </div>

      <header className="primary-header">
        <Container maxWidth="lg">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>

          <div className="search-box">
            <input type="text" placeholder="Search products &amp; brands..." />
            <Button variant="contained" color="secondary" disableElevation>
              <SearchIcon />
            </Button>
          </div>

          <ul className="links">
            <li>
              <Link to="/">
                <ShoppingCartOutlinedIcon />
                Cart
              </Link>
            </li>
            <li>
              <Link to="/signin">
                <PersonOutlinedIcon />
                Login
              </Link>
            </li>
            <li>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={() => push("/signup")}
                // to="/signup"
              >
                Sign up
              </Button>
            </li>
          </ul>
        </Container>
      </header>
    </>
  );
};

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};

export default Header;
