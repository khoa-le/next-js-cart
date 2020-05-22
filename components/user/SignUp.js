import Link from "next/link";
import Alert from "../shared/Alert";

const SignUp = ({ errorMessage, onSubmit }) => (
  <form onSubmit={onSubmit}>
    {errorMessage && <Alert type="danger" message={errorMessage} />}
    <div className="form-group">
      <label htmlFor="registerEmail">Email</label>
      <input
        name="username"
        type="email"
        className="form-control"
        id="registerEmail"
        required
      />
    </div>

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

    <div className="form-group">
      <Link href="/user/login">
        <a>Tôi đã có tài khoản</a>
      </Link>
    </div>
    <button type="submit" className="btn btn-primary">
      Đăng Ký
    </button>
  </form>
);

export default SignUp;
