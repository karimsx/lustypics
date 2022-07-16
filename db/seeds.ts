import db from "./index"
import Chance from "chance"
const chance = new Chance()

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */
const seed = async () => {
  for (let i = 0; i < 5; i++) {
    await db.gallery.create({ data: { name: chance.string() } })
  }
}

export default seed
