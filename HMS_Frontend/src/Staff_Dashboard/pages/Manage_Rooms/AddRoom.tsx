import { useState } from "react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddRoom() {
  const [formData, setFormData] = useState({
    roomNo: '',
    roomType: '',
    roomStatus: 'Available',
    roomDescription: ''
  });
  const apiUrl = process.env.REACT_APP_API_URL;


  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if( parseInt(formData.roomNo) <= 0 && parseInt(formData.roomNo) > 399 ){
        toast.error('Invalid Room No', {
            position: 'bottom-right',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Bounce,
          });
          return;
    }

    try {
      const response = await fetch(`https://${apiUrl}/room/createRoom`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Room Created Successfully.', {
          position: 'bottom-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
        setFormData({
          roomNo: '',
          roomType: '',
          roomDescription: '',
          roomStatus: 'Available'
        });
      } else {
        const errorText = await response.text();
        console.log(errorText);
        toast.error(errorText, {
          position: 'bottom-right',
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
      }
    } catch (error) {
      console.log('An error occurred: ' + error);
      toast.error('An error occurred: ' + error, {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="dark:bg-boxdark w-242.5 rounded-lg">
        <div className="py-8 lg:py-7 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-2 text-4xl tracking-tight font-bold text-center text-boxdark dark:text-white">
            Add Room
          </h2>
          <p className="mb-8 lg:mb-2 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Enter Details of Room You Want to Add.
          </p>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="roomNo"
                className="block text-sm font-medium text-black dark:text-white"
              >
                Room No:
              </label>
              <input
                type="number"
                id="roomNo"
                className="shadow-sm bg-gray-50 border border-gray-300 text-black text-md rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:text-black dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="E.g 102"
                value={formData.roomNo}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="roomType"
                className="block text-sm font-medium text-black dark:text-white"
              >
                Room Type:
              </label>
              <input
                type="text"
                id="roomType"
                className="block p-3 w-full text-md text-black bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:text-black  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="E.g Luxury"
                value={formData.roomType}
                onChange={handleChange}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="roomDescription"
                className="block text-md font-medium text-black dark:text-white"
              >
                Room Description:
              </label>
              <textarea
                id="roomDescription"
                rows={6}
                className="block p-2.5 h-[100px] w-full text-md text-black bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:text-black dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter Room Description Here...."
                value={formData.roomDescription}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-md font-medium text-center rounded-md sm:w-fit bg-boxdark text-white dark:hover:bg-green-700 dark:text-white focus:ring-4 focus:outline-none dark:bg-green-600 my-0"
            >
              Create Room
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
