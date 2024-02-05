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
import AddUser from "../users/AddUser";
import XLSX from "xlsx";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import moment from "moment";
import Switch from "@mui/material/Switch";
import InfinitScroll from "react-infinite-scroll-component";
import LinearProgress from "@mui/material/LinearProgress";
import FormDialog from "../dialog";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { UserapiData } from "../../services/UserApi";

export default function BasicTable(props) {
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
  const [blockhai, setblockhai] = useState();
  const [addId, setaddId] = useState();
  const [excelarray, setdownloadarray] = useState([]);
  const [state, setState] = useStateWithCallbackLazy({
    pgNo: 1,
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
    setUpdated((prev) => !prev);
    notify(`${message}`, "success");
  };
  const handleblocked = (id_block) => {
    let statusblock;
    let changing = [...dataUser];
    let findelement = changing.findIndex((ii) => ii._id == id_block);
    if (changing[findelement].isBlock == true) {
      statusblock = false;
    } else {
      statusblock = true;
    }
    changing[findelement].isBlock = statusblock;
    console.log(changing, "changeddd");
    setdataUser(changing);
    setBlockedyes("");
  };
  const justblocked = (id_block) => {
    let statusblock;
    let changing = [...dataUser];
    let findelement = changing.findIndex((ii) => ii._id == id_block);
    changing[findelement].isBlock = statusblock;
    console.log(changing, "changeddd");
    setdataUser(changing);
    setBlockedyes("");
  };
  const handledelete = (id_delete) => {
    let statusblock;
    let changing = [...dataUser];
    let findelement = changing.findIndex((ii) => ii._id == id_delete);
    if (changing[findelement].isDelete == true) {
      statusblock = false;
    } else {
      statusblock = true;
    }

    changing[findelement].isDelete = statusblock;
    console.log(changing, "changeddd");
    setdataUser(changing);
    setBlockedyes("");
  };
  const handleupdate = (id, obj, pic, phone) => {
    console.log(phone, "id update");
    let changing = [...dataUser];
    let findelement = changing.findIndex((ii) => ii._id == id);
    changing[findelement].name = obj.name;
    changing[findelement].phoneNumber = phone;
    changing[findelement].profilePic = pic;
    setdataUser(changing);
  };
  const addNewList = (obj)=>{
    let changing = [...dataUser];
    // let findelement = changing.length;
    changing.unshift(obj)
    setdataUser(changing);
    console.log(changing,"final")

  }
  const Userupdated = (resp) => {
    setLoader4(true);
    setaddId(resp);
  };
  const dialog = (id, blockhai) => {
    setLoader(true);
    setdelId(id);
    setblockhai(blockhai);
  };
  const addagain = (id) => {
    setLoader1(true);
    setaddId(id);
  };
  const blockUser = (id) => {
    setLoader2(true);
    setdelId(id);
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
    setdataUser([]);
    setState({
      ...state,
      pgNo: 1,
    });
    // setpgNo(1)
    setUpdated((prev) => !prev);
  };

  const {
    user: { user },
  } = useSelector((state) => state);
  console.log(user);
  useEffect(() => {
    netcheck();

    let query = `?pageNo=${state.pgNo}
    &perPage=${state.perPg} 
    ${
      searchMenu ? `&search=${searchMenu}` : ""
    }`;
    UserapiData(query)
      .then(({ data }) => {
        console.log("user response", data);
        setState({
          ...state,
          loader: false,
        });
        if (data) {
          setOpen(false);
        }
        if (data && data && data?.user.users?.length) {
          let newww = [...dataUser];
          data.user.users.forEach((element) => {
            let findAnyelement = newww.findIndex(
              (ii) => ii._id === element._id
            );
            if (findAnyelement < 0) {
              newww = [...newww, element];
            }
          });
          setdataUser(newww);
          console.log(newww, state.pgNo, "last addedd");
          settoTalarray(data.user.count);
        }
      })
      .catch((err) => {
        console.log(err, "eerrrrorr");
        setState({
          ...state,
          loader: false,
        });
      });
  }, [updated, change]);

  const downloadapi = () => {
    UserapiData()
      .then(({ data: { data } }) => {
        console.log(data.user, "dowanloadd checkk");
        setdownloadarray(data.user);
        console.log(excelarray, "leveel");
        downloadExcel(data.users);
        setOpen(false);
      })
      .catch((err) => {});
  };
  const filterfun = () => {
    setSortedField("");
  };
  const getApiCall = () => {
    setState({
      ...state,
      pgNo: state.pgNo + 1,
      loader: true,
    });
    setChange((prev) => !prev);
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
  return (
    <div className="users_table">
      <div className="titlee">
        <h2>Users</h2>
      </div>
      <div className="search_view">
        <input
          type="search"
          placeholder="Search..."
          value={searchMenu}
          onChange={(e) => {
            setsearchMenu(e.target.value);
            emptyforce();
          }}
        ></input>
      </div>
      <TableContainer component={Paper}>
        <div className="excle_btn">
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              adduser();
            }}
          >
            Add User
          </Button>
        </div>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <InfinitScroll
            dataLength={dataUser.length}
            next={getApiCall}
            hasMore={true}
            loader={state.loader ? <LinearProgress /> : ""}
          >
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
                <TableCell align="center"></TableCell>

                <TableCell align="center">Email</TableCell>
                <TableCell align="center"></TableCell>

                <TableCell align="center" colSpan={3}>
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
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">{i + 1} </TableCell>
                      {/* <TableCell align="center">
                        {moment(dats.createdAt).format("Do MMM YY")}
                      </TableCell> */}
                      <TableCell align="center">
                        <img
                          src={dats.profilePic ? dats.profilePic : Avatar}
                          className="profille"
                        />
                      </TableCell>
                      <TableCell align="center">{dats.name} </TableCell>
                      <TableCell align="center"></TableCell>

                      <TableCell align="center">{dats.email}</TableCell>
                      <TableCell align="center"></TableCell>

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
                      <TableCell align="right">
                        <button
                          className={
                            "bttn btn-" + (dats.isDelete ? "success" : "danger")
                          }
                          type="button"
                          onClick={() => {
                            dats.isDelete
                              ? addagain(dats._id)
                              : dialog(dats._id, dats.isBlock);
                          }}
                        >
                          {dats.isDelete ? (
                            <AddCircleOutlineIcon />
                          ) : (
                            <DeleteForeverSharpIcon />
                          )}
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
                      <TableCell align="left">
                        <label>
                          {dats.isBlock || dats.isDelete ? "Blocked" : "Live"}
                        </label>
                        <Switch
                          className={dats.isDelete ? "deactive" : "active"}
                          onClick={() => {
                            dats.isBlock
                              ? addagainblock(dats._id)
                              : blockUser(dats._id);
                          }}
                          checked={!dats.isBlock && !dats.isDelete}
                          color={dats.isBlock ? "warning" : "success"}
                        />
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </InfinitScroll>
        </Table>

        {loader ? (
          <Deletepopup
            id={delId}
            block={blockhai}
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
          <BlockUser
            id={delId}
            updstate={updatestate}
            blocked={handleblocked}
            close={setLoader2}
          />
        ) : (
          ""
        )}
        {loader3 ? (
          <Addblockagain
            id={addId}
            updstate={updatestate}
            unblocked={handleblocked}
            close={setLoader3}
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
        {loader5 ? <UserView resp={delId} close={setLoader5} /> : ""}
        {loader6 ? <AddUser updstate={updatestate} close={setLoader6}  update={addNewList} new /> : ""}
      </TableContainer>
      {open ? <img src={Loadering} className="loaderr" /> : ""}
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
    </div>
  );
}
