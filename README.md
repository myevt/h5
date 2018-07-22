# EVT 混合程序

## 公用方法

### 创建助记词钱包
```
createHDkey({type:"evt",seedPhrase:"candy maple cake sugar pudding cream honey rich smooth crumble sweet treat",hdPathString:"m/44'/207'/0'/0",password:"abcd1234"})
```

### 生成助记词
导入助记词从用户端获取
```
generateMnemonic()
```

### 导出钱包助记词
```
exportMnemonic(password, ksName)
```

### 实例化钱包
#### 用于 createHDkey 创建的助记词钱包
```
initHDkey(ks)
```
#### 私钥钱包实例化
用于导入的私钥钱包和kestore
```
initPrivkeyWallet(ks, type)
```

### keystore

#### 导入
```
importKeystore(password, ks)
```
#### 导出实例化过的钱包
```
exportKeystore(password, ksName)
```

### 私钥钱包
导入私钥钱包
```
initPrivkey(privKey, password, type)
```
#### 导出已实例化钱包的私钥
```
exportPrivatekey(password, ksName)
```

### 钱包密码检查
```
checkWalletPassword(password, ks)
```

## EVT 功能接口

### 同步多签导入器

#### evtKeyProviders
```
# 导入
evtKeyProviders.import(privKey, publicKey)

# 导出地址
evtKeyProviders.addresses()
return ["EVT85QEkmFpnDwR4NjnYenqenyCxFRQc45HwjGLNpXQQ1JuSmBzSj"]
```

### 查询类

get Fungible Balances
```
evt_getFungibleBalance(publicKey)
```

get Managed Groups
```
evt_getManagedGroups(publicKey)
```

get Created Domains
```
evt_getCreatedDomains(publicKey)
```

get Owned Tokens
```
evt_getOwnedTokens(publicKey)
```

get Fungible Symbol Detail
```
evt_getFungibleSymbolDetail("EVT")
```

### evt_addmeta(password, abi, domain, [key])

```
var abi = {key: "mark1", value: "something", creator: "[A] EVT85QEkmFpnDwR4NjnYenqenyCxFRQc45HwjGLNpXQQ1JuSmBzSj"}

# add domain meta
evt_addmeta("abcd1234", abi, "org.ding.a")

# add token meta
evt_addmeta("abcd1234", abi, "org.ding.a", "bighouse1101")

# add fungible asset meta
evt_addmeta("abcd1234", abi, ".fungible", "CSB")

# add group meta
evt_addmeta("abcd1234", abi, ".group", "csgroup1")
```

### evt2pevt

```
evt_evt2pevt("abcd1234", {from: wallets.evt.getAddresses()[0], to: wallets.evt.getAddresses()[0], number: "1.00000 EVT", memo:""})
```

### Fungible asset

创建同质资产，特殊用法 issue="creator" | manage="creator" | transfer="owner"

```
permission_def = {
    "name": `permission_name`,
    "threshold": `uint32`,
    "authorizers", `authorizer_weight[]`
}
evt_newfungible("1231456", "100000.0000 EVT", {issue: `permission_def`, transfer: `permission_def`,manage: `permission_def`})
```

发行

```
var dataUrl = "data:image/gif;base64,R0lGODlhAwADAIAAAP///8zMzCH5BAAAAAAALAAAAAADAAMAAAIEBHIJBQA7"
evt_issuefungible('abcd1234', {address: publicKey, number: "10.00000 EVT",memo: "memo"}, dataUrl)
```

转移

```
evt_transferft("abcd1234", {from: publicKey, to: publicKey2, number: "10.00 YYA", memo: "memo"})
```

### Non-Fungible Tokens

#### 创建域

```
permission_def = {
    "name": `permission_name`,
    "threshold": `uint32`,
    "authorizers", `authorizer_weight[]`
}
evt_newdomain("123456", "org.ding.a", {issue: `permission_def`, manage: `permission_def`})

#  domain info
evt_getDomainDetail("org.ding.a")
```

#### 创建组
evt_newgroup(password, group)

group example:
```
{
    "name": "testgroup",
    "key": "EVT5RsxormWcjvVBvEdQFonu5RNG4js8Zvz9pTjABLZaYxo6NNbSJ",
    "root": {
        "threshold": 6,
        "weight": 0,
        "nodes": [{
                "threshold": 1,
                "weight": 3,
                "nodes": [{
                        "key": "EVT6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
                        "weight": 1
                    }, {
                        "key": "EVT8MGU4aKiVzqMtWi9zLpu8KuTHZWjQQrX475ycSxEkLd6aBpraX",
                        "weight": 1
                    }
                ]
            }, {
                "key": "EVT8MGU4aKiVzqMtWi9zLpu8KuTHZWjQQrX475ycSxEkLd6aBpraX",
                "weight": 3
            }, {
                "threshold": 1,
                "weight": 3,
                "nodes": [{
                        "key": "EVT6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
                        "weight": 1
                    }, {
                        "key": "EVT8MGU4aKiVzqMtWi9zLpu8KuTHZWjQQrX475ycSxEkLd6aBpraX",
                        "weight": 1
                    }
                ]
            }
        ]
    }
}

evt_newgroup(password, group)

# group info
evt_getGroupDetail("testgroup")
```

#### 发行tokens

```
evt_issuetoken("123456", "org.ding.a", ["token1","token2"], ["EVT85QEkmFpnDwR4NjnYenqenyCxFRQc45HwjGLNpXQQ1JuSmBzSj"])
```


### everiPass & everiPay
> open evtLink.html

```
evtLink(qrType, qrParams, [imgPrams])

# everiPass
evtLink("everiPass", { 
    keyProvider: [ "5JgWJptxZENHR69oZsPSeVTXScRx7jYPMTjPTKAjW2JFnjEhoDZ", "5JgWJptxZENHR69oZsPSeVTXScRx7jYPMTjPTKAjW2JFnjEhoDZ"],
    domainName: "testdomain",
    tokenName: "testtoken",
    autoDestroying: true}
)

# everiPay 1.00000 EVT
evtLink("everiPass", {
    keyProvider: [ "5JgWJptxZENHR69oZsPSeVTXScRx7jYPMTjPTKAjW2JFnjEhoDZ"],
    symbol: "5,EVT",
    maxAmount: 100000}
)
```