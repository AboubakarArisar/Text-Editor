import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../LandingPage";
import SignIn from "../Signin";
import SignUp from "../Signup";
import TextEditingArea from "../TextEditingArea";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/editor' element={<TextEditingArea />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
