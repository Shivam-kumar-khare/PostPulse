import { Home } from "./index.js";
import { useSelector } from "react-redux";

function HomePage(){
    const isAuthenticatedUser=useSelector((state)=>state.auth.status);
    return < Home isAuthenticatedUser={isAuthenticatedUser} />
}

export default HomePage