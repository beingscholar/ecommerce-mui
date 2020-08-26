import React, { useEffect, useState } from 'react';
import { Button, Typography,Link, Grid,Container, CssBaseline, Card,CardContent,CardMedia, Box } from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { NotificationManager } from "react-notifications";
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

//stripe
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


//icons
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import StayCurrentPortraitOutlinedIcon from '@material-ui/icons/StayCurrentPortraitOutlined';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import DirectionsBikeOutlinedIcon from '@material-ui/icons/DirectionsBikeOutlined';

//table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import { Auth } from "aws-amplify";
const CART_API_URL =
    "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/carts";
const PRODUCT_API_URL =
    "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/products";
const ORDER_API_URL=
    "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/orders";

const useStyles = makeStyles(theme => ({
    orderCard: {
        backgroundColor: '#F0F0F0'
    },
}));

export default function Checkout(){
    const classes=useStyles();
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [country, setCountry] = useState("");
    const [addressState, setAddressState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [cart_id, setCart_id] = useState("0");
    const [user_id, setUser_id] = useState("");


    //payment form
    const [state, setState] = useState({
        Cod: false,
        CreditCard: false,
        Paypal: false,
    });

    const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    };

    const { Cod, CreditCard, Paypal } = state;
    const error = [Cod, CreditCard, Paypal].filter((v) => v).length !== 2;

    useEffect(() => {
        Auth.currentAuthenticatedUser()
        .then(user=>{
            setUser_id(user.attributes.sub);
        })
        trackPromise(
            fetch(CART_API_URL + "/test")
                .then((response)=>{
                    return response.json();
                })
                .then(data => {
                    setCart(data.items);
                    var cartArr = data.items;
                    var promises = [];
                    cartArr.forEach(async function(item) {
                        console.log(item.product_id);
                        var promise = await fetch(PRODUCT_API_URL+"/"+item.product_id)
                        .then(response=>{return response.json()})
                        .then(data=>{
                            data.products[0].quantity=item.quantity;
                            setProducts(products => [...products, data.products[0]]); })
                        .catch(error=>{
                            alert(error);
                        })
                
                        promises.push(promise);
                    });

                })
                .catch(error => {
                    alert(error);
                })
        );
    },[]); 

    function handleSubmit(name, email, address, address2, city, state,zipCode, paymentMethod){
        var data = {
            name:name,
            email:email,
            address:address,
            address2:address2,
            country:country,
            state:state,
            zipCode:zipCode,
            city:city,
            paymentMethod:paymentMethod,
            cart_id:cart_id,
            user_id:"test" // TODO: use actual user_id
        };
        fetch(ORDER_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.status === 404 || response.status === 400) {
                    NotificationManager.error(
                        "Error creating order. Please ensure all fields are correct."
                    );
                    return response.json();
                }
                NotificationManager.success("Successfully created order.");
            })
            .catch(error => {
                console.error("Error:", error);
            });
        
    }
    var cartData = (
        <div>
         <Grid container spacing={2}>
             <Card>
                 <CardContent>
                 <h1>
                   Your shopping cart is empty
                 </h1>
                  
                 <Button variant="contained" color="primary" href="#">
                     Empty Cart
                 </Button>
                 <p>You may add items to your shopping cart here.</p>
 
                 </CardContent>
              </Card>
          </Grid>
        </div>
     );
    var productsList=(
        <div>
            {" "}
        </div>
    )
 
   if (cart){

        productsList = (
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  
                  <TableCell 
                    align="right"
                    style={{
                        textAlign: 'center'
                    }}>Quantity
                    </TableCell>
                  
                  <TableCell 
                    align="right"
                    style={{
                        textAlign: 'center'
                    }}>Price
                    </TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.productId}>
                    <TableCell component="th" scope="row">
                        <Grid container direction="row" alignItems="center" spacing={2}>
                            <Grid item md={6}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={product.imageUrl} /* change to product.imageUrl */
                                title="Image title"
                                style={{ height: "120px" }}
                            />
                            </Grid>
                            <Grid item md={6}>
                                <h3>{product.productName}</h3>
                                <p>{product.productDescription}</p>   
                            </Grid>
                        </Grid>
                    </TableCell>
                    <TableCell>
                        <Grid container direction="column" alignItems="center" spacing={1}>
                            <Grid item md={6}>
                                {product.quantity}
                            </Grid>
                            <Grid item md={6}>
                                <Link to=''>Remove</Link>
                            </Grid>
                        </Grid>
                    </TableCell>

                    <TableCell align="right">
                        <Grid container direction="column" alignItems="center" spacing={1}>
                            <Grid item>
                                <h3>{product.currency} {product.price}</h3>
                            </Grid>
                        </Grid>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
    }

    return(
        <div>
        <Container maxWidth="lg">
            <Box my="2em">
                <span>Checkout (x) Items</span>
            </Box>
            <Grid container spacing={3}>
                <Grid item md={8}>
                    <Card variant="outlined">
                        <CardContent>
                            
                            <Box mb="1.5em">
                                <span>Shipping Details</span>
                            </Box>

                            <Grid container direction="row" alignItems="center" spacing={5}>
                                <Grid item md={1}>
                                    <LocationOnOutlinedIcon></LocationOnOutlinedIcon>
                                </Grid>
                                <Grid item md={9}>
                                    <h3>Maria Dela Cruz</h3>
                                    <p>Metro Manila, Quezon City, Quezon City, Project 6</p>
                                </Grid>
                                <Grid item md={2}>
                                    <Link to=''>Edit</Link>
                                </Grid>
                            </Grid>
            
                        
                            <Grid container direction="row" alignItems="center" spacing={5}>
                                <Grid item md={1}>
                                    <ReceiptOutlinedIcon></ReceiptOutlinedIcon>
                                </Grid>
                                <Grid item md={9}>
                                    <h3>Default to Billing Address</h3>
                                </Grid>
                                <Grid item md={2}>
                                    <Link to=''>Edit</Link>
                                </Grid>
                            </Grid>

                            <Grid container direction="row" alignItems="center" spacing={5}>
                                <Grid item md={1}>
                                    <StayCurrentPortraitOutlinedIcon></StayCurrentPortraitOutlinedIcon>
                                </Grid>
                                <Grid item md={9}>
                                    <h3>9124556770</h3>
                                </Grid>
                                <Grid item md={2}>
                                    <Link to=''>Edit</Link>
                                </Grid>
                            </Grid>

                            <Grid container direction="row" alignItems="center" spacing={5}>
                                <Grid item md={1}>
                                    <MailOutlinedIcon></MailOutlinedIcon>
                                </Grid>
                                <Grid item md={9}>
                                    <h3>mariadelacruz@gmail.com</h3>
                                </Grid>
                                <Grid item md={2}>
                                    <Link to=''>Edit</Link>
                                </Grid>
                            </Grid>

                            <Box my="1.5em">
                                <Divider/>
                            </Box>
                            
                            <Box mb="1.5em">
                                <span>Review Order</span>
                            </Box>
                            
                            {productsList}
                            
                            
                            <Box my="1.5em">
                                <Grid container direction="row" alignItems="center" spacing={4}>
                                    <Grid item md={1}>
                                        <DirectionsBikeOutlinedIcon></DirectionsBikeOutlinedIcon>
                                    </Grid>
                                    <Grid item md={11}>
                                        <span>Standard Delivery: Estimated time of Arrival 2-5 July</span>
                                    </Grid>
                                </Grid>
                            </Box>
                                                        
                            <Card variant="outlined" className={classes.orderCard}>
                                <CardContent>
                                <Grid container direction="column" alignItems="center" spacing={4}>

                                    <Grid container item direction="row" alignItems="center" spacing={4}>
                                        <Grid item>
                                        <h3>Order Summary</h3>
                                        </Grid>
                                    </Grid>
                                    <Grid container item direction="row" alignItems="center" spacing={4}>
                                        <Grid item md={9}>
                                        <p>Subtotal (x) items</p>
                                        </Grid>
                                        <Grid item md={3}>
                                        <p>USD 690</p>
                                        </Grid>
                                    </Grid>
                                    <Grid container item direction="row" alignItems="center" spacing={4}>
                                        <Grid item md={9}>
                                        <p>Shipping Fee</p>
                                        </Grid>
                                        <Grid item md={3}>
                                        <p>USD 10</p>
                                        </Grid>
                                    </Grid>
                                    <Grid container item direction="row" alignItems="center" spacing={4}>
                                        <Grid item md={9}>
                                        <h3>Total</h3>
                                        </Grid>
                                        <Grid item md={3}>
                                        <h3>USD 700</h3>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                </CardContent>
                            </Card>
                            <Grid container justify="center">

                                <Box my="2em">
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        disableElevation
                                        type='submit'
                                    >
                                        Place Order
                                    </Button>
                                </Box>
                            </Grid>

                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={4}>
                    <Card variant="outlined">
                        <CardContent>  
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Payment Options</FormLabel>
                                <FormGroup>
                                  <FormControlLabel
                                    control={<Checkbox checked={Cod} onChange={handleChange} name="Cod" />}
                                    label="Cash on Delivery"
                                  />
                                  <FormControlLabel
                                    control={<Checkbox checked={CreditCard} onChange={handleChange} name="CreditCard" />}
                                    label="Credit Card/Debit Card"
                                  />
                                  <FormControlLabel
                                    control={<Checkbox checked={Paypal} onChange={handleChange} name="Paypal" />}
                                    label="Paypal"
                                  />
                                </FormGroup>
                            </FormControl>

                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </Container>
        
 

        </div>
        
    );
}