import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BookedDates() {
  const [roomNo, setRoomNo] = useState('');
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;


  const fetchBookedDates = async () => {
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

    try {
      const response = await fetch(`https://${apiUrl}/api/booking/booked-dates/${roomNo}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }
      const dates: string[] = await response.json();
      const sortedDates = dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
      setBookedDates(sortedDates);

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
    <div className="p-3">
      <div className="mb-7 mt-2">
        <Input
          placeholder="Enter Room Number"
          value={roomNo}
          onChange={(e) => setRoomNo(e.target.value)}
          className="w-[350px] inline mr-3 dark:text-black"
        />
        <Button
          className="w-[190px] font-semibold text-md bg-boxdark dark:text-black text-white hover:bg-boxdark-2 dark:bg-green-500 dark:hover:bg-green-700"
          onClick={fetchBookedDates}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Search Booked Dates'}
        </Button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="border p-4 rounded-lg bg-gray-100 dark:bg-boxdark dark:text-white bg-white text-boxdark">
        {bookedDates.length > 0 ? (
          <ul className="list-disc pl-5">
            {bookedDates.map((date, index) => (
              <li key={index} className="mb-2">
                {date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No booked dates available.</p>
        )}
      </div>
    </div>
  );
}
