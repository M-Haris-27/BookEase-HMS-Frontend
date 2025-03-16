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
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';

// Define the props type
interface ExtendCheckOutDateProps {
    bookingId : number
  }
  
  export function ExtendCheckOutDate({ bookingId }: ExtendCheckOutDateProps) {
    const [formData, setFormData] = useState({
        totalDays: 0
    });
  const apiUrl = process.env.REACT_APP_API_URL;


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  
  const handleSubmit = async () => {
    if (formData.totalDays <= 0) {
      toast.error('Extended Days should be greater than zero.', {
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
        `https://${apiUrl}/api/booking/extend-checkout-date/${bookingId}?extendDays=${formData.totalDays}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          
        },
      );

      if (response.ok) {
        toast.success('Booking Extended Successfully.', {
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
        setFormData({
          totalDays: 0
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
        <Button className='bg-boxdark text-white hover:bg-boxdark-2 dark:bg-white dark:text-black dark:hover:bg-slate-300 font-semibold'>Extend Booking</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px] w-[550px] border-none bg-boxdark text-white dark:bg-slate-100 dark:text-boxdark font-semibold">
        <DialogHeader>
          <DialogTitle className=''>Extend Booking</DialogTitle>
          <DialogDescription className='text-slate-400 dark:text-slate-600'>
            Make changes to the Booking here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="servicePrice" className="w-29 text-slate-300 dark:text-boxdark">
              Days To Extend:
            </Label>
            <Input
              id="totalDays"
              type="number"
              onChange={handleChange}
              value={formData.totalDays}
              className="col-span-3 text-black"
            />
          </div>
        </div>
        <DialogFooter>
          <Button className='bg-green-600 hover:bg-green-800  dark:text-white' onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
