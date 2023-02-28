import { openDB } from 'idb';

const dbname = 'jate'

const initdb = async () => {
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
    //return result?.value;
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () =>{
    console.log("get Request Recieved");
    //const dbname = 'jate'
    const database = await openDB('jate',1);
    console.log(`opened db ${JSON.stringify(database)}`);
    const transact = database.transaction('jate', "readonly");
    const store = transact.objectStore('jate');
    console.log(`created store ${JSON.stringify(store)}`);
    //const request = store.get('content')
    const request = store.get(1);
    console.log(`created request ${JSON.stringify(request)}`);
    // const result = await request;
    
    // console.log(`returning result: ${result}`);
    
    //ask BCS
    const result = await request;
    if(result){
      console.log(`queryed database for result: ${result[0]}`)
      console.log({result});
      console.log(result["result"]);
      console.log(result.content);

    }
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');
    return result?.content;
} 


//ask bcs - await init db
async function main() {
  console.log("program started");
  await initdb();
  console.log("database inited");
}

main();
