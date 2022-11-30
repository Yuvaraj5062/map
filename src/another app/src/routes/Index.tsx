import React from 'react';
import { Route } from 'react-router-dom';
import Dasboard from '../pages/dashboard/Dasboard';
import Report from '../pages/report/Report';
import AddRole from '../pages/role/AddRole/AddRole';
import RoleDetails from '../pages/role/RoleDetail/RoleDetails';
import AddTrip from '../pages/trip/AddTrip/AddTrip';
import TripDetails from '../pages/trip/TripDetails/TripDetails';
import AddUsers from '../pages/user/AddUser/AddUsers'
import UsersDetail from '../pages/user/UserDetails/UsersDetail';
import AddVehicle from '../pages/vehicle/AddVehicle/AddVehicle';
import VehicleDetails from '../pages/vehicle/VehicleDetail/VehicleDetails';

type PrivateRouteProps = {
    path: string;
    name: string;
    component: React.FC<{}>;
    roles: string[];
    route: ({ component: Component, roles, ...rest }: PrivateRouteProps) => void;
}


const PrivateRoute = ({ component: Component, roles, ...rest }: PrivateRouteProps) => {
    return <Route
        {...rest}
        render={(props: any) => {
            return <Component {...props} />;
        }}
    />
}

const rootRoute = {
    path: '/',
    exact: true,
    roles: ["Admin", "User"],
    component: Dasboard,
    route: PrivateRoute,
};

const UserRoutes = {
    path: '/user_detail',
    name: 'User detail',
    component: UsersDetail,
    roles: ["Admin", "User"],
    route: PrivateRoute
};
const UserAddRoutes = {
    path: '/user_detail/add',
    name: 'Add Users',
    component: AddUsers,
    roles: ["Admin", "User"],
    route: PrivateRoute
};
const VechicleRoutes = {
    path: '/vehicleDetails',
    name: 'Refer A Friend',
    component: VehicleDetails,
    roles: ["Admin", "User"],
    route: PrivateRoute
};

const VechicleAddRoutes = {
    path: '/vehicleDetails/add',
    name: 'My werkCredits',
    component: AddVehicle,
    roles: ["Admin", "User"],
    route: PrivateRoute
};
const RoleRoutes = {
    path: '/role_detail',
    name: 'role detail',
    component: RoleDetails,
    roles: ["Admin", "User"],
    route: PrivateRoute
};
const RoleAddRoutes = {
    path: '/role_details/add',
    name: 'Role Deatail Add ',
    component: AddRole,
    roles: ["Admin", "User"],
    route: PrivateRoute
};
const TripRoutes = {
    path: '/trip_details',
    name: 'trip_details',
    component: TripDetails,
    roles: ["Admin", "User"],
    route: PrivateRoute
};
const TripAddRoutes = {
    path: '/trip_details/add',
    name: '/trip_details Add ',
    component: AddTrip,
    roles: ["Admin", "User"],
    route: PrivateRoute
};
const ReportRoutes = {
    path: '/report',
    name: '/report ',
    component: Report,
    roles: ["Admin", "User"],
    route: PrivateRoute
};

const authRoutes = {
    path: '/account',
    name: 'Auth',
    children: [
        {
            path: '/account/login',
            name: 'Login',
            component: "blank",
            route: Route,
        },
        {
            path: '/account/logout',
            name: 'Logout',
            component: "blank",
            route: Route,
        },
        {
            path: '/account/register',
            name: 'Register',
            component: "blank",
            route: Route,
        },
        {
            path: '/account/confirm',
            name: 'Confirm',
            component: "blank",
            route: Route,
        },
        {
            path: '/account/forget-password',
            name: 'Forget Password',
            component: "blank",
            route: Route,
        },
    ],
};


const flattenRoutes = (routes: any) => {
    let flatRoutes: any[] = [];

    routes = routes || [];
    routes.forEach((item: any) => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

const allRoutes = [
    rootRoute,
    UserAddRoutes, UserRoutes, VechicleAddRoutes, VechicleRoutes, RoleRoutes, RoleAddRoutes, 
    TripAddRoutes, TripRoutes,ReportRoutes

]

const allFlattenRoutes = flattenRoutes(allRoutes);

export { allRoutes, allFlattenRoutes, authRoutes };