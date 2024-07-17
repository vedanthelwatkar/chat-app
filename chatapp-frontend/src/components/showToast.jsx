import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const showToast = (message, type) => {
  const color = type === "error" ? "#cc2200" : "#6ea550";

  Toastify({
    text: message,
    duration: 3000,
    gravity: "bottom",
    position: "center",
    style: {
      background: color,
    },
  }).showToast();
};

export default showToast;
