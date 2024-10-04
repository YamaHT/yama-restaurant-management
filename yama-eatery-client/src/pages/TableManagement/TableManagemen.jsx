import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography, 
  Select, 
  MenuItem, 
  Pagination,
  Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function TableManagement() {
  // Dữ liệu bảng mẫu
  const tableData = [
    { id: '1', image: 'https://images.pickawood.com/gfx/conf/tables/new/berlin-et-kernbuche-natur-geoelt-swiss-legn.jpg', floor: '1', tableTypeId: 'T001' },
    { id: '2', image: 'https://st3.depositphotos.com/1014680/16209/i/450/depositphotos_162094036-stock-photo-used-wooden-table-isolated.jpg', floor: '2', tableTypeId: 'T002' },
    { id: '3', image: 'https://st3.depositphotos.com/1014680/16209/i/450/depositphotos_162094036-stock-photo-used-wooden-table-isolated.jpg', floor: '2', tableTypeId: 'T002' },
    { id: '4', image: 'https://st3.depositphotos.com/1014680/16209/i/450/depositphotos_162094036-stock-photo-used-wooden-table-isolated.jpg', floor: '2', tableTypeId: 'T002' },
    { id: '5', image: 'https://st3.depositphotos.com/1014680/16209/i/450/depositphotos_162094036-stock-photo-used-wooden-table-isolated.jpg', floor: '2', tableTypeId: 'T002' },
    { id: '6', image: 'https://st3.depositphotos.com/1014680/16209/i/450/depositphotos_162094036-stock-photo-used-wooden-table-isolated.jpg', floor: '2', tableTypeId: 'T002' },
    { id: '7', image: 'https://st3.depositphotos.com/1014680/16209/i/450/depositphotos_162094036-stock-photo-used-wooden-table-isolated.jpg', floor: '2', tableTypeId: 'T002' },
    { id: '8', image: 'https://st3.depositphotos.com/1014680/16209/i/450/depositphotos_162094036-stock-photo-used-wooden-table-isolated.jpg', floor: '2', tableTypeId: 'T002' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Số hàng mỗi trang
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const handleEdit = (id) => {
    alert(`Editing table with ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Deleting table with ID: ${id}`);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setCurrentPage(1); // Đặt lại trang về 1 khi số hàng thay đổi
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <Box
      sx={{
        margin: '50px auto',
        width: '80%',
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: '20px' }}>
        TABLE MANAGEMENT
      </Typography>

      {/* Nút Add Table */}
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        sx={{ marginBottom: '20px', borderRadius: '50px' }}
      >
        Add Table
      </Button>

      {/* Select để chọn số hàng mỗi trang */}
     
      <Select
        value={rowsPerPage}
        onChange={handleRowsPerPageChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Rows per page' }}
        components={Paper}
        
        sx={{ marginTop: '10px', marginLeft: '-33cm', backgroundColor : "#64b5f6"   }} // Di chuyển xuống dưới Add Table và dịch sang trái
      >
        <MenuItem value={5}>5 rows</MenuItem>
        <MenuItem value={10}>10 rows</MenuItem>
        <MenuItem value={20}>20 rows</MenuItem>
      </Select>
     

      {/* Bảng dữ liệu */}
      <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"><strong>Table ID</strong></TableCell>
              <TableCell align="center"><strong>Image</strong></TableCell>
              <TableCell align="center"><strong>Floor</strong></TableCell>
              <TableCell align="center"><strong>TableTypeID</strong></TableCell>
              <TableCell align="center"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">#{row.id}</TableCell>
                <TableCell align="center">
                  <img 
                    src={row.image} 
                    alt={`Table ${row.id}`} 
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                  />
                </TableCell>
                <TableCell align="center">#{row.floor}</TableCell>
                <TableCell align="center">#{row.tableTypeId}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(row.id)}
                    sx={{ borderRadius: '25px', marginRight: '10px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(row.id)}
                    sx={{ borderRadius: '25px' }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Phân trang */}
      <Stack spacing={2} sx={{ marginTop: '20px', alignItems: 'center' }}>
        <Pagination 
          count={totalPages} 
          page={currentPage} 
          onChange={handlePageChange} 
          color="primary" 
        />
      </Stack>

    </Box>
  );
}
