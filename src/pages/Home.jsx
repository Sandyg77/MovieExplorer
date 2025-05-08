import React from "react";
import { Container, Box, Typography } from "@mui/material";
import Layout from "../components/Layout";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <Layout>
      <Banner />
      <Container maxWidth="xl">
        <Box
          sx={{
            padding: { xs: 2, sm: 4 },
          }}
        ></Box>
      </Container>
    </Layout>
  );
};

export default Home;
