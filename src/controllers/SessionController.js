const Usuario = require("../models/Usuario");

module.exports = {

   async store(req, res) {
      const { email, password } = req.body;
      const user = await Usuario.findOne({ email }).select("+password");

      if (!user) {
         return res.status(400).json({ error: "Usuário não encontrado" });
      }
      if (!(await user.compareHash(password))) {
         return res.status(400).json({ error: "Senha inválida" });
      }

      return res.json({ user, token: Usuario.generateToken(user) });
   }

};