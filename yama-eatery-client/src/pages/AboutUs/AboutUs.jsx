import React from 'react';
import { Container, Typography, Box, Avatar, Card, CardMedia, Grid2 } from '@mui/material';

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
      <Grid2 container spacing={4} justifyContent="center" alignItems="center">
        {[
          { name: 'Person 1', img: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Person+1' },
          { name: 'Person 2', img: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Person+2' },
          { name: 'Person 3', img: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Person+3' },
          { name: 'Person 4', img: 'https://via.placeholder.com/150/FFFF00/FFFFFF?text=Person+4' },
          { name: 'Person 5', img: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Person+5' },
          { name: 'Person 6', img: 'https://via.placeholder.com/150/00FFFF/FFFFFF?text=Person+6' }
        ].map((person, index) => (
          <Grid2 item xs={12} md={4} key={index}>
            <Avatar
              alt={person.name}
              src={person.img} // Unique image for each person
              sx={{ width: 150, height: 150, mx: "auto" }}
            />
            <Typography variant="h6" textAlign="center" mt={3}>
              {person.name}
            </Typography>
          </Grid2>
        ))}
      </Grid2>

      {/* Our Story Section */}
      <Box my={4}>
        <Grid2 container spacing={4} alignItems="stretch">
          <Typography variant="h4" gutterBottom>
            Our Story
          </Typography>
          {/* Left Side: Text Section */}
          <Grid2 item xs={12} md={6}>
            <Box height="100%" display="flex" flexDirection="row" justifyContent="left">
              <Typography variant="body1" padding={'2% 2% 2% 2%'}>
                It is a long established fact that a reader will be distracted by the readable content of a page when
                looking at its layout. The point of using Lorem Ipsum. In the first place we have granted to God, and
                by this our present charter confirmed for us and our heirs forever that the English Church shall be
                free, and shall have her rights entire.
              </Typography>
              <CardMedia
                
                component="img"
                image="https://th.bing.com/th?id=OIP.T5k_y0w2KZjyuhlQiRd91gHaD_&w=340&h=183&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" // Replace with actual image URL
                title="Our Story Image"
                height="90%%"
              />
            </Box>
          </Grid2>
        </Grid2>
      </Box>

      {/* Bottom Image */}
      <CardMedia
        component="img"
        image="https://th.bing.com/th/id/R.f76dfc05723cc6472106e40253c57848?rik=ulNZSVAVqFZUoA&pid=ImgRaw&r=0" // Replace with actual image URL
        title="Our Story Image"
        height="300"
      />
    </Container>
  );
};

export default AboutUs;
