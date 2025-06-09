function getDate(datetime) {
    let splitdatetime =datetime.split('T');
    return splitdatetime[0];
  }
  
  export default getDate;