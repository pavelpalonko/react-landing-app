import React from "react";
import './main.scss'
import MainPage from "./page/MainPage";
import Header from "./components/UI/Header/Header";
import Footer from "./components/UI/Footer/Footer";
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {

  const theme = createTheme({
    typography: {
      fontFamily: [
        "Nunito",
        "Roboto",
        "sans-serif"
      ].join(",")
    }
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <MainPage />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;