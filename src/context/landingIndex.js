import React, {createContext, useState, useContext} from 'react';

export const IndexContext = createContext();
export const UseIndexContext = () =>{
    return useContext(IndexContext);

}

const LandingIndexProvider = (props) => {

    var[index, setIndex] = useState(0);
 
    return (
        <IndexContext.Provider value={{index, setIndex}}>
            {props.children}
        </IndexContext.Provider>
    );
}

export default LandingIndexProvider;
