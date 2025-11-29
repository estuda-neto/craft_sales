type MainMiniLayoutProps = {
  children: React.ReactNode;
};

export const MainMiniLayout: React.FC<MainMiniLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col flex-wrap items-center justify-start gap-[10px] max-w-full">
      {children}
    </div>
  );
};