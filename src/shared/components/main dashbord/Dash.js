import "../../../assets/css/App.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Apexxcahrt from "react-apexcharts";
import { notify } from "../../utils/notify";
import { GetStats } from "../../services/stats.js";
import { CircularProgress } from "@material-ui/core";
import { GetTotalEarnings } from "../../services/Payments";
import { setEarnings } from "../../redux/reducers/userSlie";

function Dash() {
  const [ok, setOK] = useState(true);
  const dispatch = useDispatch();
  const netcheck = () => {
    if (!window.navigator.onLine) {
      console.log(!window.navigator.onLine, "no nett");
      notify("Network not found");
      setOK(false);
    }
  };

  const count = useSelector((state) => state.user.user);
  const earning = useSelector((state) => state.user.totalEarnings);
  const [data, setData] = useState();
  const [professionalData, setProfessionalData] = useState();
  const [loader, setLoader] = useState(false);
  const [earningsLoader, setEarningsLoader] = useState(false);

  useEffect(() => {
    netcheck();
    if (ok) {
      setLoader(true);
      setEarningsLoader(true);
      GetStats()
        .then((res) => {
          console.log(res);
          setData(res.data.data);

          setLoader(false);
        })
        .catch((err) => {
          setLoader(false);
          console.log(err);
        });
      GetTotalEarnings()
        .then(({ data }) => {
          dispatch(setEarnings(data?.data));
          setEarningsLoader(false);
        })
        .catch((err) => {
          setEarningsLoader(false);
          console.log(err, "eerrrrorr");
        });
    }
  }, []);
  const [dataApex, setdataAapex] = useState({
    series: [],

    options: {
      labels: ["Registered", "Blocked", "Deleted"],

      colors: ["#24a8d0", "#283487", "#1c78b2"],
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  const [dataApex1, setdataAapex1] = useState({
    series: [],

    options: {
      labels: ["Registered", "Blocked", "Deleted"],

      colors: ["#24a8d0", "#283487", "#1c78b2"],
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  const [dataApex2, setdataAapex2] = useState({
    series: [],

    options: {
      labels: ["Registered", "Blocked", "Deleted"],

      colors: ["#24a8d0", "#283487", "#1c78b2"],
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div className="main_bar">
      <div className="heading">
        <h3>DASHBOARD</h3>
        <p>Welcome back, &nbsp;{count?.user?.name}</p>
      </div>
      <hr></hr>
      <div className="card_div">
        <div className="main1">
          <div class="cardds one">
            <div className="title">
              <h4>Salon Owners</h4>
              <i class="far fa-user"></i>
            </div>
            <hr />
            <div className="content">
              <p>
                <label>Registered Owners : &nbsp; </label>
                {loader ? (
                  <div
                    className="spinner-border boot-loader2"
                    role="status"
                  ></div>
                ) : (
                  // <CircularProgress color="white" size={15} />
                  <span>{data?.ownerData?.registeredOwner}</span>
                )}
              </p>
              <p>
                <label>Deactivated Owners : &nbsp; </label>
                {loader ? (
                  <div
                    className="spinner-border boot-loader2"
                    role="status"
                  ></div>
                ) : (
                  // <CircularProgress color="white" size={15} />
                  <span>{data?.ownerData?.blockedOwner}</span>
                )}
              </p>
              <p>
                <label>Deleted Owners : &nbsp; </label>
                {loader ? (
                  <div
                    className="spinner-border boot-loader2"
                    role="status"
                  ></div>
                ) : (
                  // <CircularProgress color="white" size={15} />
                  <span>{data?.ownerData?.deletedOwner}</span>
                )}
              </p>
            </div>
          </div>
          <div id="chart">
            <Apexxcahrt
              options={dataApex?.options}
              series={[
                data?.ownerData?.registeredOwner,
                data?.ownerData?.blockedOwner,
                data?.ownerData?.deletedOwner,
              ]}
              type="donut"
              height={350}
            />
          </div>
        </div>
        <div className="main1">
          <div class="cardds one">
            <div className="title">
              <h4>Service Providers</h4>
              <i class="far fa-user"></i>
            </div>
            <hr />
            <div className="content">
              <p>
                <label>Registered Professionals : &nbsp; </label>
                {loader ? (
                  // <CircularProgress color="white" size=
                  <div
                    className="spinner-border boot-loader2"
                    role="status"
                  ></div>
                ) : (
                  <span>{data?.professionalData?.registeredProfessional}</span>
                )}
              </p>
              <p>
                <label>Deactivated Professionals : &nbsp; </label>
                {loader ? (
                  <div
                    className="spinner-border boot-loader2"
                    role="status"
                  ></div>
                ) : (
                  // <CircularProgress color="white" size={15} />
                  <span>{data?.professionalData?.blockedProfessional}</span>
                )}
              </p>
              <p>
                <label>Deleted Professionals : &nbsp; </label>
                {loader ? (
                  <div
                    className="spinner-border boot-loader2"
                    role="status"
                  ></div>
                ) : (
                  // <CircularProgress color="white" size={15} />
                  <span>{data?.professionalData?.deletedProfessional}</span>
                )}
              </p>
            </div>
          </div>
          <div id="chart">
            <Apexxcahrt
              options={dataApex1?.options}
              series={[
                data?.professionalData?.registeredProfessional,
                data?.professionalData?.blockedProfessional,
                data?.professionalData?.deletedProfessional,
              ]}
              type="donut"
              height={350}
            />
          </div>
        </div>
        <div className="main1">
          <div class="cardds one">
            <div className="title">
              <h4>Others</h4>
              <i class="far fa-user"></i>
            </div>
            <hr />
            <div className="content">
              <p>
                <label>Total Earnings : &nbsp; </label>
                {earningsLoader ? (
                  <div
                    className="spinner-border boot-loader2"
                    role="status"
                  ></div>
                ) : (
                  // <CircularProgress color="white" size={15} />
                  <span>${earning}</span>
                )}
              </p>
              <p>
                <label>Openend Jobs : &nbsp; </label>
                {loader ? (
                  <div
                    className="spinner-border boot-loader2"
                    role="status"
                  ></div>
                ) : (
                  // <CircularProgress color="white" size={15} />
                  <span>{data?.jobs}</span>
                )}
              </p>
              <p>
                <label>Services : &nbsp; </label>
                {loader ? (
                  <div
                    className="spinner-border boot-loader2"
                    role="status"
                  ></div>
                ) : (
                  // <CircularProgress color="white" size={15} />
                  <span>{data?.services}</span>
                )}
              </p>
              <p>
                <label>FeedBacks : &nbsp; </label>
                {loader ? (
                  <div
                    className="spinner-border boot-loader2"
                    role="status"
                  ></div>
                ) : (
                  // <CircularProgress color="white" size={15} />
                  <span>{data?.feedbacks}</span>
                )}
              </p>
            </div>
          </div>
          <div id="chart">
            {/* <Apexxcahrt
              options={dataApex2?.options}
              series={[
                data?.professionalData?.registeredProfessional,
                data?.professionalData?.blockedProfessional,
                data?.professionalData?.deletedProfessional,
              ]}
              type="donut"
              height={350}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash;
