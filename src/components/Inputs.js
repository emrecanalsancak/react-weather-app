import React, { useContext, useState } from "react";
import { UilSearch, UilMapMarker } from "@iconscout/react-unicons";
import { toast } from "react-toastify";
import AppContext from "./Context";

const Inputs = ({ setQuery, units, setUnits }) => {
  const [city, setCity] = useState("");
  // const [unitHighlight, setUnitHighlight] = useState(true);
  const myContext = useContext(AppContext);

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching users location.");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Loaction fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) {
      setUnits(selectedUnit);
      myContext.toggleHighlight();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearchClick();
  };

  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="Search for city..."
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
          onKeyDown={handleKeyDown}
        />
        <UilSearch
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <UilMapMarker
          size={25}
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>

      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className={`text-xl ${
            myContext.unitHighlight ? "text-yellow-300" : "text-white"
          } font-light hover:scale-125 transition ease-out`}
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className="text-xl text-white mx-2 mb-0.5">|</p>
        <button
          name="imperial"
          className={`text-xl ${
            myContext.unitHighlight ? "text-white" : "text-yellow-300"
          } font-light hover:scale-125 transition ease-out`}
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;
