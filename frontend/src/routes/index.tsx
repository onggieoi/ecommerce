import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { HOME } from '../constants/pages';
// import InLineLoader from "../components/InlineLoader";
// import { useAppDispatch, useAppSelector } from "../hooks/redux";
import LayoutRoute from "./LayoutRoute";
// import Roles from "src/constants/roles";
// import { me } from "src/containers/Authorize/reducer";

const Home = lazy(() => import('../App'));
// const User = lazy(() => import('../containers/User'));
// const Asset = lazy(() => import('../containers/Asset'));
// const Assignment = lazy(() => import('../containers/Assignment'));
// const Request = lazy(() => import('../containers/Returnee'));
// const Report = lazy(() => import('../containers/Report'));
// const Login = lazy(() => import('../containers/Authorize'));
// const NotFound = lazy(() => import("../containers/NotFound"));

const SusspenseLoading = ({ children }) => (
  <Suspense fallback={<div>Loading ...</div>}>
    {children}
  </Suspense>
);

const ApplicationRoutes = () => {
  // const { isAuth, account } = useAppSelector(state => state.authReducer);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(me());
  // }, []);

  // if (!isAuth) return (
  //   <SusspenseLoading>
  //     <Login />
  //   </SusspenseLoading>
  // );

  // if (isAuth && account?.role === Roles.Staff) return (
  //   <SusspenseLoading>
  //     <Switch>
  //       <LayoutRoute exact path={HOME}>
  //         <Home />
  //       </LayoutRoute>
  //     </Switch>
  //   </SusspenseLoading>
  // );

  // if (isAuth && account?.role === Roles.Admin) return (
  //   <SusspenseLoading>
  //     <Switch>
  //       <LayoutRoute exact path={HOME}>
  //         <Home />
  //       </LayoutRoute>

  //       <Route path={USER}>
  //         <User />
  //       </Route>

  //       <Route path={ASSET}>
  //         <Asset />
  //       </Route>

  //       <Route path={ASSIGNMENT}>
  //         <Assignment />
  //       </Route>

  //       <Route path={RETURNEE}>
  //         <Request />
  //       </Route>

  //       <LayoutRoute exact path={REPORT}>
  //         <Report />
  //       </LayoutRoute>

  //       <Route component={NotFound} />

  //     </Switch>
  //   </SusspenseLoading>
  // );

  // return (<></>);
  return (
    <Routes>
      <Route path={HOME} element={
        <SusspenseLoading>
          <Home />
        </SusspenseLoading>
      }>
      </Route>
    </Routes >
  )

};

export default ApplicationRoutes;