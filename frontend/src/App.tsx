import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import ProtectedRoute from "./components/protected";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
// import * as actions from './utils/storeActions';
import { useState } from "react";
// import store from "./utils/store";

import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import "./App.css";

function App() {
  const [hasToken, setHasToken] = useState<boolean>(localStorage.getItem('access') !== null);

  function Logout() {
    localStorage.clear();
    // setData(actions.updateState('hasToken', false));
    setHasToken(false);
    return <Navigate to="/login" />;
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
                <Link to="/logout" className="nav-link">
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
          <Route path="/login" element={<Login setHeadState={setHasToken} />} />
          <Route path="/register" element={<Signup setHeadState={setHasToken} />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
