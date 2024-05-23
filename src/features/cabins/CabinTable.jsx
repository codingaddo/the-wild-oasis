import Spinner from '../../ui/Spinner'
import CabinRow from "./CabinRow";
import { useCabin } from "./useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";



//using react query to get the data by calling the getCabins function from the apiHook
const CabinTable = () => {
  // const {isLoading , data:cabins, error} = useQuery({
  //   queryKey:['cabins'],
  //   queryFn:getCabins
  // })

  const {isLoading, cabins} = useCabin()

  if(isLoading) return <Spinner/>
  return (
    <Menus>

    <Table columns = '0.6fr 1.8fr 2.2fr 1fr 1fr 1fr' >
      <Table.Header role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body data={cabins} render={(cabin)=> <CabinRow cabin={cabin} key={cabin.id}/>}/>
      
    </Table>
    </Menus>
  )
}

export default CabinTable