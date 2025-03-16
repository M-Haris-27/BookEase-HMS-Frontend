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

export function DeleteRoomService({ RoomServiceId }: RoomServiceProps) {
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://${apiUrl}/api/roomService/deleteRoomService/${RoomServiceId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response.ok) {
        toast.success(`Room Service with ID: ${RoomServiceId} Deleted Successfully.`, {
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
        <button className="w-[150px] text-base px-4 py-2 text-white bg-red-600 hover:bg-red-800  rounded-md font-semibold">
          Delete Service
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px] w-[550px] border-none bg-boxdark text-white dark:bg-slate-100 dark:text-boxdark font-semibold">
        <DialogHeader>
          <DialogTitle className="">Delete Room Service</DialogTitle>
          <DialogDescription className="text-slate-400 dark:text-slate-600">
          Once you Delete the room service, it will not be restored.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className='text-base'>
            {' '}
            Are You Sure You want to Delete the Room Service With ID: #
            {RoomServiceId} ?{' '}
          </p>
        </div>
        <DialogFooter>
          <Button
            className="bg-red-600 hover:bg-red-800  dark:text-white"
            onClick={handleDelete}
          >
            Delete Service
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
