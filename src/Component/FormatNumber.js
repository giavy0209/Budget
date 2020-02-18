export default function FormatNumber(num){
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}