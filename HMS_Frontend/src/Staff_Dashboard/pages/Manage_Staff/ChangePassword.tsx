import React, { useState } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    staffID: '',
    newPassword: '',
  });
  const apiUrl = process.env.REACT_APP_API_URL;


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requestBody = {
      staffID: formData.staffID,
      newPassword: formData.newPassword,
    };

    if (!validateData(requestBody)) {
      return;
    }

    try {
      const response = await fetch(`https://${apiUrl}/staff/changePassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        toast.success('Password changed successfully!', {
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
          staffID: '',
          newPassword: '',
        });
      } else {
        const errorData = await response.text();
        toast.error(errorData, {
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
      toast.error('An error occurred while changing the password.', {
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

  const validateData = (data: { staffID: string; newPassword: string }) => {
    if (Number(data.staffID) <= 0) {
      toast.error('Invalid Staff ID Provided', {
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
      return false;
    }

    if (data.newPassword.length < 5) {
      toast.error('Password length should be greater than 5.', {
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
      return false;
    }
    return true;
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-boxdark w-[600px] ">
        <div className="flex mt-15 flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white dark:bg-boxdark rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-graydark md:text-2xl dark:text-white">
                Change Password
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="staffID"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Staff ID:
                  </label>
                  <input
                    type="number"
                    name="staffID"
                    id="staffID"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Staff ID"
                    value={formData.staffID}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Password:
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder="New Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white dark:text-boxdark bg-boxdark dark:bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  <b className="text-lg">Change Password</b>
                </button>
              </form>
            </div>
          </div>
          <div
            style={{ marginTop: '20px', height: '300px' }}
            className="w-full bg-white dark:bg-boxdark rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
          >
            <ul className="p-6 mt-4">
              <li>
                <strong className="dark:text-white text-boxdark">Instructions:</strong>&nbsp;
                <ul>
                  <br />
                  <li>
                    <p className="dark:text-white text-boxdark">
                      1. Verify staff identity before changing the password or creating an account to prevent unauthorized access.
                    </p>
                  </li>
                  <br />
                  <li>
                    <p className="dark:text-white text-boxdark">
                      2. Ensure the new password is strong, containing a mix of letters, numbers, and special characters, and inform the staff not to reuse previous passwords.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default ChangePassword;
