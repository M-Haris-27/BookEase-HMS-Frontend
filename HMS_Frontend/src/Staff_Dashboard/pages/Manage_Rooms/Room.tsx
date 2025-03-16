import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AddRoom from './AddRoom';
import RoomDetail from './RoomTable/RoomDetail';
const Room = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Manage Rooms" />

      <div className='flex align-middle justify-center m-6 bg-slate-50 dark:bg-boxdark h-[550px] rounded-lg'>       
        <AddRoom/>
      </div>

      <div className="flex flex-col m-6 p-10 bg-slate-50  h-[700px] rounded-lg dark:bg-boxdark" >
        <div>
          <h1 className='text-4xl  text-boxdark tracking-tight font-bold dark:text-white text-center'>Room Details</h1>
        </div>
        <RoomDetail />
      </div>
      
    </DefaultLayout>
  );
};

export default Room;
