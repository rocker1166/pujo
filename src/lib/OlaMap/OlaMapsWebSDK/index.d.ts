import type { Map as Map_2 } from 'maplibre-gl';
import type { MapOptions } from 'maplibre-gl';
import type { Marker } from 'maplibre-gl';
import type { MarkerOptions } from 'maplibre-gl';
import type { NavigationControl } from 'maplibre-gl';
import type { NavigationControlOptions } from 'maplibre-gl';
import type { Popup } from 'maplibre-gl';
import type { PopupOptions } from 'maplibre-gl';

declare interface olaMapProps {
    apiKey: string;
}

export declare class OlaMaps {
    private mapInstance;
    private olaMaps;
    private apiKey;
    constructor({ apiKey }: olaMapProps);
    private addOlaLogo;
    private fetchStaticMap;
    init(options?: MapOptions): Map_2;
    addNavigationControls(options: NavigationControlOptions): NavigationControl;
    addMarker(options?: MarkerOptions): Marker;
    addPopup(options?: PopupOptions): Popup;
    getStaticMap(url: string, elementID: string): void;
}
