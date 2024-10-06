import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Button, Select, MenuItem, FormControl, InputLabel, Pagination, TextField, AppBar, Toolbar } from '@mui/material';

// Sample voucher data
const vouchers = [
  { id: 1, image: 'images/voucher1.jpg', name: 'Voucher Black Friday', description: 'Giảm giá Black Friday lên đến 50%', expiredDate: '2024-11-25', reducedPercent: 50, maxReducing: 200000, quantity: 100 },
  { id: 2, image: 'images/voucher2.jpg', name: 'Voucher Cyber Monday', description: 'Ưu đãi Cyber Monday với giảm giá 30%', expiredDate: '2024-12-02', reducedPercent: 30, maxReducing: 150000, quantity: 200 },
  { id: 3, image: 'images/voucher3.jpg', name: 'Voucher Giáng Sinh', description: 'Giảm giá đặc biệt cho mùa lễ Giáng Sinh', expiredDate: '2024-12-25', reducedPercent: 40, maxReducing: 300000, quantity: 50 },
  { id: 4, image: 'images/voucher4.jpg', name: 'Voucher Mùa Xuân', description: 'Chương trình khuyến mãi mùa xuân, giảm giá 20%', expiredDate: '2024-04-10', reducedPercent: 20, maxReducing: 100000, quantity: 150 },
  { id: 5, image: 'images/voucher5.jpg', name: 'Voucher Khai Trương', description: 'Giảm giá 10% trong sự kiện khai trương cửa hàng mới', expiredDate: '2024-10-15', reducedPercent: 10, maxReducing: 50000, quantity: 300 },
  // Add more vouchers as needed
];

const VOUCHERS_PER_PAGE = 3; // Number of vouchers per page

function VoucherList() {
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [dateFilter, setDateFilter] = useState(''); // State for filtering by expiration date

  // Convert dateFilter into a comparable date
  const filteredDate = dateFilter ? new Date(dateFilter) : null;

  // Filter vouchers based on discount percentage and expiration date
  const filteredVouchers = vouchers.filter(voucher => {
    const voucherDate = new Date(voucher.expiredDate);
    return (
      voucher.reducedPercent >= (filter ? parseInt(filter) : 0) &&
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

  const colors = ['#FFCC33', '#999', '#888'];
  let previousColor = null; // Variable to store the previous color

  // Function to get a random color from the predefined set
  const getRandomColorFromSet = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const newColor = colors[randomIndex];

    // If the new color is the same as the previous one, get a new color
    if (newColor === previousColor) {
      return getRandomColorFromSet(); // Recursive call until a different color is found
    }

    previousColor = newColor; // Update the previous color
    return newColor;
  };

  return (
    <Box>
      {/* Header */}
      <AppBar position="static" sx={{ borderRadius: 2 }}>
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
          width: '95%', margin: '2% 2% 2% 2%',
          padding: '2% 2% 2% 2%',
          boxShadow: 3,
          borderRadius: '2%',
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
            filter: 'blur(9px)',
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
              <MenuItem value={10}>10% and above</MenuItem>
              <MenuItem value={20}>20% and above</MenuItem>
              <MenuItem value={30}>30% and above</MenuItem>
              <MenuItem value={40}>40% and above</MenuItem>
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
                        width: '90%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: '16px',
                      }}
                    >
                      <Typography variant="h4" fontWeight="bold">
                        {voucher.reducedPercent}% OFF
                      </Typography>
                      <Typography variant="h5" fontWeight="static">
                        Max Reduct: {voucher.maxReducing.toLocaleString('vi-VN')} VND
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
                        Use by: <br /> {voucher.expiredDate}
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
