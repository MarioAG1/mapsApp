const { writeFileSync, mkdirSync } = require ('fs');

require('dotenv').config()

const targetPath = "./src/environments/enviroment.ts"
const targetPathDev = "./src/environments/enviroment.development.ts"
const mapBoxKey = process.env['MAPBOX_KEY']

if(!mapBoxKey) {
    throw new Error('MAPBOX_KEY is not set')
}

const envFileContent = `
export const environment = {
  mapboxKey:
   "${mapBoxKey}",
};
`

mkdirSync('./src/environments', {recursive: true})
writeFileSync(targetPath, envFileContent)
writeFileSync(targetPathDev, envFileContent)