import Alert from "../shared/Alert";

const Reset = ({ customer, onSubmit, errorMessage }) => {
  return (
    <form onSubmit={onSubmit}>
      {errorMessage && <Alert type="danger" message={errorMessage} />}
      <input name="email" type="hidden" value={customer.email} readOnly  />
      <input name="token" type="hidden" value={customer.reset_password_token} readOnly  />
      <div className="form-group">
        <label htmlFor="registerPassword">Mật khẩu</label>
        <input
          name="password"
          type="password"
          className="form-control"
          id="registerPassword"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="registerRPassword">Nhập lại mật khẩu</label>
        <input
          name="rpassword"
          type="password"
          className="form-control"
          id="registerRPassword"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
       Đặt lại mật khẩu
      </button>
    </form>
  );
};

export default Reset;
