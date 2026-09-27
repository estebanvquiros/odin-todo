import { differenceInCalendarDays, format, isToday, isTomorrow, isYesterday, parseISO } from "date-fns";

function formatDueDate(dueDateString) {
  const dueDate = parseISO(dueDateString);

  if (isToday(dueDate)) return "Today";
  if (isTomorrow(dueDate)) return "Tomorrow";
  if (isYesterday(dueDate)) return "Yesterday";

  const remainingDays = differenceInCalendarDays(dueDate, new Date);

  if (remainingDays < 0) return `${Math.abs(remainingDays)} days ago`;
  if (remainingDays <= 7) return `In ${remainingDays} days`;

  return format(dueDate, 'MMM d, yyyy');
}

export { formatDueDate }
