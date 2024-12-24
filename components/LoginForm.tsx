import Link from 'next/link';

export default function LoginForm() {
  return (
    <form className="login__form">
      <div className="login__form__input">
        <label htmlFor="username">Username</label>
        <div className="login__form__input__field">
          <input type="text" name="username" />
        </div>
      </div>
      <div className="login__form__input">
        <label htmlFor="password">Password</label>
        <Link href="" className="forget-password">
          Forgot?
        </Link>
        <div className="login__form__input__field">
          <input type="password" name="password" />
        </div>
      </div>
      <button className="login__form__submit" type="submit">
        Sign In
      </button>
      <p className="login__form__register">
        Not a member?
        <Link href="">Sign up now</Link>
      </p>
    </form>
  );
}
