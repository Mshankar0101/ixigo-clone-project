import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer>
        <h3>
           <strong style={{color:'rgb(0,0,0)'}}>About Ixigo</strong> 
        </h3>
        <div className='footer'>
          <p style={{padding: '10px 10px 0 10px'}}>
            Launched in 2007, ixigo is a technology company focused on empowering Indian travellers to plan, book and manage their trips across rail, air, buses and hotels. We assist travellers in making smarter travel decisions by leveraging artificial intelligence, machine learning, and data science led innovations on our OTA platforms, comprising our websites and mobile applications. Our vision is to become the most customer-centric travel company, by offering the best customer experience to our users. Our focus on travel utility and customer experience for travellers in the 'next billion user' segment is driven by technology, cost-efficiency and our culture of innovation has made us India's leading travel ecosystem for the 'next billion users'.
            <br/>
            {/* <br/>
            Our OTA platforms allow travellers to book train tickets, flight tickets, bus tickets, hotels and cabs, while providing travel utility tools and services developed using in-house proprietary algorithms and crowd-sourced information, including train PNR status and confirmation predictions, train seat availability alerts, train running status updates and delay predictions, flight status updates, bus running status, pricing and availability alerts, deal discovery, destination content, personalized recommendations, instant fare alerts, and automated customer support services. Read our travel stories where we cover everything - flight news, latest travel news, Indian Railways reservation updates, COVID-19 travel guidelines and restrictions and more. Let us help you plan your next vacation. Explore our website today. */}
          </p>
          <div className='footer-box' >
            <div className='footer-img-container'>
              <div> <a href='https://play.google.com/store/apps/details?id=com.ixigo&pli=1' target='_blank' rel="noopener noreferrer"><img alt='play store' src='https://www.ixigo.com/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Ff_auto%2Ch_90%2Ffooter%2F82a81e606bd92407a86f935c5d3fb772-gubxy.png&w=256&q=75' /> </a></div>
              <div> <a href='https://apps.apple.com/in/app/ixigo-flight-hotel-booking/id418128294' target='_blank' rel="noopener noreferrer"><img alt='apple store' src='https://www.ixigo.com/vimaan/_next/image?url=https%3A%2F%2Fimages.ixigo.com%2Fimage%2Fupload%2Ff_auto%2Ch_90%2Ffooter%2F828deb854e5a46e2e4672dc62b17d2ac-kukcx.png&w=256&q=75' /></a></div>
            </div>
              <ul>
                <li>Privacy</li>
                <li>Terms of Use</li>
                <li>Career</li>
                <li>Customer Service</li>
              </ul>
            <small>
            © 2024 Le Travenues Technology Ltd. India. All brands are trademarks of their respective owners.
            </small>
          </div>
        </div>
    </footer>
  )
}

export default Footer