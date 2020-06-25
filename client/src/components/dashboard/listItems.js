import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon style={{color: '#c4002a'}}/>
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon style={{color: '#c4002a'}}/>
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon style={{color: '#c4002a'}}/>
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon style={{color: '#c4002a'}}/>
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon style={{color: '#c4002a'}}/>
      </ListItemIcon>
      <ListItemText primary="Reviews" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon style={{color: '#c4002a'}}/>
      </ListItemIcon>
      <ListItemText primary="Products" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon style={{color: '#c4002a'}}/>
      </ListItemIcon>
      <ListItemText primary="Categories" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon style={{color: '#c4002a'}}/>
      </ListItemIcon>
      <ListItemText primary="Service Owners" />
    </ListItem>
  </div>
);