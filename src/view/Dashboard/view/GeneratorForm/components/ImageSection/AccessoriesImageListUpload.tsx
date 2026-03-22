import FileInputBox from '@/components/Forms/FileInputBox';
import { useGeneratorSetting } from '@/store/useGeneratorData';
import { ChangeEvent } from 'react';

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

  const disableAddMore = accessories.length >= 5;

  return (
    <section className="flex flex-col">
      <h2 className="input-label m-0">
        Upload Your Outfit to Try It On{' '}
        <span className="text-xs font-light">(Required)</span>
      </h2>
      <div className="flex max-h-35 min-h-35 items-start gap-2">
        {/* Scrollable image area */}
        <div className="flex max-h-[100%] flex-1 items-center gap-1 overflow-x-auto overflow-y-hidden rounded-xl">
          <FileInputBox
            idPrefix="Accessories1"
            size="w-23  max-h-30 min-h-30"
            onChange={(fileUrl) => onChange(fileUrl, '0')}
            value={accessories.find((a) => a.id === '0')?.url || ''}
          />
          <FileInputBox
            idPrefix="Accessories2"
            size="w-25  max-h-30 min-h-30"
            onChange={(fileUrl) => onChange(fileUrl, '1')}
            value={accessories.find((a) => a.id === '1')?.url || ''}
          />
          <FileInputBox
            idPrefix="Accessories3"
            size="w-25  max-h-30 min-h-30"
            onChange={(fileUrl) => onChange(fileUrl, '2')}
            value={accessories.find((a) => a.id === '2')?.url || ''}
          />
          <FileInputBox
            idPrefix="Accessories3"
            size="w-25  max-h-30 min-h-30"
            onChange={(fileUrl) => onChange(fileUrl, '2')}
            value={accessories.find((a) => a.id === '2')?.url || ''}
          />
          <FileInputBox
            idPrefix="Accessories3"
            size="w-25  max-h-30 min-h-30"
            onChange={(fileUrl) => onChange(fileUrl, '2')}
            value={accessories.find((a) => a.id === '2')?.url || ''}
          />

          {/* {accessories
            .filter((a) => a.id !== '0' && a.id !== '1')
            .map((accessUrl, index) => {
              const id = `${index + 2}`;
              return (
                <FileInputBox
                  key={id}
                  idPrefix={'Accessories' + id}
                  size="w-23  max-h-35 min-h-35"
                  onChange={(fileUrl) => onChange(fileUrl, id)}
                  value={accessUrl.url}
                />
              );
            })} */}
        </div>

        {/* Smaller Add More button */}
        {/* <label
          htmlFor={`image-upload-accessories`}
          className={`btn btn-secondary hover:bg-base-100 hover:text-secondary flex h-full max-h-25 w-20 cursor-pointer items-center justify-center rounded-xs border shadow-md ${disableAddMore ? 'opacity-40' : ''}`}
        >
          <h2 className="text-sm">
            Add More <span className="text-xs">(max {accessories.length}/5)</span>
          </h2>
          <input
            id="image-upload-accessories"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={() => !disableAddMore && addMoreAccessories}
          />
        </label> */}
      </div>
    </section>
  );
};

export default AccessoriesImageListUpload;
