const days = ['Domingo','Lunes','Martes','Miercoles',"Jueves", "Viernes","Sábado"]
function stringDay(stringDate){
    return days[new Date(Date.parse(stringDate)).getDay()+1]
}
export function formatoIntevalo(stringDateA, stringDateB){
    return stringDay(stringDateA) + "  " + 
    stringDateA.split(["T"])[1].substring(0,5) + " - " 
    + stringDateB.split(["T"])[1].substring(0,5) 
}
export function formatoIntevaloEx(stringDateA, stringDateB){
    return stringDateA.split("T")[0] + " " + 
    stringDateA.split(["T"])[1].substring(0,5) + 
    "-" + stringDateB.split(["T"])[1].substring(0,5) 
    //return stringDay(stringDateA) + ", " + stringDateA.split(["T"])[1] + " A: " + stringDateB.split(["T"])[1] 
}