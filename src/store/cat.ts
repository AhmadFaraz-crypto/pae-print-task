import { getCatImagesSchemaValidator, getCatsImages, uploadCatImage } from "@/apis/cat";
import { CatImages } from "@/apis/types";
import { makeAutoObservable } from "mobx";
import { NextResponse } from "next/server";

export class CatStore {
  cats: CatImages[];
  errors: string;
  success: string;
  collections: CatImages[];
  constructor() {
    this.cats = [];
    this.errors = '';
    this.success = '';
    this.collections = [];
    makeAutoObservable(this);
  }

  setCats = (cat: any) => (this.cats = cat);

  setCollections = (collection: CatImages) => {
    this.collections.push(collection);
    this.setSuccess("Image added to collections");
  };

  setError = (err: string) => (this.errors = err);

  setSuccess = (succ: string) => (this.success = succ);


  get getCats() {
    return this.cats;
  }

  get getError() {
    return this.errors;
  }

  get getSuccess() {
    return this.success;
  }

  get getCollections() {
    return this.collections;
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
    } catch (error: any) {
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
    } catch (error: any) {
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