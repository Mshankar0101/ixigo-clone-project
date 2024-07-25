import React,{useRef,useState,useEffect} from 'react'
import '../../styles/Flight.css';
const Airports = ({value, setValue, toValue, setToValue, setShowSuggestions, showSuggesion, inputChange,setInputChange, toSuggession, fromSuggession, inputFromRef, inputToRef}) => {

    //dropdown container for popular airport and shearched airport
  const autocompleteRef = useRef();
  const [airports,setAirports]=useState([]);
  const [searchValue, setSearchValue] = useState("");
    const popularAirports = [
        {_id:1,name:"Indira Gandhi Intl Airport",iata_code:"DEL", city:"New Delhi", country:"india"},
        {_id:2,name:"Chatrapati Shivaji International Airport",iata_code:"BOM", city:"Mumbai", country:"india"},
        {_id:3,name:"Rajiv Gandhi International Airport",iata_code:"HYD", city:"Hyderabad", country:"india"},
        {_id:4,name:"Kempegowda International Airport",iata_code:"BLR", city:"Bengaluru", country:"india"},
        {_id:5,name:"Chennai International Airport",iata_code:"MAA", city:"Chennai", country:"india"},
        {_id:6,name:"Dabolim Airport",iata_code:"GOI", city:"Goa", country:"india"},
        {_id:7,name:"Dubai International Airport",iata_code:"DXB", city:"Dubai", country:"United Arab Emirates"},
        {_id:8,name:"Changi",iata_code:"SIN", city:"Singapore", country:"Singapore"},
        {_id:9,name:"Suvarnabhumi Airport",iata_code:"BKK", city:"Bangkok", country:"Thailand"},
        {_id:10,name:"Kuala Lumpur Intl",iata_code:"KUL", city:"Kuala Lumpur", country:"Malaysia"}
        
    ]
    
    const handelSuggetionClick = (item)=>{
      if(fromSuggession){ 
        setValue(`${item.iata_code} - ${item.city}`);
        setInputChange(false);
      }
      if(toSuggession){
        setToValue(`${item.iata_code} - ${item.city}`);
        setInputChange(false);
      }
        setShowSuggestions(false);
    }
    
    //fething api to get airport
     const fetchAirports = ()=>{
        fetch("https://academics.newtonschool.co/api/v1/bookingportals/airport?limit=30",{
            method: 'get',
            headers:{
                'projectID': '9h69a26iogeq'
            }
        })
        .then((res)=>res.json())
        .then((result)=>result.data)
        .then((data)=>setAirports(data.airports))
        .catch((err)=>console.log(err))
    }

    //handling outside click for to and from dropdown
    const handleClickOutside = (event)=>{
        if(autocompleteRef.current && !autocompleteRef.current.contains(event.target) && inputFromRef?.current && !inputFromRef?.current.contains(event.target) ){
           setShowSuggestions(false);
        }
        else if(autocompleteRef.current && !autocompleteRef.current.contains(event.target) && inputToRef?.current && !inputToRef?.current.contains(event.target) ){
           setShowSuggestions(false);
        }
    }
    // && inputFromRef.current && !inputFromRef.current.contains(event.target)
    useEffect(()=>{
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>{
            document.removeEventListener("mousedown", handleClickOutside);
        }
        
    },[]);



    //useEffect to fetch api
    useEffect(()=>{  
        
        fetchAirports(); 
        // console.log(airports);
       
     },[]);


     //seting input feild onchange value 
    useEffect(()=>{  
        if(fromSuggession){
          setSearchValue(value);
        }
        if(toSuggession){
          setSearchValue(toValue);
        }
       
     },[value,toValue]);
    
  return (
    <>
          {(showSuggesion && inputChange)?

          <div className='airport-suggesion-container' ref={autocompleteRef} >
            
              <ul>
              { airports.map((item)=>{
                
                      if(item.city.toLowerCase().includes(searchValue?.toLowerCase()) || item.name.toLowerCase().includes(searchValue?.toLowerCase())){

                          return(
                              <li key={item._id} onClick={()=> handelSuggetionClick(item)}>
                                  <div className='iata_code_airport' >
                                      <span>{item.iata_code}</span>
                                  </div>
                                  <div className='name_city_airport' >  
                                      <p>{`${item.city}, ${item.country}`} </p>
                                      <p>{item.name}</p>
                                  </div>
                              </li> 
                          )
                      }
                      return null;
                  })}
              </ul>
          </div> 
          :
          (showSuggesion && !inputChange)? 

          <div className='airport-suggesion-container' ref={autocompleteRef} >
              <div className='popular-airports'>
                  <p>Popular Airports</p>
              </div>
              <ul>
              { popularAirports.map((item)=>{
                      return(
                          <li key={item._id} onClick={()=> handelSuggetionClick(item)}>
                              <div className='iata_code_airport' >
                                  <span>{item.iata_code}</span>
                              </div>
                              <div className='name_city_airport' >  
                                  <p>{`${item.city}, ${item.country}`} </p>
                                  <p>{item.name}</p>
                              </div>
                          </li> 
                      )
                  })}
              </ul>
          </div>
          : null
        }
    </>
  )
}

export default Airports