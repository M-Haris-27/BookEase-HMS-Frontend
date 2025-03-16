import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Separator } from '@/components/ui/separator';
import RoomServiceDialog from './RoomServiceDialog';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

type Booking = {
  bookingId: number;
  roomId: number;
  roomNo: number;
  guestName: string;
  checkIn: string;
  checkOut: string;
  roomPricePerNight: number;
  bookingStatus: string;
};

export default function OrderRoomService() {
  const [roomNo, setRoomNo] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inputFilter, setInputFilter] = useState('');
  const [filteredBooking, setFilteredBooking] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;


  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputFilter(value);
    const filtered = bookings.filter((bookings) =>
      bookings.guestName.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredBooking(filtered);
    if (filteredBooking.length <= 0) {
      setError('No bookings matches this filter');
    } else {
      setError('');
    }
  };

  const fetchBookings = async () => {
    if (!roomNo) {
      toast.error('Please enter a room number.', {
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
    setBookings([]);
    setFilteredBooking([]);

    try {
      const response = await fetch(
        `https://${apiUrl}/api/booking/getBookingsOfRoom/${roomNo}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }
      const data: Booking[] = await response.json();
      console.log(data);
      const newData = data.map((booking: any) => ({
        bookingId: booking.bookingId,
        guestID: booking.guest.guestID,
        roomId: booking.room.roomID,
        roomPricePerNight: booking.room.pricePerNight,
        guestName: booking.guest.name,
        roomNo: booking.room.roomNo,
        checkIn: new Date(booking.checkIn).toLocaleDateString(),
        checkOut: new Date(booking.checkOut).toLocaleDateString(),
        bookingStatus: booking.bookingStatus,
      }));

      const filteredBookings = newData.filter(
        (booking) => booking.bookingStatus !== 'CANCELLED',
      );
      setBookings(filteredBookings);
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
      <ToastContainer />
      <section>
        <div className="flex flex-row justify-center align-middle mt-10">
          <Input
            placeholder="Enter Room Number"
            value={roomNo}
            onChange={(e) => setRoomNo(e.target.value)}
            className="w-[350px] inline mr-3 dark:text-black"
          />
          <Button
            className="w-[170px] font-semibold text-md bg-boxdark dark:text-black text-white hover:bg-boxdark-2 dark:bg-green-500 dark:hover:bg-green-700"
            onClick={fetchBookings}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Search Bookings'}
          </Button>
        </div>

        <Separator className="mt-12 bg-slate-300 dark:bg-slate-500 " />

        {bookings.length > 0 || filteredBooking.length > 0 ? (
          <div>
            <Input
              placeholder="Filter by Guest Name"
              type="text"
              value={inputFilter}
              onChange={handleFilterChange}
              className="max-w-sm mt-10 ml-10 text-black inline"
            />
            {error.length > 0 && inputFilter.length > 0 ? (
              <p className="inline ml-4 text-red-700">{error}</p>
            ) : (
              <p></p>
            )}
          </div>
        ) : (
          <></>
        )}

        <div className="flex flex-row justify-between flex-wrap">
          {filteredBooking.length > 0 && inputFilter.length > 0 ? (
            filteredBooking.map((booking) => (
              <div
                key={booking.bookingId}
                style={{ marginTop: '30px', maxHeight: '650px' }}
                className="w-[400px] ml-2 transform transition duration-300 hover:scale-105 border-solid border-2 border-slate-300 dark:bg-slate-200 bg-slate-100 text-boxdark rounded-lg shadow-2xl dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700"
              >
                <ul className="p-6 mt-4">
                  <li key={booking.bookingId} className="mb-4 flex flex-col">
                    <h1 className="text-2xl mb-6">
                      <svg
                        className="fill-current inline mr-3"
                        width="30"
                        height="30"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_130_9756)">
                          <path
                            d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V15.8021C0.506348 16.7584 1.29385 17.574 2.27822 17.574H15.7782C16.7345 17.574 17.5501 16.7865 17.5501 15.8021V2.3021C17.522 1.34585 16.7063 0.55835 15.7501 0.55835ZM6.69385 10.599V6.4646H11.3063V10.5709H6.69385V10.599ZM11.3063 11.8646V16.3083H6.69385V11.8646H11.3063ZM1.77197 6.4646H5.45635V10.5709H1.77197V6.4646ZM12.572 6.4646H16.2563V10.5709H12.572V6.4646ZM2.2501 1.82397H15.7501C16.0313 1.82397 16.2563 2.04897 16.2563 2.33022V5.2271H1.77197V2.3021C1.77197 2.02085 1.96885 1.82397 2.2501 1.82397ZM1.77197 15.8021V11.8646H5.45635V16.3083H2.2501C1.96885 16.3083 1.77197 16.0834 1.77197 15.8021ZM15.7501 16.3083H12.572V11.8646H16.2563V15.8021C16.2563 16.0834 16.0313 16.3083 15.7501 16.3083Z"
                            fill=""
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_130_9756">
                            <rect
                              width="18"
                              height="18"
                              fill="white"
                              transform="translate(0 0.052124)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <strong className=" text-boxdark">
                        Booking ID: #{booking.bookingId}
                      </strong>
                    </h1>
                    <Separator className="mt-2 bg-slate-500" />
                    <ul className="list-none ml-0">
                      <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                        <p className="mr-3 font-semibold inline">Room ID: </p>{' '}
                        <p className="inline ">{booking.roomId}</p>
                      </li>
                      <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                        <p className="mr-3 font-semibold inline">Room No: </p>{' '}
                        <p className="inline ">{booking.roomNo}</p>
                      </li>
                      <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                        <p className="mr-3 font-semibold inline">
                          Guest Name:{' '}
                        </p>{' '}
                        <p className="inline ">{booking.guestName}</p>
                      </li>
                      <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                        <p className="mr-3 font-semibold inline">Check-In: </p>{' '}
                        <p className="inline ">{booking.checkIn}</p>
                      </li>
                      <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                        <p className="mr-3 font-semibold inline">Check-Out: </p>{' '}
                        <p className="inline ">{booking.checkOut}</p>
                      </li>
                      <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                        <p className="mr-3 font-semibold inline">
                          Price Per Night:{' '}
                        </p>{' '}
                        <p className="inline ">${booking.roomPricePerNight}</p>
                      </li>
                      <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                        <p className="mr-3 font-semibold inline">
                          Booking Status:{' '}
                        </p>{' '}
                        <p className="inline ">{booking.bookingStatus}</p>
                      </li>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-[200px] mt-5 font-semibold py-5 text-base bg-boxdark text-white hover:bg-boxdark-2 ">
                            Assign Room Service
                          </Button>
                        </DialogTrigger>
                        <RoomServiceDialog bookingId={booking.bookingId} />
                      </Dialog>
                    </ul>
                  </li>
                </ul>
              </div>
            ))
          ) : bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking.bookingId}
                style={{ marginTop: '30px', maxHeight: '600px' }}
                className="w-[400px] ml-10 transform transition duration-300 hover:scale-105 border-solid border-2 border-slate-300 dark:bg-slate-200 bg-slate-100 text-boxdark rounded-lg shadow-2xl dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700"
              >
                <ul className="p-6 mt-4">
                  <li key={booking.bookingId} className="mb-4 flex flex-col">
                    <h1 className="text-2xl mb-6">
                      <svg
                        className="fill-current inline mr-3"
                        width="30"
                        height="30"
                        viewBox="0 0 18 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_130_9756)">
                          <path
                            d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V15.8021C0.506348 16.7584 1.29385 17.574 2.27822 17.574H15.7782C16.7345 17.574 17.5501 16.7865 17.5501 15.8021V2.3021C17.522 1.34585 16.7063 0.55835 15.7501 0.55835ZM6.69385 10.599V6.4646H11.3063V10.5709H6.69385V10.599ZM11.3063 11.8646V16.3083H6.69385V11.8646H11.3063ZM1.77197 6.4646H5.45635V10.5709H1.77197V6.4646ZM12.572 6.4646H16.2563V10.5709H12.572V6.4646ZM2.2501 1.82397H15.7501C16.0313 1.82397 16.2563 2.04897 16.2563 2.33022V5.2271H1.77197V2.3021C1.77197 2.02085 1.96885 1.82397 2.2501 1.82397ZM1.77197 15.8021V11.8646H5.45635V16.3083H2.2501C1.96885 16.3083 1.77197 16.0834 1.77197 15.8021ZM15.7501 16.3083H12.572V11.8646H16.2563V15.8021C16.2563 16.0834 16.0313 16.3083 15.7501 16.3083Z"
                            fill=""
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_130_9756">
                            <rect
                              width="18"
                              height="18"
                              fill="white"
                              transform="translate(0 0.052124)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <strong className=" text-boxdark">
                        Booking ID: #{booking.bookingId}
                      </strong>
                    </h1>
                    <Separator className="mt-1 bg-slate-500" />
                    <ul className="list-none ml-0">
                      <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                        <p className="mr-3 font-semibold inline">Room ID: </p>{' '}
                        <p className="inline ">{booking.roomId}</p>
                      </li>
                      <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                        <p className="mr-3 font-semibold inline">Room No: </p>{' '}
                        <p className="inline ">{booking.roomNo}</p>
                      </li>
                      <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                        <p className="mr-3 font-semibold inline">
                          Guest Name:{' '}
                        </p>{' '}
                        <p className="inline ">{booking.guestName}</p>
                      </li>
                      <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                        <p className="mr-3 font-semibold inline">Check-In: </p>{' '}
                        <p className="inline ">{booking.checkIn}</p>
                      </li>
                      <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                        <p className="mr-3 font-semibold inline">Check-Out: </p>{' '}
                        <p className="inline ">{booking.checkOut}</p>
                      </li>
                      <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                        <p className="mr-3 font-semibold inline">
                          Price Per Night:{' '}
                        </p>{' '}
                        <p className="inline ">${booking.roomPricePerNight}</p>
                      </li>
                      <li className="text-md mt-3 text-boxdark dark:text-boxdark">
                        <p className="mr-3 font-semibold inline">
                          Booking Status:{' '}
                        </p>{' '}
                        <p className="inline ">{booking.bookingStatus}</p>
                      </li>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-[200px] mt-5 font-semibold py-5 text-base bg-boxdark text-white hover:bg-boxdark-2 ">
                            Assign Room Service
                          </Button>
                        </DialogTrigger>
                        <RoomServiceDialog bookingId={booking.bookingId} />
                      </Dialog>
                    </ul>
                  </li>
                </ul>
              </div>
            ))
          ) : !roomNo ? (
            <p className="text-lg  dark:text-white text-boxdark mx-100 mt-10">
              No Bookings Searched
            </p>
          ) : (
            <p className="text-lg  dark:text-white text-boxdark mx-100 mt-10">
              No Bookings Available
            </p>
          )}
        </div>
      </section>
    </>
  );
}
