import React, { useCallback, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  FeatureGroup,
  GeoJSON,
} from "react-leaflet";
function Main() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [myCountry, setMyCountry] = useState(null);
  const [position, setPosition] = useState(null);
  const [posarray, setposarray] = useState(null);
  const [testarray, settestarray] = useState([]);
  async function getData() {
    setLoading(true);
    try {
      const req = await fetch(
        "https://s3.amazonaws.com/rawstore.datahub.io/6109f3f2c678766be447971ed0c126f4.geojson"
      );
      const res = await req.json();

      setData(res.features);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  function set(coords, prop) {
    document.getElementById("inputCountry").value = "";
    if (position) {
      setPosition(null);
      setPosition(coords);
    } else {
      setPosition(coords);
    }

    if (myCountry) {
      setMyCountry(null);
      setMyCountry(prop);
    } else {
      setMyCountry(prop);
    }
    setMyCountry(prop);
  }
  function clear() {
    setPosition(null);
    setposarray(null)
    settestarray([])
  }
  function searchCountry() {
    const myCountry = document.getElementById("inputCountry");

    data.filter(
      (item) =>
        item.properties.country.toLowerCase() ===
          myCountry.value.toLocaleLowerCase() &&
        setposarray(item.geometry.coordinates.flat(Infinity))
    );
  }

  useEffect(() => {
    posarray && console.log(posarray);
    if (posarray) {
      for (let x = 0; x < posarray.length - 1; x++) {
        console.log([posarray[x], posarray[x + 1]]);
        settestarray((prev) => [...prev, [posarray[x], posarray[x + 1]]]);
      }
    }
  }, [posarray]);
  useEffect(() => {
    testarray.length > 1 && console.log(testarray);
  }, [testarray]);
  if (loading === true) return <b>loading</b>;
  return (
    data && (
      <>
        <div className="flex justify-between items-center p-4">
          <input
            className="w-[15rem] border rounded p-2 outline-none focus:shadow-outline"
            type="text"
            placeholder="enter country"
            id="inputCountry"
          />
          <div>
            <button
              onClick={clear}
              className="bg-red-500 text-white w-[10rem] h-[2.6rem] uppercase text-sm mr-2 font-semibold rounded"
            >
              clear
            </button>
            <button
              onClick={searchCountry}
              className="bg-green-500 hover:bg-green-700 text-white w-[10rem] h-[2.6rem] uppercase text-sm font-semibold rounded"
            >
              search
            </button>
          </div>
        </div>
        <MapContainer center={[20, 100]} zoom={2}>
          <GeoJSON data={data}/>
          {testarray.length>1 && testarray.map((item,index)=>(
             <Marker position={item}>
              <Popup>hello</Popup>
            </Marker>
       
          ))}
        </MapContainer>
      </>
    )
  );
}

export default Main;
