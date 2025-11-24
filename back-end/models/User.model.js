const db = require('../config/database');

// Définir le modèle User
const initUserTable = () => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userName TEXT NOT NULL,
        prenom TEXT,
        date_naissance TEXT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        pays TEXT,
        conditions_generales_accepted INTEGER DEFAULT 0,
        newsletter_accepted INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            console.error("Error creating users table", err);
        } else {
            console.log("Users table initialized");
        }
    });
};



const createUser = (user, callback) => {
    const {
        userName,
        prenom,
        date_naissance,
        email,
        password,
        pays,
        conditions_generales_accepted,
        newsletter_accepted
    } = user;
    db.run(`INSERT INTO users (userName, prenom, date_naissance, email, password, pays, conditions_generales_accepted, newsletter_accepted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [userName, prenom, date_naissance, email, password, pays, conditions_generales_accepted ? 1 : 0, newsletter_accepted ? 1 : 0],
        (err) => {
            if (err) {
                return callback(err);
            } else {
                return callback(null, { message: 'User created successfully' });
            }
        });
};


const findUserByEmail = (email, callback) => {
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
        if (err) {
            console.error("Error finding user by email", err);
            return callback(err);
        }
        return callback(null, row);
    });
};

const findAllUser = (callback) => {
    db.all(`SELECT * FROM users`, (err, row) =>{
        if(err){
            console.error("Error finding all users", err);
            return callback(err);
        }
        return callback(null, row);
    });
}


const findUserByName = (userName, callback) => {
    db.get(`SELECT * FROM users WHERE userName = ?`, [userName], (err, row) => {
        if (err) {
            console.error("Error finding user by userName", err);
            return callback(err);
        }
        return callback(null, row);
    });
};

const deleteUser = (userName, callback) =>{
    db.run(`DELETE FROM users WHERE userName = ?`, [userName], (err) => {
        if (err) {
            console.error("Error deleting user", err);
            return callback(err);
        }
        return callback(null, { message: 'User deleted successfully' });
    });
}



module.exports = {
    initUserTable,
    createUser,
    findUserByEmail,
    findUserByName,
    findAllUser,
    deleteUser
};
