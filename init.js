// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

fs.copyFileSync('.env.sample', '.env')
fs.copyFileSync('.pgadmin.env.sample', '.pgadmin.env')

fs.mkdirSync('tmp/pgdata', { recursive: true })
