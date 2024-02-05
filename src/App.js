import "./assets/css/App.css";
import React, { useEffect, useState } from "react";

import Login from "./pages/acounts/login";
import Notify from "./shared/utils/notify";
import Home from "./pages/dashboard/Home";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
// import Signup from "./pages/acounts/Signup";
import "react-toastify/dist/ReactToastify.css";
import UsersTable from "./shared/components/users/ServiceProviderTable.js";
import SalonOwnerTable from "./shared/components/saloonOwner/SalonOwnerTable";
import ProductsTable from "./shared/components/products/ProductsTable";
import Dash from "./shared/components/main dashbord/Dash";
import NewsLetter from "./shared/components/NewsLetters/NewsLetter";
import { GetServices } from "./shared/services/Allservices";
import { useDispatch } from "react-redux";
import {
  setServices,
  setEarnings,
} from "../src/shared/redux/reducers/userSlie";
import EditProvider from "./shared/components/users/EditProvider";
import Payment from "./shared/components/payments";
import { GetTotalEarnings } from "./shared/services/Payments";
import "./app.css";

function App() {
  const dispatch = useDispatch();

  let currencies = [];

  useEffect(() => {
    GetServices()
      .then(({ data }) => {
        currencies = data?.data;
        dispatch(setServices(currencies));
      })
      .catch((err) => {});
    GetTotalEarnings()
      .then(({ data }) => {
        dispatch(setEarnings(data?.data));
      })
      .catch((err) => {
        console.log(err, "eerrrrorr");
      });
  }, []);
  const count = useSelector((state) => state.user.user);
  return (
    <div className="App">
      {/* {console.log(count.token ,"checkkk redu")} */}
      <Routes>
        <Route
          path="/"
          element={
            count ? <Navigate replace to="/dashboard/index" /> : <Login />
          }
        />
        {count ? (
          <Route path="/dashboard" element={<Home />}>
            <Route path="index" element={<Dash />} />
            <Route
              path="serviceProvider"
              element={<UsersTable open={true} />}
            />
            <Route path="owner" element={<SalonOwnerTable open={true} />} />
            <Route
              path="postedJobs"
              element={<UsersTable open={true} pass={"jobs"} />}
            />
            <Route
              path="newsLetter"
              element={
                <NewsLetter open={true} subEmail={"subscribed-emails"} />
              }
            />
            <Route
              path="services"
              element={<NewsLetter open={true} services={"services"} />}
            />
            <Route
              path="feedBack"
              element={<NewsLetter open={true} feedBack={"feedBack"} />}
            />
            <Route
              path="license"
              element={<NewsLetter open={true} license={"license"} />}
            />
            <Route path="products" element={<ProductsTable open={true} />} />
            <Route path="payments" element={<Payment open={true} />} />
            <Route path="serviceUpdate" element={<EditProvider />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
      <Notify />
    </div>
  );
}

export default App;
