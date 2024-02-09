import { Box, Container, CssBaseline } from '@mui/material';
import { Link } from 'react-router-dom';

const NotAuthorized = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <Box
        sx={ {
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        } }
      >
        User is not authorized. Please,<Link to="/">
        log in
      </Link>
      </Box>
    </Container>
  )
}

export default NotAuthorized;
