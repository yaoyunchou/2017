import "./user.controller"
import { koaRouter } from '../router'

import UserController from './user.controller'
import info from './user.controller'
export default{
    bindRouters:function bindRouters(){
        koaRouter.add(UserController);
    }
}