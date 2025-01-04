import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "./components/protected";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import { setHasToken } from "./utils/store";

import Logout from "./pages/logout";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";


function App() {
  const hasToken = useSelector((state: { hasToken: { value: boolean } }) => state.hasToken.value);
  const dispatch = useDispatch();

  function handelLogout() {
    localStorage.clear();
    dispatch(setHasToken(false));
  }

  return (
    <BrowserRouter>
      <header className="header">
        <nav>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            {!hasToken ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/logout" className="nav-link" onClick={handelLogout}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main className="container d-flex justify-content-center gap-2">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
