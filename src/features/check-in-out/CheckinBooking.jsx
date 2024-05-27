import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [connfirmedPaid, setConfirmedPaid] = useState(false)
  const [addBreakfast, setAdbreakfast] = useState(false)
  const moveBack = useMoveBack();
  const {booking,isLoading} = useBooking()
  const {checkin, isCheckingIn} = useCheckin()
  const {settings, isLoading:isLoadingSettings} = useSettings()

  useEffect(function(){
    setConfirmedPaid(booking?.isPaid || false)
  },[booking])

  
  if(isLoading || isLoadingSettings) return <Spinner/>
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  
  //Calculating the price of the optional breakfast
  const optionalBreakfastPrice = settings.breakFastPrice * numGuests * numNights
  function handleCheckin() {
    if(!connfirmedPaid) return

    if(addBreakfast){
      checkin({bookingId,breakfast:{
        hasBreakfast:true,
        extrasPrice:optionalBreakfastPrice,
        totalPrice: totalPrice + optionalBreakfastPrice
      }})
    }
    else {
      checkin({bookingId, breakfast:{}})

    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {/* For accepting breakfast after booking a cabin */}

{
  !hasBreakfast &&
 <Box>
  <Checkbox
    checked={addBreakfast}
    onChange={()=>{
      setAdbreakfast(add=>!add)
      setConfirmedPaid(false)
    }}
    id={'breakfast'}
    >
    Wants to add breakfast for {formatCurrency(optionalBreakfastPrice)}
  </Checkbox>
 </Box>
  }

{/* Confirming Booking */}
<Box>
  <Checkbox 
  checked={connfirmedPaid}
  onChange={()=>setConfirmedPaid((confirm)=>!confirm)}
  id={'confirm'}
  disabled={connfirmedPaid || isCheckingIn}
  >
    I confirmed that {guests.fullName} has paid the total amount of {!addBreakfast ?formatCurrency(totalPrice):
    `${formatCurrency(totalPrice+optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`
    }
  </Checkbox>
</Box>
      <ButtonGroup>
        <Button disabled={!connfirmedPaid || isCheckingIn} onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
