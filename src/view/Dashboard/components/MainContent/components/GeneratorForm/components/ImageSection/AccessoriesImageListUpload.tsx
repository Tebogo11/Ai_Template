import FileInputBox from "@/components/Forms/FileInputBox";
import { useGeneratorSetting } from "@/store/useGeneratorData";
import { ChangeEvent } from "react";

const AccessoriesImageListUpload = () => {
  const { accessories, appendAccessories, removeAccessories, setAccessories } =
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
      appendAccessories({
        id: `${accessories.length}`,
        url: imageUrl,
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Scrollable image area */}
      <div className="flex-1 overflow-y-auto space-y-2 pb-1 max-h-[36.5dvh]">
        <FileInputBox
          idPrefix="Accessories1"
          size="w-full h-[18dvh]"
          isSmall
          onChange={(fileUrl) => onChange(fileUrl, "0")}
          value={accessories.find((a) => a.id === "0")?.url || ""}
        />
        <FileInputBox
          idPrefix="Accessories2"
          size="w-full h-[18dvh]"
          isSmall
          onChange={(fileUrl) => onChange(fileUrl, "1")}
          value={accessories.find((a) => a.id === "1")?.url || ""}
        />
        {accessories
          .filter((a) => a.id !== "0" && a.id !== "1")
          .map((accessUrl, index) => {
            const id = `${index + 2}`;
            return (
              <FileInputBox
                key={id}
                idPrefix={"Accessories" + id}
                size="w-full h-[18dvh]"
                isSmall
                onChange={(fileUrl) => onChange(fileUrl, id)}
                value={accessUrl.url}
              />
            );
          })}
      </div>

      {/* Smaller Add More button */}
      <label
        htmlFor="image-upload-accessories"
        className="btn btn-secondary flex justify-center items-center rounded-xs w-full h-[5dvh] border cursor-pointer hover:bg-base-200 shadow-md mt-3"
      >
        <h2 className="text-sm">Add More</h2>
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
