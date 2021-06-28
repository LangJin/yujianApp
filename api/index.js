import * as account from './account.js'
import * as home from './home.js'
import * as common from './common.js'
import * as amount from './amount.js'
import * as message from './message.js'

import {
	extend
} from '@/utils/extend.js'

export default extend({},
	account, home, common, amount, message
);
