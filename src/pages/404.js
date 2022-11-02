import * as React from "react"
import {StaticImage} from 'gatsby-plugin-image';
import {Link} from "gatsby";
import Layout from "../components/layout"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import Seo from "../components/seo"
import "./404.scss"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <div className="errorContenedor">
      
        <div className="errorMessage">
        <StaticImage 
            className="m404"
            src= "../images/404_2.png" 
            alt="error"
            layout = "constrained"
        />
        <p>¡LO SENTIMOS, SE HA PRODUCIDO UN ERROR INESPERADO!</p>
        <Link to="/" >
        <div className="volver-cont">
           <div className="volver">
              <FontAwesomeIcon icon={faArrowLeft} />
              <h1>Volver Al Inicio</h1>
           </div>
        </div>
        </Link>
        </div>
    </div>
  </Layout>
)

export default NotFoundPage
