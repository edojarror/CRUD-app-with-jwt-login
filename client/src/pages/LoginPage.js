import { useNavigate } from "react-router";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { loginHandler, RedirectingToPage } from "../ButtonHandler";

export function LoginPage () {

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
                <div>
                    <label>Username</label>
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
                    />       
                </div>

                <ErrorMessage 
                    name="username" 
                    errors={errors}
                    render={({messages}) => Object.entries(messages)
                        .map(([type, message]) => <p key={type} className='errortext'>{message}</p>)}
                 />

                <div>
                    <label>Password</label>
                    <input 
                        defaultValue="" 
                        {
                            ...register("password", 
                                {
                                    required: " please enter password", 
                                    minLength: {value: 6, message: "enter at least 6 characters"},
                                    pattern: {value: /^[a-zA-Z0-9]*$/, message: "only accept alphanumeric"}
                                })
                        } />
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