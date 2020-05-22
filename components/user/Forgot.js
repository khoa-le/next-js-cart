import Alert from "../shared/Alert";

const Forgot = ({ errorMessage, onSubmit }) => (
  <form onSubmit={onSubmit}>
    {errorMessage && <Alert type="danger" message={errorMessage} />}
    <div className="form-group">
      <label htmlFor="loginEmail">Email</label>
      <input
        name="username"
        type="email"
        className="form-control"
        id="loginEmail"
        required
        aria-describedby="emailHelp"
      />
    </div>
    <div className="submit">
      <button type="submit" className="btn btn-primary">
        Gởi liên kết để đặt lại mật khẩu
      </button>
    </div>
  </form>
);

export default Forgot;
