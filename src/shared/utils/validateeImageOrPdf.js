import { notify } from "./notify";
const validateeImageOrPdf = (file, callback) => {
  console.log("filess", file);

  const arr = [];

  if (Object.keys(file).length > 1) {
    if (file) {
      Object.keys(file).forEach((key) => {
        if (
          file[key]?.type?.includes("png") ||
          file[key]?.type?.includes("jpeg")
        ) {
          arr.push(file[key]);
        } else if (file[key]?.type?.includes("pdf")) {
          // callback(files, "pdf");
          arr.push(file);
        } else {
            notify("error", "Supported Formats PDF, PNG, JPEG");
          callback(false);
        }
        // arr.push(file[key])
      });
      callback(arr, "");
    }
  } else {
    if (file?.type?.includes("png") || file?.type?.includes("jpeg")) {
      callback(file, "img");
    } else if (file?.type?.includes("pdf")) {
      callback(file, "pdf");
    } else {
        notify("error", "Supported Formats PDF, PNG, JPEG");
      callback(false);
    }
  }
  console.log("arr", arr);
};

export { validateeImageOrPdf };
