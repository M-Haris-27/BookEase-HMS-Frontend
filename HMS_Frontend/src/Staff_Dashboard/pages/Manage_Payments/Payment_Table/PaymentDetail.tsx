import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
import { CaretSortIcon } from '@radix-ui/react-icons';
import 'react-toastify/dist/ReactToastify.css';
import { PaymentDataTable } from './PaymentDataTable';
import { Button } from '@/components/ui/button';

type Invoice = {
  invoiceID: number;
  bookingID: number;
  roomNo: number;
  guestName: string;
  invoiceIssuedDate: Date;
  dueDate: Date;
  totalAmount: number;
  invoiceStatus: string;
};

const PaymentDetail = () => {
  const [data, setData] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://${apiUrl}/api/invoice/getAllInvoices`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (!response.ok) {
          throw new Error('No invoices found.');
        }
        const results = await response.json();
        console.log('Result:  ', results);

        const newData = results.map((result: any) => ({
          invoiceID: result.invoiceID,
          bookingID: result.billing.booking.bookingId,
          roomNo: result.billing.booking.room.roomNo,
          guestName: result.billing.booking.guest.name,
          invoiceIssuedDate: result.issuedDate,
          dueDate: result.dueDate,
          totalAmount: result.totalAmount,
          invoiceStatus: result.invoiceStatus,
        }));

        console.log('New Data: ', newData);
        setData(newData);
      } catch (err) {
        setError('No Invoice found.');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDetails = (bookingId: number) => {
    navigate('/invoicePayment', { state: { bookingId } });
  }

  const columns: ColumnDef<Invoice>[] = [
    {
      accessorKey: 'invoiceID',
      header: 'Invoice ID',
    },
    {
      accessorKey: 'bookingID',
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
      accessorKey: 'guestName',
      header: 'Guest Name',
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
      accessorKey: 'invoiceIssuedDate',
      header: ({ column }) => (
        <div
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Issued Date
          <CaretSortIcon className="ml-2 h-4 w-4 inline" />
        </div>
      ),
    },
    {
      accessorKey: 'dueDate',
      header: ({ column }) => (
        <div
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Due Date
          <CaretSortIcon className="ml-2 h-4 w-4 inline" />
        </div>
      ),
    },
    {
      accessorKey: 'totalAmount',
      header: 'Amount',
    },
    {
      accessorKey: 'invoiceStatus',
      header: ({ column }) => (
        <div
          className={`cursor-pointer`}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <CaretSortIcon className="ml-2 h-4 w-4 inline" />
        </div>
      ),
      cell: ({ getValue }) => {
        const status = getValue<string>();
        const statusClass = status === 'Paid' ? 'bg-green-500' : 'bg-red-600';
        return <div className={`${statusClass} rounded-3xl text-white font-semibold text-center py-2 `}>{status}</div>;
      },
    },
    {
      id: 'PayBill',
      cell: ({ row }) => (
        <Button onClick={() => handleDetails(row.original.bookingID)} className='py-2 px-3 bg-boxdark text-white  dark:bg-slate-100 dark:text-black text-base font-semibold '>See Details</Button>
      ),
    }

  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <PaymentDataTable columns={columns} data={data} />;
};

export default PaymentDetail;
