import { Schema, model } from 'mongoose';

const schema = new Schema({
    price: { type: Number},
});
export default model('Price', schema);
