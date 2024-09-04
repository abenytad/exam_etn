import Bank,{BankType} from "./bank.mongo";
const createBank = async (data: BankType): Promise<BankType> => {
    return await Bank.create(data);
  };
  const getBanks =async():Promise<BankType [] |[]>=>{
    return await Bank.find({},{
        _id:1,
        name:1,
        accountNumber:1,
        referenceNumber:1,
        imageUrl:1,
    }).lean();
  }
  const getBank =async(bankId:String):Promise<BankType | null>=>{
    return await Bank.findById(bankId,{
        _id:1,
        name:1,
        accountNumber:1,
        referenceNumber:1,
        imageUrl:1,
    }).lean();
  }

export {createBank,getBanks,getBank};