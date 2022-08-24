
import { Transaction, Person, Account} from './models'
import { env  } from '../config/env'

const isDev = env.NODE_ENV === 'development'

const dbInit = async () => {
    await Person.sync({ alter: isDev })
    await Account.sync({ alter: isDev })
    await Transaction.sync({ alter: isDev })
}
export default dbInit