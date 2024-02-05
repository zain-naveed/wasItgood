import React from "react";
import { SalonDeactive } from "../../services/AllSaloons";
import PopUp from "../popup/index";

export default function BlockOwner(props) {
  const { updstate, id } = props;
  const [open, setOpen] = React.useState(true);
  const [spin, setSpin] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    props.close(false);
  };

  const yesHandle = () => {
    setSpin(true);

    SalonDeactive(id)
      .then(({ data }) => {
        debugger;
        if (data.data.salon.isDeactivated) {
          updstate("Successfully Deactivated");
        } else {
          updstate("Successfully Activated");
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
          ? "Are you sure to Activate this Salon?"
          : "Are you sure to Deactivate this salon?"
      }
      handleYes={yesHandle}
      loader={spin}
      handleNo={handleClose}
      open={open}
    />
  );
}
