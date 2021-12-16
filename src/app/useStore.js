import { useSelector } from "react-redux";
import { selectToken, selectLoggedIN } from "../features/userSlice";


export function Token() { return useSelector(selectToken) }
export function LoggedIn() { return useSelector(selectLoggedIN) }



