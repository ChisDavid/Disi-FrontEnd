import { useEffect, useState } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { IGoogleMapProps, IMapCoordinates } from "./GoogleMap.types";

const defaultCoordinates: IMapCoordinates = { latitude: 0, longitude: 0, centerX: 0, centerY: 0 };
const Map = (props: IGoogleMapProps): JSX.Element => {
  const [coordinates, setCoordinates] = useState<IMapCoordinates>(defaultCoordinates);

  const onMapClick = (e: google.maps.MapMouseEvent): void => {
    setCoordinates({ ...coordinates, latitude: e.latLng.lat(), longitude: e.latLng.lng() })
    props.onClick(e.latLng.lat(), e.latLng.lng());
  };

  const setCurrentLocation = (): void => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoordinates({ ...coordinates, centerX: position.coords.latitude, centerY: position.coords.longitude });
      });
    }
  }

  useEffect(() => {
    setCurrentLocation();
  }, []);

  return (
    <>
      <GoogleMap
        defaultZoom={props.defaultZoom}
        center={{ lat: coordinates.centerX, lng: coordinates.centerY }}
        onClick={onMapClick}
      >
        {coordinates.latitude ? <Marker position={{ lat: coordinates.latitude, lng: coordinates.longitude }} /> : null}
      </GoogleMap>
    </>
  );
}

export const MapComponent = withScriptjs(withGoogleMap(Map));