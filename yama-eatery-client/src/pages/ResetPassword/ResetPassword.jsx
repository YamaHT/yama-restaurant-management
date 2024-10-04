import React, { useState } from 'react'
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

export default function ResetPassword() {
  const [newPassword, setNewPassWord] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gửi yêu cầu cập nhật mật khẩu đến backend
    fetch('https://example.com/update-password', { // Thay URL bằng API thực tế của bạn
      method: 'POST', // Sử dụng phương thức POST để gửi dữ liệu
      headers: {
        'Content-Type': 'application/json', // Đặt tiêu đề Content-Type là JSON
      },
      body: JSON.stringify({ password: newPassword }), // Chuyển đổi mật khẩu mới thành chuỗi JSON để gửi tới backend
    })
      .then((response) => response.json()) // Chuyển đổi phản hồi từ backend sang JSON
      .then((data) => {
        if (data.success) { // Nếu backend trả về kết quả thành công
          alert('Mật khẩu của bạn đã được cập nhật thành công!'); // Thông báo cho người dùng
          // Chuyển hướng người dùng tới trang đăng nhập hoặc thông báo thành công
          window.location.href = 'login.html'; // Thay đổi địa chỉ URL để điều hướng
        } else {
          alert('Đã xảy ra lỗi khi cập nhật mật khẩu. Vui lòng thử lại.'); // Thông báo lỗi nếu không thành công
        }
      })
      .catch((error) => {
        console.error('Error:', error); // In ra lỗi nếu có sự cố kết nối
        alert('Đã xảy ra lỗi. Vui lòng thử lại sau.'); // Thông báo lỗi cho người dùng
      });
  };
  return (
    <Box
      component={Paper}
      elevation={5}
      sx={{
        maxWidth: '500px',
        margin: '100px auto',
        padding: '30px',
        textAlign: 'center',
        borderRadius: "10px"
      }}
    >
      <Typography variant='h4' gutterBottom>
        Reset Account Password


      </Typography>
      <Typography variant='body1' gutterBottom>
        Please enter your new password

      </Typography>
      <Box
        component='form' onSubmit={handleSubmit}
      >
        <TextField
          label="New Password"
          type='password'
          variant='outlined'
          fullWidth
          margin='normal'
          InputLabelProps={{
            style: {
              fontWeight: 'bold', // Làm cho chữ nhãn trở nên đậm
            },
          }}
          value={newPassword}
          onChange={(e) => setNewPassWord(e.target.value)}
        >

        </TextField>
        <Button
          type='submit'
          color='primary'
          variant='contained'
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Box>

  )
}
