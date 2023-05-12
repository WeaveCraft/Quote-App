import { Snackbar, Alert } from '@mui/material';

export function PopUpErrorSnackbar({
  open,
  message,
  onClose,
}: {
  open: boolean;
  message: string;
  onClose: () => void;
}) {
  return (
    <>
      <Snackbar open={open} autoHideDuration={2000} onClose={onClose}>
        <Alert
          onClose={onClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%', fontSize: '1em' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
