import { React, useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";


export default function GoogleMapComponent({ jobData }) {
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
            const entries = Object.entries(jobData);
            for (const [job] of entries) {
                try {
                    const response = await axios.get(
                        `http://localhost:4050/address/${job}`
                    );
                    if (response.data.status === "OK") {
                        const location = response.data.results[0].geometry.location;
                        countryMarkers.push({
                            lat: location.lat,
                            lng: location.lng,
                            title: job,
                        });
                    }
                } catch (error) {
                    console.error(
                        `Error fetching coordinates for ${job.country}:`,
                        error
                    );
                }
            }
            setMarkers(countryMarkers);
            setLoadingLocation(false);
        };
        fetchCoordinates();
    }, [jobData]);

    //  scale the size based on number of jobs every country has
    const iconSizeMultiplier = (length) => {
        return (length > 75 ? length : 75) / 75;
    };

    if (loadingLocation) {
        return (
            <LoadingSpinner loadingMessage="Loading Map, please wait"></LoadingSpinner>
        );
    }

    return (
        <>
            <GoogleMap mapContainerStyle={mapStyles} zoom={4} center={defaultCenter}>
                {!loadingLocation &&
                    markers.map((marker, index) => (
                        <Marker
                            key={index}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            title={marker.title}
                            onClick={(e) => {
                                setAvailableJobsInLocation(jobData[marker.title]);
                                setSelectedCountry(marker.title);
                            }}
                            icon={{
                                url: "https://cdn-icons-png.flaticon.com/512/15/15918.png?ga=GA1.1.827467152.1681676869",
                                scaledSize: new window.google.maps.Size(
                                    20 * iconSizeMultiplier(jobData[marker.title].length),
                                    20 * iconSizeMultiplier(jobData[marker.title].length)
                                ), // Adjust the size based on number of jobs
                            }}
                        />
                    ))}
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
                <p>select a country from the map to show the jobs</p>
            )}
        </>
    );
};

