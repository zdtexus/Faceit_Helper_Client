type PageHeaderProps = {
  title: string;
};

export const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <div className='mx-auto text-3xl font-semibold dark:font-normal min-h-[55px] select-none'>
      {title}
    </div>
  );
};