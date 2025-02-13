import Fix from '../assets/time-management.png';

const NotFound = () => {
  return (
    <div className="max-w-5xl h-1/2 mx-auto my-40">
      <div className=" flex flex-col items-center justify-center p-4">
        <img src={Fix} className="w-28" alt="" />
        <div className="w-full flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center">
          <p className="text-lg md:text-xl lg:text-2xl text-gray-500 my-10">
            Page not found
          </p>
          <a
            href="#"
            className="flex items-center space-x-2  hover:text-white text-gray-500 px-4 py-2 rounded transition duration-150"
            title="Return Home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>Return Home</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
