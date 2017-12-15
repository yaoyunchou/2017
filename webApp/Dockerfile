FROM node:latest

# Create app directory
#设置工作目录
WORKDIR /usr/src/node

#复制所有文件到 工作目录。
COPY . /usr/src/node

#编译运行node项目，使用npm安装程序的所有依赖,利用taobao的npm安装


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 6000
CMD [ "npm", "start" ]
