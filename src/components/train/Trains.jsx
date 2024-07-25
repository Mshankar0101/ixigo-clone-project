import React,{useState,useEffect, useRef} from 'react'
import '../../styles/Train.css';
import {stationsArr} from '../data'
import Datepicker from '../common/Datepicker';
import { AiOutlineSwap } from "react-icons/ai";
import Footer from '../Footer';
import { MdOutlineLocationCity } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


const Trains = () => {
  const navigate = useNavigate();
  //date picker
  const [currentDate, setCurrentDate] = useState(new Date());


  // offers array
  const arr = ["https://pbs.twimg.com/ext_tw_video_thumb/1796140000867745792/pu/img/EjqT7VmvT4NMRIMI.jpg", "https://www.railmitra.com/images/BANNER_Railmitra_food_offer.webp", "https://gos3.ibcdn.com/train-bob-1577694634.jpg","https://cdn.grabon.in/gograbon/images/web-images/uploads/1622009888112/train-tickets-offers.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZYIx7Qd3lRoeuCjAK9KV-p_2Kr3xM4Y4PSg&usqp=CAU" ,"https://www.easemytrip.com/images/offer-img/train-cashback-deal-lp.png",
               "https://promotions.mobikwik.com/irctc/images/banner_2n.jpg?v=1","https://www.easemytrip.com/images/train-img/train-upi-pay-sm.png","https://gos3.ibcdn.com/trains-diwali-1564056338.jpg","https://paytmblogcdn.paytm.com/wp-content/uploads/2024/02/PaytmTravel_1-min.webp",
               "https://images.indiafreestuff.in//uploads//2022/11/deals/thumb/featured_1667445918_132714.jpg","https://cdn1.desidime.com/topics/photos/1378886/medium/Instant-cashback-lp.png?1638298244"
              ]

  //logic for next prev btn offer section
  const [offerBtn, setOfferBtn]= useState({prev:false,next:true});
  const offerRef= useRef();
  useEffect(() => {
    const container = offerRef.current;
    const handleScroll = () => {
   
      if(container.scrollLeft === 0){
        setOfferBtn({prev:false,next:true});
      }
      if(container.scrollLeft>0){
        setOfferBtn((prev)=>{
          return {...prev, prev:true}
        })
      }
      if(container.scrollLeft + container.clientWidth >= container.scrollWidth){
        setOfferBtn({prev:true,next:false});
      }
      if(container.scrollLeft + container.clientWidth < container.scrollWidth){
        setOfferBtn((prev)=>{
          return {...prev, next:true}
        })
      }
    };
    
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
  
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  
  const showPreviousOffers = ()=>{
    const container = offerRef.current;
     let width = container.clientWidth;
     container.scrollLeft = container.scrollLeft - (width*2/3);
    
  }
  const showNextOffers = ()=>{
    const container = offerRef.current;
    let width = container.clientWidth;
    container.scrollLeft = container.scrollLeft + (width*2/3);
   
  }



  //dropdown container for search feilds
  const [showSuggetion, setShowSuggetions]= useState(false);
  const [fromSuggession, setFromSuggesion] = useState(false);
  const [toSuggession, setToSuggesion] = useState(false);
  const [inputChange, setInputChange]=useState(false);
  const [inputValue, setInptValue] = useState('');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const inputFromRef = useRef();
  const inputToRef = useRef();
  const autocompleteRef = useRef();


   //handling outside click for to and from dropdown
   const handleClickOutside = (event)=>{
    // console.log("input from", inputFromRef?.current.contains(event.target))
    // console.log("input to", inputToRef?.current.contains(event.target))
    if(autocompleteRef.current && !autocompleteRef.current.contains(event.target) && inputFromRef?.current && !inputFromRef?.current.contains(event.target) && !inputToRef?.current.contains(event.target) ){
      setShowSuggetions(false);
    }
    else if(autocompleteRef.current && !autocompleteRef.current.contains(event.target) && inputToRef?.current && !inputToRef?.current.contains(event.target) && !inputFromRef?.current.contains(event.target)){
      setShowSuggetions(false);
    }
   }
  useEffect(()=>{
      document.addEventListener("mousedown", handleClickOutside);
      return ()=>{
          document.removeEventListener("mousedown", handleClickOutside);
      }
      
  },[]);


  

  //handling input of from feild
  const handleFromInputChange = (e)=>{
    setFromValue(e.target.value);
    setInptValue(e.target.value);
    if(e.target.value !== ""){
        setInputChange(true);
    }else{
        setInputChange(false);
    }
  }

//handling input of to feild
const handleToInputChange = (e)=>{
   setToValue(e.target.value);
  setInptValue(e.target.value);
    if(e.target.value !== ""){
        setInputChange(true);
    }else{
        setInputChange(false);
    }
  
 }

  // handling station click
  const handelSuggetionClick = (name)=>{
   
    // console.log("value", name);
     if(fromSuggession){
      setFromValue(name);

     }
     if(toSuggession){
      setToValue(name);
     }
     setShowSuggetions(false)
     setInptValue("");
     setInputChange(false);
  }
  // useEffect(()=>{
  //    console.log("toValue",toValue)
  //    console.log("fromValue",fromValue)
  // },[toValue,fromValue])

  const handleSearchSubmission = ()=>{
    if(fromValue === ""){
      alert("Please select from station");
    }else if(toValue === ""){
      alert("Please select to station");
    }else{
      const data = {
        fromValue,
        toValue,
        currentDate
      }
      navigate('search',{state:data});
    }
  }

  const swipeSourceAndDestination = ()=>{
    if(fromValue !== "" && toValue !== ""){
         setFromValue(toValue);
         setToValue(fromValue);
    }
  }

  return (
    <>
    <div className='train-home-page'>
      <div className='train-banner'>
         <img alt='banner' src='https://images.ixigo.com/image/upload/misc/f3c5fc0564afd3390b0d7fedfba8e8c2-qsbuo.webp'/>
         <div className='banner-line'>
             <img alt='train icon' src='	https://images.ixigo.com/rt-train/pc/img/trainsHome/compareBookWhite.png'/>
             <h1>Train Ticket Booking</h1>
         </div>
         <div className='train-search-box'>
            <div className='search-input-feilds'>
               
                <div className='train-search-feild-relative'>
                  <input type="text" className="inputTextTrain leftRoundBorder" ref={inputFromRef} onFocus={()=> {
                    setShowSuggetions(true);
                    setFromSuggesion(true);
                    setToSuggesion(false);
                   
                  }}
                  onChange={handleFromInputChange}
                  value={fromValue}
                  required/>
                  <span className="floating-label-train">From</span>
                  {(fromSuggession && showSuggetion && inputChange)?
                    <div className='station-dropdown-container' ref={autocompleteRef}>
                      <ul>
                            {
                              stationsArr.map((station)=>{
                                if(station.name.toLowerCase().includes(inputValue?.toLowerCase())){
                                  return(
                                    <li key={station.id} value={station.name} onClick={()=>handelSuggetionClick(station.name)}>
                                      <div className="cityIcon">
                                        <MdOutlineLocationCity/>
                                      </div>
                                      <div className="name">
                                        <p>{station.name}</p>
                                      </div>
                                    </li>
                             
                                  )
                                }
                                return null;
                              })
                            }       
                        </ul>
                    </div>
                    : 
                    (fromSuggession && showSuggetion && !inputChange)?
                    <div className='station-dropdown-container' ref={autocompleteRef}>
                        <div className='popular-airports'>
                             <p>Popular Stations</p>
                        </div>
                        <ul>
                          { stationsArr.map((station)=>{
                            return(
                             <li key={station.id} value={station.name} onClick={()=>handelSuggetionClick(station.name)}>
                              <div className="cityIcon">
                                <MdOutlineLocationCity/>
                              </div>
                              <div className="name">
                                <p>{station.name}</p>
                              </div>
                             </li>
                            )
                          })
                            
                          }
                        </ul>
                    </div>
                    :
                    null
                    }
                </div>

                <div className='train-search-feild-relative'>
                  <input type="text" className="inputTextTrain" ref={inputToRef} onFocus={()=>{
                    setToSuggesion(true);
                    setShowSuggetions(true);
                    setFromSuggesion(false);
                    
                  }}
                  onChange={handleToInputChange}
                  value={toValue}
                  required/>
                  <span className="floating-label-train">To</span>
                  <div onClick={swipeSourceAndDestination} className='swap-icon-div'>
                   <AiOutlineSwap className='swap-icon'/>
                  </div>
                  {(toSuggession && showSuggetion && inputChange)?
                    <div className='station-dropdown-container' ref={autocompleteRef}>
                       <ul>
                            {
                              stationsArr.map((station)=>{
                                if(station.name.toLowerCase().includes(inputValue?.toLowerCase())){
                                  return(
                                    <li key={station.id} value={station.name} onClick={()=>handelSuggetionClick(station.name)}>
                                      <div className="cityIcon">
                                      <MdOutlineLocationCity/>
                                      </div>
                                      <div className="name">
                                        <p>{station.name}</p>
                                      </div>
                                    </li>
                             
                                  )
                                }
                                return null;
                              })
                            }       
                        </ul>
                    </div>
                    : 
                    (toSuggession && showSuggetion && !inputChange)?
                    <div className='station-dropdown-container' ref={autocompleteRef}>
                        <div className='popular-stations'>
                          <p>Popular Stations</p>
                        </div>
                        <ul>
                          { stationsArr.map((station)=>{
                            return(
                              <li key={station.id} value={station.name} onClick={()=>handelSuggetionClick(station.name)}>
                              <div className="cityIcon">
                                <MdOutlineLocationCity/>
                              </div>
                              <div className="name">
                                <p>{station.name}</p>
                              </div>
                             </li>
                            )
                          })
                            
                          }
                        </ul>
                    </div>
                    :
                    null
                    }
                </div>
               

                <div className='train-search-feild-container'>
                 <Datepicker currentDate={currentDate} setCurrentDate={setCurrentDate} />
                </div>

                <div className='train-search-feild-container'>
                  <button className='search-button' onClick={handleSearchSubmission} >Search</button>
                </div>
            </div> 

              <div className='description'>
                  <div>
                    <input type='checkbox'/>
                    <p>Get a full train fare refund</p>
                    <img alt='icon' src='https://www.ixigo.com/image/upload/fcRelated/8035f73dc62e7ed58a05b30805b4bf59-bhtst.gif'/>
                  </div>
                  <div>
                    <p>₹0 cancellation fee  &#x2022;  Instant full train fare refunds &#x2022; 24*7 premium customer support &#x2022; No documentation required</p>
                  </div>
              </div>
         </div>
      </div>
      <div className='train-cards-section'>
         <h1 >IRCTC Train Ticket Booking on ixigo</h1>
         <div className='irctc-logo'>
           <h3>IRCTC Authorised Partner</h3>
           <img alt='irctc' src='https://images.ixigo.com/image/upload/f_auto/train/760e6e3b2f500e9c0a6436e330240cf8-rodkb.png'/>
         </div>
         <div className='promises-support'>
            <div className='flex-main'>
              <div className='flex'>
                <img alt='icon' src='https://images.ixigo.com/image/upload/f_auto/train/ecb835b55223186c49d55750b422ed10-oscpe.png'/>
                <p>₹0 Payment Gateway Fee on Payments via UPI</p>
              </div>
              <div className='flex'>
                <img alt='icon' src='https://images.ixigo.com/image/upload/f_auto/801ca10aa0964d95bdcd76df1573b5e1-hlzsy.png'/>
                <p>ixigo Assured: Free Cancellation of Train Tickets</p>
              </div>
            </div>
            <div className='flex-main'>
              <div className='flex'>
                <img alt='icon' src='	https://images.ixigo.com/image/upload/f_auto/train/a21427142a38e7331574b034aa4a687a-lwpxr.png'/>
                <p>Instant Refund on Indian Railway Reservation Cancellation</p>
              </div>
              <div className='flex'>
                  <img alt='icon' src='https://images.ixigo.com/image/upload/f_auto/train/d522fcf3866c18b343060ab3cb49b3b1-xnmqx.png'/>
                  <p>24*7 Support for IRCTC Train Ticket Booking</p>
              </div>
            </div>
         </div>
         <div className='train-book-meal'>
            <div className='icon-title'>
              <img alt='food-order' src='https://images.ixigo.com/rt-train/mobi/img/trainHome/eCateringWithBg.png'/>
              <div>
                <p>Book meals for train journey</p>
                <p>Get food delivered at your seat</p>
              </div>
            </div>
            <div className='two-buttons'>
              <button>VIEW MY FOOD ORDERS</button>
              <button>ORDER NOW</button>
            </div>
         </div>
      </div>
        <div className='crousel-train'>
         <h2>Offers For You </h2> 
           <div className='flight-offers-container' ref={offerRef} >
                  {arr.map((item,index)=>{
                      if(item){
                      return <div className='flight-offer-img-container' key={index} >
                              <img alt={"offers"} src={item}/>
                          </div>
                      }else{
                          return null;
                      }
                  })}

              <div className='flight-offers-next-prev'>
                  <div onClick={showPreviousOffers} style={{visibility:(offerBtn.prev?'visible':'hidden')}} >
                  <img alt='previous-icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5UlEQVR4nO2ZOw7CQAxEHYr4qEhQ2DkBf0jLR1DA7exzsHRApCSIanckP8n9zHi1Hy9REATB/6SqVjuz+pzwSFUtdmH1xGpPMBPv5NOnDMXEd/LdqsVuVL54P/WL9zst0oTKJVWsfgQVT8TqbYjPAYsfkJPfh/gcsPgOOHnbhvgcsNoGN3mxdYjPAautkJNfwoofNaD2gDAwuoSgTMjADhQmSjnIoDqhA/egMFHKdRqrE97/GgsTpTzqwTrRhomiR4sKs5xGhrsKZQJ2vP7jg6PxGcF+MTVQ4juduLLYNLeSIAgoLy+9z15ZP/8kOAAAAABJRU5ErkJggg=="/>
                  </div>

                  <div onClick={showNextOffers} style={{visibility:(offerBtn.next?'visible':'hidden')}}>
                  <img alt='next-icon' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA6klEQVR4nO2ZSQoCMRBFvy46B1VwZ9UNdOvswgH1diYeQ0oUFBHtdf0yD3r/XkLoDEClUvlvkp77jZYjRtYFo3ySfE1arJFyoopIb/LP7zETsA4YaCTv3+VfEZI3JBHWuct+jyiHGuFhJpKUNf1MJC0rcGDBI6QswYEFj9C8AP9M5Dk4sPARMwRYE1NwED1C8gQBIsYgCdiSBlib/AS08up+EUeVF/c/slZ571uJqPLqfjttLSPv/kBjQeXV/aHegsqL+4st+ylPcD9qzPLgv15Pw0uP+oHjM4LuielJkjxoNO+oRr5SqcANNxV6UqzcpPJzAAAAAElFTkSuQmCC"/>
                  </div>
              </div>
          </div>
        </div>
       <Footer/>
     </div>
   </>
  )
}

export default Trains