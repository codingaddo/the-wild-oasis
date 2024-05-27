import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export function useDeleteBooking(){
    const navigate = useNavigate()

    const queryClient = useQueryClient() // getting the query client from app.js
    const {isLoading:isDeleting,mutate:deleteBooking} = useMutation({
        mutationFn:(id) => deleteBookingApi(id),
        onSuccess:()=>{
            toast.success(`Booking deleted successfully`)
            queryClient.invalidateQueries({
                queryKey:['bookings']
            })
            navigate('/bookings')
        },
        onError: (err) => toast.error(err.message)
    })

    return {deleteBooking, isDeleting}
}