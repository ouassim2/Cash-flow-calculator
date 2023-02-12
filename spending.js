const { client } = require("./data")

// Money filter
const VISA = 'Visa'
const CHEQUE = 'Ch�ques'



// Search filter : as much as you want !

let SEARCHARRAY = ["door","uber",'MARCHE','POULET','altaib']


// Date filter : exact date only for now ...
let FROMDATE = ''
let TODATE = '1/19/2023'



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