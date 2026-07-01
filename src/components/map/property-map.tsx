import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import 'ol/ol.css';
import { useMapInstance } from './use-map-instance';
import { createMapMarker } from './map-marker';
import type { Property } from '../../types';

interface PropertyMapProps {
  properties: Property[];
  onPropertySelect?: (property: Property) => void;
}

export function PropertyMap({ properties, onPropertySelect }: PropertyMapProps) {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const [vectorSource] = useState(() => new VectorSource());
  const mapInstance = useMapInstance({ 
    mapRef, 
    vectorSource, 
    initialZoom: properties.length === 1 ? 14 : 4 
  });

  // Initialize map markers
  useEffect(() => {
    if (!mapInstance.current) return;

    vectorSource.clear();
    properties.forEach((property) => {
      const marker = createMapMarker(property);
      vectorSource.addFeature(marker);
    });

    if (properties.length > 1) {
      const extent = vectorSource.getExtent();
      mapInstance.current.getView().fit(extent, { padding: [50, 50, 50, 50] });
    }
  }, [properties, vectorSource, mapInstance]);

  // Handle map clicks
  useEffect(() => {
    if (!mapInstance.current) return;

    const handleClick = (event: any) => {
      const feature = mapInstance.current!.forEachFeatureAtPixel(
        event.pixel, 
        (feature: Feature) => feature
      );
      
      if (feature) {
        const property = feature.get('property') as Property;
        navigate(`/property/${property.id}`);
      }
    };

    mapInstance.current.on('click', handleClick);
    return () => {
      if (mapInstance.current) {
        mapInstance.current.un('click', handleClick);
      }
    };
  }, [mapInstance, navigate]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}