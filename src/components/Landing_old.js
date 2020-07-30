import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Link as RouterLink,
  Route,
  Switch,
} from "react-router-dom";
import { trackPromise } from "react-promise-tracker";

import Link from "@material-ui/core/Link";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import { Button } from "@material-ui/core";

const url =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/products";

const useStyles = makeStyles((theme) => ({
  navLink: {
    margin: theme.spacing(2),
    fontSize: "1rem",
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  authLinks: {
    position: "relative",

    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Landing() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    trackPromise(
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setProducts(data.products);
        })
        .catch((error) => {
          alert(error);
        })
    );
  }, []);

  if (products) {
    var productList = products.map((product) => {
      return (
        <Grid item key={product.productId} xs={12} sm={6} md={4}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={product.imageUrl} /* change to product.imageUrl */
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {product.productName}
              </Typography>
              <Typography color="textSecondary">
                {product.currency} {product.price}
              </Typography>
              <Typography>{product.productDescription}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                <Link
                  component={RouterLink}
                  to={"/products/" + product.productId}
                  color="textSecondary"
                >
                  View
                </Link>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      );
    });
  }
  return (
    <div>
      <div className={classes.heroContent}>
        <Typography variant="h1" align="center" color="textPrimary">
          Your Website
        </Typography>
        <Typography variant="h5" paragraph align="center" color="textSecondary">
          Customer Frontend
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button variant="contained" color="primary" href="#">
                Browse Products
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
      {/* MAIN CONTENT */}
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {productList}
        </Grid>
      </Container>
    </div>
  );
}
