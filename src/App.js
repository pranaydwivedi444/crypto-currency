import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header.component";
import CryptoConverter from "./Pages/CryptoConverter/CryptoConverter.component";
import Homepage from "./Pages/Homepage/Homepage.component";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" Component={Homepage} exact />
          <Route path="/cryptoconverter" Component={CryptoConverter} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
