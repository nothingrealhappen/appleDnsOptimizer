# iOS App Store 域名优化工具

## 原理

通过拿到你所在地区最佳的 iosapps.itunes.apple.com DNS 解析结果来帮助你优化 App Store 下载速度。

## 使用步骤

### 申请 API Key

该工具的第一步是通过 [boce](https://www.boce.com) 的 DNS 服务拿到全国各地对于 iosapps.itunes.apple.com DNS 的优化结果，因此需要一个 boce 服务的 API key，免费额度应该就够用了。

### 根目录创建 .env 并且填写你申请好的 boce api key

```
cp .env.sample .env
// update .env content
```

### 运行该工具

```
yarn
node ./index.js
```

### 根据工具的结果修改你的路由器 DNS 地址

Sample output

```
Top 10 records suggested for iosapps.itunes.apple.com is:
电信-中国青海海西蒙古族藏族自治州 - 110.167.162.1 - 14.998ms
联通-中国河南济源 - 42.225.101.5 - 15.029ms
电信-中国青海海西蒙古族藏族自治州 - 110.167.162.2 - 15.289ms
移动-中国四川甘孜藏族自治州 - 112.45.28.15 - 15.562ms
电信-中国湖北武汉 - 116.211.220.217 - 15.921ms
电信-中国湖北武汉 - 116.211.220.222 - 15.930ms
联通-中国湖北武汉 - 218.104.106.196 - 16.055ms
电信-中国宁夏银川 - 222.75.61.242 - 16.387ms
电信-中国湖北武汉 - 119.96.249.134 - 16.772ms
电信-中国湖北武汉 - 119.96.18.231 - 16.859ms
```

## 更改 iPhone 的 DNS 设置

如果你已经找到了最快的 ip 那下一步就是让手机解析 iosapps.itunes.apple.com 到该 ip 上。有两种比较简单可行的办法：

### 在路由器上进行域名劫持

该办法简单快速，适合了解路由器操作以及路由器有域名劫持功能的情况。路由器域名劫持可以在[这篇文章](https://www.right.com.cn/forum/thread-794878-1-1.html)找到办法。

路由器劫持会影响局域网内所有用户，所以如果服务器产生异常等记得及时维护该域名劫持地址。

### 本地搭建 dnsmasq

如果你的路由器没有域名劫持功能或者你没有路由器的管理权限，那本地搭建一个 dnsmasq 然后手机手动指定 DNS 服务器也是一个将就的办法。

#### 本机启动 dnsmasq 服务器

```
cd docker
vi ./dnsmasq.conf // 修改解析地址到你发现的认为合适的地址（通常是最快，离你最近且最好是大城市的 IP）
docker-compose up
```

#### 指定手机端段 IP 到本地搭建的 dnsmasq

```
ifconfig | grep 192 // 找到你电脑本机 IP
```

[修改 iOS 的 DNS 地址](https://www.163.com/dy/article/HDPCEFPM0552EMP9.html)
