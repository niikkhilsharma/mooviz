# => Based On Stalker Portal

    Host = "http://scarnet.xyz:8880/c/"
    mac = "00:1A:79:4A:58:60"

## 1

GET /server/load.php?type=stb&action=handshake&token=&JsHttpRequest=1-xml HTTP/1.1
Cookie: timezone=GMT; stb*lang=en; mac=00:1A:79:4A:58:60
Referer: http://scarnet.xyz:8880/c/
Accept: */\_
User-Agent: Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3
X-User-Agent: Model: MAG250; Link: WiFi
Host: scarnet.xyz:8880
Connection: close
Accept-Encoding: gzip, deflate

## 2

curl -i -s -k -X $'GET' \
 -H $'Referer: http://scarnet.xyz:8880/c/' -H $'Accept: _/_' -H $'User-Agent: Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3' -H $'X-User-Agent: Model: MAG250; Link: WiFi' -H $'Authorization: Bearer null' -H $'Host: scarnet.xyz:8880' -H $'Connection: close' -H $'Accept-Encoding: gzip, deflate' \
 -b $'timezone=GMT; stb_lang=en; mac=00:1A:79:4A:58:60' \
 $'http://scarnet.xyz:8880/server/load.php?type=itv&action=get_epg_info&period=24&JsHttpRequest=1-xml'

## 3

GET /server/load.php?type=stb&action=get*profile&hd=1&ver=ImageDescription%3A%200.2.18-r14-pub-250%3B%20ImageDate%3A%20Fri%20Jan%2015%2015%3A20%3A44%20EET%202016%3B%20PORTAL%20version%3A%205.1.0%3B%20API%20Version%3A%20JS%20API%20version%3A%20328%3B%20STB%20API%20version%3A%20134%3B%20Player%20Engine%20version%3A%200x566&num_banks=2&sn=9FCB689D1E347&stb_type=MAG250&image_version=218&video_out=hdmi&device_id=&device_id2=&signature=&auth_second_step=1&hw_version=1.7-BD-00&not_valid_token=0&client_type=STB&hw_version_2=9fcb689d1e3475201a8b2276eebc3add&timestamp=1673290205&api_signature=263&metrics=%7B%22mac%22%3A%2200%3A1A%3A79%3A4A%3A58%3A60%22%2C%22sn%22%3A%229FCB689D1E347%22%2C%22model%22%3A%22MAG250%22%2C%22type%22%3A%22STB%22%2C%22uid%22%3A%22%22%2C%22random%22%3A%225ea743407cf1dd5e3fe1e89d6c15f0d0%22%7D&JsHttpRequest=1-xml HTTP/1.1
Cookie: timezone=GMT; stb_lang=en; mac=00:1A:79:4A:58:60
Referer: http://scarnet.xyz:8880/c/
Accept: */\_
User-Agent: Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3
X-User-Agent: Model: MAG250; Link: WiFi
Authorization: Bearer 02A32019A42A7D98DB6F3546A9472C0B
Host: scarnet.xyz:8880
Connection: close
Accept-Encoding: gzip, deflate

## 4

GET /server/load.php?type=itv&action=get*genres&JsHttpRequest=1-xml HTTP/1.1
Cookie: timezone=GMT; stb_lang=en; mac=00:1A:79:4A:58:60
Referer: http://scarnet.xyz:8880/c/
Accept: */\_
User-Agent: Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3
X-User-Agent: Model: MAG250; Link: WiFi
Authorization: Bearer 02A32019A42A7D98DB6F3546A9472C0B
Host: scarnet.xyz:8880
Connection: close
Accept-Encoding: gzip, deflate

## 5

