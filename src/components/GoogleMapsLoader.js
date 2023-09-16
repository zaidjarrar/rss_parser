import { LoadScript } from "@react-google-maps/api";

export default function GoogleMapsLoader({ children }) {
    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
            {children}
        </LoadScript>
    );
};
