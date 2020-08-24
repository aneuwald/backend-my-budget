import g from 'googleapis'
import { Router } from 'express'
const r = Router()
r.route('/token').post(async (q, s) => {
  const gjwt = g.google.auth.JWT
  const { u, p } = q.body
  const { CE, SC, MU, MP } = process.env
  const PK = (process.env.PK as string).replace(/\\n/g, '\n');
  (u === MU && p === MP) ? new gjwt(CE, undefined, PK, [SC as string]).authorize((e, d) => {
    e ? s.status(500).send('Não foi possível fazer o login') : s.send(d && d.access_token)
  }) : s.status(403).send('Você não tem permissão para acessar')
})
export default r
