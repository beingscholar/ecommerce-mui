import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  makeStyles
} from "@material-ui/core";
import { Auth } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { useParams } from "react-router";
import ProductDelivery from "./ProductDelivery_old";
import ProductSummary from "./ProductSummary_old";

const url =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/products";

const useStyles = makeStyles({
  container: {
    height: "100%"
  }
});

const ProductProfile = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [userId, setUserId] = useState("");
  const [product, setProduct] = useState();

  useEffect(() => {
    trackPromise(
      Auth.currentAuthenticatedUser().then(user => {
        setUserId(user.attributes.sub);
      })
    );
    trackPromise(
      fetch(`${url}/${id}`)
        .then(response => response.json())
        .then(data => {
          setProduct(data.products[0]);
        })
        .catch(error => {
          alert(error);
        })
    );
  }, [id]);

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
    <Box style={{ padding: "24px" }}>
      <Grid container direction="row" spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          {product ? (
            <ProductSummary userId={userId} product={product} />
          ) : (
            LoadingCard
          )}
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          {product ? (
            <ProductDelivery productSupplier={product.supplier} />
          ) : (
            LoadingCard
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductProfile;
