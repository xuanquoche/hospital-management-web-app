import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Button from '@/src/components/common/button';

export interface IRegisterForm {}

export default function RegisterForm(props: IRegisterForm) {
  return (
    <div className='h-[50%] w-full flex flex-col gap-4'>
      <div>
        <Input
          type='text'
          placeholder='User name'
          className='!placeholder-white border-r-0 border-l-0 border-t-0 rounded-none focus:ring-0 focus-visible::ring-offset-0 focus-visible:outline-0 focus-visible:border-ring-0 focus-visible:ring-0 text-white'
        />
      </div>
      <div>
        <Input
          type='email'
          placeholder='Email'
          className='!placeholder-white border-r-0 border-l-0 border-t-0 rounded-none focus:ring-0 focus-visible::ring-offset-0 focus-visible:outline-0 focus-visible:border-ring-0 focus-visible:ring-0 text-white'
        />
      </div>
      <div>
        <Input
          type='password'
          placeholder='Password'
          id='password'
          className='!placeholder-white border-r-0 border-l-0 border-t-0 rounded-none focus:ring-0 focus-visible::ring-offset-0 focus-visible:outline-0 focus-visible:border-ring-0 focus-visible:ring-0 text-white'
        />
      </div>
      <div className='flex justify-end'>
        <Button size='sm' className='w-[30%] bg-primary'>
          Register
        </Button>
      </div>
    </div>
  );
}
