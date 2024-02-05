import { React, useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Typography from "@material-ui/core/Typography";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "../../../assets/images/avatar.png";
import moment from "moment";
import "./styles.css";

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

function UserView(props) {
  const data = props.resp;
  const [open, setOpen] = useState(true);
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
        {props.pass ? (
          <div class="scrollbar scrollbar-lady-lips">
            <div class="force-overflow">
              <div className="lelel">
                <h2>Job Detail</h2>
                <div className="flexxview">
                  <div className="profile">
                    <img
                      src={
                        data?.owner?.saloon?.avatar
                          ? data?.owner?.saloon?.avatar
                          : Avatar
                      }
                    />
                  </div>
                  <div className="detaill" style={{ marginBottom: 0 }}>
                    <div className="reportview">
                      <h6>Owner's Name</h6>
                      {data?.owner?.saloon?.Saloon_name ? (
                        <p>{data?.owner?.saloon?.Saloon_name}</p>
                      ) : (
                        <span className="text-muted">Not Added</span>
                      )}
                    </div>
                    <div className="reportview">
                      <h6>Job Title</h6>
                      <p>{data?.jobTitle ? data?.jobTitle : "Not Added"}</p>
                    </div>
                    <div className="reportview">
                      <h6>Payment Rate</h6>
                      <p>
                        {data?.rateType === "Per Hour"
                          ? `${data?.minRate} - ${data?.maxRate}`
                          : `${data?.commisionRate}%`}
                      </p>
                    </div>
                    <div className="reportview">
                      <h6>Job Type</h6>
                      <p>{data?.jobType ? data?.jobType : "Not Added"}</p>
                    </div>
                    <div className="reportview">
                      <h6>Services</h6>
                      {data?.jobServices?.map((iteem, index) => {
                        if (index == 0) {
                          if (index + 1 == data?.jobServices?.length) {
                            return <p> {iteem}</p>;
                          } else {
                            <p>{iteem},</p>;
                          }
                        }
                        if (index + 1 == data?.jobServices?.length) {
                          return <p style={{ marginLeft: "2px" }}> {iteem}</p>;
                        } else {
                          return <p style={{ marginLeft: "2px" }}> {iteem},</p>;
                        }
                      })}
                    </div>
                    <div className="reportview">
                      <h6>Job Status</h6>
                      <p>{data?.jobStatus ? data?.jobStatus : "Not Added"}</p>
                    </div>
                    {data?.jobType === "Part-time" ? (
                      <>
                        <div className="reportview">
                          <h6>Start Date </h6>
                          <p>{moment(data?.startDate).format("DD-MMM-YY")}</p>
                          <h6>End Date </h6>
                          <p>{moment(data?.endDate).format("DD-MMM-YY")}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="reportview">
                          <h6>Date </h6>
                          <p>
                            {moment(data?.owner?.updatedAt).format("DD-MMM-YY")}
                          </p>
                        </div>
                      </>
                    )}
                    <div className="reportview">
                      <h6>Time </h6>
                      <p>{moment(data?.createdAt).format("HH:MM:SS")}</p>
                    </div>
                    <div className="reportview">
                      <h6>Require Equipment </h6>
                      <p>{data?.reqEquip ? data?.reqEquip : "Not Added"}</p>
                    </div>
                  </div>
                  <hr />
                  <div
                    className="reportview descrr w-100"
                    style={{ marginTop: 0 }}
                  >
                    <h6>Description </h6>
                    <p>
                      {data?.jobDescription
                        ? data?.jobDescription
                        : "Not Added"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : props.feedback ? (
          <div class="scrollbar scrollbar-lady-lips">
            <div class="force-overflow">
              <div className="lelel">
                <h2>FeedBack & Inquiry</h2>
                <div className="flexxview">
                  <div className="profile">
                    <img
                      src={
                        data?.inquiryUser?.role === "owner"
                          ? data?.inquiryUser?.saloon.avatar
                            ? data?.inquiryUser?.saloon.avatar
                            : Avatar
                          : data?.inquiryUser?.profilePic
                          ? data?.inquiryUser?.profilePic
                          : Avatar
                      }
                    />
                  </div>
                  <div className="detaill">
                    <div className="reportview">
                      <h6>Name</h6>
                      <p>
                        {data?.inquiryUser?.role === "owner"
                          ? data?.inquiryUser?.saloon?.Saloon_name
                          : data?.inquiryUser?.name}
                      </p>
                    </div>
                    <div className="reportview">
                      <h6>Role</h6>
                      <p>
                        {data?.inquiryUser?.role
                          ? data?.inquiryUser?.role
                          : "Not Added"}
                      </p>
                    </div>
                    <div className="reportview">
                      <h6>Email</h6>
                      <p>{data?.email ? data?.email : "Not Added"}</p>
                    </div>

                    <div className="reportview">
                      <h6>Attachments</h6>
                      <div className="attachment">
                        {data?.attachments.length
                          ? data?.attachments?.map((iteem) => {
                              return <img src={iteem}></img>;
                            })
                          : "Not available"}
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="reportview descrr w-100">
                    <h6>Reason</h6>{" "}
                    <p>{data?.reason ? data?.reason : "Not Added"}</p>
                  </div>
                  <hr />
                  <div className="reportview descrr w-100">
                    <h6>Description </h6>
                    <p>{data?.description ? data?.description : "Not Added"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div class="scrollbar scrollbar-lady-lips">
            <div class="force-overflow">
              <div className="lelel">
                <h2>Provider Detail</h2>
                <div className="flexxview">
                  <div className="profile">
                    <img src={data.profilePic ? data.profilePic : Avatar} />
                  </div>
                  <div className="detaill">
                    {/* <div> */}
                    <div className="reportview">
                      <h6>Name</h6>
                      {data?.name ? (
                        <p>{data?.name}</p>
                      ) : (
                        <span className="text-muted">Not Added</span>
                      )}
                    </div>

                    <div className="reportview">
                      <h6>Email</h6>
                      {data?.email ? (
                        <p>{data?.email}</p>
                      ) : (
                        <span className="text-muted">Not Added</span>
                      )}
                    </div>

                    <div className="reportview">
                      <h6>Address</h6>
                      {data?.location?.address ? (
                        <p>{data?.location?.address}</p>
                      ) : (
                        <span className="text-muted">Not Added</span>
                      )}
                    </div>
                    <div className="reportview">
                      <h6>Hourly Rate</h6>
                      {data?.hourRate ? (
                        <p>{data?.hourRate}</p>
                      ) : (
                        <span className="text-muted">Not Added</span>
                      )}
                    </div>

                    <div className="reportview">
                      <h6>Services</h6>

                      {data?.experience?.services.length ? (
                        data?.experience?.services?.map((iteem, index) => {
                          if (index == 0) {
                            if (
                              index + 1 ==
                              data?.experience?.services?.length
                            ) {
                              return <p> {iteem}</p>;
                            } else {
                              <p>{iteem},</p>;
                            }
                          }
                          if (index + 1 == data?.experience?.services?.length) {
                            return (
                              <p style={{ marginLeft: "2px" }}> {iteem}</p>
                            );
                          } else {
                            return (
                              <p style={{ marginLeft: "2px" }}> {iteem},</p>
                            );
                          }
                        })
                      ) : (
                        <span className="text-muted">Not Added</span>
                      )}
                    </div>
                    <div className="reportview">
                      <h6>Familiar Products</h6>

                      {data?.experience?.familiarProducts.length ? (
                        data?.experience?.familiarProducts?.map(
                          (iteem, index) => {
                            if (index == 0) {
                              if (
                                index + 1 ==
                                data?.experience?.familiarProducts?.length
                              ) {
                                return <p> {iteem}</p>;
                              } else {
                                <p>{iteem},</p>;
                              }
                            }
                            if (
                              index + 1 ==
                              data?.experience?.familiarProducts?.length
                            ) {
                              return (
                                <p style={{ marginLeft: "2px" }}> {iteem}</p>
                              );
                            } else {
                              return (
                                <p style={{ marginLeft: "2px" }}> {iteem},</p>
                              );
                            }
                          }
                        )
                      ) : (
                        <span className="text-muted">Not Added</span>
                      )}
                    </div>
                    <div className="reportview">
                      <h6>Job Type</h6>
                      {data?.jobType ? (
                        <span>{data?.jobType}</span>
                      ) : (
                        <span className="text-muted">Not Added</span>
                      )}
                    </div>
                    <div className="reportview">
                      <h6>Mile Range</h6>
                      {data?.maxMiles && data?.minMiles ? (
                        <span>
                          {data?.minMiles} - {data?.maxMiles}
                        </span>
                      ) : (
                        <span className="text-muted">Not Added</span>
                      )}
                    </div>
                    {/* </div> */}
                  </div>
                  <hr />
                  <h6 className="license-h6">License</h6>
                  <div
                    className="divLicenseSection pl-4 pt-3"
                    style={
                      data?.experience?.license?.length == 0 &&
                      data?.experience?.license?.length == 1
                        ? { height: "10px" }
                        : { height: "auto" }
                    }
                  >
                    <>
                      {!data?.experience?.license ? (
                        <div className="pb-2">
                          <p className="toBeAdded"> No license added yet!</p>
                        </div>
                      ) : (
                        data?.experience?.license?.map((i, key) => {
                          return (
                            <>
                              <div className="d-flex ">
                                <div>
                                  <p
                                    className="licenseH1"
                                    style={{
                                      marginRight: "20px",
                                      marginTop: "35%",
                                    }}
                                  >
                                    {key + 1}.
                                  </p>
                                </div>
                                <div>
                                  <h1 className="licenseH1">{i.name}</h1>
                                  <p className="detailp">
                                    License#{" "}
                                    <span style={{ color: "black" }}>
                                      {i.number}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </>
                          );
                        })
                      )}
                    </>
                  </div>
                  <hr />
                  <h6 className="license-h6">Year of Experience</h6>
                  <div
                    className="divLicenseSection pl-4 pt-3"
                    style={
                      data?.experience?.license?.length == 0 &&
                      data?.experience?.license?.length == 1
                        ? { height: "10px" }
                        : { height: "auto" }
                    }
                  >
                    <>
                      {!data?.experience?.expYear ? (
                        <div className="pb-2">
                          <p className="toBeAdded"> No experience added yet!</p>
                        </div>
                      ) : (
                        data?.experience?.expYear?.map((i, key) => {
                          return (
                            <>
                              <div
                                className="expDiv"
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <h1 className="exp">
                                  {i.start} - {i.end}{" "}
                                  <span style={{ color: "#757575" }}>
                                    {" "}
                                    &nbsp; {i.end - i.start} year
                                    {i.end - i.start === 1 ? "" : "s"}{" "}
                                    <span className="expYears">experience</span>{" "}
                                  </span>
                                </h1>
                              </div>
                            </>
                          );
                        })
                      )}
                    </>
                  </div>
                  <hr />
                  <div
                    className="reportview descrr w-100"
                    style={{ marginTop: 0 }}
                  >
                    <h6>Additional Certificates</h6>
                    <div className={"d-flex divLicenseSection2 pl-4 pt-3"}>
                      {data?.experience?.certificationImgs?.length > 0 ? (
                        data?.experience?.certificationImgs?.map(
                          (item, index) => {
                            return (
                              <div className="ml-2 mb-2">
                                <img
                                  style={{
                                    width: "50px",
                                    objectFit: "contain",
                                    borderRadius: "2px",
                                  }}
                                  src={item}
                                />
                              </div>
                            );
                          }
                        )
                      ) : (
                        <div className="expDiv">
                          <p className="toBeAdded ml-2">Not Added!</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div
                    className="reportview descrr w-100"
                    style={{ marginTop: 0 }}
                  >
                    <h6>Additional Information</h6>
                    <p>
                      {data?.experience?.AdditionalInfo
                        ? data?.experience?.AdditionalInfo
                        : "Not Added"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
export default UserView;
