import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings(){
    const [searchParams] =useSearchParams()
    const numDays = !searchParams.get('last') ? 7 : Number(searchParams.get('last'))
    //subdays is a method from date-fns library.It takes in the current date and the number of days we wanna subtract
    const queryDate = subDays(new Date(), numDays).toISOString()

    const {isLoading, data:bookings, error} = useQuery({
        queryFn:()=>getBookingsAfterDate(queryDate),
        queryKey:['bookings', `last-${numDays}`]
    })

    return {isLoading,bookings}
}