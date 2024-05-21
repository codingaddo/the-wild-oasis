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

//Creating a new Cabin function
export async function createEditCabin(newCabin, id){
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)
    //1.creatin cabin image and path
    const imageName = `${newCabin.image.name}`.replaceAll("/","")
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    
    //create/Edit a Cabin
    let query = supabase.from('cabins')

    //Creat a cabin
    if(!id)query =query.insert([{...newCabin, image:imagePath}]).select()

   //Edit a cabin
   if(id) query = query.update({...newCabin, image:imagePath})
    .eq('id', id)
    .select()
    const { data, error } = await query.select().single()
    


    if(error){
        console.error(error)
        throw new Error('Cabin could not be created ')
    }

    //2. Upload the image
    if(hasImagePath) return data

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