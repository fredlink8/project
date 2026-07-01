import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Style, Icon } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import type { Property } from '../../types';

export function createMapMarker(property: Property) {
  const marker = new Feature({
    geometry: new Point(fromLonLat([property.location.longitude, property.location.latitude])),
    property,
  });

  marker.setStyle(
    new Style({
      image: new Icon({
        src: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#3B82F6"/>
            <circle cx="12" cy="12" r="3" fill="white"/>
          </svg>
        `),
        scale: 1,
      }),
    })
  );

  return marker;
}