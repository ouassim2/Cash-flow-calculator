const { client } = require("./data")

// Money filter
const VISA = 'Visa'
const CHEQUE = 'Ch�ques'

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