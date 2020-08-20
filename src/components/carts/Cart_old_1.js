import React, { useEffect, useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link as RouterLink } from "react-router-dom";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import NumberField from "../ui/NumberField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { trackPromise } from "react-promise-tracker";
import {
  Box,
  Button,
  ButtonGroup,
  CardHeader,
  IconButton
} from "@material-ui/core";

//temp url for carts
const CART_API_URL =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/carts";
const PRODUCT_API_URL =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/products";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    margin: "2em 1em"
  },
  cover: {
    width: 151
  },
  content: {
    flex: "1 0 auto"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  }
}));

const Cart = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  // const [checked, setChecked] = React.useState(true);
  const [allChecked, setAllChecked] = React.useState(false);

  /* const handleChange = event => {
    setChecked(event.target.checked);
  }; */

  /* const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true
  }); */

  /* const handleChangehead = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  }; */

  const handleChange = e => {
    console.log("products: ", products);
    let itemName = e.target.name;
    let checked = e.target.checked;
    let list = products;
    console.log(checked);
    if (itemName === "checkAll") {
      setAllChecked(checked)
      list = list.map(product => ({ ...product, isChecked: checked }));
    }
    return { list, allChecked };
    /* if (itemName === "checkAll" && allChecked) {
      setChecked(checked)
    } */
    /* let itemName = e.target.name;
    let checked = e.target.checked;
    this.setState(prevState => {
      let { list, allChecked } = prevState;
      if (itemName === "checkAll") {
        allChecked = checked;
        list = list.map(item => ({ ...item, isChecked: checked }));
      } else {
        list = list.map(item =>
          item.name === itemName ? { ...item, isChecked: checked } : item
        );
        allChecked = list.every(item => item.isChecked);
      }
      return { list, allChecked };
    }); */
  };

  useEffect(() => {
    trackPromise(
      fetch(CART_API_URL + "/test")
        .then(response => {
          return response.json();
        })
        .then(data => {
          setCart(data.items);
          var cartArr = data.items;
          var promises = [];
          cartArr.forEach(async function (item) {
            console.log(item.product_id);
            var promise = await fetch(PRODUCT_API_URL + "/" + item.product_id)
              .then(response => {
                return response.json();
              })
              .then(data => {
                data.products[0].quantity = item.quantity;
                data.products[0].isChecked = false;
                setProducts(products => [...products, data.products[0]]);
              })
              .catch(error => {
                alert(error);
              });

            promises.push(promise);
          });
        })
        .catch(error => {
          alert(error);
        })
    );
  }, []);

  var cartData = (
    <div>
      <Grid container spacing={2}>
        <Card>
          <CardContent>
            <Typography component="h1">Your shopping cart is empty</Typography>
            <Button variant="contained" color="primary" href="#">
              Empty Cart
            </Button>
            <Typography component="p">
              You may add items to your shopping cart here.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );

  var productsList = <div> </div>;
  if (cart) {
    productsList = products.map(product => {
      return (
        <Box
          component="div"
          className="primary-box cart-product-card"
          key={product.productId}
        >
          <Box className="product-box">
            <Box className="product-checkbox">
              <Checkbox
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
                name={product.productName}
                value={product.productName}
                checked={product.isChecked}
                onChange={handleChange}
              />
              <CardMedia title="Image title" image={product.imageUrl} />
            </Box>
            <CardContent>
              <Box className="product-info-content">
                <Typography component="h3">
                  <Link
                    component={RouterLink}
                    to={"/products/" + product.productId}
                  >
                    {product.productName}
                  </Link>
                </Typography>
                <Typography>{product.productDescription}</Typography>
                <Typography component="h4">By {product.supplier}</Typography>
              </Box>
              <Box className="product-box-action">
                <Typography component="h5">
                  {product.currency} {product.price}
                </Typography>
                <Box component="div" className="icon-group">
                  <FavoriteBorderOutlinedIcon />
                  <DeleteOutlineIcon />
                </Box>
              </Box>
              <Box component="div" className="quantity">
                <NumberField
                  onChange={setQuantity}
                  value={quantity}
                  minValue={0}
                  maxValue={product.quantity}
                />
              </Box>
            </CardContent>
          </Box>
        </Box>
      );
    });
    cartData = <>{productsList}</>;
  }

  // return <div>{cartData}</div>;
  const productCount = products.length;
  return (
    <Box component="div" className="main-content">
      <Container maxWidth="lg">
        <Box component="div" className="cart-header-action">
          <Grid container>
            <Grid item xs={12} lg={8}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allChecked}
                    onChange={handleChange}
                    name="checkAll"
                    color="primary"
                  />
                }
                label={`Select All (${productCount} Items(s))`}
              />
              <Button>
                <DeleteOutlineIcon />
                Delete All
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Grid container>
          <Grid item xs={12} lg={8}>
            {cartData}
          </Grid>

          <Grid item xs={12} lg={4}>
            <Box
              component="div"
              className="primary-box delivery-info-box checkout-info"
            >
              <Box className="delivey-box">
                <Typography component="h3">Location</Typography>
                <ul>
                  <li>
                    <LocationOnOutlinedIcon />
                    Metro Manila Quezon City, Quezon City, Project 6
                  </li>
                </ul>
              </Box>

              <Box className="warranty-box">
                <Typography component="h3">Order Summary</Typography>
                <ul className="order-summary">
                  <li>
                    <Typography component="span">
                      Subtotal ({productCount} items)
                    </Typography>
                    <Typography component="span">50,000</Typography>
                  </li>
                  <li>
                    <Typography component="span">Shipping Fee</Typography>
                    <Typography component="span">40.00</Typography>
                  </li>
                </ul>
              </Box>

              <Typography className="order-total">
                <Typography>Total</Typography>
                <Typography component="strong">50,040</Typography>
              </Typography>

              <Button
                component={RouterLink}
                to="/checkout"
                variant="contained"
                color="primary"
                disableElevation
                fullWidth
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Cart;
