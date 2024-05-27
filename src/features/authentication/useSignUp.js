import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp(){
    const {mutate:signUpFn, isLoading} = useMutation({
        mutationFn:signup,
        onSuccess:(user)=>{
            toast.success('Account Successfully created! Please verify the new account from the user\'s email')
            console.log(user)
        },
        onError:()=>{
            toast.error('Something went wrong, please try again later')
        }
    })

    return {
        signUpFn,
        isLoading
    }
}