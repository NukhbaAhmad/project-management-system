import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignIn from "@/pages/Auth/SignIn.tsx";
import SignUp from "@/pages/Auth/SignUp.tsx";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import { ProtectedRoute } from "@/utils/protectedRoutes";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
