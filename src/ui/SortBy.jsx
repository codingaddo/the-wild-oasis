import React from 'react'
import Select from './Select'
import {useSearchParams } from 'react-router-dom'

const SortBy = ({options}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const sortBy = searchParams.get('sortBy') || '' // getting the current url
    function handleChange(e){
        searchParams.set('sortBy', e.target.value) // setting the current url
        setSearchParams(searchParams)

    }
  return (
    <Select options={options} type={'white'} onChange={handleChange} value={sortBy}/>
  )
}

export default SortBy