import { Navigate, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { FC } from 'react';

const ProtectedRouteElement: FC<RouteProps> = ({ element }) => {

  const userData = (useSelector((store: any) => store.loginUser));
  const accessToken = Cookies.get('accessToken')

  return accessToken || userData.userAuthorizied ? <> {element} </>
    : <Navigate to='/login' replace={true} />
}

export default ProtectedRouteElement