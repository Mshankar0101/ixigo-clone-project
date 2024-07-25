import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Datepicker = ({currentDate,setCurrentDate}) => {
  var maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 4);
      
  return (
    <DatePicker
      selected={currentDate}
      onChange={(date) => setCurrentDate(date)}
      dateFormat={'EEE, dd MMM'}
      monthsShown={window.innerWidth < 600?  1: 2}
      minDate={new Date()}
      maxDate={maxDate}
      onKeyDown={(e) => {
            e.preventDefault();
      }}
    />
  )
}

export default Datepicker