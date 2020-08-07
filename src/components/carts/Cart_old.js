import React, { useEffect, useState } from 'react';

import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { trackPromise } from 'react-promise-tracker';

//temp url for carts
const CART_API_URL =
  'http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/carts';
const PRODUCT_API_URL =
  'http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/products';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    margin: '2em 1em'
  },
  cover: {
    width: 151
  },
  content: {
    flex: '1 0 auto'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const Cart = () => {
  const classes = useStyles();

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    trackPromise(
      fetch(CART_API_URL + '/test')
        .then(response => {
          return response.json();
        })
        .then(data => {
          setCart(data.items);
          var cartArr = data.items;
          var promises = [];
          cartArr.forEach(async function (item) {
            console.log(item.product_id);
            var promise = await fetch(PRODUCT_API_URL + '/' + item.product_id)
              .then(response => {
                return response.json();
              })
              .then(data => {
                data.products[0].quantity = item.quantity;
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
            <h1>Your shopping cart is empty</h1>

            <Button variant='contained' color='primary' href='#'>
              Empty Cart
            </Button>
            <p>You may add items to your shopping cart here.</p>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );

  var productsList = <div> </div>;
  if (cart) {
    productsList = products.map(product => {
      return (
        <Card className={classes.root} key={product.productId}>
          <CardMedia className={classes.cover} image={product.imageUrl} />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant='h5' component='h5'>
                <Link
                  component={RouterLink}
                  to={'/products/' + product.productId}
                >
                  {product.productName}
                </Link>
              </Typography>
              <Typography variant='subtitle1'>
                Quantity: {product.quantity}
              </Typography>
              <Typography variant='h5' component='h5' color='textSecondary'>
                {product.currency} {product.price}
              </Typography>
            </CardContent>
          </div>
        </Card>
      );
    });
    cartData = (
      <div>
        {productsList}
        <Button
          component={RouterLink}
          to='/checkout'
          variant='contained'
          color='primary'
        >
          Proceed to Checkout
        </Button>
      </div>
    );
  }

  return <div>{cartData}</div>;
};

export default Cart;
