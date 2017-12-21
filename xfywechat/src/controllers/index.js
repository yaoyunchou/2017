import { koaRouter } from '../router'

import UserController from './user.controller'
import Infomations from './infomation.controller'
import ImageUpload from './image.controller'

export default{
    bindRouters:function bindRouters(){
        koaRouter.add(UserController);
        koaRouter.add(ImageUpload);
        koaRouter.add(Infomations);
    }
}