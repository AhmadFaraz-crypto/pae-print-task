import { CatImages } from "@/apis/types";
import Image from "next/image";
import {
  PlusIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid";
import { observer } from "mobx-react-lite";
import { useCatsStore } from "@/providers/rootStoreProvider";
import { useState } from "react";
import { sizes } from "@/constants/size";
import { Tags } from "@/constants/tags";
import { toJS } from "mobx";

type props = {
  catImagesGrid: CatImages[];
};

const ImageList = observer(function Home({ catImagesGrid }: props) {
  const store = useCatsStore();
  const [toggle, setToggle] = useState<boolean>(false);
  const [openTagDropdown, setOpenTagDropdown] = useState<boolean>(false);

  function deleteImage(id: string) {
    store.setCats(toJS(store.deleteCatData(id)));
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {catImagesGrid?.map((cat: any, index: any) => {
        return (
          <div key={index} className="grid gap-4 h-fit relative">
            {cat[index]?.map((d: CatImages, i: number) => (
              <div key={i} className="relative group">
                <Image
                  src={d.url}
                  className="h-auto max-w-full w-full rounded-lg"
                  width={Number(d.width)}
                  height={Number(d.height)}
                  alt="cat"
                ></Image>
                <div className="invisible group-hover:visible rounded-lg absolute w-full top-0 bottom-0 z-10 bg-gray-400 bg-opacity-50">
                  <div className="flex justify-end">
                    <PlusIcon
                      title="Add to collection"
                      className="p-1 h-8 w-8 bg-white text-black cursor-pointer rounded-md mr-2 mt-3 bg-opacity-80"
                      aria-hidden="true"
                      onClick={() => store.setCollections(d)}
                    />
                    <TrashIcon
                      onClick={() => deleteImage(d.id)}
                      title="Delete"
                      className="p-1 h-8 w-8 bg-white text-red-500 cursor-pointer rounded-md mr-2 mt-3 bg-opacity-80"
                      aria-hidden="true"
                    />
                    <ArrowDownTrayIcon
                      title="Download"
                      className="p-1 h-8 w-8 bg-white text-black cursor-pointer rounded-md mr-3 mt-3 bg-opacity-80"
                      aria-hidden="true"
                    />
                    <div className="relative">
                      <Cog8ToothIcon
                        onClick={() => setToggle(!toggle)}
                        title="Download"
                        className="p-1 h-8 w-8 bg-white text-black cursor-pointer rounded-md mr-3 mt-3 bg-opacity-80"
                        aria-hidden="true"
                      />
                      <div
                        id="dropdown"
                        className={`${
                          !toggle && "hidden"
                        } z-10 absolute top-16 -mt-3 -mr-11 right-16 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-black dark:bg-opacity-80`}
                      >
                        <ul
                          className="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownDefaultButton"
                        >
                          {" "}
                          {sizes.map((size, key) => (
                            <li
                              key={key}
                              onClick={() =>
                                store.changeImageSize(d.id, size.value)
                              }
                            >
                              <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                {size.label}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <button
                      onClick={() => setOpenTagDropdown(!openTagDropdown)}
                      title="Add tag"
                      className="py-1 px-3 absolute bottom-4 bg-white text-black cursor-pointer rounded-md mr-3 mt-3 bg-opacity-80"
                      aria-hidden="true"
                    >
                      Add tag
                    </button>
                    <div
                      id="dropdown"
                      className={`${
                        !openTagDropdown && "hidden"
                      } z-10 absolute bottom-14 -mr-11 right-16 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-black dark:bg-opacity-80`}
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                      >
                        {" "}
                        {Tags.map((tag, key) => (
                          <li key={key} onClick={() => store.addTag(d.id, tag)}>
                            <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                              {tag}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {d?.tag && (
                      <button
                        title="Tag"
                        className="py-1 px-3 absolute bottom-4 left-4 bg-white text-black cursor-pointer rounded-md mr-3 mt-3 bg-opacity-80"
                        aria-hidden="true"
                      >
                        {d?.tag}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
});

export default ImageList;
