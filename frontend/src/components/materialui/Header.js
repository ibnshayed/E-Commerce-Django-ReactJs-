import { Box, Button, Container } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { logout } from '../../actions/userActions';
import SearchBox from './SearchBox';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const Header = () => {
  
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const logoutHandler = () => {
    dispatch(logout());
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        component={RouterLink}
        to="/profile"
        onClick={handleMenuClose}
      >
        Profile
        </MenuItem>
      <MenuItem
        onClick={logoutHandler}
      >
        Log out
        </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={handleMobileMenuClose}
          component={RouterLink}
          to={'/cart'}
        >
        <IconButton
          aria-label={`show ${cartItems.length} new mails`}
          color="inherit"
          
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          >
          <Badge badgeContent={cartItems.length}
            color="secondary"
            >
              <AddShoppingCartIcon />
            </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      
      {userInfo ? (
        <MenuItem
        onClick={handleProfileMenuOpen}
        >
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <p>{ userInfo.name }</p>
        </MenuItem>
      ) : (
        <MenuItem>
          
          <Button
            color="inherit"
            component={RouterLink}
            to={'/login'}
            size="large"
            >
              Login
          </Button>
        </MenuItem>
            
      )}
    </Menu>
  );


  


  return (
    <div className={classes.grow}>
      <AppBar position="static">
      <Container maxWidth='lg'>
        <Toolbar>
          
          <Button
              color="inherit"
              component={RouterLink}
              to={'/'}
              size="large"
            >
              E-Commerce App
          </Button>
            
            <SearchBox/>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label={`show ${cartItems.length} new mails`}
              color="inherit"
              component={RouterLink}
              to={'/cart'}
            >
              <Badge badgeContent={cartItems.length}
                color="secondary"
              >
                  <AddShoppingCartIcon />
              </Badge>
            </IconButton>
            
            {userInfo ? (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Box component="span" mr={1}>
                  <Typography
                    variant='h6'
                    color="inherit"
                    >
                    {userInfo.name}
                  </Typography>
                </Box>
                <AccountCircle />
              </IconButton>
            ) : (
                <Button
                  color="inherit"
                  component={RouterLink}
                  to={'/login'}
                  size="large"
                >
                    Login
                </Button>
            )}
            
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            
          </div>
          </Toolbar>
          </Container>
      </AppBar>
      {renderMobileMenu}
        {renderMenu}
        
    </div>
  );
}

export default Header