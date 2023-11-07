//* Credit for inflect idea goes to Kyle Shevlin.
const inflect =
    (singular: string, plural: string = `${singular}s`) =>
    (quantity: number) =>
        Math.abs(quantity) === 1 ? singular : plural

const errorWithInflection = inflect('error')

export { errorWithInflection }
