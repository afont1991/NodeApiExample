#!/bin/bash
rm -rf subscriberserver
git clone git@bitbucket.org:intrex/subscriberserver.git
cd subscriberserver/
echo $'DB_NAME=RexSubscriberDevDB\nDB_HOSTNAME=rexsubscriber.cguqb9adh2st.us-east-2.rds.amazonaws.com\nDB_USERNAME=rexsubscriber\nDB_PASSWORD=zfSnCyFs6kEU\nDB_PORT=5432\nPORT=8888\n' >.env
npm install
./node_modules/.bin/forever start -c "./node_modules/.bin/babel-node --presets es2015 server.js" ./
