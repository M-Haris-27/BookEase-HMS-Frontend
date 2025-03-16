import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { PaymentCard } from './PaymentCard';
import { ToastContainer } from 'react-toastify';

interface invoiceProp {
  invoiceID: number;
}

export default function HandlePayment({ invoiceID }: invoiceProp) {
  return (
    <>
      <ToastContainer />
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="w-[220px] mt-3 mb-4 font-semibold py-5 text-base ml-3 bg-green-600 hover:bg-green-800 text-white">
            Proceed To Payment
          </Button>
        </DrawerTrigger>
        <DrawerContent className="dark:bg-boxdark-2 dark:text-white bg-white text-boxdark max-h-150">
          <div className="mx-auto my-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className='text-lg'>Make Payment</DrawerTitle>
              <DrawerDescription className="dark:text-slate-300 text-slate-600 ">
                Cash Payment / Online Payment
              </DrawerDescription>
            </DrawerHeader>
            {/* Importing Payment Form  */}
            <PaymentCard invoiceID={invoiceID} />
            <DrawerFooter>
              <DrawerClose asChild>
                <Button className="w-full mt-1 ml-2 mb-4 font-semibold py-5 text-base bg-boxdark hover:bg-boxdark-2 dark:bg-red-500 dark:hover:bg-red-600 text-white">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
