import React, { Suspense } from "react";

import { Grid } from "@mui/material";
import {Navbar} from "../components/Navbar";
import {
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

/**
        * @type {any}
        * for lazy loading
        */
const LeftSidebar = React.lazy(
  () => import("../components/LeftSideBar/LeftSideBar")
);

/**
        * @type {Function}
        * for loading
        */
const emptyLoading = () => <div></div>;
const loading = () => <div></div>;

 const MainLayout: React.FC = ({ children }) => {
  /**
       * @type {boolean}
       * for setting flag
       */
  const [toggle, setToggle] =React.useState<boolean>(true);
 /**
   *  * @callback Predicate
   * @param {boolean} flag}
   * for calling page on onChange 
   
   */
  const updateToggle = React.useCallback(
      (newValue: boolean): void => setToggle(newValue),
      [setToggle]
  );

  /**
 * @type {object|null}
 * for setting children
 
 */
  const child = children || null;
  const theme = useTheme();
 /**
 * @type {boolean}
 * for setting UI on mobile view
 
 */
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  /**
 * @type {number}
 * for setting grid size
 
 */
  let nav=2;
    /**
 * @type {number}
 * for setting grid size
 
 */
  let content=10
  if(isMobile){
nav=0
content=12
  }
  return (
    
// Main Layout Grid
<div  style={{background:"#ffffff" ,height:"100%"}}>
        <Suspense fallback={emptyLoading()}>
            <Suspense fallback={loading()}>
          
              <Navbar   value={toggle}
                        onToggleChange={updateToggle}/>
            </Suspense>
            {isMobile?
             <Grid container spacing={1}>
              <Grid item xs={content}>  
              {child}
              </Grid>
            </Grid>:
          <div>
         {toggle?   <Grid container spacing={1}>
           
              <Grid item xs={nav}>
                <Suspense fallback={loading()}>
                  <LeftSidebar />
                </Suspense>
              </Grid>
              <Grid item xs={content}>  
              {child}
              </Grid>
            </Grid> :
             <Grid container spacing={1}>
             <Grid item xs={12}>
             {child}
             </Grid>
           </Grid>}
        </div>}
        </Suspense>
      </div>  
  );
};
export default MainLayout;