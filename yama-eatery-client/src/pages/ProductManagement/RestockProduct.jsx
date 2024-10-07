import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

export default function RestockProduct({ open, handleClose, currentQuantity, onRestock }) {
  const [quantity, setQuantity] = useState(currentQuantity);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    }
  };

  const handleConfirm = () => {
    onRestock(quantity);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Restock Product</DialogTitle>
      <DialogContent>
        <Stack direction="row" alignItems="center" spacing={2} justifyContent="center">
          <IconButton onClick={handleDecrease}>
            <Remove />
          </IconButton>
          <TextField
            type="number"
            value={quantity}
            onChange={handleInputChange}
            inputProps={{ min: 0 }}
            sx={{ width: 70, textAlign: 'center' }}
          />
          <IconButton onClick={handleIncrease}>
            <Add />
          </IconButton>
        </Stack>
        <Typography align="center" marginTop={2}>
          Current Quantity: {currentQuantity}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
