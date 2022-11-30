
import { compose, withProps } from "recompose";
import {DirectionRenderComponent} from "./DirectionRenderComponent";
import { G_API_URL} from "./Types";
import {  useSelector } from "react-redux";
const { withScriptjs, withGoogleMap, GoogleMap } = require("react-google-maps");


const Directions=()=>{
   /**
* @type {any}
* for getting slice data (trip data)
*/
  const { tripMaster }: any = useSelector((state) => state);
  /**
 * @type {object}
 * for setting source and destination 
 */
   let state={
    defaultZoom: 6,
        map: null,
        center: {
         lat:Number(tripMaster.MapData.row.sourceLatitude),
          lng:Number(tripMaster.MapData.row.sourceLongitude)
        },
   }
/**
   * @type {object}
   * for setting map data
   */
   let data={
    key:1,
    index:1,
    strokeColor:"latLng #777E84",
    from:{lat: tripMaster.MapData.row.sourceLatitude, lng: tripMaster.MapData.row.sourceLongitude, fromTitle: tripMaster.MapData.row.source},
    to:{lat: tripMaster.MapData.row.destinationLatitude, lng: tripMaster.MapData.row.destinationLongitude, toTitle: tripMaster.MapData.row.destination}
   }
   
  
    return (
      <GoogleMap
        defaultZoom={state.defaultZoom}
        center={state.center}
        defaultCenter={new window.google.maps.LatLng(Number(tripMaster.MapData.row.sourceLatitude),Number(tripMaster.MapData.row.sourceLongitude))}
      > 
            <DirectionRenderComponent
             prop={data}
            />
      </GoogleMap>
    );
  }


export default compose(
  withProps({
    googleMapURL: G_API_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(Directions);
