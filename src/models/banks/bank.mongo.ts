import { Document, Schema, model, Model } from "mongoose";
export interface BankType extends Document {
  name:string;
  accountNumber:string;
  imageUrl?:string;
  referenceNumber?:string;
}


const bankSchema:Schema=new Schema<BankType>({
    name: { type: String, required: true },
    accountNumber: { type: String, required: true },
    imageUrl: { type: String},
    referenceNumber: { type: String },

},{ timestamps: true });
const Bank:Model<BankType>=model<BankType>('Bank',bankSchema);
export default Bank;