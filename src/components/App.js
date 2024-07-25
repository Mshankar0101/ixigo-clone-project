import "../styles/App.css";
import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, useLocation, Navigate} from "react-router-dom";
import Flights from "./flight/Flights";
import Search from "./flight/Search";
import Hotels from "./hotel/Hotels";
import Trains from "./train/Trains";
import Buses from "./bus/Buses";
import Login from "./Login";
import Navbar from "./Navbar";
import { Header } from "./Header";
import FlightSearchContextProvider from "../context/FlightSearchContextProvider";
import PageNotFound from "./PageNotFound";
import {GlobalContext} from '../context/Contexts';
import BookingPage from "./common/BookingPage";
import NavbarMobile from "./NavbarMobile";
import SearchTrain from "./train/SearchTrain";
import SearchBus from "./bus/SearchBus";
import SearchHotel from "./hotel/SearchHotel";
import Booking from "./hotel/Booking";
import UnderConstruction from "./UnderConstruction";
import PaymentPage from "./common/PaymentPage";
// import GlobalContextProvider from "../context/GlobalContextProvider";


function App() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    if (location.pathname === '/flights/search') {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location]);

  // Use the context to get the resolution value
  const { resolution } = useContext(GlobalContext);

  return (
      <FlightSearchContextProvider>
        <div className="App">
          {resolution.width < 766 ?
            <NavbarMobile />
            :
            <>
              <Header />
              {showNavbar && <Navbar />}
            </>
          }

          <Routes>
            {/* <Route path="/" element={<Flights />} />
            <Route path="/search/*" element={<Search />} />
            <Route path="/search/book" element={<BookingPage />} /> */}
            <Route path="/" element={<Navigate replace to="/flights" />} />

            <Route path="/nav" element={<NavbarMobile />} />
            <Route path="/offers" element={<UnderConstruction />}/>
            <Route path="/customercare" element={<UnderConstruction />}/>

            <Route path="/flights/*" element={<Flights />} />
            <Route path="/flights/search/*" element={<Search />} />
            <Route path="/flights/search/book/*" element={<BookingPage />} />
            <Route path="flights/search/book/payment" element={<PaymentPage/>} />


            <Route path="/hotels/*" element={<Hotels />} />
            <Route path="/hotels/search/*" element={<SearchHotel />} />
            <Route path="/hotels/search/book/*" element={<Booking />} />
            <Route path="/hotels/search/book/payment" element={<PaymentPage />} />

            <Route path="/trains/*" element={<Trains />} />
            <Route path="/trains/search/*" element={<SearchTrain />} />
            <Route path="/trains/search/book/*" element={<BookingPage />} />
            <Route path="/trains/search/book/payment" element={<PaymentPage />} />


            <Route path="/buses/*" element={<Buses />} />
            <Route path="/buses/search/*" element={<SearchBus />} />
            <Route path="/buses/search/payment" element={<PaymentPage />} />


            <Route path='/login-signup' element={<Login />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
       </FlightSearchContextProvider>
  );
}

export default App;
