import { Schema, model } from 'mongoose';

const schema = new Schema({
    userID: { type: Schema.ObjectId, ref: 'User' },
    reason: { type: String },
    docType: { type: String },
    consultationType: { type: String },
     visitTime: { type: String },
    visitDate: { type: String },
    time: { type: String },
    date: { type: String },
    code: { type: String }
}, { toJSON: { virtuals: true } });
schema.virtual('User', {
    ref: 'User',
    localField: 'userID',
    foreignField: '_id',
});
export default model('Reserve', schema);