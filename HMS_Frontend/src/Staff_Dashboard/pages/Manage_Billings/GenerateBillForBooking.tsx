import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Separator } from '@/components/ui/separator';

type Room = {
  roomID: number;
  roomNo: number;
  roomType: string;
  roomStatus: string;
  roomDescription: string;
  pricePerNight: number;
};

type Guest = {
  guestID: number;
  name: string;
  email: string;
  password: string;
  phoneNo: string;
  address: string;
  gender: string;
};

type Booking = {
  bookingId: number;
  room: Room;
  guest: Guest;
  checkIn: string;
  checkOut: string;
  totalDays: number;
  bookingStatus: string;
};

type Billing = {
  billingID: number;
  booking: Booking;
  totalDue: number;
  billingStatus: string;
  billingDate: string;
};

export default function GenerateBillForBooking() {
  const [bookingID, setBookingID] = useState('');
  const [billing, setBilling] = useState<Billing | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;


  const fetchBilling = async () => {
    if (!bookingID) {
      toast.error('Please enter a booking ID.', {
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

    setLoading(true);
    setError('');
    setBilling(null);

    try {
      const response = await fetch(
        `https://${apiUrl}/api/billing/generateBill/${bookingID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }
      const data: Billing = await response.json();
      setBilling(data);
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message, {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section>
        <div className="flex flex-row justify-center align-middle mt-10">
          <Input
            placeholder="Enter Booking ID"
            value={bookingID}
            onChange={(e) => setBookingID(e.target.value)}
            className="w-[350px] inline mr-3 dark:text-black"
          />
          <Button
            className="w-[170px] font-semibold text-md bg-boxdark dark:text-black text-white hover:bg-boxdark-2 dark:bg-green-500 dark:hover:bg-green-700"
            onClick={fetchBilling}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Generate Bill'}
          </Button>
        </div>

        <Separator className="mt-12 bg-slate-300 dark:bg-slate-500 " />

        {billing ? (
          <div className="w-full flex justify-center items-center">
            <div
              style={{ marginTop: '30px' }}
              className="w-full max-w-screen-lg ml-10"
            >
              <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 md:p-12 flex flex-col md:flex-row">
                <div className="md:w-1/2 pr-8">
                  <div className="w-70 flex flex-row space-x-3 h-10">
                    <svg
                      className="fill-current"
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Money_Bill">
                        <g>
                          <path d="M19.44,5.78H4.56a2.507,2.507,0,0,0-2.5,2.5v7.44a2.514,2.514,0,0,0,2.5,2.5H19.44a2.507,2.507,0,0,0,2.5-2.5V8.28A2.5,2.5,0,0,0,19.44,5.78ZM3.06,8.28a1.5,1.5,0,0,1,1.5-1.5H6.04A3.521,3.521,0,0,1,3.06,9.76Zm1.5,8.94a1.511,1.511,0,0,1-1.5-1.5V14.24a3.521,3.521,0,0,1,2.98,2.98Zm16.38-1.5a1.5,1.5,0,0,1-1.5,1.5H17.96a3.521,3.521,0,0,1,2.98-2.98Zm0-2.49a4.528,4.528,0,0,0-3.99,3.99H7.05a4.528,4.528,0,0,0-3.99-3.99V10.77A4.528,4.528,0,0,0,7.05,6.78h9.9a4.528,4.528,0,0,0,3.99,3.99Zm0-3.47a3.521,3.521,0,0,1-2.98-2.98h1.48a1.5,1.5,0,0,1,1.5,1.5Z"></path>
                          <circle cx="12.002" cy="11.998" r="2"></circle>
                        </g>
                      </g>
                    </svg>
                    <h1 className="text-2xl mb-6 text-boxdark inline">
                      Billing Information
                    </h1>
                  </div>
                  <Separator className="bg-slate-500 w-200" />
                  <ul className="list-none">
                    <li className="text-md mt-6 text-boxdark dark:text-boxdark">
                      <p className="font-semibold inline">Billing ID:</p>
                      <p className="inline">#{billing.billingID}</p>
                    </li>
                    <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                      <p className="font-semibold inline">Booking ID:</p>
                      <p className="inline">{billing.booking.bookingId}</p>
                    </li>
                    <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                      <p className="font-semibold inline">Room No:</p>
                      <p className="inline">{billing.booking.room.roomNo}</p>
                    </li>
                    <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                      <p className="font-semibold inline">Guest Name:</p>
                      <p className="inline">{billing.booking.guest.name}</p>
                    </li>
                    <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                      <p className="font-semibold inline">Check-In:</p>
                      <p className="inline">
                        {new Date(billing.booking.checkIn).toLocaleDateString()}
                      </p>
                    </li>
                    <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                      <p className="font-semibold inline">Check-Out:</p>
                      <p className="inline">
                        {new Date(
                          billing.booking.checkOut,
                        ).toLocaleDateString()}
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/2">
                  <ul className="list-none">
                  <li className="text-md mt-16 text-boxdark dark:text-boxdark">
                      <p className="font-semibold inline">Price Per Night:</p>
                      <p className="inline">${billing.booking.room.pricePerNight}</p>
                    </li>

                    <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                      <p className="font-semibold inline">Room Type:</p>
                      <p className="inline">${billing.booking.room.roomType}</p>
                    </li>

                    <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                      <p className="font-semibold inline">Total Days Spent:</p>
                      <p className="inline">${billing.booking.totalDays}</p>
                    </li>

                    <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                      <p className="font-semibold inline">Total Due:</p>
                      <p className="inline">${billing.totalDue}</p>
                    </li>
                    <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                      <p className="font-semibold inline">Billing Status:</p>
                      <p className="inline">{billing.billingStatus}</p>
                    </li>
                    <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                      <p className="font-semibold inline">Billing Date:</p>
                      <p className="inline">
                        {new Date(billing.billingDate).toLocaleDateString()}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>{error}</p>
        )}
      </section>
    </>
  );
}
