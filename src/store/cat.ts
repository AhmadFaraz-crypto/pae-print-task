import {
  getCatImage,
  getCatImageSchemaValidator,
  getCatImagesSchemaValidator,
  getCatsImages,
  uploadCatImage,
} from "@/apis/cat";
import { CatImages } from "@/apis/types";
import { makeAutoObservable } from "mobx";
import { NextResponse } from "next/server";

export class CatStore {
  cats: CatImages[];
  errors: string;
  success: string;
  collections: CatImages[];
  searchParam: string;
  constructor() {
    this.cats = [];
    this.errors = "";
    this.success = "";
    this.collections = [];
    this.searchParam = "";
    makeAutoObservable(this);
  }

  setCats = (cat: CatImages[]) => (this.cats = cat);

  setCollections = (collection: CatImages) => {
    this.collections.push(collection);
    this.setSuccess("Image added to collections");
  };

  setError = (err: string) => (this.errors = err);

  setSuccess = (succ: string) => (this.success = succ);

  setSearchParam = (param: string) => (this.searchParam = param);

  get getCats() {
    return this.cats.filter(item => (this.searchParam ? item.tag?.toLowerCase().includes(this.searchParam.toLowerCase()) : true)).map(cat => cat);
  }

  get getError() {
    return this.errors;
  }

  get getSuccess() {
    return this.success;
  }

  get getCollections() {
    return this.collections.filter(item => (this.searchParam ? item.tag?.toLowerCase().includes(this.searchParam.toLowerCase()) : true)).map(cat => cat);;
  }

  get totalCollections() {
    return this.collections.length;
  }

  async getImagesData(searchParams: Object) {
    const { data, error } = await getCatImagesSchemaValidator.validate(
      searchParams
    );

    if (error) {
      this.setError("Invalid params");
      return NextResponse.json({ message: "Invalid params" }, { status: 400 });
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
      this.setError(error?.response?.data);
    }
  }

  async changeImageSize(id: string, size: string) {
    const { data, error } = await getCatImageSchemaValidator.validate({
      size: size,
    });

    if (error) {
      this.setError("Invalid params");
      return NextResponse.json({ message: "Invalid params" }, { status: 400 });
    }

    const replica = this.cats;

    try {
      const response = await getCatImage(id, data);
      this.setCats([]);
      replica.map((ele, index) => {
        if (ele.id === id) {
          replica[index] = response.data;
        }
      });
      this.setCats([...replica]);
      this.setSuccess("Size Uploaded successfully");
    } catch (error: any) {
      console.error(error);
    }
  }

  addTag(id: string, tag: string) {
    const updatedData = this.cats.map((cat) => ({
      ...cat,
      tag: cat.id === id ? tag : cat.tag,
    }));
    console.log("Called", updatedData)
    this.setCats([...updatedData]);
  }

  async uploadImage(data: any) {
    try {
      const response = await uploadCatImage(data);
      const result = [response.data];
      this.setCats([...this.cats, ...result]);
      this.setSuccess("Image Uploaded successfully");
    } catch (error: any) {
      this.setError(error?.response?.data);
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
