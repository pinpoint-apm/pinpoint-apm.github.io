<!-- <latestReleaseNotes.md> -->
# What's New in v3.0.2
## Key Features
### Removal of Comments in SQL Queries
- issue: #12061.
- Comments are no longer collected with the SQL queries by default.
In case you need them, please use the configuration below.
```properties
profiler.jdbc.removecomments=false
```

## New Plugins
* Update Update io.asyncer:r2dbc-mysql of spring r2dbc plugin #12077
* Update kafka plugin for compatibility with kafka 3.x version #11926
* Update reactor subscriber.subscribeOn #12079
## BugFix
* Fix java.lang.NoClassDefFoundError: java/sql/Date in spring data r2dbc plugin #12117
* Fix datetime/time columns config for Ingestion Aggregations #12180
* Fix missing dependency of pinpoint-batch #11984

---
**From version 3.x, the executable JAR files will be uploaded to Maven Central Repository.**
https://repo1.maven.org/maven2/com/navercorp/pinpoint/

- [pinpoint-agent-3.0.2.tar.gz](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-agent/3.0.2/pinpoint-agent-3.0.2.tar.gz)
- [pinpoint-batch-3.0.2-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-batch/3.0.2/pinpoint-batch-3.0.2-exec.jar)
- [pinpoint-collector-3.0.2-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-collector/3.0.2/pinpoint-collector-3.0.2-exec.jar)
- [pinpoint-collector-starter-3.0.2-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-collector-starter/3.0.2/pinpoint-collector-starter-3.0.2-exec.jar)
- [pinpoint-web-3.0.2-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-web/3.0.2/pinpoint-web-3.0.2-exec.jar)
- [pinpoint-web-starter-3.0.2-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-web-starter/3.0.2/pinpoint-web-starter-3.0.2-exec.jar)

---


