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
# 导入私钥
evtKeyProviders.import(privKey, isPayer)
evtKeyProviders.import("5KjJUS14wBNgHGRW1NYPFgfJotnS6jvwv7wzvfc75zAqfPWYmhD", true)
evtKeyProviders.import("5KjJUS14wBNgHGRW1NYPFgfJotnS6jvwv7wzvfc75zAqfPWYmhD")

# 设置payer
evtKeyProviders.setPayer("EVT85QEkmFpnDwR4NjnYenqenyCxFRQc45HwjGLNpXQQ1JuSmBzSj")

# 设置手续费上限 100000 = 1 EVT/PEVT
evtKeyProviders.setMaxCharge(100000)

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
# EVT(S#1)
evt_getFungibleSymbolDetail(1)
```

### evt_addmeta(password, abi, domain, [key])

```
# creator 可以传空字符串，接口自动计算
var abi = {key: "mark1", value: "something", creator: "[A] EVT85QEkmFpnDwR4NjnYenqenyCxFRQc45HwjGLNpXQQ1JuSmBzSj"}

# add domain meta
evt_addmeta("abcd1234", abi, "org.ding.a")

# add token meta
evt_addmeta("abcd1234", abi, "org.ding.a", "bighouse1101")

# add fungible asset meta
evt_addmeta("abcd1234", abi, ".fungible", 3)

# add group meta
evt_addmeta("abcd1234", abi, ".group", "csgroup1")
```

### evt2pevt

```
evt_evt2pevt("abcd1234", {from: wallets.evt.getAddresses()[0], to: wallets.evt.getAddresses()[0], number: "1.00000 S#1", memo:""})
```

### Fungible asset

创建同质资产，特殊用法 issue="creator" | manage="creator" | transfer="owner"

```
permission_def = {
    "name": `permission_name`,
    "threshold": `uint32`,
    "authorizers", `authorizer_weight[]`
}
var dataUrl = "data:image/gif;base64,R0lGODlhAwADAIAAAP///8zMzCH5BAAAAAAALAAAAAADAAMAAAIEBHIJBQA7"
evt_newfungible("1231456", "100000.0000 S#3", "CNY", "china-yuan", {issue: `permission_def`, manage: `permission_def`}, dataUrl)
```

#### 编辑
```
evt_updfungible("1231456", 1, {issue: `permission_def`, manage: `permission_def`})
```

#### 发行

```
evt_issuefungible('abcd1234', {address: publicKey, number: "10.00000 S#1",memo: "memo"})
```

#### 转移

```
evt_transferft("abcd1234", {from: publicKey, to: publicKey2, number: "10.00 S#3", memo: "memo"})
```

#### 转账记录
```
evt_getFungibleActionsByAddress(3, "EVT85QEkmFpnDwR4NjnYenqenyCxFRQc45HwjGLNpXQQ1JuSmBzSj", 0, 10)
// returns
[
    { 
        createdAt: "2018-08-14T01:44:56.163", 
        action: "everipay|issuefungible|transferft", 
        to: "EVT6x6a9HXGxLuSJfjfrGwikA8zswAe6z2Y…", 
        from: "EVT85QEkmFpnDwR4NjnYenqenyCxFRQc45H…", 
        number: "0.00100 S#1", 
        trxId: "2709cec895b279c1481866caf73838673f2…" 
    }
]
```

### Non-Fungible Tokens

#### 创建域

```
permission_def = {
    "name": `permission_name`,
    "threshold": `uint32`,
    "authorizers", `authorizer_weight[]`
}
evt_newdomain("123456", "org.ding.a", {issue: `permission_def`, transfer: `permission_def`,  manage: `permission_def`})

#  domain info
evt_getDomainDetail("org.ding.a")
```

#### 编辑域
```
evt_updatedomain("123456", "org.ding.a", {issue: `permission_def`, manage: `permission_def`})
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

# create group
evt_newgroup(password, group)

# update my group
evt_updategroup(password, group)

# group info
evt_getGroupDetail("testgroup")

# check is have die node
isValidGroupDef(group)
```

#### 发行tokens

```
# issue
evt_issuetoken("123456", "org.ding.a", ["token1","token2"], ["EVT85QEkmFpnDwR4NjnYenqenyCxFRQc45HwjGLNpXQQ1JuSmBzSj"])

# token info
evt_getToken("org.ding.a", "token1")

# destroy token
evt_destroytoken("abcd1234", "org.ding.a", "token1")
```

#### Tokens transfer(password, abi)

```
var abi = {domain: "org.ding.a", name: "token_name", to: ["address"], memo: "string"}
evt_transfer(password, abi)
```

#### evt_nftTransferLogs(domain, name, skip, take)
```
evt_nftTransferLogs("org.ding.assets","big-house-1101")
# return
[
    {
	    "createdAt": "2018-08-10T10:00:30.000",
	    "to": ["EVT7ECiv81CWpP3CSkvCUNKCSQ8JQRgRro9AubK6Yg9Gz1vo78d1R"],
	    "trxId": "9fc80ab16f47d3e1ac03c8c9c37b0334bd6ccad51a04ba0207155111430bac4e"
    }
]
```


### everiPass & everiPay
> open evtLink.html

```
evtLink(qrType, qrParams, [imgPrams])

# get linkId
evtGetUniqueLinkId()

# everiPass
evtLink("everiPass", {
    linkId: "5ccf0b74ce77662ec5995fa6a8d96481",
    keyProvider: [ "5JgWJptxZENHR69oZsPSeVTXScRx7jYPMTjPTKAjW2JFnjEhoDZ", "5JgWJptxZENHR69oZsPSeVTXScRx7jYPMTjPTKAjW2JFnjEhoDZ"],
    domainName: "testdomain",
    tokenName: "testtoken",
    autoDestroying: true}
)

