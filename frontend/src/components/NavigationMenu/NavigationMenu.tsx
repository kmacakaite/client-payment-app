import { AppBar, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

export const NavigationMenu = () => {
  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Button
          color="inherit"
          component={Link}
          to="/"
          style={{
            flexGrow: 1,
            justifyContent: 'flex-start',
            fontSize: '24px',
          }}
        >
          Homepage
        </Button>
        <Button color="inherit" component={Link} to="/clients">
          Clients
        </Button>
        <Button color="inherit" component={Link} to="/payments">
          Payments
        </Button>
      </Toolbar>
    </AppBar>
  );
};
