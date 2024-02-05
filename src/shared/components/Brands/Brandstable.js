// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
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
// import Deletepopup from "../reports/DeleteReport";
// import DeleteReport from "../reports/DeleteReport";
// import EditIcon from "@mui/icons-material/Edit";
// import AddUser from "../reports/Addpoup";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";
// import { BrandsApi } from "../../services/BrandsApi";
// import { BrandsApiAll } from "../../services/BrandsApiAll";
// import AddReportagain from "../reports/AddReportagain";
// import BrandsUpdate from "../Brands/Brands_update";
// import BrandsAaddPopup from "../Brands/BrandsAddPopup";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
// import EditSharpIcon from "@mui/icons-material/EditSharp";

// export default function Brands(props, { columns, data }) {
//   const [dataUser, setdataUser] = useState([]);
//   const [category_listing, setcategory_listing] = useState([]);
//   const [netcheckk, setNetcheckk] = useState(false);
//   const [erroring, seterror] = useState(false);
//   const [respchange, setrespchange] = useState(false);
//   const [open, setOpen] = useState(props.open);
//   const [loader, setLoader] = useState(false);
//   const [viewResp, setvewiResp] = useState(null);
//   const [idcat, setidcat] = useState();
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
//   const [Category_list, setCategory_list] = useState("");
//   const [catID, setcATid] = useState("");
//   const [array, setaray] = useState([]);

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
//     changing[findelement].brandPic = img;
//     setdataUser(changing);
//   };
//   const addCategorryy = (obj, img) => {
//     let changing = [...dataUser];
//     console.log(obj.categoryId, "id");

//     let findelement = changing.findIndex(
//       (ii) => ii.categoryId.id == obj.categoryId
//     );
//     let live = changing[findelement].categoryId;
//     console.log(live.id, "ffii");
//     console.log(findelement, "inde");

//     let obj1 = {
//       name: obj.name,
//       brandPic: img,
//     };
//     console.log(obj1, "objet");

//     if (findelement == 0) {
//       debugger;
//       changing.push(obj1);
//     }
//     setdataUser(changing);

//     console.log(dataUser, "returnnn");

//     console.log(obj, img, "returnnn");
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
//   console.log(idcat, "idd he cat ki");
//   const {
//     user: { user },
//   } = useSelector((state) => state);
//   console.log(user);
//   useEffect(() => {
//     netcheck();

//     ReportapiData()
//       .then(({ data }) => {
//         setState({
//           ...state,
//           loader: false,
//         });
//         if (data) {
//           setOpen(false);
//           let temp = [...data.category];
//           console.log(temp, "wsyyyy");
//           let obj = {
//             name: "All",
//             isDelete: false,
//             id: "allCategory",
//             categoryPic: "empty",
//           };
//           temp.unshift(obj);
//           console.log(temp, "wsyyyy bad");

//           setcategory_listing(temp);

//           let firstid = Category_list ? Category_list : temp[0].id;
//           console.log(firstid, "first id a gya");
//           if (firstid === "allCategory") {
//             brandsApiAllcall();
//           } else {
//             brandsApicall(firstid);
//           }
//         }
//       })
//       .catch((err) => {
//         setState({
//           ...state,
//           loader: false,
//         });
//       });
//   }, [change]);

//   const findId = (value) => {
//     let id = "";
//     let clone = [...category_listing];
//     clone.forEach((element) => {
//       let findIndexId = clone.findIndex((ii) => ii.name == value);
//       console.log(findIndexId, "index agai he");
//       id = clone[findIndexId].id;
//       console.log(id, "ID agai he");
//       setcATid(id);
//     });
//     if (id === "allCategory") {
//       brandsApiAllcall();
//     } else {
//       brandsApicall(id);
//     }
//   };

//   const brandsApiAllcall = (search) => {
   

//     let query = `${search ? `?search=${search}` : ""}`;

//     setOpen(true);
//     BrandsApiAll(query)
//       .then(({ data }) => {
//         if(data.category ==''){
//           seterror(true)
//         }
//         else{
//           seterror(false)

//         }
//         console.log("brands all list", data);
//         setOpen(false);
//         setdataUser(data.category);
//       })
//       .catch((err) => {
//         if (err.response.data.error) {
//           setOpen(false);
//           notify(err.response.data.error, "Success");
//           setdataUser([]);
//         }
//         console.log(err.response.data.error, "errr");
//       });
//   };
//   const brandsApicall = (id, search) => {
//     console.log(id, "iddd");

