import * as React from 'react';
import {
  Box,
  Container,
  Typography,
  Divider,
  Rating,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  TextField,
  createTheme,
  Stack,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

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
  margin: '16px 0',
  backgroundColor: theme.palette.divider,
}));

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconFilled': {
    color: theme.palette.warning.main,
  },
}));

const ReviewItem = ({ product, message, rating }) => {
  return (
    <Grid2 container columns={12} columnSpacing={2} alignItems="center">
      <Grid2 item xs={12} sm={3}>
        <Typography variant="subtitle1" fontWeight="bold">
          {product}
        </Typography>
      </Grid2>
      <Grid2 item xs={12} sm={6}>
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </Grid2>
      <Grid2 item xs={12} sm={3}>
        <StyledRating value={rating} readOnly />
      </Grid2>
    </Grid2>
  );
};

const FeedbackHistory = () => {
  const [reviewType, setReviewType] = React.useState('All reviews');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [drawerOpen, setDrawerOpen] = React.useState(false); // State for Drawer
  const reviewsPerPage = 7;

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleReviewTypeChange = (type) => {
    setReviewType(type);
    setCurrentPage(1);
    setDrawerOpen(false); // Close drawer after selection
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const reviews = [
    {
      product: 'Apple iMac 27", M2 Max CPU 1TB HDD, Retina 5K',
      message: "It’s fancy, amazing keyboard, matching accessories. Super fast, batteries last more than usual.",
      rating: 5,
    },
    {
      product: 'iPad Pro 13-Inch (M4): XDR Display, 512GB',
      message: "Elegant look, exceptional keyboard, and well-matched accessories. Lightning-quick speed.",
      rating: 4,
    },
    {
      product: 'PlayStation®5 Console – 1TB, PRO Controller',
      message: "It’s fancy, amazing keyboard, matching accessories. Super fast, batteries last more than usual.",
      rating: 3,
    },
    {
      product: 'Apple Watch SE [GPS 40mm], Smartwatch',
      message: "The DualSense controller enhances gameplay with immersive feedback, making it a must-have.",
      rating: 5,
    },
    {
      product: 'Apple MacBook PRO Laptop with M2 chip',
      message: "Elegant and refined, with well-chosen accessories. Quick response, durable battery.",
      rating: 2,
    },
    {
      product: 'Apple iMac 27", M2 Max CPU 1TB HDD, Retina 5K',
      message: "It’s fancy, amazing keyboard, matching accessories. Super fast, batteries last more than usual.",
      rating: 5,
    },
    {
      product: 'iPad Pro 13-Inch (M4): XDR Display, 512GB',
      message: "Elegant look, exceptional keyboard, and well-matched accessories. Lightning-quick speed.",
      rating: 4,
    },
    {
      product: 'PlayStation®5 Console – 1TB, PRO Controller',
      message: "It’s fancy, amazing keyboard, matching accessories. Super fast, batteries last more than usual.",
      rating: 3,
    },
    {
      product: 'Apple Watch SE [GPS 40mm], Smartwatch',
      message: "The DualSense controller enhances gameplay with immersive feedback, making it a must-have.",
      rating: 5,
    },
    {
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
      width: '1420px', margin: '60px',
      padding: '20px',
      boxShadow: 3,
      borderRadius: '8px',
      backgroundColor: '#ffffff',
     }}>
      <Container maxWidth="lg">
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ marginBottom: 3 }}>
          <Typography variant="h5" fontWeight="semibold">
            My reviews
          </Typography>
          <TextField
            sx={{ width: '300px' }}
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name"
            variant="outlined"
          />
        </Stack>
        <StyledDivider />

        <Box sx={{ display: 'flex', gap: 3 }}>
          {/* Left column: Drawer toggle button */}
          <Box sx={{ width: '250px' }}>
            <Button variant="contained" onClick={toggleDrawer(true)}>
              Select review types
            </Button>
          </Box>

          {/* Right column: Reviews */}
          <Box sx={{ flex: 1 }}>
            {currentReviews.length > 0 ? (
              currentReviews.map((review, index) => (
                <React.Fragment key={index}>
                  <ReviewItem
                    product={review.product}
                    message={review.message}
                    rating={review.rating}
                  />
                  {index < currentReviews.length - 1 && <StyledDivider />}
                </React.Fragment>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No reviews found.
              </Typography>
            )}

            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}
            />
          </Box>
        </Box>

        {/* Drawer for selecting review types */}
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>

              <ListItemButton onClick={() => handleReviewTypeChange('All reviews')}>
                <ListItemText primary="All reviews" />
              </ListItemButton>
              <ListItemButton onClick={() => handleReviewTypeChange('5')}>
                <ListItemText primary="5 stars" />
              </ListItemButton>
              <ListItemButton onClick={() => handleReviewTypeChange('4')}>
                <ListItemText primary="4 stars" />
              </ListItemButton>
              <ListItemButton onClick={() => handleReviewTypeChange('3')}>
                <ListItemText primary="3 stars" />
              </ListItemButton>
              <ListItemButton onClick={() => handleReviewTypeChange('2')}>
                <ListItemText primary="2 stars" />
              </ListItemButton>
              <ListItemButton onClick={() => handleReviewTypeChange('1')}>
                <ListItemText primary="1 star" />
              </ListItemButton>
            </List>
          </Box>
        </Drawer>
      </Container>
    </Box>
  );
};

export default FeedbackHistory;
