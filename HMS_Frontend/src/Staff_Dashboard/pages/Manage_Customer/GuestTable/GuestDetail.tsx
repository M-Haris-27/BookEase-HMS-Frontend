import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableDemo } from './GuestDataTable';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Guest = {
  guestID: number;
  name: string;
  email: string;
  phoneNo: string;
  address: string;
  gender: string;
};

const GuestDetail = () => {
  const [data, setData] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://${apiUrl}/guest/getAllGuestDetails`);
        if (!response.ok) {
          throw new Error('Failed to fetch guests');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError('No guest was Found.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    let confirmDelete = confirm(`Are you sure you want to delete the Guest with ID: ${id} `)
    if(!confirmDelete){

      return;
    }
    
    try {
      const response = await fetch(`http://localhost:8080/guest/deleteGuest/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Guest with ID ${id} deleted successfully.`);
        toast.success(`Guest with ID ${id} deleted successfully.`, {
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
        // Remove the deleted guest from the state
        setData((prevData) => prevData.filter((guest) => guest.guestID !== id));
      } else {
        const errorData = await response.text();
        console.error('Failed to delete guest');
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
      console.error('An error occurred while deleting the guest:', error);
      toast.error('An error occurred while deleting the guest.', {
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

  const columns: ColumnDef<Guest>[] = [
    {
      accessorKey: 'guestID',
      header: 'Guest ID',
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <div
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4 inline" />
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <div
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <CaretSortIcon className="ml-2 h-4 w-4 inline" />
        </div>
      ),
    },
    {
      accessorKey: 'phoneNo',
      header: ({ column }) => (
        <div
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Phone No
          <CaretSortIcon className="ml-2 h-4 w-4 inline" />
        </div>
      ),
    },
    {
      accessorKey: 'address',
      header: ({ column }) => (
        <div
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Address
          <CaretSortIcon className="ml-2 h-3 w-3 inline" />
        </div>
      ),
    },
    {
      accessorKey: 'gender',
      header: ({ column }) => (
        <div
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Gender
          <CaretSortIcon className="ml-2 h-4 w-4 inline" />
        </div>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          onClick={() => handleDelete(row.original.guestID)}
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

  return <DataTableDemo columns={columns} data={data} />;
};

export default GuestDetail;
