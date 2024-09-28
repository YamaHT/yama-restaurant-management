import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');

  // Hàm kiểm tra độ mạnh của mật khẩu
  const validatePassword = (password) => {
    // Mật khẩu phải có ít nhất 8 ký tự
    return password.length >= 8;
  };

  // Xử lý sự kiện khi nhấn nút Submit
  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn không cho trang tải lại

    if (!newPassword) {
      alert('Vui lòng nhập mật khẩu mới.');
      return;
    }

    if (!validatePassword(newPassword)) {
      alert('Mật khẩu phải có ít nhất 8 ký tự.');
      return;
    }

    // Gửi yêu cầu cập nhật mật khẩu đến backend
    fetch('https://example.com/update-password', { // Thay URL bằng API thực tế của bạn
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Mật khẩu của bạn đã được cập nhật thành công!');
          // Chuyển hướng người dùng tới trang đăng nhập hoặc thông báo thành công
          window.location.href = 'login.html';
        } else {
          alert('Đã xảy ra lỗi khi cập nhật mật khẩu. Vui lòng thử lại.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
      });
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        maxWidth: 500,
        margin: '100px auto',
        padding: '30px',
        textAlign: 'center',
        borderRadius: '10px',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Reset Account Password
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please enter your new password.
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="New Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
