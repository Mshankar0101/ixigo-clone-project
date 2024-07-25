import React,{useEffect,useState,useRef} from 'react';
import '../../styles/Flight.css';

const Crousel = ({offer}) => {
    
    //logic for next prev btn offer section
  const [offerBtn, setOfferBtn]= useState({prev:false,next:true});
  const offerRef= useRef();
  useEffect(() => {
    const container = offerRef.current;
    const handleScroll = () => {
    //   console.log('container.scrollLeft',container.scrollLeft);
    //   console.log(container.scrollLeft + container.clientWidth,container.scrollWidth);

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
    // console.log(width);
  }
  const showNextOffers = ()=>{
    const container = offerRef.current;
    let width = container.clientWidth;
    //console.log("container.scrollLeft", container.scrollLeft)
    container.scrollLeft = container.scrollLeft + (width*2/3);
    //console.log("container.scrollLeft", container.scrollLeft)
    //console.log(width);
  }

  return (
    <div className='flight-offers-container' ref={offerRef} >
                {offer.map((item)=>{
                    if(item.newHeroOfferCardUrl){
                    return <div className='flight-offer-img-container' key={item.id} >
                            <img alt={item.pTl} src={item.newHeroOfferCardUrl}/>
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
  )
}

export default Crousel