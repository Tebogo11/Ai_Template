import { useGeneratorSetting } from '@/store/useGeneratorData';
import { useRef, ChangeEvent, useState } from 'react';
import {
  Container,
  UploadBox,
  DragDropText,
  ImageGrid,
  ImageItem,
  RemoveImageButton,
  HiddenFileInput,
  InputLabel,
  RequiredSpan,
  UploadText,
  EmptyHintText,
  EmptyHintSubtitle,
} from './styles';
import { useAppSetting } from '@/store/useAppSetting';

const AccessoriesImageListUpload = () => {
  const { accessories, appendAccessories, removeAccessories, setAccessories } =
    useGeneratorSetting();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadBoxRef = useRef<HTMLDivElement>(null);

  const maxImages = 9;
  const hasImages = accessories.length > 0;
  const isFull = accessories.length >= maxImages;
  const showUploadBox = !isFull;
  const showDragDropText = !hasImages;

  const { theme } = useAppSetting();
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    const imageUrl = URL.createObjectURL(file);
    appendAccessories({
      id: `${Date.now()}-${Math.random()}`,
      url: imageUrl,
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const remaining = maxImages - accessories.length;
    Array.from(files).slice(0, remaining).forEach(processFile);

    event.target.value = '';
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    if (!files) return;

    const remaining = maxImages - accessories.length;
    Array.from(files).slice(0, remaining).forEach(processFile);
  };

  const handleRemoveAccessory = (id: string) => {
    removeAccessories(id);
  };

  const handleUploadBoxClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="flex flex-col">
      <InputLabel>
        2. Upload Your Outfit to Try It On <RequiredSpan>(Max 0-9)</RequiredSpan>
      </InputLabel>
      <Container
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <UploadBox ref={uploadBoxRef} show={showUploadBox} onClick={handleUploadBoxClick}>
          <div>
            <img
              src={
                theme === 'dark'
                  ? '/assets/form/Dark-Add-Outfit.png'
                  : '/assets/form/Light-Add-Outfit.png'
              }
              alt="Default"
              width={75}
              height={75}
            />
          </div>
          <UploadText>Click to Upload Clothing</UploadText>
        </UploadBox>
        <DragDropText show={showDragDropText}>
          <EmptyHintText>Drag and drop clothing items</EmptyHintText>
          <EmptyHintSubtitle>
            Upload the clothing items you want to try on. You can upload up to 9 items.
            Supported formats: JPG, PNG.
          </EmptyHintSubtitle>
        </DragDropText>
        {accessories.length ? (
          <ImageGrid>
            {accessories.map((accessory) => (
              <ImageItem key={accessory.id}>
                <img src={accessory.url} alt="Outfit item" />
                <RemoveImageButton
                  type="button"
                  onClick={() => handleRemoveAccessory(accessory.id)}
                >
                  ✕
                </RemoveImageButton>
              </ImageItem>
            ))}
          </ImageGrid>
        ) : null}
        <HiddenFileInput
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
      </Container>
    </section>
  );
};

export default AccessoriesImageListUpload;
