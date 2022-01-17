import { forwardRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function handleConfirm(setOpen, onConfirm) {
  return () => {
    if (onConfirm) {
      onConfirm();
    }

    setOpen(false);
  };
}

function handleCancel(setOpen, onCancel) {
  return () => {
    setOpen(false);
    if (onCancel) {
      onCancel();
    }
  };
}

export function ConfirmDialog({
  open,
  setOpen,
  onConfirm,
  onCancel,
  text,
  title,
}) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCancel(setOpen, onCancel)}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel(setOpen, onCancel)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm(setOpen, onConfirm)} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
