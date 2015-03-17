import sizzle from './sizzle';
import ajax from './ajax';
import form from './form';
import pubsub from './pubsub';
import keys from './keys';
import colors from './colors';
import util from './util';

let all = { ajax, form };
Object.assign(all, ajax, pubsub, keys, colors, util);
for (let prop in all) sizzle[prop] = all[prop];

export default sizzle;
