import React, {useEffect, useState, useRef} from 'react';

const Menu = () => {

    var [click, isclick] = useState(true);

    var burger_ref = useRef(null);
    var menu_ref = useRef(null);

    function handleClick(){
        isclick(!click);
    }

    function handleBurger(){
        burger_ref.current.classList.toggle('is-active');
        menu_ref.current.classList.toggle('is-active');
        isclick(!click);
    }

    useEffect(() =>{
        console.log(click);
        // burger_ref.current.addEventListener('click', function(){
        //     burger_ref.current.classList.toggle('is-active');
        //     menu_ref.current.classList.toggle('is-active');
        //     isclick(true);
        // })
    });

    var stylePre = {
        fill: "#E3651B"
    }

    var stylePos = {
        fill: "#eeeeee",
        transform: "rotate(180deg)"
    }

    var isChange = click? stylePos : stylePre
    var levelStyle = click? "navbar-item level-hide" : "navbar-item"


    return (
        // <div className="myNav">
        //     <div className="level ">
        //         <div className="level-left">
        //             <div className={levelStyle}>
        //                 <a href="">Modelado</a>
        //             </div>
        //             <div className={levelStyle}>
        //                 <a href="">Impresion</a>
        //             </div>
        //             <div className={levelStyle}>
        //                 <a href="">Diseño</a>
        //             </div>
        //         </div>
        //         <div className="level-right">
        //                 <div className="level-item">
        //                     <svg id="poligonSvg"  height="100" width="100" xmlns="http://www.w3.org/2000/svg" viewBox="-30 -30 120 120">
                            
        //                         <path  onClick={handleClick} id="shape" className="poligonNav"  d="M39.33,72.7,78.67,21.57,68.05,0H10.62L0,21.57Z" style={isChange}/>
                                  
        //                     </svg>
        //                 </div>
        //         </div>
        //     </div>
        // </div>

        <nav className="navbar myNav" role="navigation" aria-label="main navigation" >
            <div className="navbar-brand">

                <a role="button" ref={burger_ref} onClick={handleBurger} className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div ref={menu_ref} className="navbar-menu" id="myNavbar" >
                <div className="navbar-start">
                    <div className={levelStyle}><a href="">Diseño</a></div>
                    <div className={levelStyle}><a href="">Modelado</a></div>
                    <div className={levelStyle}><a href="">Impresion</a></div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                            <svg id="poligonSvg"  height="100" width="100" xmlns="http://www.w3.org/2000/svg" viewBox="-30 -30 120 120">
                            
                                <path  onClick={handleClick} id="shape" className="poligonNav"  d="M39.33,72.7,78.67,21.57,68.05,0H10.62L0,21.57Z" style={isChange}/>
                                                      
                            </svg>
                    </div>
                </div>
            </div>

        </nav>
    );
}

export default Menu;
