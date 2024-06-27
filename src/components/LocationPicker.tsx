import { useState, useEffect } from "react";
import axios from "axios";

type Location = {
  latitude: number;
  longitude: number;
};

const LocationPicker = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(loc);
          fetchAddress(loc);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchAddress = async (loc: Location) => {
    try {
      const response = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json",
        {
          params: {
            q: `${loc.latitude},${loc.longitude}`,
            key: "dec653d7d3f842c39417655a4519b382",
          },
        }
      );
      if (response.data.results.length > 0) {
        setAddress(response.data.results[0].formatted);
      } else {
        setError("No address found for this location.");
      }
    } catch (error) {
      setError("Failed to fetch address.");
    }
  };

  return (
    <div>
      {address ? (
        <div className="flex flex-col">
          <p className="font-semibold text-lg leading-tight px-1">
            Delivery in Sometimes
          </p>
          <span className="text-sm _text-default px-1">{address}</span>
        </div>
      ) : (
        <span className="font-medium _text-default">
          {error ? error : "Select Location"}
        </span>
      )}
    </div>
  );
};

export default LocationPicker;
