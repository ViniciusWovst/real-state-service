export interface Geometry {
  coordinates: number[][][][];
  type: string;
};

type TProperties = {
  name: string;
  code: string;
  type: string;
  areaCode: string;
}

export interface Feature<T> {
  type: string;
  geometry: Geometry;
  properties: TProperties & T;
};

export interface GeonJsonBase<T> {
  type: string;
  features: Feature<T>[];
};
