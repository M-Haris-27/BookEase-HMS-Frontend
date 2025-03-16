import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import GenerateBillForBooking from './GenerateBillForBooking';

const Billing = () => {
  return (
    <DefaultLayout>
    <Breadcrumb pageName="Billing" />
    <div className="flex flex-col m-6 p-10 bg-slate-50  max-h-[2000px]  rounded-lg dark:bg-boxdark" >
      <div>
        <h1 className='text-4xl  text-boxdark font-bold tracking-tight dark:text-white text-center'>Generate Bills</h1>
      </div>
    <GenerateBillForBooking/>
    </div>
  </DefaultLayout>
  );
};

export default Billing;
