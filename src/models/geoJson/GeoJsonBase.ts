export interface Geometry {
  coordinates: number[][][][];
  type: string;
};

export type PropertiesBase = {
  name: string;
  code: string;
  type: string;
  areaCode: string;
}

export interface Feature<T> {
  type: string;
  geometry: Geometry;
  properties: T;
};

export interface GeoJsonBase<T> {
  type: string;
  features: Feature<T>[];
};
