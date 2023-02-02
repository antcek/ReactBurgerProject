import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';




function ProtectedRouteElement({element}) {

   const userData = (useSelector(store => store.loginUser));
   const accessToken = Cookies.get('accessToken')
  

  return accessToken || userData.userAuthorizied ? element : <Navigate to='/login' replace={true}/>
}

export default ProtectedRouteElement