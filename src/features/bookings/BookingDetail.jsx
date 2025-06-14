import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useState } from "react";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const {booking={}, isLoading} = useBooking()
  const {checkout, isCheckingOut} = useCheckout()
  const {isDeleting, deleteBooking} = useDeleteBooking()
  const {status,id:bookingId} = booking
  const [delet, setDelete] = useState(true)

  const moveBack = useMoveBack();
  const navigate = useNavigate()


  if(isLoading) return <Spinner/>
  if(!bookingId) return<Empty resourceName={'booking'}/>

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
      {
                status === "unconfirmed" && 
              <Button icon={<HiArrowDownOnSquare/>} onClick={()=>navigate(`/checkin/${bookingId}`)}>
                Check in
              </Button>
              }

            {
                status === "checked-in" && 
                <Button
                onClick={()=>{checkout(bookingId)}}
                disabled={isCheckingOut}
                >
                Check out
              </Button>
              }
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
            <Modal.Open opens={'delete'}>
                <Button variation='danger' >
                 Delete booking
                </Button>
            </Modal.Open>
      </ButtonGroup>
    
          <Modal.Window name={'delete'}>
             <ConfirmDelete resourceName={'bookings'} disabled={isDeleting} 
               onConfirm={()=>deleteBooking(bookingId)}/>
          </Modal.Window>
      
        </Modal>
    </>
  );
}

export default BookingDetail;
