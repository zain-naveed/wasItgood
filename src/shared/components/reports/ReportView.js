import {React,useState,useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from '@material-ui/core/Typography';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';



const styles = (theme) => ({
root: {
margin: 0,
padding: theme.spacing(2),
},
closeButton: {
position: 'absolute',
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
    <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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

 function ReportView(props) {
     const data = props.resp;
    const [dataUser, setdataUser] = useState([]);
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
        props.close(false);
      };
      const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
  
return (
<div>  
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
    <IconButton aria-label="close"  onClick={handleClose}>
        <CancelIcon />
    </IconButton>
    <div className='lelel'>
        <h2>Report Detail</h2>
        <div className='reportmainview'>
          <div className='reportimg'><img src={data.images? data.images : ""} className='rpimg'></img></div>
          <div className='reportcontent'>
        <div className='reportview'><h6>Title</h6><p>{data.title}</p></div>
        <hr/>
        <div className='reportview'><h6>Description</h6><p>{data.description}</p></div>
        <hr/>
        <div className='reportview'><h6>Location Title</h6><p>{data.locationTitle}</p></div>
        <hr/>
        <div className='reportview'><h6>Wave Size</h6><p>{data.waveSize}</p></div>
        <hr/>
        <div className='reportview'><h6>Wave Form</h6><p>{data.waveForm}</p></div>
        </div>
        </div>
        

        {/* <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        
          <Grid item xs={2} sm={4} md={4}>
              <label>Title</label>
            <Item>{data.title}</Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
              <label>Location Title</label>
            <Item>{data.locationTitle}</Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
              <label>Wave Size</label>
            <Item>{data.waveSize}</Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
              <label>Wave Form</label>
            <Item>{data.waveForm}</Item>
          </Grid>
       
      </Grid>
    </Box> */}
           
    </div>
    </Dialog>
</div>
);
}
export default ReportView;