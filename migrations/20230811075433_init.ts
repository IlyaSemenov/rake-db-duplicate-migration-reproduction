import { change } from '../rake'

console.log('migration module')

change(async (db, up) => {
	console.log(`migration change up=${up}`)
})
