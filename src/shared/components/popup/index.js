import { React, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import { CircularProgress } from "@material-ui/core";
import { HdrEnhancedSelectOutlined } from "@mui/icons-material";

function PopUp(props) {
  const { mainText, handleYes, handleNo, loader, open } = props;
  return (
    <div>
      <Dialog onClose={handleNo} className="ffeedback" open={open}>
        <IconButton
          aria-label="close"
          onClick={handleNo}
          className="ann-cancel"
        >
          <CancelIcon />
        </IconButton>

        <div className="mainContent logoutpop ">
          <h3>{mainText} </h3>
          <div className="fleeaxxbtn">
            <button className="announce-btn" onClick={handleNo}>
              No
            </button>

            {loader ? (
              <button className="announce-btn-spin">
                {/* <CircularProgress color="white" size={20} /> */}
                <div className="spinner-border boot-loader" role="status"></div>
              </button>
            ) : (
              <button className="announce-btn" onClick={handleYes}>
                Yes
              </button>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default PopUp;
