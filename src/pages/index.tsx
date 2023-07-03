import Image from "next/image";
import { Inter } from "next/font/google";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const inter = Inter({ subsets: ["latin"] });

const fileTypes = ["JPG", "PNG", "GIF", "TXT", "DOCX", "PPTX"];

export default function Home() {
  const [file, setFile] = useState(null);

  const handleChange = (file: any) => {
    setFile(file);
  };

  return (
    <main className={`mt-24 flex min-h-screen flex-col items-center px-5 ${inter.className}`}>
      <h1 className="text-center text-3xl font-bold">Obnova edukačných materiálov</h1>
      <p className="mt-1 w-full text-center text-sm leading-6 text-gray-600 md:w-1/3">
        V dôsledku vyhorenia zborovne sa stratila vysoká kvantita edukačných materiálov. Ak by ste si našli
        chvíľku, aby ste nám pomohli s obnovou, boli by sme veľmi vďační.
      </p>
      <form className="w-full max-w-3xl">
        <div className="w-full border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
            {/* Material name */}
            <div className="col-span-full">
              <label htmlFor="material" className="label-base">
                Meno materiálu
              </label>
              <input type="text" name="material" id="material-name" className="input-base mt-2" />
            </div>

            {/* Teacher */}
            <div className="sm:col-span-3">
              <label htmlFor="teacher" className="label-base">
                Meno učiteľa
              </label>
              <input type="text" name="teacher" id="teacher" className="input-base mt-2" />
            </div>

            {/* Subject */}
            <div className="sm:col-span-3">
              <label htmlFor="subject" className="label-base">
                Skratka predmetu
              </label>
              <input type="text" name="subject" id="subject" className="input-base mt-2" />
            </div>

            {/* File Input */}
            <div className="col-span-full mt-2 flex flex-col items-center rounded-lg border border-dashed border-gray-900/25 py-10">
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
              <div className="mx-auto mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer font-semibold text-indigo-600 hover:text-indigo-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            Odoslať
          </button>
        </div>
      </form>
    </main>
  );
}
