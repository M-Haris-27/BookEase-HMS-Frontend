import SelectFromDate from './SelectFromDate';
import SelectToDate from './SelectToDate';
import { useState } from 'react';
import * as React from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

export default function CreateBooking() {
  const [formData, setFormData] = useState({
    guestID: '',
    roomID: '',
  });
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const apiUrl = process.env.REACT_APP_API_URL;


  const handleReset = () => {
    setFormData({
      guestID: '',
      roomID: '',
    });
    setFromDate(undefined);
    setToDate(undefined);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValidation()) {
      return;
    }

    if (!datesValidation()) {
      return;
    }

    const newFromDate = moment(fromDate).format('YYYY-MM-DD');
    const newToDate = moment(toDate).format('YYYY-MM-DD');

    try {
      const response = await fetch(
        `https://${apiUrl}/api/booking/createBooking?roomId=${formData.roomID}&guestId=${formData.guestID}&checkIn=${newFromDate}&checkOut=${newToDate}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        toast.success('Booking Created Successfully!', {
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

  const formValidation = () => {
    if (formData.guestID == null || formData.guestID === undefined) {
      toast.error('Please Provide Guest ID For Booking.', {
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

    if (parseInt(formData.guestID) <= 0) {
      toast.error('Invalid Guest ID', {
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

    if (formData.roomID == null || formData.roomID === undefined) {
      toast.error('Please Provide Room ID For Booking.', {
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

    if (parseInt(formData.roomID) <= 0) {
      toast.error('Invalid Guest ID', {
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

  const datesValidation = () => {
    if (fromDate === undefined || fromDate == null) {
      toast.error('Please Select From Date.', {
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
    if (toDate === undefined || toDate == null) {
      toast.error('Please Select To Date.', {
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
      <ToastContainer />
      <section className=" flex flex-row">
        <div className="space-x-4 m-9">
          <h1 className="text-2xl mb-4 ml-3 text-boxdark font-semibold  dark:text-slate-200">
            Create Booking
          </h1>
          <div className="inline">
            <p className="inline text-boxdark dark:text-white mr-2">From: </p>
            <SelectFromDate fromDate={fromDate} setFromDate={setFromDate} />
          </div>
          <div className="inline">
            <p className="inline text-boxdark dark:text-white mr-2">To: </p>
            <SelectToDate toDate={toDate} setToDate={setToDate} />
          </div>
          <div>
            <form
              className="space-y-4 md:space-y-6 mt-10"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="guestID"
                  className="inline mb-2 text-sm font-medium text-gray-900 dark:text-white text-boxdark"
                >
                  Guest ID:
                </label>
                <input
                  type="number"
                  name="guestID"
                  id="guestID"
                  className="bg-gray-50 border border-gray-300 ml-3 text-gray-900 sm:text-sm rounded-md   p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Guest ID"
                  value={formData.guestID}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="roomID"
                  className="inline mb-2 text-sm font-medium text-gray-900 dark:text-white text-boxdark"
                >
                  Room ID:
                </label>
                <input
                  type="number"
                  name="roomID"
                  id="roomID"
                  placeholder="Enter Room ID"
                  className="bg-gray-50 border border-gray-300 ml-3 text-gray-900 sm:text-sm rounded-md  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.roomID}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                style={{ marginTop: '50px' }}
                className=" text-white dark:text-boxdark bg-boxdark dark:bg-green-500 hover:bg-boxdark-2 dark:hover:bg-green-600 font-medium rounded-lg text-md px-5 py-2.5 text-center "
              >
                <b className="text-md">Book Room</b>
              </button>
              <button
                type="reset"
                style={{
                  marginTop: '50px',
                  marginLeft: '13px',
                  width: '100px',
                }}
                onClick={handleReset}
                className=" text-black dark:text-boxdark bg-white  dark:bg-white hover:bg-slate-300 dark:hover:bg-slate-300  font-medium rounded-lg text-md px-5 py-2.5 text-center "
              >
                <b className="text-md">Cancel</b>
              </button>
            </form>
          </div>
        </div>
        <div
          style={{ marginTop: '20px', height: '370px' }}
          className="w-90 bg-white dark:bg-boxdark rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
          <ul className="p-6 mt-1">
            <li>
              <strong className="dark:text-white text-boxdark">
                Instructions:
              </strong>
              &nbsp;
              <ul>
                <br />
                <li>
                  <p className="dark:text-white text-boxdark">
                    1. Ensure all required information is entered accurately:
                    the guest ID, room ID, and the dates for the booking (from
                    and to).
                  </p>
                </li>
                <br />
                <li>
                  <p className="dark:text-white text-boxdark">
                    2. Confirm the room availability for the selected dates to
                    prevent double bookings.
                  </p>
                </li>
                <br />

                <li>
                  <p className="dark:text-white text-boxdark">
                    3. Provide the guest with a booking confirmation and
                    details, including the room ID and the booking period, to
                    avoid any future discrepancies.
                  </p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
