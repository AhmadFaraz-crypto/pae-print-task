import { getCatImagesSchemaValidator, getCatsImages, uploadCatImage } from "@/apis/cat";
import { CatImages } from "@/apis/types";
import { makeAutoObservable } from "mobx";
import { NextResponse } from "next/server";

export class CatStore {
  cats: CatImages[];
  errors: string;
  success: string;
  constructor() {
    this.cats = [];
    this.errors = '';
    this.success = '';
    makeAutoObservable(this);
  }

  setCats = (cat: any) => (this.cats = cat);

  setError = (err: any) => (this.errors = err);

  setSuccess = (succ: any) => (this.success = succ);


  get getCats() {
    return this.cats;
  }

  async getImagesData(searchParams: Object) {
    const { data, error } = await getCatImagesSchemaValidator.validate(
      searchParams
    );

    if (error) {
      return NextResponse.json(
        { message: "Invalid search params" },
        { status: 400 }
      );
    }

    try {
      const response = await getCatsImages({
        ...data,
        page: data?.page ?? 3,
        limit: data?.limit ?? 80,
      });
      this.setCats(response.data);
    } catch (error) {
      console.error(error);
      this.setError(error?.response?.data)
    }
  }
  
  async uploadImage(data: any) {
    try {
      const response = await uploadCatImage(data);
      const result = [response.data]
      this.setCats([...this.cats, ...result]);
      this.setSuccess("Image Uploaded successfully");
    } catch (error) {
      this.setError(error?.response?.data)
    }
  }

  deleteCatData(id: string) {
    const filter = this.cats.filter((cat) => cat.id !== id);
    this.setCats(filter);
    this.setSuccess("Image deleted successfully");
  }

  hydrate = (data: any) => {
    if (!data) return;
    this.setCats(data);
  };
}