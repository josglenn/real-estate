import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import AboutUs from "./pages/AboutUs";
import CreateListing from "./pages/CreateListing";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={"/"} element={<Home />} />

          <Route path={"/sign-in"} element={<SignIn />} />
          <Route path={"/about-us"} element={<AboutUs />} />
          <Route path={"/sign-up"} element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path={"/profile"} element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
