import React from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default function TableManagement() {
  // Giả sử dữ liệu được lấy từ backend và đây là dữ liệu mẫu
  const tableData = [
    { id: 'xxxxxxx', image: '', floor: 'xxxxxxx', tableTypeId: 'xxxxxxx' },
    { id: 'xxxxxxx', image: '', floor: 'xxxxxxx', tableTypeId: 'xxxxxxx' },
    { id: 'xxxxxxx', image: '', floor: 'xxxxxxx', tableTypeId: 'xxxxxxx' },
    { id: 'xxxxxxx', image: '', floor: 'xxxxxxx', tableTypeId: 'xxxxxxx' },
  ];

  const handleEdit = (id) => {
    alert(`Editing table with ID: ${id}`);
    // Thêm logic chỉnh sửa
  };

  const handleDelete = (id) => {
    alert(`Deleting table with ID: ${id}`);
    // Thêm logic xóa
  };

  return (
    <Box
      sx={{
        margin: '50px auto',
        width: '80%',
        textAlign: 'center',
      }}
    >
      {/* Tiêu đề chính */}
      <Typography variant="h3" sx={{ marginBottom: '20px' }}>
        TABLE MANAGEMENT
      </Typography>

      {/* Nút thêm Table */}
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        sx={{ marginBottom: '20px', borderRadius: '50px' }}
      >
        Add Table
      </Button>

      {/* Bảng quản lý */}
      <TableContainer component={Paper}>
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
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">#{row.id}</TableCell>
                <TableCell align="center">
                  {/* Giả lập ảnh */}
                  <Box
                    sx={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: '#e0e0e0',
                      display: 'inline-block',
                    }}
                  />
                </TableCell>
                <TableCell align="center">#{row.floor}</TableCell>
                <TableCell align="center">#{row.tableTypeId}</TableCell>
                <TableCell align="center">
                  {/* Nút Edit */}
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(row.id)}
                    sx={{ borderRadius: '25px', marginRight: '10px' }}
                  >
                    Edit
                  </Button>
                  {/* Nút Delete */}
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
    </Box>
  );
}
