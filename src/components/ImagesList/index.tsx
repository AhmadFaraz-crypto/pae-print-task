import { CatImages } from "@/apis/types";
import Image from "next/image";
import {
  PlusIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid";

type props = {
  setToggle: (val: boolean) => void;
  toggle: boolean;
  catImagesGrid: CatImages[];
  deleteImage: (val: string) => void;
};

export function ImagesList({
  setToggle,
  toggle,
  catImagesGrid,
  deleteImage,
}: props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {catImagesGrid?.map((cat: any, index: any) => {
        return (
          <div key={index} className="grid gap-4 h-fit">
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
                      className="p-1 h-8 w-8 bg-white text-black cursor-pointer rounded-md mr-2 mt-3"
                      aria-hidden="true"
                    />
                    <TrashIcon
                      onClick={() => deleteImage(d.id)}
                      title="Delete"
                      className="p-1 h-8 w-8 bg-white text-red-500 cursor-pointer rounded-md mr-2 mt-3"
                      aria-hidden="true"
                    />
                    <ArrowDownTrayIcon
                      title="Download"
                      className="p-1 h-8 w-8 bg-white text-black cursor-pointer rounded-md mr-3 mt-3"
                      aria-hidden="true"
                    />
                    <div className="relative">
                      <Cog8ToothIcon
                        onClick={() => setToggle(!toggle)}
                        title="Download"
                        className="p-1 h-8 w-8 bg-white text-black cursor-pointer rounded-md mr-3 mt-3"
                        aria-hidden="true"
                      />
                      <div
                        id="dropdown"
                        className={`${
                          !toggle && "hidden"
                        } z-10 absolute top-16 -mt-3 -mr-11 right-16 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700`}
                      >
                        <ul
                          className="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownDefaultButton"
                        >
                          <li>
                            <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                              Small
                            </p>
                          </li>
                          <li>
                            <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                              Medium
                            </p>
                          </li>
                          <li>
                            <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                              Large
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
