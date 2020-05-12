import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ResImage from "../assets/restaurant.jpg";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function Profile() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    //TO make a profile page in future
    //window.location.href = "/profile";
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MenuItem onClick={handleClickOpen}>
        <Typography variant="h5">Profile</Typography>
      </MenuItem>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Typography variant="h4">Profile</Typography>
        </DialogTitle>

        <DialogContent dividers>
          <Avatar
            alt="Arcata"
            src={ResImage}
            style={{ width: 60, height: 60 }}
          />
          <Typography variant="h5">
            {" "}
            <br />{" "}
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="h5">
                <b>Email Address:</b> sample@email.com
                <br />
                <br />
                <b>Name of restaurant:</b> Arcata Pizzeria
              </Typography>
            </CardContent>
          </Card>

          <MenuItem>
            <Typography variant="h5">Settings</Typography>
          </MenuItem>

          <MenuItem>
            <Typography variant="h5">Forgot password</Typography>
          </MenuItem>

          <MenuItem>
            <Typography variant="h5">Help</Typography>
          </MenuItem>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            <Typography variant="h5">Save changes</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
