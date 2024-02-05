import React from "react";
import { ToastContainer, toast } from "react-toastify";
export const notify = (msg, type) => {
  if (type === "success") {
    toast.success(msg, {theme: "colored"});
  } else {
    toast.error(msg, {
      theme: "colored",
    });
  }
};

function Notify() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3118}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default Notify;
