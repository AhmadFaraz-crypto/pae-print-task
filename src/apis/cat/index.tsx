import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { client } from "..";
import { CatImages, CatImagesResponse } from "../types";

export const getCatImagesSchema = z.object({
  page: zfd.numeric(z.number().optional()),
  limit: zfd.numeric(z.number().optional()),
  order: zfd.text(z.enum(["RANDOM", "ASC", "DESC"]).optional()),
  mime_types: zfd.text(z.enum(["gif", "jpg", "png"]).optional()),
  format: zfd.text(z.enum(["json", "src"]).optional()),
  size: zfd.text(z.enum(["small", "med", "full"]).optional()),
  search: zfd.text(z.string().optional()),
  category_ids: zfd.repeatableOfType(zfd.numeric().optional()),
  breed_ids: zfd.repeatableOfType(zfd.numeric().optional()),
});

export const getCatImagesSchemaValidator = withZod(getCatImagesSchema);

export const getCatsImages = (params: z.infer<typeof getCatImagesSchema>) => {
  return client.get<CatImagesResponse, any>(`images/search`, {
    params,
  });
};

export const deleteCatImage = (id: string) => {
  return client.delete<CatImagesResponse, any>(`images/${id}`);
};

export const postCatImageUploadSchema = z.object({
  file: zfd.file().optional(),
  sub_id: zfd.text(z.string().optional()),
});

export const postCatImageUploadSchemaValidator = withZod(postCatImageUploadSchema);

export const uploadCatImage = (
  data: z.infer<typeof postCatImageUploadSchema>
) => {
  return client.post<CatImages, any>(`images/upload`, data, {
    headers: {
      "x-api-key":
        "live_w2OxOkjMuTnaz3ZFHMzxLXUcFMudw0p8uXLxdVCMhWs1LsNNdkjtKVsimWnoi845",
        "Content-Type": "multipart/form-data"
    },
  });
};
