import { Box, Button, ListItem, List } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import React from "react";

const ProductDetails = (props) => {
  const { productDetails } = props.product;

  if (!productDetails) {
    return <Box></Box>;
  }

  const sections = [
    "Highlights",
    "Other Specifications",
    "Description",
    "Terms & Conditions",
  ];

  const accordionItems = sections.map((section) => (
    <Accordion>
      <AccordionSummary expandIcon={<AddBoxOutlinedIcon />}>
        <Typography variant="subtitle1">{section}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {Array.isArray(productDetails[section]) ? (
          <List>
            {productDetails[section].map((item) => (
              <ListItem style={{ paddingTop: "0px" }}>
                <Typography>{item}</Typography>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>{productDetails[section]}</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  ));

  return (
    <Box>
      <Box className="primary-accordian" style={{ marginBottom: "24px" }}>
        {accordionItems}
      </Box>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Typography style={{ marginRight: "8px" }}>
          Was this information helpful to you?
        </Typography>
        <Button variant="outlined" style={{ marginRight: "8px" }}>
          Yes
        </Button>
        <Button variant="outlined" style={{ marginRight: "8px" }}>
          No
        </Button>
      </Box>
    </Box>
  );
};

export default ProductDetails;
