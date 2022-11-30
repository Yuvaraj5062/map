import React, { useState } from "react";  // React Componenets
import MapPicker from "react-google-map-picker"; // Map Picker
import { mapProps } from "../Types"; // Map Props

import '../../assets/css/Navbar.css' // Navbar CSS Imported
/**
* @type {object}
* for setting default location values
*/
const DefaultLocation = { lat: 21.170240, lng: 72.831062 }; // Default Lat Long
/**
* @type {number}
* for setting default zoom
*/
const DefaultZoom = 10;   // Zooming Index
/**
 * @type {interface} 
 * for props  type
 
 */
interface Props {
  mapData: mapProps;
}

const ResponsiveDialog: React.FC<Props> = ({
  mapData
}) => {
  /**
* @type {object}
* for setting  location values
*/
  const [defaultLocation, setDefaultLocation] = useState(mapData ? mapData : DefaultLocation);
  /**
     * @type {object}
     * for handling location change
     */
  const [location, setLocation] = useState(defaultLocation);  // Location State
  /**
   * @type {object}
   * for setting zoom value
   */
  const [zoom, setZoom] = useState(DefaultZoom); // Zooming State
  /**
     * @type {Function}
     * @param {latL:any , lng:any}   
     * for handlechange location
     */
  function handleChangeLocation(lat: any, lng: any) {
    setLocation({ lat: lat, lng: lng });
  }

  /**
   * @type {Function}
   * @param {number}   newZoom zoom value
   * for handlechange zoom map
   */
  function handleChangeZoom(newZoom: React.SetStateAction<number>) {
    setZoom(newZoom);
  }

  // Design Of Map Picker
  return (
    <>
      <MapPicker
        defaultLocation={defaultLocation}
        zoom={zoom}
        style={{ height: "700px" }}
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey="AIzaSyAkBhTU6Tc8FNdu64ZRG4rPm2bin7H7OOI"
      />
    </>
  );
}
export default ResponsiveDialog