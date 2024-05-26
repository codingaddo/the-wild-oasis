import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings(){
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()

  //Fillter the data from the url
  const filterValue = searchParams.get('status')
  const filter = !filterValue || filterValue === 'all' ? null : {field:'status', value: filterValue}
  //Sorting the data from the url
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc'
  const [field, direction] = sortByRaw.split('-')
  const sortBy = {field, direction}

  // Pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))


    const {
      isLoading , 
      data:{data:bookings, count} = {}, // Recieving the data and count
       error} = useQuery({
        queryKey:['bookings',filter, sortBy,page], //Whenever the filter changes the data would be refetched
        queryFn:()=>getBookings({filter, sortBy,page})
      })

      // Pre - fectching
      queryClient.prefetchQuery({
        ueryKey:['bookings',filter, sortBy,page+1], //Whenever the filter changes the data would be refetched
        queryFn:()=>getBookings({filter, sortBy, page:page+1})
}) 
      return {isLoading,bookings,error,count}
}