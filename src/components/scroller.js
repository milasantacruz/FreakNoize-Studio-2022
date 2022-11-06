import React, {useState} from 'react';
import ReactPageScroller from 'react-page-scroller';
import { UseIndexContext } from '../context/landingIndex';
import Section from "../components/section"

const Scroller = ({data, loc, }) => {

  var {index, setIndex} = UseIndexContext();

    useState(()=>{
      setIndex(loc);
      console.log(loc)
    },[])

 
    return (
        <ReactPageScroller
            //pageOnChange={onCh}
            customPageNumber={index}
            renderAllPagesOnFirstRender={true}
            >
              {
              data.allStrapiServicio.edges.map((e,i) =>{
              // console.log(i)
                var current=false;
                if(i%2 !== 0){
                  current=false;
                  //console.log(current);
                }else{
                  current=true;
                  //console.log(current);
                }

                return(
                  
                  <div key={e.node.titulo} >
                    <Section data={e} prop1={current} />
                  </div>
                )
              })
            } 
          </ReactPageScroller>
    );
}

export default Scroller;
