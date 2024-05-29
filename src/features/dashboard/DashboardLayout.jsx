import styled from "styled-components";
import { useRecentBookings } from "../dashboard/useRecentBookings.js";
import { useRecentStays } from "../dashboard/useRecentStays.js";
import Spinner from '../../ui/Spinner'
import Stats from './Stats'
import {useCabin} from '../cabins/useCabin.js'
import SalesChart from "./SalesChart.jsx";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


function DashboardLayout() {
  const {isLoading:isLoading1, bookings} = useRecentBookings()
  const {stays, confirmedStays, isLoading:isLoading2,numDays} = useRecentStays()
  const {cabins, isLoading} = useCabin()

  if(isLoading1 || isLoading2 ||isLoading) return <Spinner/>
  // console.log(bookings)
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} cabinCount={cabins.length} numDays={numDays}/>
      <div>Today's Activities</div>
      <div>Chart for stay duration</div>
      <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout