export type ShipmentData = {
    id?: string;
    trackingId?: string;
    status?: "Delivered" | "In-Transit" | "Manifested" | "Unknown";
    statusSeverity?: "Success" | "Info" | "Warning";
    deliveredTime?: string;
    lastUpdate?: string;
    deliveryAddress?: string;
    totalTransit?: string;
}

export type TrackingEvent = {
    id?: string;
    trackingId?: string;
    status?: "Picked Up" | "Arrived at Facility" | "Processed Through Facility" | "Departed Facility" | "On Board for Delivery" | "Delivered" | "Unknown Scan" | "Return to Sender" | "Package Handling";
    statusSeverity?: "Success" | "Info" | "Warning";
    timestamp?: string;
    location?: string;
}

export interface IShipmentDetails {
    isOpen: boolean;
    onClose: () => void;
    shipmentData?: ShipmentData;
}