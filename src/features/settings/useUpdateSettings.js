import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { updateSetting } from "../../services/apiSettings"

export function useUpdateSettings(){

  const queryClient = useQueryClient()
    const {isLoading:isUpdating, mutate:editSettings} = useMutation({
        mutationFn:updateSetting,
        onSuccess:()=>{
          toast.success('Settings successfully updated')
          queryClient.invalidateQueries({
            queryKey:['settings']
          })
        //   reset()
        },
        onError:(err)=>toast.error(err.message)
      })

      return {isUpdating,editSettings}
}