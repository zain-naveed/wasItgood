// import React, { useState, useEffect } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import EditSharpIcon from "@mui/icons-material/EditSharp";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import BlockSharpIcon from "@mui/icons-material/BlockSharp";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import ReportView from "./ReportView";
// import ReportBlock from "./ReportBlock";
// import AddReportagain from "./AddReportagain";
// import DeleteReport from "../saloonOwner/SaloonDel";
// import ReportUpdate from "./ReportUpdate";
// import { notify } from "../../utils/notify";
// import CircularProgress from "@mui/material/CircularProgress";
// import Loadering from "../../../assets/images/loading.gif";
// import Caution from "../../../assets/images/caution.jpg";
// import XLSX from "xlsx";
// import { Button } from "@material-ui/core";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import SortIcon from "@mui/icons-material/Sort";
// import moment from "moment";
// import Switch from "@mui/material/Switch";
// import InfinitScroll from "react-infinite-scroll-component";
// import LinearProgress from "@mui/material/LinearProgress";
// import FormDialog from "../dialog";
// import { useStateWithCallbackLazy } from "use-state-with-callback";
// import RotateLeftIcon from "@mui/icons-material/RotateLeft";
// import { ReportapiData } from "../../services/ReportApi";
// import { Link } from "react-router-dom";
// import Img from "../../../assets/images/backlog1.jpg";
// import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
// import RestoreFromTrashOutlinedIcon from "@mui/icons-material/RestoreFromTrashOutlined";
// import Deletepopup from "../saloonOwner/SaloonDel";
// import EditIcon from "@mui/icons-material/Edit";
// import AddUser from "../reports/Addpoup";
// import RefreshIcon from '@mui/icons-material/Refresh';
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

// export default function Category(props, { columns, data }) {
//   const [dataUser, setdataUser] = useState([]);
//   const [netcheckk, setNetcheckk] = useState(false);
//   const [respchange, setrespchange] = useState(false);
//   const [open, setOpen] = useState(props.open);
//   const [loader, setLoader] = useState(false);
//   const [viewResp, setvewiResp] = useState(null);
//   const [loader3, setLoader3] = useState(false);
//   const [loader1, setLoader1] = useState(false);
//   const [loader2, setLoader2] = useState(false);
//   const [loader4, setLoader4] = useState(false);
//   const [loader6, setLoader6] = useState(false);
//   const [delId, setdelId] = useState();
//   const [addId, setaddId] = useState();
//   const [updated, setUpdated] = useState(false);
//   const [searchMenu, setsearchMenu] = useState("");
//   const [pgNo, setpgNo] = useState(1);
//   const [blockedyes, setBlockedyes] = useState("");
//   const [perPg, setperPg] = useState(10);
//   const [change, setChange] = useState(false);
//   const [sortedField, setSortedField] = React.useState(null);
//   let sortedProducts = [...dataUser];
//   const [Totalarray, settoTalarray] = useState("");
//   const [fileterbool, setFilterBool] = useState(false);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [fdate, setFdate] = useState("");
//   const [lDate, setLdate] = useState("");
//   const [excelarray, setdownloadarray] = useState([]);

//   const [state, setState] = useStateWithCallbackLazy({
//     pgNo: 1,
//     perPg: 10,
//     loader: true,
//   });
//   const closeModal = () => setFilterBool(false);
//   const downloadData = [];

