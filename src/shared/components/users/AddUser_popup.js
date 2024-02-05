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
import { registrationApi } from "../../services/RegistrationApi";
import "./styles.css";

const FormValidation = yup.object().shape({
  email: yup.string().email().required("E-mail is Required"),
  password: yup
    .string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Password is Required"),
  name: yup.string().required("Name is Required"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password.")
    .oneOf([yup.ref("password")], "Your passwords do not match."),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoonees: "",
};

function AddUser(props) {
  const [open, setOpen] = React.useState(false);
  let ok = true;

  const netcheck = () => {
    if (!window.navigator.onLine) {
      console.log(!window.navigator.onLine, "no nett");
      notify("Network not found");
      ok = false;
    }
  };

  const { updstate } = props;
  const clossee = () => {
    updstate("New User Added");
  };

  const signUpHandle = (obj) => {
    let object = {
      name: obj.name,
      email: obj.email,
      password: obj.password,
      role: props.role === "Service Provider" ? "professional" : "owner",
    };
    if (props.role === "owner") {
      object["phoneNumber"] = obj.phoneNumber;
    }

    netcheck();
    if (ok) {
      console.log("obj", object);
      setOpen(true);
      registrationApi(object)
        .then(({ data }) => {
          if (data) {
            setOpen(false);
            if (data?.data?.isSaloon) {
              data.data.saloon["email"] = obj.email;
              props.data(data.data.saloon);
            } else {
              props.data(data.data);
            }
            if (props.role === "Service Provider") {
              notify(`Service Provider Added Successfully!`, "success");
            } else if (props.role === "professional") {
              notify(`Service Provider Added Successfully!`, "success");
            } else if (props.role === "owner") {
              notify(`Salon Owner Added Successfully!`, "success");
            }
            //

            clossee();
          }
        })
        .catch((e) => {
          notify(e.response.data.message, "error");
          console.log(e.response.data.message, "errorr");
          setOpen(false);
        })
        .finally(() => setOpen(false));
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, action) => {
        const { name, email, password, phoonees } = values;

        signUpHandle({
          name: name,
          email: email,
          password: password,
          role: props.role === "Service Provider" ? "professional" : "owner",
          phoneNumber: phoonees,
        });
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
                  <h3>Create {props?.role}</h3>
                </div>
                <div className="card-body">
                  <div className="flexxx">
                    <div style={{ width: "50%" }}>
                      <div
                        className="input-group form-group"
                        style={{ width: "98%" }}
                      >
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-user"></i>
                          </span>
                        </div>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Name"
                          value={values.name}
                          onChange={handleChange("name")}
                          required
                        />
                      </div>
                      <div className="add-user-popup-error">
                        {touched.name && errors.name ? errors.name : ""}
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div
                        className="input-group form-group"
                        style={{ width: "98%", marginLeft: "2%" }}
                      >
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-user"></i>
                          </span>
                        </div>
                        <input
                          className="form-control"
                          type="email"
                          placeholder="User@gmail.com"
                          value={values.email}
                          onChange={handleChange("email")}
                          required
                        />
                      </div>
                      <div className="add-user-popup-error">
                        {touched.email && errors.email ? errors.email : ""}
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div
                        className="input-group form-group"
                        style={{ width: "98%" }}
                      >
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-key"></i>
                          </span>
                        </div>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          value={values.password}
                          onChange={handleChange("password")}
                          required
                        />
                      </div>
                      <div className="add-user-popup-error">
                        {touched.password && errors.password
                          ? errors.password
                          : ""}
                      </div>
                    </div>
                    <div style={{ width: "50%" }}>
                      <div
                        className="input-group form-group"
                        style={{ width: "98%", marginLeft: "2%" }}
                      >
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-key"></i>
                          </span>
                        </div>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Confirm Password"
                          value={values.confirmPassword}
                          onChange={handleChange("confirmPassword")}
                          required
                        />
                      </div>
                      <div className="add-user-popup-error">
                        {touched.confirmPassword && errors.confirmPassword
                          ? errors.confirmPassword
                          : ""}
                      </div>
                    </div>
                    {props.role === "owner" && (
                      <div style={{ width: "50%" }}>
                        <div
                          className="input-group form-group"
                          style={{ width: "98%" }}
                        >
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fas fa-key"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Phone Number"
                            value={values.phoonees}
                            onChange={handleChange("phoonees")}
                            required
                          />
                        </div>
                        {/* <div className="add-user-popup-error">
                        {touched.confirmPassword && errors.confirmPassword
                          ? errors.confirmPassword
                          : ""}
                      </div> */}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      className={
                        open
                          ? "btn float-right login_btn deactive"
                          : "btn float-right login_btn"
                      }
                      onClick={handleSubmit}
                    >
                      {open ? (
                        // <CircularProgress className="circulerr" />
                        <div
                          className="spinner-border boot-loader"
                          role="status"
                        ></div>
                      ) : (
                        `New ${props.role}`
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default AddUser;
