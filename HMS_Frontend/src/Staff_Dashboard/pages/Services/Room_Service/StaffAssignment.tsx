import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import RoomServiceDetail from './RoomServiceTable.tsx/RoomServiceDetail';

const StaffAssignment = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Room Services" />
      <div className="flex flex-col m-6 p-10 bg-slate-50  max-h-[2000px]  rounded-lg dark:bg-boxdark" >
        <div>
          <h1 className='text-4xl  text-boxdark font-bold tracking-tight dark:text-white text-center'>Room Services Ordered</h1>
        </div>
      <RoomServiceDetail/>
      </div>
    </DefaultLayout>
  );
};

export default StaffAssignment;
