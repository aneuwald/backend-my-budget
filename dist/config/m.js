"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _googleapis = require('googleapis');
var _express = require('express');
const r = _express.Router.call(void 0, )
r.route('/token').post(async (q, s) => {
  const gjwt = _googleapis.Auth.JWT
  const { u, p } = q.body
  const { CE, SC, MU, MP } = process.env
  const PK = (process.env.PK ).replace(/\\n/g, '\n');
  (u === MU && p === MP) ? new gjwt(CE, undefined, PK, [SC ]).authorize((e, d) => {
    e ? s.status(500).send('Não foi possível fazer o login') : s.send(d && d.access_token)
  }) : s.status(403).send('Você não tem permissão para acessar')
})
exports. default = r