## What's Changed
* [#11604] Prepare 3.0.2-SNAPSHOT by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11605
* [#noissue] Bump actions/setup-java@v3 to actions/setup-java@v4 by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11618
* [#noissue] Run actions on 3.0.x branch by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/11646
* [#11807] Backport: Fix reactor-plugin empty mono and flux by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11808
* [#noissue] release 3.0.2-alpha1 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11838
* [#11604] Prepare 3.0.2-SNAPSHOT by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/11863
* [#11854] Backport: fix possible NPE in ServerTransportFilter by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/11862
* [#11926] Backport: Update kafka plugin for compatibility with kafka 3… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11927
* [#11984] Backport: Add missing dependency by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/11985
* [#12073] Backport: Update matchable transform list by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12074
* [#12075] Backport: Add async nested of reactor plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12076
* [#12077] Backport: Update io.asyncer:r2dbc-mysql of spring r2dbc plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12078
* [#12079] Update reactor subscriber.subscribeOn by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12083
* [#noissue] release 3.0.2-alpha2 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12086
* [#noissue] rename 3.0.2-SNAPSHOT by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12087
* [#12117] Backport: Fix java.lang.NoClassDefFoundError: java/sql/Date … by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12118
* [#12061] Backport: Remove comments from SQL queries by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/12127
* [#12180] Backport: Fix datetime/time columns config for Ingestion Aggregations by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12181
* [#12179] 3.0.2 release by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12183


**Full Changelog**: https://github.com/pinpoint-apm/pinpoint/compare/v3.0.1...v3.0.2

<!-- </latestReleaseNotes.md> -->

## Upgrade consideration

HBase compatibility table:

<!-- <compatibilityHbase.md> -->
| Pinpoint Version | HBase 1.x | HBase 2.x                                                                                                             |
|------------------|-----------|-----------------------------------------------------------------------------------------------------------------------|
| 2.0.x - 2.2.x    | yes       | [optional](https://pinpoint-apm.gitbook.io/pinpoint/documents/hbase-upgrade#do-you-like-to-use-hbase-2x-for-pinpoint) |
| 2.3.x - 2.5.x    | yes       | [hbase2-module](https://github.com/pinpoint-apm/pinpoint/tree/2.3.x/hbase2-module)                                    |
| 3.0.x            | no        | yes                                                                                                                   |
| 3.1.x            | no        | yes                                                                                                                   |


<!-- </compatibilityHbase.md> -->

Agent compatibility to Collector table:

<!-- <compatibilityPinpoint.md> -->

| Agent Version | Collector 2.x.x | Collector 3.0.x | Collector 3.1.x |
|---------------|-----------------|-----------------|-----------------|
| 2.x.x         | yes             | yes             | yes             |
| 3.0.x         | no              | yes             | yes             |
| 3.1.x         | no              | no              | yes             |


<!-- </compatibilityPinpoint.md> -->

Additionally, the required Java version to run each Pinpoint component is given below:

<!-- <compatibilityJava.md> -->
| Pinpoint Version | Agent | Collector | Web | Batch | 
|------------------|-------|-----------|-----|-------|
| 2.0.x            | 6-13  | 8         | 8   | 8     |
| 2.1.x            | 6-14  | 8         | 8   | 8     |
| 2.2.x            | 7-14  | 8         | 8   | 8     |
| 2.3.x            | 7-17  | 8         | 8   | 8     |
| 2.4.x            | 7-18  | 11        | 11  | 11    |
| 2.5.x            | 8-19  | 11        | 11  | 11    |
| 3.0.x            | 8-21  | 17        | 17  | 17    |
| 3.1.x            | 8-21  | 17        | 17  | 17    |


<!-- </compatibilityJava.md> -->

## Supported Modules

* JDK 6+
* Supported versions of the \* indicated library may differ from the actual version.

<!-- <modules.md> -->
<!-- DO NOT add/remove column. `Min/Max version` columns will be automatically updated for the rows marked with `<AG>` at the end, via Integration test from 'agent-it' -->
<!-- Contents can be modified at will, key value for the update is column 'Instrumented Library' -->

| Title | Instrumented Library | Min | Max | Comment |  |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [Tomcat](https://github.com/pinpoint-apm/pinpoint/tree/master/agent-module/plugins/tomcat) |  | 6.x | 9.x |  |  |
| [Jetty](https://github.com/pinpoint-apm/pinpoint/tree/master/agent-module/plugins/jetty) |  | 8.x | 9.x |  |  |
| [JBoss](https://github.com/pinpoint-apm/pinpoint/tree/master/agent-module/plugins/jboss) |  | 6.x | 7.x |  |  |
| [Resin](https://github.com/pinpoint-apm/pinpoint/tree/master/agent-module/plugins/resin) |  | 4.x | 4.x |  |  |
| [Websphere](https://github.com/pinpoint-apm/pinpoint/tree/master/agent-module/plugins/websphere) |  | 6.x | 8.x |  |  |
| [Vertx](https://github.com/pinpoint-apm/pinpoint/tree/master/agent-module/plugins/vertx) |  | 3.3 | 3.5 |  |  |
| [Weblogic](https://github.com/pinpoint-apm/pinpoint/tree/master/agent-module/plugins/weblogic) |  | 10.x | 12.x |  |  |
| [Undertow](https://github.com/pinpoint-apm/pinpoint/tree/master/agent-module/plugins/undertow) |  |  |  |  |  |
| [Undertow Servlet](https://github.com/pinpoint-apm/pinpoint/tree/master/agent-module/plugins/undertow-servlet) |  |  |  |  |  |
| Jasper |  |  |  |  |  |
|  |  |  |  |  |  |
| Java Async Thread |  |  |  |  |  |
|  |  |  |  |  |  |
| OpenWhisk | whisk.core |  |  |  |  |
|  |  |  |  |  |  |
| SpringMVC Framework | spring-webmvc | 3.0.7 | 5.3.6 |  |  |
| Spring Web | spring-web | 4.1.2 | 4.3.30 |  |  |
| Spring RabbitMQ | spring-rabbit | 1.3.3 | 2.2.16 |  |  |
| Spring IBatis | spring-ibatis | 2.0.7 | 2.0.8 |  |  |
| Spring MyBatis | mybatis-spring | 1.1.0 | 1.3.3 |  |  |
| \*[Spring Boot](https://github.com/pinpoint-apm/pinpoint/tree/master/agent-module/plugins/spring-boot) | spring-boot-autoconfigure |  |  |  |  |
| \*[Spring Webflux](https://github.com/pinpoint-apm/pinpoint/tree/master/agent-module/plugins/spring-webflux) | spring-webflux |  |  |  |  |
|  |  |  |  |  |  |
| MyBatis | mybatis | 3.0.3 | 3.3.1 |  |  |
| [Hystrix](https://github.com/pinpoint-apm/pinpoint/tree/master/agent-module/plugins/hystrix) | hystrix-core | 1.4.0 | 1.5.18 |  |  |
|  |  |  |  |  |  |
| JDKHTTP |  |  |  |  |  |
| Httpclient3 | commons-httpclient | 3.0 | 3.1 |  |  |
| Httpclient4 | httpclient | 4.0 | 4.5.4 |  |  |
| Thrift | libthrift | 0.9.1 | 0.14.1 |  |  |
| Google HTTP Client | google-http-client | 1.19.0 | 1.39.2 |  |  |
| AsyncHttpClient | async-http-client | 1.7.24 | 1.8.17 |  |  |
| OkHttp | okhttp | 2.0.0 | 3.3.1 |  |  |
| Apache HttpAsyncClient | httpasyncclient | 4.0 | 4.1.3 |  |  |
| \*Akka HTTP | akka-http\_2.12 | 10.1.0 | 10.1.x |  |  |
| \*[Kafka](https://github.com/pinpoint-apm/pinpoint/tree/master/agent-module/plugins/kafka) | kafka-clients | 0.11.0.1 |  |  |  |
| GRPC | grpc-stub | 1.8.0 | 1.37.0 |  |  |
| \*[Reactor](https://github.com/pinpoint-apm/pinpoint/tree/master/agent-module/plugins/reactor) | reactor-core | 3.3.0 | 3.3.1 |  |  |
| \*[Reactor Netty](https://github.com/pinpoint-apm/pinpoint/tree/master/agent-module/plugins/reactor-netty) | reactor-netty | 0.8.0 | 0.9.2 |  |  |
|  |  |  |  |  |  |
| Log4j | log4j | 1.2.16 | 1.2.17 |  |  |
| Logback | logback-classic | 1.0.13 | 1.2.3 |  |  |
| Log4j2 | log4j-core | 2.0 | 2.12.1 |  |  |
|  |  |  |  |  |  |
| \*Arcus | arcus-java-client | 1.7.0 | 1.11.4 |  |  |
| \*MsSQL \(jTDS\) | jtds | 1.2.8 |  |  |  |
| \*MsSQL | mssql-jdbc |  |  |  |  |
| HikariCP | HikariCP-java6 | 2.3.0 | 2.3.13 |  |  |
| Jackson-mapper-asl | jackson-mapper-asl | 1.0.1 | 1.8.11 |  |  |
| Jackson Databind | jackson-databind | 2.0.6 | 2.12.3 |  |  |
| MariaDB Connector/J | mariadb-java-client | 1.3.0 | 2.7.2 |  |  |
| MongoDB Java Driver | mongodb-driver | 3.0.0 | 3.12.8 |  |  |
| Elasticsearch | elasticsearch-rest-high-level-client | 6.0.0 | 6.8.15 |  |  |
| Datastax Java Driver | cassandra-driver-core | 2.0.10 | 3.11.0 |  |  |
| Druid | druid | 1.0.0 | 1.2.6 |  |  |
| \*Cubrid | cubrid-jdbc-driver | 8.4.1 | 10.0.0 |  |  |
| \*Commons DBCP | commons-dbcp | 1.0 | 1.4 |  |  |
| \*Commons DBCP2 | commons-dbcp2 | 2.0 | 2.5.0 |  |  |
| \*HBase | hbase-client | 1.2.6.1 | 1.2.6.1 |  |  |
| \*MySQL | mysql-connector-java | 5.0 | 8.x |  |  |
| \*Oracle JDBC Driver | ojdbc |  |  |  |  |
| \*PostgreSQL JDBC Driver | postgresql |  |  |  |  |
| \*[Redis](https://github.com/pinpoint-apm/pinpoint/tree/master/agent-module/plugins/redis) | jedis | 2.4.2 |  |  |  |
| \*[Redis](https://github.com/pinpoint-apm/pinpoint/tree/master/agent-module/plugins/redis-lettuce) | lettuce-core | 5.0.0 | 5.1.2 |  |  |
| \*[Redis](https://github.com/pinpoint-apm/pinpoint/tree/master/agent-module/plugins/redis-redisson) | redisson | 3.10.0 | 3.10.4 |  |  |
|  |  |  |  |  |  |
| Apache CXF | cxf-rt-rs-client | 3.0.0 | 3.4.3 |  |  |
| Netty | netty-all | 4.1.0 | 4.1.63 |  |  |
| ActiveMQ | activemq-all | 5.1.0 | 5.16.1 |  |  |
| [RxJAVA](https://github.com/pinpoint-apm/pinpoint/tree/master/agent-module/plugins/rxjava) | rxjava | 1.0.0 | 1.3.8 |  |  |
| [RabbitMQ](https://github.com/pinpoint-apm/pinpoint/tree/master/agent-module/plugins/rabbitmq) | amqp-client | 2.7.0 | 5.12.0 |  |  |
| [Paho MQTT](https://github.com/pinpoint-apm/pinpoint/tree/master/agent-module/plugins/paho-mqtt) | org.eclipse.paho.client.mqttv3 | 1.0.2 | 1.2.5 |  |  |
| [Paho MQTT](https://github.com/pinpoint-apm/pinpoint/tree/master/agent-module/plugins/paho-mqtt) | org.eclipse.paho.mqttv5.client | 1.2.5 | 1.2.5 |  |  |
|  |  |  |  |  |  |
| Gson | gson | 1.1 | 2.8.3 |  |  |
| Json | json-lib | 1.0 | 2.2.2 |  |  |
| FastJson | fastjson | 1.2.10 | 1.2.76 |  |  |
| Dubbo | dubbo | 2.5.1 | 2.6.9 |  |  |
| kafka-clients | kafka-clients | 0.11.0.0 | 2.6.1 |  |  |
| postgresql | postgresql | 9.4.1208 | 42.2.19 |  |  |
| ojdbc8 | ojdbc8 | 12.2.0.1 | 21.1.0.0 |  |  |
| ojdbc10 | ojdbc10 | 19.3.0.0 | 19.10.0.0 |  |  |
<!-- </modules.md> -->
