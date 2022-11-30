
export default function setupAxios(axios: { interceptors: { request: { use: (arg0: (config: { headers: { Authorization: string; }; }) => { headers: { Authorization: string; }; }, arg1: (err: any) => Promise<never>) => void; }; }; }, store: { getState: () => { auth: { authToken: any; }; }; }) {
    axios.interceptors.request.use(
        (      config: { headers: { Authorization: string; }; }) => {
        const {
          auth: { authToken }
        } = store.getState();

        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
  
        return config;
      },
      err => Promise.reject(err)
    );
  }
  