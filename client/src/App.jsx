import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/profile"} element={<Profile />} />
          <Route path={"/sign-in"} element={<SignIn />} />
          <Route path={"/about-us"} element={<AboutUs />} />
          <Route path={"/sign-up"} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
