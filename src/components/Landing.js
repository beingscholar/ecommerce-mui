import { Box, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Link as RouterLink,
  Switch,
} from "react-router-dom";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import DraftsIcon from "@material-ui/icons/Drafts";
import Grid from "@material-ui/core/Grid";
import InboxIcon from "@material-ui/icons/Inbox";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MediaQuery from "react-responsive";
import Rating from "@material-ui/lab/Rating";
import Slider from "react-slick";
import Typography from "@material-ui/core/Typography";
import { createBrowserHistory as history } from "history";
import { makeStyles } from "@material-ui/core/styles";
import { trackPromise } from "react-promise-tracker";

const url =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/products";

const useStyles = makeStyles((theme) => ({
  navLink: {
    margin: theme.spacing(2),
    fontSize: "1rem",
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  authLinks: {
    position: "relative",

    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Landing() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    trackPromise(
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setProducts(data.products);
        })
        .catch((error) => {
          alert(error);
        })
    );
  }, []);

  if (products) {
    var bannerList = products.map((product) => {
      return (
        <Card key={product.productId} className="product-card">
          <CardMedia
            image={product.imageUrl} /* change to product.imageUrl */
            title="Image title"
          />

          <CardContent>
            <Typography component="h2">{product.productDescription}</Typography>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                type="button"
              >
                Shop Now
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      );
    });
  }

  if (products) {
    var productList = products.map((product) => {
      return (
        <Card key={product.productId} className="product-card">
          <CardActionArea
            component={RouterLink}
            to={"/products/" + product.productId}
          >
            <CardMedia
              image={product.imageUrl} /* change to product.imageUrl */
              title="Image title"
            />
          </CardActionArea>

          <CardContent>
            <Typography component="h4">{product.productName}</Typography>
            <Typography component="h5">
              {product.currency} {product.price}
            </Typography>
            <Typography className="description">
              {product.productDescription}
            </Typography>
            <Typography className="product-rating">
              <Rating
                name="half-rating-read"
                defaultValue={2.5}
                precision={0.5}
                readOnly
              />
              (55)
            </Typography>
          </CardContent>
        </Card>
      );
    });
  }

  var productListSlider = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: (
      <Box component="div">
        <ArrowBackIosIcon />
      </Box>
    ),
    nextArrow: (
      <Box component="div">
        <ArrowForwardIosIcon />
      </Box>
    ),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  var banner = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    prevArrow: (
      <Box component="div">
        <ArrowBackIosIcon />
      </Box>
    ),
    nextArrow: (
      <Box component="div">
        <ArrowForwardIosIcon />
      </Box>
    ),
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  return (
    <Box component="div" className="main-content">
      <Container maxWidth="lg">
        <Grid container spacing={0}>
          <MediaQuery minWidth={1024}>
            <Grid container item xs={12} md={3} spacing={0}>
              <Box component="div" className="category-menu">
                <Typography component="h3">Categories</Typography>
                <List component="nav">
                  <ListItemLink component={RouterLink} to="/products">
                    <ListItemText primary="Electronic Devices" />
                  </ListItemLink>

                  <ListItemLink component={RouterLink} to="/products">
                    <ListItemText primary="Electronic Accessories" />
                  </ListItemLink>

                  <ListItemLink component={RouterLink} to="/products">
                    <ListItemText primary="TV & Home Appliances" />
                  </ListItemLink>

                  <ListItemLink component={RouterLink} to="/products">
                    <ListItemText primary="Health &amp; Beauty" />
                  </ListItemLink>

                  <ListItemLink component={RouterLink} to="/products">
                    <ListItemText primary="Babies &amp; Toys" />
                  </ListItemLink>

                  <ListItemLink component={RouterLink} to="/products">
                    <ListItemText primary="Groceries &amp; Pets" />
                  </ListItemLink>

                  <ListItemLink component={RouterLink} to="/products">
                    <ListItemText primary="Home &amp; Living" />
                  </ListItemLink>

                  <ListItemLink component={RouterLink} to="/products">
                    <ListItemText primary="Women's Fashion" />
                  </ListItemLink>

                  <ListItemLink component={RouterLink} to="/products">
                    <ListItemText primary="Men's Fashion" />
                  </ListItemLink>

                  <ListItemLink component={RouterLink} to="/products">
                    <ListItemText primary="Fashion Accessories" />
                  </ListItemLink>

                  <ListItemLink component={RouterLink} to="/products">
                    <ListItemText primary="Sports &amp; Lifestyle" />
                  </ListItemLink>

                  <ListItemLink component={RouterLink} to="/products">
                    <ListItemText primary="Automotive &amp; Motorcycles" />
                  </ListItemLink>
                </List>
              </Box>
            </Grid>
          </MediaQuery>
          <Grid container item xs={12} md={9} spacing={0}>
            <Box component="div" className="main-banner">
              <Slider {...banner}>{bannerList}</Slider>
            </Box>
          </Grid>
        </Grid>

        <Box component="div" className="products-box">
          <Typography component="h3">Your Daily Pickups</Typography>
          <Slider {...productListSlider}>{productList}</Slider>
        </Box>

        <Box component="div" className="products-box">
          <Typography component="h3">Best Seller</Typography>
          <Slider {...productListSlider}>{productList}</Slider>
        </Box>

        <Button
          variant="contained"
          color="primary"
          disableElevation
          type="button"
          onClick={() => window.location.replace("/products")}
        >
          See All Products
        </Button>

        <Box className="payment-info-box">
          <Grid container spacing={0}>
            <Grid item xs={12} sm={4} spacing={0}>
              <Box className="box no-border">
                <Avatar
                  alt="Secure Payments"
                  src="/static/images/avatar/1.jpg"
                />
                <Typography component="h3">100% Secure Payments</Typography>
                <Typography>
                  Moving your card details to a{" "}
                  <span> much more secured place.</span>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} spacing={0}>
              <Box className="box">
                <Avatar alt="Trustpay" src="/static/images/avatar/1.jpg" />
                <Typography component="h3">Trustpay</Typography>
                <Typography>
                  100% Payment Protection. <span>Easy Return Policy</span>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} spacing={0}>
              <Box className="box">
                <Avatar
                  alt="Shop on the Go"
                  src="/static/images/avatar/1.jpg"
                />
                <Typography component="h3">Shop on the Go</Typography>
                <Typography>
                  100% Payment Protection. <span>Easy Return Policy</span>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
