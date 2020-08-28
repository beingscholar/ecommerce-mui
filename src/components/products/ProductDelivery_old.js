import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  makeStyles,
  Link,
  Divider,
} from "@material-ui/core";
import {
  RoomOutlined,
  LocalShippingOutlined,
  MonetizationOnOutlined,
  CheckOutlined,
} from "@material-ui/icons";

const useStyles = makeStyles({
  container: {
    height: "100%",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    fontSize: "16px",
    fontWeight: "500",
    marginBottom: "12px",
  },
  body: {
    fontSize: "14px",
    fontWeight: "300",
    marginRight: "8px",
  },
  row: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
    fontWeight: "300",
    "& svg": {
      marginRight: "8px",
    },
  },
  divider: {
    marginBottom: "12px",
  },
  sellerRating: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  percentage: {
    fontSize: "48px",
  },
});

const ProductDelivery = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Card className={classes.container}>
        <CardContent className={classes.contentContainer}>
          <Typography className={classes.header} variant="h3">
            Delivery Options
          </Typography>
          <Box className={classes.row}>
            <RoomOutlined color="action" fontSize="1.5rem" />
            <Typography className={classes.body} variant="body1">
              {"Metro Manila Quezon City, Quezon City, Project 6"}
            </Typography>
            <Link className={classes.body}>Change</Link>
          </Box>
          <Divider className={classes.divider} />
          <Box className={classes.row}>
            <LocalShippingOutlined color="action" fontSize="1.5rem" />
            <Typography className={classes.body} variant="body1">
              {"Standard Delivery"}
            </Typography>
            <Typography
              className={classes.body}
              variant="body1"
              color="textSecondary"
            >
              {"1-3 Days"}
            </Typography>
          </Box>
          <Divider className={classes.divider} />
          <Box className={classes.row}>
            <MonetizationOnOutlined color="action" fontSize="1.5rem" />
            <Typography className={classes.body} variant="body1">
              {"Cash on Delivery Available"}
            </Typography>
          </Box>
          <Divider className={classes.divider} />
          <Box className={classes.row}>
            <Typography variant="subtitle2">Return & Warranty</Typography>
          </Box>
          <Box className={classes.row}>
            <CheckOutlined color="action" fontSize="1.5rem" />
            <Typography className={classes.body} variant="body1">
              {"100% Authentic"}
            </Typography>
          </Box>
          <Box className={classes.row}>
            <CheckOutlined color="action" fontSize="1.5rem" />
            <Typography className={classes.body} variant="body1">
              {"15 Days Return"}
            </Typography>
          </Box>
          <Divider className={classes.divider} />
          <Box
            className={classes.row}
            style={{ justifyContent: "space-between" }}
          >
            <Typography variant="subtitle2">
              Sold by {props.productSupplier}
            </Typography>
            <Link className={classes.body}>View Store</Link>
          </Box>
          <Box
            className={classes.row}
            style={{ justifyContent: "space-around" }}
          >
            <Box className={classes.sellerRating}>
              <Typography className={classes.body} variant="body2">
                Positive Seller Rating
              </Typography>
              <Typography className={classes.percentage}>{100}%</Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box className={classes.sellerRating}>
              <Typography className={classes.body} variant="body2">
                Ships on time
              </Typography>
              <Typography className={classes.percentage}>{100}%</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDelivery;
