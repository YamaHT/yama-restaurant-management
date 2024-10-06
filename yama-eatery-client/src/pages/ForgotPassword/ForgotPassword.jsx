import React, {useState} from 'react'
import { Box, Button, TextField, Typography, Paper } from '@mui/material';


export default function ForgotPassword() {
 const [email, setEmail] = useState("");
const handleSubmit = (event) => {
  event.preventDefault(); // Ngăn không cho form gửi yêu cầu mặc định và tải lại trang

  // Gửi yêu cầu tới backend để gửi OTP (One-Time Password) tới email đã nhập
  fetch('https://example.com/send-otp', { // Thay thế bằng URL thực của backend
    method: 'POST', // Sử dụng phương thức POST để gửi dữ liệu
    headers: {
      'Content-Type': 'application/json', // Đặt tiêu đề Content-Type là JSON
    },
    body: JSON.stringify({ email: email }), // Chuyển đổi email thành chuỗi JSON và gửi đến backend
  })
    .then((response) => response.json()) // Chuyển đổi phản hồi từ backend sang JSON
    .then((data) => {
      if (data.success) { // Nếu backend trả về kết quả thành công
        alert('OTP đã được gửi đến địa chỉ email của bạn.'); // Hiển thị thông báo thành công
      } else {
        alert('Đã xảy ra lỗi. Vui lòng thử lại.'); // Hiển thị thông báo lỗi nếu không thành công
      }
    })
    .catch((error) => {
      console.error('Error:', error); // In ra lỗi nếu có sự cố kết nối
      alert('Đã xảy ra lỗi khi gửi yêu cầu.'); // Hiển thị thông báo lỗi cho người dùng
    });
};

 
return(
  <Box
  component={Paper}
  elevation={5}
  sx ={{
    maxWidth: '500px',
    margin: '100px auto',
    padding: '30px',
    textAlign: 'center',
    borderRadius: '10px'
  }}
  >
<Typography variant='h4' gutterBottom>
  Reset Account Password
</Typography>
<Typography variant="body1" gutterBottom>
        Please enter your email address. You will receive an OTP message to create a new password.
        {/* Hướng dẫn người dùng nhập địa chỉ email để nhận OTP */}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField 
        label = "Email Address"
        variant='outlined'
        fullWidth
        margin='normal'
        InputLabelProps={{
          style: {
            fontWeight: 'bold', // Làm cho chữ nhãn trở nên đậm
          },
        }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        ></TextField>
        <Button
        type='submit'
        color = 'primary'
        variant='contained'
        sx ={{mt: 2}}
        fullWidth
        >
          Submit
        </Button>
     </Box>
 
  </Box>
)
}
