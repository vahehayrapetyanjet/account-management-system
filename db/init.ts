
import { Transaction, Person, Account} from './models'
const isDev = process.env.NODE_ENV === 'development'

const dbInit = async () => {
    await Person.sync({ alter: isDev })
    await Account.sync({ alter: isDev })
    await Transaction.sync({ alter: isDev })
}
export default dbInit