//     let query = `${search ? `?search=${search}` : ""}`;
//     if (id) {
//       id = id;
//     } else if (catID) {
//       id = catID;
//     } else {
//       id = category_listing[1].id;
//     }
//     setOpen(true);
//     BrandsApi(id, query)
//       .then(({ data }) => {
//         if(data.category ==''){
//           seterror(true)
//         }
//         else{
//           seterror(false)

//         }
//         console.log("brands list", data);
//         setOpen(false);
//         setdataUser(data.category);
//       })
//       .catch((err) => {
        
//         setOpen(false);
//       });
//   };

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

//   return (
//     <div className="users_table category">
//       <div className="titlee">
//         <h2>SUB-CATEGORY</h2>
//       </div>
//       <div className="search_view">
//         <input
//           type="search"
//           placeholder="Search..."
//           value={searchMenu}
//           onChange={(e) => {
//             setsearchMenu(e.target.value);
//             emptyforce();
//             {catID ? brandsApicall("", e.target.value):brandsApiAllcall(e.target.value) }
//             ;
//           }}
//         ></input>
//       </div>
//       <div className="category_main">
//         <div className="excle_btn listing">
//           <TextField
//             id="outlined-select-currency"
//             className="flo"
//             select
//             label="Category"
//             value={Category_list}
//             onChange={(e) => {
//               setCategory_list(e.target.value);
//               findId(e.target.value);
//             }}
//           >
//             {category_listing
//               .map((option) => (
//                 <MenuItem key={option.id} value={option.name}>
//                   {option.name}
//                 </MenuItem>
//               ))}
//           </TextField>

//           <Button
//             variant="contained"
//             color="success"
//             onClick={() => {
//               adduser();
//             }}
//           >
//             Add SUB-CATEGORY
//           </Button>
//         </div>
//         <TableContainer component={Paper}>

//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
       
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center">SR</TableCell>
//                 <TableCell align="center">SUB CATEGORY</TableCell>
//                 <TableCell align="center">
//                   BY CATEGORY
//                 </TableCell>
//                 <TableCell align="center" colSpan={3}>
//                   Action
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {dataUser.map((dats, i) => {
//                 // console.log(dats.parentCategory?.name,"dattsssss")
//                 return (
//                   <>
//                     <TableRow
//                       sx={{
//                         "&:last-child td, &:last-child th": { border: 0 },
//                       }}
//                     >
//                       <TableCell align="center">{i + 1} </TableCell>
//                       <TableCell align="center">{dats.name} </TableCell>
//                       <TableCell align="center">
//                         {dats.parentCategory?.name}
                      
//                       </TableCell>
//                       <TableCell align="right">
//                         <button
//                           className={
//                             "bttn btn-" + (dats.isDelete ? "success" : "danger")
//                           }
//                           type="button"
//                           onClick={() => {
//                             dats.isDelete
//                               ? 
//                               addagainblock(dats.id)
//                               : blockUser(dats?.id)
//                           }}
//                         >
//                           {dats.isDelete ? (
//                             <AddCircleOutlineIcon />
//                           ) : (
//                             <DeleteForeverSharpIcon />
//                           )}
//                         </button>
//                       </TableCell>
//                       <TableCell align="center">
//                         <button
//                           onClick={() => {
//                             Userupdated(dats);
//                           }}
//                           className="bttn btn btnupdate"
//                           type="button"
//                         >
//                           <EditSharpIcon />
//                         </button>
//                       </TableCell>
//                       <TableCell align="left">
//                         <label>
//                           {dats.isBlock || dats.isDelete ? "Blocked" : "Live"}
//                         </label>
//                         <Switch
//                           className={dats.isDelete ? "deactive" : "active"}
//                           checked={!dats.isBlock && !dats.isDelete}
//                           color={dats.isBlock ? "warning" : "success"}
//                         />
//                       </TableCell>
//                     </TableRow>
//                   </>
//                 );
//               })}
//             </TableBody>
//         </Table>
//         </TableContainer>
//       </div>
//       {loader4 ? (
//         <BrandsUpdate
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
//           module="brands"

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
//           module="brands"

//         />
//       ) : (
//         ""
//       )}
//       {loader6 ? (
//         <BrandsAaddPopup
//           updstate={updatestate}
//           moduulee="Sub-Category"
//           previos="Category"
//           close={setLoader6}
//           update={addCategorryy}
//         />
//       ) : (
//         ""
//       )}

//       {open ? <img src={Loadering} className="loaderr" /> : ""}
//       {erroring ? (
//         <div className="loaderr">
//           <h3>No record found !!</h3>
//         </div>
//       ) : (
//         ""
//       )}
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
