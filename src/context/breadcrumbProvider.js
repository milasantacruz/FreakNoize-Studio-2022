import React, {createContext, useState, useContext} from 'react';

export const BreadcrumbContext = createContext();

export const useBreadContext = () =>{
    return useContext(BreadcrumbContext)
}

const BreadcrumbProvider = (props) => {

    var[bread, setBread] = useState({
        active: false,
        items:[]
    })

    return (
            <BreadcrumbContext.Provider value={{bread, setBread}} >
                {props.children}
            </BreadcrumbContext.Provider> 
    );
}

export default BreadcrumbProvider;
