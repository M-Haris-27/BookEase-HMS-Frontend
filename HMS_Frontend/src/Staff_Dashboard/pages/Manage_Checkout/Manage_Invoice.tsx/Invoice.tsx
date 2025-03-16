import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Separator } from '@/components/ui/separator';
import { usePDF } from 'react-to-pdf';
import HandlePayment from './HandlePayment';

type Invoice = {
  invoiceID: number;
  billingID: number;
  bookingID: number;
  roomID: number;
  roomNo: number;
  roomType: string;
  pricePerNight: number;
  guestID: number;
  guestName: string;
  checkIn: Date;
  checkOut: Date;
  totalDaysSpent: number;
  billingStatus: string;
  billingDate: Date;
  invoiceIssuedDate: Date;
  dueDate: Date;
  totalAmount: number;
  invoiceStatus: string;
};

type Billing = {
  billingID: number;
};

type RoomService = {
  serviceName: string;
  servicePrice: number;
  serviceStatus: string;
};

function Invoice() {
  const location = useLocation();
  const { bookingId } = location.state || {};
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [billing, setBilling] = useState<Billing>();
  const [roomServices, setRoomServices] = useState<RoomService[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { toPDF, targetRef } = usePDF({ filename: 'Invoice.pdf' });
  const apiUrl = process.env.REACT_APP_API_URL;


  const fetchBilling = async () => {
    try {
      const response = await fetch(
        `https://${apiUrl}/api/billing/generateBill/${bookingId}`,
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
      const data = await response.json();
      const newData = {
        billingID: data.billingID,
      };
      console.log('New Billing Data Invoice: ', newData);
      setBilling(newData);
    } catch (err: any) {
      setError(`${err.message}`);
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
    }
  };

  const initiateCheckOut = async () => {
    try {
      const response = await fetch(
        `https://${apiUrl}/api/booking/initiateCheckOut/${bookingId}`,
        {
          method: 'PATCH',
        },
      );
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchInvoiceAndRoomServices = async () => {
    if (billing?.billingID == null || billing.billingID == undefined) {
      setError('');
      return;
    }

    try {
      const response = await fetch(
        `https://${apiUrl}/api/invoice/generateInvoice/${billing?.billingID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        console.log(response);
        throw new Error('Failed to Generate Invoice');
      }
      const result = await response.json();
      console.log('Result Invoice: ', result);
      const newData: Invoice = {
        invoiceID: result.invoiceID,
        billingID: result.billing.billingID,
        bookingID: result.billing.booking.bookingId,
        roomID: result.billing.booking.room.roomID,
        roomNo: result.billing.booking.room.roomNo,
        roomType: result.billing.booking.room.roomType,
        pricePerNight: result.billing.booking.room.pricePerNight,
        guestID: result.billing.booking.guest.guestID,
        guestName: result.billing.booking.guest.name,
        checkIn: result.billing.booking.checkIn,
        checkOut: result.billing.booking.checkOut,
        totalDaysSpent: result.billing.booking.totalDays,
        billingStatus: result.billing.billingStatus,
        billingDate: result.billing.billingDate,
        invoiceIssuedDate: result.issuedDate,
        dueDate: result.dueDate,
        totalAmount: result.totalAmount,
        invoiceStatus: result.invoiceStatus,
      };
      console.log('New Invoice: ', newData);
      setInvoice(newData);
    } catch (err) {
      console.log('Error: ' , err);
    }

    try {
      const response = await fetch(
        `https://${apiUrl}/api/roomService/getAllRoomServiceByBookingID/${bookingId}`,
      );
      if (!response.ok) {
        throw new Error('No room services found for this booking.');
      }
      const result = await response.json();

      const newData: RoomService[] = result.map((service: any) => ({
        serviceName: service.serviceType.serviceName,
        servicePrice: service.serviceType.servicePrice,
        serviceStatus: service.serviceRoomStatus,
      }));

      setRoomServices(newData);
    } catch (err) {
      console.log(err);
      console.log('No Room Services Ordered.');
    }
  };

  const InitiateCheckOutAndGenerateBilling = async () => {
    await initiateCheckOut();
    await fetchBilling();
  };

  const handleInvoice = async () => {
    setLoading(true);
    await InitiateCheckOutAndGenerateBilling();
    setLoading(false);
    // fetchInvoiceAndRoomServices();
  };

  useEffect(() => {
    if (billing?.billingID) {
      fetchInvoiceAndRoomServices();
    }
  }, [billing]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Invoice" />
      <div className="flex flex-col items-center justify-center text-center">
        
        {invoice == null ? <Button
          onClick={handleInvoice}
          className="w-[200px] mt-5 mb-4 font-semibold py-5 text-base dark:bg-white dark:text-black bg-boxdark text-white hover:bg-boxdark-2"
        >
          Generate Invoice
        </Button>: <></>}
         
        {invoice != null ? (
          <div className="flex flex-row">
            <Button
              onClick={() => toPDF()}
              className="w-[200px] mt-3 mb-4 font-semibold py-5 text-base dark:bg-white dark:text-black dark:hover:bg-slate-300 bg-boxdark text-white hover:bg-boxdark-2"
            >
              Download PDF
            </Button>
            {invoice.invoiceStatus == "Unpaid" ?
            (
            <HandlePayment invoiceID={invoice.invoiceID} />): <></>}
          </div>
        ) : (
          <></>
        )}
        {loading ? <p>Loading..</p> : <></>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      {invoice && (
        <div
          ref={targetRef}
          className="bg-white text-boxdark rounded-lg shadow-lg px-8 py-4 w-187.5 mx-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="text-gray-700 font-semibold text-lg">
                <h1 style={{ color: 'rgb(53 30 169)' }} className="text-3xl">
                  BookEase
                </h1>
                <p className="text-sm text-slate-500 italic">
                  Simplifying Your Stay, Every Step of the Way
                </p>
              </div>
            </div>
            <div className="text-gray-700 mt-7 mb-3">
              <div className="font-bold text-xl">INVOICE</div>
              <div className="text-sm">
                Date: {new Date().toLocaleDateString()}
              </div>
              <div className="text-sm">Invoice #: {invoice.invoiceID}</div>
            </div>
          </div>
          <div className=" border-gray-300 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-4">Invoice Details:</h2>
            <div className="flex justify-between">
              <div>
                <div className="text-gray-700 mb-2">
                  <span className="font-semibold text-slate-600">
                    Guest Name:
                  </span>{' '}
                  {invoice.guestName}
                </div>
                <div className="text-gray-700 mb-2">
                  <span className="font-semibold text-slate-600">Room No:</span>{' '}
                  {invoice.roomNo}
                </div>
                <div className="text-gray-700 mb-2">
                  <span className="font-semibold text-slate-600">
                    Room Type:
                  </span>{' '}
                  {invoice.roomType}
                </div>
                <div className="text-gray-700 mb-2">
                  <span className="font-semibold text-slate-600">
                    Check-In:
                  </span>{' '}
                  {new Date(invoice.checkIn).toLocaleDateString()}
                </div>
                <div className="text-gray-700">
                  <span className="font-semibold text-slate-600">
                    Check-Out:
                  </span>{' '}
                  {new Date(invoice.checkOut).toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="text-gray-700 mb-2">
                  <span className="font-semibold text-slate-600">
                    Price Per Night:
                  </span>{' '}
                  ${invoice.pricePerNight}
                </div>
                <div className="text-gray-700 mb-2">
                  <span className="font-semibold text-slate-600">
                    Total Days Spent:
                  </span>{' '}
                  {invoice.totalDaysSpent}
                </div>
                <div className="text-gray-700 mb-2">
                  <span className="font-semibold text-slate-600">
                    Billing Status:
                  </span>{' '}
                  {invoice.billingStatus}
                </div>
                <div className="text-gray-700 mb-2">
                  <span className="font-semibold text-slate-600">
                    Invoice Status:
                  </span>{' '}
                  {invoice.invoiceStatus}
                </div>
                <div className="text-gray-700">
                  <span className="font-semibold text-slate-600">
                    Due Date:
                  </span>{' '}
                  {new Date(invoice.dueDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Room Services Ordered:</h2>
          </div>
          <Separator style={{ width: '682px' }} className="bg-boxdark mb-5" />

          <table className="w-full text-left mb-8">
            <thead>
              <tr>
                <th className="text-gray-700 font-bold uppercase py-2">
                  Description
                </th>
                <th className="text-gray-700 font-bold uppercase py-2">
                  Status
                </th>
                <th className="text-gray-700 font-bold uppercase py-2">
                  Price
                </th>
                <th className="text-gray-700 font-bold uppercase py-2">
                  Total
                </th>
              </tr>
            </thead>
            {roomServices.length > 0 ? (
              <tbody>
                {roomServices.map((service, index) => (
                  <tr key={index}>
                    <td className="py-4 text-gray-700">
                      {service.serviceName}
                    </td>
                    <td className="py-4 text-gray-700">
                      {service.serviceStatus}
                    </td>
                    <td className="py-4 text-gray-700">
                      ${service.servicePrice.toFixed(2)}
                    </td>
                    <td className="py-4 text-gray-700">
                      ${(service.servicePrice * 1).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <p className="mx-7 italic text-slate-500">No Services Ordered</p>
            )}
          </table>
          <Separator style={{ width: '682px' }} className="bg-boxdark mb-5" />
          <div className="flex justify-end mb-4 mr-5">
            <div className="text-gray-700 mr-2">Subtotal:</div>
            <div className="text-gray-700">
              $
              {roomServices
                .reduce((acc, service) => acc + service.servicePrice * 1, 0)
                .toFixed(2)}
            </div>
          </div>
          <div className="text-right mb-5 mr-5">
            <p className="inline">Tax:</p>
            <p className="inline">$0.00</p>
          </div>
          <div className="flex justify-end mb-8 mr-5">
            <p className="text-lg">
              <strong>Total:</strong>
            </p>
            <div className="text-gray-700 font-bold text-xl ml-1">
              ${invoice.totalAmount}
            </div>
          </div>
          <div className="border-t-2 border-gray-300 pt-8 mb-8">
            <div className="text-gray-700 mb-2">
              Payment is due within 2 days. Late payments are subject to fees.
            </div>
            <div className="text-gray-700 mb-2">Helpline: +923033326622</div>
            <div className="text-gray-700 mb-2">
              Email: fahadzafarmayo123@gmail.com
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}

export default Invoice;
