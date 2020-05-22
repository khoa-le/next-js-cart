import Link from "next/link";
import Alert from "../shared/Alert";

const Login = ({ errorMessage, message, onSubmit }) => (
  <form onSubmit={onSubmit}>
    {errorMessage && <Alert type="danger" message={errorMessage} />}
    {message && <Alert type="success" message={message} />}
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
    <div className="form-group">
      <label htmlFor="loginPassword">Mật khẩu</label>
      <input
        type="password"
        className="form-control"
        name="password"
        required
        id="loginPassword"
      />
    </div>

    <div className="form-group">
      <Link href="/user/forgot">
        <a>Quên mật khẩu</a>
      </Link>
    </div>

    <div className="submit">
      <button type="submit" className="btn btn-primary">
        Đăng Nhập
      </button>{" "}
      &nbsp; &nbsp;
      <Link href="/user/signup">
        <a>Tôi chưa có tài khoản</a>
      </Link>
    </div>
  </form>
);

export default Login;
