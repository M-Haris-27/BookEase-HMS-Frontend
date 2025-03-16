import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import CreateBooking from './Add_Booking/CreateBooking';
import BookedDates from './BookedDates';
import BookingDetail from './Booking_Table/BookingDetail';

const Bookings = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Bookings" />
        <div className="bg-slate-200 dark:bg-boxdark flex flex-row m-3 border-cyan-900 h-[400px] max-h-187.5 rounded-lg">
          <CreateBooking />
        </div>
        <div className="flex flex-col m-6 mt-10 p-10 bg-slate-200 border-cyan-900 max-h-[2000px] rounded-lg dark:bg-boxdark" >
        <div>
          <h1 className='text-3xl text-black font-bold tracking-tight dark:text-white text-start ml-4'>Check Booked Dates</h1>
        </div>
        <BookedDates />
      </div>
        <div className="flex flex-col m-6 mt-10 p-10 bg-slate-200 border-cyan-900 max-h-[2000px] rounded-lg dark:bg-boxdark" >
        <div>
          <h1 className='text-3xl text-black font-bold tracking-tight dark:text-white text-center'>All Bookings</h1>
        </div>
        <BookingDetail />
      </div>

    </DefaultLayout>
  );
};

export default Bookings;
