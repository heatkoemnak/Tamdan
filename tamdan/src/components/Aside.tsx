import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../logo.css';
import arrowBack from '../assets/arrow1.png';
import { useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { AsideProps } from '../types';

type MenuItem = {
  to: string;
  label: string;
  icon: string;
};
const Aside = () => {
  const { setUser, show, setShow } = useContext(AppContext) as AsideProps;
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post('https://tamdan-server.vercel.app/api/logout');
      if (response.status === 200) {
        setUser(null);
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const icons: Record<MenuItem['icon'], JSX.Element> = {
    home: (
      <svg className="w-6 h-6 mr-4" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    tasks: (
      <svg className="w-6 h-6 mr-4" fill="currentColor" viewBox="0 0 16 16">
        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z" />
      </svg>
    ),
    calendar: (
      <svg className="w-6 h-6 mr-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M5.127 3.502 5.25 3.5h9.5c.041 0 .082 0 .123.002A2.251 2.251 0 0 0 12.75 2h-5.5a2.25 2.25 0 0 0-2.123 1.502ZM1 10.25A2.25 2.25 0 0 1 3.25 8h13.5A2.25 2.25 0 0 1 19 10.25v5.5A2.25 2.25 0 0 1 16.75 18H3.25A2.25 2.25 0 0 1 1 15.75v-5.5ZM3.25 6.5c-.04 0-.082 0-.123.002A2.25 2.25 0 0 1 5.25 5h9.5c.98 0 1.814.627 2.123 1.502a3.819 3.819 0 0 0-.123-.002H3.25Z" />
      </svg>
    ),
    folder: (
      <svg className="w-6 h-6 mr-4" fill="currentColor" viewBox="0 0 16 16">
        <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z" />
      </svg>
    ),
    tag: (
      <svg className="w-6 h-6 mr-4" fill="currentColor" viewBox="0 0 16 16">
        <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
      </svg>
    ),
  };
  const menuItems: MenuItem[] = [
    { to: '/', label: 'Home', icon: 'home' },
    { to: '/tasks', label: 'Your board', icon: 'tasks' },
    { to: '/taskstoday', label: 'Today tasks', icon: 'calendar' },
    { to: '/projects', label: 'Projects', icon: 'folder' },
    { to: '/tags', label: 'Tags', icon: 'tag' },
  ];

  const menuRef = useRef<HTMLDivElement | null>(null);

  // Handle clicks outside of the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <>
      {show && (
        <motion.div
          initial={{
            opacity: 0,
            x: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          ref={menuRef}
          className=" z-50 h-screen"
        >
          <aside className="border-r  bg-slate-800 flex flex-col absolute lg:static left-0  top-0 z-50  border-neutral-800 h-screen lg:w-64 w-[300px] ">
            <div className="grow">
              <div className="flex items-center justify-between px-4 py-6 text-center border-b">
                <div>
                  <h1 className=" text-xl font-bold leading-6">
                    {/* <span className="text-yellow-300">Tamdan </span> */}
                    <h1 id="tamdan" data-text="Tandan">
                      Tamdan
                    </h1>
                  </h1>
                </div>
                <button aria-label="btn-back" onClick={() => setShow(false)}>
                  <img src={arrowBack} alt="" width={25} />
                </button>
              </div>
              <div className="px-4 pt-2">
                {menuItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center rounded-xl font-bold text-sm ${
                        location.pathname === item.to
                          ? 'bg-cyan-600 text-slate-50'
                          : 'text-slate-50'
                      } py-3 px-4`}
                    >
                      {icons[item.icon]}

                      {item.label}
                    </Link>
                ))}
              </div>
            </div>
            <button
              onClick={handleLogout}
              aria-label="btn"
              className="p-4 mx-2 flex items-center"
            >
              <div className="inline-flex items-center justify-center rounded-md  text-gray-300 hover:text-white text-sm font-semibold transition">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                  />
                </svg>
              </div>
              <span className="font-bold text-sm text-slate-100 ml-2">
                Logout
              </span>
            </button>
          </aside>
        </motion.div>
      )}
    </>
  );
};

export default Aside;
