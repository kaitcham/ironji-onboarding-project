'use client';
import * as yup from 'yup';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';

const loginSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

type LoginData = yup.InferType<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
  });

  const handleSubmitForm = (data: LoginData) => {
    router.push('/dashboard');
  };

  return (
    <form className="login__form" onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="login__form__input">
        <label htmlFor="username">Username</label>
        <div
          data-validate={errors.username?.message}
          className={`login__form__input__field ${
            errors.username && 'alert-validate'
          }`}
        >
          <input type="text" {...register('username')} />
        </div>
      </div>
      <div className="login__form__input">
        <label htmlFor="password">Password</label>
        <Link href="" className="forget-password">
          Forgot?
        </Link>
        <div
          data-validate={errors.password?.message}
          className={`login__form__input__field ${
            errors.password && 'alert-validate'
          }`}
        >
          <input type="password" {...register('password')} />
        </div>
      </div>
      <button type="submit" className="login__form__submit">
        Sign In
      </button>
      <p className="login__form__register">
        Not a member?
        <Link href="">Sign up now</Link>
      </p>
    </form>
  );
}
