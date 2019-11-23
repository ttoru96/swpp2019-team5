import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

export {
    getOutfits,
    getSpecificOutfit,
    createOutfit,
    deleteOutfit,
} from "./outfit";

export { logIn, logOut, signUp, getLogin } from "./login";

export { createItem } from "./item";

export { createTag } from "./tag";

export { getWeather, getSpecificDayWeather } from "./weather";
