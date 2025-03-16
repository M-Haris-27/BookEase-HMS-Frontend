import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface InvoiceProp {
  invoiceID: number,
}

export function PaymentCard({ invoiceID }: InvoiceProp) {
  const [selectedTab, setSelectedTab] = useState('cash');
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [error, setError] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountPaid(parseInt(e.target.value));
  };

  const handleSubmitPayment = async () => {
    if (amountPaid  <= 0 ) {
      setError("Amount paid cannot be less than or equal to zero");
      return;
    }

    if (!invoiceID || invoiceID <= 0) {
      setError("Payment cannot be confirmed at the moment.");
      return;
    }

    try {
      const response = await fetch(
        `https://${apiUrl}/api/payment/makePayment/${invoiceID}?totalAmount=${amountPaid}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.log(errorText);
        throw new Error(errorText);
      }

      setError("");
      const result = await response.json();
      console.log(result);
      toast.success(`Payment Confirmed Successfully for the Invoice ID: ${invoiceID}.`, {
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
    } catch (err) {
      setError(`${err}`);
    }
  };

  return (
    <Tabs defaultValue="cash" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2 border-2 border-boxdark dark:border-white">
        <TabsTrigger
          onClick={() => setSelectedTab('cash')}
          className={`font-semibold ${selectedTab === 'cash' ? 'bg-boxdark text-white' : 'dark:border-white border-boxdark'}`}
          value="cash"
        >
          Cash
        </TabsTrigger>
        <TabsTrigger
          onClick={() => setSelectedTab('online')}
          className={`font-semibold ${selectedTab === 'online' ? 'bg-boxdark text-white' : 'dark:border-white border-boxdark'}`}
          value="online"
        >
          Online
        </TabsTrigger>
      </TabsList>

      <TabsContent className="dark:text-slate-100" value="cash">
        <Card>
          <CardHeader>
            <CardTitle>Cash Payment</CardTitle>
            <CardDescription>Enter the cash amount the guest has paid.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="amount">Amount Paid:</Label>
              <Input
                id="amount"
                type="number"
                value={amountPaid}
                onChange={handleChange}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmitPayment} className="w-full mt-3 mb-4 font-semibold py-5 text-base bg-green-600 hover:bg-green-800 text-white">
              Pay Bill
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="online">
        <Card>
          <CardHeader>
            <CardTitle>Online Payment</CardTitle>
            <CardDescription>Integrated with 3rd party system to handle invoice status.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Alert className="bg-slate-300 text-black">
              <AlertTitle>
                <p className="text-base">Sorry, This Feature has not been implemented yet. Come Back Later....</p>
              </AlertTitle>
              <AlertDescription />
            </Alert>
          </CardContent>
          <CardFooter>
            <Button disabled className="w-full mt-3 mb-4 font-semibold py-5 text-base bg-green-600 hover:bg-green-800 text-white">
              Pay Bill
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
