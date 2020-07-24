import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { trackPromise } from "react-promise-tracker";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { Auth } from "aws-amplify";
import { Link as RouterLink} from 'react-router-dom';


const url =
    "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/billings";

const useStyles = makeStyles(theme => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(2),
            flexGrow: 1
        }
    },
    paper: {
        position: "absolute",
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflowX: "auto"
    },
    table: {
        minWidth: 650
    },
    tableHead: {
        fontWeight: "bold"
    }
}));


const CustomerBillings = () => {
    const classes = useStyles();

    const [billings, setBillings] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        console.log("page change");
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };
    useEffect(() => {
        
        trackPromise(
            Auth.currentAuthenticatedUser()
                .then(user=>{
                    fetch(url + "/customer/" + user.attributes.sub)
                        .then(response => {
                            return response.json();
                        })
                        .then(data => {
                            setBillings(data.billings);
                        })
                        .catch(error => {
                            alert(error);
                        })
                })
        );
    }, []);

    var billingList="You have no billings yet.";
    if (billings) {
        billingList = billings.map(billing => {
            return (
                <TableRow key={billing.invoiceId}>
                    <TableCell>{billing.invoiceId}</TableCell>
                    <TableCell data-testid="invoiceId" align="right">
                        {billing.orderId}
                    </TableCell>
                    <TableCell align="right">{billing.customerId}</TableCell>
                    <TableCell align="right">{billing.currency}</TableCell>
                    <TableCell align="right">{billing.subTotal}</TableCell>
                    <TableCell align="right">{billing.taxRate}</TableCell>
                    <TableCell align="right">{billing.taxDue}</TableCell>
                    <TableCell align="right">{billing.total}</TableCell>
                    <TableCell align="right">{billing.createdDate}</TableCell>
                    <TableCell align="right">{billing.updatedDate}</TableCell>
                </TableRow>
            );
        });
    }
    return( 
    <div>
        <Typography variant="h3">My Billings</Typography><br/> 
        <Button variant="contained"
        color="primary"
        component={RouterLink} to="/profile">
            Back to Profile
        </Button>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="a-dense-table">
                <TableHead>
                    <TableRow>
                    <TableCell
                                className={classes.tableHead}
                                align="right"
                            >
                                Invoice Id
                            </TableCell>
                            <TableCell
                                className={classes.tableHead}
                                align="right"
                            >
                                Order Id
                            </TableCell>
                            <TableCell
                                className={classes.tableHead}
                                align="right"
                            >
                                Customer Id
                            </TableCell>
                            <TableCell
                                className={classes.tableHead}
                                align="right"
                            >
                                Currency
                            </TableCell>
                            <TableCell
                                className={classes.tableHead}
                                align="right"
                            >
                                Subtotal
                            </TableCell>
                            <TableCell
                                className={classes.tableHead}
                                align="right"
                            >
                                Tax Rate
                            </TableCell>
                            <TableCell
                                className={classes.tableHead}
                                align="right"
                            >
                                Tax Due
                            </TableCell>
                            <TableCell
                                className={classes.tableHead}
                                align="right"
                            >
                                Total
                            </TableCell>
                            <TableCell
                                className={classes.tableHead}
                                align="right"
                            >
                                Created On
                            </TableCell>
                            <TableCell
                                className={classes.tableHead}
                                align="right"
                            >
                                Updated On
                            </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {billingList.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={billingList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
    </div>
    );
};

export default CustomerBillings;
