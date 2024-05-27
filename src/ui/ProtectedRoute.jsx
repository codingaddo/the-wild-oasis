import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../features/authentication/useUser"
import styled from "styled-components"
import Spinner from "./Spinner"
import supabase from "../services/superbase"


const FullPage =  styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`

function ProtectedRoute({children}) {
    const navigete = useNavigate()
    //1. Load the authenticated user
    const {isAuthenticated, isLoading} = useUser()

    //2. If there is no aunthenticated user, redirect to login page
    useEffect(function(){
        if(!isAuthenticated && !isLoading){
            navigete('/login')
        }
    },[isAuthenticated,isLoading, navigete])

    //3. Show a spinner while loading the user
    if(isLoading) return (<FullPage>
             <Spinner/>
        </FullPage>)



    //4. If there is an authenticated user render the app

  if(isAuthenticated)return children
    
  
}

export default ProtectedRoute

