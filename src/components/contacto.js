import React, {useRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser,faEnvelope,faPaperPlane, faCheck, faCircleExclamation, faUser} from '@fortawesome/free-solid-svg-icons';
import * as Yup from "yup";
import { useFormik } from "formik";
import { send } from 'emailjs-com';
import "./contacto.scss"

const Contacto = ({setClick}) => {

    const iform = useRef();
    const txtArea = useRef();
    const[output, setOutput] = useState("👋 Welcome !")
 
    const schema = Yup.object({
        from_name: Yup.string().required("Required"),
        reply_to: Yup.string().required("Required").email(),
        message: Yup.string().required("Required")
    })
    
    const {
        handleChange,
        handleSubmit,
        touched,
        values,
        errors
    } = useFormik({
        initialValues: {
            to_name: 'Camilo',
            from_name:"",
            reply_to:"",
            message:""
        },
        validationSchema: schema,
        onSubmit:(values) =>{
           // console.log(JSON.stringify(values))
            send(
                'service_3z9a2of',
                'template_qlv8sjt',
                values,
                'QFl6KP77TPgxLm53G'
              ).then((response)=>{
                setOutput("Thank you! your message has been sent")
                iform.current.reset();
               // console.log(response);
            
              }).catch((err)=>{
                setOutput("Something went wrong! try again in a few minutes")
               // console.log('FAILED...', err);
                iform.current.reset();
                txtArea.current.value = ""
              })
        },

    })

    function handleC(){
        setClick(false)
    }
  
    return (
            <div className="formWrapper" >
                <button className="button is-black is-large" onClick={handleC} style={{border:"solid blue 1px"}}>x</button>
                <div className="outterShadow">
                    <div className="outter">
                    {
                        output &&
                        <div className="outputMessage"><h1>{output}</h1></div>
                    }
                    <form 
                    ref={elem =>{iform.current = elem}}
                    className="form" 
                    onSubmit={handleSubmit}>
                        <field>
                            <label className="label">Name</label>
                            <div className="control has-icons-left" >
                                <input 
                                style={{
                                    borderColor: touched&&errors.name? "red":"#1811D9"
                                }}
                                name="from_name"
                                id="from_name"
                                className="input" 
                                type="text" 
                                placeholder="Name"
                                onChange={handleChange}
                                value={values.name}
                                />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon color={"#1C0C40"} icon={faUser}/>
                                </span>
                            </div>
                            {touched.name && errors.name?
                            <h3 className="err">{errors.name}</h3>:
                            <div></div>
                            }

                        </field>

                        <field>
                            <label className="label">E-mail</label>
                            <div className="control has-icons-left has-icons-right" >
                                <input 
                                style={{
                                    borderColor: touched&&errors.email? "red":"#1811D9"
                                }}
                                name="reply_to"
                                id="reply_to"
                                className="input" 
                                type="email" 
                                placeholder="E-mail"
                                onChange={handleChange} 
                                value={values.email}
                                />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon color={"#1C0C40"} icon={faEnvelope}/>
                                </span>
                                {touched && errors.email?
                                <span className="icon is-small is-right">
                                    <FontAwesomeIcon color={"red"}  icon={faCircleExclamation}/>
                                </span>:
                                <span className="icon is-small is-right">
                                    <FontAwesomeIcon  color={"#1811D9"} icon={faCheck}/>
                                </span>
                                }
                            </div>
                            {touched.name && errors.email?
                            <h3 className="err">{errors.email}</h3>:
                            <div></div>
                            }

                        </field>

                        <field>
                            <label className="label">Message</label>
                            <div className="control" >
                                <textarea 
                                style={{
                                    height:"100%",
                                    borderColor: touched&&errors.message? "red":"#1811D9"
                                }}
                                ref={elem =>{txtArea.current = elem}}
                                name="message"
                                id="message"
                                className="input" 
                                type="textarea" 
                                placeholder="Message"
                                onChange={handleChange}
                                value={values.message}
                                />
                            </div>
                            {touched.name && errors.message?
                            <h3 className="err">{errors.message}</h3>:
                            <div></div>
                            }

                        </field>
                        <div className="field fieldSubmit">
                            <p className="control">
                                <button
                                type="submit" 
                                className="button sendBut">
                                    <span>
                                        send
                                    </span>
                                    <span className="icon is-small is-right">
                                    <FontAwesomeIcon  icon={faPaperPlane}/>
                                    </span>
                                </button>
                            </p>
                        </div>


                        </form>
                    </div>
                </div>
            </div>
    );
}

export default Contacto;
