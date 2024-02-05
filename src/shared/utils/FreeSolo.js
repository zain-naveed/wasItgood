import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
// import { Searchicon } from '../../Assets';
// import { Searchicon } from '../../Assets';
// import InputAdornment from '@mui/material/InputAdornment';
import { Grid } from "@material-ui/core";
import { Field } from "formik";
// import './FreeSolo.css'
// import { getTaggingServices } from "../../Shared/Services/Tagging";
import notify from "../utils/notify";
import Services from "../utils/Services.json";
import { useSelector, useDispatch } from "react-redux";
import { color } from "@mui/system";

export default function FreeSolo({
  livetest,
  livetest1,
  livetest2,
  livetest3,
  setData,
  title1,
  value,
  setValue,
  data,
  bool1,
  checkipt,
  arr,
  jobtitleCheck,
}) {
  const [tagsArr, setTagsArr] = useState([]);
  const [bool, setBool] = useState(data.length > 0 ? true : false);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [iptValue, setIptValue] = useState("");
  // console.log("arr?.service", arr,arr[0]?.service)
  let arrClone = "";

  if (arr[0]?.service) {
    arrClone = arr?.filter((e) =>
      e?.service?.toLowerCase().includes(data?.toLowerCase())
    );
  } else {
    arrClone = arr?.filter((e) =>
      e?.toLowerCase().includes(data?.toLowerCase())
    );
  }

  const handleTags = () => {
    // getTaggingServices()
    // .then(({res:{res}})=>{
    //   console.log({res:{res}})
    //   setTagsArr(res[0])
    // })
    // .then(({ data: { data } }) => {

    //   console.log("data from tags", data)
    //   setTagsArr(data)
    // })
    // .catch((e) => {
    //   toastMessage("error", "Ohho");
    // });

    // console.log("title1", title1)

    // if (title1 = "Familiar Products") {
    //   setTagsArr(Products)
    // }
    // else if (title1 == "Your Services") {
    //   setTagsArr(Services)
    // }

    setTagsArr(arrClone);
  };
  useEffect((i) => {
    handleTags();
  }, []);

  console.log(tagsArr, "tagsArr");

  return (
    <>
      {tagsArr[0]?.service ? (
        <>
          <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
              className={title1 == "posts" ? "tagsArrTags" : ""}
              freeSolo
              disableClearable
              inputValue={data ? data : iptValue}
              // value={data}
              id="free-solo-2-demo"
              onInputChange={
                (e, value) => {
                  console.log("targeting", value);
                  if (
                    e?.type == "keydown" ||
                    e?.type == undefined ||
                    e == null
                  ) {
                    setData(value);
                    setIptValue(value);
                  } else {
                    if (e?.target?.innerText) {
                      setData(e.target.innerText);
                      setIptValue("");
                    } else {
                      setIptValue(e.target.value);
                      setData(e.target.value);
                    }
                    setIptValue("");
                  }
                  setIptValue("");
                }
                // {console.log(tagsArr,"tagsArr")}
              }
              options={tagsArr && tagsArr?.map((option) => option?.service)}
              // {console.log(tagsArr,"tagsArr")}

              renderInput={(params) => (
                <TextField
                  className={livetest ? "livetest" : ""}
                  {...params}
                  // placeholder={userResp.user.role == "owner" ? "Add Services": "Search services"}
                  placeholder={
                    title1 === "Familiar Products"
                      ? "Add Familiar Products"
                      : title1 === "Your Services"
                      ? "Add Services"
                      : title1 === "Job Title"
                      ? "Add Job Title"
                      : livetest1
                      ? "Search Services"
                      : livetest2
                      ? "Search Services"
                      : livetest3
                      ? "Search Services"
                      : "Add Services"
                  }
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Stack>
        </>
      ) : (
        <Stack spacing={2} sx={{ width: 300 }}>
          <Autocomplete
            className={title1 == "posts" ? "tagsArrTags" : ""}
            freeSolo
            disableClearable
            inputValue={data ? data : iptValue}
            // value={data}
            id="free-solo-2-demo"
            onInputChange={(e, value) => {
              console.log("targeting", value);
              if (e?.type == "keydown" || e?.type == undefined || e == null) {
                setData(value);
                setIptValue(value);
              } else {
                if (e?.target?.innerText) {
                  setData(e.target.innerText);
                  setIptValue("");
                } else {
                  setIptValue(e.target.value);
                  setData(e.target.value);
                }
                setIptValue("");
              }
              setIptValue("");
            }}
            options={tagsArr && tagsArr?.map((option) => option)}
            // {console.log(tagsArr,"tagsArr")}

            renderInput={(params) => (
              <TextField
                className={livetest ? "livetest" : ""}
                {...params}
                placeholder={"Add Products"}
                // placeholder={title1 ==="Familiar Products" ? "Add Familiar Products" :title1==="Your Services" ? "Add Services" : title1==="Job Title" ? "Add Job Title":livetest1 ? "Search Services":livetest2 ?  "Search Services" :livetest3 ? "Search Services" : "Add Services"}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Stack>
      )}
    </>
  );
}
