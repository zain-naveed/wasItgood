import { React, useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Typography from "@material-ui/core/Typography";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "../../../assets/images/dummy.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
          <CancelIcon />
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

function ProductView(props) {
  const data = props.resp;
  console.log("Productt aray",data)
  const [dataUser, setdataUser] = useState([]);
  const [open, setOpen] = useState(true);
  const [respchange, setrespchange] = useState(false);
  const [proimage, setProimage] = useState(data.images[0]);
  const handleClose = () => {
    setOpen(false);
    props.close(false);
  };
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const main_profile = (index, image) => {
    setProimage(image);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <IconButton aria-label="close" onClick={handleClose}>
          <CancelIcon />
        </IconButton>
        <div className="lelel">
          <h2>Product Detail</h2>
          <div className="flexxview">
            <div className="profile">
              <LazyLoadImage
                height={proimage.height}
                src={proimage ? proimage : ""}
                width={proimage.width}
                alt={proimage.alt}
                effect="blur"
              />
              <div className="flex_images">
                {data.images.map((pc, i) => {
                  return (
                    <>
                      {/* <img src={pc ? pc : Avatar} onClick={()=>{main_profile(i,pc)}} /> */}
                      <LazyLoadImage
                        height={pc.height}
                        src={pc ? pc : ""}
                        width={pc.width}
                        alt={pc.alt}
                        // effect="blur"
                        onClick={() => {
                          main_profile(i, pc);
                        }}
                      />
                    </>
                  );
                })}
              </div>
            </div>
            <div className="detaill">
              <div className="reportview">
                <h6>Title</h6>
                <p>{data.title}</p>
              </div>
              <hr />
              <div className="reportview">
                <h6>Price</h6>
                <p>{data.price}</p>
              </div>
              <hr />
              <div className="reportview">
                <h6>Description</h6>
                <p>{data.description}</p>
              </div>
              <hr />
              <div className="reportview">
                <h6>Address</h6>
                <p>{data.address}</p>
              </div>
              <hr />
              <div className="reportview">
                <h6>Inventory</h6>
                <p>{data.isActive ? "Instock" : "Out of stock"}</p>
              </div>
              <hr />
              <div className="reportview">
                <h6>Status</h6>
                <p>{data.isDeleted ? "Offline" : "Live"}</p>
              </div>
              <hr />
              <div className="reportview">
                <h6>Category</h6>
                <p>{data.categoryId?.name }</p>
              </div>
              <hr />
              <div className="reportview">
                <h6>Sub-Category</h6>
                <p>{data.subCategoryId?.name }</p>
              </div>
              <hr />
              <div className="reportview">
                <h6>Child-Category</h6>
                <p>{data.childCategoryId?.name }</p>
              </div>
              <hr />
              <div className="reportview">
                <h6>Sub-Child-Category</h6>
                <p>{data.subChildCategoryId?.name }</p>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
export default ProductView;
