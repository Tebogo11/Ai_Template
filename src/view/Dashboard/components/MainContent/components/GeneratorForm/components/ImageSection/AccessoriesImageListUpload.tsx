import FileInputBox from "@/components/Forms/FileInputBox";
import { useGeneratorSetting } from "@/store/useGeneratorData";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { ChangeEvent } from "react";

const AccessoriesImageListUpload = () => {
  const { accessories, appendAccessories, removeAccessories } =
    useGeneratorSetting();

  const onChange = (fileUrl: string | null, index: string) => {
    if (!fileUrl) {
      removeAccessories(index);
      return;
    }
    appendAccessories({ id: index, url: fileUrl });
  };

  const addMoreAccessories = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // setPreview(imageUrl);
      // console.log("Add Modal", file);
      if (accessories.length > 2) {
        appendAccessories({
          id: accessories.length ? `${accessories.length}` : "2",
          url: imageUrl,
        });
      } else {
        console.log({
          id: `${accessories.length}`,
          url: imageUrl,
        });
        appendAccessories({
          id: `${accessories.length}`,
          url: imageUrl,
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <div
        className={`h-full min-h-[80%] max-h-[38vh] w-[calc(100%)] overflow-y-auto overflow-x-hidden  space-y-2`}
      >
        <FileInputBox
          idPrefix="Accessories1"
          size="w-full h-[18vh]"
          isSmall
          onChange={(fileUrl) => onChange(fileUrl, "0")}
          value={accessories.find((a) => a.id === "0")?.url || ""}
        />
        <FileInputBox
          idPrefix="Accessories2"
          size="w-full h-[18vh]"
          isSmall
          onChange={(fileUrl) => onChange(fileUrl, "1")}
          value={accessories.find((a) => a.id === "1")?.url || ""}
        />
        {accessories.filter((a) => a.id !== "0" && a.id !== "1").length
          ? accessories
              .filter((a) => a.id !== "0" && a.id !== "1")
              .map((accessUrl, index) => {
                const id = `${index + 2}`;
                return (
                  <FileInputBox
                    size="w-full h-40 "
                    isSmall
                    onChange={(fileUrl) => onChange(fileUrl, id)}
                    value={accessUrl.url}
                    idPrefix={"Accessories" + (index + 2)}
                  />
                );
              })
          : null}
      </div>
      <label
        htmlFor="image-upload-accessories"
        className="flex justify-center items-center rounded-xs w-full h-[6vh] border-1 border-solid   cursor-pointer hover:bg-base-200 "
      >
        <PlusCircleIcon className="w-5 h-5" />
        <input
          id="image-upload-accessories"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={addMoreAccessories}
        />
      </label>
    </div>
  );
};

export default AccessoriesImageListUpload;
