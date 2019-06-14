import SocketController from "./data/socket-controller";
import utilsData from './data/utils-data';
const global =  {};
global.socket = SocketController();
global.utilsData = utilsData();
export default global;