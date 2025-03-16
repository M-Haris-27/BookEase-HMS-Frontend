import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

interface Booking {
  bookingId: number;
}

export default function CheckOutDialog({ bookingId }: Booking) {
  const navigate = useNavigate();

  const handleCheckOut = () => {
    navigate('/invoice', { state: { bookingId } });
  };

  return (
    <div>
      <DialogContent className="sm:max-w-[825px] w-[550px] border-none bg-boxdark text-white dark:bg-slate-100 dark:text-boxdark font-semibold">
        <DialogHeader>
          <DialogTitle>Initiate Check-Out</DialogTitle>
          <DialogDescription className="text-slate-400 dark:text-slate-600">
            Once uou initiate check-out, the Invoice will be generated and then
            you can proceed to payments.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-slate-200 text-base dark:text-boxdark">
            Are you sure you want to proceed to check-out?
          </p>
        </div>
        <DialogFooter>
          <Button
            onClick={handleCheckOut}
            className="bg-green-600 hover:bg-green-800 dark:text-white"
          >
            Confirm Check-Out
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
}
