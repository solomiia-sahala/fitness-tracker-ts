import Typography from '@mui/material/Typography/Typography';

const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="tabName.secondary" align="center" {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;