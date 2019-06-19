import SocketController from "./data/socket-controller";
import utilsData from './data/utils-data';
import NodeCache from './common/NodeCache';
const global =  {};
global.socket = SocketController();
global.utilsData = utilsData();
global.nodeCache = NodeCache;
export default global;