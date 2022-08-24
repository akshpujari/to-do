import Header from "./components/header/header";
import Lists from "./components/lists/list";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#195961",
      },
    },
    typography: {
      primary: {
        main: "#195961",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Lists />
    </ThemeProvider>
  );
}

export default App;
