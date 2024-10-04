import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Button, Select, MenuItem, FormControl, InputLabel, Pagination, TextField, AppBar, Toolbar } from '@mui/material';

const vouchers = [
  { id: 1, discount: 15, description: 'To all clothing items through January 2016', useBy: '2016-01-30' },
  { id: 2, discount: 90, description: "It's Sale week and this month we're showing off some of the brands published in last year's galleries.", useBy: '2016-01-30' },
  { id: 3, discount: 50, description: 'Get 50% off all electronics!', useBy: '2016-02-15' },
  { id: 4, discount: 30, description: '30% off on all footwear', useBy: '2016-03-10' },
  { id: 5, discount: 15, description: 'To all clothing items through January 2016', useBy: '2016-01-30' },
  { id: 6, discount: 90, description: "It's Sale week and this month we're showing off some of the brands published in last year's galleries.", useBy: '2016-01-30' },
  { id: 7, discount: 50, description: 'Get 50% off all electronics!', useBy: '2016-02-15' },
  { id: 8, discount: 30, description: '30% off on all footwear', useBy: '2016-03-10' },
  // Add more vouchers for testing
];

const VOUCHERS_PER_PAGE = 3; // Number of vouchers per page

function VoucherList() {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [dateFilter, setDateFilter] = useState(''); // New state for filtering by date

  // Convert dateFilter into a comparable date
  const filteredDate = dateFilter ? new Date(dateFilter) : null;

  // Filter vouchers based on discount percentage and expiration date
  const filteredVouchers = vouchers.filter(voucher => {
    const voucherDate = new Date(voucher.useBy);
    return (
      voucher.discount >= (filter ? parseInt(filter) : 0) &&
      (!filteredDate || voucherDate <= filteredDate) // Date filter
    );
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredVouchers.length / VOUCHERS_PER_PAGE);

  // Get the vouchers for the current page
  const displayedVouchers = filteredVouchers.slice(
    (page - 1) * VOUCHERS_PER_PAGE,
    page * VOUCHERS_PER_PAGE
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const colors = ['#FFCC33 ','#999 ','#888 '];

  // Function to get a random color from the predefined set
  const getRandomColorFromSet = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <Box>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Voucher Redemption Center
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        p={4}
        sx={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          width: '1420px', margin: '60px',
          padding: '20px',
          boxShadow: 3,
          borderRadius: '8px',
          backgroundColor: '#ffffff',
        }}
      >
        {/* Blurred background overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            filter: 'blur(8px)',
            zIndex: 1,
          }}
        />

        {/* Sidebar with filter */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            minWidth: 200,
            mr: 4,
          }}
        >
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel>Filter by Discount (%)</InputLabel>
            <Select
              value={filter}
              label="Filter by Discount (%)"
              onChange={(e) => setFilter(e.target.value)}
            >
              <MenuItem value={0}>All Discounts</MenuItem>
              <MenuItem value={15}>15% and above</MenuItem>
              <MenuItem value={30}>30% and above</MenuItem>
              <MenuItem value={50}>50% and above</MenuItem>
              <MenuItem value={90}>90% and above</MenuItem>
            </Select>
          </FormControl>

          {/* Date filter for "Use by" */}
          <TextField
            label="Use By (Before)"
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 4 }}
          />
        </Box>

        {/* Main content */}
        <Box sx={{ position: 'relative', zIndex: 2, flexGrow: 1 }}>
          <Grid container spacing={2} direction="column" alignItems="center">
            {displayedVouchers.length > 0 ? (
              displayedVouchers.map(voucher => (
                <Grid item xs={12} key={voucher.id}>
                  <Paper
                    elevation={3}
                    sx={{
                      display: 'flex',
                      width: 600,
                      height: 200,
                      flexDirection: 'row',
                      overflow: 'hidden',
                      borderRadius: '8px',
                      zIndex: 2,
                    }}
                  >
                    {/* Left Side (Discount Info) */}
                    <Box
                      sx={{
                        backgroundColor: getRandomColorFromSet(),
                        color: '#fff',
                        p: 2,
                        width: '70%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: '16px',
                      }}
                    >
                      <Typography variant="h4" fontWeight="bold">
                        {voucher.discount}% OFF
                      </Typography>
                      <Typography variant="body1">
                        {voucher.description}
                      </Typography>
                    </Box>

                    {/* Right Side (Details) */}
                    <Box
                      sx={{
                        backgroundColor: '#fff',
                        p: 2,
                        width: '30%',
                        textAlign: 'center',
                        borderLeft: '2px dashed #ccc',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: '16px',
                      }}
                    >
                      <Typography variant="subtitle2" fontWeight="bold">
                        Use by: <br /> {voucher.useBy}
                      </Typography>
                      <Typography variant="body2">
                        Excludes Sporting items and golf equipment.
                      </Typography>
                      <Button variant="contained" color="error" sx={{ mt: 2 }}>
                        REDEEM
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Typography variant="h6" color="textSecondary">
                No vouchers available for the selected filters.
              </Typography>
            )}
          </Grid>

          {/* Pagination */}
          <Box mt={4} display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default VoucherList;
