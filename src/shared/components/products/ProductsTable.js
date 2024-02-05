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
import VisibilityIcon from "@mui/icons-material/Visibility";
import { notify } from "../../utils/notify";
import { useSelector } from "react-redux";
import ProductBlock from "./ProductBlock";
import ProductUnblock from "./ProductUnblock";
import ProductView from "./ProductView";
import CircularProgress from "@mui/material/CircularProgress";
import Loadering from "../../../assets/images/loading.gif";
import ProductUpdate from "./ProductUpdate";
import Caution from "../../../assets/images/caution.jpg";
import XLSX from "xlsx";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import moment from "moment";
import SortIcon from "@mui/icons-material/Sort";
import InfinitScroll from "react-infinite-scroll-component";
import LinearProgress from "@mui/material/LinearProgress";
import Switch from "@mui/material/Switch";
import FormDialog from "../dialog";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { ProductapiData } from "../../services/ProductApi";
import AddProduct_pop from "../products/AddProduct_pop";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { ProduuctApiFilter } from "../../services/ProduuctApiFilter";

export default function ProductsTable(props) {
  const location = useLocation();
  const apiId = location?.state?.name;
  const [CatId, setCatId] = useState(apiId);

  const [dataUser, setdataUser] = useState([]);
  const [netcheckk, setNetcheckk] = useState(false);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(props.open);
  const [respchange, setrespchange] = useState(false);

  const [loader1, setLoader1] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const [loader3, setLoader3] = useState(false);
  const [loader4, setLoader4] = useState(false);
  const [blockedyes, setBlockedyes] = useState("");
  const [change, setChange] = useState(false);

  const [fdate, setFdate] = useState("");
  const [lDate, setLdate] = useState("");
  const [excelarray, setdownloadarray] = useState([]);

  const [state, setState] = useStateWithCallbackLazy({
    pgNo: 1,
    perPg: 10,
    loader: true,
  });
  const [delId, setdelId] = useState();
  const [addId, setaddId] = useState();
  const [updated, setUpdated] = useState(false);
  const [searchMenu, setsearchMenu] = useState("");
  const [loader6, setLoader6] = useState(false);

  const [sortedField, setSortedField] = React.useState(null);
  let sortedProducts = [...dataUser];
  const [Totalarray, settoTalarray] = useState("");
  const [fileterbool, setFilterBool] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const downloadData = [];

  const closeModal = () => setFilterBool(false);
  const updatestate = (message) => {
    setUpdated((prev) => !prev);
    notify(`${message}`, "success");
  };
  const handleupdate = (id, obj, productUrl, catName, Bname, catIdd, Bid) => {
    console.log(productUrl, "Imagesss checkk");
    let changing = [...dataUser];
    let findelement = changing.findIndex((ii) => ii._id == id);
    changing[findelement].title = obj.title;
    changing[findelement].description = obj.description;
    changing[findelement].address = obj.address;
    changing[findelement].price = obj.price;
    changing[findelement].images = productUrl;
    changing[findelement].categoryId.name = catName;
    changing[findelement].brandId.name = Bname;
    changing[findelement].categoryId._id = catIdd;
    changing[findelement].brandId._id = Bid;

    setdataUser(changing);
  };
  const addNewList = (obj) => {
    let changing = [...dataUser];
    // let findelement = changing.length;
    changing.unshift(obj);
    setdataUser(changing);
    console.log(changing, "final");
  };
  const picdel = (index, id) => {
    console.log(id, "id update", index, "indexxx");
    let changing = [...dataUser];
    let findelement = changing.findIndex((ii) => ii._id == id);
    console.log(changing[findelement].images, "cheeeeckkk?????");
    changing[findelement].images.splice(index, 1);
    setdataUser(changing);
  };
  const handleblocked = (id_block) => {
    let statusblock;
    let changing = [...dataUser];
    let findelement = changing.findIndex((ii) => ii._id == id_block);
    if (changing[findelement].isDeleted == true) {
      statusblock = false;
    } else {
      statusblock = true;
    }
    changing[findelement].isDeleted = statusblock;
    console.log(changing, "changeddd");
    setdataUser(changing);
    setBlockedyes("");
  };
  const Userupdated = (resp) => {
    setLoader4(true);
    setaddId(resp);
  };
  const ProductViews = (resp) => {
    setLoader(true);
    setdelId(resp);
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
    setUpdated((prev) => !prev);
  };

  useEffect(() => {
    netcheck();
    // let query = `?pageNo=${state.pgNo}&perPage=${state.perPg}${
    //   searchMenu ? `&search=${searchMenu}` : ""
    // }${fdate ? `&startDate=${fdate}` : ""}${lDate ? `&endDate=${lDate}` : ""} `;
    if (CatId) {
      let query = `?pageNo=${state.pgNo}&perPage=${state.perPg} ${
        searchMenu ? `&search=${searchMenu}` : ""
      }`;
      ProduuctApiFilter(CatId, query)
        .then(({ data }) => {
          console.log("Product response", data);
          setState({
            ...state,
            loader: false,
          });
          if (data) {
            setOpen(false);
          }
          if (data && data && data?.product.products?.length) {
            let newww = [...dataUser];
            data.product.products.forEach((element) => {
              let findAnyelement = newww.findIndex(
                (ii) => ii._id == element._id
              );
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
        });
    } else {
      let query = `?pageNo=${state.pgNo}&perPage=${state.perPg} ${
        searchMenu ? `&search=${searchMenu}` : ""
      }`;
      ProductapiData(query)
        .then(({ data }) => {
          console.log("Product response", data);
          setState({
            ...state,
            loader: false,
          });
          if (data) {
            setOpen(false);
          }
          if (data && data && data?.product.products?.length) {
            let newww = [...dataUser];
            data.product.products.forEach((element) => {
              let findAnyelement = newww.findIndex(
                (ii) => ii._id == element._id
              );
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
        });
    }
  }, [updated, change, CatId]);

  

  const cALLaPI = (id,name) => {
    setState({
      ...state,
      pgNo: 1,
    });
    setCatId(id);
    setdataUser('')
    setOpen(true)
    
    console.log(id,name,"id ye name")
  };
  const downloadapi = () => {
    ProductapiData()
      .then(({ data: { data } }) => {
        console.log(data.products, "dowanloadd checkk");
        setdownloadarray(data.products);
        console.log(excelarray, "leveel");
        downloadExcel(data.products);
        setOpen(false);
      })
      .catch((err) => {});
  };
  const addProduct = () => {
    setLoader6(true);
  };
  const filterfun = () => {
    setSortedField(null);
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
        Title: items.title,
        Description: items.description,
        Condition: items.condition,
        Inventory: items.sold ? "Out of Stock" : "In stock",
        Live_Status: items.isApproved ? "Verified" : "Unverified",
        ReportBy: items?.user?.email,
      };
      downloadData.push(tempObj);
    });

    console.log(downloadData);
    const workSheet = XLSX.utils.json_to_sheet(downloadData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Products");

    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });

    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "Products Data.xlsx");
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
  console.log("reset state", state);
  return (
    <div className="users_table">
      <div className="titlee">
        <h2>Products</h2>
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
          {/* {!fdate ? (
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
            Download Excel <FileDownloadIcon />
          </Button> */}
          {/* <Button
            variant="contained"
            color="success"
            onClick={() => {
              addProduct();
            }}
          >
            Add Product
          </Button> */}

          {CatId ? (
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setCatId("");
                setdataUser("");
                setOpen(true);
              }}
            >
              Reset
            </Button>
          ) : (
            ""
          )}
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
                  Title{" "}
                  <SortIcon
                    className="filterr"
                    onClick={() =>
                      sortedField ? filterfun() : setSortedField("title")
                    }
                  />
                </TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Inventory</TableCell>
                <TableCell align="center">
                  Price
                  <SortIcon
                    className="filterr"
                    onClick={() =>
                      sortedField ? filterfun() : setSortedField("condition")
                    }
                  />
                </TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">User</TableCell>
                <TableCell align="center" colSpan={4}>
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

                      <TableCell align="center">{dats.description}</TableCell>
                      <TableCell align="center" className="indv">
                        <span
                          className={dats.isActive ? "avail_green" : "out_red"}
                        >
                          {dats.isActive ? "Available" : "Out of stock"}
                        </span>
                      </TableCell>
                      <TableCell align="center">{dats.price} </TableCell>
                      {respchange ? (
                        <TableCell align="center">
                          {dats.ownerId &&
                            dats.ownerId.map((item, i) => {
                              return <>{item.name}</>;
                            })}
                        </TableCell>
                      ) : (
                        <TableCell align="center">
                          {dats.categoryId && dats.categoryId?.name}
                          {CatId ? (
                            ""
                          ) : (
                            <button
                            className="viewsss"
                            type="button"
                            onClick={() => {
                              cALLaPI(dats?.categoryId?._id,dats.categoryId?.name);
                            }}
                          >
                            <VisibilityOutlinedIcon
                              className="tableview" />
                          </button>
                          )}
                        </TableCell>
                      )}
                      <TableCell align="center">
                        {dats.ownerId && dats.ownerId.name}
                      </TableCell>
                      <TableCell align="right">
                        <button
                          className="bttn btn-success"
                          type="button"
                          onClick={() => {
                            ProductViews(dats);
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
                          <label>{dats.isDeleted ? "Deleted" : "Live"}</label>
                          <Switch
                            onClick={() => {
                              dats.isDeleted
                                ? addagainblock(dats._id)
                                : blockUser(dats._id);
                            }}
                            checked={!dats.isDeleted}
                            color={dats.isDeleted ? "warning" : "success"}
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
        {loader ? <ProductView resp={delId} close={setLoader} /> : ""}
        {loader2 ? (
          <ProductBlock
            id={delId}
            updstate={updatestate}
            blocked={handleblocked}
            close={setLoader2}
          />
        ) : (
          ""
        )}
        {loader3 ? (
          <ProductUnblock
            id={addId}
            unblocked={handleblocked}
            updstate={updatestate}
            close={setLoader3}
          />
        ) : (
          ""
        )}
        {loader4 ? (
          <ProductUpdate
            id={addId}
            updstate={updatestate}
            update={handleupdate}
            close={setLoader4}
            propicdel={picdel}
          />
        ) : (
          ""
        )}

        {open ? <img src={Loadering} className="loaderr" /> : ""}
        {netcheckk ? (
          <div className="loaderr">
            <img src={Caution}></img>
            <h3>Your connection is not available</h3>
          </div>
        ) : (
          ""
        )}
        {loader3 ? (
          <ProductUnblock
            id={addId}
            unblocked={handleblocked}
            updstate={updatestate}
            close={setLoader3}
          />
        ) : (
          ""
        )}
      </TableContainer>
      {open ? <img src={Loadering} className="loaderr" /> : ""}
      {loader6 ? (
        <AddProduct_pop
          updstate={updatestate}
          close={setLoader6}
          update={addNewList}
        />
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
