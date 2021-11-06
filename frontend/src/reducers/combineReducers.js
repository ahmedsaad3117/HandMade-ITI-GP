import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import searchReducer from "./searchReducer";
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userUpdatePasswordReducer
} from "./userReducer";

export default combineReducers({
    productReducer,
    cartReducer,
    searchReducer,
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userUpdatePasswordReducer
});
