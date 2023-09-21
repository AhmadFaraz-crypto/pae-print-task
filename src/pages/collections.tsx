"use client";
import { NextRequest } from "next/server";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useCatsStore } from "../providers/rootStoreProvider";
import { formatApiData } from "../utils/format-cats";
import { unProxify } from "@/utils/unProxify";
import { Alert } from "@/components/Alert";
import { ImagesList } from "@/components/ImagesList";

const Collections = observer(function Collections() {
  const store = useCatsStore();
  const [catImagesGrid, setCatImagesGrid] = useState<any[]>([]);
  const [toggle, setToggle] = useState<boolean>(false);

  function deleteImage(id: string) {
    store.setCats(unProxify(store.deleteCatData(id)));
  }

  useEffect(() => {
    const Images = unProxify(store.getCollections);
    if (Images?.length) {
      setCatImagesGrid(formatApiData(unProxify(store.getCollections)));
    }
  }, [store.getCollections]);

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
      {catImagesGrid.length ? (
        <ImagesList
          catImagesGrid={catImagesGrid}
          setToggle={setToggle}
          toggle={toggle}
          deleteImage={deleteImage}
          addToCollection={store.setCollections}
        />
      ) : (
        <p className="text-center">Data not Found.</p>
      )}
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

export default Collections;
