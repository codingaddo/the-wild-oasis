import Spinner from '../../ui/Spinner'
import CabinRow from "./CabinRow";
import { useCabin } from "./useCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from 'react-router-dom';



//using react query to get the data by calling the getCabins function from the apiHook
const CabinTable = () => {
  // const {isLoading , data:cabins, error} = useQuery({
  //   queryKey:['cabins'],
  //   queryFn:getCabins
  // })

  const {isLoading, cabins} = useCabin()
  const [searchParams] = useSearchParams() // using search params hook to get the url of the cabins
  if(isLoading) return <Spinner/>
  
  
  //1. For filtering
  const filterValue = searchParams.get('discount') || 'all' // getting the url or field name
  let filteredCabins

  if(filterValue === 'all') filteredCabins = cabins
  if(filterValue === 'no-discount')  filteredCabins = cabins.filter((cabin)=>cabin.discount === 0)
  if(filterValue === 'with-discount')  filteredCabins = cabins.filter((cabin)=>cabin.discount > 0)

    //2. For sorting

    const sortBy = searchParams.get('sortBy') || 'startDate-asc'
    const [field, direction] = sortBy.split('-') //splitting the field name and the direction (eg.maxCapacity-asc)
    const modifier = direction === 'asc' ? 1 : -1 // checking if the direction ascending or descending
    const sortedCabins = filteredCabins.sort((a,b)=> (a[field]-b[field]) * modifier) //performing sort operation of the filtered cabin

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
      <Table.Body 
      // data={cabins} 
      // data={filteredCabins} 
      data={sortedCabins} 
      render={(cabin)=> <CabinRow cabin={cabin} key={cabin.id}/>}/>
      
    </Table>
    </Menus>
  )
}

export default CabinTable