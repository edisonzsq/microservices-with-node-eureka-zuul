const request = require('request');
const ip = require('ip');

const eurekaService = 'http://localhost:1010/eureka';

/**
 * This helper class registers this node instance to Service Discovery,
 * and continues to send heartbeat signal at an interval.
 * 
 * In an actual production scenario, there should be additional step to
 * re-connect to Service Discovery when not disconnected.
 */
module.exports = {
   registerWithEureka: (appName, port) => {
       console.log(`Registering ${appName} with Eureka`);
       request.post({
           headers: {'content-type': 'application/json'},
           url: `${eurekaService}/apps/${appName}`,
           body: JSON.stringify({
               instance: {
                   hostName: `localhost`,
                   instanceId: `${appName}-${port}`,
                   vipAddress: `${appName}`,
                   app: `${appName.toUpperCase()}`,
                   ipAddr: ip.address(),
                   status: `UP`,
                   port: {
                       $: port,
                       "@enabled": true
                   },
                   dataCenterInfo: {
                       "@class": `com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo`,
                       name: `MyOwn`
                   }
               }
           })
       },
       (error, response, body) => {
           if(!error) {
               console.log(`Registered with Eureka.`);
               setInterval(() => {
                   request.put({
                       headers: {'content-type': 'application/json'},
                       url: `${eurekaService}/apps/${appName}/${appName}-${port}`
                   }, (error, response, body => {
                       if (error) {
                           console.log('Sending heartbeat to Eureka failed.');
                       } else {
                           console.log('Successfully sent heartbeat to Eureka.');
                       }
                   }));
               }, 15 * 1000);
      
           } else {
               console.log(`Not registered with eureka due to: ${error}`);
           }
       });
   }
};