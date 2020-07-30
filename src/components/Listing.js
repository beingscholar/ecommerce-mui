import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MediaQuery from "react-responsive";
import {
  BrowserRouter as Router,
  Link as RouterLink,
  Route,
  Switch,
} from "react-router-dom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import InputBase from "@material-ui/core/InputBase";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import { trackPromise } from "react-promise-tracker";
import Slider from "react-slick";
import Link from "@material-ui/core/Link";
import Rating from "@material-ui/lab/Rating";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import "slick-carousel/slick/slick.css";
import CardActionArea from "@material-ui/core/CardActionArea";
import "slick-carousel/slick/slick-theme.css";

import { Button, Box } from "@material-ui/core";

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
        <Card className="product-card">
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
        <Card className="product-card">
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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 600,
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
  };

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

  return (
    <Box component="div" className="main-content">
      <Container maxWidth="lg">
        <Grid container spacing={0}>
          <Grid item xs={12} md={3} spacing={0}>
            <Box component="div" className="product-filters">
              <Typography component="h3">Filters</Typography>
              <Box component="div" className="filter-box">
                <Typography>Brand</Typography>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox name="checkedB" color="primary" />}
                    label="Samsung"
                  />
                  <FormControlLabel
                    control={<Checkbox name="checkedB" color="primary" />}
                    label="Oppo"
                  />
                  <FormControlLabel
                    control={<Checkbox name="checkedB" color="primary" />}
                    label="Vivo"
                  />
                </FormGroup>
                <Button
                  variant="outlined"
                  color="primary"
                  disableElevation
                  type="button"
                >
                  View More
                </Button>
              </Box>
              <Box component="div" className="filter-box">
                <Typography>Price</Typography>
                <Box className="price-filter">
                  <TextField
                    id="outlined-basic"
                    placeholder="Min"
                    variant="outlined"
                  />
                  <Typography component="span">-</Typography>
                  <TextField
                    id="outlined-basic"
                    placeholder="Max"
                    variant="outlined"
                  />
                  <IconButton>
                    <ArrowForwardIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box component="div" className="filter-box">
                <Typography>Rating</Typography>
                <Box component="div" className="product-rating">
                  <Rating
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={0.5}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={9} spacing={0}>
            <Box component="div" className="all-products">
              <Box component="div" className="all-products--filter">
                <Typography>
                  Smart Phones
                  <Typography component="small">(127 items)</Typography>
                </Typography>
                <Paper component="form" elevation={0}>
                  <SearchIcon />
                  <InputBase
                    className={classes.input}
                    placeholder="Search Google Maps"
                    inputProps={{ "aria-label": "search google maps" }}
                  />
                </Paper>
              </Box>
              <Grid container spacing={0}>
                <Grid item xs={12} md={3} spacing={0}>
                  <Card className="product-card">
                    <CardActionArea>
                      <CardMedia title="Image title" />
                    </CardActionArea>

                    <CardContent>
                      <Typography component="h4">iphone SE 2020</Typography>
                      <Typography component="h5">Php 25,000</Typography>
                      <Typography className="description">
                        Lorem Ipsum is simply dummy text.
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
                </Grid>

                <Grid item xs={12} md={3} spacing={0}>
                  <Card className="product-card">
                    <CardActionArea>
                      <CardMedia title="Image title" />
                    </CardActionArea>

                    <CardContent>
                      <Typography component="h4">iphone SE 2020</Typography>
                      <Typography component="h5">Php 25,000</Typography>
                      <Typography className="description">
                        Lorem Ipsum is simply dummy text.
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
                </Grid>

                <Grid item xs={12} md={3} spacing={0}>
                  <Card className="product-card">
                    <CardActionArea>
                      <CardMedia title="Image title" />
                    </CardActionArea>

                    <CardContent>
                      <Typography component="h4">iphone SE 2020</Typography>
                      <Typography component="h5">Php 25,000</Typography>
                      <Typography className="description">
                        Lorem Ipsum is simply dummy text.
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
                </Grid>

                <Grid item xs={12} md={3} spacing={0}>
                  <Card className="product-card">
                    <CardActionArea>
                      <CardMedia title="Image title" />
                    </CardActionArea>

                    <CardContent>
                      <Typography component="h4">iphone SE 2020</Typography>
                      <Typography component="h5">Php 25,000</Typography>
                      <Typography className="description">
                        Lorem Ipsum is simply dummy text.
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
                </Grid>

                <Grid item xs={12} md={3} spacing={0}>
                  <Card className="product-card">
                    <CardActionArea>
                      <CardMedia title="Image title" />
                    </CardActionArea>

                    <CardContent>
                      <Typography component="h4">iphone SE 2020</Typography>
                      <Typography component="h5">Php 25,000</Typography>
                      <Typography className="description">
                        Lorem Ipsum is simply dummy text.
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
                </Grid>

                <Grid item xs={12} md={3} spacing={0}>
                  <Card className="product-card">
                    <CardActionArea>
                      <CardMedia title="Image title" />
                    </CardActionArea>

                    <CardContent>
                      <Typography component="h4">iphone SE 2020</Typography>
                      <Typography component="h5">Php 25,000</Typography>
                      <Typography className="description">
                        Lorem Ipsum is simply dummy text.
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
                </Grid>

                <Grid item xs={12} md={3} spacing={0}>
                  <Card className="product-card">
                    <CardActionArea>
                      <CardMedia title="Image title" />
                    </CardActionArea>

                    <CardContent>
                      <Typography component="h4">iphone SE 2020</Typography>
                      <Typography component="h5">Php 25,000</Typography>
                      <Typography className="description">
                        Lorem Ipsum is simply dummy text.
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
                </Grid>

                <Grid item xs={12} md={3} spacing={0}>
                  <Card className="product-card">
                    <CardActionArea>
                      <CardMedia title="Image title" />
                    </CardActionArea>

                    <CardContent>
                      <Typography component="h4">iphone SE 2020</Typography>
                      <Typography component="h5">Php 25,000</Typography>
                      <Typography className="description">
                        Lorem Ipsum is simply dummy text.
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
                </Grid>

                <Grid item xs={12} md={3} spacing={0}>
                  <Card className="product-card">
                    <CardActionArea>
                      <CardMedia title="Image title" />
                    </CardActionArea>

                    <CardContent>
                      <Typography component="h4">iphone SE 2020</Typography>
                      <Typography component="h5">Php 25,000</Typography>
                      <Typography className="description">
                        Lorem Ipsum is simply dummy text.
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
                </Grid>

                <Grid item xs={12} md={3} spacing={0}>
                  <Card className="product-card">
                    <CardActionArea>
                      <CardMedia title="Image title" />
                    </CardActionArea>

                    <CardContent>
                      <Typography component="h4">iphone SE 2020</Typography>
                      <Typography component="h5">Php 25,000</Typography>
                      <Typography className="description">
                        Lorem Ipsum is simply dummy text.
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
                </Grid>

                <Grid item xs={12} md={3} spacing={0}>
                  <Card className="product-card">
                    <CardActionArea>
                      <CardMedia title="Image title" />
                    </CardActionArea>

                    <CardContent>
                      <Typography component="h4">iphone SE 2020</Typography>
                      <Typography component="h5">Php 25,000</Typography>
                      <Typography className="description">
                        Lorem Ipsum is simply dummy text.
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
                </Grid>

                <Grid item xs={12} md={3} spacing={0}>
                  <Card className="product-card">
                    <CardActionArea>
                      <CardMedia title="Image title" />
                    </CardActionArea>

                    <CardContent>
                      <Typography component="h4">iphone SE 2020</Typography>
                      <Typography component="h5">Php 25,000</Typography>
                      <Typography className="description">
                        Lorem Ipsum is simply dummy text.
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
                </Grid>
              </Grid>

              <Button
                variant="outlined"
                color="primary"
                disableElevation
                type="button"
              >
                Load More
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
