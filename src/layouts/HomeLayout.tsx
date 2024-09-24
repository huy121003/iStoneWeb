import { ReactNode } from 'react';
import Header from '../components/Header';


interface HomeLayoutProps {
  children: ReactNode;
}

const maxHeight = `calc(100vh - 96px)`;


function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className={`flex-1 max-h-screen`}>
      <Header />
     
      <div
        className='flex-1 overflow-y-auto'
        style={{ maxHeight: maxHeight }} // Thiết lập chiều cao tối đa
      >
        {children}
      </div>
    </div>
  );
}

export default HomeLayout;
