import express from 'express';
import controller from '../controllers/company';

const router = express.Router();

router.post('/', controller.createCompany);
router.get('/', controller.getAllCompanies);
router.get('/:cnpj', controller.getCompanyByCNPJ);
router.put('/:cnpj', controller.updateCompany);
router.delete('/:cnpj', controller.deleteCompany);

export = router;
