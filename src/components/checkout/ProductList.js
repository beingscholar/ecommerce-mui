import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { 
    Button, 
    Link, 
    Grid,
    Card,
    CardContent,
    CardMedia,
    Box } from '@material-ui/core';

//table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Auth } from "aws-amplify";
import { trackPromise } from "react-promise-tracker";



const url =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/customers";

const PRODUCT_API_URL =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/products";

const CART_API_URL =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/carts";


function getModalStyle() {
  return {
    margin: "auto"
  };
}

const useStyles = makeStyles(theme => ({

}));

const ProductList = () => {
const classes=useStyles();
const [products, setProducts] = useState([]);
const [cart, setCart] = useState([]);
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

var productsList = (
<Box className="product-table">
    <MediaQuery minWidth={768}>
      <Box className="product-table--head">
        <Box className="product-table--col">
          <Typography>Product</Typography>
        </Box>
        <Box className="product-table--col">
          <Typography>Quantity</Typography>
          <Typography>Price</Typography>
        </Box>
      </Box>
    </MediaQuery>
    {products.map((product) => (
      <Card key={product.productId} className="product-table--row">
        <CardMedia
          image={product.imageUrl} /* change to product.imageUrl */
          title="Image title"
        ></CardMedia>
        <CardContent>
          <Box className="product-info">
            <Typography component="h3">{product.productName}</Typography>
            <Typography>{product.productDescription}</Typography>
          </Box>

          <Box className="product-quantity">
            <Typography>
              <Typography component="span">{product.quantity}</Typography>
            </Typography>
            <Link>Remove</Link>
          </Box>
          <Box className="product-price">
            <Typography>
              {product.currency} {product.price}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    ))}
  </Box>
)

return (
    productsList
  );
};

export default ProductList;
