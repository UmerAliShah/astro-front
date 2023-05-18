import CreateProduct from "./ProductCreationArea";
import "../App.css";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import QRarea from "./QRgenerateArea";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/counterSlice";
import {
  Drawer,
  Button,
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
const drawerWidth = 240;

const AdminArea = (props) => {
  useEffect(() => {
    // Add the CSS class to the body when the admin section is active
    document.body.classList.add("admin-section");

    return () => {
      // Remove the CSS class from the body when the component is unmounted
      document.body.classList.remove("admin-section");
    };
  }, []);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePath, setActivePath] = useState("/");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    navigate("/");
  }, []);

  const containerDrawer =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem
          onClick={() => {
            navigate("/");
            setActivePath("/");
          }}
          className={activePath === "/" ? "active" : ""}
        >
          <ListItemButton>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem
          onClick={() => {
            navigate("/createProduct");
            setActivePath("/createProduct");
          }}
          className={activePath === "/createProduct" ? "active" : ""}
        >
          <ListItemButton>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Create Product" />
          </ListItemButton>
        </ListItem>
        <ListItem
          onClick={() => {
            navigate("/generateQR");
            setActivePath("/generateQR");
          }}
          className={activePath === "/generateQR" ? "active" : ""}
        >
          <ListItemButton>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="Code Generator" />
          </ListItemButton>
        </ListItem>
        <ListItem
          onClick={() => {
            navigate("/all-products");
            setActivePath("/all-products");
          }}
          className={activePath === "/all-products" ? "active" : ""}
        >
          <ListItemButton>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="All Products" />
          </ListItemButton>
        </ListItem>
        <ListItem
          onClick={() => {
            navigate("/all-keys");
            setActivePath("/all-keys");
          }}
          className={activePath === "/all-keys" ? "active" : ""}
        >
          <ListItemButton>
            <ListItemIcon></ListItemIcon>
            <ListItemText primary="All keys" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }} className="background">
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            onClick={() => {
              navigate("/");
              setActivePath("");
            }}
            sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
          >
            <img src={require("../assets/logo.png")} alt="logo" height={50} />
          </Box>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={() => handleLogout()}
            sx={{ mr: 4 }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={containerDrawer}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminArea;
