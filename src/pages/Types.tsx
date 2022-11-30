//As per we used typescript it's the interface for all field types
export  interface loginInfo {
    userId: number,
    firstName: string,
    lastName?: string,
    dob?: any,
    address?: string,
    postalCode?: string,
    mobile?: number,
    emailId?: string,
    userName?: string,
    firstTimeLogin?: null,
    token?: string,
    refreshtoken?:string
  }
export interface editUserProps{
  address?:string
createOn?: string
dlNo?: string
dob?: string
emailId?: string
firstName?: string
firstTimeLogin?: string
isActive?: boolean
isDelete?: boolean
lastName?: string
mobile?: number
password?: string
postalCode?: string
updateOn?: string
userId: number
userName?: string
userRole?: string
}

export interface editTripProps
  {
    tripId:number,
    vehicleId: number,
    userId?: number,
    source?: string
    sourceLatitude?: string
    sourceLongitude?: string
    destination?: string
    destinationLatitude?: string
    destinationLongitude?: string
    startDateTime?: string
    endDateTime?: string
    userFullName?:string;
    vehicleName?:string;
  }


  export interface editVehicleProps{
    vehicleId:number
    vehicleName: string,
    vehicleBrand: string,
    vehicleModel: string,
    vehicleLicensePlateNo: string,
    vehicleUniqueNo: string,
    beaconUniqueNo: string
  }

  export interface editRoleProps{
    id:number,
    userRole:string
  }
  export interface mapProps{
    lat:any,
    lng:any
  }



  export interface ICoin {
    id: string;
    name: string;
    current_price: number;
    symbol: string;
    price_change_percentage_24h: number;
    image: string;
    market_cap: number;
    market_cap_rank: number;
  }
  