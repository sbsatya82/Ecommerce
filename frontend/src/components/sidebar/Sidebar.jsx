import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore, Store, Add, ViewList } from '@mui/icons-material';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import ReviewsIcon from '@mui/icons-material/RateReview';
import './Sidebar.css'

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [openProducts, setOpenProducts] = useState(false);
  const [openReviews, setOpenReviews] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleProductsClick = () => {
    setOpenProducts(!openProducts);
  };

  const handleReviewsClick = () => {
    setOpenReviews(!openReviews);
  };

  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{backgroundColor:'#ffffff', color:'black'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={()=>{setOpen(!open)}}
            edge="start"
          >
            <MenuIcon sx={{fontSize:'1.5rem'}} />
          </IconButton>
          <Typography>
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button component={Link} to="/admin/dashboard">
          <ListItemIcon sx={{ fontSize: 32 }}>
              <DashboardIcon />
            </ListItemIcon>
            <span className='text-md'>Dashboard</span>
          </ListItem>

          <ListItem button component={Link} to="/admin/orders/all">
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <span>Orders</span>
          </ListItem>

          <ListItem button onClick={handleProductsClick}>
            <ListItemIcon>
              <Store />
            </ListItemIcon>
            <span>Products</span>
            {openProducts ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openProducts} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={Link} to="/admin/products/all" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ViewList />
                </ListItemIcon>
                <span>All Products</span>
              </ListItem>
              <ListItem button component={Link} to="/admin/products/create" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <span>Add Product</span>
              </ListItem>
            </List>
          </Collapse>

          <ListItem button onClick={handleReviewsClick}>
            <ListItemIcon>
            <ReviewsIcon />
            </ListItemIcon>
            
            <span>Reviews</span>
            {openReviews ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openReviews} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={Link} to="/admin/reviews/all" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ViewList />
                </ListItemIcon>
                <span>All Reviews</span>
              </ListItem>
              <ListItem button component={Link} to="/admin/reviews/pending" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <span>Pending Reviews</span>
              </ListItem>
            </List>
          </Collapse>

          <ListItem button component={Link} to="/admin/users">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <span>Users</span>
          </ListItem>
        </List>
      </Drawer>
    </Box>
    
    </>
    
  );
}
