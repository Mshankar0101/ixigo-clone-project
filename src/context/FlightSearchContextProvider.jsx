import React,{useState} from 'react'
import FlightSearchContext from './Contexts'

const FlightSearchContextProvider = ({children}) => {
    const [searchFeilds, setSearchFeilds] = useState({});
        // source:"",
        // destination: "",
        // departureDate: "",
        // travellers: "",
    
  return (
    <FlightSearchContext.Provider value={{searchFeilds, setSearchFeilds}}>
        {children}
    </FlightSearchContext.Provider>
  )
}

export default FlightSearchContextProvider