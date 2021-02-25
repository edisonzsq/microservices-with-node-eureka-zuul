# How To

## Requirements

This workshop requires 
- Java 8
- Maven
- Node & NPM

Before verifying each installation, re-open command line / terminal.

___

## Install Java 8

Use SDKMAN to install Java 8. Follow this [link](https://sdkman.io/install) to install SDKMAN for both Linux and Windows. Once you have installed SDKMAN, use the following commands to install Java 8.

```shell
sdk install java 8.0.282.hs
```

Verify if you have installed Java.
```shell
java --version
```

## Install Maven

Follow this [link](https://maven.apache.org/install.html) to install maven. Verify installation with:
```shell
mvn --version
```

## Install Node & NPM with Node Version Manager

- Node Version Manager for [Linux](ttps://github.com/nvm-sh/nvm)
- Node Version Manager for [Windows](https://github.com/coreybutler/nvm-windows)

Verify Node Version Manager installation

``` shell
nvm --version
```

Install Node and NPM with NVM

```shell
nvm install v14.15.4
```

Verify Node and NPM with
```shell
node --version
npm --version
```
___

## Running The Applications

Applications have to be run at this order:

1. Service Discover (EurekaApp)
2. Purchase Service (purchase-service)
3. Inventory Service (inventory-service)
4. Router (ZuulApp)

Run Service Discovery inside the project folder where EurekaApp.jar is at with:
```shell
java -jar EurekaApp.jar
```
Run Purchase Service inside the project folder "purchase-serivce" with:
``` shell
npm install
node index.js
```
Run Inventory Service inside the project folder "inventory-serivce" with:
``` shell
npm install
node index.js
```
Run Router inside the project folder where ZuulApp.jar is at with:
```shell
java -jar ZuulApp.jar
```
