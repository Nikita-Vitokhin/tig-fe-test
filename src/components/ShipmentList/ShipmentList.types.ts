import { ShipmentData } from "../ShipmentDetails/ShipmentDetails.types";

export interface IShipmentList {
    onItemClick: (shipmentData: ShipmentData) => void,
}