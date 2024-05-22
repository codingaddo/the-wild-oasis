import styled from 'styled-components';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from '../../ui/Spinner';
import { useUpdateSettings } from './useUpdateSettings';
import { updateSetting } from '../../services/apiSettings';

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

  const {isUpdating,editSettings} = useUpdateSettings()

  function handleUpdate(e,fieldName){
    const {value} = e.target
    // console.log(value)
    if(!value)return
    editSettings({[fieldName]: value})
  }

  if(isLoading) return<Spinner/>

  return (
    <Form>
      <FormRow >
      <Label htmlFor="minBookingLegth">Minimum nights/booking</Label>
        <Input type='number' 
        id='min-nights' 
        defaultValue={minBookingLength}
         onBlur={(e)=>handleUpdate(e, 'minBookingLength')}
         disabled={isUpdating}
          />
      </FormRow>
      <FormRow >
        <Label htmlFor='maxnBookingLength'>Maximum nights/booking</Label>
        <Input type='number' id='max-nights' 
        defaultValue={maxBookingLength}
        onBlur={(e)=>handleUpdate(e, 'maxBookingLength')}
        disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
      <Label htmlFor='maxGuestsperBooking'>Maximum Guests/booking</Label>
        <Input type='number' id='max-guests'
         defaultValue={maxGuestPerBooking}
         onBlur={(e)=>handleUpdate(e, 'maxGuestPerBooking')}
         disabled={isUpdating}
         />
      </FormRow>
      <FormRow >
        <Label htmlFor='breakFastPrice'>Breakfast Price</Label>
        <Input type='number' id='breakfast-price' 
        defaultValue={breakFastPrice}
        onBlur={(e)=>handleUpdate(e, 'breakFastPrice')}
        disabled={isUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
