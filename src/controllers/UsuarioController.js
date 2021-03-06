const Usuario = require("../models/Usuario");
module.exports = {

   async store(req, res) {
      if (await Usuario.findOne({ email: req.body.email })) {
         return res.status(400).json({ error: "Usuário já existe" });
      }
      const usuario = await Usuario.create(req.body);
      return res.json(usuario);
   },

   async list(req, res) {
      const usuario = await Usuario.find({});
      return res.json(usuario);
   },

   async index(req, res) {
      const usuario = await Usuario.findOne({ email: req.params.email });
      if (!usuario) {
         return res.status(400).json({ error: "Usuario não encontrado" });
      }
      return res.json(usuario);
   },

   async update(req, res) {
      const usuario = await Usuario.findByEmailAndUpdate(req.params.email, req.body, { new: true });
      return res.json(usuario);
   },

   async destroy(req, res) {
      await Usuario.deleteOne({ _id: req.params.id });
      return res.json({ message: "Usuário excluído" });
   }

};