# everiPay 1.00000 EVT
evtLink("everiPay", {
    linkId: "5ccf0b74ce77662ec5995fa6a8d96481",
    keyProvider: [ "5JgWJptxZENHR69oZsPSeVTXScRx7jYPMTjPTKAjW2JFnjEhoDZ"],
    symbol: 1,
    maxAmount: 100000}
)
```

### everiPass & everiPay scan QrCode

#### getQrCodeAction
```
// everiPay/everiPass/payeecode QrCode link string
var linkText="0UKDR:WEEHI-67JCZC0326W0O1DRQ$$DW:P*P*MH53USKIS2F_QUM0N-JZOSB+YHN1AB4HRJNATYB1AJ2Q$Z7TV6JW:E$S-1V167JKLF71TUOE:QR*$0O43FN8:XYLFZFUL5LH2HWND4XMHN/V"
evtGetEvtLinkAction(linkText)

// get payeecode
evt_payeeCode("EVT6x6a9HXGxLuSJfjfrGwikA8zswAe6z2Yg7GpyKzM8EX244P5Rb")

// everiPay return
{"func":"everiPay","timestamp":1534216223,"arg1":"1","arg2":"100000"}
// everiPass return
{"func":"everiPass","timestamp":1534216223,"arg1":"domain name","arg2":"token name"}
// payeecode return
{"func":"payeecode","timestamp":0,"arg1":"EVT85QEkmFpnDwR4NjnYenqenyCxFRQc45HwjGLNpXQQ1JuSmBzSj","arg2":""}

// json string QrCode
{"func":"eth_address","timestamp":0,"arg1":"0x627306090abaB3A6e1400e9345bC60c78a8BEf57","arg2":"ETH"}
```

#### evt_everiPay
```
var abi = {
    link:"0UKDR:WV4KRJQ/42B860L$UYH:/75JKD4A2-K/*ZDFY*+A-2E_QSGGWZHGH1XK2//M:V84S$/82BFX+U8WZKI88KUP9UYB3IJK4OMQ2X:ZO:CMWCA3WAV8*C5TOY7ZR42Z2:8QWHQ*3N8-J27J",
    payee:"EVT6x6a9HXGxLuSJfjfrGwikA8zswAe6z2Yg7GpyKzM8EX244P5Rb", 
    number:"0.00100 S#1"
}
evt_everiPay("abcd1234", abi)
```

#### evt_everiPass
```
evt_everiPass("abcd1234", {link:"0L4*EOE+62QWTNEZH3YTOQTJ5NEPU5G*IYX33-/C-H:BB7_P-LYB*HA90J+B+3Z/SPA4TARHA*T6RUS4$/EKQ4O8MJ:NPH9M**W1/ENB+FG*IVVUKY*F72S1*F9SM09T3Y5IUW7ZI1IR-6Z"})
```

#### everiPay/everiPass check result

## ETH 功能接口

### 设置节点
```
# must make eth type wallet first!!!
setWeb3Provider("HTTP://192.168.1.69:7545")
```

### 查询 BaseCoin 余额
```
eth_getBalance("0x627306090abaB3A6e1400e9345bC60c78a8BEf57")
```

### 查询 Tokens Balance
```
eth_tokenBalance("0x627306090abaB3A6e1400e9345bC60c78a8BEf57", ["0x345cA3e014Aaf5dcA488057592ee47305D9B3e10"])
# returns
[{address:"0x345cA3e014Aaf5dcA488057592ee47305D9B3e10", value:"999900"}]
```

### 转账 ETH eth_sendTransaction(password, txParams)
```
var txParams = {
    from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
    to: "0xf17f52151EbEF6C7334FAD080c5704D77216b732", 
    value: "1000000000000000000", // = 1 ETH 
    gasPrice: "18000000000", // wei
    gas: 50000
}
eth_sendTransaction("abcd1234", txParams)
```

### ERC20 合约调用 eth_contractCall(where, args, txParams)

```
# where
var where = {
    address: "0x345cA3e014Aaf5dcA488057592ee47305D9B3e10", // Token 合约地址
    method: "balanceOf", // 合约方法
    password: "password" // eth 钱包密码 查询类可以省略。
}

# where.method input args list
var args = ["0x627306090abaB3A6e1400e9345bC60c78a8BEf57"]

# txParams 交易对象
var txParams = {
    from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
    value: "0", 
    gasPrice: "10000000", 
    gas: 50000
}

# 调用合约 transfer 方法 
eth_contractCall(
    {address:"0x345cA3e014Aaf5dcA488057592ee47305D9B3e10", method:"transfer", password: "abcd1234"},
    ["0xf17f52151EbEF6C7334FAD080c5704D77216b732", "100"], 
    {from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57", gasPrice: "10000000", gas:50000}
)

return txHash
```

### eth_getTransaction(trx_id)
```

# result
{
    hash:"0x528c68307df8baf6409d487a0f3decc5eb106356b2db02811e3b8775968da1e0",
    nonce:4,
    blockHash:"0x457588687a09656a3ec2f43ca8923ea695532b677e1b732057c5c747583eedfb",
    blockNumber:5,
    transactionIndex:0,
    from:"0x627306090abab3a6e1400e9345bc60c78a8bef57",
    to:"0xf17f52151ebef6c7334fad080c5704d77216b732",
    value:"1000000000000000000",
    gas:50000,
    gasPrice:"18000000000",
    input:"0x0"
}
```

### eth_getTransactionReceipt(trx_id)
```
# result 0|1
```