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
import { ReportapiData } from "../../services/ReportApi";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { newBrandsAdd } from "../../services/AddNewBrand";
import { newChild } from "../../services/ChildAddApi";
import { BrandsApiAll } from "../../services/BrandsApiAll";
import { SubChildAddnewapi } from "../../services/Sub_Child";
import { ChildApiiAll } from "../../services/ChildApiiAll";

function AddBrands(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState();
  const [profillle, setprofillle] = useState("");
  const [catID, setcATid] = useState("");
  const [category_listing, setcategory_listing] = useState([]);
  const [Category_list, setCategory_list] = useState("");
  const [Placeholder, setPlaceholder] = useState("");
  const [previos, setprevios] = useState("");

  const { updstate } = props;
  const clossee = () => {
    props.closii("New Brand Added");
  };
  console.log("modulee", props.module);
  useEffect(() => {
    setprevios(props.previos);
    setPlaceholder(props.module);

    if (props.module === "Child-Category") {
      BrandsApiAll()
        .then(({ data }) => {
          if (data) {
            setcategory_listing(data.category);
          }
        })
        .catch((err) => {});
    } else if (props.module === "Sub-Child-Category") {
      ChildApiiAll()
        .then(({ data }) => {
          if (data) {
            setcategory_listing(data.category);
          }
        })
        .catch((err) => {});
    } else {
      ReportapiData()
        .then(({ data }) => {
          if (data) {
            setcategory_listing(data.category);
          }
        })
        .catch((err) => {});
    }
  }, []);

  const findId = (value) => {
    let id = "";
    let clone = [...category_listing];
    clone.forEach((element) => {
      let findIndexId = clone.findIndex((ii) => ii.name == value);
      console.log(findIndexId, "index agai he");
      id = clone[findIndexId].id;
      console.log(id, "ID agai he");
      setcATid(id);
    });
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
    if (props.module === "Child-Category") {
      if (name === "" || catID == "") {
        notify("Required feild !");
        await setOpen(false);
      } else {
        let obj = {
          name: name,
          parentCategory: catID,
        };
        newChild(obj)
          .then(({ data }) => {
            console.log("data submit", data);
            updstate("New Brand Added");
            props.update(obj, image);
            setOpen(false);
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
      setOpen(false);
    } else if (props.module === "Sub-Child-Category") {
      if (name === "" || catID == "") {
        notify("Required feild !");
        await setOpen(false);
      } else {
        let obj = {
          name: name,
          parentCategory: catID,
        };
        SubChildAddnewapi(obj)
          .then(({ data }) => {
            console.log("data submit", data);
            updstate("New Brand Added");
            props.update(obj, image);
            setOpen(false);
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
      setOpen(false);
    } else {
      if (name === "" || catID == "") {
        notify("Required feild !");
        await setOpen(false);
      } else {
        let obj = {
          name: name,
          parentCategory: catID,
        };
        newBrandsAdd(obj)
          .then(({ data }) => {
            console.log("data submit", data);
            updstate("New Brand Added");
            props.update(obj, image);
            setOpen(false);
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
      setOpen(false);
    }
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
              <h3>{Placeholder}</h3>
            </div>
            <div className="card-body">
              <div className="flexxx">
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
                <div className="input-group form-group">
                  <TextField
                    id="outlined-select-currency"
                    className="flo chnne"
                    select
                    label={previos}
                    value={Category_list}
                    onChange={(e) => {
                      setCategory_list(e.target.value);
                      findId(e.target.value);
                    }}
                    required
                  >
                    {category_listing
                      .filter((valuee) => valuee.isDelete != true)
                      .map((option) => (
                        <MenuItem key={option.id} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                  </TextField>
                </div>
              </div>
              {/* <div className="imgflex">
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
              </div> */}

              <div className="form-group">
                <button
                  onClick={() => {
                    handleSubmit();
                    setOpen(true);
                  }}
                  className={
                    open
                      ? "btn float-right login_btn deactive cat"
                      : "btn float-right login_btn cat"
                  }
                >
                  {open ? (
                    <div
                      className="spinner-border boot-loader"
                      role="status"
                    ></div>
                  ) : (
                    // <CircularProgress className="circulerr" />
                    `New ${props.module}`
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

export default AddBrands;
