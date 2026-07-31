import React from "react"
import { useState} from "react"
import "./Signup.css"
const Signup = ({Signupclick,setLoggedIn}) => {
    const [ShowLogin,setShowLogin]=useState(false);
    const [SignupData,setSignupData]=useState({
        name:"",
        email:"",
        password:""
    });
    const [Errors,setErrors]=useState({
        name:"",
        email:"",
        password:"",
        submit:""
    })
    const ShowLoginClicked=()=>{
        setShowLogin(prev=>!prev);
        setSignupData({
            name:"",
            email:"",
            password:""
        });
        setErrors({
            name:"",
            email:"",
            password:"",
            submit:""
        });
    }
    const formSubmitted=async(e)=>{
        e.preventDefault();
        // check if the field inputs are valid
        const name=SignupData.name.trim();
        const email=SignupData.email.trim();
        const password=SignupData.password;
        setErrors({
            name:"",
            email:"",
            password:"",
            submit:""
        });
        if (email === "") {
            setErrors(prev=>({...prev,email:"please enter email"}))
        }
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            setErrors(prev=>( {...prev,email:"please enter a valid email"}))
        }
        if (password === "") {
            setErrors(prev=>( {...prev,password:"password is required"}))
        }
        const passwordRegex=/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            if(!ShowLogin)setErrors(prev=>( {...prev,password:"password must be at least 8 characters and must contain at least one digit (0-9) and one letter (a-z, A-Z)"}))
        }
        if(!ShowLogin){
            // sign up:
            if (name === "") {
                setErrors(prev=>( {...prev,name:"please enter name"}))
                return;
            }
            if (name.length < 2) {
                setErrors(prev=>( {...prev,name:"name must have at least 2 characters"}))
                return;
            }
            const valid=false;
            // send data to backend and see if account doesn"t already exist and say valid and move to login page
            try{
                const response = await fetch("http://localhost:5000/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    ShowLoginClicked();
                } else {
                    setErrors(prev => ({
                        ...prev,
                        submit: data.message,
                    }));
                }
            }catch(err){
                setErrors(prev => ({
                    ...prev,
                    submit: "Unable to connect to the server."
                }));
            }
            //
            if(valid){
                ShowLoginClicked();
            }
            else{
                setErrors(prev=>({...prev,submit:"an account with this email already exists"}))
                return;
            }
        }
        else{
            // log in:
            // send data to backend and check if valid
            // 
            setLoggedIn(true);
            Signupclick();
            try{
                const response = await fetch("http://localhost:5000/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("Logged in!");
                    // store token if you"re using JWT
                    // localStorage.setItem("token", data.token);
                    // close popup
                    // navigate("/")
                } else {
                    setErrors(prev => ({
                        ...prev,
                        submit: data.message,
                    }));
                }
            }catch(err){
                setErrors(prev => ({
                    ...prev,
                    submit: "Unable to connect to the server."
                }));
            }
            //
            const valid=false;
            if(valid){
                setLoggedIn(true);
                Signupclick();
            }
            else{
                setErrors(prev=>({...prev,submit:"invalid email or password"}))
            }
        }
    }
  return (
    <>
    <div className="authentication-page">
        <div className="authentication-box">
        <button className="cross-button" onClick={Signupclick}>×</button>
            <form noValidate onSubmit={formSubmitted}>
            {
                !ShowLogin &&
                <div>
                    <p className="authentication-title">create account</p>
                    <p className="authentication-subtitle">your library and progress stays with you</p>
                        <div className="authentication-field"><label className="authentication-label" htmlFor="name">Name</label>
                        <input className="authentication-input" type="text" id="name" autoComplete="name" value={SignupData.name} onChange={(e)=>setSignupData({...SignupData,name:e.target.value})} placeholder="Your name"/>
                        <p className="authentication-error">{Errors.name}</p></div>
                        
                        <div className="authentication-field"><label className="authentication-label"  htmlFor="email">Email</label>
                        <input className="authentication-input" type="email" id="email" autoComplete="email"value={SignupData.email} onChange={(e)=>setSignupData({...SignupData, email:e.target.value})} placeholder="you@example.com" />
                        <p className="authentication-error">{Errors.email}</p></div>
                        
                        <div className="authentication-field-password"><label className="authentication-label"  htmlFor="password">Password</label>
                        <input className="authentication-input" type="password" id="password" autoComplete="new-password"value={SignupData.password} onChange={e=>setSignupData({...SignupData,password:e.target.value})} placeholder="At least 8 characters"/>
                        <p className="authentication-error">{Errors.password}</p></div>
                        
                        {/* confirm password */}
                        <button className="authentication-submit" type="submit">Create account</button>
                        <p className="authentication-error">{Errors.submit}</p>
                    <p className="authentication-footer">Have an account? <button className="authentication-link" type="button" onClick={ShowLoginClicked}>log in</button></p> 
                </div>
            }
            {
                ShowLogin &&
                <div>
                
                    <p className="authentication-title">welcome back</p>
                    <p className="authentication-subtitle">your library and progress stays with you</p>
                    <div className="authentication-field"><label className="authentication-label"  htmlFor="email">Email</label>
                        <input className="authentication-input" id="email" type="email" autoComplete="email" value={SignupData.email} onChange={(e)=>setSignupData({...SignupData, email:e.target.value})} placeholder="you@example.com" />
                        <p className="authentication-error">{Errors.email}</p></div>
                        
                        <div className="authentication-field-password"><label className="authentication-label"  htmlFor="password">Password</label>
                        <input className="authentication-input" id="password" type="password" autoComplete="current-password" value={SignupData.password} onChange={e=>setSignupData({...SignupData,password:e.target.value})} placeholder="Enter your password"/>
                        <p className="authentication-error">{Errors.password}</p></div>
                        
                        <button className="authentication-submit" type="submit">Log in</button>
                        <p className="authentication-error">{Errors.submit}</p>
                    <p className="authentication-footer">Don't have an account? <button className="authentication-link" type="button" onClick={ShowLoginClicked}>sign up</button></p>
                </div>
                }
            
            </form>
        </div>
    </div>
    </>
  )
}

export default Signup