GET /server/load.php?type=stb&action=get*profile&hd=1&ver=ImageDescription%3A%200.2.18-r14-pub-250%3B%20ImageDate%3A%20Fri%20Jan%2015%2015%3A20%3A44%20EET%202016%3B%20PORTAL%20version%3A%205.1.0%3B%20API%20Version%3A%20JS%20API%20version%3A%20328%3B%20STB%20API%20version%3A%20134%3B%20Player%20Engine%20version%3A%200x566&num_banks=2&sn=9FCB689D1E347&stb_type=MAG250&image_version=218&video_out=hdmi&device_id=&device_id2=&signature=&auth_second_step=1&hw_version=1.7-BD-00&not_valid_token=0&client_type=STB&hw_version_2=9fcb689d1e3475201a8b2276eebc3add&timestamp=1673290329&api_signature=263&metrics=%7B%22mac%22%3A%2200%3A1A%3A79%3A4A%3A58%3A60%22%2C%22sn%22%3A%229FCB689D1E347%22%2C%22model%22%3A%22MAG250%22%2C%22type%22%3A%22STB%22%2C%22uid%22%3A%22%22%2C%22random%22%3A%22784907d06bc2f55ce13b710f0bae22c7%22%7D&JsHttpRequest=1-xml HTTP/1.1
Cookie: timezone=GMT; stb_lang=en; mac=00:1A:79:4A:58:60
Referer: http://scarnet.xyz:8880/c/
Accept: */\_
User-Agent: Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3
X-User-Agent: Model: MAG250; Link: WiFi
Authorization: Bearer 5E5F9E4CC7F615B7D65666217D08B2E6
Host: scarnet.xyz:8880
Connection: close
Accept-Encoding: gzip, deflate

## 6

GET /server/load.php?type=itv&action=get*genres&JsHttpRequest=1-xml HTTP/1.1
Cookie: timezone=GMT; stb_lang=en; mac=00:1A:79:4A:58:60
Referer: http://scarnet.xyz:8880/c/
Accept: */\_
User-Agent: Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3
X-User-Agent: Model: MAG250; Link: WiFi
Authorization: Bearer 5E5F9E4CC7F615B7D65666217D08B2E6
Host: scarnet.xyz:8880
Connection: close
Accept-Encoding: gzip, deflate

## 7

GET /server/load.php?type=itv&action=get*ordered_list&genre=23&force_ch_link_check=&p=13&JsHttpRequest=1-xml HTTP/1.1
Cookie: timezone=GMT; stb_lang=en; mac=00:1A:79:4A:58:60
Referer: http://scarnet.xyz:8880/c/
Accept: */\_
User-Agent: Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3
X-User-Agent: Model: MAG250; Link: WiFi
Authorization: Bearer 3CC0B2AF380CBA68D23E2363D685066B
Host: scarnet.xyz:8880
Connection: close
Accept-Encoding: gzip, deflate

## 8 Play

GET /portal.php?type=itv&action=create*link&forced_storage=undefined&download=0&cmd=ffmpeg%20http%3A%2F%2Flocalhost%2Fch%2F862743* HTTP/1.1
User-Agent: Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3
Referrer: http://scarnet.xyz:8880/c/
X-User-Agent: Model: MAG250; Link: WiFi
Cache-Control: no-cache
Authorization: Bearer 9F22E8D3185090CF3D3C085AD84839EA
Host: scarnet.xyz:8880
Cookie: mac=00%3A1A%3A79%3A4A%3A58%3A60; stb_lang=en; timezone=Europe%2FParis
Connection: close
Accept-Encoding: gzip, deflate

GET /play/live.php?mac=00:1A:79:4A:58:60&stream=862743&extension=ts HTTP/1.1
User-Agent: Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3
Accept-Encoding: gzip, deflate
Host: scarnet.xyz:8880
Connection: close

# Movies

## 1

GET /portal.php?type=vod&action=get_categories HTTP/1.1
User-Agent: Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3
Referrer: http://scarnet.xyz:8880/c/
X-User-Agent: Model: MAG250; Link: WiFi
Cache-Control: no-cache
Authorization: Bearer 9F22E8D3185090CF3D3C085AD84839EA
Host: scarnet.xyz:8880
Cookie: mac=00%3A1A%3A79%3A4A%3A58%3A60; stb_lang=en; timezone=Europe%2FParis
Connection: close
Accept-Encoding: gzip, deflate

