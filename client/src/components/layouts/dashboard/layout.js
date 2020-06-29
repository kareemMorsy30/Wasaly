import React, {useEffect, useState, useContext} from 'react';
import { NotificationsProvider } from '../notificationsContext';
import NotificationsContext from '../notificationsContext';
import { getNotifications, readNotification } from '../../../endpoints/notifications';
import { logout } from '../../../endpoints/logout';
import { subscribe } from '../../../services/authServices';
import { useHistory } from "react-router-dom";
import clsx from 'clsx';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Card from '../../layouts/dashboard/card';
import { notification } from 'antd';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Wasaly
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Layout = ({children}) => {
  return (
    <NotificationsProvider>
      <Dashboard children={children}/>
    </NotificationsProvider>
  )
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#c0392b',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#151515',
    color: '#f1f1f1'
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

function Dashboard({children}) {
  const [notificationsNo, setNotificationsNo] = useState(0);
    
  const {
    notifications, setNotifications
  } = useContext(NotificationsContext);

  let counter = notificationsNo;

  const classes = useStyles();
  useEffect(() => {
    getNotifications().then(notifications => {
      setNotifications(notifications);
      const data = notifications;
      data && data.map(item => {
          if(!item.read) {
              counter++;
          }
      })
      setNotificationsNo(counter);
    });
  }, []);

  useEffect(() => {
    subscribe({
        notifications, setNotifications
    }, {
        counter, setNotificationsNo
    });
  }, [notifications])

  console.log(notifications)
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [popoverOpen, setPopoverOpen] = useState(false);
  const history = useHistory();
  const handleProfile = ()=>{
    // let history = useHistory();
    let path = window.location.pathname;
    if (path.includes('users/')) history.push("/customerprofile");
    else if (path.includes('service-owner/')) history.push("/serviceownerprofile");
    else if (path.includes('product-owner/')) history.push("/productownerprofile");
  }
  const toggle = () => setPopoverOpen(!popoverOpen);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleLogout = () => logout();
  const checkNotifications = () => {
    const path = window.location.pathname;

    readNotification().then(data => {
      setNotificationsNo(0);
      setTimeout(() => {
        setNotifications(data)
      }, 4000);
    });

    if (path.includes('admin/')) history.push("/admin/notifications");
    else if (path.includes('service-owner/')) history.push("/service-owner/notifications");
    else if (path.includes('product-owner/')) history.push("/product-owner/notifications");
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <h3>Dashboard</h3>
          </Typography>
          <IconButton color="inherit" onClick={checkNotifications}>
            <Badge badgeContent={notificationsNo} color="primary">
              <NotificationsIcon/>
            </Badge>
          </IconButton>
          <IconButton color="inherit" onClick={handleProfile}>
              <AccountCircleIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleLogout}>
              <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose} style={{color: '#c4002a'}}>
            <ChevronLeftIcon />  Wasaly
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={12}>
                {
                children 
                ?
                children
                :
                <Card>Landing Page</Card>
                }
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

export default Layout;