import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import {  toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ServiceType = {
  serviceTypeID: number;
  serviceName: string;
  servicePrice: number;
  serviceDescription: string;
};

interface Booking {
  bookingId: number;
}

export default function RoomServiceDialog({ bookingId }: Booking) {
  const [selectedServiceType, setSelectedServiceType] = useState<number | ''>(
    '',
  );
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://${apiUrl}/api/service/getAllServiceTypes`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch Service Types');
        }
        const result = await response.json();

        console.log('Fetched result:', result);

        if (!Array.isArray(result)) {
          throw new Error('Unexpected response format');
        }

        setServiceTypes(result);
      } catch (err) {
        setError('No Service Types found.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Selected Service Type:', selectedServiceType);
  }, [selectedServiceType]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedServiceType(Number(e.target.value));
  };

  const handleSubmit = async () => {
    if (!selectedServiceType) {
      setError('Please select a service type.');
      return;
    }

    if(selectedServiceType <= 0){
      toast.error(`Invalid Service Type Provided.`, {
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

    const serviceRoomDTO = {
      bookingId,
      serviceTypeId: selectedServiceType,
    };

    try {
      const response = await fetch(
        `https://${apiUrl}/api/roomService/createRoomService`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(serviceRoomDTO),
        },
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      console.log('Service Room Created:', result);
      toast.success(`Service has been Request for Booking ID: ${bookingId}.`, {
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
    } catch (err) {
      setError(`Failed to create room service: ${err}`);
      toast.error(`${err}`, {
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {serviceTypes.length > 0 ? (
        <DialogContent className="sm:max-w-[825px] w-[550px] border-none bg-boxdark text-white dark:bg-slate-100 dark:text-boxdark font-semibold">
          <DialogHeader>
            <DialogTitle>Assign Room Service</DialogTitle>
            <DialogDescription className="text-slate-400 dark:text-slate-600">
              Make changes to the Service here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="bookingId"
                className="w-29 text-slate-300 dark:text-boxdark text-md"
              >
                Booking ID:
              </Label>
              <Input
                id="bookingId"
                type="number"
                readOnly={true}
                className="col-span-3 text-slate-500 w-70 bg-slate-200"
                value={bookingId}
              />
              <div className="w-90 mt-4">
                <Label
                  htmlFor="serviceTypeID"
                  className="w-29 text-slate-300 dark:text-boxdark text-md"
                >
                  Select Service:
                </Label>
                <select
                  name="serviceType"
                  id="serviceTypeID"
                  value={selectedServiceType}
                  onChange={handleSelectChange}
                  className="col-span-3 text-boxdark ml-5 py-2 px-4 rounded-md"
                >
                  <option value="">Select Service</option>
                  {serviceTypes.map((serviceType) => (
                    <option
                      key={serviceType.serviceTypeID}
                      value={serviceType.serviceTypeID}
                    >
                      {serviceType.serviceName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-800 dark:text-white">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      ) : (
        <p>No Services Available at the moment.</p>
      )}
    </div>
  );
}
