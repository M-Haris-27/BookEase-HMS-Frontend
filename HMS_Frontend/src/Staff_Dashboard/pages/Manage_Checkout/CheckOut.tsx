import { ToastContainer } from 'react-toastify';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import InitiateCheckOutAndGenerateInvoice from './InitiateCheckOutAndGenerateInvoice';

const CheckOut = () => {
  return (
    <DefaultLayout>
      <ToastContainer/>
      <Breadcrumb pageName="Initiate Check-out" />
      <div className="flex flex-col m-6 p-10 bg-slate-50  max-h-[2000px]  rounded-lg dark:bg-boxdark" >
        <div>
          <h1 className='text-4xl  text-boxdark font-bold tracking-tight dark:text-white text-center'>Inititate Check-out</h1>
        </div>
      <InitiateCheckOutAndGenerateInvoice/>
      </div>
    </DefaultLayout>
  );
};

export default CheckOut;
