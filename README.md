# tesi
le mie versioni dei proof of concept per gli exploit mostrati nella tesi

## Spring4Shell
Per il backend 
```
docker build . -t spring4shell
docker run -p 8080:8080 spring4shell
```
Per il fronted
```
npm start
```

## Django 
### SQL Injection
Per il backend
```
docker-compose build
docker-compose up -d
```
Per il frontend 
```
npm start
```
##
Per il browser usare
```
chromium-browser --disable-web-security --user-data-dir="[some directory here]"
```
