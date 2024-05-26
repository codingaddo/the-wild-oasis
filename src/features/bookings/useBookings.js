import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function  useBookings(){
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


  //Query
    const {
      isLoading , 
      data:{data:bookings, count} = {}, // Recieving the data and count
       error} = useQuery({
        queryKey:['bookings',filter, sortBy,page], //Whenever the filter changes the data would be refetched
        queryFn:()=>getBookings({filter, sortBy,page}),
      })

      // Pre - fectching
      const pageCount = Math.ceil(count/PAGE_SIZE)
      if(page < pageCount)
       queryClient.prefetchQuery({
        queryKey:['bookings',filter, sortBy, page + 1], 
        queryFn:()=>getBookings({filter, sortBy, page: page + 1}),

      }) 

      
      if(page > 1)
      queryClient.prefetchQuery({
        ueryKey:['bookings',filter, sortBy, page - 1], 
        queryFn:()=>getBookings({filter, sortBy, page: page - 1}),

      }) 

      return {isLoading,bookings,error,count}
}