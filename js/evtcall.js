// 同质资产创建
apiCaller.pushTransaction(new EVT.EvtAction("newfungible",{
    "sym": "2,YYB",
    "creator": publicKey,
    "issue": {
        "name":"issue",
        "threshold": 1,
        "authorizers": [{
            "ref": "[A] " + publicKey,
            "weight": 1
        }]
    },
    "manage": {
        "name":"manage",
        "threshold": 1,
        "authorizers": [{
            "ref": "[A] " + publicKey,
            "weight": 1
        }]
    },
    "total_supply": "100000.00 YYB"
},"fungible","YYB"))

// 同质资产发行
apiCaller.pushTransaction(
    new EVT.EvtAction("issuefungible",{
        "address": publicKey,
        "number": "100000.00 YYB",
        "memo": "hahh"
    },"fungible","YYB")
)

// FT transfer
apiCaller.pushTransaction(
new EVT.EvtAction("transferft",{
    "from": publicKey,
    "to": publicKey2,
    "number": "10.00 YYA",
    "memo": "memo"
},"fungible","YYA")
)

// 查询同质资产
apiCaller.getFungibleBalance(publicKey)


// 新建域
apiCaller.pushTransaction(
    new EVT.EvtAction("newdomain", {
        "name": "gov.china.cicc",
        "creator": publicKey,
        "issue": {
            "name": "issue",
            "threshold": 1,
            "authorizers": [{
                "ref": "[A] " + publicKey,
                "weight": 1
            }]
        },
        "transfer": {
            "name": "transfer",
            "threshold": 1,
            "authorizers": [{
                "ref": "[G] OWNER",
                "weight": 1
            }]
        },
        "manage": {
            "name": "manage",
            "threshold": 1,
            "authorizers": [{
                "ref": "[A] " + publicKey,
                "weight": 1
            }]
        }
    })
);

// 新建组
apiCaller.pushTransaction(
    new EVT.EvtAction("newgroup",{
        name:"yygroup",
        group:{
            "name": "yygroup",
            "key": publicKey,
            "root": {
                "threshold": 6,
                "nodes": [
                    {
                        "threshold": 1,
                        "weight": 3,
                        "nodes": [
                            {
                                "key": "EVT6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
                                "weight": 1
                            },
                            {
                                "key": "EVT8MGU4aKiVzqMtWi9zLpu8KuTHZWjQQrX475ycSxEkLd6aBpraX",
                                "weight": 1
                            }
                        ]
                    },
                    {
                        "key": publicKey,
                        "weight": 6
                    },
                    {
                        "threshold": 1,
                        "weight": 3,
                        "nodes": [
                            {
                                "key": "EVT6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
                                "weight": 1
                            },
                            {
                                "key": "EVT8MGU4aKiVzqMtWi9zLpu8KuTHZWjQQrX475ycSxEkLd6aBpraX",
                                "weight": 1
                            }
                        ]
                    }
                ]
            }
        }
    })
)

// Issue Tokens (NFT)
apiCaller.pushTransaction({
    "action": "issuetoken",
    "args": {
        "domain": testingTmpData.newDomainName,
        "names": [
            testingTmpData.addedTokenNamePrefix + "1",
            testingTmpData.addedTokenNamePrefix + "2",
            testingTmpData.addedTokenNamePrefix + "3"
        ],
        "owner": [
            "EVT8MGU4aKiVzqMtWi9zLpu8KuTHZWjQQrX475ycSxEkLd6aBpraX"
        ]
    }
});

// add meta
apiCaller.pushTransaction(
new EVT.EvtAction("addmeta", {
    "key": "mark",
    "value": "something",
    "creator": "[A] " + publicKey
},"ding.org",".meta")
).then(cbs)