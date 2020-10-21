import React,{useState, useEffect} from 'react';
import Adresar from './components/Adresar'
import kontaktiServer from './services/kontakti'
 
	
const App = () => {
    const [ kontakti, postaviKontakte] = useState([])
    const [ unosImena, postaviIme] = useState('unesi ime i prezime...')
    const [ unosMail, postaviMail] = useState('e-mail...')
    const [traziPojam, postaviTrazeno]=useState("")
    const [rezultati,postaviRezultate]=useState([])
    const handleChange = (e) => {
        postaviTrazeno(e.target.value);
      }

    useEffect(() => {
    postaviRezultate(
        kontakti.filter((kontakt) =>
        kontakt.ime_prezime.toLowerCase().includes(traziPojam.toLowerCase())
          )
        );
      }, [traziPojam, kontakti]);
 
    const hook = () => {
        kontaktiServer.dohvatiSve().then(response => {
            postaviKontakte(response.data)
            }) 
        }
       
      useEffect(hook, [])
    
    const noviKontakti = (e) => {
        e.preventDefault()
        const noviObjekt = {
            id: kontakti.length + 1,
            ime_prezime: unosImena,
            mail: unosMail     
        }
	
        kontaktiServer.stvori(noviObjekt).then(response => {
            postaviKontakte(kontakti.concat(response.data))
            postaviIme('')
           postaviMail('')
        })  
    }
 
    const promjenaImena = (e) => {
        postaviIme(e.target.value)
  }

  const promjenaMail = (e) => {
    postaviMail(e.target.value)
  }

	
  const brisiKontakt = (id) => {
    kontaktiServer
      .brisi(id)
      .then( response => {
        console.log(response);
        postaviKontakte(kontakti.filter(p => p.id !== id))
      })
}   
    return (
      <div>
        <h1>ADRESAR</h1>
        <div>   
            <p>Filtriraj osobe:</p>
            <form>
        <input type="text" placeholder="Search" value={traziPojam} onChange={handleChange}  />
        <br></br>
        </form>
        <ul>
         {rezultati.map(a => (
             <Adresar key={a.id} kontakt={a} brisiKontakt={() => brisiKontakt(a.id)}  />        
        ))}
        </ul> 
        </div>
        {/* <ul>
            {kontakti.map(p =>
            <Adresar key={p.id} kontakt={p} />)}        
        </ul> */}
        <h1>NOVI KONTAKT</h1>
        <form onSubmit={noviKontakti}>
        IME OSOBE: <input value={unosImena} type="text" onChange={promjenaImena} />
        <br></br>
        E-MAIL: <input value={unosMail} type="email" onChange={promjenaMail} />
        <br></br>
        <button type='submit'>DODAJ</button>
        </form>
      </div>
    )
  }

  

  
export default App