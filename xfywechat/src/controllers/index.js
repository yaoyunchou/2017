import "./user.controller"
import { koaRouter } from '../router'

import UserController from './user.controller'
import Infomations from './infomation.controller'

export default{
    bindRouters:function bindRouters(){
        koaRouter.add(UserController);
        koaRouter.add(Infomations);
    }
}