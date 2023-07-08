import { Spinner } from "@/components/Spinner";

export const UploadingModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="px-4 text-center sm:block sm:p-0">
        <div className="rounded-lg bg-white p-5 text-left align-bottom shadow-xl sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
          <Spinner />
          <div className="mt-3 text-center sm:mt-5">
            <span className="text-lg font-medium leading-6 text-gray-900">
              Nahrávanie súborov...
            </span>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Prosím počkajte, kým sa všetky súbory nahrajú na server.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
