import { Avatar } from 'flowbite-react';
import arrowBack from '../assets/arrow1.png';
import profile from '../assets/profile.jpg';

type AsideProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
const Header: React.FC<AsideProps> = ({ show, setShow }) => {
  return (
    <header className="absolute w-full top-0 z-10 left-0 right-0 px-5 p-2  bg-neutral-900 ">
      <div className="max-w-6xl mx-auto flex items-center  justify-between ">
        <div className="w-full flex items-center justify-between">
          {!show && (
            // <button aria-label="btn-back" onClick={() => setShow(true)}>
            //   <img src={arrowBack} className="rotate-180" alt="" width={25} />
            // </button>
            <div
              onClick={() => setShow(true)}
              className="flex gap-2 items-center p-2 rounded cursor-pointer"
            >
              <button aria-label="btn-back ">
                <img src={arrowBack} className="rotate-180" alt="" width={25} />
              </button>
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
          <div className="w-full flex items-center gap-3 py-4 ">
            <span className="hidden lg:flex justify-end text-slate-100 font-md text-sm">
              Koemnak
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
        </div>
      </div>
    </header>
  );
};

export default Header;
