import g from 'googleapis'
import { Router } from 'express'
const r = Router()
r.route('/token').post(async (q, s) => {
  const go = g.google.auth.JWT
  const { u, p } = q.body
  const { CE, SC, MU, MP } = process.env
  const PK = process.env.PK.replace(/\\n/g, '\n');
  (u === MU && p === MP) ? new go(CE, null, PK, [SC], null).authorize((e, d) => {
    e ? s.status(500).send('Não foi possível fazer o login') : s.send(d.access_token)
  }) : s.status(403).send('Você não tem permissão para acessar')
})
export default r
