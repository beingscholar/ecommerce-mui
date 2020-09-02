import { Box } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import React from "react";
import CustomerMenu from "../CustomerMenu";

const OrderList = () => {
	return (
		<Box className="primary-structure">
			<Container maxWidth="lg">
				<Grid container>
					<CustomerMenu customerName={"Mayank"} />
				</Grid>
			</Container>
		</Box>
	);
};
export default OrderList;
