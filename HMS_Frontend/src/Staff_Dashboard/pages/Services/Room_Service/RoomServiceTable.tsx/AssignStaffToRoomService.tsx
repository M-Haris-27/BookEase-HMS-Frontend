import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useState, useEffect } from 'react';

// Define the props type
interface RoomServiceProps {
  RoomServiceId: number;
  ServiceTypeName: string;
}

type Staff = {
  staffID: number;
  name: string;
  role: string;
};

export function AssignStaffToRoomService({
  RoomServiceId,
  ServiceTypeName,
}: RoomServiceProps) {
  const [selectedStaff, setSelectedStaff] = useState<number | ''>('');
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://${apiUrl}/staff/getAllStaffDetails`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch Staff');
        }
        const result = await response.json();
        console.log('Staff result:', result);

        if (!Array.isArray(result)) {
          throw new Error('Unexpected response format');
        }

        const newData = result.map((staff: any) => ({
          staffID: staff.staffID,
          name: staff.name,
          role: staff.role,
        }));

        setStaffList(newData);
      } catch (err) {
        setError(`No Staff found: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Selected Staff:', selectedStaff);
  }, [selectedStaff]);

  const handleStatus = async () => {
    if (!selectedStaff) {
      setError('Please select a Staff.');
      return;
    }

    if (selectedStaff <= 0) {
      toast.error(`Invalid Staff Provided.`, {
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

    try {
      const response = await fetch(
        `https://${apiUrl}/api/roomService/assignStaffToRoomService/${RoomServiceId}/${selectedStaff}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.ok) {
        toast.success(
          `Staff with ID ${selectedStaff} is Assigned to Room Service with ID: ${RoomServiceId} `,
          {
            position: 'bottom-right',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Bounce,
          },
        );
      } else {
        const errorText = await response.text();
        console.log(errorText);
        toast.error(errorText, {
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
      console.log('An error occurred: ' + error);
      toast.error('An error occurred: ' + error, {
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStaff(Number(e.target.value));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Dialog>
      <ToastContainer />
      <DialogTrigger asChild>
        <button
          className="w-[150px] px-4 py-2 text-base bg-boxdark hover:bg-boxdark-2 text-white dark:bg-white dark:hover:bg-slate-300 dark:text-black rounded hover
      font-semibold"
        >
          Assign Staff
        </button>
      </DialogTrigger>
      {staffList.length > 0 ? (
        <DialogContent className="sm:max-w-[825px] w-[550px] border-none bg-boxdark text-white dark:bg-slate-100 dark:text-boxdark font-semibold">
          <DialogHeader>
            <DialogTitle className="mb-1">
              Assign Staff To Room Service
            </DialogTitle>
            <DialogDescription className="text-slate-400 dark:text-slate-600">
              Select staff that will fulfil this service.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="RoomServiceId"
                className="w-32 text-slate-300 dark:text-boxdark text-md"
              >
                Room Service ID:
              </Label>
              <Input
                id="RoomServiceId"
                type="number"
                readOnly={true}
                className="col-span-3 text-slate-500 w-80 ml-4 bg-slate-200"
                value={RoomServiceId}
              />

              <Label
                htmlFor="ServiceTypeName"
                className="w-32 text-slate-300 dark:text-boxdark text-md"
              >
                Service Name:
              </Label>
              <Input
                id="ServiceTypeName"
                type="text"
                readOnly={true}
                className="col-span-3 text-slate-500 w-80 ml-4 bg-slate-200"
                value={ServiceTypeName}
              />
              <div className="w-230 mt-4">
                <Label
                  htmlFor="serviceTypeID"
                  className="w-29 text-slate-300 dark:text-boxdark text-md"
                >
                  Select Staff:
                </Label>
                <select
                  name="serviceType"
                  id="serviceTypeID"
                  value={selectedStaff}
                  onChange={handleSelectChange}
                  className="col-span-3 text-boxdark ml-15 py-2 px-4 rounded-md"
                >
                  <option value="">Select Staff</option>
                  {staffList.map((staff) => (
                    <option key={staff.staffID} value={staff.staffID}>
                      {` ${staff.staffID}, ${staff.name}, ${staff.role}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-green-600 hover:bg-green-800  dark:text-white"
              onClick={handleStatus}
            >
              Assign Staff
            </Button>
          </DialogFooter>
        </DialogContent>
      ) : (
        <p>No Staff Available at the moment.</p>
      )}
    </Dialog>
  );
}
