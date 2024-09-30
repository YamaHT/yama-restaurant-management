import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Button, Divider, Rating, Avatar, Card, CardMedia, CardContent } from '@mui/material';
import { useParams } from 'react-router-dom';
import { products } from '../FakeData/FakeData';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

export default function ProductDetail() {
  const { id } = useParams(); // Get product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const productDetail = products.find((item) => item.id === parseInt(id)); // Find product by ID
    setProduct(productDetail);
  }, [id]);

  if (!product) {
    return (
      <Box sx={{ fontFamily: 'sans-serif', p: 4, maxWidth: '1200px', mx: 'auto' }}>
        <Typography variant="h4" textAlign="center">Product not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ fontFamily: 'sans-serif', p: 4, maxWidth: '1200px', mx: 'auto' }}>
      <Grid2 container spacing={3}>
        {/* Left Section (Product Image and Thumbnails) */}
        <Grid2 item xs={12} lg={7}>
          <Card
            sx={{
              minHeight: 500,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(to top right, #F8C794, #FFE0B5, #FFF2D7)',
              p: 4,
              position: 'sticky',
              top: 0,
            }}
          >
            <CardMedia
              component="img"
              src={product.imgSrc}
              alt={product.name}
              sx={{ width: '60%', objectFit: 'cover', borderRadius: 1, mb: 4 }}
            />
            <Divider sx={{ width: '100%', my: 4 }} />
            <Grid2 container spacing={2} justifyContent="center">
              {product.thumbnails?.map((img, index) => (
                <Grid2 item key={index}>
                  <CardMedia
                    component="img"
                    src={img}
                    alt={`Product thumbnail ${index + 1}`}
                    sx={{ width: 80, height: 80, borderRadius: 1, cursor: 'pointer' }}
                  />
                </Grid2>
              ))}
            </Grid2>
          </Card>
        </Grid2>

        {/* Right Section (Product Details and Reviews) */}
        <Grid item xs={12} lg={5}>
          <Typography variant="h4" fontWeight="bold" color="textPrimary">
            {product.name}
          </Typography>

          <Box mt={2} display="flex" gap={2}>
            <Typography variant="h5" fontWeight="bold" color="textPrimary">
              ${product.price}
            </Typography>
            {product.discount && (
              <Typography variant="h6" color="textSecondary">
                <strike>${product.originalPrice}</strike> <small>(Tax included)</small>
              </Typography>
            )}
          </Box>

          <Rating value={3}></Rating>

          <Typography variant="h6" fontWeight="bold" color="textPrimary" mt={4}>
            About the {product.name} 
          </Typography>
          <Typography variant="p"  color="textPrimary" mt={4}>
            {product.description}
          </Typography>
          {/* <ul style={{ paddingLeft: '20px', marginTop: '16px', color: '#444' }}>
            {product.features?.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul> */}

          <Button
            variant="contained"
            sx={{ backgroundColor: 'orange', mt: 4, width: '100%' }}
            size="large"
          >
            Add to cart
          </Button>

          {/* Reviews */}
          <Typography variant="h6" fontWeight="bold" color="textPrimary" mt={8}>
            Reviews ({product.reviews?.length})
          </Typography>

          <Box mt={2}>
            {product.reviews?.map((review, index) => (
              <Box display="flex" alignItems="center" key={index} mb={1}>
                <Typography variant="body2" fontWeight="bold" color="textPrimary">
                  {review.rating}.0
                </Typography>
                <Rating value={review.rating} readOnly sx={{ ml: 1 }} size="small" />
                <Box sx={{ backgroundColor: '#E0E0E0', flexGrow: 1, ml: 2, height: '8px', borderRadius: '4px' }}>
                  <Box
                    sx={{
                      backgroundColor: 'orange',
                      width: `${review.percentage}%`,
                      height: '100%',
                      borderRadius: '4px',
                    }}
                  />
                </Box>
                <Typography variant="body2" fontWeight="bold" color="textPrimary" ml={2}>
                  {review.percentage}%
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Individual Review */}
          {product.reviews?.length > 0 && product.reviews.map((review, index) => (
            <Box display="flex" alignItems="flex-start" mt={4} key={index}>
              <Avatar src={review.avatar} alt={review.reviewer} />
              <Box ml={2}>
                <Typography variant="subtitle2" fontWeight="bold">
                  {review.reviewer}
                </Typography>
                <Rating value={review.rating} readOnly size="small" sx={{ mt: 0.5 }} />
                <Typography variant="body2" color="textSecondary" mt={1}>
                  {review.comment}
                </Typography>
              </Box>
            </Box>
          ))}

          <Button variant="outlined" sx={{ mt: 4, width: '100%' }} size="large">
            Read all reviews
          </Button>
        </Grid>
      </Grid2>
    </Box>
  );
}
