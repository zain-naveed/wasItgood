import React from "react";
import { Field, Form, Formik, withFormik } from "formik";
import * as yup from "yup";
import { notify } from "../../shared/utils/notify";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../../shared/redux/reducers/userSlie";
import "../../assets/css/Auth.css";
import CircularProgress from "@mui/material/CircularProgress";
import { configureStore } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { LoginApi } from "../../shared/services/Login_api";
import logo from "../../assets/images/logo.svg";
import Spinner from "react-bootstrap/Spinner";
import { setEarnings } from "../../shared/redux/reducers/userSlie";
import { GetTotalEarnings } from "../../shared/services/Payments";

const LoginValidation = yup.object().shape({
  email: yup.string().email().required("Required"),
  password: yup
    .string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
const initialValues = { email: "", password: "" };
function Login() {
  const netcheck = (email, pass) => {
    if (!window.navigator.onLine) {
      setOpen(false);
      notify("Network not found");
    } else {
      loGinHandle();
      handleToggle(email, pass);
    }
  };
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleToggle = (email, pass) => {
    if (email != "" && pass != "" && email.errors != "" && pass.errors != "") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  const loGinHandle = async (obj) => {
    LoginApi(obj)
      .then(({ data }) => {
        console.log(data, "login api ressss");
        if (data) {
          console.log(data.status, "erhgjhjhrrr");
          if (data.status == "404") {
            notify("Not Valid Email & Password !!");
            setOpen(false);
          } else {
            console.log("agya yahn");
            dispatch(setUser(data));
            // notify(`Thank you !`, "success");
          }
        }
      })
      .catch((e) => {
        // setOpen(false);
        if (
          e.response.data.message ===
          '"email" is required, "password" is required'
        ) {
        } else {
          notify(e.response.data.message);
          setOpen(false);
        }
        console.log(e.response.data.message, "errr.response");
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, action) => {
        const { email, password } = values;

        loGinHandle({
          email: email,
          password: password,
        });
      }}
      validationSchema={LoginValidation}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        isSubmitting,
        setFieldValue,
      }) => (
        <div className="login_bac">
          <div className="container setcontain">
            <div className="d-flex justify-content-center h-100">
              <div className="card">
                <div className="login_logo">
                  <img src={logo}></img>
                </div>
                <div className="card-header">
                  <h3>Sign In</h3>
                  <div className="d-flex justify-content-end social_icon"></div>
                </div>
                <div className="card-body">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      netcheck(values.email, values.password);
                      handleSubmit();
                    }}
                  >
                    <div className="input-group form-group login">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-user"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        type="email"
                        placeholder="Email"
                        value={values.email}
                        onChange={handleChange("email")}
                      />
                    </div>
                    <p>{touched.email && errors.email ? errors.email : ""}</p>
                    <div className="input-group form-group login">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-key"></i>
                        </span>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        value={values.password}
                        onChange={handleChange("password")}
                      />
                    </div>

                    <p>
                      {touched.password && errors.password
                        ? errors.password
                        : ""}
                      {touched.password && errors.password
                        ? setOpen(false)
                        : ""}
                    </p>

                    {/* <div className="row align-items-center remember">
                      <input type="checkbox" />
                      Remember Me
                    </div> */}
                    <div className="form-group">
                      <button
                        type="submit"
                        className={
                          open
                            ? "btn float-right login_btn deactive"
                            : "btn float-right login_btn"
                        }
                      >
                        {open ? (
                          <div
                            className="spinner-border boot-loader"
                            role="status"
                          ></div>
                        ) : (
                          // <CircularProgress className="circulerr" />
                          "Login"
                        )}
                      </button>
                    </div>
                  </Form>
                  {/* <p className="newacc">Create new account ? <Link to="/signup">click me</Link></p> */}
                </div>
                <div className="card-footer">
                  <div className="d-flex justify-content-center"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Login;
