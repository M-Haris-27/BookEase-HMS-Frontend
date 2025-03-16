import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import OrderRoomService from './Order_Room_Service/OrderRoomService';

const RoomService = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Room Service" />
      <div className="flex flex-col m-6 p-10 bg-slate-50  max-h-[2000px]  rounded-lg dark:bg-boxdark" >
        <div>
          <h1 className='text-4xl  text-boxdark font-bold tracking-tight dark:text-white text-center'>Assign Room Service</h1>
        </div>
      <OrderRoomService/>
      </div>
    </DefaultLayout>
  );
};

export default RoomService;
