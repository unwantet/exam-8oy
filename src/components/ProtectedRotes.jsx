import { Navigate } from "react-router-dom";


function ProtectedRotes({children , user}) {
 if (user) {
    return children
 }else{
    return <Navigate to="/register" />
 }   


}

export default ProtectedRotes;