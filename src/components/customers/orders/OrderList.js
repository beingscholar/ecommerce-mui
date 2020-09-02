import { Box, Link, CardMedia } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import React from "react";
import CustomerMenu from "../CustomerMenu";
import Typography from "@material-ui/core/Typography";

const OrderList = () => {
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
                <Box className="orders-list--row">
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
                    <Box className="status delivered">Delivered</Box>
                    <Box className="delivery-date">
                      Delivered on 30 Jun 2020
                    </Box>
                  </Box>
                </Box>

                <Box className="orders-list--row">
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
                    <Box className="status delivered">Delivered</Box>
                    <Box className="delivery-date">
                      Delivered on 30 Jun 2020
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default OrderList;
