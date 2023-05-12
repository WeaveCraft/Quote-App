import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const SubmitButton = styled(Button)({
  backgroundColor: '#FFA726',
  color: 'white',
  fontSize: '0.7em',
  ':hover': {
    backgroundColor: '#F59300',
    color: 'white',
  },
});

const CancelButton = styled(Button)({
  backgroundColor: '#E65100',
  color: 'white',
  fontSize: '0.7em',
  ':hover': {
    backgroundColor: '#CC4700',
    color: 'white',
  },
});

export function ConfirmDialog({
  onSubmit,
  onClose,
  title,
  message,
  check,
  open,
}: {
  open: boolean;
  onSubmit: (newString: string) => void;
  onClose: () => void;
  title: string;
  message: string;
  check: boolean;
}) {
  const [name, setName] = useState('');
  const DialogTextField = ({ check }: { check: boolean }) => {
    if (check) {
      return (
        <TextField
          autoFocus
          margin="dense"
          id="name"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => setName(e.target.value)}
          value={name}
          inputProps={{
            style: {
              fontSize: '2em',
            },
          }}
        />
      );
    } else return null;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle sx={{ fontSize: 20 }}>{title}</DialogTitle>
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <DialogContentText component={'span'} sx={{ fontSize: 15 }}>
          {message}
          <DialogTextField check={check} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <SubmitButton
          variant="contained"
          onClick={() => {
            if (onSubmit) {
              onSubmit(name);
              setName('');
            }
            onClose();
          }}
        >
          {title}
        </SubmitButton>
        <CancelButton variant="contained" onClick={onClose}>
          Cancel
        </CancelButton>
      </DialogActions>
    </Dialog>
  );
}
