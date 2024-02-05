import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useSelector } from "react-redux";
import { userApi_delete } from "../../services/User_api_delete";
import { brands_delete } from "../../services/Brands_delete";
import { category_delete } from "../../services/Report_api_block";
import Category from "../reports/ReportsTable";
import { Childelete } from "../../services/ChildApiiAll";
import { SubChildDeleteapi } from "../../services/Sub_Child";
import { SalonActive } from "../../services/SalonActive";
import { GetLicense } from "../../services/GetLicense";

export default function AlertDialog(props) {

  const { updstate } = props;
  console.log("updstate==>",props)
  const [open, setOpen] = React.useState(true);
  const [dataUser, setdataUser] = useState([]);
  // const [view,setView]=useState(props.status.deactive.isDeactivated);
  const handleClose = () => {
    setOpen(false);
    props.close(false);
  };
  
       
//   const loGinHandle = () => {
//       category_delete(props.id)
//       .then(({ data }) => {
//         updstate("Delete Successfully");
//         props.delete(props.id); 
//       })
//       .catch((err) => { 

//       });
//   };

// const loGinHandle1 = () => {
//   console.log(props.id,"idddd kidr h")
//   brands_delete(props.id)
//   .then(({ data }) => {
//     updstate("Delete Successfully");
//     props.delete(props.id); 
//   })
//   .catch((err) => { 

//   });
// };

// const loGinHandle2 = () => {
//     Childelete(props.id)
//   .then(({ data }) => {
//     updstate("Delete Successfully");
//     props.delete(props.id); 
//   })
//   .catch((err) => { 

//   });
// };
// const loGinHandle3 = () => {
//   SubChildDeleteapi(props.id)
// .then(({ data }) => {
//   updstate("Delete Successfully");
//   props.delete(props.id); 
// })
// .catch((err) => { 

// });
// };
const Deactivation =()=>{
  SalonActive(props.status.id)
                  .then(({data:{data}})=>{
                    props.delete(props.status.id)
                    const {salon} = data
                    console.log(data)
                    let valuT=data.isDeactivated=true
                    let valuF=data.isDeactivated=false
                    if(data.isDeactivated){
                      props.setStatus({...props.status,deactive:valuT})
                    }else{
                      props.setStatus({...props.status,deactive:valuF})
                    }
                  })
                  
}
const Deactivation2=()=>{
  GetLicense(props)
  .then(({data})=>{
    console.log(data,"<==data")
  })
}

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {props.status.id ?
        <>
        <DialogTitle id="alert-dialog-title">{"Status !!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to go Deactivated ?
          </DialogContentText>
        </DialogContent>
        </>
        :props.status2.id ?
        <>
        <DialogTitle id="alert-dialog-title">{"Status !!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to go dea2 ?
          </DialogContentText>
        </DialogContent>
        </>
        :
        <>
        <DialogTitle id="alert-dialog-title">{"Delete !!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete ?
          </DialogContentText>
        </DialogContent>
        </>

        }
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            onClick={() => {
              // if(props.module == "brands"){
              //   handleClose();
              //   loGinHandle1();
              // }
              // else if(props.module == "child"){
              //   handleClose();
              //   loGinHandle2();
              // }
              // else if(props.module == "subchild"){
              //   handleClose();
              //   loGinHandle3();
              // }
              if(props.status.id){
                handleClose()
                  Deactivation()
              }else if(props.status2.id){
                handleClose()
                  Deactivation2()
              }


              else{
                handleClose();
              // loGinHandle();

              }
             
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
