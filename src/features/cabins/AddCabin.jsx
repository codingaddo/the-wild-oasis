import React, { useState } from 'react'
import Button from '../../ui/Button'
import CreateCabinForm from './CreateCabinForm'
import Modal from '../../ui/Modal'

// const AddCabin = () => {
//     const [isOpenModal, setIsOpenModal] = useState(false)
//   return (
//     <div>
//          <Button onClick={()=>setIsOpenModal(showForm=>!showForm)}>
//         Add New Cabin
//       </Button>
//       {
//         isOpenModal &&
//       <Modal onClose={()=>setIsOpenModal(false)}>
//         <CreateCabinForm onCloseModal={()=>setIsOpenModal(false)}/>
//       </Modal>
//       }

//     </div>
//   )
// }

function AddCabin(){
    
     return(
    <div>
     <Modal>
        <Modal.Open opens='cabin-form'>
            <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
            <CreateCabinForm/>
        </Modal.Window>
     </Modal>
    </div>
     )
}

export default AddCabin