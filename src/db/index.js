import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('rickandmorty.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS characters (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, status TEXT NOT NULL, species TEXT NOT NULL, type TEXT NOT NULL, image TEXT NOT NULL, location TEXT NOT NULL, episode INTEGER NOT NULL);',
                 [],
                 () => { resolve()},
                 (_, err) => {reject(err)})
        })
    });
    return promise;
}

export const insertCharacter = (character) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO characters (name, status, species, type, image, location, episode) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [character.name, character.status, character.species, character.type, character.image, character.location, character.episode],
                (_, result) => {
                    console.log(result);
                    resolve(result)
                },
                (_, err) => {
                    console.log(err);
                    reject(err)
                }
            )
        })
    })
    return promise;
}

export const fetchCharacters = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM characters',
                [],
                (_, result) => {
                    console.log(result);
                    resolve(result)
                },
                (_, err) => {
                    console.log(err);
                    reject(err)
                }
            )
        })
    })
    return promise;
}