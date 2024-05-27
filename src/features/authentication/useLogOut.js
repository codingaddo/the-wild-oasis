import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogOut(){
    const queryClient = useQueryClient()
    const navigate = useNavigate();
    const {mutate:logoutFn, isLoading} = useMutation({
        mutationFn:logout,
        onSuccess:()=>{
            queryClient.removeQueries() // Remove the user form the cache and local storage when the logout
            navigate('/login', {replace:true})
            toast.success('Successfully Logged out')
        }
    })

    return {logoutFn, isLoading}
}