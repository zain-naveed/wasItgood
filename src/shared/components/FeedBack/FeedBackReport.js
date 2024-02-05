import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FeedBackPopUp from "./FeedBackPopUp";
import "./feedback.css";
import Caution from "../../../assets/images/caution.jpg";
import Loadering from "../../../assets/images/loading.gif";
import { FeedbackApi } from "../../services/FeedbackApi";

function FeedBackReport(props) {
  const [dataFeed, setDataFeed] = useState([]);

  const netcheck = () => {
    if (!window.navigator.onLine) {
      console.log(!window.navigator.onLine, "no nett");
      setOpen(false);
      setNetcheckk(true);
    }
  };
  useEffect(() => {
    setOpen(false);

    netcheck();

    FeedbackApi()
      .then(({ data }) => {
        console.log("report response", data.products[0]);

        if (data) {
          // setOpen(false);

          setDataFeed(data?.products);
        }
      })
      .catch((err) => {});
  }, []);
  const reports = [
    {
      product: "book and movie",
      reportByy: "Alex Dimitrievski",
      detAil:
        "This is message of report product and detail show click on view button Thanks!",
    },
    {
      product: "Running shoe",
      reportByy: "Alex Dimitrievski",
      detAil:
        "This is message of report product and detail show click on view button Thanks!",
    },
    {
      product: "Cadillac",
      reportByy: "Dan D",
      detAil:
        "This is message of report product and detail show click on view button Thanks!",
    },
    {
      product: "Hotdog",
      reportByy: "Mark",
      detAil:
        "This is message of report product and detail show click on view button Thanks!",
    },
    {
      product: "Poster",
      reportByy: "Dan D",
      detAil:
        "This is message of report product and detail show click on view button Thanks!",
    },
    {
      product: "Baby Pampers",
      reportByy: "Mark",
      detAil:
        "This is message of report product and detail show click on view button Thanks!",
    },
  ];
  const [loader, setLoader] = useState(false);
  const [delId, setdelId] = useState();
  const [open, setOpen] = useState(props.open);
  const [netcheckk, setNetcheckk] = useState(false);

  const reportViews = (resp) => {
    setLoader(true);
    setdelId(resp);
  };

  return (
    <div className="users_table">
      <div className="titlee">
        <h2>Reports</h2>
      </div>
      <div className="search_view">
        <input
          type="search"
          placeholder="Search..."
          // value={searchMenu}
          // onChange={(e) => {
          //   setsearchMenu(e.target.value);
          //   emptyforce();
          // }}
        ></input>
      </div>
      <TableContainer component={Paper}>
        <div className="excle_btn">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">SR</TableCell>
                <TableCell align="center">Product</TableCell>
                <TableCell align="center">Report by</TableCell>
                <TableCell align="center">Detail</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log(dataFeed, "ffeedd")}
              {dataFeed.map((item, index) => {
                return (
                  <>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">{index + 1} </TableCell>
                      <TableCell align="center">
                        {item?.productId?.title}{" "}
                      </TableCell>
                      <TableCell align="center">{item.reportBy.name}</TableCell>
                      <TableCell align="center">{item.comment}</TableCell>
                      <TableCell align="center">
                        <button
                          className="bttn btn-success"
                          type="button"
                          onClick={() => {
                            reportViews(item);
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
        </div>
        {loader ? <FeedBackPopUp resp={delId} close={setLoader} /> : ""}
        {open ? <img src={Loadering} className="loaderr" /> : ""}

        {netcheckk ? (
          <div className="loaderr">
            <img src={Caution}></img>
            <h3>Your connection is not available</h3>
          </div>
        ) : (
          ""
        )}
      </TableContainer>
    </div>
  );
}

export default FeedBackReport;
