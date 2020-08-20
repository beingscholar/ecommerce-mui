import React from "react";
import { Grid, Divider, Typography, Button, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const useStyles = makeStyles(theme => ({
    root: {
        "& .MuiTextValidator-root": {
            margin: theme.spacing(2),
            flexGrow: 1
        }
    },
    formControl: {
        margin: theme.spacing(2)
    }
}));

const CustomerForm = ({
    label,
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
    handleSubmit,
    handleClose
}) => {
    const classes = useStyles();
    return (
        <ValidatorForm
            onSubmit={e => {
                handleSubmit(
                    firstName,
                    lastName,
                    birthDate,
                    gender,
                    phoneNumber,
                    photoURL
                );
                e.preventDefault();
            }}
            className={classes.root}
            noValidate
            autoComplete="off"
        >
            <Typography variant="h6">{label}</Typography>
            <Divider /> <br />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextValidator
                        fullWidth
                        variant="outlined"
                        required
                        label="Phone Number"
                        value={phoneNumber}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                        onChange={e => {
                            setPhoneNumber(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextValidator
                        id="date"
                        fullWidth
                        variant="outlined"
                        required
                        label="Birth Date"
                        type="date"
                        value={birthDate}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                        onChange={e => {
                            setBirthDate(e.target.value);
                        }}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextValidator
                        id="standard-select-currency"
                        select
                        fullWidth
                        required
                        variant="outlined"
                        label="Select Gender"
                        value={gender}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                        onChange={e => {
                            setGender(e.target.value);
                        }}
                        helperText="Please select gender"
                    >
                        <MenuItem key="female" value="Female">
                            Female
                        </MenuItem>
                        <MenuItem key="male" value="Male">
                            Male
                        </MenuItem>
                    </TextValidator>
                </Grid>
                <Grid item xs={12}>
                    <TextValidator
                        label="Profile Photo URL"
                        fullWidth
                        variant="outlined"
                        required
                        value={photoURL}
                        validators={["required"]}
                        errorMessages={["this field is required"]}
                        onChange={e => {
                            setPhotoURL(e.target.value);
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        {" "}
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </ValidatorForm>
    );
};

export default CustomerForm;
