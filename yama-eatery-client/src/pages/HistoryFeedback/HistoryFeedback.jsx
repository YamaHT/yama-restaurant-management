import * as React from 'react';
import {
  Box,
  Container,
  Typography,
  Divider,
  Rating,
  TextField,
  Button,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  createTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#FFFFFF',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0BEC5',
    },
    warning: {
      main: '#FF9800',
    },
  },
});

const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: '2% 0',
  backgroundColor: theme.palette.divider,
}));

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconFilled': {
    color: theme.palette.warning.main,
  },
}));

const ReviewItem = ({ product, message, rating }) => (
  <Box sx={{ padding: 2 }}>
    <Typography variant="subtitle1" fontWeight="bold">
      {product}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {message}
    </Typography>
    <StyledRating value={rating} readOnly />
  </Box>
);

const FeedbackHistory = () => {
  const [reviewType, setReviewType] = React.useState('All reviews');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const reviewsPerPage = 7;

  const handleReviewTypeChange = (type) => {
    setReviewType(type);
    setCurrentPage(1);
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const reviews = [
    {
      UserId: 1,
      ProductId: 101,
      product: 'Apple iMac 27", M2 Max CPU 1TB HDD, Retina 5K',
      message: "It’s fancy, amazing keyboard, matching accessories. Super fast, batteries last more than usual.",
      rating: 5,
    },
    {
      UserId: 2,
      ProductId: 102,
      product: 'iPad Pro 13-Inch (M4): XDR Display, 512GB',
      message: "Elegant look, exceptional keyboard, and well-matched accessories. Lightning-quick speed.",
      rating: 4,
    },
    {
      UserId: 3,
      ProductId: 103,
      product: 'PlayStation®5 Console – 1TB, PRO Controller',
      message: "It’s fancy, amazing keyboard, matching accessories. Super fast, batteries last more than usual.",
      rating: 3,
    },
    {
      UserId: 4,
      ProductId: 104,
      product: 'Apple Watch SE [GPS 40mm], Smartwatch',
      message: "The DualSense controller enhances gameplay with immersive feedback, making it a must-have.",
      rating: 5,
    },
    {
      UserId: 5,
      ProductId: 105,
      product: 'Apple MacBook PRO Laptop with M2 chip',
      message: "Elegant and refined, with well-chosen accessories. Quick response, durable battery.",
      rating: 2,
    },
  ];

  const filteredReviews = reviews
    .filter((review) => {
      if (reviewType === 'All reviews') return true;
      return review.rating === parseInt(reviewType);
    })
    .filter((review) => {
      if (!searchTerm) return true;
      return review.product.toLowerCase().includes(searchTerm.toLowerCase());
    });

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
  const pageCount = Math.ceil(filteredReviews.length / reviewsPerPage);

  return (
    <Box sx={{ padding: 4, backgroundColor: theme.palette.background.default,
     width: '100%', margin: '60px', padding: '20px', boxShadow: 3, borderRadius: '8px', backgroundColor: '#ffffff' }}>
      <Container maxWidth="lg">
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ marginBottom: 3 }}>
          <Typography variant="h5" fontWeight="semibold">Header</Typography>
          <Button variant="contained" onClick={openMenu}>Select Review Type</Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
            <MenuItem onClick={() => handleReviewTypeChange('All reviews')}>All Reviews</MenuItem>
            <MenuItem onClick={() => handleReviewTypeChange('5')}>5 Stars</MenuItem>
            <MenuItem onClick={() => handleReviewTypeChange('4')}>4 Stars</MenuItem>
            <MenuItem onClick={() => handleReviewTypeChange('3')}>3 Stars</MenuItem>
            <MenuItem onClick={() => handleReviewTypeChange('2')}>2 Stars</MenuItem>
            <MenuItem onClick={() => handleReviewTypeChange('1')}>1 Star</MenuItem>
          </Menu>
          <TextField sx={{ width: '300px' }} value={searchTerm} onChange={handleSearchChange} placeholder="Search by name" variant="outlined" />
        </Stack>
        <StyledDivider />
        <Box sx={{  gap: 1 }}>
          <Box sx={{ flex: 1 }}>
            {currentReviews.length > 0 ? (
              currentReviews.map((review, index) => (
                <React.Fragment key={index}>
                  <ReviewItem product={review.product} message={review.message} rating={review.rating} />
                  {index < currentReviews.length - 1 && <StyledDivider />}
                </React.Fragment>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">No reviews found.</Typography>
            )}
            <Pagination count={pageCount} page={currentPage} onChange={handlePageChange} color="primary" sx={{ marginTop: 2, justifyContent: 'center' }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FeedbackHistory;
