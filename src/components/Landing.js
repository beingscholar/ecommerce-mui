import { Box, Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Rating from "@material-ui/lab/Rating";
import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import MediaQuery from "react-responsive";
import { Link as RouterLink } from "react-router-dom";
import Slider from "react-slick";
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";
import { PRODUCT_API_URL } from "../config/apiUrl";

export default function Landing() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    trackPromise(
      fetch(PRODUCT_API_URL)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setProducts(data.products);
        })
        .catch(error => {
          alert(error);
        })
    );
  }, []);

  if (products) {
    var bannerList = products.map(product => {
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
    var productList = products.map(product => {
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
          slidesToShow: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
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
          arrows: false
        }
      }
    ]
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
