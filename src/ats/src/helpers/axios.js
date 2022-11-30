import axios from 'axios';
import { baseUrl } from './baseurl';
//import { setSession } from './authUtils';

const api = axios.create( {
    baseURL : baseUrl,  
} );

api.interceptors.response.use( 
    ( response ) => {
        return response;
    },
    ( error ) => {
        const originalRequest = error.config;
        let guid = localStorage.getItem( 'crolGUID' );
        delete api.defaults.headers.common['Authorization'];

        if( guid && error.response.status === 401 && !originalRequest._retry ) {
            originalRequest._retry = true;
            return axios
                .post( baseUrl + 'auth', { GUID: guid } )
                .then( ( res ) => {
                    if( res.status === 200 ){
                       // setSession( res.data.token, '' );
                        originalRequest.headers.Authorization = `Bearer ` + res.data.token;
                        return axios( originalRequest );
                    }
                } );
        }

        return Promise.reject( error );
    }
 );

export default api;