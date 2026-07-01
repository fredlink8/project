import { useCallback, useRef } from 'react';
import Overlay from 'ol/Overlay';
import type { Property } from '../types';

export function useMapPopup() {
  const popupRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<Overlay | null>(null);

  const initializePopup = useCallback((map: any) => {
    if (popupRef.current && !overlayRef.current) {
      overlayRef.current = new Overlay({
        element: popupRef.current,
        positioning: 'top-right',
        offset: [-10, -10], // Offset slightly from the marker
        autoPan: {
          animation: {
            duration: 250
          }
        }
      });
      map.addOverlay(overlayRef.current);
    }
  }, []);

  const showPopup = useCallback((property: Property, coordinates: number[]) => {
    if (overlayRef.current && popupRef.current) {
      overlayRef.current.setPosition(coordinates);
      return true;
    }
    return false;
  }, []);

  const hidePopup = useCallback(() => {
    if (overlayRef.current) {
      overlayRef.current.setPosition(undefined);
    }
  }, []);

  return {
    popupRef,
    overlayRef,
    initializePopup,
    showPopup,
    hidePopup
  };
}