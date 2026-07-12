import React from 'react';

const Loader: React.FC<{ size?: 'sm' | 'md' | 'lg'; text?: string }> = ({
  size = 'md',
  text,
}) => {
  const sizeMap = { sm: 'h-6 w-6', md: 'h-10 w-10', lg: 'h-16 w-16' };
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeMap[size]} animate-spin rounded-full border-4 border-slate-700 border-t-blue-500`}
      />
      {text && <p className="text-sm text-slate-400">{text}</p>}
    </div>
  );
};

export default Loader;
