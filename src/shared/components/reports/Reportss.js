import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BlockSharpIcon from "@mui/icons-material/BlockSharp";
import axios from "axios";
import { useSelector } from "react-redux";
import ReportView from "./ReportView";
import ReportBlock from "./ReportBlock";
import AddReportagain from "./AddReportagain";
import DeleteReport from "./DeleteReport";
import ReportUpdate from "./ReportUpdate";
import { notify } from "../../utils/notify";
import CircularProgress from "@mui/material/CircularProgress";
import Loadering from "../../../assets/images/loading.gif";
import Caution from "../../../assets/images/caution.jpg";
import XLSX from "xlsx";
import { Button } from "@material-ui/core";
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
import { ReportapiData } from "../../services/ReportApi";
export default function ReportsTable(props, { columns, data }) {
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
  const [delId, setdelId] = useState();
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

  const [state, setState] = useStateWithCallbackLazy({
    pgNo: 1,
    perPg: 10,
    loader: true,
  });
  const closeModal = () => setFilterBool(false);
  const downloadData = [];

  const updatestate = (message) => {
    setUpdated((prev) => !prev);
    notify(`${message}`, "success");
  };
  const handleupdate = (id, obj, img) => {
    console.log(id, "id update");
    let changing = [...dataUser];
    let findelement = changing.findIndex((ii) => ii._id == id);
    changing[findelement].title = obj.title;
    changing[findelement].description = obj.description;
    changing[findelement].waveSize = obj.waveSize;
    changing[findelement].waveForm = obj.waveForm;
    changing[findelement].images = img;

    setdataUser(changing);
  };
  const handleblocked = (id_block) => {
    let statusblock;
    let changing = [...dataUser];
    let findelement = changing.findIndex((ii) => ii._id == id_block);
    if (changing[findelement].isBlocked == true) {
      statusblock = false;
    } else {
      statusblock = true;
    }
    changing[findelement].isBlocked = statusblock;
    console.log(changing, "changeddd");
    setdataUser(changing);
    setBlockedyes("");
  };
  const viewdata = (resp) => {
    setLoader(true);
    setvewiResp(resp);
  };
  const Userupdated = (resp) => {
    setLoader4(true);
    setaddId(resp);
  };
  const addagainblock = (id) => {
    setLoader3(true);
    setaddId(id);
  };
  const blockUser = (id) => {
    setLoader2(true);
    setdelId(id);
  };
  const getApiCall = () => {
    // setpgNo(pgNo + 1);
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
    let query = `?pageNo=${state.pgNo}&perPage=${state.perPg}${
      searchMenu ? `&search=${searchMenu}` : ""
    }${fdate ? `&startDate=${fdate}` : ""}${lDate ? `&endDate=${lDate}` : ""} `;
     
    ReportapiData(query)
      .then(({ data }) => {
        console.log("user response", data);
        setState({
          ...state,
          loader: false,
        });
        if (data) {
          setOpen(false);
        }
        if (data && data.data && data.data?.reports?.length) {
          let newww = [...dataUser];
          data.data.reports.forEach((element) => {
            let findAnyelement = newww.findIndex((ii) => ii._id == element._id);
            if (findAnyelement < 0) {
              newww = [...newww, element];
            }
          });
          setdataUser(newww);
          settoTalarray(data.data.count);
        }
      })
      .catch((err) => {
        setState({
          ...state,
          loader: false,
        });
      });

  }, [updated, change]);

  const downloadapi = () => {
    ReportapiData()
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
  return (
    <div className="users_table">
      <div className="titlee">
        <h2>Report List</h2>
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
          {!fdate ? (
            <Button
              className="excle_innbtn"
              onClick={() => setFilterBool(true)}
            >
              <FilterAltIcon />
            </Button>
          ) : (
            <Button
              className="excle_innbtn"
              onClick={() => {
                setState(
                  {
                    ...state,
                    pgNo: 1,
                  },
                  () => {
                    emptyforce();
                    setFdate("");
                    setLdate("");
                    setStartDate(null);
                    setEndDate(null);
                    setrespchange(false);
                    setOpen(true);
                  }
                );
              }}
            >
              <RotateLeftIcon />
            </Button>
          )}
          <Button
            className="excle_innbtn"
            onClick={() => {
              downloadapi();
              setOpen(true);
            }}
          >
            Download Reports Data <FileDownloadIcon />
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
                <TableCell align="center">
                  Date
                  <SortIcon
                    className="filterr"
                    onClick={() =>
                      sortedField ? filterfun() : setSortedField("createdAt")
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  Title
                  <SortIcon
                    className="filterr"
                    onClick={() =>
                      sortedField ? filterfun() : setSortedField("title")
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  locationTitle
                </TableCell>
                <TableCell align="center">
                  Wave Size
                  <SortIcon
                    className="filterr"
                    onClick={() =>
                      sortedField ? filterfun() : setSortedField("waveSize")
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  Wave Form
                  <SortIcon
                    className="filterr"
                    onClick={() =>
                      sortedField ? filterfun() : setSortedField("waveForm")
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  Report By
                  {/* <SortIcon
                    className="filterr"
                    onClick={() => {
                      sortedField ? filterfun() : setSortedField("firstName");
                    }}
                  /> */}
                </TableCell>

                <TableCell align="center" colSpan={3}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log("latest", dataUser)}
              {sortedProducts.map((dats, i) => {
                return (
                  <>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">{i + 1} </TableCell>
                      <TableCell align="center">
                        {moment(dats.createdAt).format("Do MMM YY")}
                      </TableCell>
                      <TableCell align="center">{dats.title} </TableCell>
                      <TableCell align="center">{dats.locationTitle}</TableCell>
                      <TableCell align="center">{dats.waveSize}</TableCell>
                      <TableCell align="center">{dats.waveForm}</TableCell>
                      {respchange ? (
                        <TableCell>
                          {dats.user &&
                            dats.user.map((item, i) => {
                              return <>{item.firstName}</>;
                            })}
                        </TableCell>
                      ) : (
                        <TableCell>
                          {dats.user && dats.user.firstName}
                        </TableCell>
                      )}
                      <TableCell align="center">
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
                      <TableCell align="left">
                        <div className="statuss">
                          <label>{dats.isBlocked ? "Blocked" : "Live"}</label>
                          <Switch
                            onClick={() => {
                              dats.isBlocked
                                ? addagainblock(dats._id)
                                : blockUser(dats._id);
                            }}
                            checked={!dats.isBlocked}
                            color={dats.isBlocked ? "warning" : "success"}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </InfinitScroll>
        </Table>
        {loader ? <ReportView resp={viewResp} close={setLoader} /> : ""}
        {loader4 ? (
          <ReportUpdate
            id={addId}
            updstate={updatestate}
            update={handleupdate}
            close={setLoader4}
          />
        ) : (
          ""
        )}
        {loader1 ? (
          <DeleteReport id={delId} updstate={updatestate} close={setLoader1} />
        ) : (
          ""
        )}
        {loader2 ? (
          <ReportBlock
            id={delId}
            updstate={updatestate}
            blocked={handleblocked}
            close={setLoader2}
          />
        ) : (
          ""
        )}
        {loader3 ? (
          <AddReportagain
            id={addId}
            updstate={updatestate}
            unblocked={handleblocked}
            close={setLoader3}
          />
        ) : (
          ""
        )}
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
      <FormDialog
        open={fileterbool}
        handleClose={closeModal}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        callback={FilterDate}
      />
    </div>
  );
}
