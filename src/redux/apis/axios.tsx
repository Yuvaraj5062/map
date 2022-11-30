import axios from 'axios';
import { baseUrl } from './appUrls';

const api = axios.create( {
    baseURL : baseUrl,  
} );

api.interceptors.response.use( 
    ( response ) => {
    
        return response;
    },
    ( error ) => {
        const originalRequest = error.config;
        let guid = localStorage.getItem( 'token' );
        delete api.defaults.headers.common['Authorization'];
        if( guid && error.response.status === 401 && !originalRequest._retry ) {
            originalRequest._retry = true;
            return axios
                .post( baseUrl + '/Auth/RefreshToken', {
                    "token": localStorage.getItem("token"),
                    "refreshtoken": localStorage.getItem("refreshtoken")
                  })
                .then( ( res ) => {
                    if( res.status === 200 ){
                        localStorage.setItem("token", res.data.responseData.token);
                        localStorage.setItem("refreshtoken", res.data.responseData.refreshtoken)
                        originalRequest.headers.Authorization = `Bearer ` + res.data.responseData.token;
                        return axios( originalRequest );
                    }
                } );
        }

        return Promise.reject( error );
    }
 );

export default api;