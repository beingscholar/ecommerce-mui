import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {Link as RouterLink} from "react-router-dom";
import { trackPromise } from "react-promise-tracker";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import TextField from "@material-ui/core/TextField";

const url =
    "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/products";


const cart_url = "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/carts";
const inventory_url="http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/inventory";


const useStyles = makeStyles((theme)=>({
    card: {
        borderRadius: 0,
        boxShadow: "none",
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    grid:{
        padding:'1em',
    },
}))

const ProductProfile = () => {
    const classes = useStyles();
    let { id } = useParams();
    const [product, setProduct] = useState();
    const [productQuantity, setProductQuantity] = useState("-1");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        trackPromise(
            fetch(url + "/" + id)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    var productsArr = data.products;
                    var promises = [];
                    productsArr.forEach(async function(item) {
                        var promise = await fetch(inventory_url+"/"+item.productId)
                        .then(response=>{return response.json()})
                        .then(data=>{
                            console.log(data.product.quantity);
                            setProductQuantity(data.product.quantity);
                            setProduct(item); 
                            })
                        .catch(error=>{
                            alert(error);
                        })
                
                        promises.push(promise);
                    });

                    setProduct(data.products[0]);
                })
                .catch(error => {
                    alert(error);
                })
        );
    },[id]);
    var productData=(
        <div></div>
    )
    if (product) {
        productData = (
            <div>
                <Grid className={classes.grid} container spacing={4}>
                    <Grid item xs={12} sm={9}>
                        <Card className={classes.card}>
                            <CardMedia 
                                className = {classes.cardMedia}
                                image="https://source.unsplash.com/random" /* change to product.imageUrl */
                                title="Image title"
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Card className={classes.card}>   
                            <CardContent>
                                <Divider/>
                                <Typography variant="h4">
                                    {product.productName}
                                </Typography>
                                <Typography color="textSecondary">
                                    {product.currency} {" "} {product.price}
                                </Typography>
                                <Typography color="textSecondary" variant="subtitle2">Quantity: {" "}{productQuantity} </Typography>
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
                                onChange={e=>{setQuantity(e.target.value)}}
                                variant="filled"
                            />
                            <Button variant="contained" 
                                    color="primary" 
                                    style={{marginTop:"1em"}}
                                    onClick={()=> {
                                    
                                        // POST request using fetch inside useEffect React hook
                                        const requestOptions = {
                                            method: 'PUT',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({

                                                "product_id": id,
                                                "action": "add",
                                                "quantity": quantity
                                            })
                                        };
                                       trackPromise(
                                           fetch(cart_url + "/test", requestOptions)
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
                                    
                                    component={RouterLink} to="/cart"
                                    >Add to Cart
                     
                            </Button> 
                        </form>
                    </Grid>
                </Grid>
            </div>
        );
    }
    return <div>{productData}</div>;
};

export default ProductProfile;