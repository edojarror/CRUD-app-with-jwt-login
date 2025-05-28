import { useState } from 'react';
import { useNavigate } from "react-router";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { loginHandler, RedirectingToPage } from "../ButtonHandler";
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline';
import '../App.css';

export function LoginPage () {
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    let navigate = useNavigate();
    const { handleSubmit, register, formState: {errors}} = useForm({criteriaMode: "all"})
    const onSubmit = (data) => {
        console.log("data send = ",data);
        loginHandler(data, navigate)
    };

    return (
        <div>
           <div>Login Page</div>
           <form onSubmit={handleSubmit(onSubmit)}>
                <div className='inputContainer'>
                    <label style={{width: "80px"}}>Username</label>
                    <input 
                        defaultValue=""
                        {
                            ...register("username", 
                                {
                                    required: "please enter username", 
                                    minLength: {value: 4, message: "enter at least 4 characters"},
                                    pattern: {value: /^[a-zA-Z0-9_]*$/, message: "only accept alphanumeric and underscore"}
                                }
                            )
                        } 
                        autoComplete="on"
                    />       
                </div>

                <ErrorMessage 
                    name="username" 
                    errors={errors}
                    render={({messages}) => Object.entries(messages)
                        .map(([type, message]) => <p key={type} className='errortext'>{message}</p>)}
                 />

                <div className='inputContainer'>
                    <label style={{width: "80px"}}>Password</label>
                    <input 
                        defaultValue="" 
                        {
                            ...register("password", 
                                {
                                    required: " please enter password", 
                                    minLength: {value: 6, message: "enter at least 6 characters"},
                                    pattern: {value: /^[a-zA-Z0-9]*$/, message: "only accept alphanumeric"}
                                })
                        }
                        autoComplete="off"
                        type={isPasswordShown ? "text" : "password"}
                    />
                    <div style={{ display: "flex", marginLeft: "8px"}} onClick={() => {
                        setIsPasswordShown(!isPasswordShown);
                    }}>

                         {
                            isPasswordShown ? <EyeIcon height="16px" /> : <EyeSlashIcon height="16px" /> 
                         }

                    </div>
                    
                </div>
                <ErrorMessage 
                    name="password" 
                    errors={errors} 
                    render={({messages}) => Object.entries(messages)
                        .map(([type, message]) => <p key={type} className='errortext'>{message}</p>) }
                 />
                <div>
                    <input type="submit" value="Login" />
                </div>
                <div>
                    <button onClick={() => RedirectingToPage("/signup", navigate)}>Signup</button>
                </div> 
           </form>
            
        </div>
    )
}