import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins is not available");
  }

  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

export async function createEditCabin(cabin, id) {
  // https://jvttrnonoxvydwbvksiu.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  console.log(cabin);

  const hasImage = cabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
  const imagePath = hasImage
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...cabin, image: imagePath }]);

  if (id) query = query.update({ ...cabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  if (hasImage) {
    return data;
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);

  if (storageError) {
    console.log(error);
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabins could not be created"
    );
  }

  return data;
}
