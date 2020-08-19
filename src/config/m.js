const r = require('express').Router();
r.route('/token').post(async (q, s) => {
    const g = require('googleapis').google.auth.JWT,
        { u, p } = q.body,
        { CE, SC, MU, MP, AK } = process.env,
        PK = process.env.PK.replace(/\\n/g, '\n');
    (u === MU && p === MP) ? new g(CE, null, PK, [SC], null,).authorize((e, d) => {
        e ? s.status(500).send('Não foi possível fazer o login') : s.send(d.access_token)
    }) : s.status(403).send('Você não tem permissão para acessar')
})
module.exports = r;