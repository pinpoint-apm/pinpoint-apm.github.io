---
title: Installation
keywords: pinpoint, pinpoint homepage, install, start, installation
last_updated: Feb 1, 2018
sidebar: mydoc_sidebar
permalink: installation.html
disqus: false
---

# Installation guide

To set up your very own Pinpoint instance you can either **download the build results** from our [**latest release**](https://github.com/pinpoint-apm/pinpoint/releases/latest), or manually build from your Git clone. In order to run your own Pinpoint instance, you will need to run below components:

* **HBase** (for storage)
* **Pinpoint Collector** (deployed on a web container)
* **Pinpoint Web** (deployed on a web container)
* **Pinpoint Agent** (attached to a java application for profiling)

To try out a simple quickstart project, please refer to the [quick-start guide](./quickstart/README.md).

### Apple silicon(M1/M2) build failures
If an error `protoc-gen-grpc-java-1.49.2-osx-aarch_64.exe: program not found or is not executable` occurs in the Apple silicon Mac (M1/M2) development environment, it has to install Rosetta.
```
$> softwareupdate --install-rosetta --agree-to-license
```

## Quick Overview of Installation

1. HBase ([details](installation.md#1-hbase))
   1. Set up HBase cluster - [Apache HBase](http://hbase.apache.org)
   2. Create HBase Schemas - feed `/scripts/hbase-create.hbase` to hbase shell.
2. Build Pinpoint (Optional)([details](installation.md#2-building-pinpoint-optional)) - No need if you use the binaries.([here](https://github.com/pinpoint-apm/pinpoint/releases)).
   1. Clone Pinpoint - `git clone $PINPOINT_GIT_REPOSITORY`
   2. Set JAVA\_HOME environment variable to JDK 8 home directory.
   3. Set JAVA\_8\_HOME environment variable to JDK 8 home directory.
   4. Set JAVA\_11\_HOME environment variable to JDK 11 home directory.
   5. Set JAVA\_17\_HOME environment variable to JDK 17 home directory.
   6. Run `./mvnw clean install -DskipTests=true` (or `./mvnw.cmd` for Windows)
3.  Pinpoint Collector ([details](installation.md#3-pinpoint-collector)) 1. Start _pinpoint-collector-boot-$VERSION.jar_ with java -jar command.

    ```
     java -jar -Dpinpoint.zookeeper.address=localhost pinpoint-collector-boot-$VERSION.jar
    ```

    1. It will start with default settings. To learn more about default values or how to override them, please see the details below.
4.  Pinpoint Web ([details](installation.md#4-pinpoint-web)) 1. Start _pinpoint-web-boot-$VERSION.jar_ with java -jar command.

    ```
     java -jar -Dpinpoint.zookeeper.address=localhost pinpoint-web-boot-$VERSION.jar
    ```

    1. It will start with default settings. To learn more about default values or how to override them, please see the details below.
5. Pinpoint Agent ([details](installation.md#5-pinpoint-agent))
   1. Extract/move _pinpoint-agent/_ to a convenient location (`$AGENT_PATH`).
   2. Set `-javaagent:$AGENT_PATH/pinpoint-bootstrap-$VERSION.jar` JVM argument to attach the agent to a java application.
   3. Set `-Dpinpoint.agentId` and `-Dpinpoint.applicationName` command-line arguments.
      * If you're launching an agent in a containerized environment with dynamically changing _agent id_, consider adding `-Dpinpoint.container` command-line argument.
   4. Set `-Dprofiler.sampling.type=PERCENT` and `-Dprofiler.sampling.percent.sampling-rate=100` command-line arguments.
      * You can adjust the sampling rate with the above option.
   5. Launch java application with the options above.

## 1. HBase

Pinpoint uses HBase as its storage backend for the Collector and the Web.

To set up your own cluster, take a look at the [HBase website](http://hbase.apache.org) for instructions. The HBase compatibility table is given below:

Once you have HBase up and running, make sure the Collector and the Web are configured properly and are able to connect to HBase.

### Creating Schemas for HBase

There are 2 scripts available to create tables for Pinpoint: _hbase-create.hbase_, and _hbase-create-snappy.hbase_. Use _hbase-create-snappy.hbase_ for snappy compression (requires [snappy](http://google.github.io/snappy/)), otherwise use _hbase-create.hbase_ instead.

To run these scripts, feed them into the HBase shell like below:

`$HBASE_HOME/bin/hbase shell hbase-create.hbase`

See [here](https://github.com/pinpoint-apm/pinpoint/tree/master/hbase/scripts) for a complete list of scripts.

## 2. Building Pinpoint

There are two options:

1. Download the build results from our [**latest release**](https://github.com/pinpoint-apm/pinpoint/releases/latest) and skip building process. **(Recommended)**
2.  Build Pinpoint manually from the Git clone. **(Optional)**

    In order to do so, the following **requirements** must be met:

    * JDK 8 installed
    * JDK 11 installed
    * JDK 17 installed
    * JAVA\_HOME environment variable set to JDK 8 home directory.
    * JAVA\_8\_HOME environment variable set to JDK 8 home directory.
    * JAVA\_11\_HOME environment variable set to JDK 11 home directory.
    * JAVA\_17\_HOME environment variable set to JDK 17 home directory.

        Agent compatibility to Collector table:

        Once the above requirements are met, simply run the command below (you may need to add permission for **mvnw** so that it can be executed) :

        `./mvnw install -DskipTests=true`

        The default agent built this way will have log level set to DEBUG by default. If you're building an agent for release and need a higher log level, you can set maven profile to _release_ when building :\
        `./mvnw install -Prelease -DskipTests=true`

        Note that having multibyte characters in maven local repository path, or any class paths may cause the build to fail.

        The guide will refer to the full path of the pinpoint home directory as `$PINPOINT_PATH`.

Regardless of your method, you should end up with the files and directories mentioned in the following sections.

## 3. Pinpoint Collector

You should have the following **executable jar** file.

_pinpoint-collector-boot-$VERSION.jar_

The path to this file should look like _$PINPOINT\_PATH/collector/target/deploy/pinpoint-collector-boot-$VERSION.jar_ if you built it manually.

### Installation

Since Pinpoint Collector is packaged as an executable jar file, you can start Collector by running it directly.

e.g.) `java -jar -Dpinpoint.zookeeper.address=localhost pinpoint-collector-boot-$VERSION.jar`

### Configuration

There are 2 configuration files used for Pinpoint Collector: _pinpoint-collector-grpc.properties_, and _hbase.properties_.

* pinpoint-collector-grpc.properties - contains configurations for the grpc.
  * `collector.receiver.grpc.agent.port` (agent's _profiler.transport.grpc.agent.collector.port_, _profiler.transport.grpc.metadata.collector.port_ - default: 9991/TCP)
  * `collector.receiver.grpc.stat.port` (agent's _profiler.transport.grpc.stat.collector.port_ - default: 9992/TCP)
  * `collector.receiver.grpc.span.port` (agent's _profiler.transport.grpc.span.collector.port_ - default: 9993/TCP)
* hbase.properties - contains configurations to connect to HBase.
  * `hbase.client.host` (default: localhost)
  * `hbase.client.port` (default: 2181)

You may take a look at the full list of default configurations here:

* [pinpoint-collector-grpc.properties](https://github.com/pinpoint-apm/pinpoint/blob/master/collector/src/main/resources/profiles/local/pinpoint-collector-grpc.properties)
* [hbase.properties](https://github.com/pinpoint-apm/pinpoint/blob/master/collector/src/main/resources/profiles/local/hbase.properties)

#### When Building Manually

You can modify default configuration values or add new profiles under `collector/src/main/resources/profiles/`.

#### When Using Released Binary **(Recommended)**

* You can override any configuration values with `-D` option. For example,
  * `java -jar -Dspring.profiles.active=release -Dpinpoint.zookeeper.address=localhost -Dhbase.client.port=1234 pinpoint-collector-boot-$VERSION.jar`
* To import a list of your customized configuration values from a file, you can use `--spring.config.additional-location` option. For example,
  *   Create a file `./config/collector.properties`, and list the configuration values you want to override. >

      > spring.profiles.active=release
      >
      > pinpoint.zookeeper.address=localhost
      >
      > collector.receiver.grpc.agent.port=9999
      >
      > collector.receiver.stat.udp.receiveBufferSize=1234567
  * Execute with `java -jar pinpoint-collector-boot-$VERSION.jar --spring.config.additional-location=./config/collector.properties`
* To further explore how to use externalized configurations, refer to [Spring Boot Reference Document](https://docs.spring.io/spring-boot/docs/2.2.x/reference/html/spring-boot-features.html#boot-features-external-config-application-property-files).

### Profiles

Pinpoint Collector provides two profiles: [release](https://github.com/pinpoint-apm/pinpoint/tree/master/collector/src/main/resources/profiles/release) and [local](https://github.com/pinpoint-apm/pinpoint/tree/master/collector/src/main/resources/profiles/local) (default).

To specify which profile to use, configure `spring.profiles.active` value as described in the previous section.

#### Adding a custom profile

To add a custom profile, you need to rebuild `pinpoint-collector` module.

1. Add a new folder under `collector/src/main/resources/profiles` with a profile name.
2. Copy files from local or release profiles folder, and modify configuration values as needed.
3. To use the new profile, rebuild `pinpoint-collector` module and configure `spring.profiles.active` as described in the previous section.

When using released binary, you cannot add a custom profile. Instead, you can manage your configuration values in separate files and use them to override default values as described in the [previous section](installation.md#3-pinpoint-collector).

## 4. Pinpoint Web

You should have the following **executable jar** file.

_pinpoint-web-boot-$VERSION.jar_

The path to this file should look like _$PINPOINT\_PATH/web/target/deploy/pinpoint-web-boot-$VERSION.jar_ if you built it manually.

Pinpoint Web Supported Browsers:

* Chrome

### Installation

Since Pinpoint Web is packaged as an executable jar file, you can start Web by running it directly.

````
java -jar -Dpinpoint.zookeeper.address=localhost pinpoint-web-boot-$VERSION.jar
````

### Configuration

There are 2 configuration files used for Pinpoint Web: _pinpoint-web-root.properties_, and _hbase.properties_.

* hbase.properties - contains configurations to connect to HBase.
  * `hbase.client.host` (default: localhost)
  * `hbase.client.port` (default: 2181)

You may take a look at the default configuration files here

* [pinpoint-web-root.properties](https://github.com/pinpoint-apm/pinpoint/blob/master/web/src/main/resources/pinpoint-web-root.properties)
* [hbase.properties](https://github.com/pinpoint-apm/pinpoint/blob/master/web/src/main/resources/profiles/release/hbase.properties)
* [pinpoint-web.properties](https://github.com/pinpoint-apm/pinpoint/blob/master/web/src/main/resources/profiles/release/pinpoint-web.properties)

#### When Building Manually

You can modify default configuration values or add new profiles under `web/src/main/resources/profiles/`.

#### When Using Released Binary **(Recommended)**

* You can override any configuration values with `-D` option. For example,
  * `java -jar -Dspring.profiles.active=release -Dpinpoint.zookeeper.address=localhost -Dhbase.client.port=1234 pinpoint-web-boot-$VERSION.jar`
* To import a list of your customized configuration values from a file, you can use `--spring.config.additional-location` option. For example,
  *   Create a file `./config/web.properties`, and list the configuration values you want to override. >

      > spring.profiles.active=release
      >
      > pinpoint.zookeeper.address=localhost
      >
      > cluster.zookeeper.sessiontimeout=10000
  * Execute with `java -jar pinpoint-web-boot-$VERSION.jar --spring.config.additional-location=./config/web.properties`
* To further explore how to use externalized configurations, refer to [Spring Boot Reference Document](https://docs.spring.io/spring-boot/docs/2.2.x/reference/html/spring-boot-features.html#boot-features-external-config-application-property-files).

### Profiles

Pinpoint Web provides two profiles: [release](https://github.com/pinpoint-apm/pinpoint/tree/master/web/src/main/resources/profiles/release) (default) and [local](https://github.com/pinpoint-apm/pinpoint/tree/master/web/src/main/resources/profiles/local).

To specify which profile to use, configure `spring.profiles.active` value as described in the previous section.

#### Adding a custom profile

To add a custom profile, you need to rebuild `pinpoint-web` module.

1. Add a new folder under `web/src/main/resources/profiles` with a profile name.
2. Copy files from local or release profiles folder, and modify configuration values as needed.
3. To use the new profile, rebuild `pinpoint-web` module and configure `spring.profiles.active` as described in the previous section.

When using released binary, you cannot add a custom profile. Instead, you can manage your configuration values in separate files and use them to override default values as described in the [previous section](installation.md#4-pinpoint-web).

## 5. Pinpoint Agent

If downloaded, unzip the Pinpoint Agent file. You should have a **pinpoint-agent** directory with the layout below :

```
pinpoint-agent
|-- boot
|   |-- pinpoint-annotations-$VERSION.jar
|   |-- pinpoint-bootstrap-core-$VERSION.jar
|   |-- pinpoint-bootstrap-java8-$VERSION.jar
|   |-- pinpoint-bootstrap-java9-$VERSION.jar
|   |-- pinpoint-commons-$VERSION.jar
|-- lib
|   |-- pinpoint-profiler-$VERSION.jar
|   |-- pinpoint-profiler-optional-$VERSION.jar
|   |-- pinpoint-rpc-$VERSION.jar
|   |-- pinpoint-thrift-$VERSION.jar
|   |-- ...
|-- plugin
|   |-- pinpoint-activemq-client-plugin-$VERSION.jar
|   |-- pinpoint-tomcat-plugin-$VERSION.jar
|   |-- ...
|-- profiles
|   |-- local
|   |   |-- pinpoint.config
|   |-- release
|       |-- pinpoint.config
|-- log4j2-agent.xml
|-- pinpoint-bootstrap-$VERSION.jar
|-- pinpoint-root.config
```

The path to this directory should look like _$PINPOINT\_PATH/agent/target/pinpoint-agent_ if you built it manually.

You may move/extract the contents of **pinpoint-agent** directory to any location of your choice. The guide will refer to the full path of this directory as `$AGENT_PATH`.

> Note that you may change the agent's log level by modifying the _log4j.xml_ located in the _profiles/$PROFILE/log4j.xml_ directory above.

Agent compatibility to Collector table:

### Installation

Pinpoint Agent runs as a java agent attached to an application to be profiled (such as Tomcat).

To wire up the agent, pass _$AGENT\_PATH/pinpoint-bootstrap-$VERSION.jar_ to the _-javaagent_ JVM argument when running the application:

* `-javaagent:$AGENT_PATH/pinpoint-bootstrap-$VERSION.jar`

Additionally, Pinpoint Agent requires 2 command-line arguments in order to identify itself in the distributed system:

* `-Dpinpoint.agentId` - uniquely identifies the application instance in which the agent is running on
* `-Dpinpoint.applicationName` - groups a number of identical application instances as a single service

Note that _pinpoint.agentId_ must be globally unique to identify an application instance, and all applications that share the same _pinpoint.applicationName_ are treated as multiple instances of a single service.

* `-Dprofiler.sampling.type=PERCENT` - sampler type
* `-Dprofiler.sampling.percent.sampling-rate=100` - support from 100% to 0.01%

If you're launching the agent in a containerized environment, you might have set your _agent id_ to be auto-generated every time the container is launched. With frequent deployment and auto-scaling, this will lead to the Web UI being cluttered with all the list of agents that were launched and destroyed previously. For such cases, you might want to add `-Dpinpoint.container` in addition to the 2 required command-line arguments above when launching the agent.

**Tomcat Example**

Add _-javaagent_, _-Dpinpoint.agentId_, _-Dpinpoint.applicationName_ to _CATALINA\_OPTS_ in the Tomcat startup script (_catalina.sh_).

```
CATALINA_OPTS="$CATALINA_OPTS -javaagent:$AGENT_PATH/pinpoint-bootstrap-$VERSION.jar"
CATALINA_OPTS="$CATALINA_OPTS -Dpinpoint.agentId=$AGENT_ID"
CATALINA_OPTS="$CATALINA_OPTS -Dpinpoint.applicationName=$APPLICATION_NAME"
```

Start up Tomcat to start profiling your web application.

Some application servers require additional configuration and/or may have caveats. Please take a look at the links below for further details.

* [JBoss](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/jboss#pinpoint-jboss-plugin-configuration)
* [Jetty](https://github.com/pinpoint-apm/pinpoint/blob/master/plugins/jetty/README.md)
* [Resin](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/resin#pinpoint-resin-plugin-configuration)

### Configuration

There are various configuration options for Pinpoint Agent available in _$AGENT\_PATH/pinpoint-root.config_.

Most of these options are self explanatory, but the most important configuration options you must check are **Collector ip address**, and the **TCP/UDP ports**. These values are required for the agent to establish connection to the _Collector_ and function correctly.

Set these values appropriately in _pinpoint-root.config_:

**GRPC**

* `profiler.transport.grpc.collector.ip` (default: 127.0.0.1)
* `profiler.transport.grpc.agent.collector.port` (collector's _collector.receiver.grpc.agent.port_ - default: 9991/TCP)
* `profiler.transport.grpc.metadata.collector.port` (collector's _collector.receiver.grpc.agent.port_ - default: 9991/TCP)
* `profiler.transport.grpc.stat.collector.port` (collector's _collector.receiver.grpc.stat.port_ - default: 9992/TCP)
* `profiler.transport.grpc.span.collector.port` (collector's _collector.receiver.grpc.span.port_ - default: 9993/TCP)

You may take a look at the default _pinpoint-root.config_ file [here](https://github.com/pinpoint-apm/pinpoint/blob/master/agent/src/main/resources/pinpoint-root.config) along with all the available configuration options.

### Profiles

Add `-Dkey=value` to Java System Properties

* $PINPOINT\_AGENT\_DIR/profiles/$PROFILE
  * `-Dpinpoint.profiler.profiles.active=release or local`
  * Modify `pinpoint.profiler.profiles.active=release` in $PINPOINT\_AGENT\_DIR/pinpoint-root.config
  * Default profile : `release`
* Custom Profile
  1. Create a custom profile in $PINPOINT\_AGENT\_HOME/profiles/MyProfile
     * Add pinpoint.config & log4j.xml
  2. Add `-Dpinpoint.profiler.profiles.active=MyProfile`
* Support external config
  * `-Dpinpoint.config=$MY_EXTERNAL_CONFIG_PATH`

## Miscellaneous

### HBase region servers hostname resolution

Please note that collector/web must be able to resolve the hostnames of HBase region servers. This is because HBase region servers are registered to ZooKeeper by their hostnames, so when the collector/web asks ZooKeeper for a list of region servers to connect to, it receives their hostnames. Please ensure that these hostnames are in your DNS server, or add these entries to the collector/web instances' _hosts_ file.

### Routing Web requests to Agents

Starting from 1.5.0, Pinpoint can send requests from the Web to Agents directly via the Collector (and vice-versa). To make this possible, we use Zookeeper to co-ordinate the communication channels established between Agents and Collectors, and those between Collectors and Web instances. With this addition, real-time communication (for things like active thread count monitoring) is now possible.

We typically use the Zookeeper instance provided by the HBase backend so no additional Zookeeper configuration is required. Related configuration options are shown below.

* **Collector** - _pinpoint-collector.properties_
  * `cluster.enable`
  * `cluster.zookeeper.address`
  * `cluster.zookeeper.sessiontimeout`
  * `cluster.listen.ip`
  * `cluster.listen.port`
* **Web** - _pinpoint-web.properties_
  * `cluster.enable`
  * `cluster.web.tcp.port`
  * `cluster.zookeeper.address`
  * `cluster.zookeeper.sessiontimeout`
  * `cluster.zookeeper.retry.interval`
  * `cluster.connect.address`
