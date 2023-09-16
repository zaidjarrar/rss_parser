import { React, useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import LoadingSpinner from "./LoadingSpinner";
import apiHandler from "../api_handler/api_handler";
import '../styles/map_styles.css'
export default function GoogleMapComponent({ countriesList }) {
    const markerIconUrl = "https://cdn-icons-png.flaticon.com/512/15/15918.png?ga=GA1.1.827467152.1681676869";

    const mapStyles = {
        height: "400px",
        width: "100%",
    };

    // Initial latitude and longitude are Amman , Jordan
    const defaultCenter = {
        lat: 31.9539494,
        lng: 35.910635,
    };
    const [markers, setMarkers] = useState([]);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [availableJobsInLocation, setAvailableJobsInLocation] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    useEffect(() => {
        const fetchCoordinates = async () => {
            setLoadingLocation(true);
            const countryMarkers = [];
            const countriesEntries = Object.entries(countriesList);
            for (const [country] of countriesEntries) {
                const locData = await apiHandler.fetchCountryAddress(country);
                countryMarkers.push(locData);
            }
            setMarkers(countryMarkers);
            setLoadingLocation(false);
        };
        fetchCoordinates();
    }, [countriesList]);

    //  scale the size based on number of jobs every country has , if less than 75 jobs are listed default to 75
    const iconSizeMultiplier = (length) => Math.max(length, 75) / 75;


    if (loadingLocation) {
        return (
            <LoadingSpinner loadingMessage="Loading Map, please wait"></LoadingSpinner>
        );
    }

    return (
        <>
            <GoogleMap mapContainerStyle={mapStyles} zoom={4} center={defaultCenter}>
                {
                    markers.map((marker, index) => {
                        var jobsList = countriesList[marker.title];
                        return (

                            <Marker
                                key={index}
                                position={{ lat: marker.lat, lng: marker.lng }}
                                title={marker.title}
                                onClick={() => {
                                    setAvailableJobsInLocation(jobsList);
                                    setSelectedCountry(marker.title);
                                }}
                                icon={{
                                    url: markerIconUrl,
                                    scaledSize: new window.google.maps.Size(
                                        20 * iconSizeMultiplier(jobsList.length),
                                        20 * iconSizeMultiplier(jobsList.length)
                                    ), // Adjust the size based on number of jobs
                                }}
                            />

                        )
                    })}
            </GoogleMap>

            {selectedCountry ? (
                <div>
                    <p>
                        number of jobs in {selectedCountry} :{" "}
                        {availableJobsInLocation.length}
                    </p>
                    <ul className="title-list">
                        {availableJobsInLocation.map((e, index) => {
                            return (
                                <li key={index}>
                                    <div className="title" key={index}>
                                        {e}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                <p>select a country marker from the map to show the jobs</p>
            )}
        </>
    );
};

