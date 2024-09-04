import { Request, Response } from "express";
import { BankType } from "../../models/banks/bank.mongo";
import { createBank,getBanks,getBank } from "../../models/banks/banks.model";

const newBank = async (req: Request, res: Response) => {
    try {
      const data: BankType = req.body;
      const question = await createBank(data);
      return res.status(201).json(question);
    } catch (err) {
      return res.status(404).json({ error: `${err}` });
    }
  };
  
  const fetchBanks = async (req: Request, res: Response) => {
    try {
     
      const banks = await getBanks();
      return res.status(200).json(banks);
    } catch (err) {
      return res.status(404).json({ error: `${err}` });
    }
  };
  const fetchBank = async (req: Request, res: Response) => {
    try {
      const { bankId }: { bankId?: string } = req.params;
      const bank = await getBank(bankId);
      return res.status(200).json(bank);
    } catch (err) {
      return res.status(404).json({ error: `${err}` });
    }
  };

  export {newBank,fetchBanks,fetchBank};