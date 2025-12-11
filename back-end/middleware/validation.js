
// middleware de validation : Valider les données entrantes avant qu'elles n'atteignent le controller.


exports.validation = (req, res, next) => {
    
    const {userName, email, password} = req.body;

    //validation des informations
    if (!userName || !email || !password) {
        return res.status(400).json({
            error: "Missing information"});
    }

    //verification de username
    if (userName.length < 3){
        return res.status(400).json({
            error: "Username must be at least 3 characters long"});
    }

    // validation du mot de passe 
    if (password.length < 8){
        return res.status(400).json({
            error: "Password must be at least 8 characters long"
        })
    }

    // Valider le format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Email invalide' });
    }

    // Vérifier si le mot de passe contient au moins une majuscule, une minuscule, un chiffre et un caractère spécial
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Mot de passe invalide, le mot de passe doit contenir au moins  une majuscule, une minuscule, un chiffre et un caractère spécial ' });
    }

    //verifier si condition utilisation sont accepte
    const conditions_generales_accepted = req.body.conditions_generales_accepted;
    if (!conditions_generales_accepted || conditions_generales_accepted === 0) {
        return res.status(400).json({ error: 'Conditions generales must be accepted' });
    }

    next();
}

