import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { NavLink } from 'react-router-dom';
import './menu.css';

// Import SVG icons
import { ReactComponent as DashboardIcon } from '../assests/Dashboard.svg';
import { ReactComponent as EventIcon } from '../assests/Event.svg';
import { ReactComponent as CarIcon } from '../assests/CarReq.svg';
import { ReactComponent as PollIcon } from '../assests/Poll.svg';
import { ReactComponent as BlogIcon } from '../assests/Blog.svg';
import { ReactComponent as LockIcon } from '../assests/ChangePassword.svg';
import { ReactComponent as ExitToAppIcon } from '../assests/Logout.svg';
import { ReactComponent as MembershipIcon } from '../assests/membership.svg';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [membershipOpen, setMembershipOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleMembership = () => {
    setMembershipOpen(!membershipOpen);
  };

  return (
    <Drawer
      variant="permanent"
      className={open ? 'drawerOpen' : 'drawerClose'}
      classes={{ paper: open ? 'drawerPaperOpen' : 'drawerPaperClose' }}
    >
      <div className="toggleButton" onClick={toggleDrawer}>
        {open ? '<' : '>'}
      </div>
      <List style={{backgroundColor:"#090B0F"}} 
      >
       <ListItem button component={NavLink} to="/dashboard" className="listItem" activeClassName="active">
  <ListItemIcon className="listItemIcon">
    <DashboardIcon />
  </ListItemIcon>
  <ListItemText
    primary="Dashboard"
    className={open ? 'listItemText listItemTextOpen' : 'listItemText listItemTextClose'}
  />
</ListItem>
        <Divider />
        <ListItem button onClick={toggleMembership} className="listItem">
          <ListItemIcon className="listItemIcon">
            <MembershipIcon style={{opacity:"56%"}} />
          </ListItemIcon>
          <ListItemText
            primary="Membership"
            className={open ? 'listItemText listItemTextOpen' : 'listItemText listItemTextClose'}
          />
        </ListItem>

        {membershipOpen && (
          <List>
            <ListItem button className="listItem">
              <ListItemText primary="Original Gearheads" className={open ? 'listItemTextOpen' : 'listItemTextClose'} />
            </ListItem>
            <ListItem button className="listItem">
              <ListItemText primary="Ignition Insiders" className={open ? 'listItemTextOpen' : 'listItemTextClose'} />
            </ListItem>
            <ListItem button className="listItem">
              <ListItemText primary="Paid Membership" className={open ? 'listItemTextOpen' : 'listItemTextClose'} />
            </ListItem>
          </List>
        )}
        <Divider />
        <ListItem button component={NavLink} to="/event" className="listItem" activeClassName="active">
          <ListItemIcon className="listItemIcon">
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Event" className={open ? 'listItemText listItemTextOpen' : 'listItemText listItemTextClose'} />
        </ListItem>
        <Divider />
        <ListItem button component={NavLink} to="/car-request" className="listItem" activeClassName="active">
          <ListItemIcon className="listItemIcon">
            <CarIcon />
          </ListItemIcon>
          <ListItemText primary="Car Request" className={open ? 'listItemText listItemTextOpen' : 'listItemText listItemTextClose'} />
        </ListItem>
        <Divider />
        <ListItem button component={NavLink} to="/poll-questions" className="listItem" activeClassName="active">
          <ListItemIcon className="listItemIcon">
            <PollIcon />
          </ListItemIcon>
          <ListItemText primary="Poll Questions" className={open ? 'listItemText listItemTextOpen' : 'listItemText listItemTextClose'} />
        </ListItem>
        <Divider />
        <ListItem button component={NavLink} to="/blog" className="listItem" activeClassName="active">
          <ListItemIcon className="listItemIcon">
            <BlogIcon />
          </ListItemIcon>
          <ListItemText primary="Blog" className={open ? 'listItemText listItemTextOpen' : 'listItemText listItemTextClose'} />
        </ListItem>
        <Divider />
        <ListItem button component={NavLink} to="/change-password" className="listItem" activeClassName="active">
          <ListItemIcon className="listItemIcon">
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary="Change Password" className={open ? 'listItemText listItemTextOpen' : 'listItemText listItemTextClose'} />
        </ListItem>
        <Divider />
        <ListItem button component={NavLink} to="/logout" className="listItem" activeClassName="active">
          <ListItemIcon className="listItemIcon">
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" className={open ? 'listItemText listItemTextOpen' : 'listItemText listItemTextClose'} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
