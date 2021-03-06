const db = require('../config/connection')
const collection = require('../config/collection')

module.exports={

    //saving user deatils to db

    saveUser:(user)=>{
        db.get().collection(collection.USER_COLLECTION).createIndex({userId:1},{unique:true})
        db.get().collection(collection.USER_COLLECTION).insertOne(user).catch((err)=>{
            console.log('already existing user');
        })
    },

    //getting user data for statitics and broadcast purpose

    getUser:()=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).find().toArray().then((res)=>{
                resolve(res);
                
            })
        })
    },

    //updating user database by removing blocked users details from the database

    updateUser:(userId)=>{
        db.get().collection(collection.USER_COLLECTION).deleteOne({userId:userId}).then((res)=>{
            console.log('updated user database');
        })
    },

    //saving files to database

    saveFile:(fileDetails)=>{
        db.get().collection(collection.FILE_COLLECTION).createIndex({file_name:"text"})
        db.get().collection(collection.FILE_COLLECTION).insertOne(fileDetails).then((res)=>{
            console.log('file saved');
        })
    },

    //searching and finding file id from database

    getFile:(query)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collection.FILE_COLLECTION).findOne({uniqueId:query}).then((res)=>{
                resolve(res)
            })
        })
    },

    //getting file as array for inline query

    getfileInline:(query)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.FILE_COLLECTION).find( { file_name: { $regex:query ,$options:'i'} } ).toArray().then((res)=>{
                console.log(res);
                resolve(res)
            }) 
           })
    }
}
