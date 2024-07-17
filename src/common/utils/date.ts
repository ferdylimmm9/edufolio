import { format } from 'date-fns';

export const convertDate = function (date) {
  const time = new Date(date?.getTime());
  time?.setHours(0, 0, 0, 0);
  return time?.toISOString();
};

export const getMonthRange = ({
  month,
  year,
}: {
  month?: number;
  year?: number;
}): { lastDay: Date; firstDay: Date } => {
  const _today = new Date(year!, month!);
  const lastDay = new Date(_today.getFullYear(), _today.getMonth() + 1, 0);
  const firstDay = new Date(_today.getFullYear(), _today.getMonth(), 1);
  return { lastDay, firstDay };
};

export const countHours = function (startTime, addValue) {
  const hours = Number(startTime.substring(0, 2));
  const minutes = Number(startTime.substring(3, 5));
  const time = format(
    new Date().setHours(hours, minutes + Number(addValue), 0),
    'HH:mm',
  );
  return time;
};

export const formatTime = function (date, time) {
  const format = date as Date;
  format.setHours(
    Number(time.substring(0, 2)),
    Number(time.substring(3, 5)),
    0,
    0,
  );
  return format;
};

export const formatDateTime = function (date: Date) {
  return format(date, 'dd MMMM yyyy, HH:mm');
};

export const formatDate = function (date: Date) {
  return format(date, 'dd MMMM yyyy');
};
