import React, { useState, useEffect } from "react";
import axios from "axios";
import { Field, Form, Formik, withFormik } from "formik";
import * as yup from "yup";
import { notify } from "../../../shared/utils/notify";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../../assets/css/Auth.css";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import CircularProgress from "@mui/material/CircularProgress";
import { newCategory } from "../../services/newCategory";
import PhoneInput from "react-phone-input-2";
import Avatar from "../../../assets/images/avatar.png";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";

function Addcategory(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState();
  const [profillle, setprofillle] = useState("");

  const { updstate } = props;
  const clossee = () => {
    props.closii("New Category Added");
  };
  const uploadFiles = (e) => {
    console.log("click");
    let file = e.target.files[0];
    console.log("file", file.type.includes("image/png"));
    if (file.type.includes("image/png")) {
      if (file) {
        let url = URL.createObjectURL(file);
        setImage(url);
        setprofillle(file);
      }
    } else {
      notify("Please select just image type .png", "error");
    }
  };
  const handleSubmit = async () => {
    if (name === "" || profillle === "") {
      notify("Required feild !");
      await setOpen(false);
    } else {
      let obj = {
        name: name,
        categoryPic: profillle,
      };
      newCategory(obj)
        .then(({ data }) => {
          console.log("data submit", data);
          updstate("New Category Added");
          props.update(obj, image);
          setOpen(false);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
    setOpen(false);
  };
  return (
    <div className="login_bac">
      <div className="btnn adduser">
        <IconButton
          aria-label="close"
          onClick={() => {
            clossee();
          }}
        >
          <CancelIcon />
        </IconButton>
      </div>
      <div className="container setcontain adduuser">
        <div className="d-flex justify-content-center h-100">
          <div className="card signup">
            <div className="card-header">
              <h3>CATEGORY</h3>
            </div>
            <div className="card-body">
              <div className="input-group form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="imgflex">
                <label htmlFor="upload_image">
                  {image ? (
                    <img src={image ? image : <Avatar />} />
                  ) : (
                    <div className="divv">
                      <span className="newone">
                        {" "}
                        <AddToPhotosIcon className="adnewimg" />
                      </span>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id="upload_image"
                  name="upload_image"
                  style={{ display: "none" }}
                  accept="image/png"
                  onChange={(e) => {
                    uploadFiles(e);
                  }}
                  required
                />
              </div>

              <div className="form-group">
                <button
                  onClick={() => {
                    handleSubmit();
                    setOpen(true);
                  }}
                  className={
                    open
                      ? "btn float-right login_btn cat deactive"
                      : "btn float-right login_btn cat"
                  }
                >
                  {open ? (
                    // <CircularProgress className="circulerr" />
                    <div
                      className="spinner-border boot-loader"
                      role="status"
                    ></div>
                  ) : (
                    "New Cateory"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addcategory;
