import Snackbar from "@mui/material/Snackbar"

const SnackBar = ({ isOpen, message }: { isOpen: boolean, message: string }) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={isOpen}
      autoHideDuration={4000}
      message={message}
    />
  )
}

export default SnackBar;