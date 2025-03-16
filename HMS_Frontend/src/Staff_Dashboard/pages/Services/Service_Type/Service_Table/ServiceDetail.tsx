import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { ServiceDataTable } from './ServiceDataTable';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateService } from './UpdateService';

type ServiceType = {
  serviceTypeID: number;
  serviceName: string;
  servicePrice: number;
  serviceDescription: string;
};

const ServiceDetail = () => {
  const [data, setData] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://${apiUrl}/api/service/getAllServiceTypes`);
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError('Server Error, No Services found.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (serviceTypeID: number) => {
    let confirmDelete = confirm(`Are you sure you want to delete the Service with ID: ${serviceTypeID} `);
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`https://${apiUrl}/api/service/deleteService/${serviceTypeID}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Service with ID ${serviceTypeID} deleted successfully.`);
        toast.success(`Service with ID ${serviceTypeID} deleted successfully.`, {
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
        setData((prevData) => prevData.filter((service) => service.serviceTypeID !== serviceTypeID));
      } else {
        const errorData = await response.text();
        console.error('Failed to delete service');
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
      console.error('An error occurred while deleting the service:', error);
      toast.error('An error occurred while deleting the service.', {
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



  const columns: ColumnDef<ServiceType>[] = [
    {
      accessorKey: 'serviceTypeID',
      header: 'Service ID',
      cell: info => info.getValue(),
      filterFn: (row, columnId, filterValue) => {
        const rowValue = row.getValue(columnId);
        return String(rowValue).includes(String(filterValue));
      }
    },
    {
        accessorKey: 'serviceName',
        header: ({ column }) => (
            <div
              className="cursor-pointer"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
              Service Name
              <CaretSortIcon className="h-4 w-4 inline" />
            </div>
          )
      },
    {
      accessorKey: 'servicePrice',
      header: ({ column }) => (
        <div
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Service Price
          <CaretSortIcon className="h-4 w-4 inline" />
        </div>
      ),
    },
    {
      accessorKey: 'serviceDescription',
      header: ({ column }) => (
        <div
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Description
          <CaretSortIcon className="h-4 w-4 inline" />
        </div>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          onClick={() => handleDelete(row.original.serviceTypeID)}
        >
          Delete
        </button>
      ),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <UpdateService serviceId = {row.original.serviceTypeID} name = {row.original.serviceName} price = {row.original.servicePrice} description = {row.original.serviceDescription} />
        ),
      }
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <ServiceDataTable columns={columns} data={data} />;
};

export default ServiceDetail;
