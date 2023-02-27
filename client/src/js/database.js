import { openDB } from 'idb';

const dbname = 'jate'

export const initdb = async () => {
  openDB('jate', 1, {
    upgrade(db) {
      console.log("upgrading database");
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
}

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log(`put Request Recieved to store ${content}`);

    console.log(`attempting to open database ${dbname}`);
    const database = await openDB('jate',1);
    console.log(`opened db ${JSON.stringify(database)}`);
    const transact = database.transaction('jate', "readwrite");
    console.log(`created transaction ${JSON.stringify(transact)}`);
    const store = transact.objectStore('jate');
    console.log(`created store ${JSON.stringify(store)}`);
   // const request = store.put({id: 'content', content: content })
    //const request = store.put({id: 'content', content: content })
    const request = store.put({id: 1, content: content })
    console.log(`created request ${JSON.stringify(request)}`);
    const result = await request;
    return result?.value;
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () =>{
    console.log("get Request Recieved");
    //const dbname = 'jate'
    const database = await openDB('jate',1);
    console.log(`opened db ${JSON.stringify(database)}`);
    const transact = database.transaction('jate', "readonly");
    const store = transact.objectStore('jate');
    //const request = store.get('content')
    const request = store.get(1);
    const result = await request;
    console.log(`queryed database for result: ${result}`)

    console.log(`returning result: ${result}`);
    return result?.vaule;
} 

console.log("program started");
initdb();
