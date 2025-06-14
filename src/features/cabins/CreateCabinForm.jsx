import { useForm } from "react-hook-form";
import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({cabinToEdit = {},onCloseModal }) {
  const {id:editId, ...editValues} = cabinToEdit  //geting the cabin to edit values
  const isEditSession = Boolean(editId) // conveting the edited row id to boolean

  const {
    register, 
    handleSubmit, 
    reset, getValues,
    formState,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},

  }) // using react hook form to manage form inputs

  const {errors} = formState
  const {isCreating,createCabin} = useCreateCabin() // Custome hook for creating a new cabin
  const {isEditing,editCabin} = useEditCabin()
  const isWorking = isCreating || isEditing


  // const queryClient = useQueryClient()
  //using react query mutation to create new cabin
  // const {isLoading:isCreating, mutate:createCabin} = useMutation({
  //   mutationFn:createEditCabin,
  //   onSuccess:()=>{
  //     toast.success('New cabin successfully created')
  //     queryClient.invalidateQueries({
  //       queryKey:['cabins']
  //     })
  //     reset()
  //   },
  //   onError:(err)=>toast.error(err.message)
  // })

  ///Editing a cabin

  // const {isLoading:isEditing, mutate:editCabin} = useMutation({
  //   mutationFn:({newCabinData, id})=>createEditCabin(newCabinData,id),
  //   onSuccess:()=>{
  //     toast.success('Cabin successfully Edited')
  //     queryClient.invalidateQueries({
  //       queryKey:['cabins']
  //     })
  //     reset()
  //   },
  //   onError:(err)=>toast.error(err.message)
  // })


  function onSubmit(data){
    // console.log(data)
    const image = typeof data.image === 'string' ? data.image : data.image[0] //checking if image is a path or an obeject

    if(isEditSession)editCabin({newCabinData:{...data,image:image},id:editId},{
      onSuccess:(data)=>{
        reset()
        onCloseModal?.()
      }
    })
      else
    createCabin({...data,image:image},{
      onSuccess:(data)=>{
        reset()
        onCloseModal?.()
      }
  })

  }

  function onError(error){
    // console.log(error)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name"
        disabled={isWorking}
         {...register('name',
         {required:'This field is required'})}
         />
         {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" 
        disabled={isWorking}
        id="maxCapacity" 
        {...register(
          'maxCapacity',
          {required:'This field is required',
          min:{
            value:1,
            message:'Maximum capacity needs to be at least 1'
          }

          })} />
         {errors?.maxCapacity?.message && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" 
        disabled={isWorking}
        id="regularPrice" 
        {...register(
          'regularPrice',
          {required:'This field is required',
            min:{
              value:1,
              message:'Regular price needs to be at least 1'
            }
          })} />
          {errors?.regularPrice?.message && <Error>{errors.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input type="number" 
        disabled={isWorking}
        id="discount" 
        // defaultValue={0} 
        {...register('discount',
        {required:'This field is required',
          validate:(value) =>Number(value) <= Number(getValues().regularPrice) || "Discount should be less than regular price"
        })} />
         {errors?.discount?.message && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea type="number" id="description" defaultValue="" {...register('description',{required:'This field is required'})} 
        disabled={isWorking}
        />
         {errors?.description?.message && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput 
        id="image" 
        accept="image/*" 
        disabled={isWorking}
        // type="file"
        {...register('image',
        {required:isEditSession ? false :'This field is required'}
      )}
        />
        {errors?.image?.message && <Error>{errors.image.message}</Error>}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" disabled={isWorking} type="reset" onClick={()=>onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession? 'Edit Cabin':'Create Cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
