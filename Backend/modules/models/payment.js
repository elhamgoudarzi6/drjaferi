import { Schema, model } from 'mongoose';

const schema = new Schema({
  userID: { type: Schema.ObjectId, ref: 'User' },
  reserveID: { type: Schema.ObjectId, ref: 'Reserve' },
  resNumber: { type: String },//شناسه پرداخت
  price: { type: Number },
  status: { type: String, default: 'ناموفق' },
  date: { type: String, },
  time: { type: String, },
  refID: { type: String },//شماره تراکنش
}, { toJSON: { virtuals: true } });
schema.virtual('User', {
    ref: 'User',
    localField: 'userID',
    foreignField: '_id',
});
schema.virtual('Reserve', {
    ref: 'Reserve',
    localField: 'reserveID',
    foreignField: '_id',
});
export default model('Payment', schema);