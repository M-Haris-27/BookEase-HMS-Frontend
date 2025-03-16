import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import AddServiceType from './AddServiceType';
import ServiceDetail from './Service_Table/ServiceDetail';

const ServiceType = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Service Types" />
      <div className='flex align-middle justify-center m-6 bg-slate-50 dark:bg-boxdark h-[550px] rounded-lg'>       
        <AddServiceType/>
      </div>
      <div className="flex flex-col m-6 p-10 bg-slate-50  h-[700px] rounded-lg dark:bg-boxdark" >
        <div>
          <h1 className='text-4xl  text-boxdark font-bold tracking-tight dark:text-white text-center'>Service Details</h1>
        </div>
        <ServiceDetail />
      </div>
    </DefaultLayout>
  );
};

export default ServiceType;
