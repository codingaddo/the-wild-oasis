import { useQuery } from "@tanstack/react-query";
import { getBooking} from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking(){
  const {bookingId} = useParams() //useing params to get the param from the url
    const {isLoading , data:booking, error} = useQuery({
        queryKey:['booking',bookingId],
        queryFn:()=>getBooking(bookingId),
        retry:false, // By default React tries to refetch data 3 times ,
      })

      return {isLoading,booking,error}
}