import React, { useState, useEffect } from "react";
import { DelServices } from "../../services/Allservices";
import PopUp from "../popup/index";
import { useSelector, useDispatch } from "react-redux";
import { setServices } from "../../redux/reducers/userSlie";

export default function AlertDialog(props) {
  const dispatch = useDispatch();
  const { updstate, id } = props;
  const [open, setOpen] = React.useState(true);
  const [spin, setSpin] = React.useState(false);
  console.log("props==>", props);
  const services = useSelector((state) => state.user.services);

  const handleClose = () => {
    setOpen(false);
    props.close(false);
  };

  const yesHandle = () => {
    setSpin(true);

    DelServices(props.id)
      .then(({ data }) => {
        updstate("Service Successfully Deleted");
        const result = services.filter((item) => item._id != props.id);
        dispatch(setServices(result));
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
      mainText={"Are you sure you want to delete this Service?"}
      handleYes={yesHandle}
      loader={spin}
      handleNo={handleClose}
      open={open}
    />
  );
}
