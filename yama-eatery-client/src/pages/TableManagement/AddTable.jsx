import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

export default function AddTable() {
  // State để lưu giá trị các trường
  const [tableId, setTableId] = useState('');
  const [floor, setFloor] = useState('');
  const [tableTypeId, setTableTypeId] = useState('');
  const [image, setImage] = useState(null);

  // Hàm xử lý khi chọn file ảnh
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Hàm xử lý khi nhấn nút Add
  const handleAdd = () => {
    alert('New table has been added');
    // Thêm logic xử lý thêm bảng mới (ví dụ: gửi dữ liệu tới backend)
  };

  // Hàm xử lý khi nhấn nút Cancel
  const handleCancel = () => {
    alert('Add table has been canceled');
    // Thêm logic xử lý hủy thêm mới
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        maxWidth: 500,
        margin: '100px auto',
        padding: '20px',
        textAlign: 'center',
        borderRadius: '10px',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Table
      </Typography>

      <Box component="form" sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body1" sx={{ flexBasis: '30%' }}>
            Table ID:
          </Typography>
          <TextField
            sx={{ flexBasis: '70%' }}
            value={tableId}
            onChange={(e) => setTableId(e.target.value)}
            fullWidth
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body1" sx={{ flexBasis: '30%' }}>
            Floor:
          </Typography>
          <TextField
            sx={{ flexBasis: '70%' }}
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            fullWidth
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body1" sx={{ flexBasis: '30%' }}>
            TableTypeID:
          </Typography>
          <TextField
            sx={{ flexBasis: '70%' }}
            value={tableTypeId}
            onChange={(e) => setTableTypeId(e.target.value)}
            fullWidth
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body1" sx={{ flexBasis: '30%' }}>
            Image:
          </Typography>
          <Box sx={{ flexBasis: '70%', textAlign: 'left' }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'block', marginBottom: '10px' }}
            />
            {image && (
              <img
                src={image}
                alt="Selected"
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            )}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            sx={{ borderRadius: '20px', mr: 2 }}
          >
            Add
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCancel}
            sx={{ borderRadius: '20px' }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
