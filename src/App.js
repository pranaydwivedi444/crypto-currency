import { LinearProgress } from "@mui/material";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header.component";
// import CryptoConverter from "./Pages/CryptoConverter/CryptoConverter.component";
import Homepage from "./Pages/Homepage/Homepage.component";
// Lazy loading CryptoConverter component
const CryptoConverter = lazy(() =>
  import("./Pages/CryptoConverter/CryptoConverter.component")
);

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<LinearProgress />}>
          <Routes>
            <Route path="/" Component={Homepage} exact />
            <Route path="/cryptoconverter" Component={CryptoConverter} />
            <Route path="*" component={Homepage} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