## 2

GET /portal.php?type=vod&action=get_ordered_list&category=72&movie_id=0&season_id=0&episode_id=0&p=1&sortby=added HTTP/1.1
User-Agent: Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3
Referrer: http://scarnet.xyz:8880/c/
X-User-Agent: Model: MAG250; Link: WiFi
Cache-Control: no-cache
Authorization: Bearer 9F22E8D3185090CF3D3C085AD84839EA
Host: scarnet.xyz:8880
Cookie: mac=00%3A1A%3A79%3A4A%3A58%3A60; stb_lang=en; timezone=Europe%2FParis
Connection: close
Accept-Encoding: gzip, deflate

## 3

GET /portal.php?type=vod&action=create_link&cmd=eyJ0eXBlIjoibW92aWUiLCJzdHJlYW1faWQiOiI4ODU2MTUiLCJzdHJlYW1fc291cmNlIjpudWxsLCJ0YXJnZXRfY29udGFpbmVyIjoiW1wibWt2XCJdIn0%3D HTTP/1.1
User-Agent: Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3
Referrer: http://scarnet.xyz:8880/c/
X-User-Agent: Model: MAG250; Link: WiFi
Cache-Control: no-cache
Authorization: Bearer 9F22E8D3185090CF3D3C085AD84839EA
Host: scarnet.xyz:8880
Cookie: mac=00%3A1A%3A79%3A4A%3A58%3A60; stb_lang=en; timezone=Europe%2FParis
Connection: close
Accept-Encoding: gzip, deflate

# Series

## 1

GET /portal.php?type=series&action=get_categories HTTP/1.1
User-Agent: Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3
Referrer: http://scarnet.xyz:8880/c/
X-User-Agent: Model: MAG250; Link: WiFi
Cache-Control: no-cache
Authorization: Bearer 9F22E8D3185090CF3D3C085AD84839EA
Host: scarnet.xyz:8880
Cookie: mac=00%3A1A%3A79%3A4A%3A58%3A60; stb_lang=en; timezone=Europe%2FParis
Connection: close
Accept-Encoding: gzip, deflate

## 3

GET /portal.php?type=series&action=get_ordered_list&category=342&movie_id=16810%3A16810&season_id=&episode_id=&p=0&sortby=added HTTP/1.1
User-Agent: Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3
Referrer: http://scarnet.xyz:8880/c/
X-User-Agent: Model: MAG250; Link: WiFi
Cache-Control: no-cache
Authorization: Bearer B3FECF9636148E4BA6328E10F0055C66
Host: scarnet.xyz:8880
Cookie: mac=00%3A1A%3A79%3A4A%3A58%3A60; stb_lang=en; timezone=Europe%2FParis
Connection: close
Accept-Encoding: gzip, deflate

## 4

GET /portal.php?type=vod&action=create_link&cmd=eyJzZXJpZXNfaWQiOjE2ODEwLCJzZWFzb25fbnVtIjoxLCJ0eXBlIjoic2VyaWVzIn0%3D&series=6 HTTP/1.1
User-Agent: Mozilla/5.0 (QtEmbedded; U; Linux; C) AppleWebKit/533.3 (KHTML, like Gecko) MAG200 stbapp ver: 2 rev: 250 Safari/533.3
Referrer: http://scarnet.xyz:8880/c/
X-User-Agent: Model: MAG250; Link: WiFi
Cache-Control: no-cache
Authorization: Bearer B3FECF9636148E4BA6328E10F0055C66
Host: scarnet.xyz:8880
Cookie: mac=00%3A1A%3A79%3A4A%3A58%3A60; stb_lang=en; timezone=Europe%2FParis
Connection: close
Accept-Encoding: gzip, deflate
