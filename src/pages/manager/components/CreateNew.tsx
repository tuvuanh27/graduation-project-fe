import React, { useState } from "react";
import { INftAttributes } from "../types";
import { useCreatePendingNft } from "../hooks/useCreatePendingNft";
import { toast, ToastContainer } from "react-toastify";

export interface ICreatePendingNftDto {
  name: string;
  is_public: number;
  description: string;
  external_url?: string;
  attributes?: INftAttributes[];
  file: File;
}

interface FormValues {
  name: string;
  description: string;
  externalUrl?: string;
  isPublic: boolean;
}

export const CreateNew: React.FC = () => {
  const { isCreated, pendingNft } = useCreatePendingNft();

  const [imageUrl, setImageUrl] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [values, setValues] = useState<FormValues>({
    name: "",
    description: "",
    externalUrl: "",
    isPublic: false,
  });

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleChangePublic = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setValues((values) => ({ ...values, isPublic: checked }));
  };

  const [nftAttributes, setNftAttributes] = useState<INftAttributes[]>([
    { trait_type: "", value: "" },
  ]);

  const handleAddRow = () => {
    // check if the last row is empty
    const lastRow = nftAttributes[nftAttributes.length - 1];
    if (lastRow.trait_type === "" && lastRow.value === "") {
      return;
    }
    setNftAttributes([...nftAttributes, { trait_type: "", value: "" }]);
  };

  const handleChangeAttributes = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const list = [...nftAttributes];
    if (name === "trait_type") {
      list[index].trait_type = value;
    } else if (name === "value") {
      list[index].value = value;
    }
    setNftAttributes(list);
  };

  const handleRemoveRow = (index: number) => {
    const list = [...nftAttributes];
    list.splice(index, 1);
    setNftAttributes(list);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearClick = () => {
    setImageUrl("");
  };

  const handleUploadClick = async () => {
    if (file && values.name && values.description) {
      const request: ICreatePendingNftDto = {
        name: values.name,
        description: values.description,
        external_url: values.externalUrl,
        is_public: values.isPublic ? 1 : 0,
        attributes: nftAttributes.filter(
          (attr) => attr.trait_type !== "" && attr.value !== ""
        ),
        file: file,
      };
      try {
        await pendingNft(request);
        toast("Upload success", { type: "success" });
      } catch (e: any) {
        console.error(e);
        toast(e?.message, { type: "error" });
      }
    } else {
      toast("Please fill all required fields", { type: "error" });
    }
  };

  return (
    <div className="flex w-full">
      <ToastContainer />
      <div className="w-1/2 px-4 py-6 pt-8">
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt="Uploaded image"
              className="max-w-full rounded-3xl"
            />
            <button
              type="button"
              onClick={handleClearClick}
              className="mt-4 mr-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleUploadClick}
              disabled={isCreated}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              {isCreated ? "Uploading..." : "Upload"}
            </button>
          </>
        ) : (
          <>
            <label
              htmlFor="fileInput"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer"
            >
              Upload Image
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </>
        )}
      </div>
      <div className="w-1/2 px-4 py-6">
        <div className="pb-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 light:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
            placeholder="John"
            value={values.name}
            onChange={handleChangeValue}
            required
          />
        </div>
        <div className="pb-4">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 light:text-white"
          >
            Your Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            name="description"
            value={values.description}
            onChange={handleChangeValue}
            required
          />
        </div>
        <div className="pb-4">
          <label
            htmlFor="externalUrl"
            className="block mb-2 text-sm font-medium text-gray-900 light:text-white"
          >
            External Link
          </label>
          <input
            type="text"
            id="externalUrl"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
            placeholder="John"
            name="externalUrl"
            value={values.externalUrl}
            onChange={handleChangeValue}
          />
        </div>

        <span className="block mb-2 text-sm font-medium text-gray-900 light:text-white">
          Attributes
        </span>
        <div className="pb-4">
          {nftAttributes.map((attr, index) => (
            <div className="flex pb-4" key={index}>
              <input
                type="text"
                name="trait_type"
                value={attr.trait_type}
                onChange={(e) => handleChangeAttributes(index, e)}
                className="w-1/2 p-2 border rounded-md mr-2 h-10"
                placeholder="Trait Type"
              />
              <input
                type="text"
                name="value"
                value={attr.value}
                onChange={(e) => handleChangeAttributes(index, e)}
                className="w-1/2 p-2 border rounded-md h-10"
                placeholder="Value"
              />
              {index === nftAttributes.length - 1 && (
                <button
                  type="button"
                  onClick={handleAddRow}
                  className="ml-2 h-10 px-4 py-2 text-sm whitespace-nowrap bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                >
                  Add Row
                </button>
              )}
              {nftAttributes.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveRow(index)}
                  className="ml-2 text-sm h-10 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="pb-4">
          <input
            className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-blue-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-blue checked:focus:bg-blue checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
            type="checkbox"
            role="switch"
            id="isPublic"
            name="isPublic"
            checked={values.isPublic}
            onChange={handleChangePublic}
            required
          />
          <label
            className="inline-block pl-[0.15rem] hover:cursor-pointer"
            htmlFor="isPublic"
          >
            Public This Image
          </label>
        </div>
      </div>
    </div>
  );
};
