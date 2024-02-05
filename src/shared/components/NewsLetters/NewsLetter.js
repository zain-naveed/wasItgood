import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
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
import SortIcon from "@mui/icons-material/Sort";
import moment from "moment";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import { Letters } from "../../services/newsLetter";
import Avatar from "../../../assets/images/avatar.png";
import { GetServices } from "../../services/Allservices";
import UserUpdate from "../users/UserUpdate";
import BlockUser from "../users/BlockUser";
import { Button } from "@material-ui/core";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import { GetfeedBack } from "../../services/FeedBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UserView from "../users/UserView";
import { GetLicense } from "../../services/GetLicense";
import Switch from "react-js-switch";
import VerifyServiceProvider from "./verifyServiceProvider";
import DeleteService from "./deleteService";

export default function NewsLetter(props) {
  console.log(props, "<==props");
  let services = props.services;
  let feedBack = props.feedBack;
  let licenseProp = props.license;
  let subEmail = props.subEmail;
  const [dataUser, setdataUser] = useState([]);
  const [open, setOpen] = useState(props.open);
  const [netcheckk, setNetcheckk] = useState(false);
  const [change, setChange] = useState(false);
  const [searchMenu, setsearchMenu] = useState("");
  const [sortedField, setSortedField] = React.useState(null);
  const [loader1, setLoader1] = useState(false);
  const [loader4, setLoader4] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [loader3, setLoader3] = useState(false);
  const [loader5, setLoader5] = useState(false);
  const [erroring, seterror] = useState(false);
  const [license, setLicense] = useState();

  const [addId, setaddId] = useState();
  const [state, setState] = useStateWithCallbackLazy({
    pgNo: 0,
    perPg: 10,
    loader: true,
  });

  const [updated, setUpdated] = useState(false);
  const [Totalarray, settoTalarray] = useState("");
  const [licenn, setlicenn] = useState("");

  const netcheck = () => {
    if (!window.navigator.onLine) {
      console.log(!window.navigator.onLine, "no nett");
      notify("Network not found");
      setOpen(false);
      setNetcheckk(true);
    }
  };
  const blockUser = (id, datasss) => {
    console.log(datasss, "<==datasss");
    setLoader2(true);
    setaddId(id);
    setlicenn(datasss);
  };

  const UserViews = (resp) => {
    setLoader5(true);
    setaddId(resp);
  };
  const Userupdated = (resp) => {
    setLoader4(true);
    setaddId(resp);
  };
  const addSrvices = () => {
    setLoader3(true);
  };
  const updatestate = (message) => {
    setUpdated((prev) => !prev);
    notify(`${message}`, "success");
  };
  const emptyforce = () => {
    setOpen(true);
    setdataUser([]);
    setState({
      ...state,
      pgNo: 0,
    });
    // setpgNo(1)
    setUpdated((prev) => !prev);
  };

  const {
    user: { user },
  } = useSelector((state) => state);
  console.log(user);

  const handleupdate = (id, obj, loc, profile, servicesTag, service) => {
    let changing = [...dataUser];
    let findelement = changing.findIndex((ii) => ii._id == id);
    changing[findelement].service = service;
    setdataUser(changing);
  };
  const [blockedyes, setBlockedyes] = useState("");

  const handleVerify = (id_delete) => {
    let statusblock;
    let changing = [...dataUser];
    let findelement = changing.findIndex((ii) => ii._id == id_delete);
    if (changing[findelement].isLicensed == true) {
      statusblock = false;
    } else {
      statusblock = true;
    }
    changing[findelement].isLicensed = statusblock;

    console.log(changing, "changeddd");
    setdataUser(changing);
    setBlockedyes("");
  };

  const handledelete = (id_delete) => {
    let statusblock;
    let changing = [...dataUser];
    let findelement = changing.findIndex((ii) => ii?._id == id_delete);
    changing.splice(findelement, 1);
    setdataUser(changing);
  };
  const addServicees = (obj) => {
    let objecct = {
      service: obj,
      __v: "",
      _id: "",
    };
    let changing = [...dataUser];
    changing.unshift(objecct);
    setdataUser(changing);
  };

  useEffect(() => {
    setsearchMenu("");
    emptyforce();
  }, [services, feedBack, subEmail, licenseProp]);

  useEffect(() => {
    // setdataUser([])
    //setsearchMenu("");
    netcheck();
    setNetcheckk(false);
    seterror(false);
    if (services) {
      setOpen(true);
      let query = `${searchMenu ? `?search=${searchMenu}` : ""}`;
      setdataUser([]);
      GetServices(query)
        .then(({ data }) => {
          console.log("jobss rrsss", data?.data);
          setState({
            ...state,
            pgNo: state.pgNo + 1,
            loader: false,
          });
          if (data) {
            setOpen(false);

            if (data && data && data?.data?.length) {
              let newww = [...dataUser];
              // data?.data.forEach((element) => {
              //   let findAnyelement = newww.findIndex(
              //     (ii) => ii._id === element._id
              //   );
              //   if (findAnyelement < 0) {
              //     newww = [...newww, element];
              //   }
              // });
              setdataUser(data?.data);
              console.log(newww, state.pgNo, "last addedd");
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
    } else if (feedBack) {
      setOpen(true);
      let query = `?page=${0}${searchMenu ? `&search=${searchMenu}` : ""}`;
      setdataUser([]);
      GetfeedBack(query)
        .then(({ data }) => {
          console.log("jobss rrsss", data?.data);
          setState({
            ...state,
            pgNo: state.pgNo + 1,
            loader: false,
          });
          if (data) {
            setOpen(false);

            if (data && data && data?.data?.length) {
              // let newww = [...dataUser];
              // data?.data.forEach((element) => {
              //   let findAnyelement = newww.findIndex(
              //     (ii) => ii._id === element._id
              //   );
              //   if (findAnyelement < 0) {
              //     newww = [...newww, element];
              //   }
              // });
              setdataUser(data?.data);
              // console.log(newww, state.pgNo, "last addedd");
              settoTalarray(data?.data.length);
            }
          } else {
            seterror(true);
            setOpen(false);
          }
        })
        .catch((err) => {
          console.log(err, "eerrrrorr");
          setState({
            ...state,
            loader: false,
          });
          setOpen(false);
        });
    } else if (licenseProp) {
      let query = `?page=${state.pgNo}${
        searchMenu ? `&search=${searchMenu}` : ""
      }`;

      GetLicense(query)
        .then(({ data }) => {
          console.log("licenseSide==>", data?.data);

          setOpen(true);
          setState({
            ...state,
            pgNo: state.pgNo + 1,
            loader: false,
          });
          if (data) {
            setOpen(false);
          }
          if (data && data && data?.data.length) {
            console.log(data?.data, "<==findanyelement");

            let newww = [...dataUser];
            data?.data.forEach((element) => {
              let findAnyelement = newww.findIndex(
                (ii) => ii._id === element._id
              );
              if (findAnyelement < 0) {
                newww = [...newww, element];
              }
            });
            setdataUser(newww);
            console.log(newww, state.pgNo, "last addedd");
            settoTalarray(data?.data.length);
          }
        })
        .catch((err) => {
          console.log(err, "eerrrrorr");
          setState({
            ...state,
            loader: false,
          });
          setOpen(false);
        });
    } else if (subEmail) {
      let query = `?page=${0}&limit=${state.perPg}${
        searchMenu ? `&search=${searchMenu}` : ""
      }`;

      Letters(query)
        .then(({ data }) => {
          setOpen(true);
          console.log("jobss rrsss", data?.data);
          setState({
            ...state,
            pgNo: state.pgNo + 1,
            loader: false,
          });
          if (data) {
            setOpen(false);

            if (data && data && data?.data?.length) {
              let newww = [...dataUser];
              // data?.data.forEach((element) => {
              //   let findAnyelement = newww.findIndex(
              //     (ii) => ii._id === element._id
              //   );
              //   if (findAnyelement < 0) {
              //     newww = [...newww, element];
              //   }
              // });
              setdataUser(data?.data);
              console.log(newww, state.pgNo, "last addedd");
              settoTalarray(data?.data.length);
            }
          } else {
            seterror(true);
          }
        })
        .catch((err) => {
          setOpen(false);
          console.log(err, "eerrrrorr");
          setState({
            ...state,
            loader: false,
          });
        });
    }
  }, [updated, services, feedBack, subEmail, licenseProp]);

  const filterfun = () => {
    setSortedField("");
  };
  const getApiCall = () => {
    setState({
      ...state,
      pgNo: state.pgNo + 1,
      loader: true,
    });
    getMultipleApiCall();
    // setChange((prev) => !prev);
  };
  const getMultipleApiCall = () => {
    if (services) {
      let query = `${searchMenu ? `?search=${searchMenu}` : ""}`;

      GetServices(query)
        .then(({ data }) => {
          console.log("jobss rrsss", data?.data);
          setState({
            ...state,
            pgNo: state.pgNo + 1,
            loader: false,
          });
          if (data) {
            setOpen(false);

            if (data && data && data?.data?.length) {
              let newww = [...dataUser];
              data?.data.forEach((element) => {
                let findAnyelement = newww.findIndex(
                  (ii) => ii._id === element._id
                );
                if (findAnyelement < 0) {
                  newww = [...newww, element];
                }
              });
              setdataUser(data?.data);
              console.log(newww, state.pgNo, "last addedd");
              settoTalarray(data?.data.length);
            }
          } else {
            seterror(true);
          }
        })
        .catch((err) => {
          console.log(err, "eerrrrorr");

          setState({
            ...state,
            loader: false,
          });
        });
    } else if (feedBack) {
      let query = `?page=${state.pgNo}${
        searchMenu ? `&search=${searchMenu}` : ""
      }`;

      GetfeedBack(query)
        .then(({ data }) => {
          console.log("jobss rrsss", data?.data);
          setState({
            ...state,
            pgNo: state.pgNo + 1,
            loader: false,
          });
          if (data) {
            setOpen(false);

            if (data && data && data?.data?.length) {
              let newww = [...dataUser];
              data?.data.forEach((element) => {
                let findAnyelement = newww.findIndex(
                  (ii) => ii._id === element._id
                );
                if (findAnyelement < 0) {
                  newww = [...newww, element];
                }
              });
              setdataUser(newww);
              console.log(newww, state.pgNo, "last addedd");
              settoTalarray(data?.data.length);
            }
          } else {
            seterror(true);
          }
        })
        .catch((err) => {
          console.log(err, "eerrrrorr");
          setState({
            ...state,
            loader: false,
          });
        });
    } else if (licenseProp) {
      let query = `?page=${state.pgNo}${
        searchMenu ? `&search=${searchMenu}` : ""
      }`;

      GetLicense(query)
        .then(({ data }) => {
          console.log("licenseSide==>", data?.data);
          setState({
            ...state,
            pgNo: state.pgNo + 1,
            loader: false,
          });
          if (data) {
            setOpen(false);
          }
          if (data && data && data?.data.length) {
            console.log(data?.data, "<==findanyelement");

            let newww = [...dataUser];
            data?.data.forEach((element) => {
              let findAnyelement = newww.findIndex(
                (ii) => ii._id === element._id
              );
              if (findAnyelement < 0) {
                newww = [...newww, element];
              }
            });
            setdataUser(newww);
            console.log(newww, state.pgNo, "last addedd");
            settoTalarray(data?.data.length);
          }
        })
        .catch((err) => {
          console.log(err, "eerrrrorr");
          setState({
            ...state,
            loader: false,
          });
        });
    } else if (subEmail) {
      let query = `?page=${state.pgNo}&limit=${state.perPg}${
        searchMenu ? `&search=${searchMenu}` : ""
      }`;

      Letters(query)
        .then(({ data }) => {
          console.log("jobss rrsss", data?.data);
          setState({
            ...state,
            pgNo: state.pgNo + 1,
            loader: false,
          });
          if (data) {
            setOpen(false);

            if (data && data && data?.data?.length) {
              let newww = [...dataUser];
              data?.data.forEach((element) => {
                let findAnyelement = newww.findIndex(
                  (ii) => ii._id === element._id
                );
                if (findAnyelement < 0) {
                  newww = [...newww, element];
                }
              });
              setdataUser(data?.data);
              console.log(newww, state.pgNo, "last addedd");
              settoTalarray(data?.data.length);
            }
          } else {
            seterror(true);
          }
        })
        .catch((err) => {
          console.log(err, "eerrrrorr");
          setState({
            ...state,
            loader: false,
          });
        });
    }
  };

  let sortedProducts = [...dataUser];

  if (sortedField !== null) {
    sortedProducts.sort((a, b) => {
      if (a[sortedField] < b[sortedField]) {
        return -1;
      }
      if (a[sortedField] > b[sortedField]) {
        return 1;
      }

      return 0;
    });
  }

  console.log(dataUser, "dataUser");
  console.log(services, "<==services");

  const [delId, setdelId] = useState();
  const [status, setstatus] = useState();

  const actionOnverify = (id, value) => {
    setLoader2(true);
    setdelId(id);
    setstatus(value);
  };

  const actionOnDeleteService = (id) => {
    setLoader1(true);
    setdelId(id);
  };

  return (
    <>
      <div className="users_table">
        <div className="titlee">
          <h2>
            {services
              ? "Services"
              : feedBack
              ? "FeedBack & Inquiry"
              : licenseProp
              ? "License"
              : subEmail && "Subscribed E-mail"}
          </h2>
        </div>
        <div className="search_view">
          <input
            type="search"
            placeholder={
              services
                ? "Search by name..."
                : licenseProp
                ? "Search by name..."
                : feedBack
                ? "Search by name..."
                : subEmail
                ? "Search by email..."
                : "Search..."
            }
            value={searchMenu}
            onChange={(e) => {
              // handleSearch
              setsearchMenu(e.target.value);
              emptyforce();
            }}
          ></input>
        </div>
        {services
          ? sortedProducts.length > 0 && (
              <TableContainer component={Paper}>
                <div className="excle_btn">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      addSrvices();
                    }}
                  >
                    Add Service
                  </Button>
                </div>
                <InfinitScroll
                  dataLength={dataUser.length}
                  // next={getApiCall}
                  // hasMore={true}
                  // loader={state.loader ? <LinearProgress /> : ""}
                >
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">SR</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Time</TableCell>
                        <TableCell align="center">
                          Services
                          <SortIcon
                            className="filterr"
                            onClick={() =>
                              sortedField
                                ? filterfun()
                                : setSortedField("service")
                            }
                          />
                        </TableCell>
                        <TableCell align="center" colSpan={2}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedProducts.map((dats, i) => {
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
                              <TableCell align="center">
                                {moment(dats?.updatedAt).format("DD-MMM-YY")}
                              </TableCell>
                              <TableCell align="center">
                                {moment(dats?.updatedAt).format("hh:mm:ss a")}
                              </TableCell>
                              <TableCell align="center">
                                {dats?.service}
                              </TableCell>
                              <TableCell align="center">
                                <button
                                  onClick={() => {
                                    Userupdated(dats);
                                  }}
                                  className="bttn btn btnupdate"
                                  type="button"
                                >
                                  <EditSharpIcon />
                                </button>
                              </TableCell>
                              <TableCell align="center">
                                <button
                                  className={
                                    "bttn btn-" +
                                    (dats.isDelete ? "success" : "danger")
                                  }
                                  type="button"
                                  onClick={() => {
                                    actionOnDeleteService(dats._id);
                                  }}
                                >
                                  <DeleteForeverSharpIcon />
                                </button>
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                    </TableBody>
                  </Table>
                </InfinitScroll>
                {loader1 ? (
                  <DeleteService
                    id={delId}
                    updstate={updatestate}
                    close={setLoader1}
                  />
                ) : (
                  ""
                )}

                {loader4 ? (
                  <UserUpdate
                    id={addId}
                    services={"services"}
                    updstate={updatestate}
                    update={handleupdate}
                    close={setLoader4}
                  />
                ) : loader3 ? (
                  <UserUpdate
                    addservices={"addservices"}
                    updstate={updatestate}
                    update={addServicees}
                    close={setLoader3}
                  />
                ) : (
                  ""
                )}
                {loader2 ? (
                  <BlockUser
                    id={addId}
                    delServices={"delServices"}
                    updstate={updatestate}
                    blocked={handledelete}
                    close={setLoader2}
                  />
                ) : (
                  //       <SaloonDel
                  //   id={addId}
                  //   status2={status2}
                  //   setStatus2={setStatus2}
                  //   updstate={updatestate}
                  //   // delete={handleblocked}
                  //   close={setLoader2}
                  // />
                  ""
                )}
              </TableContainer>
            )
          : feedBack
          ? sortedProducts.length > 0 && (
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
                        <TableCell align="center">Profile</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">User Role</TableCell>
                        <TableCell align="center">E-Mail</TableCell>
                        <TableCell align="center">Reason</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedProducts.map((dats, i) => {
                        // console.log(dats,"<====dats")
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
                              <TableCell align="center">
                                <img
                                  src={
                                    dats?.inquiryUser?.role === "owner"
                                      ? dats?.inquiryUser?.saloon.avatar
                                        ? dats?.inquiryUser?.saloon.avatar
                                        : Avatar
                                      : dats?.inquiryUser?.profilePic
                                      ? dats?.inquiryUser?.profilePic
                                      : Avatar
                                  }
                                  className="profille"
                                />
                              </TableCell>
                              <TableCell align="center">
                                {dats?.inquiryUser?.role === "owner"
                                  ? dats?.inquiryUser?.saloon?.Saloon_name
                                  : dats?.inquiryUser?.name}
                              </TableCell>
                              <TableCell align="center">
                                {dats?.inquiryUser?.role}
                              </TableCell>
                              <TableCell align="center">
                                {dats?.email}
                              </TableCell>
                              <TableCell align="center">
                                {dats?.reason}
                              </TableCell>
                              <TableCell align="center">
                                <button
                                  className="bttn btn-success"
                                  type="button"
                                  style={{ border: "none", boxShadow: "none" }}
                                  onClick={() => {
                                    UserViews(dats);
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

                {loader5 ? (
                  <UserView resp={addId} close={setLoader5} feedback />
                ) : (
                  ""
                )}
              </TableContainer>
            )
          : licenseProp
          ? sortedProducts.length > 0 && (
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
                        <TableCell align="center">Profile</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">License</TableCell>
                        <TableCell align="center">License Number</TableCell>
                        {/* <TableCell align="center">E-Mail</TableCell>
                  <TableCell align="center">Type</TableCell> */}
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedProducts.map((dats, i) => {
                        // {console.log(sortedProducts,"<===dats")}
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
                              <TableCell align="center">
                                <img
                                  src={
                                    dats?.profilePic ? dats?.profilePic : Avatar
                                  }
                                  className="profille"
                                />
                              </TableCell>
                              <TableCell align="center">{dats?.name}</TableCell>
                              <TableCell align="center">
                                <div className="d-flex flex-column">
                                  {dats?.license?.map((item) => {
                                    return <span>{item?.name}</span>;
                                  })}
                                </div>
                              </TableCell>
                              <TableCell align="center">
                                <div className="d-flex flex-column">
                                  {dats?.license?.map((item) => {
                                    return <span>#{item?.number}</span>;
                                  })}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div
                                  style={{
                                    display: "flex",
                                    width: "100%",
                                    height: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <div className="licensed-div">
                                    {dats?.isLicensed
                                      ? "Licensed"
                                      : "Non-Licensed"}
                                  </div>
                                  <div style={{ marginLeft: "10px" }}>
                                    <Switch
                                      value={dats?.isLicensed}
                                      onChange={() => {
                                        actionOnverify(
                                          dats._id,
                                          dats?.isLicensed
                                        );
                                      }}
                                      color={
                                        !dats?.isLicensed
                                          ? "#B3B3B3"
                                          : "#173072"
                                      }
                                      backgroundColor={{
                                        on: "#DFEBFD",
                                        off: "#E9E9E9",
                                      }}
                                      borderColor={{
                                        on: "#DFEBFD",
                                        off: "#E9E9E9",
                                      }}
                                    />
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                    </TableBody>
                  </Table>
                </InfinitScroll>

                {/* {loader5 ? <UserView resp={addId} close={setLoader5} feedback /> : ""} */}

                {loader2 ? (
                  <VerifyServiceProvider
                    id={delId}
                    status={status}
                    updstate={updatestate}
                    blocked={handleVerify}
                    close={setLoader2}
                  />
                ) : (
                  ""
                )}
              </TableContainer>
            )
          : subEmail &&
            sortedProducts.length > 0 && (
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
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Time</TableCell>
                        <TableCell align="center">
                          E-Mail
                          <SortIcon
                            className="filterr"
                            onClick={() =>
                              sortedField
                                ? filterfun()
                                : setSortedField("subscribeEmail")
                            }
                          />
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedProducts.map((dats, i) => {
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
                              <TableCell align="center">
                                {moment(dats?.updatedAt).format("DD-MMM-YY")}
                              </TableCell>
                              <TableCell align="center">
                                {moment(dats?.updatedAt).format("hh:mm:ss a")}
                              </TableCell>
                              <TableCell align="center">
                                {dats?.subscribeEmail}
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
          sortedProducts.length === 0 && (
            <p className="search_view ml-2 font-weight-bold">No Record Found</p>
          )
        )}
        {erroring ? (
          <div className="loaderr">
            <h3>No record found !!</h3>
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
