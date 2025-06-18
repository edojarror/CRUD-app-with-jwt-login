import { useState } from 'react'
import { SignupHandler, RedirectingToPage } from '../ButtonHandler';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import '../App.css'
export default function SignUpPage () {
    const [inputValue, setInputValue] = useState({username: "", password: ""});
    const navigate = useNavigate();
    const { handleSubmit, register, watch, formState: {errors} } = useForm({ criteriaMode: "all"});
    const onSubmit = (data) => {
        console.log("onsubmit = ",data); 
        SignupHandler(data, navigate)
    }
    console.log("username value = ", watch("username"))
    return (
        <div>Sign Up Page
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username : </label>
                    <input 
                        value={inputValue.username} 
                        {
                            ...register("username", 
                                {
                                    required: " please enter username", 
                                    minLength: {value: 4, message: "enter at least 4 characters"},
                                    pattern: {value: /^[a-zA-Z0-9_]*$/, message: "only accept alphanumeric and underscore"}
                                })
                        }
                        onChange={(e) => setInputValue({...inputValue, username: e.target.value})} />
                </div>
                <ErrorMessage
                name='username'
                errors={errors}
                render={({messages}) => messages && 
                    Object.entries(messages)
                        .map(([type, message]) => (<p className='errortext' key={type}>{message}</p>))
                    
                    } />
                <div>
                    <label>Password : </label>
                    <input 
                        value={inputValue.password} 
                        {
                            ...register("password", 
                                {
                                    required: " please enter password", 
                                    minLength: {value: 6, message: "enter at least 6 characters"},
                                    pattern: {value: /^[a-zA-Z0-9]*$/, message: "only accept alphanumeric"}
                                })
                        }
                        onChange={(e) => setInputValue({...inputValue, password: e.target.value})}
                        />
                </div>
                <ErrorMessage
                    errors={errors}
                    name='password'
                    render={({messages}) => Object.entries(messages)
                        .map(([type, message]) => <p key={type} className='errortext'>{message}</p>)
                    }
                />
                <div>
                    {/* <button type='submit' onClick={() => SignupHandler(inputValue, navigate)}>Signup</button> */}
                    <input type='submit' />
                    
                </div>    
            </form>
            
            <div>
                <button onClick={() => RedirectingToPage("/login_page", navigate)}>Login</button>
            </div>
        </div>
    )
}