import mongoose from 'mongoose';
import { configData } from '../../../utils/config'
// import { content_like_dislike } from '../userActivity/content_like_dislike';

let config: any = configData

let dbURL = config.dbURL
let defdb = config.vridhee.defdb
let dbConnect: any
let actorDbConnection: any

var contentLikeDislike;

// export async function metaDbConnetion(dbName, collection_name) {
//     actorDbConnection = await dbConnect.useDb(dbName);

//     contentLikeDislike = actorDbConnection.model(collection_name, content_like_dislike, collection_name)

// }
