const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

const db = require('../database/database');

class CreateThoughts{
    constructor(header,content,date,id) {
        this.header = header,
        this.content = content,
        this.date = date

        if(id){
            this.id = new ObjectId(id)
        }
    }

    static async pullThoughts() {
        const thoughts = await db.getDbFunc().collection('thought').find().toArray();
        return thoughts.map(val=> new CreateThoughts(val.header,val.content,val.date,val._id))
    }

    async getThought() {
        if(!this.id) {
            return;
        }

        const dataDoc = await db.getDbFunc().collection('thought').findOne({_id: this.id});
        this.id = dataDoc._id;
        this.header = dataDoc.header;
        this.content = dataDoc.content;
        this.date = dataDoc.date
    }

    async saveThought(){

       if(this.id) {
        return await db.getDbFunc().collection('thought').updateOne({_id:this.id},{
            $set:{
                header: this.header,
                content:this.content,
                date: this.date
            }
        })
       }else{
        return await db.getDbFunc().collection('thought').insertOne({
            header: this.header,
            content:this.content,
            date:this.date
        })
       }
    }

    async deleteThought(){
        if(!this.id) {
            return;
        }
        return await db.getDbFunc().collection('thought').deleteOne({_id:this.id})
    }

}

module.exports = CreateThoughts;