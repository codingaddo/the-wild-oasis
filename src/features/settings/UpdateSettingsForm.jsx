import styled from 'styled-components';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from '../../ui/Spinner';
import { useUpdateSettings } from './useUpdateSettings';

const Label = styled.label`
  font-weight: 500;
`;
function UpdateSettingsForm() {
  const {isLoading,settings:{
    minBookingLength,
    maxBookingLength,
    maxGuestPerBooking,
    breakFastPrice,
  }={}} = useSettings()

  const {isUpdation,editSettings} = useUpdateSettings()
  if(isLoading) return<Spinner/>

  return (
    <Form>
      <FormRow >
      <Label htmlFor="minBookingLegth">Minimum nights/booking</Label>
        <Input type='number' id='min-nights' defaultValue={minBookingLength} />
      </FormRow>
      <FormRow >
        <Label htmlFor='maxnBookingLength'>Maximum nights/booking</Label>
        <Input type='number' id='max-nights' defaultValue={maxBookingLength}/>
      </FormRow>
      <FormRow>
      <Label htmlFor='maxGuestsperBooking'>Maximum Guests/booking</Label>
        <Input type='number' id='max-guests' defaultValue={maxGuestPerBooking}/>
      </FormRow>
      <FormRow >
        <Label htmlFor='breakFastPrice'>Breakfast Price</Label>
        <Input type='number' id='breakfast-price' defaultValue={breakFastPrice}/>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
