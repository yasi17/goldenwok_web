import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface InteractiveMapProps {
  isLight?: boolean;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ isLight = false }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const LAT = 37.94524;
  const LNG = 23.71536;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Destroy existing instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [LAT, LNG],
      zoom: 16,
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: false
    });

    // Add zoom controls to top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // OpenStreetMap standard full coverage tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
    }).addTo(map);

    // Custom Glowing Gold Marker Icon
    const customIcon = L.divIcon({
      className: 'custom-gold-marker',
      html: `
        <div style="
          position: relative;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        ">
          <div style="
            position: absolute;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: rgba(212, 175, 55, 0.4);
            animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          "></div>
          <div style="
            position: relative;
            width: 34px;
            height: 34px;
            background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
            border: 2px solid #d4af37;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 14px rgba(0,0,0,0.5), 0 0 10px rgba(212, 175, 55, 0.6);
            color: #f5e298;
            font-weight: 900;
            font-family: 'Noto Serif SC', serif;
            font-size: 13px;
          ">
            金
          </div>
          <div style="
            position: absolute;
            bottom: -6px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 8px solid #d4af37;
          "></div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 42],
      popupAnchor: [0, -42]
    });

    const marker = L.marker([LAT, LNG], { icon: customIcon }).addTo(map);

    marker.bindPopup(`
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px 2px; min-width: 190px;">
        <div style="font-weight: 800; font-size: 14px; color: #111; display: flex; align-items: center; gap: 4px;">
          <span style="color: #b38728; font-family: 'Noto Serif SC', serif; font-size: 16px;">金鼎</span>
          <span>GoldenWok</span>
        </div>
        <p style="margin: 4px 0 8px 0; font-size: 12px; color: #555; line-height: 1.4;">
          L. Andrea Sygrou 207, Nea Smyrni 171 21, Athens
        </p>
        <a href="https://www.google.com/maps/search/?api=1&query=Leoforos+Andrea+Siggrou+207+Nea+Smyrni+17121+Athens+Greece" 
           target="_blank" 
           rel="noopener noreferrer" 
           style="
             display: inline-block;
             background: #111;
             color: #f5e298;
             padding: 4px 10px;
             border-radius: 3px;
             font-size: 11px;
             font-weight: 700;
             text-decoration: none;
           ">
          Directions &rarr;
        </a>
      </div>
    `).openPopup();

    mapInstanceRef.current = map;

    // Invalidate size to guarantee edge-to-edge full coverage with no blank space
    const resizeTimer = setTimeout(() => {
      map.invalidateSize();
    }, 100);

    const handleResize = () => {
      map.invalidateSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[360px] sm:min-h-[420px] rounded-sm overflow-hidden z-0">
      <div 
        ref={mapContainerRef} 
        className="w-full h-full absolute inset-0 z-0 bg-[#e5e3df]"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
