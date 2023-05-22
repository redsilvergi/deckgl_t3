import { Deck, _GlobeView as GlobeView } from "@deck.gl/core";
import {
  ScatterplotLayer,
  SolidPolygonLayer,
  GeoJsonLayer,
  ArcLayer,
  TextLayer,
  BitmapLayer,
} from "@deck.gl/layers";
import { CSVLoader } from "@loaders.gl/csv";
import { load } from "@loaders.gl/core";
import { MapboxOverlay } from "@deck.gl/mapbox";

import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
mapboxgl.accessToken =
  "pk.eyJ1IjoicmVkc2lsdmVyNTIyIiwiYSI6ImNsaHlkcDc4MzB4MGgzZHJwZjdqamFwODYifQ.m22renmKPUA4rupVepEgAg";

const map = createMap("container");
initMap(map);
const deckOverlay = new MapboxOverlay({
  layers: [], //일단 비워두고 아래에서 업데이트 한다.
});
map.addControl(deckOverlay);

function createMap(containerID) {
  return new mapboxgl.Map({
    container: containerID, // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: [127.6, 35.7], // starting position [lng, lat]
    zoom: 6, // starting zoom
    // projection: "globe", // display the map as a 3D globe
  });
}

function initMap(map) {
  map.addControl(
    new MapboxLanguage({
      defaultLanguage: "ko",
    })
  );
}

const update = () => {
  const layers = [
    new GeoJsonLayer({
      id: "base-world",
      data: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson",
      stroked: true,
      filled: false,
      lineWidthMinPixels: 2,
      getLineColor: [5, 10, 40],
      getFillColor: [15, 40, 80],
      wrapLongitude: true, // enable wrapping of longitude coordinates
      getPosition: (feature) => {
        const [longitude, latitude] = feature.geometry.coordinates;
        const elevation = 0; // set the elevation value as desired
        return [longitude, latitude, elevation];
      },
    }),
  ];

  deckOverlay.setProps({
    layers: layers,
  });
};

update();
