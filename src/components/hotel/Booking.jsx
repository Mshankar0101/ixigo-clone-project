import React, { useEffect, useState} from 'react'
import '../../styles/Booking.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { IoIosFitness } from "react-icons/io";
import { MdOutlineSpa, MdLocalBar, MdLocationPin } from "react-icons/md";
import { IoRestaurant } from "react-icons/io5";
import { GrSwim } from "react-icons/gr";
import { FaWifi, FaKey } from "react-icons/fa";
import { RiShape2Fill } from "react-icons/ri";
import { LuBaby } from "react-icons/lu";
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../Footer';



  const Booking = () => {
    const location = useLocation();
    const {state} = location;
    // useEffect(()=>{
    //     console.log(state)
    // },[])
    let rating = state.rating;


   function srcset(image, size, rows, cols) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
    }

    
    const ammenitiesStyle ={
        height:'20px',
        width:'20px',
        color:'#17181c',
        
    }
    const ammenities = (type, index)=>{
        if(type === 'Gym'){
        return (
            <div key={index}>
                <IoIosFitness style={ammenitiesStyle} />
                <p>{type}</p>
            </div>
        )
        }else if(type === 'Spa'){
        return (
            <div key={index}>
                <MdOutlineSpa style={ammenitiesStyle} />
                <p>{type}</p>
            </div>
        )
        }else if(type === 'Bar'){
        return (
            <div key={index}>
                <MdLocalBar style={ammenitiesStyle} />
                <p>{type}</p>
            </div>
        )
        }else if(type === 'Restaurant'){
            return (
                <div key={index}>
                    <IoRestaurant style={ammenitiesStyle} />
                    <p>{type}</p>
                </div>
            )
        }else if(type === 'Swimming Pool'){
            return (
                <div key={index}>
                    <GrSwim style={ammenitiesStyle} />
                    <p>{type}</p>
                </div>
            )  
        }else if(type === 'Free WiFi'){
            return (
                <div key={index}>
                    <FaWifi style={ammenitiesStyle} />
                    <p>{type}</p>
                </div>
            ) 
        }
    }
   
    const [reserveDetails, setReserveDetails]= useState({price:0, rooms:0});
    const [selectedRoom, setSelectedRoom]= useState(Array(15).fill(false));
    const handleReserve = (price,roomNo)=>{
       if(selectedRoom[roomNo] === false){
            let previousBookingPrice = reserveDetails.price;
            let previousBookedRooms = reserveDetails.rooms;
            setReserveDetails({price:previousBookingPrice+price, rooms:previousBookedRooms+1});
            setSelectedRoom((prev)=>{
                let newSelectedRoom = [...prev];
                newSelectedRoom[roomNo] = true;
                return newSelectedRoom;
            })
       }
    }


    const navigate = useNavigate();
     const handlePayment = (fare)=>{
       let data = {
          total: fare
        }
        
        navigate("payment", {state: data})
     }

     useEffect(()=>{
        window.scroll(0,0);
      },[])

  return (
    <div className='hotel-booking-page'>
        {/* <div className='tabs'>
           <a href='#overview' >Overview</a>
           <a href='#rooms' >Rooms</a>
           <a href='#policies' >Policies</a>
        </div> */}
        <div className='overview' id='overview'>
            <div className='hotel-images'>
            <ImageList
                sx={{ width: '100%' , maxHeight: 400, maxWidth:'1280px' }}
                variant="quilted"
                cols={4}
                rowHeight={190}
                gap={15}
                >
                {state.images.map((item, index) => {
                    let rows = 1;
                    let cols = 1;
                    if(index === 0){
                        rows = 2;
                        cols = 2;
                    }

                    return(

                        <ImageListItem style={{backgroundColor:'#ffebe6'}} key={item} cols={cols} rows={rows}>
                        <img
                            style={{borderRadius:'15px'}}
                            {...srcset(item, 190, rows, cols)}
                            alt='hotel'
                            loading="lazy"
                        />
                        </ImageListItem>
                    )
                })}
            </ImageList>
            </div>


            <div className='name-rating-destination'>
                <h2>{state.name}</h2>
                <div>
                    <div className='rating'>
                        <div><p>{rating * 2}</p></div>
                        <p>
                            {rating <= 5 && rating >= 4.5? "Exceptional" : rating <= 4.5 && rating >= 4? "Excellent" : rating <= 4 && rating >= 3.5? "Very Good" : rating <= 3.5 && rating >= 3? "Good": ""}
                        </p>
                    </div>

                    <div className='icon-destination'>
                         <div>
                            <MdLocationPin className='location-destination'/>
                         </div>
                         <p>{state.location}</p>
                    </div>
                </div>
            </div>
           
        </div>

        <div className='rooms' id='rooms'>
            <h2> Select Your Rooms</h2>
            <div className='rooms-container'>
               { state.rooms.map((room,index)=>{

                  return  <div key={index} className='hotel-room'>
                        <p>{room.bedDetail} ({room.roomType})</p>
                        <div className='ammenities'>
                            {
                                state.amenities.map((ammenity, index)=>{
                                return ammenities(ammenity , index);
                                })
                            }
                        </div>
                        <p> &bull; Free Cancellation till 20 Aug</p>
                        <p><RiShape2Fill /> {room.roomSize} sq. ft.</p>
                        <p>₹{Math.ceil(room.costPerNight)}</p>
                        <p>+₹{Math.ceil(room.costPerNight*18/100)} taxes & fees per night, per room</p>
                    <button disabled={selectedRoom[index]} style={selectedRoom[index]?{backgroundColor:'#f2f2f2', color:'#000'}: {}} onClick={()=>handleReserve(room.costPerNight, index )}>RESERVE 1 ROOM</button>
                    </div>
               })
 }
            </div>
        </div>

        <div className='policies' id='policies'>
            <h2>Hotel Policies</h2>
            <div className='hotel-policies'>
                <div>
                    <div>
                        <FaKey className='icon-Style-policies' />
                        <p>Check-in</p>
                    </div>
                    <p>From 14:00</p>
                </div>
                <div>
                    <div>
                        <FaKey className='icon-Style-policies' />
                        <p>Check-out</p>
                    </div>
                    <p>Till 12:00</p>
                </div>
                <div>
                    <div>
                        <LuBaby className='icon-Style-policies' />
                        <p>Children and extra beds</p>
                    </div>
                    <div>
                        <p>
                            <span>Infant 0-1 year(s) </span>
                            - Stay for free if using existing bedding. Note, if you need a cot there may be an extra charge.   
                        </p>
                        <p>
                            <span> Guests above 10 year(s) - </span>
                            - Must use an extra bed which will incur an additional charge.
                        </p>
                        <p>
                            <span>Other - </span>
                            Extra beds are dependent on the room you choose. Please check the individual room capacity for more details.
                        </p>
                        <p>
                            <span>Extra Bed Charges starts from - </span>
                            ₹1,500
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <Footer/>

        {
            reserveDetails.rooms > 0?
            <div className="hotel-booking-total">
               <p>₹{reserveDetails.price} <span>TOTAL ROOMS ({reserveDetails.rooms})</span> </p>
               <button onClick={()=>handlePayment(reserveDetails.price)} >Pay Now</button>
            </div>
            : null
        }

    </div>
  )
}

export default Booking