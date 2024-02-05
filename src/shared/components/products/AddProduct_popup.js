import React, { useState, useEffect } from "react";
import axios from "axios";
import { Field, Form, Formik, withFormik } from "formik";
import * as yup from "yup";
import { notify } from "../../../shared/utils/notify";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../../assets/css/Auth.css";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import CircularProgress from "@mui/material/CircularProgress";
import { newProduct } from "../../services/AddnewProduct";
import PhoneInput from "react-phone-input-2";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { ReportapiData } from "../../services/ReportApi";
import { BrandsApi } from "../../services/BrandsApi";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import MapIcon from "@mui/icons-material/Map";
import Fileadd from "../../../assets/images/file_add.png";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Imagedelete from "../../components/products/Imagedelete";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";

const initialValues = {
  title: "",
  description: "",
  price: "",
  address: "",
  images: "",
};

function AddProduct(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [must1, setmust1] = useState();
  const [category_listing, setcategory_listing] = useState([]);
  const [brand_listing, setbrand_listing] = useState([]);
  const [brand_list, setbrand_list] = useState("");
  const [Category_list, setCategory_list] = useState("");
  const [catID, setcATid] = useState("");
  const [catIDbrand, setcATidBrand] = useState("");
  const [productUrl, setProducturl] = useState([]);
  const [fileImages, setfileImages] = useState([]);
  const [productImage, setProductImage] = useState([]);
  const [productImagelist, setProductImagelist] = useState([]);
  const [updata, setUpdata] = useState(false);
  const [index_img, setindexx] = useState();
  const [id_img, setIdnew] = useState();
  const [own_img, setimggg] = useState();
  const [loader3, setLoader3] = useState(false);

  console.log(fileImages, productImagelist, productUrl, "images file");

  // const [phoneNumber, setphoneNumber] = useState(
  //   data?.phoneNumber ? String(data?.phoneNumber) : ""
  // );
  useEffect(() => {
    ReportapiData()
      .then(({ data }) => {
        if (data) {
          setOpen(false);
          setcategory_listing(data.category);
        }
      })
      .catch((err) => {});
  }, []);

  const customimage = (url, index) => {
    let clone = [...productUrl];
    clone.splice(index, 1);
    console.log(clone, fileImages, "array indiviual");
  };
  const upDate = (e, index) => {
    console.log(index, "index");
    let file = e.target.files[0];
    if (file) {
      let newfile = [...fileImages];
      newfile.push(file);
      setfileImages(newfile);
      console.log(newfile, "array indiviual new");

      let url = URL.createObjectURL(file);
      let cloneArray = [...productImagelist];
      cloneArray[index] = file;
      setProductImagelist(cloneArray);
      setProductImage(cloneArray);
      let cloneArrayUrl = [...productUrl];
      cloneArrayUrl[index] = url;
      setProducturl(cloneArrayUrl);
    }
  };
  const uploadFilesempty = (e) => {
    let file = e.target.files[0];
    if (file.type.includes("image")) {
      if (file) {
        let newfile = [...fileImages];
        newfile.push(file);
        setfileImages(newfile);
        let url = URL.createObjectURL(file);
        let cloneArray = [...productImage];
        cloneArray.push(file);
        setProductImagelist(cloneArray);
        setProductImage(cloneArray);
        let cloneArrayUrl = [...productUrl];
        cloneArrayUrl.push(url);
        setProducturl(cloneArrayUrl);
      }
    } else {
      notify("Please select just image type", "error");
    }
  };
  const findId = (value) => {
    let ide = "";
    let clone = [...category_listing];
    clone.forEach((element) => {
      let findIndexId = clone.findIndex((ii) => ii.name == value);
      console.log(findIndexId, "index agai he");
      ide = clone[findIndexId].id;
      console.log(ide, "ID agai he");
      setcATid(ide);
    });
    brandsApicall(ide);
  };
  const del_product_pic = (index_img) => {
    console.log(index_img, "asal cheezz check");
    let changing = [...productImagelist];
    console.log("hogya", changing);
    changing.splice(index_img, 1);
    console.log("Done");
    let clone = [...productUrl];
    clone.splice(index_img, 1);
    setProducturl(clone);
    setProductImagelist(changing);
    setUpdata(true);
  };
  const findIdBrand = (value) => {
    let ide = "";
    let clone = [...brand_listing];
    clone.forEach((element) => {
      let findIndexId = clone.findIndex((ii) => ii.name == value);
      console.log(findIndexId, "index agai he");
      ide = clone[findIndexId].id;
      console.log(ide, "ID agai he");
      setcATidBrand(ide);
    });
  };
  const brandsApicall = (id) => {
    BrandsApi(id)
      .then(({ data }) => {
        if (data) {
          console.log(data, "csat");
          setbrand_listing(data.brand);
        }
      })
      .catch((err) => {});
  };
  const signUpHandle = async (obj) => {
    newProduct(obj)
      .then(({ data }) => {
        if (data) {
          setOpen(false);
          console.log(data, "responsess");
          if (data.status == 400) {
            notify(data.msg);
          } else {
            props.data(obj);
            notify(`Added New Product !`, "success");
          }
          clossee();
        }
      })
      .catch((e) => {
        notify(e);
        setOpen(false);
        console.log(e, "error");
      });
  };
  const { updstate } = props;
  const clossee = () => {
    updstate("New User Added");
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, action) => {
        const { title, price, description, address } = values;

        signUpHandle({
          title: title,
          price: price,
          description: description,
          address: address,
          // deviceId: "123456789",
          location: JSON.stringify({
            coordinates: [-122.406417, 37.785834],
          }),
          categoryId: catID,
          brandId: catIDbrand,
          images: productImagelist,
        });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <div className="login_bac">
          <div className="btnn adduser">
            <IconButton
              aria-label="close"
              onClick={() => {
                clossee();
              }}
            >
              <CancelIcon />
            </IconButton>
          </div>
          <div className="container setcontain adduuser">
            <div className="d-flex justify-content-center h-100">
              <div className="card signup">
                <div className="card-header product">
                  <h3>Create Product</h3>
                </div>
                <div className="card-body">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                      signUpHandle();
                      setOpen(true);
                    }}
                  >
                    <div className="flexxx">
                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <TitleIcon />
                          </span>
                        </div>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Tile"
                          value={values.title}
                          onChange={handleChange("title")}
                          required
                        />
                      </div>
                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <DescriptionIcon />
                          </span>
                        </div>
                        <input
                          className="form-control"
                          type="textarea"
                          placeholder="Description"
                          value={values.description}
                          onChange={handleChange("description")}
                          required
                        />
                      </div>
                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <MapIcon />
                          </span>
                        </div>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Address"
                          value={values.address}
                          onChange={handleChange("address")}
                          required
                        />
                      </div>
                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <PriceCheckIcon />
                          </span>
                        </div>
                        <input
                          className="form-control"
                          type="number"
                          placeholder="price"
                          value={values.price}
                          onChange={handleChange("price")}
                          required
                        />
                      </div>
                      <div className="input-group form-group">
                        <div className="input-group-prepend">
                          {/* <span className="input-group-text">
                          <i className="fas fa-user"></i>
                        </span> */}
                        </div>
                        <TextField
                          id="outlined-select-currency"
                          className="flo"
                          select
                          label="Category"
                          value={Category_list}
                          onChange={(e) => {
                            setCategory_list(e.target.value);
                            setbrand_listing([]);
                            findId(e.target.value);
                          }}
                          required
                        >
                          {category_listing
                            .filter((valuee) => valuee.isDelete != true)
                            .map((option) => (
                              <MenuItem
                                key={option.id}
                                value={option.name}
                                className="floo"
                              >
                                {option.name}
                              </MenuItem>
                            ))}
                        </TextField>
                      </div>

                      <div
                        className={
                          brand_listing != ""
                            ? "input-group form-group  active"
                            : "input-group form-group  deactive"
                        }
                      >
                        <div className="input-group-prepend">
                          {/* <span className="input-group-text">
                          <i className="fas fa-user"></i>
                        </span> */}
                        </div>
                        <TextField
                          id="outlined-select-currency"
                          className="flo"
                          select
                          label="Brand"
                          value={brand_list}
                          onChange={(e) => {
                            setbrand_list(e.target.value);
                            findIdBrand(e.target.value);
                          }}
                          required
                        >
                          {brand_listing.map((option) => (
                            <MenuItem key={option.id} value={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>
                    </div>
                    <div className="input-group form-group">
                      <div className="listingupdate product">
                        <label>Product Images</label>
                        <br />
                        {productUrl?.length > 0 ? (
                          <div className="imgflex">
                            {productUrl.map((i, idex) => {
                              return (
                                <div
                                  key={idex}
                                  style={{ marginRight: "10px" }}
                                  className="rell"
                                >
                                  <label
                                    htmlFor={`upload_image${idex}`}
                                    className="spaace"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <img
                                      src={i}
                                      onClick={() => {
                                        customimage(i, idex);
                                        console.log("firsttttt");
                                      }}
                                    />
                                  </label>
                                  <input
                                    type="file"
                                    id={`upload_image${idex}`}
                                    name={`upload_image${idex}`}
                                    style={{ display: "none" }}
                                    accept="image/*"
                                    onChange={(e) => {
                                      upDate(e, idex);
                                      setUpdata(true);
                                    }}
                                  />
                                  <div
                                    className="absol"
                                    onClick={() => {
                                      setindexx(idex);
                                      setLoader3(true);
                                    }}
                                  >
                                    <HighlightOffIcon />
                                  </div>
                                </div>
                              );
                            })}
                            {productUrl.length < 6 && (
                              <div style={{ marginRight: "10px" }}>
                                <label
                                  htmlFor={`upload_image`}
                                  className="spaace"
                                  style={{ cursor: "pointer" }}
                                >
                                  <div className="divv">
                                    <span className="newone">
                                      {" "}
                                      <AddToPhotosIcon className="adnewimg" />
                                    </span>
                                  </div>{" "}
                                </label>
                                <input
                                  type="file"
                                  id={`upload_image`}
                                  name={`upload_image`}
                                  style={{ display: "none" }}
                                  accept="image/*"
                                  onChange={(e) => {
                                    uploadFilesempty(e);
                                    setUpdata(true);
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="imgflex">
                            <div style={{ marginRight: "10px" }}>
                              <label
                                htmlFor={`upload_image`}
                                className="spaace"
                                style={{ cursor: "pointer" }}
                              >
                                <div className="divv">
                                  <span className="newone">
                                    {" "}
                                    <AddToPhotosIcon className="adnewimg" />
                                  </span>
                                </div>{" "}
                              </label>
                              <input
                                type="file"
                                id={`upload_image`}
                                name={`upload_image`}
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={(e) => {
                                  uploadFilesempty(e);
                                  setUpdata(true);
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className={
                          open
                            ? "btn float-right login_btn deactive"
                            : "btn float-right login_btn"
                        }
                      >
                        {open ? (
                          <div
                            className="spinner-border boot-loader"
                            role="status"
                          ></div>
                        ) : (
                          // <CircularProgress className="circulerr" />
                          "Add Product"
                        )}
                      </button>
                    </div>
                  </Form>
                  {loader3 ? (
                    <Imagedelete
                      close={setLoader3}
                      runfun={del_product_pic}
                      inndeex={index_img}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
}

export default AddProduct;
