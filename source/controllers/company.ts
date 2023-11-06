import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
import Icompany from '../interfaces/company';

const NAMESPACE = 'Empresas';

const createCompany = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserindo empresa');

    let empresa: Icompany = req.body;

    let query = `INSERT INTO empresas (nome_cliente, senha, nome_empresa, cnpj, cep, endereco, numero, telefone, email) VALUES ("${empresa.nome_cliente}", "${empresa.senha}", "${empresa.nome_empresa}", "${empresa.cnpj}", "${empresa.cep}", "${empresa.endereco}", "${empresa.numero}", "${empresa.telefone}", "${empresa.email}")`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(NAMESPACE, 'Empresa cadastrada: ', result);

                    return res.status(200).json({
                        result
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(500).json({
                        message: 'Houve um erro ao tentar cadastrar a empresa.',
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Encerrando conexão.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: 'Houve um problema no servidor. Tente novamente.',
                error
            });
        });
};

const getAllCompanies = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Recuperando todas as empresas.');

    let query = 'SELECT nome_cliente, nome_empresa, cnpj, cep, endereco, numero, telefone, email FROM empresas';

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((results) => {
                    logging.info(NAMESPACE, 'Empresas recuperadas: ', results);

                    return res.status(200).json({
                        results
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(500).json({
                        message: 'Houve um erro ao tentar recuperar as empresas.',
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Encerrando conexão.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: 'Houve um problema no servidor. Tente novamente.',
                error
            });
        });
};

const getCompanyByCNPJ = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Recuperando empresa.');

    let { cnpj } = req.params;

    let query = `SELECT nome_cliente, nome_empresa, cnpj, cep, endereco, numero, telefone, email FROM empresas WHERE cnpj = "${cnpj}"`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(NAMESPACE, 'Empresa recuperada: ', result);

                    return res.status(200).json({
                        result: result
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(500).json({
                        message: 'Houve um erro ao tentar recuperar a empresa.',
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Encerrando conexão.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: 'Houve um problema no servidor. Tente novamente.',
                error
            });
        });
};

const updateCompany = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Atualizando empresa');

    let cnpj: number = Number(req.params.cnpj);
    let { nome_cliente, nome_empresa, cep, endereco, numero, telefone, email } = req.body;

    let empresa: Icompany = { nome_cliente, nome_empresa, cnpj, cep, endereco, numero, telefone, email };

    let query = `UPDATE empresas SET nome_cliente = "${empresa.nome_cliente}", nome_empresa = "${empresa.nome_empresa}", cnpj = "${empresa.cnpj}", cep = "${empresa.cep}", endereco = "${empresa.endereco}", numero = "${empresa.numero}", telefone = "${empresa.telefone}", email = "${empresa.email}" WHERE cnpj = "${empresa.cnpj}"`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(NAMESPACE, 'Empresa atualizada: ', result);

                    return res.status(200).json({
                        result
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(500).json({
                        message: 'Houve um erro ao tentar atualizar a empresa.',
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Encerrando conexão.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: 'Houve um problema no servidor. Tente novamente.',
                error
            });
        });
};

const deleteCompany = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Deletando empresa.');

    let { cnpj } = req.params;

    let query = `DELETE FROM empresas WHERE cnpj = "${cnpj}"`;

    Connect()
        .then((connection) => {
            Query(connection, query)
                .then((result) => {
                    logging.info(NAMESPACE, 'Empresa deletada: ', result);

                    return res.status(200).json({
                        result
                    });
                })
                .catch((error) => {
                    logging.error(NAMESPACE, error.message, error);

                    return res.status(500).json({
                        message: 'Houve um erro ao tentar deletar a empresa.',
                        error
                    });
                })
                .finally(() => {
                    logging.info(NAMESPACE, 'Encerrando conexão.');
                    connection.end();
                });
        })
        .catch((error) => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
                message: 'Houve um problema no servidor. Tente novamente.',
                error
            });
        });
};

export default { createCompany, getAllCompanies, getCompanyByCNPJ, updateCompany, deleteCompany };
