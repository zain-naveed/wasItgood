import { React, useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import { notify } from "../../utils/notify";
import CancelIcon from "@mui/icons-material/Cancel";
import Typography from "@material-ui/core/Typography";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "../../../assets/images/avatar.png";
import Fileadd from "../../../assets/images/file_add.png";
import { UPdateProduct } from "../../services/product.services";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { DelProductimg } from "../../services/product_img_del";
import Imagedelete from "../../components/products/Imagedelete";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MenuItem from "@mui/material/MenuItem";
import { BrandsApi } from "../../services/BrandsApi";
import { ReportapiData } from "../../services/ReportApi";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CancelIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function ProductUpdate(props) {
  const { updstate, propicdel } = props;
  const data = props.id;
  console.log("update data", data);
  const [dataUser, setdataUser] = useState([]);
  const [open, setOpen] = useState(true);
  const [title, settitle] = useState(data.title);
  const [description, setdescription] = useState(data.description);
  const [address, setaddress] = useState(data.address);
  const [price, setprice] = useState(data.price);
  const [productImage, setProductImage] = useState([]);
  const [loader3, setLoader3] = useState(false);
  const [selete_permanent, setselete_permanent] = useState(false);
  const [productUrl, setProducturl] = useState(data.images);
  const [productImagelist, setProductImagelist] = useState(data.images);
  const [fileImages, setfileImages] = useState([]);
  const [urlImages, seturlImages] = useState([]);
  const [idddd, setidddd] = useState(data._id);
  // console.log(productUrl, "Producctt url");
  // console.log(urlImages, "images url");
  const [category_listing, setcategory_listing] = useState([]);
  const [brand_listing, setbrand_listing] = useState([]);
  const [brand_list, setbrand_list] = useState(data.brandId?.name);
  const [Category_list, setCategory_list] = useState(data.categoryId?.name);
  const [catID, setcATid] = useState(data.categoryId?._id);
  const [catIDbrand, setcATidBrand] = useState(data.brandId?._id);

  console.log(productImagelist, "after add image");
  const changingshift = () => {
    setProductImage(productImagelist);
  };
  console.log(productImage, "after shifttt image");
  const [updata, setUpdata] = useState(false);
  const [loader, setLoader] = useState(false);
  const [index_img, setindexx] = useState();
  const [id_img, setIdnew] = useState();
  const [own_img, setimggg] = useState();
  const [updaTEURL, setupdaTEURL] = useState();
  console.log(updaTEURL, "url ye he");
  const handleClose = () => {
    setOpen(false);
    props.close(false);
  };
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    ReportapiData()
      .then(({ data }) => {
        if (data) {
          setcategory_listing(data.category);
          brandsApicall(catID);
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
        setProductImage(cloneArray);
        let cloneArrayUrl = [...productUrl];
        cloneArrayUrl.push(url);
        setProducturl(cloneArrayUrl);
      }
    } else {
      notify("Please select just image type", "error");
    }
  };
  const handleSubmit = () => {
    let urlclone = [...urlImages];
    let fileClone = [...fileImages];

    productImagelist.map((item) => {
      if (item?.type) {
        fileClone.push(item);
        setfileImages(fileClone);
      } else {
        urlclone.push(item);
        seturlImages(urlclone);
      }
    });
    console.log({ urlclone, fileClone });
    let obj = {
      title: title,
      description: description,
      address: address,
      price: price,
      // categoryId:catID,
    };
    console.log(urlImages, fileImages, "dono a rhy hain");

    if (urlclone) {
      obj["images"] = urlclone;
    }
    if (fileImages) {
      obj["images1"] = fileImages;
    }

    UPdateProduct(data?._id, obj)
      .then(({ data }) => {
        console.log("data submit", data);

        updstate("Update Successfully");
        handleClose();
        props.update(
          idddd,
          obj,
          productUrl,
          Category_list,
          brand_list,
          catID,
          catIDbrand
        );
        setLoader(false);
      })
      .catch((err) => {
        if (err.response.data.code == "400") {
          notify("No more added image");
        }
        setLoader(false);
      });
  };
  const del_product_pic = (index_img, id_img, own_img) => {
    console.log(index_img, id_img, own_img, "asal cheezz check");
    setLoader(true);
    let changing = [...productUrl];
    console.log("hogya", changing);
    changing.splice(index_img, 1);
    console.log("Done");
    setProducturl(changing);
    setProductImagelist(changing);
    setLoader(false);
    setUpdata(true);
  };
  const findIdBrand = (value) => {
    let ide = "";
    let clone = [...brand_listing];
    clone.forEach((element) => {
      let findIndexId = clone.findIndex((ii) => ii.name == value);
      console.log(findIndexId, "index agai he");
      ide = clone[findIndexId].id;
      console.log(ide, "ID agai he brand ki");
      setcATidBrand(ide);
    });
  };
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <IconButton aria-label="close" onClick={handleClose}>
          <CancelIcon />
        </IconButton>
        <div className="maindivuser">
          <h2>Product Data</h2>
          <hr></hr>
          <div className="useruPDATE">
            <div className="listingupdate">
              <TextField
                label="Title"
                id="margin-none"
                value={title}
                onChange={(e) => {
                  settitle(e.target.value);
                  if (data.title != e.target.value) {
                    setUpdata(true);
                  } else {
                    setUpdata(false);
                  }
                }}
              />
            </div>
            <div className="listingupdate">
              <TextField
                label="Description"
                id="margin-none"
                value={description}
                onChange={(e) => {
                  setdescription(e.target.value);
                  if (data.description != e.target.value) {
                    setUpdata(true);
                  } else {
                    setUpdata(false);
                  }
                }}
              />
            </div>
            <div className="listingupdate">
              <TextField
                label="Address"
                id="margin-none"
                value={address}
                onChange={(e) => {
                  setaddress(e.target.value);
                  if (data.address != e.target.value) {
                    setUpdata(true);
                  } else {
                    setUpdata(false);
                  }
                }}
              />
            </div>
            <div className="listingupdate">
              <TextField
                label="Price"
                id="margin-none"
                value={price}
                onChange={(e) => {
                  setprice(e.target.value);
                  if (data.categoryId?.name != e.target.value) {
                    setUpdata(true);
                  } else {
                    setUpdata(false);
                  }
                }}
              />
            </div>
            {/* <div className="listingupdate">
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
                  if (data.price != e.target.value) {
                    setUpdata(true);
                  } else {
                    setUpdata(false);
                  }
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
            <div className="listingupdate">
              <TextField
                id="outlined-select-currency"
                className="flo"
                select
                label="Category"
                value={Category_list}
                onChange={(e) => {
                  setCategory_list(e.target.value);
                  findId(e.target.value);
                  if (data.price != e.target.value) {
                    setUpdata(true);
                  } else {
                    setUpdata(false);
                  }
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
            </div> */}
          </div>
          <div className="listingupdate">
            <label>Product Images</label>
            <br />
            {productUrl.length > 0 ? (
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
                          alt={Avatar}
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
                          setIdnew(data?.id);
                          setimggg(i);
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
                      <img src={Fileadd} alt={Avatar} />
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
                    <img src={Fileadd} alt={Avatar} />
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
          {updata ? (
            <button
              onClick={() => {
                handleSubmit();
                setLoader(true);
              }}
              className={
                loader
                  ? "btn float-right login_btn deactive"
                  : "btn float-right login_btn"
              }
            >
              {loader ? (
                <div className="spinner-border boot-loader" role="status"></div>
              ) : (
                //  <CircularProgress className="circulerr" />
                "Update"
              )}
            </button>
          ) : (
            ""
          )}
          {loader3 ? (
            <Imagedelete
              close={setLoader3}
              runfun={del_product_pic}
              inndeex={index_img}
              idlex={id_img}
              selimg={own_img}
            />
          ) : (
            ""
          )}
        </div>
      </Dialog>
    </div>
  );
}
export default ProductUpdate;
