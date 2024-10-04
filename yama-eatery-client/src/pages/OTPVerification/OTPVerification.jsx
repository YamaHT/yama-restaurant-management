import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, Link } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { VerifiedUser } from '@mui/icons-material';
export default function OtpVerification() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleOtpChange = (value, index) => {
    if (value.length > 1) return; // Chỉ cho phép nhập 1 ký tự
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < otp.length - 1 && value !== '') {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
    setIsButtonActive(newOtp.every(val => val !== ''));
  };

  const handleBackspace = (event, index) => {
    if (event.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handleResendOtp = (event) => {
    event.preventDefault();
    alert('OTP sẽ được gửi lại!');
    // Thêm logic gửi lại OTP như fetch() hoặc axios() nếu cần thiết
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isButtonActive) {
      alert(`OTP đã nhập: ${otp.join('')}`);
      // Thêm logic xử lý OTP tại đây
    }
  };

  useEffect(() => {
    document.getElementById('otp-input-0').focus(); // Tự động focus vào input đầu tiên khi trang tải
  }, []);

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        maxWidth: 400,
        margin: '100px auto',
        padding: '30px',
        textAlign: 'center',
        borderRadius: '10px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          rowGap: 2,
        }}
      >
        <VerifiedUser
          sx={{
            fontSize: 60,
            color: '#4070f4',
            backgroundColor: '#81d4fa',
            borderRadius: '50%',
            padding: '10px',
            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Typography variant="h4">Enter OTP Code</Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              columnGap: 2,
            }}
          >
            {otp.map((value, index) => (
              <TextField
              key={index}
              id={`otp-input-${index}`}
              type="number"
              variant="outlined"
              value={value}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              inputProps={{
                maxLength: 1,
                style: { textAlign: 'center' },
                inputMode: 'numeric', // Đảm bảo chỉ nhập số
                pattern: '[0-9]*', // Chỉ cho phép nhập số
              }}
              sx={{
                width: 50,
                '& input[type=number]': {
                  '-moz-appearance': 'textfield', // Vô hiệu hóa spinner trên Firefox
                },
                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                  '-webkit-appearance': 'none', // Vô hiệu hóa spinner trên Chrome, Safari và Edge
                  margin: 0, // Loại bỏ khoảng trống
                },
              }}
            />
            
            ))}
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!isButtonActive}
            sx={{ mt: 3 }}
          >
            Verify OTP
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Didn't receive OTP code?{' '}
          <Link href="#" onClick={handleResendOtp}>
            Resend
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
