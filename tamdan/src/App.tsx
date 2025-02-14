import { Outlet, useLocation } from 'react-router-dom';
import Aside from './components/Aside';
import Header from './components/Header';
function App() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className=" bg-slate-900 ">
      <div className="flex relative h-full bg-slate-900">
        <Aside />
        <div className="w-full  relative flex-col">
          <Header />
          <main className="h-screen   overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
