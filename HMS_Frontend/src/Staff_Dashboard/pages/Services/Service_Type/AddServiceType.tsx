import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

export default function AddServiceType() {

  const [formData, setFormData] = useState({
    serviceName: "",
    servicePrice: "",
    serviceDescription: ""
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

    if (parseInt(formData.servicePrice) <= 0) {
      toast.error('Invalid Service Price', {
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

    if (formData.serviceName.length == 0) {
      toast.error('Please Provide Service Name.', {
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

    if (formData.servicePrice.length == 0) {
      toast.error('Please Provide Service Price.', {
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

    if (formData.servicePrice.length == 0) {
      toast.error('Please Provide Service Description.', {
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
      const response = await fetch(`https://${apiUrl}/api/service/createService`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success('Service Created Successfully.', {
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
          serviceName: "",
          servicePrice: "",
          serviceDescription: ""
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
            Add Service Type
          </h2>
          <p className="mb-8 lg:mb-2 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Enter Details of Service Type You Want to Add.
          </p>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="serviceName"
                className="block text-sm font-medium text-black dark:text-white"
              >
                Service Name:
              </label>
              <input
                type="text"
                id="serviceName"
                className="shadow-sm bg-gray-50 border border-gray-300 text-black text-md rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:text-black dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="E.g Cleaning"
                value={formData.serviceName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="servicePrice"
                className="block text-sm font-medium text-black dark:text-white"
              >
                Service Price:
              </label>
              <input
                type="number"
                id="servicePrice"
                className="block p-3 w-full text-md text-black bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:text-black  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="E.g 2000"
                value={formData.servicePrice}
                onChange={handleChange}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="serviceDescription"
                className="block text-md font-medium text-black dark:text-white"
              >
                Service Description:
              </label>
              <textarea
                id="serviceDescription"
                rows={6}
                className="block p-2.5 h-[100px] w-full text-md text-black bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:text-black dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter Service Description Here...."
                value={formData.serviceDescription}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-md font-medium text-center rounded-md sm:w-fit bg-boxdark text-white dark:hover:bg-green-700 dark:text-white focus:ring-4 focus:outline-none dark:bg-green-600 my-0"
            >
              Create Service
            </button>
          </form>
        </div>
      </section>
    </>
  )
}