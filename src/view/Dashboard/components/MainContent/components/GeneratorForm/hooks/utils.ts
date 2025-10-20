import { AccessoriesType, OutfitData } from "@/store/useGeneratorData";
import { isConvexStorageId } from "@/utils/convex/isConvexStoargeid";

// Helper to fetch a file from a URL and convert to File object
const urlToFile = async (url: string, filename: string): Promise<File> => {
  const res = await fetch(url);
  const blob = await res.blob();
  // Try to infer type from blob, fallback to 'application/octet-stream'
  return new File([blob], filename, {
    type: blob.type || "application/octet-stream",
  });
};

export const saveImagesToStorage = async (
  generateUploadUrl: () => Promise<string>,
  modal: string,
  accessories: AccessoriesType[],
  oldOutfit: {
    modal?: string | undefined;
    accessories: string[];
  } | null,
) => {
  // Upload modal file
  let modalStorageId: string | null = null;
  if (!isConvexStorageId(modal)) {
    const modalFile = await urlToFile(modal, "modal");
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": modalFile.type },
      body: modalFile,
    });
    const { storageId } = await result.json();

    modalStorageId = storageId;
  } else {
    modalStorageId = modal;
  }
  // Upload accessories files
  const accessoriesStorageIds: string[] = [];
  for (let i = 0; i < accessories.length; i++) {
    if (!isConvexStorageId(accessories[i].url)) {
      const accessoryUrl = accessories[i];
      const accessoryFile = await urlToFile(accessoryUrl.url, `accessory_${i}`);
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": accessoryFile.type },
        body: accessoryFile,
      });
      const { storageId } = await result.json();
      accessoriesStorageIds.push(storageId);
    } else {
      accessoriesStorageIds.push(accessories[i].url);
    }
  }

  // Return storage IDs
  return {
    modalStorageId,
    accessoriesStorageIds,
  };
};
