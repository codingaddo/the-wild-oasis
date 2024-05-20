import supabase, { supabaseUrl } from "./superbase";

// A fuction to fetch the cabins data from the database
export async function getCabins(){
    const { data, error } = await supabase
    .from('cabins')
    .select('*');

    if(error){
        console.error(error)
        throw new Error('Cabins could not be found')
    }

    return data
}

//Creating a new Cabin

export async function createCabin(newCabin){
    //1.Create carbin

    const imageName = `${newCabin.image.name}`.replaceAll("/","")
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    
    const { data, error } = await supabase
    .from('cabins')
    .insert([{...newCabin, image:imagePath}])
    
    .select()

    if(error){
        console.error(error)
        throw new Error('Cabin could not be created ')
    }

    //2. Upload the image

    const { error:storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imagePath, newCabin.image)

  //3. Delete the cabin if there was an error uploading the image
//   if(storageError){
//     await supabase
//     .from('cabins')
//     .delete()
//     .eq('id', data.id)

//     console.error(storageError)
//     throw new Error('Cabin image could not be uploaded and the cabin was not created')
//   }
    return data

}


// A function to delete cabins data for the database and the client side
export async function deleteCabin(id){
    
    const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)

    if(error){
        console.error(error)
        throw new Error('Cabin could not be Deleted')
    }

}