import { createRef } from "react";
import "./style.css";

export default function AuthPage() {
  const formRef = createRef();
  const loginTextRef= createRef()

  const toggleLoginBtnClick=()=>{
    if(loginTextRef?.current &&formRef?.current)
    {
        formRef.current.style.marginLeft = "0%";
        loginTextRef.current.style.marginLeft = "0%";
    }

  }
  const toggleSignupBtnClick=()=>{
    if(loginTextRef?.current &&formRef?.current)
    {
        formRef.current.style.marginLeft = "-50%";
        loginTextRef.current.style.marginLeft = "-50%";
    }


  }

  return (
    <>
       <div className="wrapper">
      <div className="title-text">
        <div className="title login" ref={loginTextRef}>Login Form</div>
        <div className="title signup">Signup Form</div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input type="radio" name="slide" id="login" checked />
          <input type="radio" name="slide" id="signup" />
          <label htmlFor="login" className="slide login" onClick={toggleLoginBtnClick}>Login</label>
          <label htmlFor="signup" className="slide signup" onClick={toggleSignupBtnClick}>Signup</label>
          <div className="slider-tab"></div>
        </div>
        <div className="form-inner">
          <form action="#" className="login" ref={formRef}>
            <div className="field">
              <input type="text" placeholder="Email Address" required />
            </div>
            <div className="field">
              <input type="password" placeholder="Password" required />
            </div>
            <div className="pass-link"><a href="#">Forgot password?</a></div>
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Login" />
            </div>
            {/* <div className="signup-link">Not a member? <a href="" onClick={signUpLinkClick}>Signup now</a></div> */}
          </form>
          <form action="#" className="signup">
            <div className="field">
              <input type="text" placeholder="Email Address" required />
            </div>
            <div className="field">
              <input type="password" placeholder="Password" required />
            </div>
            <div className="field">
              <input type="password" placeholder="Confirm password" required />
            </div>
            <div className="field btn">
              <div className="btn-layer"></div>
              <input type="submit" value="Signup" />
            </div>
          </form>
        </div>
      </div>
    </div>

    </>
  );
}
