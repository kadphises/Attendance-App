import PropTypes from 'prop-types';

const Login = ({toggle}) => {
  return (
    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

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
        <label className="form-label" htmlFor="form3Example4c">Password</label>
          <input type="password" id="form3Example4c" className="form-control" autoComplete="password" />
        </div>
      </div>


      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
        <button type="button" className="btn btn-primary btn-lg">Login</button>
      </div>

    </form>
    <div className="form-check d-flex justify-content-center mb-5">

                      <label className="form-check-label pointer" htmlFor="form2Example3">
                        {"Don't"} have account? <a href="#!" onClick={(e)=>{e.preventDefault();
                        toggle("1")}}>Signup here</a>
                      </label>
                    </div>

  </div>
  )
}
Login.propTypes = {

    toggle: PropTypes.func,
};

export default Login