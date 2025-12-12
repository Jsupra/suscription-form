import { useState } from "react"


export default function App() {


 const [password, setPassword] = useState<string>("")
 const [confirmPassword, setConfirmPassword] = useState<string>("")
 const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_.\-#])[A-Za-z\d@$!%*?&_.\-#]{8,}$/;
 const isPasswordValid = PASSWORD_REGEX.test(password);
 const [error, setError] = useState<string | null>(null);
//  const [apiStatus, setApiStatus] =useState<{ type: 'success' | 'error', message: string } | null>(null);
 
//  champs non controle par react
 const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

 //  setApiStatus(null);

  if(password != confirmPassword){
    setError("Les mots de passe ne correspondent pas")  
    return;
  }
  if (!isPasswordValid) {
    setError("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.")
    return;
  }
  
  //  On aspire les données du HTML
  const formData = new FormData(e.currentTarget);
  // On convertit en objet JavaScript simple
  let data = Object.fromEntries(formData);
  // On construit l'objet final
 const finalData = {
        ...data,
        conditions_generales_accepted: data.conditions_generales_accepted === 'on',
        newsletter_accepted: data.newsletter_accepted === 'on',
        password: password
    };

    delete (finalData as any).check_password;

    console.log("envoie en cours...",finalData);

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });
      const serverData = await response.json();
     if(!response.ok){
      console.error("erreur lors de la communication");
      console.error("code d'erreur : ", response.status);
      console.error("message d'erreur : ", serverData.error);
      return;
     }
     console.log("enregistrement reussi");
     console.log("code de reussi : ", response.status);
     console.log("message de reussi : ", serverData.message);
     console.log("data : ", serverData.result);
     }
     catch(error){
      console.error("erreur lors de la communication", error);
     }
     
 }
 
  return (
    <>
     {error && (
      <>
        {/* Overlay cliquable */}
        <div 
          className="fixed inset-0 bg-black/30 z-30" 
          onClick={() => setError(null)}
        />
        <dialog open className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg shadow-xl bg-white z-40">
          <p className="mb-4">{error}</p>
          <button onClick={() => setError(null)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Fermer</button>
        </dialog>
      </>
    )}
    <div className={error ? "flex flex-col items-center justify-center min-h-screen font-mono bg-sky-100 py-6 blur-sm" : "flex flex-col items-center justify-center min-h-screen font-mono bg-sky-100 py-6"}>
      <div className="bg-white rounded-xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-sky-600 p-4 font-mono text-center">INSCRIPTION</h1>
        <p className="text-sm text-gray-500">Champs obligatoire</p>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 mt-4">
        <div className="form-row">
          <label htmlFor="userName">Nom d'utilisateur :</label>
          <input 
            id="userName"
            type="text" 
            name="userName" 
            required
           />
        </div>
        <div className="form-row">
          <label htmlFor="email">Adresse e-mail</label>
          <input 
            id="email"
            type="email" 
            name="email"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="form-row">
            <label htmlFor="password">Mot de passe</label>
            <input 
              id="password"
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className={isPasswordValid || password === '' ? '' : '!border-red-400'}
            />
          </div>
          {password !== '' && !isPasswordValid && (
            <p className="text-red-500 text-[0.7rem] text-right">
              Min. 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="form-row">
            <label htmlFor="check_password">Confirmer le mot de passe</label>
            <input
              id="check_password"
              type="password" 
              name="check_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={password === confirmPassword || confirmPassword === '' ? '' : '!border-red-400'}
            />
          </div>
          {confirmPassword !== '' && password !== confirmPassword && (
            <p className="text-red-500 text-[0.7rem] text-right">
              Les mots de passe ne correspondent pas
            </p>
          )}
        </div>
        <p className=" text-gray-500 left-0">champs facultatifs</p>
        <div className="form-row">
          <label htmlFor="prenom">Prenom :</label>
          <input 
            id="prenom"
            type="text" 
            name="prenom" 
          />
        </div>
        <div className="form-row">
          <label htmlFor="date_naissance">date de naissance:</label>
          <input 
            id="date_naissance"
            type="date" 
            name="date_naissance" 
           />
        </div>
        <div className="form-row">
          <label htmlFor="pays">Pays:</label>
          <select 
            id="pays"
            name="pays" 
          >
            <option value="FR">France</option>
            <option value="ES">Espagne</option>
            <option value="IT">Italie</option>
            <option value="DE">Allemagne</option>
            <option value="CMR">Cameroun</option>
          </select>
        </div>
        <div className="form-row items-center justify-center">
          <label htmlFor="conditions_generales_accepted required">accepter les conditions generales</label>
          <input name="conditions_generales_accepted" type="checkbox" required />
        </div>
        <div className="form-row">
          <label htmlFor="newsletter_accepted">accepter la newsletter</label>
          <input name="newsletter_accepted" type="checkbox" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-sky-700">
          Submit
          </button>
        </form>
      </div>
    </div>
    </>
  )

}
