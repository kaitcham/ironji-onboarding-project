import Image from 'next/image';
import LoginForm from '@/components/LoginForm';
import GithubIcon from '../components/GithubIcon';

export default function LoginPage() {
  return (
    <div className="login__page">
      <div className="login__page__container">
        <h3 className="login__page__container__title">Sign In With</h3>
        <div className="login__page__container__buttons">
          <button className="login__page__container__buttons--item">
            <GithubIcon />
            GitHub
          </button>
          <button className="login__page__container__buttons--item">
            <Image
              src="/images/google-icon.webp"
              alt="google-icon"
              width={25}
              height={25}
            />
            Google
          </button>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