//   console.log(dataUser, "dataaaa araaay");
//   const updatestate = (message) => {
//     setUpdated((prev) => !prev);
//     notify(`${message}`, "success");
//   };
//   const handleupdate = (id, obj, img) => {
//     console.log(id, "id", obj, "obj", img, "img");
//     let changing = [...dataUser];
//     let findelement = changing.findIndex((ii) => ii.id == id);
//     changing[findelement].name = obj.name;
//     changing[findelement].categoryPic = img;
//     setdataUser(changing);
//   };
//   const handleblocked = (id_block) => {
//     let statusblock;
//     let changing = [...dataUser];
//     let findelement = changing.findIndex((ii) => ii.id == id_block);
//     if (changing[findelement].isDelete == true) {
//       statusblock = false;
//     } else {
//       statusblock = true;
//     }
//     changing[findelement].isDelete = statusblock;
//     console.log(changing, "changeddd");
//     setdataUser(changing);
//     setBlockedyes("");
//   };
//   const viewdata = (resp) => {
//     setLoader(true);
//     setvewiResp(resp);
//   };
//   const Userupdated = (resp) => {
//     setLoader4(true);
//     setaddId(resp);
//   };
//   const adduser = () => {
//     setLoader6(true);
//   };
//   const addagainblock = (id) => {
//     setLoader3(true);
//     setaddId(id);
//   };
//   const blockUser = (id) => {
//     setLoader2(true);
//     setdelId(id);
//   };
//   const getApiCall = () => {
//     // setpgNo(pgNo + 1);
//     setState({
//       ...state,
//       pgNo: state.pgNo + 1,
//       loader: true,
//     });
//     setChange((prev) => !prev);
//   };
//   const deletereport = (id) => {
//     setLoader1(true);
//     setdelId(id);
//   };
//   const netcheck = () => {
//     if (!window.navigator.onLine) {
//       console.log(!window.navigator.onLine, "no nett");
//       notify("Network not found");
//       setOpen(false);
//       setNetcheckk(true);
//     }
//   };
//   const filterfun = () => {
//     setSortedField(null);
//   };
//   const emptyforce = () => {
//     setdataUser([]);
//     setState({
//       ...state,
//       pgNo: 1,
//     });
//     // setpgNo(1)
//     setUpdated((prev) => !prev);
//   };
//   const {
//     user: { user },
//   } = useSelector((state) => state);
//   console.log(user);
//   useEffect(() => {
//     netcheck();
//     let query = `${
//       searchMenu ? `?search=${searchMenu}` : "" }`;

//     ReportapiData(query)
//       .then(({data} ) => {
//         console.log("user category", data);
//         setState({
//           ...state,
//           loader: false,
//         });
//         if (data) {
//           setOpen(false);
//         }
//         if (data && data.category && data.category?.length) {
//           let newww = [...dataUser];
//           data.category.forEach((element) => {
//             let findAnyelement = newww.findIndex((ii) => ii.id == element.id);
//             if (findAnyelement < 0) {
//               newww = [...newww, element];
//             }
//           });
//           setdataUser(newww);
//         }
//       })
//       .catch((err) => {
//         setState({
//           ...state,
//           loader: false,
//         });
//         setOpen(false);
//       });
//   }, [updated, change]);

//   const downloadapi = () => {
//     ReportapiData()
//       .then(({ data: { data } }) => {
//         console.log(data.reports, "dowanloadd checkk");
//         setdownloadarray(data.reports);
//         console.log(excelarray, "leveel");
//         downloadExcel(data.reports);
//         setOpen(false);
//       })
//       .catch((err) => {});
//   };

//   const downloadExcel = (resp) => {
//     downloadData.length = 0;
//     resp.map((items, index) => {
//       const tempObj = {
//         Sr_No: index + 1,
//         Created_Date: moment(items.createdAt).format("MMM Do YY"),
//         Title: items.title,
//         Condition: items.waveForm,
//         WaveSize: items.waveSize,
//         Location: items.locationTitle,
//         Live_Status: items.isBlocked ? "Blocked" : "Live",
//         ReportBy: items?.user?.email,
//       };
//       downloadData.push(tempObj);
//     });

//     console.log(downloadData);
//     const workSheet = XLSX.utils.json_to_sheet(downloadData);
//     const workBook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workBook, workSheet, "Reports");

//     let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });

//     XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

