import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

export default function ForgotPassword() {
  const [email, setEmail] = useState(''); // Sử dụng useState để quản lý email

  // Hàm kiểm tra email hợp lệ
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Xử lý sự kiện khi nhấn nút Submit
  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn form gửi yêu cầu mặc định

    // Kiểm tra email có rỗng không
    if (!email) {
      alert('Vui lòng nhập địa chỉ email.');
      return;
    }

    // Kiểm tra email có hợp lệ không
    if (!isValidEmail(email)) {
      alert('Địa chỉ email không hợp lệ.');
      return;
    }

    // Nếu email hợp lệ, gửi yêu cầu tới backend
    fetch('https://example.com/send-otp', { // Thay URL thực của backend vào đây
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('OTP đã được gửi đến địa chỉ email của bạn.');
        } else {
          alert('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi khi gửi yêu cầu.');
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
        Please enter your email address. You will receive an OTP message to create a new password.
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Email address"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          fullWidth
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
