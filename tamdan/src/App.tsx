import { Outlet, useLocation } from 'react-router-dom';
import Aside from './components/Aside';
import Header from './components/Header';
import { useEffect, useState } from 'react';
function App() {
  const location = useLocation();
  console.log(location.pathname);

  const [show, setShow] = useState<boolean>(() => {
    const showSidebar = localStorage.getItem('active');
    return showSidebar ? JSON.parse(showSidebar) : true;
  });

  useEffect(() => {
    localStorage.setItem('active', JSON.stringify(show));
  }, [show]);

  return (
    <div className=" bg-neutral-900 ">
      <div className="flex relative h-full bg-neutral-900">
        <Aside show={show} setShow={setShow} />
        <div className="w-full  relative flex-col">
          <Header show={show} setShow={setShow} />
          <main className="h-screen   overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
