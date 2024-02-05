import React, { useState, useEffect } from "react";
import axios from "axios";
import { Field, Form, Formik, withFormik } from "formik";
import * as yup from "yup";
import { notify } from "../../shared/utils/notify";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../assets/css/Auth.css";
const LoginValidation = yup.object().shape({
  email: yup.string().email().required("Required"),
  password: yup
    .string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
const initialValues = {
  firstname: "",
  lastName: "",
  email: "",
  password: "",
};

function Signup() {
  const dispatch = useDispatch();

  const signUpHandle = async (obj) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(obj);
    const response = await axios.post(
      "https://api.orphanboards.com/api/v1/auth/signup-admin",
      body,
      config
    );
    console.log("reepsonse", response.data);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, action) => {
        const { firstName, lastName, email, password } = values;

        signUpHandle({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          role: "admin",
        });

        notify(`Thank you !`, "success");
      }}
      validationSchema={LoginValidation}
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
          <div className="container setcontain">
            <div className="d-flex justify-content-center h-100">
              <div className="card signup">
                <div className="card-header">
                  <h3>Sign Up</h3>
                  {/* <div className="d-flex justify-content-end social_icon">
                    <span>
                      <i className="fab fa-facebook-square"></i>
                    </span>
                    <span>
                      <i className="fab fa-google-plus-square"></i>
                    </span>
                    <span>
                      <i className="fab fa-twitter-square"></i>
                    </span>
                  </div> */}
                </div>
                <div className="card-body">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    <div className="input-group form-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-user"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="FirstName"
                        value={values.firstName}
                        onChange={handleChange("firstName")}
                      />
                    </div>
                    <div className="input-group form-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-user"></i>
                        </span>
                      </div>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="LastName"
                        value={values.lastName}
                        onChange={handleChange("lastName")}
                      />
                    </div>
                    <div className="input-group form-group">
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
                    <div className="input-group form-group">
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
                    </p>

                    {/* <div className="row align-items-center remember">
                      <input type="checkbox" />
                      Remember Me
                    </div> */}
                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn float-right login_btn"
                        onClick={signUpHandle}
                      >
                        Sign Up
                      </button>
                    </div>
                  </Form>
                  <div className="Loggin_link">
                    <Link to="/">Login</Link>
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

export default Signup;
