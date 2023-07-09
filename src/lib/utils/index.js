function formatDate(date) {
    if(new Date().setHours(0, 0, 0, 0) === new Date(date).setHours(0, 0, 0, 0)){
        return "Today";
    }else if(isYesterday(new Date(date))){
        return "Yesterday";
    }else if(isBeforeThisYear(new Date(date))){
        return new Date(date).toLocaleDateString("en-GB", { month:"short", day:"numeric", year:"numeric" });
    }else{
        return new Date(date).toLocaleDateString("en-GB", { month:"long", day:"numeric" });
    }
}
function isYesterday(date) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear();
}
function isBeforeThisYear(date) {
    const lastYear = new Date();
    return new Date(date).getFullYear() < lastYear.getFullYear()-1;
}

export { formatDate }