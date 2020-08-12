import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { trackPromise } from "react-promise-tracker";
import { NotificationManager } from "react-notifications";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

import { Auth } from "aws-amplify";
import CustomerEditForm from "./CustomerEditForm";

const url =
  "http://myproject-alb-692769319.ap-southeast-1.elb.amazonaws.com/customers";

function getModalStyle() {
  return {
    margin: "auto",
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      flexGrow: 1,
    },
  },
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
  tableHead: {
    fontWeight: "bold",
  },
}));

const CustomerProfile = () => {
  const [customer, setCustomer] = useState();
  const [modalStyle] = React.useState(getModalStyle);
  const [user_id, setUser_id] = useState("");
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("2017-05-24");
  const [gender, setGender] = useState("Female");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    trackPromise(
      Auth.currentAuthenticatedUser().then((user) => {
        setUser_id(user.attributes.sub);
        fetch(url + "/" + user.attributes.sub)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setCustomer(data.customer);
          })
          .catch((error) => {
            alert(error);
          });
      })
    );
  }, []);
  function refreshCustomerList() {
    trackPromise(
      fetch(url + "/" + user_id)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setCustomer(data.customer);
        })
    );
  }

  const handleEdit = (customer) => {
    setFirstName(customer.firstName);
    setLastName(customer.lastName);
    //setEmail(customer.email);
    //setUsername()
    var cBirthDate = customer.birthDate.split("T");
    setBirthDate(cBirthDate[0]);
    setGender(customer.gender);
    setPhoneNumber(customer.phoneNumber);
    setPhotoURL(customer.profilePhotoUrl);
    //custAcctNo
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditSubmit = (
    firstName,
    lastName,
    birthDate,
    gender,
    phoneNumber,
    photoURL
  ) => {
    var data = {
      firstName: firstName,
      lastName: lastName,
      email: customer.email,
      userName: customer.userName,
      birthDate: birthDate + "T00:00:00.000000",
      gender: gender,
      custAccountNo: customer.custAccountNo,
      phoneNumber: phoneNumber,
      profilePhotoUrl: photoURL,
    };
    console.log(JSON.stringify(data));
    var newURL = url + "/" + customer.customerId;
    fetch(newURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 404 || response.status === 400) {
          NotificationManager.error(
            "Error editing customer " +
              customer.customerId +
              ". Please ensure all fields are correct."
          );
          return response.json();
        }
        NotificationManager.success(
          "Successfully edited customer " + customer.customerId
        );
        refreshCustomerList();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    handleClose();
  };

  const props = {
    label: "Edit My Account",
    firstName,
    setFirstName,
    lastName,
    setLastName,
    birthDate,
    setBirthDate,
    gender,
    setGender,
    phoneNumber,
    setPhoneNumber,
    photoURL,
    setPhotoURL,
    handleSubmit: handleEditSubmit,
    handleClose,
  };

  if (customer) {
    var customerData = (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">
              Customer: {customer.firstName + " " + customer.lastName}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEdit(customer)}
            >
              Edit My Account
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={RouterLink}
              to="/billings"
            >
              My Billings
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <div style={{ marginBottom: "1em" }}>
                  <strong>Personal Info</strong>
                </div>
                <Divider /> <br />
                <strong>Customer Id:</strong> {customer.customerId} <br />
                <strong>Email: </strong>
                {customer.email} <br />
                <strong>Username:</strong> {customer.userName} <br />
                <strong>Phone Number:</strong> {customer.phoneNumber} <br />
                <strong>Gender:</strong> {customer.gender} <br />
                <strong>Birth Date:</strong> {customer.birthDate} <br />
                <strong>Profile Photo URL:</strong> {customer.profilePhotoUrl}{" "}
                <br />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <div style={{ marginBottom: "1em" }}>
                  <strong>Account Info</strong>
                </div>
                <Divider /> <br />
                <strong>Created Date: </strong>
                {customer.createdDate}
                <br />
                <strong>Updated Date:</strong> {customer.updatedDate}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={modalStyle} className={classes.paper}>
          <CustomerEditForm {...props} />
        </div>
      </Modal>
      {customerData}
    </div>
  );
};

export default CustomerProfile;
