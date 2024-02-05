import { notify } from "./notify";
  const CheckDate = (startDate,endDate) => {
      
    const todayMintues = new Date().getMinutes();
    const todayHours = new Date().getHours();
    const endHours = new Date(startDate).getHours();
    const startMonth = new Date(startDate).getMinutes();
    const endMonth = new Date(endDate).getMonth();
    const checkDay = endDate;
    const today = startDate;
    
    if (startDate) {
        
      if (checkDay > today) {
        return true;
      } else if (checkDay == today) {
          return true
      } else {
        
          notify("End date must be greater than start date","error")
        return false;
      }
    } else {
        notify("End date must be greater than start date","error")
      return false;
    }
  };
  export{
    CheckDate
  }