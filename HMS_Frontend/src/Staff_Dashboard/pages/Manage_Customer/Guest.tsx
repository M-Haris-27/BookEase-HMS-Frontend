import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import RegisterCustomer from './RegisterGuest';
import ChangePassword from './ChangePassword';
import GuestDetail from './GuestTable/GuestDetail';

export default function Guest() {




  return (
    <DefaultLayout>
      <Breadcrumb pageName="Manage Guest" />
      <div className="flex flex-row m-6 bg-slate-200  h-[800px] rounded-lg">
        <RegisterCustomer />
        <ChangePassword />
      </div>
      <div className="flex flex-col m-6 p-10 bg-slate-200  h-[700px] rounded-lg dark:bg-boxdark" >
        <div>
          <h1 className='text-4xl text-black font-bold tracking-tight dark:text-white text-center'>Guest Details</h1>
        </div>
        <GuestDetail />
      </div>
    </DefaultLayout>
  );
}
