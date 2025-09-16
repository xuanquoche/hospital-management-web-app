import { LogoIcon } from '@/public/icon/index';
import { LoginImage } from '@/public/images/index';
import RegisterForm from '@/src/components/form/register-form';

export default function Login() {
  return (
    <div className='flex justify-center items-center h-screen w-screen bg-linear-to-r from-background-login to-black md:to-white'>
      <div className='flex w-[70%] md:w-[30%] flex-col justify-around items-center space-y-10 md:mr-20 h-full'>
        <div>
          <LogoIcon />
        </div>
        <RegisterForm />
      </div>
      <div className='h-[40%] w-[50%] justify-center items-center hidden md:flex'>
        <LoginImage height={500} />
      </div>
    </div>
  );
}
