import { Box, Button, ButtonGroup } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";

const ProductDelivery = props => {
  const [filteredValue, setFilteredValue] = React.useState("");

  return (
    <Box className="primary-accordian">
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Highlights</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
            <li>Lorem Ipsum Dolor dummy text.</li>
            <li>Lorem Ipsum Dolor dummy text.</li>
            <li>Lorem Ipsum Dolor dummy text.</li>
            <li>Lorem Ipsum Dolor dummy text.</li>
            <li>Lorem Ipsum Dolor dummy text.</li>
            <li>Lorem Ipsum Dolor dummy text.</li>
            <li>Lorem Ipsum Dolor dummy text.</li>
            <li>Lorem Ipsum Dolor dummy text.</li>
            <li>Lorem Ipsum Dolor dummy text.</li>
            <li>Lorem Ipsum Dolor dummy text.</li>
          </ul>
        </AccordionDetails>
      </Accordion>
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Other Specification</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Description</Typography>
        </AccordionSummary>
      </Accordion>
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography>Terms &amp; Conditions</Typography>
        </AccordionSummary>
      </Accordion>

      <Typography component="div" className="helpful-info">
        Was this information helpful to you?
        <ButtonGroup>
          <Button variant="outlined" className="default">
            Yes
          </Button>
          <Button variant="outlined" className="default">
            No
          </Button>
        </ButtonGroup>
      </Typography>
    </Box>
  );
};

export default ProductDelivery;
