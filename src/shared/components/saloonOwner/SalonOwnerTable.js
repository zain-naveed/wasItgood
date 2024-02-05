import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useSelector } from "react-redux";
import AddReportagain from "../reports/AddReportagain";
import SaloonDel from "../../components/saloonOwner/SaloonDel";
import ReportUpdate from "../reports/ReportUpdate";
import { notify } from "../../utils/notify";
import Loadering from "../../../assets/images/loading.gif";
import Caution from "../../../assets/images/caution.jpg";
import XLSX from "xlsx";
import { Button } from "@material-ui/core";
import SortIcon from "@mui/icons-material/Sort";
import moment from "moment";
import Switch from "react-js-switch";
import InfinitScroll from "react-infinite-scroll-component";
import LinearProgress from "@mui/material/LinearProgress";
import FormDialog from "../dialog";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { AllSaloons } from "../../services/AllSaloons";
import { Link, useLocation } from "react-router-dom";
import Img from "../../../assets/images/backlog1.jpg";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import RestoreFromTrashOutlinedIcon from "@mui/icons-material/RestoreFromTrashOutlined";
import Deletepopup from "./SaloonDel";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import OwnerViews from "./OwnerViews";
import Avatar from "../../../assets/images/avatar.png";
import OwnerUpdate from "./OwnerUpdate";
import BlockOwner from "./blockSalonOwner";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import AddUser from "../users/AddUser";

