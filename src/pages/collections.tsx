"use client";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useCatsStore } from "../providers/rootStoreProvider";
import { Alert } from "@/components/Alert";
import ImagesList from "@/components/ImagesList";
import { toJS } from "mobx";

const Collections = observer(function Collections() {
  const store = useCatsStore();
  const [catImagesGrid, setCatImagesGrid] = useState<any[]>([]);

  useEffect(() => {
    if (store.getCollections) {
      setCatImagesGrid(toJS(store.getCollections));
    }
  }, [store.getCollections]);

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
      <div className="flex justify-end items-center mb-5">
        <p className="mr-5">Total Collections: {store.totalCollections}</p>
        <input
          onChange={(e) => store.setSearchParam(e.target.value)}
          className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Search by tag name"
        />
      </div>
      {catImagesGrid.length ? (
        <>
          <ImagesList catImagesGrid={catImagesGrid} />
        </>
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
