import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    Typography,
    Avatar,
    IconButton,
    Stack,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const VoucherManage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const rows = [
        { id: 1, image: 'images/voucher1.jpg', name: 'Voucher Black Friday', description: 'Giảm giá Black Friday lên đến 50%', expiredDate: '2024-11-25', reducedPercent: 50, maxReducing: 200000, quantity: 100 },
        { id: 2, image: 'images/voucher2.jpg', name: 'Voucher Cyber Monday', description: 'Ưu đãi Cyber Monday với giảm giá 30%', expiredDate: '2024-12-02', reducedPercent: 30, maxReducing: 150000, quantity: 200 },
        { id: 3, image: 'images/voucher3.jpg', name: 'Voucher Giáng Sinh', description: 'Giảm giá đặc biệt cho mùa lễ Giáng Sinh', expiredDate: '2024-12-25', reducedPercent: 40, maxReducing: 300000, quantity: 50 },
        { id: 4, image: 'images/voucher4.jpg', name: 'Voucher Mùa Xuân', description: 'Chương trình khuyến mãi mùa xuân, giảm giá 20%', expiredDate: '2024-04-10', reducedPercent: 20, maxReducing: 100000, quantity: 150 },
        { id: 5, image: 'images/voucher5.jpg', name: 'Voucher Khai Trương', description: 'Giảm giá 10% trong sự kiện khai trương cửa hàng mới', expiredDate: '2024-10-15', reducedPercent: 10, maxReducing: 50000, quantity: 300 },
        { id: 1, image: 'images/voucher1.jpg', name: 'Voucher Black Friday', description: 'Giảm giá Black Friday lên đến 50%', expiredDate: '2024-11-25', reducedPercent: 50, maxReducing: 200000, quantity: 100 },
        { id: 2, image: 'images/voucher2.jpg', name: 'Voucher Cyber Monday', description: 'Ưu đãi Cyber Monday với giảm giá 30%', expiredDate: '2024-12-02', reducedPercent: 30, maxReducing: 150000, quantity: 200 },
        { id: 3, image: 'images/voucher3.jpg', name: 'Voucher Giáng Sinh', description: 'Giảm giá đặc biệt cho mùa lễ Giáng Sinh', expiredDate: '2024-12-25', reducedPercent: 40, maxReducing: 300000, quantity: 50 },
        { id: 4, image: 'images/voucher4.jpg', name: 'Voucher Mùa Xuân', description: 'Chương trình khuyến mãi mùa xuân, giảm giá 20%', expiredDate: '2024-04-10', reducedPercent: 20, maxReducing: 100000, quantity: 150 },
        { id: 5, image: 'images/voucher5.jpg', name: 'Voucher Khai Trương', description: 'Giảm giá 10% trong sự kiện khai trương cửa hàng mới', expiredDate: '2024-10-15', reducedPercent: 10, maxReducing: 50000, quantity: 300 },
        
    ];

    const totalItems = rows.filter(row => row.name.toLowerCase().includes(searchTerm.toLowerCase())).length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentRows = rows.filter(row => row.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(startIndex, startIndex + itemsPerPage);
    
    return (
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} m={'2% 2% 2%'} sx={{
            padding: '1% 2%',
            boxShadow: 3,
            borderRadius: '8px',
            backgroundColor: '#ffffff',
        }}>
            <Stack direction={'row'} justifyContent={'space-between'} paddingBottom={'30px'}>
                <Typography variant="h6" gutterBottom >
                    All Vouchers: {totalItems} 
                </Typography>
                <Box display={'flex'}>
                    <Button variant="contained" color="primary" sx={{ width: '200px', marginRight: '20px' }} startIcon={<AddCircleIcon />}>
                        Add new voucher
                    </Button>
                    <Button variant="outlined" startIcon={<SaveAltIcon />}>
                        Export
                    </Button>
                </Box>
            </Stack>

            <TableContainer
                component={Paper}
                sx={{
                    padding: '10px',
                    boxShadow: 3,
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ padding: '10px' }}>Image</TableCell>
                            <TableCell sx={{ padding: '10px' }}>Name</TableCell>
                            <TableCell sx={{ padding: '10px' }}>Description</TableCell>
                            <TableCell sx={{ padding: '10px' }}>Expired Date</TableCell>
                            <TableCell sx={{ padding: '10px' }}>Reduced Percent (%)</TableCell>
                            <TableCell sx={{ padding: '10px' }}>Max Reducing ($)</TableCell>
                            <TableCell sx={{ padding: '10px' }}>Quantity</TableCell>
                            <TableCell sx={{ padding: '10px' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell sx={{ padding: '10px' }}>
                                    <Avatar sx={{ width: 56, height: 56 }} src={row.image} alt={row.name} />
                                </TableCell>
                                <TableCell sx={{ padding: '10px' }}>{row.name}</TableCell>
                                <TableCell sx={{ padding: '10px' }}>{row.description}</TableCell>
                                <TableCell sx={{ padding: '10px' }}>{row.expiredDate}</TableCell>
                                <TableCell sx={{ padding: '10px' }}>{row.reducedPercent}</TableCell>
                                <TableCell sx={{ padding: '10px' }}>{row.maxReducing}</TableCell>
                                <TableCell sx={{ padding: '10px' }}>{row.quantity}</TableCell>
                                <TableCell sx={{ padding: '10px' }}>
                                    <IconButton color="primary" sx={{ mr: 1 }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="secondary">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Typography variant="body2">
                    Showing {currentPage} of {totalPages}
                </Typography>
                <Box sx={{
                    boxShadow: 3,
                    borderRadius: '7px',
                    backgroundColor: '#ffffff',
                }}>
                    <Button size='small' onClick={() => handlePageChange(1)} disabled={currentPage === 1} sx={{ borderRadius: 0, borderRight: '1px solid #ccc'}}>
                        Min 
                    </Button>
                    <Button size='small' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} sx={{ borderRadius: 0, borderRight: '1px solid #ccc' }}>
                        Prev
                    </Button>
                    <Button size='small' sx={{ borderRadius: 0, borderRight: '1px solid #ccc'  }}>
                        {currentPage}
                    </Button>
                    <Button size='small' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} sx={{ borderRadius: 0, borderRight: '1px solid #ccc'  }}>
                        Next
                    </Button>
                    <Button size='small' onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} sx={{ borderRadius: 0, borderRight: '1px solid #ccc'}}>
                        Max 
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default VoucherManage;
