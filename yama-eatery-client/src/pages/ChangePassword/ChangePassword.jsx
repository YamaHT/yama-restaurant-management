import React, { useState } from 'react';
// import thư viện React dùng "useState" của Hook để quản lí dữ liệu
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
// Các thành phần để xây dựng các giao diện theo thư viện MUI

export default function ChangePassword() {
  //Sử dụng useState để quản lí các giá trị của trường đầu vào, với đầu vào ban đầu là rỗng ''
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // // Hàm kiểm tra mật khẩu mới và xác nhận
  // const validatePasswords = (newPassword, confirmPassword) => {
  //   if (newPassword !== confirmPassword) {
  //     alert('Mật khẩu mới và xác nhận mật khẩu không trùng khớp!');
  //     return false;
  //   }
  //   if (newPassword.length < 8) {
  //     alert('Mật khẩu phải có ít nhất 8 ký tự.');
  //     return false;
  //   }
  //   return true;
  // };

  // Xử lý sự kiện khi nhấn nút Change Password
  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn không cho trang tải lại

    if (!oldPassword || !newPassword || !confirmPassword) {
      alert('Vui lòng điền đầy đủ các thông tin yêu cầu.');
      return;
    }

    // if (!validatePasswords(newPassword, confirmPassword)) {
    //   return;
    // }

    // Gửi yêu cầu thay đổi mật khẩu đến backend
    fetch('https://example.com/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Mật khẩu đã được thay đổi thành công!');
          // Chuyển hướng người dùng về trang đăng nhập
          window.location.href = 'Login.jsx';
        } else {
          alert('Đã xảy ra lỗi khi thay đổi mật khẩu. Vui lòng thử lại.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi kết nối. Vui lòng thử lại sau.');
      });
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        maxWidth: 400,
        margin: '100px auto',
        padding: '20px',
        textAlign: 'center',
        borderRadius: '10px',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Change Account Password
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Old Password"
          type="password"
          fullWidth
          margin="normal"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, width: '100%' }}
        >
          Change Password
        </Button>
      </Box>
    </Box>
  );
}
