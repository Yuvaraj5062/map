const convertLatLngToObj = (lat:any, lng:any) => {
  return {
    lat,
    lng
  };
};

const createLatLngObject = (latLng:any) => {
   /**
 * @type {any}
 * for setting latitude or longitude values
 */
  const latLngArray = latLng.split(",");
  return {
    lat: latLngArray[0],
    lng: latLngArray[1]
  };
};

const createLocationObject = (
  from:any,
  fromTitle:any,
  to:any,
  toTitle:any,
  strokeColor = "#f68f54"
) => {
  return {
    from: { ...createLatLngObject(from), fromTitle },
    to: { ...createLatLngObject(to), toTitle },
    strokeColor: strokeColor
  };
};

export { convertLatLngToObj, createLocationObject, createLatLngObject };
