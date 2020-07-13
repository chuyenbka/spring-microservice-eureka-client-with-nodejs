
const Eureka = require('eureka-js-client').Eureka;

const eurekaService = `http://localhost:8761/eureka`;

module.exports = {
	registerWithEureka: (appName, port) => {
		const client = new Eureka({
			instance: {
				app: appName.toUpperCase(),
				hostName: 'localhost',
				ipAddr: '127.0.0.1',
				port: {
					'$': port,
					'@enabled': 'true',
				},
				vipAddress: appName,
				dataCenterInfo: {
					"@class": `com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo`,
					name: 'MyOwn',
				},
				instanceId: `${appName}-${port}`,
				status: `UP`,
			},
			eureka: {
				host: 'localhost',
				port: 8761,
				servicePath: '/eureka/apps/'
			},
		});
		client.start();
		return client;		
	}
};