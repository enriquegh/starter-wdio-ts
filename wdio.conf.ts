import { cloneCapabilities } from "./utils";

// process.env.NODE_DEBUG = "request";
const date: Date = new Date();
const NUM_OF_INSTANCES: Number = process.env.WDIO_CAP_MULTIPLIER || 5;
const baseCapability = {

    platformName:"Windows 10",
    browserName: 'googlechrome',
    browserVersion: 'latest',
    'sauce:options': {
        build: process.env.SAUCE_BUILD_NAME ? process.env.SAUCE_BUILD_NAME : `sample-wdio-ts-${date.toISOString()}`,
        tunnelIdentifier: process.env.TUNNEL_IDENTIFIER
    }
}

const config: WebdriverIO.Config  = {
    // debug: true,
    // execArgv: ['--inspect=127.0.0.1:5859'],

    runner: 'local',
    automationProtocol: 'webdriver',

    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: 'tsconfig.json'
        },
    },

    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,    
    
    specs: [
        './tests/*.ts'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 20,
    capabilities: cloneCapabilities(baseCapability, NUM_OF_INSTANCES),
    logLevel: 'debug',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 0,
    services: ['sauce'],
    framework: 'mocha',
    reporters: [
        'spec',
    ],
    
    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        timeout: 400000,
        compilers: ['ts:ts-node/register'], 
    },

}

export { config }