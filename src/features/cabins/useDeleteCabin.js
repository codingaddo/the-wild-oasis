import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins"
import toast from "react-hot-toast"

export function useDeleteCabin(){

    const queryClient = useQueryClient() // getting the query client from app.js
    const {isLoading:isDeleting,mutate:deleteCabin} = useMutation({
        mutationFn:(id) => deleteCabinApi(id),
        onSuccess:()=>{
            toast.success('Cabin deleted successfully')
            queryClient.invalidateQueries({
                queryKey:['cabins']
            })
        },
        onError: (err) => toast.error(err.message)
    })

    return {deleteCabin, isDeleting}
}