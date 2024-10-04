import React from 'react';
import { Box, Typography, Paper, Grid, Button, Divider, List, ListItem, ListItemText, Avatar } from '@mui/material';

function OrderConfirmation() {
  return (
    <Box p={4}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom mb={8}>
        Your order is confirmed
      </Typography>

      <Grid container spacing={1} justifyContent="center" alignItems="stretch">
        {/* Order Info */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              textAlign: 'left ',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Order Info
            </Typography>
            <Typography variant="body1">Order number: #9483003</Typography>
            <Typography variant="body1">Date: January 23, 2022</Typography>
            <Button variant="outlined" fullWidth sx={{ marginTop: 2 }}>
              View Invoice
            </Button>

            <Divider sx={{ marginY: 2 }} />

            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Shipping Address
            </Typography>
            <Typography variant="body1">Wilson Baker</Typography>
            <Typography variant="body1">4517 Washington Ave. Manchester, Kentucky</Typography>
            <Typography variant="body1">39495, USA</Typography>
            <Typography variant="body1">+1-304-5938</Typography>

            <Divider sx={{ marginY: 2 }} />

            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Payment Method
            </Typography>
            <Typography variant="body1">Mastercard ending with 3990</Typography>
            <Typography variant="body1">Expires 08/23</Typography>
          </Paper>
        </Grid>

        {/* Ordered Items */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Ordered Items
            </Typography>
            <List>
              <ListItem>
                <Avatar
                  src="https://example.com/apple-watch.jpg"
                  alt="Apple Watch Series 7"
                  sx={{ width: 56, height: 56, marginRight: 2 }}
                />
                <ListItemText
                  primary="Apple Watch Series 7"
                  secondary="Golden"
                />
                <Typography variant="body1">$319</Typography>
              </ListItem>
              <ListItem>
                <Avatar
                  src="https://example.com/beylob-90.jpg"
                  alt="Beylob 90 Speaker"
                  sx={{ width: 56, height: 56, marginRight: 2 }}
                />
                <ListItemText
                  primary="Beylob 90 Speaker"
                  secondary="Space Gray"
                />
                <Typography variant="body1">$59</Typography>
              </ListItem>
              <ListItem>
                <Avatar
                  src="https://example.com/beoplay-m5.jpg"
                  alt="Beoplay M5 Bluetooth Speaker"
                  sx={{ width: 56, height: 56, marginRight: 2 }}
                />
                <ListItemText
                  primary="Beoplay M5 Bluetooth Speaker"
                  secondary="Gray"
                />
                <Typography variant="body1">$99</Typography>
              </ListItem>
            </List>

            <Divider sx={{ marginY: 2 }} />

            <Grid container justifyContent="space-between">
              <Typography variant="body1">Subtotal</Typography>
              <Typography variant="body1">$499</Typography>
            </Grid>

            <Grid container justifyContent="space-between">
              <Typography variant="h6" fontWeight="bold">Total</Typography>
              <Typography variant="h6">$499</Typography>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrderConfirmation;
