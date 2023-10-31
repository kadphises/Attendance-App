import { useState } from "react"
import Login from "./Login"
import Signup from "./Signup"

function App() {
  const [activeTab, setActiveTab] = useState("1");

  const toggle=(tab)=>{
    console.log(tab);
    setActiveTab(tab);}

  return (
    <section className="vh-100" style={{backgroundColor: '#eee'}}>
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black" style={{borderRadius: '25px'}}>
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
              {activeTab==="1"?  <Signup toggle={toggle}/>:
                <Login toggle={toggle}/>}
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    className="img-fluid" alt="Sample image" />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default App
