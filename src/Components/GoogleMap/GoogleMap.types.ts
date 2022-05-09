export interface IGoogleMapProps {
    defaultZoom: number;
    defaultCenterLatitude: number;
    defaultCenterLongitude: number;
    onClick: (lat: number, lng: number) => void;
}

export interface IMapCoordinates{
    latitude: number;
    longitude: number;
    centerX: number;
    centerY: number;
}