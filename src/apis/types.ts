export type CatImages = {
  id: string;
  url: string;
  width: string;
  height: string;
  tag?: string;
};

export type CatImagesResponse = {
  data: CatImages[];
};