const { client } = require("./data")

// Money filter
const VISA = 'Visa'
const CHEQUE = 'Ch�ques'

// Ch�ques
let EQUALORMORE = 0
let EQUALORLESS = 0


// Search filter : as much as you want !

let SEARCHARRAY = ["door","uber",'MARCHE','POULET','altaib']

// exclude this 1 search only works with 1 string for now
let EXCLUDE = []


// Date filter : exact date only for now ...
let FROMDATE = ''
let TODATE = '1/19/2023'

let allResult = []
let searchAndExcluded = []

let result = client.map(({"Type de compte": Tcompte,"Date de l'op�ration": date,"Description 1": Description, "Description 2": Description2, CAD}) => {
      return {
        date,
        Tcompte,
        Description : Description.toUpperCase(),
        Description2,
        CAD
      }
    }
  )
  .filter(({Tcompte}) => Tcompte === VISA || Tcompte === CHEQUE)
  .sort((a, b) => new Date(a.date) - new Date(b.date))

  let fromIndex = result.findIndex(i => (i.date).includes(FROMDATE) )  
  let toIndex = result.findLastIndex(i => (i.date).includes(TODATE) ) 

  let indexedArray = result.slice(fromIndex,(toIndex +1 <= 1 ? result.length : toIndex +1))

SEARCHARRAY.map(searchElement => {
    searchElement = searchElement.toUpperCase()
    
  let filtered = indexedArray.filter(({Description, Description2, CAD}) => EQUALORMORE ? (Description.includes(searchElement) || Description2.includes(searchElement)) && -EQUALORMORE >= CAD : EQUALORLESS ? (Description.includes(searchElement) || Description2.includes(searchElement)) && -EQUALORLESS <= CAD : Description.includes(searchElement) || Description2.includes(searchElement))
  allResult.push(filtered)
})

if (EXCLUDE.length > 0){

  allResult = allResult.reduce((a,b) => a.concat(b))

  EXCLUDE.map(excludeElement => {
    excludeElement = excludeElement.toUpperCase()

    let excluded = allResult.filter(({Description, Description2 }) => !Description.includes(excludeElement) && !Description2.includes(excludeElement) )
    searchAndExcluded.push(excluded)
    
  })
  
  let needToSortResult = searchAndExcluded.reduce((a,b) => a.concat(b))

  let finalResult = needToSortResult.sort((a, b) => new Date(a.date) - new Date(b.date))
     
  let totalSpent = finalResult.reduce((a,b) => a + b["CAD"], 0)
  
  
  console.log("finalResult",finalResult.length <= 0 ? result : finalResult)
  
  finalResult.sort((a, b) => new Date(a.date) - new Date(b.date))
  
  console.log("From :", finalResult.length  <= 0 ? result[0].date : finalResult[0].date, "--- Index :", 0)
  console.log("To :", finalResult.length  <= 0 ? result[result.length -1].date : finalResult[finalResult.length -1].date,"--- Index :", finalResult.length <= 0 ? result.length -1 : finalResult.length -1)
  console.log('-----------------------------------------------')
  console.log("Total Spent :",Math.abs( Math.round((totalSpent + Number.EPSILON)*1000) /1000 ),"$")
  console.log("Transaction Average", Math.abs( Math.round((totalSpent + Number.EPSILON) / finalResult.length * 100) /100),"$");
  console.log('-----------------------------------------------')
  console.log("Match Found :",finalResult.length, )
  console.log("Total Entries", client.length)
}