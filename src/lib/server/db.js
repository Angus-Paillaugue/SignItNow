import { MongoClient } from "mongodb"
import { MONGODB_CONNEXION_STRING } from "$env/static/private"

const client = new MongoClient(MONGODB_CONNEXION_STRING);
await client.connect();

const database = client.db('poll');

const pollsRef = database.collection("polls");
const usersRef = database.collection("users");

export { usersRef, pollsRef }