/**
 * Created by yao on 2017/6/12.
 */
import koaRouter from "./koa-router";

export function route(route, method, isAsync = true) {
    return function (target, name, descriptor) {
        setTimeout(function () {//TODO：默认类的实例化会在函数实例化之后，所有这里会加这个东东
            var prefix = target.router && target.router.prefix,
                fixed_route;
            if (route) {
                fixed_route = prefix ? `/${prefix}/${route}` : `/${route}`;
            } else {
                fixed_route = `/${prefix}`;
            }

            console.log(fixed_route);
            method = method || 'get';
            koaRouter[method](fixed_route, async function (next) {
                var result;
                try {
                    if (isAsync) {
                        result = await descriptor.value.call(this, this.params);
                    } else {
                        result = descriptor.value.call(this, this.params);
                    }
                } catch (error) {
                    console.log(error);
                    this.status = 500;
                }

                this.body = result;
                await next;
            });
            return descriptor;
        });
    }

}