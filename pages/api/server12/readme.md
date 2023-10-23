Voot Server APIs

---

Search Api(Query in Raw Data)>>

URL >> https://jn1rdqrfn5-3.algolianet.com/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(3.33.0)%3B%20Browser&x-algolia-application-id=JN1RDQRFN5&x-algolia-api-key=e426ce68fbce6f9262f6b9c3058c4ea9

Raw Data >> {"requests":[{"indexName":"prod_voot_v4_elastic_jio","params":"query=motupatlu&hitsPerPage=20&page=0&filters=availability.available.IN.from%20%3C%201672767994%20AND%20availability.available.IN.to%20%3E%201672767994"}]}

content-type >> application/x-www-form-urlencoded

---

Stream Api (By Video Id )

URL >> https://wapi.voot.com/ws/ott/getMediaInfo.json?platform=Web&pId=2&mediaId=837874

---

https://psapi.voot.com/jio/voot/v1/voot-web/content/query/asset-details?&ids=include:2114133&responseType=common

---

https://recapiv3-jio.voot.com/voot/v1/voot-web/watchnow?id=2114133&responseType=common

headers :{
"content-version": "V5",
}
