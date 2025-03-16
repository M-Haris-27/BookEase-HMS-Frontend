import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { RoomServiceDataTable } from './RoomServiceDataTable';
import { CaretSortIcon } from '@radix-ui/react-icons';
import 'react-toastify/dist/ReactToastify.css';
import { CancelRoomService } from './CancelRoomService';
import { ChangeRoomServiceStatus } from './ChangeRoomServiceStatus';
import { AssignStaffToRoomService } from './AssignStaffToRoomService';
import { DeleteRoomService } from './DeleteRoomService';

type RoomService = {
  serviceRoomId: number;
  bookingId: number;
  serviceTypeId: number;
  serviceTypeName: string;
  staffId: number | null;
  staffName: string | null;
  staffRole: string | null;
  serviceRoomDate: Date;
  serviceRoomStatus: string;
  roomNo: number;
  checkIn: Date;
  checkOut: Date;
};

const RoomServiceDetail = () => {
  const [data, setData] = useState<RoomService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://${apiUrl}/api/roomService/getAllRoomService`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            
          },
        );
        if (!response.ok) {
          throw new Error('Failed to fetch room services');
        }
        const result = await response.json();
        console.log('Result:  ', result);

        const newData = result.map((service: any) => ({
          serviceRoomId: service.serviceRoomId,
          bookingId: service.booking.bookingId,
          serviceTypeId: service.serviceType.serviceTypeID, // Corrected accessor
          serviceTypeName: service.serviceType.serviceName, // Corrected accessor
          staffId: service.staff ? service.staff.staffID : null, // Handling null staff
          staffName: service.staff ? service.staff.name : null, // Handling null staff
          staffRole: service.staff ? service.staff.role : null, // Handling null staff
          serviceRoomDate: new Date(service.serviceRoomDate).toLocaleDateString(),
          serviceRoomStatus: service.serviceRoomStatus,
          roomNo: service.booking.room.roomNo,
          checkIn: new Date(service.booking.checkIn).toLocaleDateString(),
          checkOut: new Date(service.booking.checkOut).toLocaleDateString(),
        }));

        console.log('New Data: ', newData);
        setData(newData);
      } catch (err) {
        setError('No Room Services found.');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  



  const columns: ColumnDef<RoomService>[] = [
    {
      accessorKey: 'serviceRoomId',
      header: 'Service ID',
    },
    {
      accessorKey: 'bookingId',
      header: ({ column }) => (
        <div
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Booking ID
          <CaretSortIcon className="ml-2 h-4 w-4 inline" />
        </div>
      ),
    },
    {
      accessorKey: 'serviceTypeName',
      header: 'Service Name',
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
      accessorKey: 'checkIn',
      header: 'Check-In',
    },
    {
      accessorKey: 'checkOut',
      header: 'Check-Out',
    },
    {
      accessorKey: 'staffName',
      header: 'Staff Name',
    },
    {
      accessorKey: 'serviceRoomDate',
      header: ({ column }) => (
        <div
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Ordered Date
          <CaretSortIcon className="ml-2 h-4 w-4 inline" />
        </div>
      )
    },
    {
      accessorKey: 'serviceRoomStatus',
      header: 'Status',
    },
    {
      id: 'Cancel',
      cell: ({ row }) => (
        <CancelRoomService RoomServiceId={row.original.serviceRoomId}/>
      ),
    },
    {
      id: 'ChangeStatus',
      cell: ({ row }) => (
        <ChangeRoomServiceStatus RoomServiceId={row.original.serviceRoomId}/>
      ),
    },
    {
      id: 'AssignStaff',
      cell: ({ row }) => (
        <AssignStaffToRoomService RoomServiceId={row.original.serviceRoomId} ServiceTypeName = {row.original.serviceTypeName} />
      ),
    },
    {
      id: 'DeleteRoomService',
      cell: ({ row }) => (
        <DeleteRoomService RoomServiceId={row.original.serviceRoomId}/>
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <RoomServiceDataTable columns={columns} data={data} />;
};

export default RoomServiceDetail;
