import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface SelectToDateProps {
    toDate: Date | undefined,
    setToDate: (date: Date | undefined) => void
}

export default function SelectToDate({ toDate, setToDate }: SelectToDateProps) {
  

  return (
    <Popover >
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !toDate && "text-muted-foreground "
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {toDate ? format(toDate, "PPP") : <span className="text-slate-700 dark:text-slate-200">Pick To date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={toDate}
          onSelect={setToDate}
          initialFocus
          className="dark:bg-white bg-boxdark dark:text-boxdark text-white"
        />
      </PopoverContent>
    </Popover>
  )
}
