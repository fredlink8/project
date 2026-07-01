import { useRef } from 'react';
import Overlay from 'ol/Overlay';
import type { Property } from '../../types';

interface MapPopupProps {
  map: any;
}

export function MapPopup({ map }: MapPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<Overlay | null>(null);

  if (popupRef.current && !overlayRef.current) {
    overlayRef.current = new Overlay({
      element: popupRef.current,
      positioning: 'bottom-center',
      offset: [0, -10],
      stopEvent: false,
    });
    map.addOverlay(overlayRef.current);
  }

  return (
    <div 
      ref={popupRef} 
      className="absolute z-10 transform -translate-x-1/2 -translate-y-full pointer-events-none" 
    />
  );
}

export function updatePopup(overlay: Overlay, element: HTMLElement, property: Property, coordinates: number[]) {
  overlay.setPosition(coordinates);
  element.innerHTML = `
    <div class="bg-white p-2 rounded-lg shadow-lg border border-gray-200">
      <h3 class="font-semibold">${property.title}</h3>
      <p class="text-sm">$${property.price_per_day}/day</p>
    </div>
  `;
}