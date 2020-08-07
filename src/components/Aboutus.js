import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

const Cart = () => {
  return (
    <>
      <Box className="sub-header">
        <Container maxWidth="lg">About Us</Container>
      </Box>
      <Box component="div" className="main-content content-pages">
        <Container maxWidth="lg">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit">Home</Link>
            <Typography color="textPrimary">About Us</Typography>
          </Breadcrumbs>

          <Typography component="h1">
            Snap Photos and share like <span>never before</span>
          </Typography>

          <Grid container>
            <Grid item xs={12} sm={6}>
              <Box className="content-box">
                <Typography component="h3">Sed ut perspiciatis</Typography>
                <Typography>
                  But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system, and expound the actual
                  teachings of the great explorer of the truth, the
                  master-builder of human happiness. No one rejects, dislikes,
                  or avoids pleasure itself, because it is pleasure.
                </Typography>
              </Box>
              <Box className="content-box">
                <Typography component="h3">Sed ut perspiciatis</Typography>
                <Typography>
                  But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system, and expound the actual
                  teachings of the great explorer of the truth, the
                  master-builder of human happiness. No one rejects, dislikes,
                  or avoids pleasure itself, because it is pleasure.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box className="content-box">
                <Typography component="h3">Sed ut perspiciatis</Typography>
                <Typography>
                  But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system, and expound the actual
                  teachings of the great explorer of the truth, the
                  master-builder of human happiness. No one rejects, dislikes,
                  or avoids pleasure itself, because it is pleasure.
                </Typography>
              </Box>
              <Box className="content-box">
                <Typography component="h3">Sed ut perspiciatis</Typography>
                <Typography>
                  But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system, and expound the actual
                  teachings of the great explorer of the truth, the
                  master-builder of human happiness. No one rejects, dislikes,
                  or avoids pleasure itself, because it is pleasure.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Cart;