//     XLSX.writeFile(workBook, "Reports Data.xlsx");
//   };
//   if (sortedField !== null) {
//     sortedProducts.sort((a, b) => {
//       if (sortedField == "firstName") {
//         if (a.user[sortedField] < b.user[sortedField]) {
//           return -1;
//         }
//         if (a.user[sortedField] > b.user[sortedField]) {
//           return 1;
//         }
//       } else {
//         if (a[sortedField] < b[sortedField]) {
//           return -1;
//         }
//         if (a[sortedField] > b[sortedField]) {
//           return 1;
//         }
//       }
//       return 0;
//     });
//   }
//   const FilterDate = (firstdte, lstdte) => {
//     netcheck();
//     setState(
//       {
//         ...state,
//         pgNo: 1,
//       },
//       (va) => {
//         emptyforce();
//         setFdate(firstdte);
//         setLdate(lstdte);
//         closeModal();
//         setOpen(true);
//         setrespchange(true);
//         console.log("value", va);
//       }
//     );
//   };
//   const addCategorryy = (obj, img) => {
//     console.log(obj, img, "returnnn");
//   };
//   return (
//     <div className="users_table category">
//       <div className="titlee">
//         <h2>Categories</h2>
//       </div>
//       <div className="search_view">
//         <input
//           type="search"
//           placeholder="Search..."
//           value={searchMenu}
//           onChange={(e) => {
//             setsearchMenu(e.target.value);
//             emptyforce();
//           }}
//         ></input>
//       </div>
//       <div className="category_main">
//         <div className="excle_btn">
//           <Button
//             variant="contained"
//             color="success"
//             onClick={() => {
//               adduser();
//             }}
//           >
//             Add Category
//           </Button>
//         </div>
//         <div className="category_flex">
//           {console.log(dataUser, "jjj")}
//           {dataUser.map((dats, i) => {
//             return (
//               <>
//                 <div className="innerflex">
//                   <div className="cat_img">
//                     <img src={dats.categoryPic ? dats.categoryPic : ""}></img>
//                   </div>
//                   <div className="cat_content">
//                     <div className="content_flex">
//                       <h5>{dats.name}</h5>
//                       <div className="inner_content">
//                         <button
//                           className={
//                             dats.isDelete ? "status_btn_danger" : "status_btn"
//                           }
//                         ></button>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="overlay">
//                     <EditIcon
//                       className="updating"
//                       onClick={() => {
//                         Userupdated(dats);
//                       }}
//                     />
//                     {dats.isDelete ? (
//                       <RefreshIcon
//                         className="minuss green"
//                         onClick={() => {
//                           addagainblock(dats.id);
//                         }}
//                       />
//                     ) : (
//                       <RemoveCircleOutlineOutlinedIcon
//                         className="minuss"
//                         onClick={() => {
//                           blockUser(dats.id);
//                         }}
//                       />
//                     )}
//                     {console.log(dats.id,"iddddd")}
//                     {
//                       dats.isDelete ? "":
                    
//                     <Link to={{
//                     pathname : "/dashboard/products",
//                      }} 
//                      state={{name:dats.id}}>
//                      <VisibilityOutlinedIcon className="viewws"  /> 
//                       </Link>
//           }
//                   </div>
//                 </div>
//               </>
//             );
//           })}
//         </div>
//       </div>
//       {loader4 ? (
//         <ReportUpdate
//           id={addId}
//           updstate={updatestate}
//           update={handleupdate}
//           close={setLoader4}
//         />
//       ) : (
//         ""
//       )}
//       {loader2 ? (
//         <DeleteReport
//           id={delId}
//           updstate={updatestate}
//           delete={handleblocked}
//           close={setLoader2}
//         />
//       ) : (
//         ""
//       )}
//       {loader3 ? (
//         <AddReportagain
//           id={addId}
//           updstate={updatestate}
//           unblocked={handleblocked}
//           close={setLoader3}
//         />
//       ) : (
//         ""
//       )}
//       {loader6 ? (
//         <AddUser
//           updstate={updatestate}
//           close={setLoader6}
//           update={addCategorryy}
//         />
//       ) : (
//         ""
//       )}

//       {open ? <img src={Loadering} className="loaderr" /> : ""}
//       {netcheckk ? (
//         <div className="loaderr">
//           <img src={Caution}></img>
//           <h3>Your connection is not available</h3>
//         </div>
//       ) : (
//         ""
//       )}
//       <FormDialog
//         open={fileterbool}
//         handleClose={closeModal}
//         startDate={startDate}
//         setStartDate={setStartDate}
//         endDate={endDate}
//         setEndDate={setEndDate}
//         callback={FilterDate}
//       />
//     </div>
//   );
// }
