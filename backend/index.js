const express =require('express')
const app=express()
const cors =require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

let kontakti = [
    {
      id: 1,
      ime_prezime: 'Marina Aglic Cuvic',
      mail: "maglic@pmfst.hr"
    },
    {
      id: 2,
      ime_prezime: 'Jelena Maljkovic',
      mail: "jmaljkovi@pmfst.hr"
    },
    {
        id: 3,
        ime_prezime: 'Anja Prvan',
        mail: "aprvan@kitzd.hr"
    }
     
   
  ]
 

//DOHVACANJE
app.get('/', (req, res) =>{
    res.send('<h1>jelena server</h1>')
  })
   
  app.get('/api/kontakti', (req, res) =>{
    res.json(kontakti)
  })
      
  app.get('/api/kontakti/:ime_prezime', (req, res) =>{
      const ime_prezime = req.params.ime_prezime
      const adresa = kontakti.find(a => a.ime_prezime === ime_prezime)
      
      if (adresa){
        res.json(kontakti)
      } else {
        res.status(404).end()
      }
  })
  
  //BRISANJE
  app.delete('/api/kontakti/:ime_prezime', (req, res) => {
      const ime_prezime = req.params.ime_prezime
      adresa = kontakti.filter(a => a.ime_prezime !== ime_prezime)
     
      res.status(204).end()
  })
  
  //DODAVANJE
  app.post('/api/kontakti', (req,res) =>{
      const maxId = kontakti.length > 0
      ? Math.max(...kontakti.map(a => a.id))
      : 0
      const podatak=req.body
      if(!podatak.ime_prezime || !podatak.mail){
        return res.status(400).json({
          error: "Nedostaje ime i prezime ili email"
        })
      }
      const adresa = {
        ime_prezime: podatak.ime_prezime,
        mail: podatak.mail,
        id: maxId+1
      }
      
      kontakti=kontakti.concat(adresa)
      console.log(adresa)
    
      res.json(adresa)
  })
   
 
  const nepoznataRuta = (req, res) => {
      response.status(404).send({ error: 'nepostojeca ruta' })
  }
  app.use(nepoznataRuta)
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Posluzitelj je pokrenut na portu ${PORT}`);
  })