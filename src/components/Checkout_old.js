import React, { useEffect, useState } from 'react';
import { Button, Typography,Link, Grid,Container, CssBaseline, Card,CardContent,CardMedia } from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { NotificationManager } from "react-notifications";
import { Auth } from "aws-amplify";
const CART_API_URL =
    "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/carts";
const PRODUCT_API_URL =
    "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/products";
const ORDER_API_URL=
    "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/orders";
const useStyles = makeStyles(theme => ({
    root: {
         '& .MuiTextValidator-root': {
         margin: theme.spacing(2),
         flexGrow:1,
         width:"auto",
         },
         padding:1.5+"em",
         border:"thin solid #d3d3d3"
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },

    avatar: {
      margin: "auto",
      backgroundColor: theme.palette.secondary.main,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },

    paper: {
      padding:1.5+"em",
      border:"thin solid #d3d3d3",
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [cart_id, setCart_id] = useState("0");
    const [user_id, setUser_id] = useState("");
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
    if(cart){
        productsList=products.map((product)=>{
            return(
            <Card className={classes.root} key={product.productId}>
                <CardMedia 
                className={classes.cover}
                image="https://source.unsplash.com/random"
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography variant="h5" component="h5">
                            <Link component={RouterLink} to={"/products/" +product.productId}>{product.productName}</Link>
                        </Typography>
                        <Typography variant="subtitle1">
                            Quantity: {" "} {product.quantity}
                        </Typography>
                        <Typography variant="h5" component="h5" color="textSecondary">
                            {product.currency} {" "} {product.price}
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        )})
        cartData = (
            <div>
                {productsList}
            </div>
        )
    }

    return(
        <div>
            {cartData}
        <Container maxWidth="xs">
              <CssBaseline/>
          <div className={classes.paper}>
              <Typography variant="h5">Checkout</Typography>
              <ValidatorForm className={classes.form} noValidate onSubmit={e=>{ handleSubmit(name, email, address, address2, city, state,zipCode, paymentMethod);e.preventDefault();}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextValidator
                                required
                                label="Name"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextValidator
                                required
                                label="Email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextValidator
                                required
                                label="Address One"
                                style={{width:"100%"}}
                                value={address}
                                onChange={(e)=>setAddress(e.target.value)}
                                />
                        </Grid>
                
                        <Grid item xs={12} sm={4}>
                            <TextValidator
                                required
                                label="City"
                                value={city}
                                onChange={(e)=>setCity(e.target.value)}
                                />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextValidator
                                required
                                label="State"
                                value={state}
                                onChange={(e)=>setState(e.target.value)}
                                />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextValidator
                                required
                                label="ZIP Code"
                                value={zipCode}
                                onChange={(e)=>setZipCode(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextValidator
                                label="Address Two"
                                style={{width:"100%"}}
                                value={address2}
                                onChange={(e)=>setAddress2(e.target.value)}
                                />   
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextValidator
                                label="Country"
                                style={{width:"100%"}}
                                value={country}
                                onChange={(e)=>setCountry(e.target.value)}
                                />   
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextValidator
                                label="Payment Method"
                                style={{width:"100%"}}
                                value={paymentMethod}
                                onChange={(e)=>setPaymentMethod(e.target.value)}
                                />   
                        </Grid>
                        <Grid item xs={12}>
                            <Button 
                            type="submit"
                            color="primary"
                            variant="contained">
                                Confirm Order
                            </Button>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </div>
        </Container>
        </div>
        
    );
}