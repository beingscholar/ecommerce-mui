import { Box, Button, ButtonGroup, CircularProgress } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Avatar from "@material-ui/core/Avatar";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Rating from "@material-ui/lab/Rating";
import { Auth } from "aws-amplify";
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { useParams } from "react-router";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Slider from "react-slick";
import { CART_API_URL, PRODUCT_API_URL } from "../../config/apiUrl";
import ProductSummary from "./ProductSummary";
import ProductDelivery from "./ProductDelivery";
import ProductDetails from "./ProductDetails";
import RatingReview from "./RatingReview";

const ProductProfile = () => {
  const classes = [];
  const history = useHistory();
  let { id } = useParams();
  const [userId, setUserId] = useState("");
  const [productQuantity, setProductQuantity] = useState("-1");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState();

  useEffect(() => {
    trackPromise(
      Auth.currentAuthenticatedUser().then(user => {
        setUserId(user.attributes.sub);
      })
    );
    trackPromise(
      fetch(`${PRODUCT_API_URL}/${id}`)
        .then(response => response.json())
        .then(data => {
          setProduct(data.products[0]);
        })
        .catch(error => {
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
                onChange={e => {
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
                      quantity: quantity
                    })
                  };
                  trackPromise(
                    fetch(CART_API_URL + "/test", requestOptions)
                      .then(response => {
                        return response.json();
                      })
                      .then(data => {
                        // setProduct(data);
                      })
                      .catch(error => {
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

  const [tabValue, setTabValue] = React.useState(0);

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }

  const [sort, setSort] = React.useState("");

  const SortBy = event => {
    setSort(event.target.value);
  };

  const LoadingCard = (
    <Box className={classes.container}>
      <Card className={classes.container}>
        <CardContent>
          <CircularProgress />
        </CardContent>
      </Card>
    </Box>
  );

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
            {product ? (
              <ProductSummary userId={userId} product={product} />
            ) : (
              LoadingCard
            )}
          </Grid>
          <Grid item xs={12} lg={3}>
            {product ? (
              <ProductDelivery productSupplier={product.supplier} />
            ) : (
              LoadingCard
            )}
          </Grid>
        </Grid>

        <Box component="div" className="primary-box horizontal-tabs">
          <Tabs
            value={tabValue}
            onChange={(event, newValue) => setTabValue(newValue)}
            indicatorColor="primary"
          >
            <Tab label="Item Details" {...a11yProps(0)} />
            <Tab label="Rating &amp; Reviews" {...a11yProps(1)} />
            <Tab label="Question &amp; Answer" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <ProductDetails />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <RatingReview />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            
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
          <Grid container>
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
              <Box className="box">
                <Avatar alt="Trustpay" src="/static/images/avatar/1.jpg" />
                <Typography component="h3">Trustpay</Typography>
                <Typography>
                  100% Payment Protection. <span>Easy Return Policy</span>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
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
