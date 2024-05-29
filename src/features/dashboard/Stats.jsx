import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2"
import Stat from "./Stat"
import { formatCurrency } from "../../utils/helpers"

function Stats({bookings,confirmedStays,numDays, cabinCount}) {

    //1.Number of bookings
    const numBookings = bookings.length

    //Total Sale
    const sales = bookings.reduce((acc,cur)=> acc + cur.totalPrice,0)

    // Total checkins
    const checkins = confirmedStays.length

    //Occupancy rate. 
    // Number of checed in nights
    const occupation = confirmedStays.reduce((acc, curr)=>acc + curr.numNights, 0)/(numDays * cabinCount)
    // numerOfCheckinNight divided by availableNights (number of days * number of cabins)



  return (
    <>
        <Stat title={'Bookings'} color={'blue'} icon={<HiOutlineBriefcase/>} value={numBookings}/>
        <Stat title={'Sales'} color={'green'} icon={<HiOutlineBanknotes/>} value={formatCurrency(sales)}/>
        <Stat title={'check ins'} color={'indigo'} icon={<HiOutlineCalendarDays/>} value={checkins}/>
        <Stat title={'occupancy rate'} color={'yellow'} icon={<HiOutlineChartBar/>} value={Math.round(occupation * 100)+'%'}/>

    </>
  )
}

export default Stats