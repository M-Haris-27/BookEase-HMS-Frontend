import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { BookingDataTable } from './BookingDataTable';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ExtendCheckOutDate } from './ExtendCheckOutDate';

type Booking = {
  bookingId: number;
  guestName: string;
  guestID: number;
  roomNo: number;
  checkIn: Date;
  checkOut: Date;
  bookingStatus: string;
};

const BookingDetail = () => {
  const [data, setData] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://${apiUrl}/api/booking/getAllBookings`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const result = await response.json();

        // Assuming guest and room are nested objects
        const newData = result.map((booking: any) => ({
          bookingId: booking.bookingId,
          guestID: booking.guest.guestID,
          guestName: booking.guest.name,
          roomNo: booking.room.roomNo,
          checkIn: new Date(booking.checkIn).toLocaleDateString(),
          checkOut: new Date(booking.checkOut).toLocaleDateString(),
          bookingStatus: booking.bookingStatus,
        }));

        console.log('New Data: ', newData);
        setData(newData);
      } catch (err) {
        setError('No Bookings found.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  

  const handleCancel = async (bookingId: number) => {
    let confirmDelete = confirm(
      `Are you sure you want to Cancel the Booking with ID: ${bookingId} `,
    );
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `https://${apiUrl}/api/booking/cancel-booking/${bookingId}`,
        {
          method: 'PATCH',
        },
      );

      if (response.ok) {
        console.log(`Booking ID: ${bookingId} Cancelled successfully.`);
        toast.success(`Booking ID: ${bookingId} Cancelled successfully.`, {
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
        console.error('Failed to Cancel Booking');
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
      console.error('An error occurred while Cancelling the Booking:', error);
      toast.error('An error occurred while deleting the room.', {
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

  const columns: ColumnDef<Booking>[] = [
    {
      accessorKey: 'bookingId',
      header: 'Booking ID',
    },
    {
      accessorKey: 'roomNo',
      header: 'Room No',
      cell: (info) => info.getValue(),
      filterFn: (row, columnId, filterValue) => {
        const rowValue = row.getValue(columnId);
        return String(rowValue).includes(String(filterValue));
      },
    },
    {
      accessorKey: 'guestID',
      header: ({ column }) => (
        <div
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Guest ID:
          <CaretSortIcon className="ml-2 h-4 w-4 inline" />
        </div>
      ),
    },
    {
      accessorKey: 'guestName',
      header: ({ column }) => (
        <div
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Guest Name:
          <CaretSortIcon className="ml-2 h-4 w-4 inline" />
        </div>
      ),
    },
    {
      accessorKey: 'checkIn',
      header: ({}) => <div className="cursor-pointer">Check-In</div>,
    },
    {
      accessorKey: 'checkOut',
      header: ({}) => <div className="cursor-pointer">Check-Out</div>,
    },
    {
      accessorKey: 'bookingStatus',
      header: ({}) => <div className="cursor-pointer">Status</div>,
    },
    {
      id: 'action1',
      cell: ({ row }) => (
        <button
          className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-900 font-semibold"
          onClick={() => handleCancel(row.original.bookingId)}
        >
          Cancel
        </button>
      ),
    },
    {
      id: 'action2',
      cell: ({ row }) => (
        <ExtendCheckOutDate bookingId = {row.original.bookingId}/>
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <BookingDataTable columns={columns} data={data} />;
};

export default BookingDetail;
