import React from "react";
import {
  AppBar as MUIAppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const AppBar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/login");
    localStorage.clear();
  };

  return (
    <MUIAppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit" onClick={() => navigate("/home")}>
          Home
        </Button>
        <Button color="inherit" onClick={() => navigate("/devices")}>
          Devices
        </Button>
        <Button
          style={{
            marginLeft: "15px",
            color: 'white',
            backgroundColor: "#978d8d",
            fontSize: "11px",
            opacity: ".9"
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </MUIAppBar>
  );
};

export default AppBar;
