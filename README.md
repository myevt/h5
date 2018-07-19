# EVT 混合程序

## 公用方法

### 创建助记词钱包
```
createHDkey({type:"evt",seedPhrase:"candy maple cake sugar pudding cream honey rich smooth crumble sweet treat",hdPathString:"m/44'/60'/0'/0",password:"abcd1234"})
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

### Fungible asset

创建同质资产，特殊用法 `permission_def`="creator"|"owner"
```
permission_def = {
    "name": `permission_name`,
    "threshold": `uint32`,
    "authorizers", `authorizer_weight[]`
}
evt_newfungible("1231456", "100000.0000 EVT", {issue:`permission_def`,transfer::`permission_def`,manage::`permission_def`})
```

发行
```
evt_issuefungible('abcd1234', {address: publicKey, number: "10.00000 EVT",memo: "memo"})
```

转移
```
evt_transferft("abcd1234", {from: publicKey, to: publicKey2, number: "10.00 YYA", memo: "memo"})
```
