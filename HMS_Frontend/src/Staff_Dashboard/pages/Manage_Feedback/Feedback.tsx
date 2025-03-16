import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Button } from '@/components/ui/button';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Separator } from '@/components/ui/separator';
import { Rating } from "@material-tailwind/react";

interface Guest {
  guestID: number;
  name: string;
  email: string;
}

interface Feedback {
  feedbackId: number;
  guest: Guest;
  content: string;
  submissionDate: string;
}

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;


  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(`https://${apiUrl}/api/feedback/getAllFeedbacks`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('No feedbacks found.');
        }
        const data: Feedback[] = await response.json();
        setFeedbacks(data);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleDelete = async (feedbackId: number) => {
    try {
      const response = await fetch(`https://${apiUrl}/api/feedback/deleteFeedback/${feedbackId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete feedback.');
      }
      toast.success('Feedback deleted successfully.', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
      setFeedbacks(feedbacks.filter(feedback => feedback.feedbackId !== feedbackId));
    } catch (err) {
      toast.error('Error deleting feedback.', {
        position: 'bottom-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Bounce,
      });
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Feedbacks" />
      <div className="bg-white dark:bg-boxdark py-2 sm:py-10 rounded-md">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl ml-50">
            <h2 className="text-3xl text-center font-bold tracking-tight text-boxdark dark:text-white sm:text-4xl">
              All Feedbacks
            </h2>
            <p className="mt-2 text-center text-lg leading-8 text-slate-700 dark:text-slate-300">
              Admin can view and delete all the Feedbacks. 
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {feedbacks.length > 0 ? feedbacks.map((feedback) => (
              <article key={feedback.feedbackId} className="bg-blue-50 rounded-md p-6 flex w-90 flex-col items-center justify-center">
                <div className="flex items-center gap-x-4 text-base">
                  <time dateTime={new Date(feedback.submissionDate).toISOString()} className="text-boxdark">
                    {new Date(feedback.submissionDate).toLocaleDateString()}
                  </time>
                  <div className="relative z-10 text-boxdark rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                    {feedback.guest.name}
                  </div>
                </div>
                  <Separator className='bg-slate-400'/>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-slate-700 group-hover:text-gray-600">
                    <span className="absolute inset-0" />
                    Feedback Content
                  </h3>
                  <div className='px-4 py-4 bg-slate-200 mt-2 rounded-md'>
                  <Rating value={4} />
                  <p className="mt-2 italic line-clamp-3 text-sm leading-6 text-boxdark">
                    " {feedback.content} "
                  </p>
                  </div>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-boxdark">
                      <span className="absolute inset-0" />
                      {feedback.guest.name}
                    </p>
                    <p className="text-slate-600">{feedback.guest.email}</p>
                  </div>
                </div>
                <Button onClick={() => handleDelete(feedback.feedbackId)} className="py-1 px-2 bg-red-600 hover:bg-red-800 text-white text-base font-semibold rounded-lg mt-6">
                  Delete Feedback
                </Button>
              </article>
            )) : <p>No Feedbacks Found.</p>}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Feedback;
