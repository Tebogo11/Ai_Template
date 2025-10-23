import FileInputBox from "@/components/Forms/FileInputBox";
import { useGeneratorSetting } from "@/store/useGeneratorData";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { ChangeEvent } from "react";

const AccessoriesImageListUpload = () => {
  const { accessories } = useGeneratorSetting();
  const { appendAccessories, removeAccessories, setAccessories } =
    useGeneratorSetting();

  const onChange = (fileUrl: string | null, index: string) => {
    if (!fileUrl) {
      removeAccessories(index);
      return;
    }
    const isAmending = accessories.find((a) => a.id === index);
    if (isAmending) {
      const updatedAccessories = accessories.map((accessory) =>
        accessory.id === index ? { ...accessory, url: fileUrl } : accessory,
      );
      setAccessories(updatedAccessories);
    } else {
      appendAccessories({ id: index, url: fileUrl });
    }
  };

  const addMoreAccessories = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      if (accessories.length > 2) {
        appendAccessories({
          id: accessories.length ? `${accessories.length}` : "2",
          url: imageUrl,
        });
      } else {
        appendAccessories({
          id: `${accessories.length}`,
          url: imageUrl,
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div
        className={`overflow-y-auto overflow-x-hidden  space-y-2  max-h-[36dvh] pr-2`}
      >
        <FileInputBox
          idPrefix="Accessories1"
          size="w-[14dvw] h-[17.5dvh]"
          isSmall
          onChange={(fileUrl) => onChange(fileUrl, "0")}
          value={accessories.find((a) => a.id === "0")?.url || ""}
        />
        <FileInputBox
          idPrefix="Accessories2"
          size="w-[14dvw] h-[17.5dvh]"
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
                    size="w-[14dvw] h-[17.5dvh]"
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
        className="btn btn-secondary flex justify-center items-center rounded-xs w-full h-[6vh] border-1 border-solid   cursor-pointer hover:bg-base-200 shadow-2xl "
      >
        <h2>Add More</h2>
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
