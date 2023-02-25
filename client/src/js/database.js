import { openDB } from 'idb';

const dbname = 'jate'

const initdb = async () =>
  openDB(dbname, 1, {
    upgrade(db) {
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
  console.log("put Request Recieved");

    
    const database = await openDB(dbname,1);
    const transact = database.transaction(dbname, "readwrite");
    const store = transact.objectStore(dbname);
    const request = store.put({id: 'content', content: content })
    const result = await request;
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () =>{
  console.log("get Request Recieved");
    const dbname = 'jate'
    const database = await openDB(dbname,1);
    const transact = database.transaction(dbname, "readonly");
    const store = transact.objectStore(dbname);
    const request = store.get('content')
    const result = await request;
} 

initdb();
