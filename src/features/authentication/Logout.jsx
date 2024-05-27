import { HiArrowRightOnRectangle } from "react-icons/hi2"
import ButtonIcon from "../../ui/ButtonIcon"
import { useLogOut } from "./useLogOut"
import SpinnerMini from "../../ui/SpinnerMini"

function Logout() {
  const {logoutFn, isLoading} = useLogOut()
  return (
    <ButtonIcon disabled={isLoading} onClick={logoutFn}>
      {
        !isLoading ?
        <HiArrowRightOnRectangle/>
        :
        <SpinnerMini/>
      }
    </ButtonIcon>
  )
}

export default Logout