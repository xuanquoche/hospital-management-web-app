import { Button } from '@/components/ui/button';

export function AiButton() {
  return (
    <Button className='bg-gradient-to-r from-indigo-600 to-teal-400 text-white font-medium cursor-pointer hover:opacity-90 transition px-4 py-2 rounded-lg flex items-center'>
      AI Assistance
      <span className='ml-2 inline-block w-2 h-2 bg-green-400 rounded-full'></span>
    </Button>
  );
}
