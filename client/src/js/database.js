import { openDB } from 'idb';

const dbname = 'jate'

const initdb = async () =>
  openDB(dbname, 1, {
    upgrade(db) {
      console.log("upgrading database");
      if (db.objectStoreNames.contains(dbname)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(dbname, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log(`put Request Recieved to store ${content}`);

    console.log(`attempting to open database ${dbname}`);
    const database = await openDB(dbname,1);
    console.log(`opened db ${JSON.stringify(database)}`);
    const transact = database.transaction(dbname, "readwrite");
    console.log(`created transaction ${JSON.stringify(transact)}`);
    const store = transact.objectStore(dbname);
    console.log(`created store ${JSON.stringify(store)}`);
   // const request = store.put({id: 'content', content: content })
    //const request = store.put({id: 'content', content: content })
    const request = store.put({id: 1, content: content })
    console.log(`created request ${JSON.stringify(request)}`);
    const result = await request;
    return result;
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () =>{
    console.log("get Request Recieved");
    //const dbname = 'jate'
    const database = await openDB(dbname,1);
    console.log(`opened db ${JSON.stringify(database)}`);
    const transact = database.transaction(dbname, "readonly");
    const store = transact.objectStore(dbname);
    //const request = store.get('content')
    const request = store.get(1);
    const result = await request;
    console.log(`queryed database for result: ${result}`)

    console.log(`returning result: ${result}`);
    return result;
} 

console.log("program started");
initdb();
