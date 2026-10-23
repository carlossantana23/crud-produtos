const { sql } = require('../config/db');

const criarProduto = async (req, res) => {
    try {
        const { Nome, Preco, Quantidade } = req.body;
        await sql.query`INSERT INTO Produtos (Nome, Preco, Quantidade) VALUES (${Nome}, ${Preco}, ${Quantidade})`;
        res.status(201).json({ mensagem: 'Produto cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const listarProdutos = async (req, res) => {
    try {
        const resultado = await sql.query`SELECT * FROM Produtos`;
        res.status(200).json(resultado.recordset);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const buscarProdutoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await sql.query`SELECT * FROM Produtos WHERE Id = ${id}`;
        
        if (resultado.recordset.length === 0) {
            return res.status(404).json({ mensagem: 'Produto não encontrado.' });
        }
        
        res.status(200).json(resultado.recordset[0]);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const atualizarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nome, Preco, Quantidade } = req.body;
        
        await sql.query`UPDATE Produtos SET Nome = ${Nome}, Preco = ${Preco}, Quantidade = ${Quantidade} WHERE Id = ${id}`;
        res.status(200).json({ mensagem: 'Produto atualizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

const deletarProduto = async (req, res) => {
    try {
        const { id } = req.params;
        await sql.query`DELETE FROM Produtos WHERE Id = ${id}`;
        res.status(200).json({ mensagem: 'Produto excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

module.exports = {
    criarProduto,
    listarProdutos,
    buscarProdutoPorId,
    atualizarProduto,
    deletarProduto
};