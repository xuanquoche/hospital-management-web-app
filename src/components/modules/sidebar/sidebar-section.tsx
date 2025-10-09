export function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='mb-4'>
      <p className='uppercase text-gray-400 font-semibold mb-2 text-xl'>
        {title}
      </p>
      <div className='space-y-1'>{children}</div>
    </div>
  );
}
