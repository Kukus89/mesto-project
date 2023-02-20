import "../src/index.css";
import "./components/card.js"
import "./components/validate.js"
import "./components/modal.js"
import "./components/utils.js"
import { enableValidation, popupForm } from "./components/validate.js";

enableValidation(popupForm);

