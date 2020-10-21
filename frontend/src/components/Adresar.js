import React from 'react'
 
	
const Adresar = ({kontakt,brisiKontakt}) => {
    
    return (
      <li>
        {kontakt.ime_prezime}  ({kontakt.mail} )
          <button onClick={brisiKontakt}> BRISI KONTAKT</button>
      </li>
    )
  }
 
export default Adresar