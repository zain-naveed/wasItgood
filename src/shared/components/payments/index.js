import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import { GiPlainCircle } from "react-icons/gi";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { notify } from "../../utils/notify";
import Loadering from "../../../assets/images/loading.gif";
import Caution from "../../../assets/images/caution.jpg";
import InfinitScroll from "react-infinite-scroll-component";
import LinearProgress from "@mui/material/LinearProgress";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import moment from "moment";
import { GetPayments, GetTotalEarnings } from "../../services/Payments";
import { setEarnings } from "../../redux/reducers/userSlie";
import { useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./style.css";

export default function Payments(props) {
  const earning = useSelector((state) => state.user.totalEarnings);
  const dispatch = useDispatch();
  const [dataUser, setdataUser] = useState([]);
  const [open, setOpen] = useState(props.open);
  const [netcheckk, setNetcheckk] = useState(false);
  const [erroring, seterror] = useState(false);
  const [spinner, setSpinner] = useState(true);
  const [state, setState] = useStateWithCallbackLazy({
    pageNo: 0,
    loader: true,
  });
  const [Totalarray, settoTalarray] = useState("");
  const [totalEarnings, setTotalEarnings] = useState(0);

  const netcheck = () => {
    if (!window.navigator.onLine) {
      console.log(!window.navigator.onLine, "no nett");
      notify("Network not found");
      setOpen(false);
      setNetcheckk(true);
    }
  };

  const {
    user: { user },
  } = useSelector((state) => state);

  useEffect(() => {
    setSpinner(true);
    netcheck();
    setNetcheckk(false);
    seterror(false);
    setState({
      ...state,
    });
    setOpen(true);
    let query = ``;
    setdataUser([]);
    GetPayments(query)
      .then(({ data }) => {
        console.log("payments rrsss", data?.data);
        setState({
          ...state,
          loader: false,
        });
        console.log("state", state);
        if (data) {
          setOpen(false);
          console.log(data);

          if (data && data && data?.data?.length) {
            let newww = [...dataUser];
            data?.data.forEach((element) => {
              const date = new Date(element?.time * 1000);
              // const expire_date = new Date(element?.end * 1000);
              element["date"] = date.toLocaleDateString();
              element["time"] = date.toLocaleTimeString();
              // element["expire"] = expire_date.toLocaleDateString();
            });
            setdataUser(data?.data);
            settoTalarray(data?.data.length);
          }
        } else {
          seterror(true);
          setOpen(false);
        }
      })
      .catch((err) => {
        console.log(err, "eerrrrorr");
        setOpen(false);
        setState({
          ...state,
          loader: false,
        });
      });
    GetTotalEarnings()
      .then(({ data }) => {
        if (data) {
          dispatch(setEarnings(data?.data));
          setTotalEarnings(data?.data);
        } else {
          seterror(true);
          setOpen(false);
        }
        setSpinner(false);
      })
      .catch((err) => {
        console.log(err, "eerrrrorr");
        setSpinner(false);
        setOpen(false);
        setState({
          ...state,
          loader: false,
        });
      });
  }, []);

  const getApiCall = () => {
    getMultipleApiCall();
  };
  const getMultipleApiCall = () => {
    let id = dataUser[Totalarray - 1].id;
    let query = `?lastId=${id}`;
    setState({
      ...state,
      loader: true,
    });
    GetPayments(query)
      .then(({ data }) => {
        console.log("jobss rrsss", data?.data);
        setState({
          ...state,
          loader: false,
        });
        if (data) {
          setOpen(false);
          if (data && data && data?.data?.length) {
            let newww = [...dataUser];
            data?.data.forEach((element) => {
              const date = new Date(element?.time * 1000);
              // const expire_date = new Date(element?.end * 1000);
              element["date"] = date.toLocaleDateString();
              element["time"] = date.toLocaleTimeString();
              // element["expire"] = expire_date.toLocaleDateString();
              newww.push(element);
            });
            setdataUser(newww);
            settoTalarray(newww.length);
          }
        } else {
          setOpen(false);
          seterror(true);
        }
      })
      .catch((err) => {
        console.log(err, "eerrrrorr");
        setOpen(false);
        setState({
          ...state,
          loader: false,
        });
      });
  };

  return (
    <>
      <div className="users_table">
        <div className="titlee">
          <h2>Payments</h2>
        </div>
        <div className="d-flex justify-content-end">
          <h4>Total Earnings: </h4>
          {spinner ? (
            <div
              className="spinner-border boot-loader spinner-black ml-2"
              role="status"
            ></div>
          ) : (
            <h4 className="ml-2">${totalEarnings}</h4>
          )}{" "}
        </div>
        {dataUser.length > 0 && (
          <TableContainer component={Paper}>
            <InfinitScroll
              dataLength={dataUser.length}
              next={getApiCall}
              hasMore={true}
              loader={state.loader ? <LinearProgress /> : ""}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">SR</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">User Type</TableCell>
                    <TableCell align="center">Billing Reason</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataUser.map((dats, i) => {
                    return (
                      <>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell align="center">{i + 1} </TableCell>
                          <TableCell align="center">{dats?.name}</TableCell>
                          <TableCell align="center">{dats?.role}</TableCell>
                          <TableCell align="center">{dats?.reason}</TableCell>
                          <TableCell align="center">{dats?.status}</TableCell>
                          <TableCell align="center">
                            {moment(dats?.date).format("DD-MMM-YY")}
                          </TableCell>
                          <TableCell align="center">{dats?.time}</TableCell>
                          <TableCell align="center">
                            ${dats?.amountPaid / 100}
                          </TableCell>
                          <TableCell align="center">
                            <button
                              className="bttn btn-success"
                              type="button"
                              style={{ border: "none", boxShadow: "none" }}
                              onClick={() => {
                                window.open(
                                  dats?.url,
                                  "_blank",
                                  "noopener,noreferrer"
                                );
                              }}
                            >
                              <VisibilityIcon />
                            </button>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </InfinitScroll>
          </TableContainer>
        )}

        {open ? (
          <img src={Loadering} className="loaderr" />
        ) : (
          dataUser.length === 0 && (
            <p className="search_view ml-2 font-weight-bold">No Record Found</p>
          )
        )}
        {erroring ? (
          <div className="loaderr">
            <h3>No Record Found</h3>
          </div>
        ) : (
          ""
        )}
        {netcheckk ? (
          <div className="loaderr">
            <img src={Caution}></img>
            <h3>Your connection is not available</h3>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
