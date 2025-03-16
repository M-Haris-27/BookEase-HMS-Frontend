import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { StaffDataTable } from './StaffDataTable';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Staff = {
  staffID: number;
  name: string;
  email: string;
  password: string;
  role: string;
  phoneNo: string;
  address: string;
  gender: string;
};

const StaffDetail = () => {
  const [data, setData] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://${apiUrl}/staff/getAllStaffDetails`);
        if (!response.ok) {
          throw new Error('Failed to fetch staff details');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError('No staff was found.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    let confirmDelete = confirm(`Are you sure you want to delete the Staff with ID: ${id} `)
    if(!confirmDelete){
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:8080/staff/deleteStaff/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Staff with ID ${id} deleted successfully.`);
        toast.success(`Staff with ID ${id} deleted successfully.`, {
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
        setData((prevData) => prevData.filter((staff) => staff.staffID !== id));
      } else {
        const errorData = await response.text();
        console.error('Failed to delete staff');
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
      console.error('An error occurred while deleting the staff:', error);
      toast.error('An error occurred while deleting the staff.', {
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

  const handleChangeRole = async (id: number) => {
    const newRole = prompt("Enter new role:");
    if (!newRole) return;

    try {
      const response = await fetch(`http://localhost:8080/staff/changeRole/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRole),
      });

      if (response.ok) {
        console.log(`Role of Staff with ID ${id} changed successfully.`);
        toast.success(`Role of Staff with ID ${id} changed successfully.`, {
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
        setData((prevData) =>
          prevData.map((staff) =>
            staff.staffID === id ? { ...staff, role: newRole } : staff
          )
        );
      } else {
        const errorData = await response.text();
        console.error('Failed to change role');
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
      console.error('An error occurred while changing the role:', error);
      toast.error('An error occurred while changing the role.', {
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

  const columns: ColumnDef<Staff>[] = [
    {
      accessorKey: 'staffID',
      header: 'Staff ID',
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
      accessorKey: 'role',
      header: ({ column }) => (
        <div
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Role
          <CaretSortIcon className="ml-2 h-4 w-4 inline" />
        </div>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div>
          <button
            className="px-1 m-1 py-2 w-25 inline bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => handleDelete(row.original.staffID)}
          >
            Delete
          </button>
          <button
            className="px-1 m-1 py-2 mt-2 w-25 bg-blue-500 text-white rounded hover:bg-blue-700 "
            onClick={() => handleChangeRole(row.original.staffID)}
          >
            Change Role
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <StaffDataTable columns={columns} data={data} />;
};

export default StaffDetail;
