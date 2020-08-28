import {
  Box,
  ButtonGroup,
  CardMedia,
  CircularProgress,
  IconButton,
  Link,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import { Favorite, FavoriteBorderOutlined } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReplyIcon from "@material-ui/icons/Reply";
import Rating from "@material-ui/lab/Rating";
import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { useHistory, useParams } from "react-router";
import { CART_API_URL, INVENTORY_URL } from "../../../config/apiUrl";
import Slider from "react-slick";
import NumberField from "../../ui/NumberField";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
  },
  cardMedia: {
    borderRadius: "10px",
    paddingTop: "56.25%", // 16:9
  },
  grid: {
    padding: "1em",
  },
  checkoutForm: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "16px",
  },
  checkoutButtons: {
    display: "flex",
  },
  iconsRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  linkRowItem: {
    marginRight: "0.5em",
  },
  quantityRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1em",
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const ProductSummary = ({ product, userId }) => {
  const classes = useStyles();
  const history = useHistory();
  let { id } = useParams();
  const [productQuantity, setProductQuantity] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [toggleFavorite, setToggleFavorite] = useState(false);

  const [storageCapacity, setStorageCapacity] = React.useState("64");
  const [ratingValue, setRatingValue] = React.useState(2);

  const addToCart = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: id,
        action: "add",
        quantity: quantity,
      }),
    };
    trackPromise(
      fetch(`${CART_API_URL}/${userId}`, requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // setProduct(data);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        })
    );

    alert("✔️ added");
    history.push("/cart");
  };

  var productSlider = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    arrows: false,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: (
      <Box component="div">
        <ArrowBackIosIcon />
      </Box>
    ),
    nextArrow: (
      <Box component="div">
        <ArrowForwardIosIcon />
      </Box>
    ),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  useEffect(() => {
    trackPromise(
      fetch(`${INVENTORY_URL}/${product.productId}`)
        .then((response) => response.json())
        .then((data) => {
          setProductQuantity(parseInt(data.product.quantity));
        })
        .catch((error) => {
          alert(error);
        })
    );
  }, [product]);
  var productData = (
    <Box className={classes.container}>
      <Card className={classes.container}>
        <CardContent>
          <CircularProgress />
        </CardContent>
      </Card>
    </Box>
  );
  if (product) {
    const {
      productId,
      productName,
      productDescription,
      supplier,
      imageUrl,
      currency,
      price,
      category,
      createdDate,
    } = product || "";
    productData = (
      <Box
        component="div"
        className="primary-box product-gallery"
        px={3}
        py={5}
      >
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box className="product-slides">
              <CardMedia
                className={classes.cardMedia}
                image={imageUrl}
                title="Image title"
              />
              <Slider {...productSlider}>
                <Card key={product.productId}>
                  <CardActionArea>
                    <CardMedia
                      image={product.imageUrl} /* change to product.imageUrl */
                      title="Image title"
                    />
                  </CardActionArea>
                </Card>
                <Card key={product.productId}>
                  <CardActionArea>
                    <CardMedia
                      image={product.imageUrl} /* change to product.imageUrl */
                      title="Image title"
                    />
                  </CardActionArea>
                </Card>
                <Card key={product.productId}>
                  <CardActionArea>
                    <CardMedia
                      image={product.imageUrl} /* change to product.imageUrl */
                      title="Image title"
                    />
                  </CardActionArea>
                </Card>
                <Card key={product.productId}>
                  <CardActionArea>
                    <CardMedia
                      image={product.imageUrl} /* change to product.imageUrl */
                      title="Image title"
                    />
                  </CardActionArea>
                </Card>
                <Card key={product.productId}>
                  <CardActionArea>
                    <CardMedia
                      image={product.imageUrl} /* change to product.imageUrl */
                      title="Image title"
                    />
                  </CardActionArea>
                </Card>
                <Card key={product.productId}>
                  <CardActionArea>
                    <CardMedia
                      image={product.imageUrl} /* change to product.imageUrl */
                      title="Image title"
                    />
                  </CardActionArea>
                </Card>
                <Card key={product.productId}>
                  <CardActionArea>
                    <CardMedia
                      image={product.imageUrl} /* change to product.imageUrl */
                      title="Image title"
                    />
                  </CardActionArea>
                </Card>
                <Card key={product.productId}>
                  <CardActionArea>
                    <CardMedia
                      image={product.imageUrl} /* change to product.imageUrl */
                      title="Image title"
                    />
                  </CardActionArea>
                </Card>
                <Card key={product.productId}>
                  <CardActionArea>
                    <CardMedia
                      image={product.imageUrl} /* change to product.imageUrl */
                      title="Image title"
                    />
                  </CardActionArea>
                </Card>
                <Card key={product.productId}>
                  <CardActionArea>
                    <CardMedia
                      image={product.imageUrl} /* change to product.imageUrl */
                      title="Image title"
                    />
                  </CardActionArea>
                </Card>
              </Slider>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography component="h3">{productName}</Typography>
            <Typography component="h4">
              {currency} {price}
            </Typography>
            <Box component="div" className="share-wishlist">
              <Typography className="product-rating">
                <Rating
                  name="half-rating-read"
                  precision={0.5}
                  value={ratingValue}
                  onChange={(event, newValue) => {
                    setRatingValue(newValue);
                  }}
                />
                ({ratingValue})
              </Typography>
              <Box component="div" className="icon-group">
                <IconButton>
                  <ReplyIcon />
                </IconButton>
                <IconButton onClick={() => setToggleFavorite(!toggleFavorite)}>
                  {toggleFavorite ? (
                    <Favorite color="secondary" />
                  ) : (
                    <FavoriteBorderOutlined />
                  )}
                </IconButton>
              </Box>
            </Box>
            <List component="ul" className="have-questions">
              <ListItem>
                <ListItemLink href="#">
                  <ListItemText primary={ratingValue + " Ratings"} />
                </ListItemLink>
              </ListItem>
              <ListItem>
                <ListItemLink href="#">
                  <ListItemText primary={ratingValue + " Reviews"} />
                </ListItemLink>
              </ListItem>
              <ListItem>
                <ListItemLink href="#">
                  <ListItemText primary="Have Questions?" />
                </ListItemLink>
              </ListItem>
            </List>

            <Box className="color-family">
              <Typography>Color Family: Blue</Typography>

              <ul className="color-palette">
                <li>White</li>
                <li>Space Grey</li>
                <li>Black</li>
              </ul>
              <List component="ul" className="color-palette">
                <ListItem>
                  <ListItemLink href="#">
                    <ListItemText
                      primary="Blue"
                      style={{ backgroundColor: "blue" }}
                    />
                  </ListItemLink>
                </ListItem>
                <ListItem>
                  <ListItemLink href="#">
                    <ListItemText
                      primary="Space Grey"
                      style={{ backgroundColor: "grey" }}
                    />
                  </ListItemLink>
                </ListItem>
                <ListItem>
                  <ListItemLink href="#">
                    <ListItemText
                      primary="Black"
                      style={{ backgroundColor: "Black" }}
                    />
                  </ListItemLink>
                </ListItem>
              </List>
            </Box>

            <Typography className="strorage-capacity">
              Storage Capacity:
              <FormControl className="width-auto">
                <Select
                  value={storageCapacity}
                  onChange={(e) => setStorageCapacity(e.target.value)}
                  variant="outlined"
                  displayEmpty
                  IconComponent={() => <ExpandMoreIcon />}
                >
                  <MenuItem value="64">64GB</MenuItem>
                  <MenuItem value="128">128GB</MenuItem>
                </Select>
              </FormControl>
            </Typography>

            <Typography className="product-quantity">
              Quantity:
              <Box className="quantity">
                <NumberField
                  onChange={setQuantity}
                  value={quantity}
                  minValue={0}
                  maxValue={productQuantity}
                  style={{ marginRight: "10px" }}
                />
                {productQuantity > 0 && (
                  <Typography>Only {productQuantity} items left</Typography>
                )}
              </Box>
            </Typography>

            <ButtonGroup>
              <Button variant="outlined" color="primary">
                Buy Now
              </Button>
              <Button
                variant="contained"
                disableElevation
                color="primary"
                onClick={addToCart}
              >
                Add to Cart
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
    );
  }
  return productData;
};

export default ProductSummary;