export default function Category(props, { columns, data }) {
  const [dataUser, setdataUser] = useState([]);
  const [netcheckk, setNetcheckk] = useState(false);
  const [respchange, setrespchange] = useState(false);
  const [open, setOpen] = useState(props.open);
  const [loader, setLoader] = useState(false);
  const [viewResp, setvewiResp] = useState(null);
  const [loader3, setLoader3] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [loader4, setLoader4] = useState(false);
  const [loader6, setLoader6] = useState(false);
  const [loader7, setLoader7] = useState(false);

  const [delId, setdelId] = useState();
  const [status, setStatus] = useState();
  const [addId, setaddId] = useState();
  const [updated, setUpdated] = useState(false);
  const [searchMenu, setsearchMenu] = useState("");
  const [pgNo, setpgNo] = useState(1);
  const [blockedyes, setBlockedyes] = useState("");
  const [perPg, setperPg] = useState(10);
  const [change, setChange] = useState(false);
  const [sortedField, setSortedField] = React.useState(null);
  let sortedProducts = [...dataUser];
  const [Totalarray, settoTalarray] = useState("");
  const [fileterbool, setFilterBool] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [fdate, setFdate] = useState("");
  const [lDate, setLdate] = useState("");
  const [excelarray, setdownloadarray] = useState([]);
  const [newStats, setNewStats] = useState();
  const [form2, setForm2] = useState();

  const [state, setState] = useStateWithCallbackLazy({
    pgNo: 0,
    perPg: 10,
    loader: true,
  });
  console.log("props==>", data);
  const closeModal = () => setFilterBool(false);
  const downloadData = [];
  // const location=useLocation();
  // console.log("location===>",location)

  console.log(dataUser, "dataaaa araaay");

  const addNewList = (obj) => {
    let changing = [...dataUser];
    // let findelement = changing.length;
    changing.unshift(obj);
    setdataUser(changing);
    console.log(changing, "final");
  };

  const updatestate = (message) => {
    debugger;
    setUpdated((prev) => !prev);
    notify(`${message}`, "success");
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

  const handleupdate = (id, obj, img, adddrees, images) => {
    // console.log(id, "id", obj, "obj", img, "img");

    let changing = [...dataUser];
    let findelement = changing.findIndex((ii) => ii._id == id);
    changing[findelement].Saloon_name = obj.Saloon_name;
    changing[findelement].phoneNumber = obj.phoneNumber;
    changing[findelement].location = adddrees;
    changing[findelement].about = obj.about;
    changing[findelement].avatar = img;
    changing[findelement].certification = images;

    setdataUser(changing);
  };
  const handleblocked = (id_block) => {
    console.log(id_block, "id_block");
    // debugger
    let statusblock;
    let changing = [...dataUser];
    let findelement = changing.findIndex((ii) => ii._id == id_block);
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

  const viewdata = (resp) => {
    setLoader6(true);
    // setvewiResp(resp);
    setdelId(resp);
  };
  const Userupdated = (resp) => {
    setLoader4(true);
    setaddId(resp);
  };
  const adduser = () => {
    setLoader7(true);
  };
  const addagainblock = (id, activation) => {
    console.log(activation, "<==activation");
    setLoader3(true);
    setaddId(id);
    setNewStats(activation);
  };
  const addagain = (id) => {
    setLoader1(true);
    setaddId(id);
  };
  const blockUser = (id, value) => {
    setLoader2(true);
    setdelId(id);
    setStatus(value);
  };
  const getApiCall = () => {
    // setpgNo(pgNo + 1);
    setOpen(true);
    setState({
      ...state,
      pgNo: state.pgNo + 1,
      loader: true,
    });
    setChange((prev) => !prev);
  };
  const deletereport = (id) => {
    setLoader1(true);
    setdelId(id);
  };
  const dialog = (id) => {
    setLoader(true);
    setdelId(id);
    // setblockhai(blockhai);
  };
  const netcheck = () => {
    if (!window.navigator.onLine) {
      console.log(!window.navigator.onLine, "no nett");
      notify("Network not found");
      setOpen(false);
      setNetcheckk(true);
    }
  };
  const filterfun = () => {
    setSortedField(null);
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
  console.log(user, "<==user");
  useEffect(() => {
    netcheck();
    let query = `?page=${state.pgNo}${
      searchMenu ? `&search=${searchMenu}` : ""
    }`;

    AllSaloons(query)
      .then(({ data }) => {
        setOpen(true);
        console.log("user category=>>", data);
        setState({
          ...state,
          loader: false,
        });
        if (data) {
          setOpen(false);
        }
        if (data && data.data && data.data?.length) {
          let newww = [...dataUser];
          data.data.forEach((element) => {
            let findAnyelement = newww.findIndex((ii) => ii._id == element._id);
            if (findAnyelement < 0) {
              newww = [...newww, element];
            }
          });
          setdataUser(newww);
        }
      })
      .catch((err) => {
        setState({
          ...state,
          loader: false,
        });
        setOpen(false);
      });
    // setStatus({...status})
  }, [updated, change]);

  const downloadapi = () => {
    AllSaloons()
      .then(({ data: { data } }) => {
        console.log(data.reports, "dowanloadd checkk");
        setdownloadarray(data.reports);
        console.log(excelarray, "leveel");
        downloadExcel(data.reports);
        setOpen(false);
      })
      .catch((err) => {});
  };

  const downloadExcel = (resp) => {
    downloadData.length = 0;
    resp.map((items, index) => {
      const tempObj = {
        Sr_No: index + 1,
        Created_Date: moment(items.createdAt).format("MMM Do YY"),
        Title: items.title,
        Condition: items.waveForm,
        WaveSize: items.waveSize,
        Location: items.locationTitle,
        Live_Status: items.isBlocked ? "Blocked" : "Live",
        ReportBy: items?.user?.email,
      };
      downloadData.push(tempObj);
    });

    console.log(downloadData);
    const workSheet = XLSX.utils.json_to_sheet(downloadData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Reports");

    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });

    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

    XLSX.writeFile(workBook, "Reports Data.xlsx");
  };
  if (sortedField !== null) {
    sortedProducts.sort((a, b) => {
      if (sortedField == "firstName") {
        if (a.user[sortedField] < b.user[sortedField]) {
          return -1;
        }
        if (a.user[sortedField] > b.user[sortedField]) {
          return 1;
        }
      } else {
        if (a[sortedField] < b[sortedField]) {
          return -1;
        }
        if (a[sortedField] > b[sortedField]) {
          return 1;
        }
      }
      return 0;
    });
  }
  const FilterDate = (firstdte, lstdte) => {
    netcheck();
    setState(
      {
        ...state,
        pgNo: 1,
      },
      (va) => {
        emptyforce();
        setFdate(firstdte);
        setLdate(lstdte);
        closeModal();
        setOpen(true);
        setrespchange(true);
        console.log("value", va);
      }
    );
  };
  const addCategorryy = (obj, img) => {
    console.log(obj, img, "returnnn");
  };

  return (
    <div className="users_table category">
      <div className="titlee">
        <h2>Salon Owner</h2>
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
                Add Salon Owner
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
                          sortedField
                            ? filterfun()
                            : setSortedField("Saloon_name")
                        }
                      />
                    </TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Location</TableCell>
                    {/* <TableCell align="center">Hour Rate</TableCell> */}
                    <TableCell align="center" colSpan={4}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedProducts.map((dats, i) => {
                    // console.log("dats==>",dats)
                    return (
                      <>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">{i + 1} </TableCell>
                          {/* <TableCell align="center">
                        {moment(dats.createdAt).format("Do MMM YY")}
                      </TableCell> */}
                          <TableCell align="center">
                            <img
                              src={dats?.avatar ? dats?.avatar : Avatar}
                              className="profille"
                            />
                          </TableCell>
                          <TableCell align="center">
                            {dats?.Saloon_name}{" "}
                          </TableCell>
                          <TableCell align="center">
                            {dats?.email ? dats?.email : "N/A"}
                          </TableCell>
                          <TableCell align="center">
                            {dats?.location?.address
                              ? dats?.location?.address
                              : "N/A"}
                          </TableCell>

                          <TableCell align="right">
                            <button
                              className="bttn btn-success"
                              type="button"
                              onClick={() => {
                                viewdata(dats);
                              }}
                            >
                              <VisibilityIcon />
                            </button>
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

            {loader4 ? (
              <OwnerUpdate
                // form2={form2}
                //   setform2={setForm2}
                id={addId}
                updstate={updatestate}
                update={handleupdate}
                close={setLoader4}
              />
            ) : (
              ""
            )}
            {loader2 ? (
              <BlockOwner
                id={delId}
                status={status}
                updstate={updatestate}
                blocked={handledelete}
                close={setLoader2}
              />
            ) : (
              ""
            )}
            {loader3 ? (
              <AddReportagain
                id={addId}
                newStats={newStats}
                setNewStats={setNewStats}
                updstate={updatestate}
                unblocked={handleblocked}
                close={setLoader3}
              />
            ) : (
              ""
            )}
            {loader6 ? (
              <OwnerViews
                resp={delId}
                close={setLoader6}
                // update={addCategorryy}
              />
            ) : (
              ""
            )}
          </>
        )}

        {netcheckk ? (
          <div className="loaderr">
            <img src={Caution}></img>
            <h3>Your connection is not available</h3>
          </div>
        ) : (
          ""
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
                  Add Salon Owner
                </Button>
              </div>
              <p className="search_view ml-2 font-weight-bold">
                No Record Found!
              </p>
            </>
          )
        )}
        <FormDialog
          open={fileterbool}
          handleClose={closeModal}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          callback={FilterDate}
        />
        {loader7 ? (
          <AddUser
            updstate={updatestate}
            close={setLoader7}
            update={addNewList}
            role="owner"
          />
        ) : (
          ""
        )}
      </TableContainer>
    </div>
  );
}
