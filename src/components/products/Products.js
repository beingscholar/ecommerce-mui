import { Box, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import Drawer from "@material-ui/core/Drawer";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import Rating from "@material-ui/lab/Rating";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import MediaQuery from "react-responsive";
import { Link as RouterLink } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { PRODUCT_API_URL } from "../../config/apiUrl";

export default function Landing() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    trackPromise(
      fetch(PRODUCT_API_URL)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setProducts(data.products);
        })
        .catch(error => {
          alert(error);
        })
    );
  }, []);

  const [state, setState] = React.useState({
    bottom: false
  });

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`
    };
  }

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = anchor => (
    <div role="presentation" className="mobile-filters">
      <Typography component="h3">
        Filters
        <IconButton
          color="primary"
          onClick={toggleDrawer("bottom", false)}
          onKeyDown={toggleDrawer("bottom", false)}
        >
          <CloseIcon />
        </IconButton>
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="Brand" {...a11yProps(0)} />
        <Tab label="Price" {...a11yProps(1)} />
        <Tab label="Rating" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} className="tab-content" index={0}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox name="checkedA" color="primary" />}
            label="Samsung"
          />
          <FormControlLabel
            control={<Checkbox name="checkedA" color="primary" />}
            label="Oppo"
          />
          <FormControlLabel
            control={<Checkbox name="checkedA" color="primary" />}
            label="Vivo"
          />
        </FormGroup>
      </TabPanel>
      <TabPanel value={value} className="tab-content" index={1}>
        <Box className="price-filter">
          <TextField id="outlined-basic" placeholder="Min" variant="outlined" />
          <Typography component="span">-</Typography>
          <TextField id="outlined-basic" placeholder="Max" variant="outlined" />
        </Box>
      </TabPanel>
      <TabPanel value={value} className="tab-content" index={2}>
        <FormGroup className="product-rating">
          <FormControlLabel
            control={<Checkbox name="checkedA" color="primary" />}
            label={
              <Rating
                name="half-rating-read"
                readOnly
                defaultValue={1}
                precision={1}
              />
            }
          />
          <FormControlLabel
            control={<Checkbox name="checkedA" color="primary" />}
            label={
              <Rating
                name="half-rating-read"
                readOnly
                defaultValue={2}
                precision={1}
              />
            }
          />
          <FormControlLabel
            control={<Checkbox name="checkedA" color="primary" />}
            label={
              <Rating
                name="half-rating-read"
                readOnly
                defaultValue={3}
                precision={1}
              />
            }
          />
          <FormControlLabel
            control={<Checkbox name="checkedA" color="primary" />}
            label={
              <Rating
                name="half-rating-read"
                readOnly
                defaultValue={4}
                precision={1}
              />
            }
          />
          <FormControlLabel
            control={<Checkbox name="checkedA" color="primary" />}
            label={
              <Rating
                name="half-rating-read"
                readOnly
                defaultValue={5}
                precision={1}
              />
            }
          />
        </FormGroup>
      </TabPanel>
      <Box component="div" className="mobile-filters--footer">
        <Button
          variant="contained"
          color="primary"
          onClick={toggleDrawer("bottom", false)}
          onKeyDown={toggleDrawer("bottom", false)}
          fullWidth
          disableElevation
          type="button"
        >
          Apply
        </Button>
      </Box>
    </div>
  );

  const [sort, setSort] = React.useState("");

  const SortBy = event => {
    setSort(event.target.value);
  };

  if (products) {
    var productList = products.map(product => {
      const imgIndex = product.baseImage && product.baseImage.split("-")[1];
      const baseImageURL = imgIndex
        ? product.imageUrls[imgIndex]
        : product.imageUrl;
      return (
        <Grid key={product.productId} item xs={12} sm={4} md={3} spacing={0}>
          <Card className="product-card">
            <CardActionArea
              component={RouterLink}
              to={"/products/" + product.productId}
            >
              <CardMedia image={baseImageURL} title="Image title" />
            </CardActionArea>

            <CardContent>
              <Typography component="h4">{product.productName}</Typography>
              <Typography component="h5">
                {product.currency} {product.price}
              </Typography>
              <Typography className="description">
                {product.productDescription}
              </Typography>
              <Typography className="product-rating">
                <Rating
                  name="half-rating-read"
                  defaultValue={2.5}
                  precision={0.5}
                  readOnly
                />
                (55)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  }

  return (
    <Box component="div" className="main-content">
      <MediaQuery maxWidth={1023}>
        <Button
          variant="contained"
          color="primary"
          className="mobile-filter-icon"
          onClick={toggleDrawer("bottom", true)}
        >
          <FilterListIcon />
        </Button>
        <Drawer
          anchor={"bottom"}
          open={state["bottom"]}
          onClose={toggleDrawer("bottom", false)}
        >
          {list("bottom")}
        </Drawer>
      </MediaQuery>

      <Container maxWidth="lg">
        <Grid container spacing={0}>
          <MediaQuery minWidth={1024}>
            <Grid item xs={12} md={3} spacing={0}>
              <Box component="div" className="product-filters">
                <Typography component="h3">Filters</Typography>
                <Box component="div" className="filter-box">
                  <Typography>Brand</Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox name="checkedB" color="primary" />}
                      label="Samsung"
                    />
                    <FormControlLabel
                      control={<Checkbox name="checkedB" color="primary" />}
                      label="Oppo"
                    />
                    <FormControlLabel
                      control={<Checkbox name="checkedB" color="primary" />}
                      label="Vivo"
                    />
                  </FormGroup>
                  <Button
                    variant="outlined"
                    color="primary"
                    disableElevation
                    type="button"
                  >
                    View More
                  </Button>
                </Box>
                <Box component="div" className="filter-box">
                  <Typography>Price</Typography>
                  <Box className="price-filter">
                    <TextField
                      id="outlined-basic"
                      placeholder="Min"
                      variant="outlined"
                    />
                    <Typography component="span">-</Typography>
                    <TextField
                      id="outlined-basic"
                      placeholder="Max"
                      variant="outlined"
                    />
                    <IconButton>
                      <ArrowForwardIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Box component="div" className="filter-box">
                  <Typography>Rating</Typography>
                  <Box component="div" className="product-rating">
                    <Rating
                      name="half-rating-read"
                      defaultValue={3}
                      precision={1}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </MediaQuery>

          <Grid item xs={12} md={9} spacing={0}>
            <Box component="div" className="all-products">
              <Box component="div" className="all-products--filter">
                <Typography>
                  {/* Smart Phones */}
                  All Products
                  <Typography component="small">({products.length} items)</Typography>
                </Typography>
                <Paper component="form" elevation={0}>
                  <SearchIcon />
                  <InputBase placeholder="search within category" />
                </Paper>
                <Box component="div" className="card-sorting">
                  <Typography component="label">Sort by:</Typography>
                  <FormControl>
                    <Select
                      value={sort}
                      onChange={SortBy}
                      displayEmpty
                      IconComponent={() => <ExpandMoreIcon />}
                    >
                      <MenuItem value="">Popularity</MenuItem>
                      <MenuItem value={20}>Newest</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Grid container spacing={0}>
                {products && productList}
              </Grid>
              {/* <Button
                variant="outlined"
                color="primary"
                disableElevation
                type="button"
              >
                Load More
              </Button> */}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
