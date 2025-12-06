import { supabase } from "./supabase";

const BUCKET_NAME = "products";

/**
 * Ensures the products bucket exists and is publicly accessible
 */
export async function ensureProductsBucket() {
  // Check if bucket exists
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  
  if (listError) {
    throw new Error(`Failed to list buckets: ${listError.message}`);
  }

  const bucketExists = buckets?.some((bucket) => bucket.name === BUCKET_NAME);

  if (!bucketExists) {
    // Create bucket if it doesn't exist
    const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      fileSizeLimit: 5242880, // 5MB
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    });

    if (createError) {
      throw new Error(`Failed to create bucket: ${createError.message}`);
    }
  }

  return true;
}

/**
 * Uploads an image to Supabase Storage
 * @param file - File buffer or Blob
 * @param fileName - Name for the file in storage
 * @returns Public URL of the uploaded image
 */
export async function uploadProductImage(
  file: Buffer | Blob,
  fileName: string
): Promise<string> {
  await ensureProductsBucket();

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file, {
      contentType: "image/jpeg",
      upsert: true,
    });

  if (error) {
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);

  return publicUrl;
}

/**
 * Gets the public URL for an image in Supabase Storage
 * @param fileName - Name of the file in storage
 * @returns Public URL
 */
export function getProductImageUrl(fileName: string): string {
  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);

  return publicUrl;
}

/**
 * Deletes an image from Supabase Storage
 * @param fileName - Name of the file to delete
 */
export async function deleteProductImage(fileName: string): Promise<void> {
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([fileName]);

  if (error) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }
}

