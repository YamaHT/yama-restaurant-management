import React, { useState } from 'react';
import { Box, Paper, Typography, Button, Select, MenuItem, FormControl, InputLabel, Pagination, TextField, Grid2, Stack } from '@mui/material';

const vouchers = [
    { id: 1, image: 'https://th.bing.com/th/id/OIP.nERqFvU2EjT69-juJkgQzAHaKX?pid=ImgDet&w=184&h=258&c=7&dpr=1.3', name: 'Voucher Black Friday', description: 'Giảm giá Black Friday lên đến 50%', expiredDate: '2024-11-25', reducedPercent: 50, maxReducing: 200, quantity: 100 },
    { id: 2, image: 'https://th.bing.com/th/id/OIP.nERqFvU2EjT69-juJkgQzAHaKX?pid=ImgDet&w=184&h=258&c=7&dpr=1.3', name: 'Voucher Cyber Monday', description: 'Ưu đãi Cyber Monday với giảm giá 30%', expiredDate: '2024-12-02', reducedPercent: 30, maxReducing: 150, quantity: 200 },
    { id: 3, image: 'https://th.bing.com/th/id/OIP.nERqFvU2EjT69-juJkgQzAHaKX?pid=ImgDet&w=184&h=258&c=7&dpr=1.3', name: 'Voucher Giáng Sinh', description: 'Giảm giá đặc biệt cho mùa lễ Giáng Sinh', expiredDate: '2024-12-25', reducedPercent: 40, maxReducing: 300, quantity: 50 },
    { id: 4, image: 'https://th.bing.com/th/id/OIP.nERqFvU2EjT69-juJkgQzAHaKX?pid=ImgDet&w=184&h=258&c=7&dpr=1.3', name: 'Voucher Mùa Xuân', description: 'Chương trình khuyến mãi mùa xuân, giảm giá 20%', expiredDate: '2024-04-10', reducedPercent: 20, maxReducing: 100, quantity: 150 },
    { id: 5, image: 'https://th.bing.com/th/id/OIP.nERqFvU2EjT69-juJkgQzAHaKX?pid=ImgDet&w=184&h=258&c=7&dpr=1.3', name: 'Voucher Khai Trương', description: 'Giảm giá 10% trong sự kiện khai trương cửa hàng mới', expiredDate: '2024-10-15', reducedPercent: 10, maxReducing: 50, quantity: 300 },
];

const VOUCHERS_PER_PAGE = 3;

function MyVoucher() {
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);
    const [dateFilter, setDateFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDate = dateFilter ? new Date(dateFilter) : null;

    const filteredVouchers = vouchers.filter((voucher) => {
        const voucherDate = new Date(voucher.expiredDate);
        return (
            voucher.reducedPercent >= (filter ? parseInt(filter) : 0) &&
            (!filteredDate || voucherDate <= filteredDate) &&
            voucher.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const totalPages = Math.ceil(filteredVouchers.length / VOUCHERS_PER_PAGE);

    const displayedVouchers = filteredVouchers.slice((page - 1) * VOUCHERS_PER_PAGE, page * VOUCHERS_PER_PAGE);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Grid2 container sx={{ width: '100%' }}>
            <Box sx={{ width: '100%', backgroundColor: '#ffffff', boxShadow: 3, borderRadius: '2%', p: 4 }}>
                <Grid2 container spacing={2} justifyContent="center">
                    <Grid2 item xs={12} md={3}>
                        <TextField
                            label="Search by Name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            fullWidth
                            sx={{ width: '250px' }}
                        />
                    </Grid2>
                    <Grid2 item xs={12} md={3}>
                        <FormControl fullWidth sx={{ width: '250px' }}>
                            <InputLabel>Filter by Discount (%)</InputLabel>
                            <Select
                                value={filter}
                                label="Filter by Discount (%)"
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <MenuItem value={10}>10%</MenuItem>
                                <MenuItem value={20}>20%</MenuItem>
                                <MenuItem value={30}>30%</MenuItem>
                                <MenuItem value={40}>40%</MenuItem>
                                <MenuItem value={50}>50%</MenuItem>
                                <MenuItem value={90}>90%</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 item xs={12} md={3}>
                        <TextField
                            label="Use By (Before)"
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            sx={{ width: '250px' }}
                        />
                    </Grid2>
                </Grid2>
                <Grid2 container spacing={2} direction="column" alignItems="center" mt={4}>
                    {displayedVouchers.length > 0 ? (
                        displayedVouchers.map((voucher) => (
                            <Grid2 item xs={12} key={voucher.id}>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        display: 'flex',
                                        width: 500,
                                        height: 200,
                                        flexDirection: 'row',
                                        overflow: 'hidden',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            color: 'black',
                                            p: 3,
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            backgroundImage: `url(${voucher.image})`,
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                        }}
                                    >
                                        <Typography variant="h4" fontWeight="bold">
                                            {voucher.name}
                                        </Typography>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="h6">{voucher.reducedPercent}% OFF</Typography>
                                            <Typography variant="h6">Max Reduct: {voucher.maxReducing} $</Typography>
                                        </Stack>
                                        <Typography variant="body1">{voucher.description}</Typography>
                                    </Box>
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
                                        }}
                                    >
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            Use before: <br /> {voucher.expiredDate}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid2>
                        ))
                    ) : (
                        <Typography variant="h6" color="textSecondary">
                            No vouchers available for the selected filters.
                        </Typography>
                    )}
                </Grid2>
                <Box mt={4} display="flex" justifyContent="center">
                    <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
                </Box>
            </Box>
        </Grid2>
    );
}

export default MyVoucher;
