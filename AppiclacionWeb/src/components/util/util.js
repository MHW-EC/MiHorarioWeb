const days = ['Domingo','Lunes','Martes','Miercoles',"Jueves", "Viernes","Sábado"]
function stringDay(stringDate){
    return days[new Date(Date.parse(stringDate)).getDay()+1]
}
export function formatoIntevalo(stringDateA, stringDateB){
    return stringDay(stringDateA) + ", " + stringDateA["T"][1] + " A: " + stringDateB["T"][1] 
}
export function hola(){
    console.log("Hola")
}