import React from 'react';
import {Link} from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import CategoryIcon from '@material-ui/icons/Category';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import RateReviewIcon from '@material-ui/icons/RateReview';
import ContactsIcon from '@material-ui/icons/Contacts';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';

const path = window.location.pathname;

export const mainListItems = (
  <div>
    {
      path.includes('admin/')
      &&
      <>
        <Link to="/admin/landing">
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon style={{color: '#c4002a'}}/>
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        </Link>
        <Link to="/admin/categories">
        <ListItem button>
          <ListItemIcon>
            <CategoryIcon style={{color: '#c4002a'}}/>
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
        </Link>
        <Link to="/admin/service-owners">
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon style={{color: '#c4002a'}}/>
          </ListItemIcon>
          <ListItemText primary="Service Owners" />
        </ListItem>
        </Link>
        <Link to="/admin/product-owners">
        <ListItem button>
          <ListItemIcon>
            <SupervisedUserCircleIcon style={{color: '#c4002a'}}/>
          </ListItemIcon>
          <ListItemText primary="Product Owners" />
        </ListItem>
        </Link>
      </>
    }
    {
      path.includes('service-owner/')
      &&
      <>
        <Link to="/service-owner/landing">
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon style={{color: '#c4002a'}}/>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link to="/service-owner/orders">
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon style={{color: '#c4002a'}}/>
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
        </Link>
        <Link to="/service-owner/reviews">
        <ListItem button>
          <ListItemIcon>
            <RateReviewIcon style={{color: '#c4002a'}}/>
          </ListItemIcon>
          <ListItemText primary="Reviews" />
        </ListItem>
        </Link>
      </>
    }
    {
      path.includes('product-owner/')
      &&
      <>
        <Link to="/product-owner/landing">
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon style={{color: '#c4002a'}}/>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link to="/product-owner/products">
        <ListItem button>
          <ListItemIcon>
            <AddToQueueIcon style={{color: '#c4002a'}}/>
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
        </Link>
        <Link to="/product-owner/orders">
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon style={{color: '#c4002a'}}/>
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
        </Link>
        <Link to="/product-owner/connections">
        <ListItem button>
          <ListItemIcon>
            <ContactsIcon style={{color: '#c4002a'}}/>
          </ListItemIcon>
          <ListItemText primary="Service Owners" />
        </ListItem>
        </Link>
      </>
    }
  </div>
);

export const secondaryListItems = (
  <div>
    {
      path.includes('service-owner/')
      &&
      <>
        <ListSubheader style={{color: '#625F61'}} inset>Secondary options</ListSubheader>
        <Link to="/service-owner/connection">
        <ListItem button>
          <ListItemIcon>
            <ContactsIcon style={{color: '#c4002a'}}/>
          </ListItemIcon>
          <ListItemText primary="Connections" />
        </ListItem>
        </Link>
        <Link to="/service-owner/product-orders">
        <ListItem button>
          <ListItemIcon>
            <ShoppingBasketIcon style={{color: '#c4002a'}}/>
          </ListItemIcon>
          <ListItemText primary="Product Orders" />
        </ListItem>
        </Link>
      </>
    }
  </div>
);