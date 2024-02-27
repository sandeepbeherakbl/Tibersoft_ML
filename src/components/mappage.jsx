import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Overlay from "ol/Overlay";
import { fromLonLat } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import PopupContent from "./PopupContent";
import mapMarker from "../Assets/placeholder.png";
import dummyData from "./data.json";
import { HeaderComponent } from "./header";

const MapComponent = () => {
  const mapRef = useRef(null);
  const popupRef = useRef(null);
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [-10000000, 5000000],
        zoom: 5,
      }),
    });

    const popupElement = document.createElement("div"); 
    popupRef.current = new Overlay({
      element: popupElement,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });
    map.addOverlay(popupRef.current);

    const data = dummyData;

    const markers = new VectorLayer({
      source: new VectorSource({
        features: data.map(({ _id, latitude, longitude, cust_name, total, Items_Consumed }) => {
          return new Feature({
            geometry: new Point(
              fromLonLat([parseFloat(longitude), parseFloat(latitude)])
            ),
            id: _id,
            description: `Customer Name: ${cust_name}<br>Total: ${total}<br>Items Consumed: ${Items_Consumed}`,
          });
        }),
      }),
      style: new Style({
        image: new Icon({
          src: mapMarker,
          anchor: [0.5, 1],
        }),
      }),
    });

    map.addLayer(markers);

    map.on("click", function (evt) {
      const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
      });

      if (feature) {
        const dataId = feature.get("id");
        const selectedData = dummyData.find((data) => data._id === dataId);
        setPopupData(selectedData);
        const coordinates = feature.getGeometry().getCoordinates();
        popupRef.current.setPosition(coordinates);
      } else {
        setPopupData(null);
        popupRef.current.setPosition(undefined);
      }
    });

    return () => {
      map.setTarget(null);
    };
  }, []);

  return (
    <>
      <HeaderComponent />
      <div>
        <div ref={mapRef} style={{ width: "100%", height: "93vh" }}></div>
        {popupData && (
          <div
            className="popup"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
            }}
          >
            <PopupContent data={popupData} onClose={() => setPopupData(null)} />
          </div>
        )}
      </div>
    </>
  );
};

export default MapComponent;
