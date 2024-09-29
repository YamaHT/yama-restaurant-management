import {
  Box,
  Typography,
  Toolbar,
  Button,
  Select,
  MenuItem,
  Slider,
  Stack,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";

export default function ProductList() {
  const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterOption, setFilterOption] = useState(""); // Unified filter/sort option

  const products = [
    {
      id: 1,
      name: "Banh Pia",
      price: 10.5,
      category: "dessert",
      description: "Delicious Banh Pia dessert.",
      imgSrc: "https://readymadeui.com/images/product9.webp",
    },
    {
      id: 2,
      name: "Cua Hoang De",
      price: 20.5,
      category: "food",
      description: "Another variant of Banh Pia.",
      imgSrc: "https://readymadeui.com/images/product9.webp",
    },
    {
      id: 3,
      name: "Soda",
      price: 1.5,
      category: "drink",
      description: "Oishi",
      imgSrc: "https://readymadeui.com/images/product9.webp",
    },
    {
      id: 4,
      name: "Lays Xanh La",
      price: 0.5,
      category: "snack",
      description: "Yummy.",
      imgSrc: "https://readymadeui.com/images/product9.webp",
    },
  ];

  // Reset filters, price range, and sorting when the "All" button is clicked
  const handleShowAll = () => {
    setFilterOption("");
    setPriceRange([0, 1000]); // Reset price range to default
  };

  // Update products based on price range, unified sort/filter option
  useEffect(() => {
    let filtered = products.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Handle combined filtering and sorting
    switch (filterOption) {
      case "low-to-high":
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case "drink":
        filtered = filtered.filter((product) => product.category === "drink");
        break;
      case "dessert":
        filtered = filtered.filter((product) => product.category === "dessert");
        break;
      case "food":
        filtered = filtered.filter((product) => product.category === "food");
        break;
      case "snack":
        filtered = filtered.filter((product) => product.category === "snack");
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [priceRange, filterOption]);

  return (
    <Box sx={{ py: 4, mx: "auto", maxWidth: "1400px" }}>
      <Toolbar sx={{ justifyContent: "center", mb: 10 }}>
        {/* All Button to reset filters, price range, and sorting */}
        <Button
          variant="contained"
          onClick={handleShowAll}  // Call handleShowAll on click
          sx={{ mr: 3 }}
        >
          All
        </Button>

        {/* Filter Section */}
        <Box width="20%">
          <Typography gutterBottom>Filter price</Typography>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
          />
          <Typography>
            ${priceRange[0]} - ${priceRange[1]}
          </Typography>
        </Box>

        {/* Unified Filter and Sort Dropdown */}
        <Box sx={{ ml: 3 }}>
          <Typography gutterBottom>Sort & Filter</Typography>
          <Select
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">Select Option</MenuItem>
            <MenuItem value="low-to-high">Price: Low to High</MenuItem>
            <MenuItem value="high-to-low">Price: High to Low</MenuItem>
            <MenuItem value="drink">Category: Drink</MenuItem>
            <MenuItem value="dessert">Category: Dessert</MenuItem>
            <MenuItem value="food">Category: Food</MenuItem>
            <MenuItem value="snack">Category: Snack</MenuItem>
          </Select>
        </Box>
      </Toolbar>

      {/* Conditionally render if no products are found */}
      {filteredProducts.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ mt: 10 }}>
          No products found matching the selected filters or price range.
        </Typography>
      ) : (
        <Grid2 container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid2 item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Box
                sx={{
                  backgroundColor: "gray.50",
                  boxShadow: 2,
                  borderRadius: 2,
                  cursor: "pointer",
                  "&:hover": { transform: "translateY(-8px)" },
                  transition: "all 0.3s ease-in-out",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    height: 260,
                    padding: 2,
                    backgroundColor: "gray.100",
                  }}
                >
                  <img
                    src={product.imgSrc}
                    alt={product.name}
                    style={{
                      objectFit: "contain",
                      maxHeight: "100%",
                      maxWidth: "100%",
                    }}
                  />
                </Box>
                <Box sx={{ p: 3, backgroundColor: "white" }}>
                  <Typography variant="h6" fontWeight="bold" color="gray.800">
                    {product.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ mt: 1, color: "gray.800" }}
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="gray.600" sx={{ mt: 1 }}>
                    {product.description}
                  </Typography>
                  <Button variant="outlined" href="#" sx={{ mr: 2 }}>
                    Product Detail
                  </Button>
                  <Button variant="outlined" href="#" sx={{ mr: 2 }}>
                    Order
                  </Button>
                </Box>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      )}
    </Box>
  );
}
