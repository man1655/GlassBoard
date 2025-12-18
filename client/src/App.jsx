  import "./App.css";
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import LandingPage from "./pages/LandingPage";
  import LoadingScreen from "./components/common/LoadingScreen";
  import Login from "./pages/auth/Login";
  import Register from "./pages/auth/Register";
  import Profile from "./pages/settings/Profile";
  import Dashboard from "./components/Dashboard/Dashboard";
  import { getMe } from "./redux/slices/authSlice";
  import { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import UserList from "./components/Dashboard/User/UserList";
  import DashboardLayout from "./components/Dashboard/DashboardLayout";
import ProtectedRoute from "./hooks/ProtectedRoute";
import NotificationList from "./components/Dashboard/Notification/NotificationList";

  function App() {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    useEffect(() => {
      if (token) {
        dispatch(getMe());
      }
    }, [token, dispatch]);

    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile variant="standalone" />} />{" "}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />{" "}
                <Route path="profile" element={<Profile variant="dashboard" />} />{" "}
                <Route path="users" element={<UserList />} />{" "}
                <Route path='notification'element={<NotificationList/>}/>{""}
              </Route>
            </Route>
          </Routes>
        </Router>
      </>
    );
  }

  export default App;
