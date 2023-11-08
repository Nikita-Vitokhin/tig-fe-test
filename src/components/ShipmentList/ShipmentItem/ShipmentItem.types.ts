import { ShipmentData } from "../../ShipmentDetails/ShipmentDetails.types";

export interface IShpimentItem extends ShipmentData {
    onClick: (data: ShipmentData) => void,
}