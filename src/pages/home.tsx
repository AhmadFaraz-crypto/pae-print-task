"use client";
import { NextRequest, NextResponse } from "next/server";
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useCatsStore } from "../providers/rootStoreProvider";
import { Alert } from "@/components/Alert";
import ImagesList from "@/components/ImagesList";
import Link from "next/link";
import { toJS } from "mobx";

type props = {
  request?: NextRequest;
};

const Home = observer(function Home({ request }: props) {
  const store = useCatsStore();
  const [catImagesGrid, setCatImagesGrid] = useState<any>([]);
  const [imageUpload, setImageUpload] = useState<any>(null);
  const docInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    store.getImagesData(request?.nextUrl.searchParams || {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (store.getCats) {
      setCatImagesGrid(toJS(store.getCats));
    }
  }, [store.getCats]);

  useEffect(() => {
    if (imageUpload) {
      const obj = {
        file: imageUpload,
      };
      store.uploadImage(obj);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUpload]);

  useEffect(() => {
    if (store.getError || store.getSuccess) {
      setTimeout(() => {
        store.setError("");
        store.setSuccess("");
      }, 3000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.getError, store.getSuccess]);

  return (
    <main className="min-h-screen p-16">
      <div className="flex flex-wrap items-center md:justify-end sm:justify-center mb-5">
        <input
          onChange={(e) => store.setSearchParam(e.target.value)}
          className="shadow appearance-none border rounded md:w-1/4 sm:w-full mr-5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Search by tag name"
        />
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-3 py-2 px-4 rounded mr-4"
          href={"/collections"}
        >
          Collections
        </Link>
        <button
          onClick={() => docInput?.current?.click()}
          className="bg-blue-500 hover:bg-blue-700 h-10 text-white font-bold py-2 px-4 rounded"
        >
          Add new Image
        </button>
        <input
          ref={docInput}
          type="file"
          className="hidden"
          onChange={(e) => {
            if (e?.target?.files) {
              setImageUpload(e?.target?.files[0]);
            }
          }}
          accept="image/*"
        />
      </div>
      <ImagesList catImagesGrid={catImagesGrid} />
      {store.getError && (
        <Alert
          type="error"
          dismissible={false}
          className="absolute top-10 left-1/3 ml-20 w-1/4 right-5"
        >
          {store.getError}
        </Alert>
      )}
      {store.getSuccess && (
        <Alert
          type="success"
          dismissible={false}
          className="absolute top-10 left-1/3 ml-20 w-1/4 right-5"
        >
          {store.getSuccess}
        </Alert>
      )}
    </main>
  );
});

export default Home;
