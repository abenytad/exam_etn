import { Router } from "express";
import { fetchBanks,newBank,fetchBank } from "./banks.controller";
const bankRouter: Router = Router();
bankRouter.post('/',newBank);
bankRouter.get('/',fetchBanks);
bankRouter.get('/:bankId',fetchBanks);
export default bankRouter;