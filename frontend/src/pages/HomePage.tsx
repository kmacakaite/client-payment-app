import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      spacing={3}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '80vh' }}
    >
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          style={{ fontSize: '24px' }}
          onClick={() => navigate('/clients')}
        >
          Go to Clients
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          style={{ fontSize: '24px' }}
          onClick={() => navigate('/payments')}
        >
          Go to Payments
        </Button>
      </Grid>
    </Grid>
  );
};
