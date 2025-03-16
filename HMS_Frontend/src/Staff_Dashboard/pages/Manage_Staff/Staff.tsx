import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ChangePassword from './ChangePassword';
import RegisterStaff from './RegisterStaff';
import StaffDetail from './StaffTable/StaffDetail';

const Staff = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Manage Staff" />

      <div className='flex flex-row m-6 bg-slate-200 border-cyan-900 h-[900px] rounded-lg'>       
      
      <RegisterStaff/>
      <ChangePassword/>

      </div>

      <div className="flex flex-col m-6 p-10 bg-slate-200 border-cyan-900 max-h-[2000px] rounded-lg dark:bg-boxdark" >
        <div>
          <h1 className='text-4xl text-black font-bold tracking-tight dark:text-white text-center'>Staff Details</h1>
        </div>
        <StaffDetail />
      </div>
    </DefaultLayout>
  );
};

export default Staff;
