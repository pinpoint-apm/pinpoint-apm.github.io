<!-- <latestReleaseNotes.md> -->
# What's New in v2.4.2
## What's Changed
* [#9141] Add support to kafka version 2.8 ~ 3.2 for kafka plugin by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9142
* [#9120] Backport: fix npe bug in mongo plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9121
* [#9151] Backport : Bump Spring Security from 5.5.3 to 5.5.8 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9152
* [#9179] Backport: Update vert.x plugin for 4.x by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9180
* [#9200] Backport: Fix agent callstack overflow log by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9201
* [#9202] Backport: Fix span dispatch failed by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9203
* [#9204] Backport: Fix log level of abstract method transform by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9205
* [#9206] Backport: Fix rabbitMQ consumer handle interceptor by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9207
* [#9208] Backport: Change the agent's gRPC stream log level by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9209
* [#9232] 2.4.2 release by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9233
* [#9027] Prepare 2.4.2-SNAPSHOT by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9098

**Full Changelog**: https://github.com/pinpoint-apm/pinpoint/compare/v2.4.1...v2.4.2

<!-- </latestReleaseNotes.md> -->

## Upgrade consideration

HBase compatibility table:

<!-- <compatibilityHbase.md> -->
Pinpoint Version | HBase 1.0.x | HBase 1.2.x | HBase 1.4.x | HBase 2.0.x
---------------- | ----------- | ----------- | ----------- | -----------
2.0.x | not tested | yes | yes | [optional](https://pinpoint-apm.gitbook.io/pinpoint/documents/hbase-upgrade#do-you-like-to-use-hbase-2x-for-pinpoint)
2.1.x | not tested | yes | yes | [optional](https://pinpoint-apm.gitbook.io/pinpoint/documents/hbase-upgrade#do-you-like-to-use-hbase-2x-for-pinpoint)
2.2.x | not tested | yes | yes | [optional](https://pinpoint-apm.gitbook.io/pinpoint/documents/hbase-upgrade#do-you-like-to-use-hbase-2x-for-pinpoint)
2.3.x | not tested | yes | yes | [hbase2-module](https://github.com/pinpoint-apm/pinpoint/tree/master/hbase2-module)
2.4.x | not tested | yes | yes | [hbase2-module](https://github.com/pinpoint-apm/pinpoint/tree/master/hbase2-module)
2.5.x | not tested | yes | yes | [hbase2-module](https://github.com/pinpoint-apm/pinpoint/tree/master/hbase2-module)

<!-- </compatibilityHbase.md> -->

Agent compatibility to Collector table:

<!-- <compatibilityPinpoint.md> -->
Agent Version | Collector 2.0.x | Collector 2.1.x | Collector 2.2.x | Collector 2.3.x | Collector 2.4.x | Collector 2.5.x |
------------- | --------------- | --------------- | --------------- | --------------- | --------------- | --------------- |
2.0.x | yes | yes | yes | yes | yes | yes
2.1.x | no  | yes | yes | yes | yes | yes
2.2.x | no  | no  | yes | yes | yes | yes
2.3.x | no  | no  | no  | yes | yes | yes
2.4.x | no  | no  | no  | no  | yes | yes
2.5.x | no  | no  | no  | no  | no  | yes

<!-- </compatibilityPinpoint.md> -->

Additionally, the required Java version to run each Pinpoint component is given below:

<!-- <compatibilityJava.md> -->
Pinpoint Version | Agent | Collector | Web | Flink
---------------- |-------| --------- | --- | ---
2.0.x  | 6-13  | 8   | 8 | 8
2.1.x  | 6-14  | 8   | 8 | 8
2.2.x  | 7-14  | 8   | 8 | 8
2.3.x  | 7-17  | 8   | 8 | 8
2.4.x  | 7-18  | 11  | 11 | 11
2.5.x  | 8-19  | 11  | 11 | 11

<!-- </compatibilityJava.md> -->

## Supported Modules

* JDK 6+
* Supported versions of the \* indicated library may differ from the actual version.

<!-- <modules.md> -->
<!-- DO NOT add/remove column. `Min/Max version` columns will be automatically updated for the rows marked with `<AG>` at the end, via Integration test from 'agent-it' -->
<!-- Contents can be modified at will, key value for the update is column 'Instrumented Library' -->

| Title | Instrumented Library | Min | Max | Comment |  |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [Tomcat](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/tomcat) |  | 6.x | 9.x |  |  |
| [Jetty](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/jetty) |  | 8.x | 9.x |  |  |
| [JBoss](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/jboss) |  | 6.x | 7.x |  |  |
| [Resin](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/resin) |  | 4.x | 4.x |  |  |
| [Websphere](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/websphere) |  | 6.x | 8.x |  |  |
| [Vertx](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/vertx) |  | 3.3 | 3.5 |  |  |
| [Weblogic](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/weblogic) |  | 10.x | 12.x |  |  |
| [Undertow](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/undertow) |  |  |  |  |  |
| [Undertow Servlet](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/undertow-servlet) |  |  |  |  |  |
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
| \*[Spring Boot](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/spring-boot) | spring-boot-autoconfigure |  |  |  |  |
| \*[Spring Webflux](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/spring-webflux) | spring-webflux |  |  |  |  |
|  |  |  |  |  |  |
| MyBatis | mybatis | 3.0.3 | 3.3.1 |  |  |
| [Hystrix](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/hystrix) | hystrix-core | 1.4.0 | 1.5.18 |  |  |
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
| \*[Kafka](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/kafka) | kafka-clients | 0.11.0.1 |  |  |  |
| GRPC | grpc-stub | 1.8.0 | 1.37.0 |  |  |
| \*[Reactor](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/reactor) | reactor-core | 3.3.0 | 3.3.1 |  |  |
| \*[Reactor Netty](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/reactor-netty) | reactor-netty | 0.8.0 | 0.9.2 |  |  |
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
| \*[Redis](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/redis) | jedis | 2.4.2 |  |  |  |
| \*[Redis](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/redis-lettuce) | lettuce-core | 5.0.0 | 5.1.2 |  |  |
| \*[Redis](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/redis-redisson) | redisson | 3.10.0 | 3.10.4 |  |  |
|  |  |  |  |  |  |
| Apache CXF | cxf-rt-rs-client | 3.0.0 | 3.4.3 |  |  |
| Netty | netty-all | 4.1.0 | 4.1.63 |  |  |
| ActiveMQ | activemq-all | 5.1.0 | 5.16.1 |  |  |
| [RxJAVA](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/rxjava) | rxjava | 1.0.0 | 1.3.8 |  |  |
| [RabbitMQ](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/rabbitmq) | amqp-client | 2.7.0 | 5.12.0 |  |  |
| [Paho MQTT](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/paho-mqtt) | org.eclipse.paho.client.mqttv3 | 1.0.2 | 1.2.5 |  |  |
| [Paho MQTT](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/paho-mqtt) | org.eclipse.paho.mqttv5.client | 1.2.5 | 1.2.5 |  |  |
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
