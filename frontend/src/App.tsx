import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignIn from "@/pages/Auth/SignIn.tsx";
import SignUp from "@/pages/Auth/SignUp.tsx";
import NotFound from "@/pages/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
