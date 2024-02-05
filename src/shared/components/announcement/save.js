import { React, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import "./announcement.css";
import { TextareaAutosize, CircularProgress } from "@material-ui/core";
import { MakeAnnouncement } from "../../services/Announcement";
import { notify } from "../../utils/notify";
import { resetUser } from "../../../shared/redux/reducers/userSlie";
import SendIcon from "@mui/icons-material/Send";
import * as yup from "yup";
import { Formik } from "formik";

const FormValidation = yup.object().shape({
  announcement: yup.string().required("Please type a Message."),
});

const initialValues = {
  announcement: "",
};

function AnnouncementPopUp(props) {
  const [msg, setMsg] = useState("");
  const [ok, setOK] = useState(true);
  const [loader, setLoader] = useState(false);
  const { setOpen, open, setlogout, logoutpop } = props;

  const netcheck = () => {
    if (!window.navigator.onLine) {
      console.log(!window.navigator.onLine, "no nett");
      notify("Network not found");
      setOK(false);
    }
  };

  const handleClose = () => {
    if (open) {
      setOpen(false);
    } else {
      setlogout(false);
    }
  };

  const handlePress = (msg) => {
    netcheck();
    if (ok) {
      setLoader(true);
      MakeAnnouncement(msg)
        .then((res) => {
          notify("Announced Successfully", "success");
          setLoader(false);
          setOpen(false);
          setMsg("");
        })
        .catch((err) => {
          setLoader(false);
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        className="ffeedback"
        open={open ? open : logoutpop}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          className="ann-cancel"
        >
          <CancelIcon />
        </IconButton>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, action) => {
            handlePress(values.announcement);
          }}
          validationSchema={FormValidation}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <div className="mainContent">
              <h3>Make an Announcement</h3>
              <TextareaAutosize
                placeholder="Announcement"
                className="announce-textInput"
                value={values.announcement}
                onChange={handleChange("announcement")}
                maxRows={7}
                minRows={4}
              ></TextareaAutosize>
              <div className="announcement-popup-error">
                {touched.announcement && errors.announcement
                  ? errors.announcement
                  : ""}
              </div>

              {loader ? (
                <button className="announce-btn-spin">
                  <div
                    className="spinner-border boot-loader"
                    role="status"
                  ></div>
                  {/* <CircularProgress color="white" size={20} /> */}
                </button>
              ) : (
                <button className="announce-btn" onClick={handleSubmit}>
                  Announce <SendIcon />
                </button>
              )}
            </div>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}

export default AnnouncementPopUp;
