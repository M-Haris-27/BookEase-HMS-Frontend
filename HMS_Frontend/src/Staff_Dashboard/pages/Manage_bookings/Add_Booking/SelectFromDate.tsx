
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


interface SelectFromDateProps {
    fromDate: Date | undefined,
    setFromDate: (date: Date | undefined) => void
}

export default function SelectFromDate({fromDate, setFromDate}: SelectFromDateProps) {



  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !fromDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {fromDate ? format(fromDate, "PPP") : <span className="text-slate-700 dark:text-slate-200">Pick From date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={fromDate}
          onSelect={setFromDate}
          initialFocus
          className="dark:bg-white bg-boxdark dark:text-boxdark text-white"
        />
      </PopoverContent>
    </Popover>
  )
}
