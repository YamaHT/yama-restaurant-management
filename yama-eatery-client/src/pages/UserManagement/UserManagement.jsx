import React, { useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function UserManagement() {
  const [open, setOpen] = useState(false); // Quản lý trạng thái của popup
  const [selectedUser, setSelectedUser] = useState(null); // Người dùng được chọn để thay đổi vai trò
  const [selectedRole, setSelectedRole] = useState(''); // Vai trò đã chọn

  // Mở popup khi nhấn nút
  const handleOpen = (userId) => {
    setSelectedUser(userId);
    setOpen(true);
  };

  // Đóng popup
  const handleClose = () => {
    setOpen(false);
  };

  // Thay đổi vai trò người dùng
  const handleRoleChange = (role) => {
    setSelectedRole(role);
    alert(`Role ${role} has been assigned to user ${selectedUser}.`);
    setOpen(false);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        USER MANAGEMENT
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">
                <img src="placeholder.png" alt="User" width="50" height="50" />
              </TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">
                <Button variant="contained" color="primary" onClick={() => handleOpen(1)}>
                  Change user's role
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Popup (Dialog) */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>What's role you want to assign?</DialogTitle>
        <DialogContent>
          <Button variant="contained" color="secondary" onClick={() => handleRoleChange('Customer')} sx={{ margin: 1 }}>
            Customer
          </Button>
          <Button variant="contained" color="secondary" onClick={() => handleRoleChange('Staff')} sx={{ margin: 1 }}>
            Staff
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
