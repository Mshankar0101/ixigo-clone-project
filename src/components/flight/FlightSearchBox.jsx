import React,{ useEffect, useState, useRef, useContext} from 'react'
import Datepicker from '../common/Datepicker';
import Airports from './Airports';
import { useNavigate, useLocation } from 'react-router-dom';
import FlightSearchContext from '../../context/Contexts';
import "../../styles/Flight.css";
import "../../styles/FlightSearch.css";

const FlightSearchBox =({handleSubmition}) => {
    const navigate = useNavigate();
    const location = useLocation();

    // handling sticky property of search container for fight search page
   const [sticky, setSticky] = useState(false);
   useEffect(()=>{
     const handleScrolling = ()=>{
        if(window.scrollY > 70){
            setSticky(true);
            
        }else{
            setSticky(false);
        }
     }
      window.addEventListener("scroll",handleScrolling);
      return ()=>{
        window.removeEventListener("scroll",handleScrolling);
      }
   },[location.pathname]);

   //dropdown container for popular airport and shearched airport
  const [showSuggesion, setShowSuggestions]= useState(false);
  const [value, setValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [inputChange, setInputChange] = useState(false);
  const [fromSuggession, setFromSuggesion] = useState(false);
  const [toSuggession, setToSuggesion] = useState(false);
  const inputFromRef = useRef();
  const inputToRef = useRef();
  
  
  //handling input of from feild
    const handleInputChange = (e)=>{
        // e.preventDefault();
        setValue(e.target.value);
        if(e.target.value !== ""){
            setInputChange(true);
        }else{
            setInputChange(false);
        }
    }

  //handling input of to feild
    const handleToInputChange = (e)=>{
        // e.preventDefault();
        setToValue(e.target.value);
        if(e.target.value !== ""){
            setInputChange(true);
        }else{
            setInputChange(false);
        }
      
    }

    //input feild travellers and class logic
    const [travellersAndClass, setTravellersAndClass]= useState("2 Travellers, Economy");
    const [showTravellersdropdown, setShowTravellersDropdown]= useState(false);
    const travellerDropdown = useRef();
    const travellerInputRef = useRef();
    const handleTravellersOutsideClik = (event)=>{
        if(travellerDropdown.current && !travellerDropdown.current.contains(event.target) && travellerInputRef?.current && !travellerInputRef?.current.contains(event.target) ){
            setShowTravellersDropdown(false);
        }
    }
    useEffect(()=>{
        document.addEventListener("mousedown", handleTravellersOutsideClik);
        return ()=>{
            document.removeEventListener("mousedown", handleTravellersOutsideClik);
        }
        
    },[]);

    const [adult, setAdults]= useState({adults:2, activeIndex:1});
    const [children, setChildren]= useState({childrens:0, activeIndex:0});
    const [infant, setInfant]= useState({infants:0, activeIndex:0});
    const [travellerclass, setTravellerClass]= useState({classType:"Economy",activeIndex:0});
    const classes = ["Economy", "Premium Economy", "Business"];
    
    const handleAdultButtonClick = (index)=>{
        setAdults({adults:index+1, activeIndex:index});
    }
    const handlChildrenButtonClick = (index)=>{
        setChildren({childrens:index, activeIndex:index});
    }
    const handleInfantButtonClick = (index)=>{
        setInfant({infants:index, activeIndex:index});
    }
    const handleClassButtonClick = (index,classType)=>{
        setTravellerClass({classType:classType, activeIndex:index});
    }
    const handleTravellerAndClassSumbission = ()=>{
        setShowTravellersDropdown(false);
        setTravellersAndClass(`${adult.adults+children.childrens+infant.infants} Travellers, ${travellerclass.classType}`);
    }

    //date picker
    const [currentDate, setCurrentDate] = useState(new Date());

    //submition of search feilds
    const {setSearchFeilds,searchFeilds} = useContext(FlightSearchContext);
    const handleSearchFeildSubmition = ()=>{
        // e.preventDefault();
        if(!value || !toValue){
            alert("Please fill all the feilds");
        }else if(location.pathname !== '/flights/search'){
            const totalTravlers = adult.adults+children.childrens+infant.infants;
            setSearchFeilds({value, toValue, totalTravlers, travellerclass:travellerclass.classType, date:currentDate, travellersAndClass});
            navigate("search");
        }else if(location.pathname === '/flights/search'){
            const totalTravlers = adult.adults+children.childrens+infant.infants;
            // console.log(value,toValue,currentDate);
            setSearchFeilds({value, toValue, totalTravlers, travellerclass:travellerclass.classType, date:currentDate, travellersAndClass});
            // console.log("fetch api based on search feild change");
           
          
        }
    }
   
    useEffect(()=>{
        if(Object.keys(searchFeilds).length !== 0 && location.pathname === '/flights/search'){
            setValue(searchFeilds.value);
            setToValue(searchFeilds.toValue);
            setCurrentDate(searchFeilds.date);
            setTravellersAndClass(searchFeilds.travellersAndClass);
        }
    },[]);
    // useEffect(()=>{
    //     console.log("value",value)
    //     console.log("toValue",toValue);
    //     console.log("searchFeilds",searchFeilds);

    // },[toValue,value,searchFeilds]);


  return (
    <>    
     <div className={(location.pathname === '/flights/search' && !sticky && window.innerWidth > 600) ? 'flight-search-box-search-component' :(location.pathname === '/flights/search' && sticky && window.innerWidth > 600)? 'flight-search-box-search-component flight-search-box-sticky': 'flight-search-box'}>

        <div className='flight-search-input'>
               
            <div className='flight-search-feild-relative'>
                <input type="text" className="inputText input-first-child" onFocus={()=> {
                    setShowSuggestions(true);
                    setFromSuggesion(true);
                    setToSuggesion(false);
                }}  value={value} onChange={handleInputChange} ref={inputFromRef} required></input>
                <span className="floating-label">From</span>  
                {
                    fromSuggession &&
                <Airports value={value} setValue={setValue} setShowSuggestions={setShowSuggestions}  showSuggesion={showSuggesion} inputChange={inputChange} setInputChange={setInputChange} fromSuggession={fromSuggession} inputFromRef={inputFromRef}/>
                }
                

            </div>

            <div className='flight-search-feild-relative'>
            <input type="text" className="inputText" onFocus={()=>{ 
                setShowSuggestions(true);
                setToSuggesion(true);
                setFromSuggesion(false);
            }}  value={toValue} onChange={handleToInputChange} ref={inputToRef} required/>
            <span className="floating-label">To</span>
            {
                toSuggession &&
            <Airports toValue={toValue} setToValue={setToValue} setShowSuggestions={setShowSuggestions}  showSuggesion={showSuggesion} inputChange={inputChange} setInputChange={setInputChange} toSuggession={toSuggession} inputToRef={inputToRef}  />
            }

            </div>
                
            <div className='flight-search-feild-container'>
            <Datepicker currentDate={currentDate} setCurrentDate={setCurrentDate} />
            </div>

            <div className='flight-search-feild-relative'>
                <input type="text" className="inputText" value={travellersAndClass} onFocus={()=>setShowTravellersDropdown(true)} ref={travellerInputRef} required/>  
                {/* onBlur={()=> setShowTravellersDropdown(false)} */}
                <span className="floating-label">Travellers & Class</span>
                {showTravellersdropdown && 
                
                    <div className="flight-travellers-class" ref={travellerDropdown}>
                        <h6>Travellers</h6>
                        <div className="flight-travellers-container">
                            <div className="flight-traveller">
                                <div>
                                    <p>Adults</p>
                                    <p>12 yrs or above</p>
                                </div>
                                <div className='adults'>
                                    {Array.from({length:9},(_,index)=>{
                                    return <button
                                        key={index}
                                        className={adult.activeIndex === index?  'active-btn button' : 'button'}
                                        onClick={()=>handleAdultButtonClick(index)}>
                                        {index+1}
                                        </button>  
                                    })}
                                </div>
                            </div>
                            <div className="flight-traveller">
                                <div>
                                    <p>Children</p>
                                    <p>2 - 12 yrs</p>
                                </div>
                                <div className='children'>
                                {Array.from({length:8},(_,index)=>{
                                    return <button
                                        key={index}
                                        className={children.activeIndex === index?  'active-btn button' : 'button'}
                                        onClick={()=>handlChildrenButtonClick(index)}>
                                        {index}
                                        </button>    
                                    })}
                                </div>
                            </div>
                            <div className="flight-traveller">
                            <div>
                                    <p>Infant</p>
                                    <p>0 - 2 yrs</p>
                                </div>
                                <div className='infant'>
                                {Array.from({length:5},(_,index)=>{
                                    return <button
                                        key={index}
                                        className={infant.activeIndex === index?  'active-btn button' : 'button'}
                                        onClick={()=>handleInfantButtonClick(index)}>
                                        {index}
                                        </button>
                                    })}
                                </div>
                            </div>
                            {/* <div className="flight-travellers-more-than-nine">
                            </div> */}
                            <div className="flight-class-container">
                                <p className='class'>Class</p>
                                <div className="flight-class">
                                {classes.map((classType, index) => {
                                            return (
                                                <div
                                                key={index}
                                                className={travellerclass.activeIndex === index ? 'flight-class-div-active flight-class-div' : 'flight-class-div'}
                                                onClick={() => handleClassButtonClick(index, classType)}>
                                                <p>{classType}</p>
                                                </div>
                                            );
                                    })}
                                </div>
                            </div>
                        </div>
                            <div className="flight-travellers-class-btn-container">
                                <button className="flight-travellers-sumbit-btn" onClick={()=> handleTravellerAndClassSumbission()}>
                                    Done
                                </button>
                            </div>
                            
                </div>}
            </div>
        
            <div className='flight-search-feild-container'>
            <button className='search-button'onClick={handleSearchFeildSubmition}>Search</button>
            {/* <NavLink to='search' >
            </NavLink> */}
            </div>
        </div>

        <div className='flight-passanger-category' style={{display: (window.innerWidth < 601? 'none': 'block') }}>
            <div>
            <div className='special-fare'><b >Special Fares</b> (Optional) : </div>
            <div className='category-div'><p>Student</p> </div>
            <div className='category-div'><p>Senior Citizen</p> </div>
            <div className='category-div'><p>Armed Forces</p> </div>
            </div>
        </div>
        </div>
    </>
  )
};

export default FlightSearchBox