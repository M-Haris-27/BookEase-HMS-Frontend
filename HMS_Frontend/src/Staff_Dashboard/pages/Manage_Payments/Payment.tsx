import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaymentDetail from './Payment_Table/PaymentDetail';
const Payment = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Payments" />

      <div className="flex flex-col m-6 p-10 bg-slate-50  h-[700px] rounded-lg dark:bg-boxdark" >
        <div>
          <h1 className='text-4xl  text-boxdark tracking-tight font-bold dark:text-white text-center'>Payment Details</h1>
        </div>
        <PaymentDetail />
      </div>

    </DefaultLayout>
  );
};

export default Payment;
