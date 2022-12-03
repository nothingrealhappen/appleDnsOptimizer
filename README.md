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
