const formatDate: (date: string, withDetails?: boolean) => string = (
  date,
  withDetails = false,
) => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${[year, month, day].join('-')}${
    withDetails
      ? `${d.getHours() >= 12 ? ' 오후' : ' 오전'} ${
          d.getHours() >= 12 ? d.getHours() - 12 : d.getHours()
        }:${d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()}분`
      : ''
  }`;
};

export default formatDate;
