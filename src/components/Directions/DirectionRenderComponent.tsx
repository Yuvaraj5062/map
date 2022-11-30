import {  useState,useEffect } from "react";
import { convertLatLngToObj } from "./helper";
const { Marker, DirectionsRenderer } = require("react-google-maps");

export const DirectionRenderComponent = (props: any

) => {
  /**
 * @type {undefined}
 * for setting directions of map
 */
    const [directions,setMyDirections]=useState()
   /**
* @type {any}
* for setting way points of map
*/
    const [wayPoints,serWayPoints]=useState<any>()
   /**
* @type {any}
* for setting current location 
 
*/
    const [currentLocation,setMyCurrentLocation]=useState<any>()
   /**
* @type {number}
* for setting delay factor
*/
    let delayFactor = 0;
   /**
   * @async
* @function direction
* @param {startLoc:any, destinationLoc:any, wayPoints:any} 
*/

  const  getDirections=async(startLoc:any, destinationLoc:any, wayPoints:any)=> {
      /**
* @type {any}
* for setting way points
*/    
    let waypts:any;
        if (wayPoints.length > 0) {
          waypts.push({
            location: new window.google.maps.LatLng(
              wayPoints[0].lat,
              wayPoints[0].lng
            ),
            stopover: true
          });
        }
    
        const directionService = new window.google.maps.DirectionsService();
        directionService.route(
          {
            origin: startLoc,
            destination: destinationLoc,
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: window.google.maps.TravelMode.DRIVING
          },
          (result:any, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                setMyDirections(result)
                serWayPoints(result.routes[0].overview_path.filter((elem:any, index:number) => {
                    return index % 30 === 0;
                  }))
        
            } else if (
              status === window.google.maps.DirectionsStatus.OVER_QUERY_LIMIT
            ) {
               delayFactor += 0.2;
              setTimeout(() => {
                 getDirections(startLoc, destinationLoc, wayPoints);
              },  delayFactor * 200);
            } else {
              console.error(`error fetching directions ${result}`);
            }
          }
        );
      }
/**
   * @type {Function}
   * for setting current location
   */
    const  setCurrentLocation = () => {
     /**
* @type {number}
* for count
*/
        let count = 0;
        let refreshIntervalId = setInterval(() => {
          const locations =  wayPoints;
          if (locations) {
            if (count <= locations.length - 1) {
              const currentLocation = convertLatLngToObj(
                locations[count].lat(),
                locations[count].lng()
              );
              setMyCurrentLocation({ currentLocation });
              const wayPts = [];
              wayPts.push(currentLocation);
              const startLoc =  props.prop.from.lat + ", " +  props.prop.from.lng;
              const destinationLoc =  props.prop.to.lat + ", " +  props.prop.to.lng;
              delayFactor = 0;
              getDirections(startLoc, destinationLoc, wayPts);
              count++;
            } else {
              clearInterval(refreshIntervalId);
            }
          }
        }, 1000);
      };
/**
  * @type {Function}
  * for setting source and destinatiomn on first time rendring
  */
    useEffect(() => {
        const startLoc = props.prop.from.lat + ", " +  props.prop.from.lng;
        const destinationLoc =  props.prop.to.lat + ", " +  props.prop.to.lng;
         getDirections(startLoc, destinationLoc,props.prop.from);
         setCurrentLocation();
      }, [])

    /**
* @type {any}
* for setting source marker
*/
      let originMarker = null;
      /**
* @type {any}
* for setting destination marker
*/
      let destinationMarker = null;
      if (directions && props.prop.index) {
        originMarker = (
          <Marker
            defaultLabel="S"
            
            defaultIcon={null}
            position={{
              lat: parseFloat(props.prop.from.lat),
              lng: parseFloat(props.prop.from.lng)
            }}
          />
        );
        destinationMarker = (
          <Marker
            label="D"
          
            defaultIcon={null}
            position={{
              lat: parseFloat(props.prop.to.lat),
              lng: parseFloat(props.prop.to.lng)
            }}
          />
        );
      }
      return (
        <div>
          {originMarker}
          {destinationMarker}
          {currentLocation && (
            <Marker
              label={props.prop.index.toString()}
              position={{
                lat: currentLocation.lat,
                lng: currentLocation.lng
              }}
            />
          )}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  storkeColor: props.prop.storkeColor,
                  strokeOpacity: 0.4,
                  strokeWeight: 4
                },
                preserveViewport: true,
                suppressMarkers: true,
                icon: { scale: 3 }
              }}
            />
          )}
        </div>
      );
    }

  