export const G_API_URL = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAkBhTU6Tc8FNdu64ZRG4rPm2bin7H7OOI&&v=3.exp&libraries=geometry,drawing,places`;
// Map Types
    export interface mapTypes{
    key: number;
    index: number;
    strokeColor: string;
    from: {
        lat: string;
        lng: string;
        fromTitle: string;
    };
    to: {
        lat: string;
        lng: string;
        toTitle: string;
    };
}



export interface defaultTypes{
    defaultZoom?: number,
        map?: any,
        center?: {
           lat: number,
           lng: number
         // lat:tripMaster.MapData.row.sourceLatitude,
          //lng:tripMaster.MapData.row.sourceLongitude
        }
}