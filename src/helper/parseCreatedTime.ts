export function parseCreatedTime(createdTime: number) {
  const day = new Date(createdTime);
  const year = day.getFullYear();
  const month = parseMonth(day.getMonth());
  const date = parseDate(day.getDate());

  return `${year}.${month}.${date}`
}

function parseMonth(month: number) {
  if(month < 10) {
    return `0${month}`;
  }

  return month;
}

function parseDate(date:number) {
  if(date < 10) {
    return `0${date}`;
  }

  return date;
}