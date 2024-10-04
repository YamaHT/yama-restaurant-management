import React from 'react';
import { Container, Typography, Box, Grid, Avatar, Card, CardMedia } from '@mui/material';

const AboutUs = () => {
  return (
    <Container>
      {/* Header Section */}
      <Box my={4} textAlign="center">
        <Typography variant="h3" gutterBottom>
          Yama Restaurant
        </Typography>
        <Typography variant="body1" color="textSecondary">
          It is a long established fact that a reader will be distracted by the readable content of a page when 
          looking at its layout. The point of using Lorem Ipsum. In the first place we have granted to God, and by 
          this our present charter confirmed for us and our heirs forever that the English Church shall be free, and 
          shall have her rights entire.
        </Typography>
      </Box>

      {/* Team Section */}
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* Person 1 */}
        <Grid item xs={12} md={4}>
          <Avatar
            alt="Person 1"
            src="https://via.placeholder.com/150" // Thay bằng URL hình ảnh của bạn
            sx={{ width: 150, height: 150, mx: "auto" }}
          />
          <Typography variant="h6" textAlign="center" mt={2}>
            Person 1
          </Typography>
        </Grid>

        {/* Person 2 */}
        <Grid item xs={12} md={4}>
          <Avatar
            alt="Person 2"
            src="https://via.placeholder.com/150" // Thay bằng URL hình ảnh của bạn
            sx={{ width: 150, height: 150, mx: "auto" }}
          />
          <Typography variant="h6" textAlign="center" mt={2}>
            Person 2
          </Typography>
        </Grid>

        {/* Person 3 */}
        <Grid item xs={12} md={4}>
          <Avatar
            alt="Person 3"
            src="https://via.placeholder.com/150" // Thay bằng URL hình ảnh của bạn
            sx={{ width: 150, height: 150, mx: "auto" }}
          />
          <Typography variant="h6" textAlign="center" mt={2}>
            Person 3
          </Typography>
        </Grid>

        {/* Person 4 */}
        <Grid item xs={12} md={4}>
          <Avatar
            alt="Person 4"
            src="https://via.placeholder.com/150" // Thay bằng URL hình ảnh của bạn
            sx={{ width: 150, height: 150, mx: "auto" }}
          />
          <Typography variant="h6" textAlign="center" mt={2}>
            Person 4
          </Typography>
        </Grid>

        {/* Person 5 */}
        <Grid item xs={12} md={4}>
          <Avatar
            alt="Person 5"
            src="https://via.placeholder.com/150" // Thay bằng URL hình ảnh của bạn
            sx={{ width: 150, height: 150, mx: "auto" }}
          />
          <Typography variant="h6" textAlign="center" mt={2}>
            Person 5
          </Typography>
        </Grid>

        {/* Person 6 */}
        <Grid item xs={12} md={4}>
          <Avatar
            alt="Person 6"
            src="https://via.placeholder.com/150" // Thay bằng URL hình ảnh của bạn
            sx={{ width: 150, height: 150, mx: "auto" }}
          />
          <Typography variant="h6" textAlign="center" mt={2}>
            Person 6
          </Typography>
        </Grid>
      </Grid>

      {/* Our Story Section */}
      <Box my={4}>
        <Grid container spacing={4} alignItems="center">
          {/* Left Side: Text Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Our Story
            </Typography>
            <Typography variant="body1" paragraph>
              It is a long established fact that a reader will be distracted by the readable content of a page when 
              looking at its layout. The point of using Lorem Ipsum. In the first place we have granted to God, and 
              by this our present charter confirmed for us and our heirs forever that the English Church shall be 
              free, and shall have her rights entire.
            </Typography>
            <Typography variant="body1" paragraph>
              It is a long established fact that a reader will be distracted by the readable content of a page when 
              looking at its layout. The point of using Lorem Ipsum.
            </Typography>
          </Grid>

          {/* Right Side: Video Section */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="iframe"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Thay bằng URL video YouTube của bạn
                title="Our Story Video"
                height="300"
              />
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Bottom Image */}
      <CardMedia
        component="img"
        image="https://th.bing.com/th/id/R.f76dfc05723cc6472106e40253c57848?rik=ulNZSVAVqFZUoA&pid=ImgRaw&r=0" // Thay bằng URL hình ảnh của bạn
        title="Our Story Image"
        height="300"
      />
    </Container>
  );
};

export default AboutUs;
