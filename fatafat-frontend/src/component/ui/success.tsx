import { useNavigate } from "react-router-dom";

export default function Success({ data }) {
  const { message, url } = data;

  const navigate = useNavigate();
  const handelRedirect = () => {
    navigate(`/admin/${url}`);
  };
  return (
    <div className="ml-8 flex justify-center items-center ">
      <div className=" p-4 w-full max-w-md h-full md:h-auto">
        <div className=" p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 ">
            <svg
              className="w-2 h-2 text-green-500 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>

            <p className=" text-lg font-semibold text-gray-900 dark:text-white">
              {message} Successfully{" "}
            </p>
          </div>
          <button
            onClick={handelRedirect}
            data-modal-toggle="successModal"
            type="button"
            className="py-2 mt-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:focus:ring-primary-900"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
