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

export function CancelRoomService({ RoomServiceId }: RoomServiceProps) {
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleCancel = async () => {
    try {
      const response = await fetch(
        `https://${apiUrl}/roomService/cancelRoomService/${RoomServiceId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.ok) {
        toast.success(`Room Service with ID: ${RoomServiceId} Cancelled Successfully.`, {
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
        <button className="w-[150px] text-base px-4 py-2 text-white bg-yellow-600 hover:bg-yellow-800  rounded-md font-semibold">
          Cancel Service
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px] w-[550px] border-none bg-boxdark text-white dark:bg-slate-100 dark:text-boxdark font-semibold">
        <DialogHeader>
          <DialogTitle className="">Cancel Room Service</DialogTitle>
          <DialogDescription className="text-slate-400 dark:text-slate-600">
          Once you cancel the room service, it will not be restored.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className='text-base'>
            {' '}
            Are You Sure You want to Cancel the Room Service With ID: #
            {RoomServiceId} ?{' '}
          </p>
        </div>
        <DialogFooter>
          <Button
            className="bg-green-600 hover:bg-green-800  dark:text-white"
            onClick={handleCancel}
          >
            Cancel Service
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
