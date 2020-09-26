import { Box, CardMedia, Link } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Auth } from "aws-amplify";
import React, { Fragment, useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { ORDER_API_URL } from "../../../config/apiUrl";
import CustomerMenu from "../CustomerMenu";
import { Link as RouterLink } from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState("");
  // remove
  localStorage.removeItem("orderDetails");
  useEffect(() => {
    trackPromise(
      Auth.currentAuthenticatedUser().then(user => {
        fetch(ORDER_API_URL)
          .then(response => {
            return response.json();
          })
          .then(data => {
            setOrders(data.orders);
          })
          .catch(error => {
            alert(error);
          });
      })
    );
  }, []);

  let renderOrderList = "";
  if (orders) {
    renderOrderList = (
      <Fragment>
        {orders.map(order => {
          const {
            orderId,
            createdDate,
            name,
            paymentMethod,
            address,
            address2,
            city,
            state,
            country,
            zipCode,
            email,
            cart_id
          } = order;

          const customer_address = !Object.keys(order).length
            ? ""
            : address +
              ", " +
              address2 +
              ", " +
              city +
              ", " +
              state +
              ", " +
              country +
              " - " +
              zipCode;
          return (
            cart_id !== "0" && (
              <Box className="orders-list--row">
                <Box className="orders-list--header">
                  <Box className="wrap">
                    <Typography component="h4">
                      Order <Typography component="span">#{orderId}</Typography>
                    </Typography>
                    <Typography>
                      Placed on {new Date(createdDate).toUTCString("fr-CA")}
                      {/* 27 Jun 2020 17:32:26 */}
                    </Typography>
                  </Box>
                  <Link component={RouterLink} to={"/orders/" + orderId}>
                    View
                  </Link>
                </Box>
                <Box className="orders-list--body">
                  {/* <CardMedia title="Image title"></CardMedia> */}
                  <Box className="info">
                    <Typography className="title">Name: </Typography>
                    <Typography>{name}</Typography>
                  </Box>
                  <Box className="info">
                    <Typography className="title">Address: </Typography>
                    <Typography>{customer_address}</Typography>
                  </Box>
                  <Box>
                    <Typography className="title">Payment Method: </Typography>
                    <Typography>{paymentMethod}</Typography>
                  </Box>
                  {/* <Box className="quantity">Qty: 1000</Box> */}
                  {/* <Box className="status delivered">Delivered</Box> */}
                  {/* <Box className="delivery-date">Delivered on 30 Jun 2020</Box> */}
                </Box>
              </Box>
            )
          );
        })}
      </Fragment>
    );
  }

  return (
    <Box className="primary-structure">
      <Container maxWidth="lg">
        <Grid container>
          <CustomerMenu customerName={"Mayank"} />
          <Grid item xs={12} sm={9} md={10}>
            <Box className="primary-structure--content">
              <Box className="content-header">
                <Typography component="h3">Order List</Typography>
              </Box>
              <Box className="primary-structure--box orders-list">
                {orders && renderOrderList}

                {/* <Box className="orders-list--row">
                  <Box className="orders-list--header">
                    <Box className="wrap">
                      <Typography component="h4">
                        Order{" "}
                        <Typography component="span">
                          #301407703285229
                        </Typography>
                      </Typography>
                      <Typography>Placed on 27 Jun 2020 17:32:26</Typography>
                    </Box>
                    <Link>View</Link>
                  </Box>
                  <Box className="orders-list--body">
                    <CardMedia title="Image title"></CardMedia>
                    <Box className="info">
                      <Typography className="title">iphone SE 2020</Typography>
                      <Typography>Lorem Ipsum is simply dummy text.</Typography>
                    </Box>

                    <Box className="quantity">Qty: 1000</Box>
                    <Box className="status cancelled">Cancelled</Box>
                    <Box className="delivery-date">
                      Delivered on 30 Jun 2020
                    </Box>
                  </Box>
                </Box> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default OrderList;
