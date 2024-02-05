import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import BlockSharpIcon from "@mui/icons-material/BlockSharp";
import axios from "axios";
import { useSelector } from "react-redux";
import Deletepopup from "./Deletepopup";
import Addpopup from "./Addpopup";
import BlockUser from "./BlockUser";
import { notify } from "../../utils/notify";
import Addblockagain from "./Addblockagain";
import CircularProgress from "@mui/material/CircularProgress";
import Loadering from "../../../assets/images/loading.gif";
import UserUpdate from "./UserUpdate";
import Avatar from "../../../assets/images/avatar.png";
import UserView from "./UserView";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Caution from "../../../assets/images/caution.jpg";
import { Button } from "@material-ui/core";
import AddUser from "./AddUser";
import XLSX from "xlsx";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import moment from "moment";
import Switch from "react-js-switch";
import InfinitScroll from "react-infinite-scroll-component";
import LinearProgress from "@mui/material/LinearProgress";
import FormDialog from "../dialog";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { AllProviders } from "../../services/AllProviders";
import { Alljobs } from "../../services/AllPost";
import OpenJob from "./openJob";
import "./styles.css";
import EditProvider from "./EditProvider";
import { useNavigate } from "react-router";

export default function BasicTable(props) {
  let pass = props.pass;
  const navigate = useNavigate();

  const setdataUsers = props.setdataUsers;
  const [dataUser, setdataUser] = useState([]);
  const [open, setOpen] = useState(props.open);
  const [loader, setLoader] = useState(false);
  const [netcheckk, setNetcheckk] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [loader3, setLoader3] = useState(false);
  const [loader4, setLoader4] = useState(false);
  const [loader5, setLoader5] = useState(false);
  const [loader6, setLoader6] = useState(false);
  const [blockedyes, setBlockedyes] = useState("");
  const [change, setChange] = useState(false);
  const [pgNo, setpgNo] = useState(1);
  const [perPg, setperPg] = useState(10);
  const [searchMenu, setsearchMenu] = useState("");
  const [sortedField, setSortedField] = React.useState(null);
  const [fileterbool, setFilterBool] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [fdate, setFdate] = useState("");
  const [lDate, setLdate] = useState("");
  const [delId, setdelId] = useState();
  const [status, setstatus] = useState();

  const [blockhai, setblockhai] = useState();
  const [addId, setaddId] = useState();
  const [excelarray, setdownloadarray] = useState([]);
  const [state, setState] = useStateWithCallbackLazy({
    pgNo: 0,
    perPg: 10,
    loader: true,
  });
  const closeModal = () => setFilterBool(false);
  let sortedProducts = [...dataUser];

  const downloadData = [];

  const UserViews = (resp) => {
    setLoader5(true);
    setdelId(resp);
  };
  const [updated, setUpdated] = useState(false);
  const [Totalarray, settoTalarray] = useState("");
  console.log(blockedyes, "bloked id ?");
  console.log("change statee", updated);
  const updatestate = (message) => {
    //setUpdated((prev) => !prev);
    notify(`${message}`, "success");
  };
  const handleblocked = (id_block) => {
    let statusblock;
    let changing = [...dataUser];
    let findelement = changing.findIndex((ii) => ii._id == id_block);
    if (changing[findelement].jobStatus == "Closed") {
      statusblock = "Open";
    } else {
      statusblock = "Closed";
    }
    changing[findelement].jobStatus = statusblock;

    console.log(changing, "changeddd");
    setdataUser(changing);
    setBlockedyes("");
  };

  const handledelete = (id_delete) => {
    let statusblock;
    let changing = [...dataUser];
    let findelement = changing.findIndex((ii) => ii._id == id_delete);
    if (changing[findelement].isDeactivated == true) {
      statusblock = false;
    } else {
      statusblock = true;
    }
    changing[findelement].isDeactivated = statusblock;

    console.log(changing, "changeddd");
    setdataUser(changing);
    setBlockedyes("");
  };
  const handleupdate = (id, obj, loc, profile, servicesTag) => {
    // console.log(phone, "id update");
    let changing = [...dataUser];
    let findelement = changing.findIndex((ii) => ii._id == id);
    changing[findelement].name = obj.name;
    changing[findelement].hourRate = obj.hourRate;
    changing[findelement].location = loc;
    changing[findelement].profilePic = profile;
    changing[findelement].experience.services = servicesTag;

    setdataUser(changing);
  };
  const addNewList = (obj) => {
    let changing = [...dataUser];
    // let findelement = changing.length;
    changing.unshift(obj);
    setdataUser(changing);
    console.log(changing, "final");
  };
  const Userupdated = (resp) => {
    setLoader4(true);
    setaddId(resp);
  };
  const dialog = (id, blockhai) => {
    setLoader(true);
    setdelId(id);
    setblockhai(blockhai);
  };

  const blockUser = (id, value) => {
    setLoader2(true);
    setdelId(id);
    setstatus(value);
  };
  const addagainblock = (id) => {
    setLoader3(true);
    setaddId(id);
  };
  const adduser = () => {
    setLoader6(true);
  };
  const netcheck = () => {
    if (!window.navigator.onLine) {
      console.log(!window.navigator.onLine, "no nett");
      notify("Network not found");
      setOpen(false);
      setNetcheckk(true);
    }
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
  useEffect(() => {
    setsearchMenu("");
    emptyforce();
  }, [pass]);
  useEffect(() => {
    netcheck();
    setState({
      ...state,
      pgNo: 0,
    });
    setdataUser([]);

    if (pass) {
      jobpost();
    } else {
      provider();
    }
  }, [updated, pass]);

  const jobpost = () => {
    let query = `?page=${0}${searchMenu ? `&search=${searchMenu}` : ""}`;

    Alljobs(query)
      .then(({ data }) => {
        console.log("jobss rrsss", data?.data);
        setState({
          ...state,
          pgNo: 1,
          loader: false,
        });

        if (data && data && data?.data?.length) {
          let newww = [...dataUser];

          setdataUser(data?.data);
          settoTalarray(data?.data.length);
        }
        setOpen(false);
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
  const provider = () => {
    let query = `?page=${0}${searchMenu ? `&search=${searchMenu}` : ""}`;

    AllProviders(query)
      .then(({ data }) => {
        setState({
          ...state,
          pgNo: 1,
          loader: false,
        });
        if (data && data && data?.data?.length) {
          let newww = [...dataUser];
          setdataUser(data?.data);
          settoTalarray(data?.data.length);
        }
        setOpen(false);
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

  // const downloadapi = () => {
  //   AllProviders()
  //     .then(({ data: { data } }) => {
  //       console.log(data.user, "dowanloadd checkk");
  //       setdownloadarray(data.user);
  //       console.log(excelarray, "leveel");
  //       downloadExcel(data.users);
  //       setOpen(false);
  //     })
  //     .catch((err) => {});
  // };
  const filterfun = () => {
    setSortedField("");
  };
  const getApiCall = () => {
    if (pass) {
      Morejobpost();
    } else {
      MoreproviderPost();
    }
    // setState({
    //   ...state,
    //   pgNo: state.pgNo + 1,
    //   loader: true,
    // });
    // setChange((prev) => !prev);
  };
  const Morejobpost = () => {
    let query = `?page=${state.pgNo}${
      searchMenu ? `&search=${searchMenu}` : ""
    }`;

    Alljobs(query)
      .then(({ data }) => {
        console.log("jobss rrsss", data?.data);
        setState({
          ...state,
          pgNo: state.pgNo + 1,
          loader: false,
        });
        if (data) {
          setOpen(false);
        }
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
          settoTalarray(data?.data.length);
        }
        setOpen(false);
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
  const MoreproviderPost = () => {
    let query = `?page=${state.pgNo}${
      searchMenu ? `&search=${searchMenu}` : ""
    }`;

    AllProviders(query)
      .then(({ data }) => {
        console.log("user response", data?.data);
        setState({
          ...state,
          pgNo: state.pgNo + 1,
          loader: false,
        });
        if (data) {
        }
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
          settoTalarray(data?.data.length);
        }
        setOpen(false);
      })
      .catch((err) => {
        console.log(err, "eerrrrorr");
        setState({
          ...state,
          loader: false,
        });
        setOpen(false);
      });
  };
  const downloadExcel = (resp) => {
    downloadData.length = 0;
    resp.map((items, index) => {
      const tempObj = {
        Sr_No: index + 1,
        Created_Date: moment(items.createdAt).format("MMM Do YY"),
        First_Name: items.firstName,
        Last_Name: items.lastName,
        phoneNumber: items.phoneNumber,
        Active_Status: items.isDelete ? "Delete" : "Active",
        Live_Status: items.isBlock ? "Blocked" : "Live",
        ReportBy: items?.email,
      };
      downloadData.push(tempObj);
    });

    console.log(downloadData);
    const workSheet = XLSX.utils.json_to_sheet(downloadData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Products");

    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });

    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

    XLSX.writeFile(workBook, "Users Data.xlsx");
  };

  if (sortedField !== null) {
    sortedProducts.sort((a, b) => {
      if (a[sortedField] < b[sortedField]) {
        return -1;
      }
      if (a[sortedField] > b[sortedField]) {
        return 1;
      }
      // a[sortedField].toString().localeCompare(b[sortedField].toString(), "en", {
      //   numeric: true,
      //  })

      return 0;
    });
  }
  // const FilterDate = (firstdte, lstdte) => {
  //   netcheck();
  //   setState(
  //     {
  //       ...state,
  //       pgNo: 1,
  //     },
  //     (va) => {
  //       emptyforce();
  //       setFdate(firstdte);
  //       setLdate(lstdte);
  //       closeModal();
  //       setOpen(true);
  //       console.log("value", va);
  //     }
  //   );
  // };
  console.log(dataUser, "dataUser");
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  const switch_onChange_handle = () => {
    setIsSwitchOn(!isSwitchOn);
  };
  return (
    <>
      {pass ? (
        <div className="users_table">
          <div className="titlee">
            <h2>{pass ? "Posted Jobs" : "Service Provider"}</h2>
          </div>
          <div className="search_view">
            <input
              type="search"
              placeholder="Search by name..."
              value={searchMenu}
              onChange={(e) => {
                setsearchMenu(e.target.value);
                emptyforce();
              }}
            ></input>
          </div>
          <TableContainer component={Paper}>
            {sortedProducts.length > 0 && (
              <>
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
                        <TableCell align="center">Owner's Name</TableCell>
                        <TableCell align="center">Job Title</TableCell>
                        <TableCell align="center">Payment Rate</TableCell>
                        <TableCell align="center">Posted Date</TableCell>
                        <TableCell align="center">Time</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center" colSpan={2}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortedProducts.map((dats, i) => {
                        {
                          console.log(dats, "<==dats");
                        }
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
                                    dats?.owner?.saloon?.avatar
                                      ? dats?.owner?.saloon?.avatar
                                      : Avatar
                                  }
                                  className="profille"
                                />
                              </TableCell>
                              <TableCell align="center">
                                {dats?.owner?.saloon?.Saloon_name
                                  ? dats?.owner?.saloon?.Saloon_name
                                  : dats?.owner?.email}{" "}
                              </TableCell>
                              <TableCell align="center">
                                {dats?.jobTitle}
                              </TableCell>

                              {dats?.rateType === "Per Hour" ? (
                                <TableCell align="center">
                                  {`${dats?.minRate} - ${dats?.maxRate}`}{" "}
                                </TableCell>
                              ) : (
                                <TableCell align="center">
                                  {dats?.commisionRate}
                                  {"%"}
                                </TableCell>
                              )}
                              <TableCell align="center">
                                {moment(dats?.createdAt).format("DD-MMM-YY")}
                              </TableCell>
                              <TableCell align="center">
                                {moment(dats?.createdAt).format("HH:MM:SS")}
                              </TableCell>
                              <TableCell align="center">
                                {dats?.jobStatus}
                              </TableCell>

                              <TableCell align="right">
                                <button
                                  className="bttn btn-success "
                                  style={{ border: "none", boxShadow: "none" }}
                                  type="button"
                                  onClick={() => {
                                    UserViews(dats);
                                  }}
                                >
                                  <VisibilityIcon />
                                </button>
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
                                  <div style={{ width: "50%" }}>
                                    {dats.jobStatus === "Closed" ||
                                    dats.jobStatus === "closed"
                                      ? "Closed"
                                      : "Open"}
                                  </div>
                                  <Switch
                                    value={
                                      dats?.jobStatus === "Open" ||
                                      dats?.jobStatus === "open"
                                    }
                                    onChange={() => {
                                      blockUser(dats._id, dats?.jobStatus);
                                    }}
                                    color={
                                      dats?.jobStatus === "Closed" ||
                                      dats?.jobStatus === "closed"
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
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                    </TableBody>
                  </Table>
                </InfinitScroll>

                {loader ? (
                  <Deletepopup
                    id={delId}
                    block={blockhai}
                    comp="jobs"
                    updstate={updatestate}
                    delete={handledelete}
                    close={setLoader}
                    blocked={handleblocked}
                  />
                ) : (
                  ""
                )}
                {loader1 ? (
                  <Addpopup
                    id={addId}
                    updstate={updatestate}
                    adddelete={handledelete}
                    close={setLoader1}
                  />
                ) : (
                  ""
                )}
                {loader2 ? (
                  <OpenJob
                    id={delId}
                    status={status}
                    updstate={updatestate}
                    blocked={handleblocked}
                    close={setLoader2}
                  />
                ) : (
                  ""
                )}

                {loader4 ? (
                  <UserUpdate
                    id={addId}
                    updstate={updatestate}
                    update={handleupdate}
                    close={setLoader4}
                  />
                ) : (
                  ""
                )}
                {loader5 ? (
                  <UserView resp={delId} close={setLoader5} pass />
                ) : (
                  ""
                )}
                {loader6 ? (
                  <AddUser
                    updstate={updatestate}
                    close={setLoader6}
                    update={addNewList}
                    role="Service Provider"
                  />
                ) : (
                  ""
                )}
              </>
            )}

            {open ? (
              <img src={Loadering} className="loaderr" />
            ) : (
              sortedProducts.length === 0 && (
                <p className="search_view ml-2 font-weight-bold">
                  No Record Found!
                </p>
              )
            )}
            {netcheckk ? (
              <div className="loaderr">
                <img src={Caution}></img>
                <h3>Your connection is not available</h3>
              </div>
            ) : (
              ""
            )}
            {/* <FormDialog
        open={fileterbool}
        handleClose={closeModal}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        callback={FilterDate}
      /> */}
          </TableContainer>
        </div>
      ) : (
        <div className="users_table">
          <div className="titlee">
            <h2>{pass ? "Posted Jobs" : "Service Provider"}</h2>
          </div>
          <div className="search_view">
            <input
              type="search"
              placeholder="Search by name..."
              value={searchMenu}
              onChange={(e) => {
                setsearchMenu(e.target.value);
                emptyforce();
              }}
            ></input>
          </div>
          <TableContainer component={Paper}>
            {sortedProducts.length > 0 && (
              <>
                <div className="excle_btn">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      adduser();
                    }}
                  >
                    Add Service Provider
                  </Button>
                </div>
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
                        <TableCell align="center">
                          Name
                          <SortIcon
                            className="filterr"
                            onClick={() =>
                              sortedField ? filterfun() : setSortedField("name")
                            }
                          />
                        </TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Location</TableCell>
                        <TableCell align="center">
                          Hour Rate
                          <SortIcon
                            className="filterr"
                            onClick={() =>
                              sortedField
                                ? filterfun()
                                : setSortedField("hourRate")
                            }
                          />
                        </TableCell>
                        <TableCell align="center" colSpan={3}>
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {console.log(sortedProducts, "sortedProducts")}
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
                                <img
                                  src={
                                    dats.profilePic ? dats?.profilePic : Avatar
                                  }
                                  className="profille"
                                />
                              </TableCell>
                              <TableCell align="center">
                                {dats?.name}{" "}
                              </TableCell>
                              <TableCell align="center">{dats.email}</TableCell>
                              <TableCell align="center">
                                {dats?.location?.address
                                  ? dats?.location?.address
                                  : "N/A"}
                              </TableCell>
                              <TableCell align="center">
                                {dats?.hourRate ? dats?.hourRate : "0"}
                              </TableCell>

                              <TableCell align="right">
                                <button
                                  className="bttn btn-success"
                                  type="button"
                                  onClick={() => {
                                    UserViews(dats);
                                  }}
                                >
                                  <VisibilityIcon />
                                </button>
                              </TableCell>
                              <TableCell align="center">
                                <button
                                  onClick={() => {
                                    navigate(`/dashboard/serviceUpdate`, {
                                      state: { dats },
                                    });
                                  }}
                                  className="bttn btn btnupdate"
                                  type="button"
                                >
                                  <EditSharpIcon />
                                </button>
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
                                  <div style={{ width: "50%" }}>
                                    {dats.isDeactivated ? "Deactive" : "Active"}
                                  </div>
                                  <Switch
                                    value={!dats.isDeactivated}
                                    onChange={() => {
                                      blockUser(dats._id, dats.isDeactivated);
                                    }}
                                    color={
                                      dats.isDeactivated ? "#B3B3B3" : "#173072"
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
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                    </TableBody>
                  </Table>
                </InfinitScroll>

                {loader ? (
                  <Deletepopup
                    id={delId}
                    block={blockhai}
                    comp="provider"
                    updstate={updatestate}
                    delete={handledelete}
                    close={setLoader}
                  />
                ) : (
                  ""
                )}
                {loader1 ? (
                  <Addpopup
                    id={addId}
                    updstate={updatestate}
                    adddelete={handledelete}
                    close={setLoader1}
                  />
                ) : (
                  ""
                )}
                {loader2 ? (
                  <BlockUser
                    id={delId}
                    status={status}
                    updstate={updatestate}
                    blocked={handledelete}
                    close={setLoader2}
                  />
                ) : (
                  ""
                )}

                {loader4
                  ? navigate(`/serviceUpdate/`, {
                      state: { addId },
                    })
                  : ""}
                {loader5 ? <UserView resp={delId} close={setLoader5} /> : ""}
              </>
            )}
            {open ? (
              <img src={Loadering} className="loaderr" />
            ) : (
              sortedProducts.length === 0 && (
                <>
                  <div className="excle_btn">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        adduser();
                      }}
                    >
                      Add Service Provider
                    </Button>
                  </div>
                  <p className="search_view ml-2 font-weight-bold">
                    No Record Found!
                  </p>
                </>
              )
            )}
            {netcheckk ? (
              <div className="loaderr">
                <img src={Caution}></img>
                <h3>Your connection is not available</h3>
              </div>
            ) : (
              ""
            )}
            {loader6 ? (
              <AddUser
                updstate={updatestate}
                close={setLoader6}
                update={addNewList}
                role="Service Provider"
              />
            ) : (
              ""
            )}
          </TableContainer>
        </div>
      )}
    </>
  );
}
