import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignIn from "./components/auth/SignIn.tsx";
import SignUp from "./components/auth/SignUp.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
