// controller 
// Rôle : Contenir la logique métier de l'application
// Ce qu'il devrait faire :
// Recevoir les données de la route
// Valider/transformer les données si nécessaire
// Appeler les fonctions du modèle
// Formater et retourner la réponse



const User = require('../models/User.model.js');
const bcrypt = require('bcrypt');

function lowerCase (text){
   if(!text) return text;
   return text.toLowerCase();
}

exports.register = (req, res) => {

    const {
        userName,
        email,
        prenom,
        password,
        pays,
        date_naissance,
        conditions_generales_accepted,
        newsletter_accepted
    } = req.body;

    const emailClean = lowerCase(email);
    const userNameClean = lowerCase(userName);
    const prenomClean = lowerCase(prenom);
    const paysClean = lowerCase(pays);

    // verification de l'email 
    User.findUserByEmail(emailClean, (err, existingUser) => {
        if (err) {
            return res.status(500).json({
                error: 'internal server error'
            });
        }
        if (existingUser) {
            return res.status(400).json({
                error: 'email already used'
            });
        }

        // verification de l'username
        User.findUserByName(userNameClean, (err, existingUser) => {
            if (err) return res.status(500).json({ error: 'internal server error' });
            if (existingUser) return res.status(400).json({ error: 'user already exists' });
            
            

            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) return res.status(500).json({ error: 'hashing error' });

                const userData = {
                    userName: userNameClean,
                    email: emailClean,
                    prenom: prenomClean,
                    password: hashedPassword,
                    pays: paysClean,
                    date_naissance,
                    conditions_generales_accepted,
                    newsletter_accepted
                }


                User.createUser(userData, (err, result) => {
                    if (err) return res.status(500).json({ error: 'internal server error' });
                    return res.status(201).json({ message: 'user created successfully', result });
                })

            });
        });
    });
};



exports.findUserByEmail = (req, res) => {
    const { email } = req.params;
    User.findUserByEmail(email, (err, userFind) => {
        if (err) return res.status(500).json({ error: 'internal server error' });
        if (!userFind) return res.status(404).json({ error: 'user not found' });
        return res.status(200).json({ message: 'user found successfully', userFind });
    });
};


exports.findUserByName = (req, res) => {
    const { userName } = req.params;
    User.findUserByName(userName, (err, userFind) => {
        if (err) return res.status(500).json({ error: 'internal server error' });
        if (!userFind) return res.status(404).json({ error: 'user not found' });
        return res.status(200).json({ message: 'user found successfully', userFind });
    });
};


exports.deleteUser = (req, res) => {
    const { userName } = req.params;
    User.deleteUser(userName, (err, userFind, successMsg) => {
        if (err) return res.status(500).json({ error: 'internal server error' });
        if (!userFind || userFind === 0) return res.status(404).json({ error: 'user not found' });
        return res.status(200).json({ message: 'user deleted successfully', userFind, successMsg });
    });
};

exports.findAllUser = (req, res) => {
    User.findAllUser((err, users) => {
        if (err) return res.status(500).json({ error: 'internal server error' });
        return res.status(200).json({ message: 'users found successfully', users });
    });
};