import React, { useState } from 'react';
// Import thư viện React và sử dụng hook useState để quản lý trạng thái dữ liệu
import { Button, Box, Typography, Paper, TextField, IconButton, InputAdornment } from '@mui/material';
// Import các thành phần của MUI (Material-UI) để tạo UI
import { Visibility, VisibilityOff } from '@mui/icons-material';
// Import các biểu tượng để giúp bật/tắt hiển thị mật khẩu

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState(''); // Trạng thái lưu mật khẩu cũ
  const [newPassword, setNewPassword] = useState(''); // Trạng thái lưu mật khẩu mới
  const [confirmPassword, setConfirmPassword] = useState(''); // Trạng thái lưu xác nhận mật khẩu

  // Khởi tạo các state để quản lý việc hiển thị/ẩn mật khẩu
  const [showOldPassword, setShowOldPassword] = useState(false); // False là ẩn mật khẩu cũ, True là hiển thị
  const [showNewPassword, setShowNewPassword] = useState(false); // False là ẩn mật khẩu mới, True là hiển thị
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // False là ẩn xác nhận mật khẩu, True là hiển thị
  // const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  // const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  const validateNewPassword = (password) => {{
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!*()]).{8,}$/; // Regex kiểm tra mật khẩu
    if (!passwordRegex.test(newPassword)) { //Hàm test dùng để kiểm tra xem trường newPassword có khớp với hàm biểu thức chính quy "passwordRegex" hay không
      setNewPasswordError('Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất một ký tự số, một ký tự chữ cái thường, một ký tự chữ cái hoa và một ký tự đặc biệt.');
    } else {
      setNewPasswordError('');
    }
  }}
  // Hàm xử lý khi người dùng nhấn nút "Change Password"
  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn không cho trang tải lại khi nhấn nút submit

    // Kiểm tra xem người dùng đã điền đủ thông tin trong các trường mật khẩu chưa
    if (!oldPassword || !newPassword || !confirmPassword) {
      alert('Vui lòng điền đầy đủ các thông tin yêu cầu');
      return;
    }
   
    if (newPassword != confirmPassword) {
      alert('Mật khẩu mới và xác nhận mật khẩu không trùng khớp.');
      return;
    }
    if (newPasswordError) { // Kiểm tra nếu có lỗi
      alert('Mật khẩu mới không hợp lệ.'); // Có thể hiển thị thông báo này nếu cần
      return;
    }

    // Gửi yêu cầu thay đổi mật khẩu tới backend
    fetch('https://example.com/change-password', { // Thay thế bằng URL của API backend thật sự
      method: 'POST', // Sử dụng phương thức POST để gửi dữ liệu
      headers: {
        'Content-Type': 'application/json', // Đặt tiêu đề Content-Type là JSON
      },
      body: JSON.stringify({
        oldPassword: oldPassword, // Gửi mật khẩu cũ
        newPassword: newPassword, // Gửi mật khẩu mới
      }),
    })
      .then((response) => response.json()) // Chuyển đổi phản hồi từ backend sang JSON
      .then((data) => {
        if (data.success) { // Nếu backend trả về kết quả thành công
          alert('Mật khẩu đã được thay đổi thành công!');
          window.location.href = "Login.jsx"; // Chuyển hướng người dùng về trang đăng nhập sau khi thay đổi thành công
        } else {
          alert('Đã xảy ra lỗi khi thay đổi mật khẩu'); // Hiển thị thông báo lỗi nếu không thành công
        }
      })
      .catch((error) => {
        console.error('Error:', error); // In ra lỗi nếu có sự cố kết nối
        alert('Đã xảy ra lỗi kết nối. Vui lòng thử lại sau.');
      });
  };

  return (
    <Box
      component={Paper} //Đặt box dưới dạng paper để có hiệu ứng nổi
      elevation={5} //Tạo độ bóng cho paper (tạo bóng dưới)
      sx={{
        maxWidth: '400px', //Chiều rộng tối đa của hộp là 400px
        margin: '100px auto', //Căn giữa hộp theo chiều ngang có khoảng cách là 100px từ trên xuống
        padding: '20px', //Khoảng cách giữa nội dung và viền hộp là 20px
        textAlign: 'center', //Căn giữa văn bản trong hôp;
        borderRadius: '10px', //Bo tròn hộp
        //   display: 'flex',
        // justifyContent: 'center', // Căn giữa theo chiều ngang
        // alignItems: 'center',     // Căn giữa theo chiều dọc
      }}
    >

      {/* Tạo tiêu đề kích thước h4 cho "Change Account Password" */}
      <Typography variant='h4' >
        Change Account Password
      </Typography>
      {/* Tạo 1 box với kiểu form và khi người dùng nhấn "submit" sẽ chạy về handleSubmit
      với margin-top là 2px phân cách cho các phần tử trong form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        {/* Trường nhập liệu cho "Old Password" */}
        <TextField
          label="Old Password"
          type={showOldPassword ? 'text' : 'password'} //Cho phép người dùng có thể xem mật khẩu khi nhấn icon
          fullWidth
          margin='normal'
          InputLabelProps={{
            style: {
              fontWeight: 'bold', // Làm cho chữ đậm trong thành phần input bên trong nhãn
            },
          }}
          value={oldPassword} //Gán giá trị {oldPassword} cho State
          onChange={(e) => setOldPassword(e.target.value)} //Khi người dùng nhập dữ liệu thì state thay đổi theo

          InputProps={{ //Cho phép thêm các thành phần tùy chỉnh vào trường nhập, trường hợp này là ẩn hiện mật khẩu
            endAdornment: ( //Thêm 1 phần tử vào cuối trường nhập
              // Thành phần để tạo không gian cho biểu tượng ở cuối trường nhập
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => setShowOldPassword(!showOldPassword)} //Người dùng click chuyển đổi ẩn, hiện mật khẩu
                  edge='end'
                >
                  {showOldPassword ? <VisibilityOff /> : <Visibility />}

                </IconButton>
              </InputAdornment>
            ),
          }}
        >
        </TextField>
        <TextField
          label="New Password"
          type={showNewPassword ? 'text' : 'password'}
          fullWidth
          margin='normal'
          error = {Boolean(newPasswordError)}
          helperText= {newPasswordError}
          InputLabelProps={{
            style: {
              fontWeight: 'bold', // Làm cho chữ đậm
            },
          }}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          onBlur={() => validateNewPassword(newPassword)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  edge='end'
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}

                </IconButton>
              </InputAdornment>
            ),
          }}
          
        >
          {newPasswordError && (
          <Typography variant='body2' color='error' sx={{ mt: 1 }}>
            {newPasswordError}
          </Typography>
        )}
        </TextField>
        <TextField
          label="Confirm Password"
          fontWeight='bold'
          type={showConfirmPassword ? 'text' : 'password'}
          fullWidth
          margin='normal'
          InputLabelProps={{
            style: {
              fontWeight: 'bold', // Làm cho chữ đậm
            },
          }}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge='end'
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}

                </IconButton>
              </InputAdornment>
            ),
          }}
        >

        </TextField>
       
        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{ mt: 2, width: '100%' }}
        >Change Password</Button>

      </Box>
    </Box>




  )
}
