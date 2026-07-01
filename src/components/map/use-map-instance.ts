import { useEffect, useRef, MutableRefObject } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';

interface UseMapInstanceProps {
  mapRef: MutableRefObject<HTMLDivElement | null>;
  vectorSource: VectorSource;
  initialZoom?: number;
}

export function useMapInstance({ mapRef, vectorSource, initialZoom = 4 }: UseMapInstanceProps) {
  const mapInstance = useRef<Map | null>(null);
  const vectorLayer = new VectorLayer({ source: vectorSource });

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([20.5937, 3.4653]), // Center of Africa
        zoom: initialZoom,
      }),
    });

    mapInstance.current = map;

    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget(undefined);
        mapInstance.current.dispose();
        mapInstance.current = null;
      }
    };
  }, [mapRef, vectorLayer, initialZoom]);

  return mapInstance;
}