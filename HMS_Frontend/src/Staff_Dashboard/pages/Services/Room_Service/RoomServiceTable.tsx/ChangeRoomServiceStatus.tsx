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
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';

// Define the props type
interface RoomServiceProps {
  RoomServiceId: number;
}

export function ChangeRoomServiceStatus({ RoomServiceId }: RoomServiceProps) {
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleStatus = async () => {
    try {
      const response = await fetch(
        `https://${apiUrl}/api/roomService/roomServiceCompleted/${RoomServiceId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.ok) {
        toast.success(
          `Status is Changed To Completed of Room Service with ID: ${RoomServiceId} `,
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

  return (
    <Dialog>
      <ToastContainer />
      <DialogTrigger asChild>
        <button
          className="w-[150px] text-base  px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded hover
      font-semibold"
        >
          Change Status
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px] w-[550px] border-none bg-boxdark text-white dark:bg-slate-100 dark:text-boxdark font-semibold">
        <DialogHeader>
          <DialogTitle className="mb-3">Change Room Service Status</DialogTitle>
          <DialogDescription className="text-slate-400 dark:text-slate-600">
            If the Staff has Completed his Assignment, then the Room Service
            Status will be set to "Completed". If no Staff was assigned then the
            it cannot be set to "Completed" Status.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-base">
            {' '}
            Are You Sure You want to Change the Status of the Room Service With
            ID: #{RoomServiceId} ?{' '}
          </p>
        </div>
        <DialogFooter>
          <Button
            className="bg-green-600 hover:bg-green-800  dark:text-white"
            onClick={handleStatus}
          >
            Change Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
