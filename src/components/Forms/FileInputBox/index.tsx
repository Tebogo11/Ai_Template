import { isConvexStorageId } from '@/utils/convex/isConvexStoargeid';
import { useMutation } from 'convex/react';
import { useState, ChangeEvent, FC, useEffect } from 'react';
import { api } from '../../../../convex/_generated/api';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  Container,
  UploadLabel,
  UploadTitle,
  UploadText,
  UploadSubtitle,
  SelectFileButton,
  HiddenInput,
  PreviewBox,
  PreviewImage,
  RemoveButton,
  ModalOverlay,
  ModalContent,
  ModalImage,
  ModalCloseButton,
} from './styles';
import { useAppSetting } from '@/store/useAppSetting';
import { relative } from 'path';

interface ImageUploadProps {
  onChange?: (file: string | null) => void;
  value?: string | null;
  className?: string;
  size?: string; // should describe the box itself, e.g. "w-full min-h-48"
  isSmall?: boolean;
  idPrefix: string;
  isModal?: boolean;
}

const FileInputBox: FC<ImageUploadProps> = ({
  onChange,
  value = null,
  className = '',
  isSmall = false,
  idPrefix,
  isModal = false,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [urlInput, setUrlInput] = useState<string | null>(null);
  const [storageId, setStorageId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { theme } = useAppSetting();
  const getImageUrl = useMutation(api.storage.getImageUrlFunc);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const imageUrl = URL.createObjectURL(file);
    onChange?.(imageUrl);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const handleRemove = () => {
    // If you later delete from storage, use storageId here.
    console.log('Removing image with storageId:', storageId);
    setStorageId(null);
    setUrlInput(null);
    onChange?.(null);
  };

  useEffect(() => {
    let cancelled = false;

    const normalizeUrl = async () => {
      const current = value || '';
      const isConvex = isConvexStorageId(current);

      if (isConvex && value) {
        const result = await getImageUrl({ storageId: value });
        if (cancelled) return;

        if (result) {
          setStorageId(value);
          setUrlInput(result);
          // IMPORTANT: don’t call onChange here unless you *intentionally* want to
          // mutate parent state when resolving convex IDs.
          return;
        }

        setUrlInput(null);
        setStorageId(null);
        return;
      }

      setUrlInput(value);
      setStorageId(null);
    };

    void normalizeUrl();

    return () => {
      cancelled = true;
    };
  }, [value, getImageUrl]);

  return (
    <Container className={className}>
      {!urlInput ? (
        <UploadLabel
          htmlFor={`image-upload${idPrefix}`}
          isDragging={isDragging}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div>
            <img
              src={
                theme === 'dark'
                  ? 'assets/form/Dark-Add-Model.png'
                  : 'assets/form/Light-Add-Model.png'
              }
              alt="Default"
              width={50}
              height={50}
            />
          </div>
          <UploadText>Drag and drop model image</UploadText>
          <UploadSubtitle>
            Best results with high-resolution full-body shots on clean backgrounds.
          </UploadSubtitle>
          <SelectFileButton as="span" onClick={(e) => {
            e.preventDefault();
            document.getElementById(`image-upload${idPrefix}`)?.click();
          }}>
            Select File
          </SelectFileButton>
          <HiddenInput
            id={`image-upload${idPrefix}`}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </UploadLabel>
      ) : (
        <PreviewBox>
          <PreviewImage src={urlInput!} alt="Preview" loading="eager" decoding="async" />
          <RemoveButton type="button" onClick={handleRemove} aria-label="Remove image">
            <XMarkIcon style={{ width: 20, height: 20 }} />
          </RemoveButton>
          {showModal && (
            <ModalOverlay>
              <ModalContent>
                <ModalImage
                  src={urlInput!}
                  loading="eager"
                  decoding="async"
                  alt="Full Preview"
                />
                <ModalCloseButton type="button" onClick={() => setShowModal(false)}>
                  Close
                </ModalCloseButton>
              </ModalContent>
            </ModalOverlay>
          )}
        </PreviewBox>
      )}
    </Container>
  );
};

export default FileInputBox;
