import { Avatar, Button } from 'flowbite-react';
import profile from '../assets/profile.jpg';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

type DataType = {
  user: null | {
    id: string;
    name: string;
    email: string;
  };
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
const Header: React.FC = () => {
  const { user, show, setShow } = useContext(AppContext) as DataType;
  console.log(user);
  return (
    <header className="absolute w-full top-0 z-10 left-0 right-0 px-5 p-2  bg-slate-900 ">
      <div className="max-w-6xl mx-auto flex items-center  justify-between ">
        <div className="w-full flex items-center justify-between">
          {!show && (
            <div
              onClick={() => setShow(true)}
              className="flex gap-2 items-center p-2 rounded cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-slate-100 text-md font-bold">Menu</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 items-center">
          <div>
            <svg
              className=" lg:h-5 lg:size-14 text-white"
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
                d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
              />
            </svg>
          </div>
          {user ? (
            <div className="w-full flex items-center gap-3 py-4 ">
              <span className="hidden lg:flex justify-end text-slate-100 font-md text-sm">
                {user?.name}
              </span>
              <div className="  object-cover rounded-full border border-violet-200">
                <Avatar
                  img={
                    profile
                      ? profile
                      : '"https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"'
                  }
                  className="w-10"
                  alt="avatar of Jese"
                  rounded
                />
              </div>
            </div>
          ) : (
            <motion.div whileHover={{ scale: 1.2 }} className=" lg:w-32 flex items-center gap-3 py-4">
              <Button href="/login" className="text-nowrap">
                Sign in
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
