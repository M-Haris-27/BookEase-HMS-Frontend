import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { RoomDataTable } from './RoomDataTable';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Room = {
  roomID: number;
  roomNo: number;
  roomType: string;
  roomStatus: string;
  roomDescription: string;
};

const RoomDetail = () => {
  const [data, setData] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://${apiUrl}/room/getAllRooms`);
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError('No rooms found.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (roomNo: number) => {
    let confirmDelete = confirm(`Are you sure you want to delete the Room with number: ${roomNo} `);
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/room/deleteRoom/${roomNo}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Room with number ${roomNo} deleted successfully.`);
        toast.success(`Room with number ${roomNo} deleted successfully.`, {
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
        // Remove the deleted room from the state
        setData((prevData) => prevData.filter((room) => room.roomNo !== roomNo));
      } else {
        const errorData = await response.text();
        console.error('Failed to delete room');
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
      console.error('An error occurred while deleting the room:', error);
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

  const columns: ColumnDef<Room>[] = [
    {
      accessorKey: 'roomID',
      header: 'Room ID',
    },
    {
        accessorKey: 'roomNo',
        header: 'Room No',
        cell: info => info.getValue(),
        filterFn: (row, columnId, filterValue) => {
          const rowValue = row.getValue(columnId);
          return String(rowValue).includes(String(filterValue));
        }
      },
    {
      accessorKey: 'roomType',
      header: ({ column }) => (
        <div
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Room Type
          <CaretSortIcon className="ml-2 h-4 w-4 inline" />
        </div>
      ),
    },
    {
      accessorKey: 'roomStatus',
      header: ({ column }) => (
        <div
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Room Status
          <CaretSortIcon className="ml-2 h-4 w-4 inline" />
        </div>
      ),
    },
    {
      accessorKey: 'roomDescription',
      header: ({  }) => (
        <div
          className="cursor-pointer"
        >
          Room Description
        </div>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          onClick={() => handleDelete(row.original.roomNo)}
        >
          Delete
        </button>
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <RoomDataTable columns={columns} data={data} />;
};

export default RoomDetail;
