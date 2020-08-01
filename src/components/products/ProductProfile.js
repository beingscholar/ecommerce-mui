import React, { useEffect, useState, Fragment } from "react";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import ReplyIcon from "@material-ui/icons/Reply";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Avatar from "@material-ui/core/Avatar";
import CardActionArea from "@material-ui/core/CardActionArea";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { useParams } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Slider from "react-slick";
import {
  Box,
  Button,
  ButtonGroup,
  CardHeader,
  IconButton,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import PropTypes from "prop-types";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CardMedia from "@material-ui/core/CardMedia";
import TextField from "@material-ui/core/TextField";

const url =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/products";

const cart_url =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/carts";
const inventory_url =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/inventory";

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 0,
    boxShadow: "none",
    height: "80%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  grid: {
    padding: "1em",
  },
}));

const ProductProfile = () => {
  const classes = useStyles();
  let { id } = useParams();
  const [product, setProduct] = useState();
  const [productQuantity, setProductQuantity] = useState("-1");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    trackPromise(
      fetch(url + "/" + id)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          var productsArr = data.products;
          var promises = [];
          productsArr.forEach(async function (item) {
            var promise = await fetch(inventory_url + "/" + item.productId)
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                console.log(data.product.quantity);
                setProductQuantity(data.product.quantity);
                setProduct(item);
              })
              .catch((error) => {
                alert(error);
              });

            promises.push(promise);
          });

          setProduct(data.products[0]);
        })
        .catch((error) => {
          alert(error);
        })
    );
  }, [id]);
  var productData = <div></div>;
  if (product) {
    productData = (
      <div>
        <Grid className={classes.grid} container spacing={4}>
          <Grid item xs={12} sm={9}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image="https://source.unsplash.com/random" /* change to product.imageUrl */
                title="Image title"
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card className={classes.card}>
              <CardContent>
                <Divider />
                <Typography variant="h4">{product.productName}</Typography>
                <Typography color="textSecondary">
                  {product.currency} {product.price}
                </Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  Quantity: {productQuantity}{" "}
                </Typography>
                <div style={{ marginBottom: "1em" }}>
                  <strong>Product Description</strong>
                </div>
                {product.productDescription} <br />
              </CardContent>
            </Card>
            <form>
              <TextField
                id="filled-number"
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                variant="filled"
              />
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "1em" }}
                onClick={() => {
                  // POST request using fetch inside useEffect React hook
                  const requestOptions = {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      product_id: id,
                      action: "add",
                      quantity: quantity,
                    }),
                  };
                  trackPromise(
                    fetch(cart_url + "/test", requestOptions)
                      .then((response) => {
                        return response.json();
                      })
                      .then((data) => {
                        // setProduct(data);
                      })
                      .catch((error) => {
                        console.log(error);
                        alert(error);
                      })
                  );

                  alert("✔️ added");
                }}
                component={RouterLink}
                to="/cart"
              >
                Add to Cart
              </Button>
            </form>
          </Grid>
        </Grid>
      </div>
    );
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

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        className="tab-content"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <>{children}</>}
      </div>
    );
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [sort, setSort] = React.useState("");

  const SortBy = (event) => {
    setSort(event.target.value);
  };

  return (
    <Box component="div" className="main-content">
      <Container maxWidth="lg">
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit">Home</Link>
          <Link color="inherit">Mobile &amp; Tablets</Link>
          <Typography color="textPrimary">Smartphones</Typography>
        </Breadcrumbs>

        <Grid container>
          <Grid item xs={12} lg={9}>
            <Box
              component="div"
              className="primary-box product-gallery"
              px={3}
              py={5}
            >
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Box className="product-slides">
                    <Box className="slide-full">Single Slide</Box>
                    <ul>
                      <li>Slide 1</li>
                      <li>Slide 2</li>
                      <li>Slide 3</li>
                      <li>Slide 4</li>
                    </ul>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography component="h3">Iphone SE 2020</Typography>
                  <Typography component="h4">Php 25,000</Typography>
                  <Box component="div" className="share-wishlist">
                    <Typography className="product-rating">
                      <Rating
                        name="half-rating-read"
                        defaultValue={2.5}
                        precision={0.5}
                        readOnly
                      />
                      (55)
                    </Typography>
                    <Box component="div" className="icon-group">
                      <IconButton>
                        <ReplyIcon />
                      </IconButton>
                      <IconButton>
                        <FavoriteBorderOutlinedIcon />
                      </IconButton>
                      <IconButton color="secondary">
                        <FavoriteIcon color="secondary" />
                      </IconButton>
                    </Box>
                  </Box>
                  <ul className="have-questions">
                    <li>
                      <Link>95 Ratings</Link>
                    </li>
                    <li>
                      <Link>5 Reviews</Link>
                    </li>
                    <li>
                      <Link>Have Questions?</Link>
                    </li>
                  </ul>

                  <Box className="color-family">
                    <Typography>Color Family: Space Grey</Typography>

                    <ul className="color-palette">
                      <li>White</li>
                      <li>Space Grey</li>
                      <li>Black</li>
                    </ul>
                  </Box>

                  <Typography className="strorage-capacity">
                    Storage Capacity:
                    <FormControl className="width-auto">
                      <Select
                        value={sort}
                        onChange={SortBy}
                        variant="outlined"
                        displayEmpty
                        IconComponent={() => <ExpandMoreIcon />}
                      >
                        <MenuItem value="">64GB</MenuItem>
                        <MenuItem value={20}>Newest</MenuItem>
                      </Select>
                    </FormControl>
                  </Typography>

                  <Typography className="product-quantity">
                    Quantity:
                    <Box className="quantity">
                      <ul>
                        <li>
                          <Button>
                            <RemoveIcon />
                          </Button>
                        </li>
                        <li>1</li>
                        <li>
                          <Button>
                            <AddIcon />
                          </Button>
                        </li>
                      </ul>
                      <Typography>Only 7 items left</Typography>
                    </Box>
                  </Typography>

                  <ButtonGroup>
                    <Button variant="outlined" color="primary">
                      Buy Now
                    </Button>
                    <Button
                      variant="contained"
                      disableElevation
                      color="primary"
                    >
                      Add to Cart
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Box component="div" className="primary-box delivery-info-box">
              <Box className="delivey-box">
                <Typography component="h3">Delivery Options</Typography>
                <ul>
                  <li>
                    <LocationOnOutlinedIcon />
                    Metro Manila Quezon City, Quezon City, Project 6
                  </li>
                  <li>
                    <LocalShippingOutlinedIcon />
                    Standard Delivery
                    <span>12-15 Day(s)</span>
                  </li>
                  <li>
                    <MonetizationOnOutlinedIcon />
                    Cash on Delivery Available
                  </li>
                </ul>
              </Box>

              <Box className="warranty-box">
                <Typography component="h3">Return &amp; Warranty</Typography>
                <ul>
                  <li>
                    <CheckOutlinedIcon />
                    100% Authentic
                  </li>
                  <li>
                    <CheckOutlinedIcon />
                    15 Day Return
                    <span>Change of mind is not applicable</span>
                  </li>
                </ul>
              </Box>

              <Typography className="sold-by">
                Sold by Tech101
                <Link>View Store</Link>
              </Typography>

              <ul className="seller-rating">
                <li>
                  <span>Positive Rating</span>
                  98%
                </li>
                <li>
                  <span>Ships on time</span>
                  100%
                </li>
              </ul>
            </Box>
          </Grid>
        </Grid>

        <Box component="div" className="primary-box horizontal-tabs">
          <Tabs value={value} onChange={handleChange} indicatorColor="primary">
            <Tab label="Item Details" {...a11yProps(0)} />
            <Tab label="Rating &amp; Reviews" {...a11yProps(1)} />
            <Tab label="Question &amp; Answer" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Box className="primary-accordian">
              <Accordion elevation={0}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Highlights</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul>
                    <li>Lorem Ipsum Dolor dummy text.</li>
                    <li>Lorem Ipsum Dolor dummy text.</li>
                    <li>Lorem Ipsum Dolor dummy text.</li>
                    <li>Lorem Ipsum Dolor dummy text.</li>
                    <li>Lorem Ipsum Dolor dummy text.</li>
                    <li>Lorem Ipsum Dolor dummy text.</li>
                    <li>Lorem Ipsum Dolor dummy text.</li>
                    <li>Lorem Ipsum Dolor dummy text.</li>
                    <li>Lorem Ipsum Dolor dummy text.</li>
                    <li>Lorem Ipsum Dolor dummy text.</li>
                  </ul>
                </AccordionDetails>
              </Accordion>
              <Accordion elevation={0}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Other Specification</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion elevation={0}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography>Description</Typography>
                </AccordionSummary>
              </Accordion>
              <Accordion elevation={0}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
                >
                  <Typography>Terms &amp; Conditions</Typography>
                </AccordionSummary>
              </Accordion>

              <Typography className="helpful-info">
                Was this information helpful to you?
                <ButtonGroup>
                  <Button variant="outlined" className="default">
                    Yes
                  </Button>
                  <Button variant="outlined" className="default">
                    No
                  </Button>
                </ButtonGroup>
              </Typography>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container>
              <Grid item xs={12} sm={4}>
                <Paper elevation={0} className="rating-box">
                  <Fragment>
                    <Typography component="h4">
                      <Typography component="strong">5</Typography>
                      /5
                    </Typography>
                    <Typography className="product-rating">
                      <Rating
                        name="half-rating-read"
                        defaultValue={2.5}
                        precision={0.5}
                        readOnly
                      />
                    </Typography>
                  </Fragment>
                  <Typography>38 Ratings &amp; 5 Reviews</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper elevation={0} className="rating-box">
                  <Typography component="strong">37%</Typography>
                  <Typography>Based on 3 Recommendations</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper elevation={0} className="rating-box transparent">
                  <Typography>
                    Would you like to recommend this item?
                  </Typography>
                  <ButtonGroup>
                    <Button variant="outlined" className="default">
                      Yes
                    </Button>
                    <Button variant="outlined" className="default">
                      No
                    </Button>
                  </ButtonGroup>
                </Paper>
              </Grid>
            </Grid>
            <Box component="div" className="content-box">
              <Box component="div" className="content-box--header">
                <Typography component="h3">
                  <Typography component="span">1-5 of 5 Reviews</Typography>
                  Customer Reviews
                </Typography>
                <Box component="div" className="wrap">
                  <ul>
                    <li>Sort By:</li>
                    <li>
                      <span className="active">Most Helpful</span>
                    </li>
                    <li>
                      <span>Most Recent</span>
                    </li>
                  </ul>

                  <ul>
                    <li>Filter By:</li>
                    <li>
                      <FormControl className="width-auto">
                        <Select
                          value={sort}
                          onChange={SortBy}
                          variant="outlined"
                          displayEmpty
                          IconComponent={() => <ExpandMoreIcon />}
                        >
                          <MenuItem value="">All Stars</MenuItem>
                        </Select>
                      </FormControl>
                    </li>
                  </ul>
                </Box>
              </Box>
              <Box component="div" className="content-box--body">
                <Grid container className="review-row">
                  <Grid item xs={12} sm={4} md={3} lg={2}>
                    <Avatar
                      alt="Remy Sharp"
                      className="avtar-lg"
                      src="/static/images/avatar/1.jpg"
                    />
                    <Typography className="verified-buyer">
                      <VerifiedUserIcon />
                      Verified Buyer
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9} lg={10}>
                    <Typography className="product-rating">
                      <Rating
                        name="half-rating-read"
                        defaultValue={2.5}
                        precision={0.5}
                        readOnly
                      />
                    </Typography>
                    <Typography className="review-date">
                      by shubham pandey on Oct 24, 2016
                    </Typography>
                    <Typography className="review-desc">
                      Lorem ipsum dummy text.
                    </Typography>
                    <Typography className="review-helpful">
                      5 People Found this review helpful. Was this review
                      helpful?
                      <Button variant="outlined" className="default">
                        <ThumbUpAltOutlinedIcon />5
                      </Button>
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container className="review-row">
                  <Grid item xs={12} sm={4} md={3} lg={2}>
                    <Avatar
                      alt="Remy Sharp"
                      className="avtar-lg"
                      src="/static/images/avatar/1.jpg"
                    />
                    <Typography className="verified-buyer">
                      <VerifiedUserIcon />
                      Verified Buyer
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9} lg={10}>
                    <Typography className="product-rating">
                      <Rating
                        name="half-rating-read"
                        defaultValue={2.5}
                        precision={0.5}
                        readOnly
                      />
                    </Typography>
                    <Typography className="review-date">
                      by shubham pandey on Oct 24, 2016
                    </Typography>
                    <Typography className="review-desc">
                      Lorem ipsum dummy text.
                    </Typography>
                    <Typography className="review-helpful">
                      5 People Found this review helpful. Was this review
                      helpful?
                      <Button variant="outlined" className="default">
                        <ThumbUpAltOutlinedIcon />5
                      </Button>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box component="div" className="content-box">
              <Box component="div" className="content-box--header">
                <Typography component="h3">
                  <span>Displaying Questions 1-2 of 2</span>
                </Typography>
                <Box component="div" className="wrap">
                  <ul>
                    <li>Sort By:</li>
                    <li>
                      <span className="active">Most Helpful</span>
                    </li>
                    <li>
                      <span>Most Recent</span>
                    </li>
                  </ul>

                  <ul>
                    <li>Filter By:</li>
                    <li>
                      <FormControl className="width-auto">
                        <Select
                          value={sort}
                          onChange={SortBy}
                          variant="outlined"
                          displayEmpty
                          IconComponent={() => <ExpandMoreIcon />}
                        >
                          <MenuItem value="">All Stars</MenuItem>
                        </Select>
                      </FormControl>
                    </li>
                  </ul>
                </Box>
              </Box>
              <Box component="div" className="content-box--body">
                <Box component="div" className="que-ans-row">
                  <Box component="div" className="question">
                    <Avatar>Q</Avatar>
                    <Typography>Is this for Iphone SE?</Typography>
                  </Box>
                  <Box component="div" className="answer">
                    <Avatar>A</Avatar>
                    <Typography>
                      Yes it is
                      <Typography component="span">
                        by Shubham on Oct 24, 2016
                      </Typography>
                    </Typography>
                  </Box>
                </Box>

                <Box component="div" className="que-ans-row">
                  <Box component="div" className="question">
                    <Avatar>Q</Avatar>
                    <Typography>Is this for Iphone SE?</Typography>
                  </Box>
                  <Box component="div" className="answer">
                    <Avatar>A</Avatar>
                    <Typography>
                      Yes it is
                      <Typography component="span">
                        by Shubham on Oct 24, 2016
                      </Typography>
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </TabPanel>
        </Box>

        <Box component="div" className="products-box">
          <Typography component="h3">From the same store</Typography>
          <Slider {...productListSlider}>
            <Card className="product-card">
              <CardActionArea>
                <CardMedia title="Image title" />
              </CardActionArea>

              <CardContent>
                <Typography component="h4">Macbook Pro 2020</Typography>
                <Typography component="h5">Php 25,000</Typography>
                <Typography className="description">
                  Lorem ipsum is simply dummy text.
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
            <Card className="product-card">
              <CardActionArea>
                <CardMedia title="Image title" />
              </CardActionArea>

              <CardContent>
                <Typography component="h4">Macbook Pro 2020</Typography>
                <Typography component="h5">Php 25,000</Typography>
                <Typography className="description">
                  Lorem ipsum is simply dummy text.
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
            <Card className="product-card">
              <CardActionArea>
                <CardMedia title="Image title" />
              </CardActionArea>

              <CardContent>
                <Typography component="h4">Macbook Pro 2020</Typography>
                <Typography component="h5">Php 25,000</Typography>
                <Typography className="description">
                  Lorem ipsum is simply dummy text.
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
            <Card className="product-card">
              <CardActionArea>
                <CardMedia title="Image title" />
              </CardActionArea>

              <CardContent>
                <Typography component="h4">Macbook Pro 2020</Typography>
                <Typography component="h5">Php 25,000</Typography>
                <Typography className="description">
                  Lorem ipsum is simply dummy text.
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
            <Card className="product-card">
              <CardActionArea>
                <CardMedia title="Image title" />
              </CardActionArea>

              <CardContent>
                <Typography component="h4">Macbook Pro 2020</Typography>
                <Typography component="h5">Php 25,000</Typography>
                <Typography className="description">
                  Lorem ipsum is simply dummy text.
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
            <Card className="product-card">
              <CardActionArea>
                <CardMedia title="Image title" />
              </CardActionArea>

              <CardContent>
                <Typography component="h4">Macbook Pro 2020</Typography>
                <Typography component="h5">Php 25,000</Typography>
                <Typography className="description">
                  Lorem ipsum is simply dummy text.
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
          </Slider>
        </Box>

        <Box component="div" className="products-box">
          <Typography component="h3">Similar items</Typography>
          <Slider {...productListSlider}>
            <Card className="product-card">
              <CardActionArea>
                <CardMedia title="Image title" />
              </CardActionArea>

              <CardContent>
                <Typography component="h4">Macbook Pro 2020</Typography>
                <Typography component="h5">Php 25,000</Typography>
                <Typography className="description">
                  Lorem ipsum is simply dummy text.
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
            <Card className="product-card">
              <CardActionArea>
                <CardMedia title="Image title" />
              </CardActionArea>

              <CardContent>
                <Typography component="h4">Macbook Pro 2020</Typography>
                <Typography component="h5">Php 25,000</Typography>
                <Typography className="description">
                  Lorem ipsum is simply dummy text.
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
            <Card className="product-card">
              <CardActionArea>
                <CardMedia title="Image title" />
              </CardActionArea>

              <CardContent>
                <Typography component="h4">Macbook Pro 2020</Typography>
                <Typography component="h5">Php 25,000</Typography>
                <Typography className="description">
                  Lorem ipsum is simply dummy text.
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
            <Card className="product-card">
              <CardActionArea>
                <CardMedia title="Image title" />
              </CardActionArea>

              <CardContent>
                <Typography component="h4">Macbook Pro 2020</Typography>
                <Typography component="h5">Php 25,000</Typography>
                <Typography className="description">
                  Lorem ipsum is simply dummy text.
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
            <Card className="product-card">
              <CardActionArea>
                <CardMedia title="Image title" />
              </CardActionArea>

              <CardContent>
                <Typography component="h4">Macbook Pro 2020</Typography>
                <Typography component="h5">Php 25,000</Typography>
                <Typography className="description">
                  Lorem ipsum is simply dummy text.
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
            <Card className="product-card">
              <CardActionArea>
                <CardMedia title="Image title" />
              </CardActionArea>

              <CardContent>
                <Typography component="h4">Macbook Pro 2020</Typography>
                <Typography component="h5">Php 25,000</Typography>
                <Typography className="description">
                  Lorem ipsum is simply dummy text.
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
          </Slider>
        </Box>
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
};

export default ProductProfile;
