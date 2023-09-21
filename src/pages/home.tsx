"use client";
import { NextRequest, NextResponse } from "next/server";
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { useCatsStore } from "../providers/rootStoreProvider";
import { formatApiData } from "../utils/format-cats";
import { unProxify } from "@/utils/unProxify";
import { Alert } from "@/components/Alert";
import ImagesList from "@/components/ImagesList";
import Link from "next/link";

type props = {
  request?: NextRequest;
};

const Home = observer(function Home({ request }: props) {
  const store = useCatsStore();
  const [catImagesGrid, setCatImagesGrid] = useState<any[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);
  const [imageUpload, setImageUpload] = useState<any>(null);
  const docInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    store.getImagesData(request?.nextUrl.searchParams || {});
  }, []);

  useEffect(() => {
    const Images = unProxify(store.getCats);
    if (Images?.length) {
      console.log("25.media.tumblr.com", Images)
      setCatImagesGrid(formatApiData(unProxify(store.getCats)));
    }
  }, [store.getCats]);

  useEffect(() => {
    if (imageUpload) {
      const obj = {
        file: imageUpload,
      };
      store.uploadImage(obj);
    }
  }, [imageUpload]);

  useEffect(() => {
    if (store.getError || store.getSuccess) {
      setTimeout(() => {
        store.setError("");
        store.setSuccess("");
      }, 3000);
    }
  }, [store.getError, store.getSuccess]);

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-end mb-5">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          href={"/collections"}
        >
          Collections
        </Link>
        <button
          onClick={() => docInput?.current?.click()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
      <ImagesList
        catImagesGrid={catImagesGrid}
        setToggle={setToggle}
        toggle={toggle}
      />
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
