import React, { useState, useEffect } from "react";
import { actionOnLicense } from "../../services/GetLicense";
import PopUp from "../popup/index";

export default function AlertDialog(props) {
  const { updstate, id } = props;
  const [open, setOpen] = React.useState(true);
  const [dataUser, setdataUser] = useState([]);
  const [spin, setSpin] = React.useState(false);
  console.log("props==>", props);

  const handleClose = () => {
    setOpen(false);
    props.close(false);
  };

  const yesHandle = () => {
    setSpin(true);

    actionOnLicense(props.id)
      .then(({ data }) => {
        
        if (data.data.isLicensed) {
          updstate("Successfully Licensed");
        } else {
          updstate("Successfully Non-Licensed");
        }
        props.blocked(props.id);
        handleClose();
        setSpin(false);
      })
      .catch((err) => {
        handleClose();
        setSpin(false);
      });
  };
  return (
    <PopUp
      mainText={
        props.status == true
          ? "Are you sure to non-license this Service Provider?"
          : "Are you sure to verify this Service Provider?"
      }
      handleYes={yesHandle}
      loader={spin}
      handleNo={handleClose}
      open={open}
    />
  );
}
