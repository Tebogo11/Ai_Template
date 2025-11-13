import { AccessoriesType } from "@/store/useGeneratorData";
import { isConvexStorageId } from "@/utils/convex/isConvexStoargeid";
import { ReactMutation } from "convex/react";
import { FunctionReference } from "convex/server";

// Helper to fetch a file from a URL and convert to File object
const urlToFile = async (url: string, filename: string): Promise<File> => {
  const res = await fetch(url);
  const blob = await res.blob();
  // Try to infer type from blob, fallback to 'application/octet-stream'
  return new File([blob], filename, {
    type: blob.type || "application/octet-stream",
  });
};

const convertUrlToStorageId = async (
  generateUploadUrl: () => Promise<string>,
  modalUrl: string,
) => {
  // Implementation depends on specific requirements
  // This is a placeholder function
  const modalFile = await urlToFile(modalUrl, "modal");
  const postUrl = await generateUploadUrl();
  const result = await fetch(postUrl, {
    method: "POST",
    headers: { "Content-Type": modalFile.type },
    body: modalFile,
  });
  const { storageId } = await result.json();
  return storageId;
};

export const saveImagesToStorage = async (
  getImageUrl: ReactMutation<
    FunctionReference<
      "mutation",
      "public",
      {
        storageId?: string | undefined;
      },
      string | null,
      string | undefined
    >
  >,
  generateUploadUrl: () => Promise<string>,
  modal: string,
  accessories: AccessoriesType[],
) => {
  // Upload modal file
  let modalStorageId: string | null = null;
  if (!isConvexStorageId(modal)) {
    const storageId = await convertUrlToStorageId(generateUploadUrl, modal);

    modalStorageId = storageId;
  } else {
    const newImageUrl = await getImageUrl({ storageId: modal });
    if (!newImageUrl) {
      throw new Error("Failed to fetch modal image URL from Convex");
    }
    const storageId = await convertUrlToStorageId(
      generateUploadUrl,
      newImageUrl,
    );

    modalStorageId = storageId;
  }
  // Upload accessories files
  const accessoriesStorageIds: { storageId: string }[] = [];
  for (let i = 0; i < accessories.length; i++) {
    if (!isConvexStorageId(accessories[i].url)) {
      const accessoryUrl = accessories[i];
      const storageId = await convertUrlToStorageId(
        generateUploadUrl,
        accessoryUrl.url,
      );

      accessoriesStorageIds.push({ storageId });
    } else {
      const newImageUrl = await getImageUrl({ storageId: accessories[i].url });
      if (!newImageUrl) {
        throw new Error("Failed to fetch accessory image URL from Convex");
      }
      const storageId = await convertUrlToStorageId(
        generateUploadUrl,
        newImageUrl,
      );
      accessoriesStorageIds.push({ storageId });
    }
  }

  // Return storage IDs
  return {
    modalStorageId,
    accessoriesStorageIds,
  };
};
