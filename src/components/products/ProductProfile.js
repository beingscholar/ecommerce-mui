import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import { Box, Divider, Link } from '@material-ui/core';
import { FavoriteBorder, Share } from '@material-ui/icons';
import NumberField from '../ui/NumberField';

const url =
  'http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/products';

const cart_url =
  'http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/carts';
const inventory_url =
  'http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/inventory';

const useStyles = makeStyles(theme => ({
  card: {
    height: '80%',
    margin: '1em'
  },
  cardMedia: {
    borderRadius: '10px',
    paddingTop: '56.25%' // 16:9
  },
  grid: {
    padding: '1em'
  },
  checkoutForm: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '16px'
  },
  checkoutButtons: {
    display: 'flex'
  },
  iconsRow: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  linkRowItem: {
    marginRight: '0.5em'
  },
  quantityRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1em'
  }
}));

const ProductProfile = () => {
  const classes = useStyles();
  let { id } = useParams();
  const [product, setProduct] = useState();
  const [productQuantity, setProductQuantity] = useState('-1');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    trackPromise(
      fetch(url + '/' + id)
        .then(response => {
          return response.json();
        })
        .then(data => {
          var productsArr = data.products;
          var promises = [];
          productsArr.forEach(async function (item) {
            var promise = await fetch(inventory_url + '/' + item.productId)
              .then(response => {
                return response.json();
              })
              .then(data => {
                console.log(data.product.quantity);
                setProductQuantity(data.product.quantity);
                setProduct(item);
              })
              .catch(error => {
                alert(error);
              });

            promises.push(promise);
          });

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
        <Card className={classes.card}>
          <Grid className={classes.grid} container direction='row' spacing={4}>
            <Grid item xs={12} sm={6}>
              <CardMedia
                className={classes.cardMedia}
                image={product.imageUrl}
                title='Image title'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardContent style={{ paddingTop: '0' }}>
                <Typography variant='h5'>{product.productName}</Typography>
                <Typography>
                  {product.currency} {product.price}
                </Typography>
                <Box className={classes.iconsRow}>
                  <Box style={{ display: 'flex' }}>
                    <Rating
                      style={{ marginRight: '10px' }}
                      value={4}
                      readOnly
                    />
                    <Typography color='textSecondary'>({5})</Typography>
                  </Box>
                  <Box>
                    <FavoriteBorder color='action' />
                    <Share color='action' />
                  </Box>
                </Box>
                <Box style={{ display: 'flex' }}>
                  <Link className={classes.linkRowItem} variant='body2'>
                    {5} Ratings
                  </Link>
                  <Divider
                    className={classes.linkRowItem}
                    orientation='vertical'
                    flexItem
                  />
                  <Link className={classes.linkRowItem} variant='body2'>
                    {5} Reviews
                  </Link>
                  <Divider
                    className={classes.linkRowItem}
                    orientation='vertical'
                    flexItem
                  />
                  <Link variant='body2'>Have questions?</Link>
                </Box>
              </CardContent>
              <form>
                <Box className={classes.checkoutForm}>
                  <Box className={classes.quantityRow}>
                    <Typography
                      variant='subtitle2'
                      style={{ marginRight: '10px' }}
                    >
                      Quantity:
                    </Typography>
                    {/* <TextField
                      id="filled-number"
                      type="number"
                      value={quantity}
                      onChange={e=>{setQuantity(e.target.value)}}
                      style={{width: "20px", marginRight: "10px"}}
                      inputProps={{style: {textAlign: "center"}}}
                    /> */}
                    <NumberField
                      onChange={setQuantity}
                      value={quantity}
                      minValue={0}
                      maxValue={parseInt(productQuantity)}
                      style={{ marginRight: '10px' }}
                    />
                    <Typography color='textSecondary' variant='subtitle2'>
                      Only {productQuantity} items left
                    </Typography>
                  </Box>
                  <Box className={classes.checkoutButtons}>
                    <Button
                      variant='outlined'
                      color='primary'
                      style={{ marginRight: '0.5em' }}
                    >
                      Buy Now
                    </Button>
                    <Button
                      variant='contained'
                      color='primary'
                      disableElevation
                      onClick={() => {
                        // POST request using fetch inside useEffect React hook
                        const requestOptions = {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            product_id: id,
                            action: 'add',
                            quantity: quantity
                          })
                        };
                        trackPromise(
                          fetch(cart_url + '/test', requestOptions)
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

                        alert('✔️ added');
                      }}
                      component={RouterLink}
                      to='/cart'
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
  return <div>{productData}</div>;
};

export default ProductProfile;
