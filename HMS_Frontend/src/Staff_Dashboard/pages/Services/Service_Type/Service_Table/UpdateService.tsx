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
interface UpdateServiceProps {
    serviceId: number;
    name: string;
    price: number;
    description: string;
  }
  
  export function UpdateService({ serviceId, name, price, description }: UpdateServiceProps) {
    const [formData, setFormData] = useState({
      serviceName: name,
      servicePrice: price,
      serviceDescription: description,
    });
    const apiUrl = process.env.REACT_APP_API_URL;


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleUpdate = async () => {
    if (formData.servicePrice <= 0) {
      toast.error('Invalid Service Price', {
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

    if (formData.serviceName.length === 0) {
      toast.error('Please Provide Service Name.', {
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


    if (formData.serviceDescription.length === 0) {
      toast.error('Please Provide Service Description.', {
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
        `https://${apiUrl}/api/service/updateService/${serviceId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        toast.success('Service Updated Successfully.', {
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
          serviceName: formData.serviceName,
          servicePrice: formData.servicePrice,
          serviceDescription: formData.serviceDescription,
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
        <Button className='bg-boxdark text-white hover:bg-boxdark-2 dark:bg-blue-600'>Edit Service</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px] w-[550px] border-none bg-boxdark text-white dark:bg-slate-100 dark:text-boxdark font-semibold">
        <DialogHeader>
          <DialogTitle className=''>Edit Service Type</DialogTitle>
          <DialogDescription className='text-slate-400 dark:text-slate-600'>
            Make changes to the Service here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceName" className="w-29 text-slate-300 dark:text-boxdark">
              Service Name:
            </Label>
            <Input
              id="serviceName"
              onChange={handleChange}
              value={formData.serviceName}
              className="col-span-3 text-black"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="servicePrice" className="w-29 text-slate-300 dark:text-boxdark">
              Service Price:
            </Label>
            <Input
              id="servicePrice"
              type="number"
              onChange={handleChange}
              value={formData.servicePrice}
              className="col-span-3 text-black"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceDescription" className="w-29 text-slate-300 dark:text-boxdark">
              Description:
            </Label>
            <Input
              id="serviceDescription"
              onChange={handleChange}
              value={formData.serviceDescription}
              className="col-span-3 text-black"
            />
          </div>
        </div>
        <DialogFooter>
          <Button className='bg-green-600 hover:bg-green-800  dark:text-white' onClick={handleUpdate}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
