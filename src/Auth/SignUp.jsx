import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import { useNavigate } from 'react-router-dom';



const Signup = () => {
  const navigate = useNavigate();
  return (
    <Wrapper> <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                  <form className="mx-1 mx-md-4">

                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="form3Example3c"> Email</label>
                        <input type="email" id="form3Example3c" className="form-control" />

                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="form3Example4c" autoComplete="new-password">Password</label>
                        <input type="password" id="form3Example4c" className="form-control" />
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                      <label className="form-label" htmlFor="form3Example4cd">Confirm password</label>
                        <input type="password" id="form3Example4cd" className="form-control" autoComplete="confirm-password" />

                      </div>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                      <label className="form-check-label" htmlFor="form2Example3">
                        I agree all statements in <a href="#!">Terms of service</a>
                      </label>
                    </div>

                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="button" className="btn btn-primary btn-lg">Register</button>
                    </div>

                  </form>
                  <div className="form-check d-flex justify-content-center mb-5">

                      <label className="form-check-label" htmlFor="form2Example3">
                        Already have account? <a href="#!" onClick={(e)=>{e.preventDefault();
                         navigate("/login");}}>Login here</a>
                      </label>
                    </div>

                </div> </Wrapper>
  )
}
Signup.propTypes = {

    toggle: PropTypes.func,
};

export default Signup