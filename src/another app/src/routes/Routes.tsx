import React from "react";
import { allFlattenRoutes as routes } from "./Index";
import Loadable from "react-loadable";
import { HashRouter, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ForgotPassword from "../pages/auth/ForgetPassword/ForgotPassword";
import SetPassword from "../pages/auth/SetPassword";
import Login from "../pages/auth/Login";
import Dasboard from "../pages/dashboard/Dasboard";
import Logout from "../pages/auth/Logout";

// Lazy loading and code splitting -
const loading = () => <div></div>;
const AuthLayout = Loadable({
  loader: () => import("../layout/authLayout"),
  render(loaded: any, props: any) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading,
});

const MainUserLayout = Loadable({
  loader: () => import("../layout/MainLayout"),
  render(loaded: any, props: any) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading,
});

export const Routes: React.FC = () => {
  const getLayout = () => {
    let a = 2;
    if (a === 1) return AuthLayout;
    else return MainUserLayout;
  };

  
  const {auth}:any = useSelector((state) => state)
  React.useEffect(() => {
    
  }, [auth.user]);

  const data = localStorage.getItem("userId")
  
  let Layout = AuthLayout
  if (data) { Layout = getLayout(); }

  return (<div >
    {!auth.user ?
      <>
        <HashRouter>
          <Switch>
            <Route path="/" exact component={Login}></Route>
            <Route path="/forgot" component={ForgotPassword}></Route>
            <Route path="/setpassword" component={SetPassword}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="*" exact component={Login}></Route>
          </Switch>
        </HashRouter>
      </> :
      <HashRouter>
        <Layout>
          <Switch>
            {routes.map((route, index) => {
              return !route.children ? (
                <route.route
                  key={index}
                  path={route.path}
                  roles={route.roles}
                  exact={route.exact}
                  component={route.component}
                ></route.route>
              ) : null;
            })}
            <Route path="*" exact component={Dasboard}></Route>
          </Switch>
        </Layout>
      </HashRouter>
    }
  </div>
  );
};
