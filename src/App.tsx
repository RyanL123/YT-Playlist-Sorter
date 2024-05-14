import { Box } from "@mui/material";
import React from "react";
import ReactGA from "react-ga4";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages";
import Help from "./pages/Help";

ReactGA.initialize("G-LRVNS567ZT");
ReactGA.send(window.location.pathname + window.location.search);

const App = () => {
  return (
    <Box bgcolor="background.default" minHeight="100vh">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
