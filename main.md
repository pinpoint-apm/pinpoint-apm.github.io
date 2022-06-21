<!-- <latestReleaseNotes.md> -->
# What's New in v2.4.0
# Security Update
- [Log4j2 RCE](https://logging.apache.org/log4j/2.x/security.html)
  - CVE-2021-44832
  - Agent : log4j 2.12.4
  - Server module : log4j 2.17.1
- [Spring RCE](https://spring.io/blog/2022/03/31/spring-framework-rce-early-announcement)
  - spring framework : 5.3.20
# Important Changes
- Hbase schema changed #8348
```
hbase/bin> ./hbase shell
hbase> alter 'ApplicationTraceIndex', { NAME => 'M', TTL => 5184000, DATA_BLOCK_ENCODING => 'PREFIX' }
  or 
hbase> alter 'ApplicationTraceIndex', { NAME => 'M', TTL => 5184000, DATA_BLOCK_ENCODING => 'PREFIX' , COMPRESSION => 'SNAPPY'}
```
- Bump Flink version (1.7.1 -> 1.14.2) #8550
 Upgrade to Flink 1.14.x or higher is recommended

# Key Features
## Java11 support
- #8470 Pinpoint server module no longer supports java8
## Side Bar UI (experimental)
- #8480


![image](https://user-images.githubusercontent.com/7564547/167566672-43869511-32b2-4d28-8c80-28fb05f834b1.png)


## Apdex score 
- https://github.com/pinpoint-apm/pinpoint/issues/4044


![image](https://user-images.githubusercontent.com/7564547/167567157-a2122fbe-8520-41a4-95f2-ab6a8f29095b.png)




![image](https://user-images.githubusercontent.com/7564547/170928183-243782d2-45f3-4a15-9818-1143755bd305.png)



## Support Kotlin Coroutines Plugin 
- #8472


![image](https://user-images.githubusercontent.com/10057874/150736372-0edab0e4-7c90-418d-b678-a0cfa9484120.jpg)


## Pinpoint Banner
- #8580


![image](https://user-images.githubusercontent.com/3798235/147912400-a21122bc-4b6a-4663-b70c-5da535696509.png)



## Bug Fixes
- Fixed a bug where the realtime feature did not work intermittently
  - #8811 Backport CURATOR-525
- Fixed a bug where very long traces were broken
  - #8597 Fix short overflow of sequence in Span

## What's Changed
* [#8376] web ui, highlight exception rows in call tree by @yjqg6666 in https://github.com/pinpoint-apm/pinpoint/pull/8377
* [#8394] Fix the collector for Hbase2 does not work by @koo-taejin in https://github.com/pinpoint-apm/pinpoint/pull/8396
* [#8399] fix broken image link by @feelform in https://github.com/pinpoint-apm/pinpoint/pull/8400
* [#8402] Add ServletFilter based ErrorHandler by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8403
* [#8372] Replace HTableMultiplexer with BufferedMutator by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8373
* Fix show progress when complete in callstack by @koo-taejin in https://github.com/pinpoint-apm/pinpoint/pull/8430
* [#6821] Fix servermap instance list factory by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/8447
* [#8470] Update Java11 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8471
* [#8472] Support Kotlin Coroutines Plugin by @koo-taejin in https://github.com/pinpoint-apm/pinpoint/pull/8475
* [#8501] Disable unnecessary JNDI by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8502
* [#8513] Fix https in jdk-http-plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/8514
* [#8313] Add null check to kafka header values to prevent NPE by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/8527
* [#8503] Fix malformed logging configuration for agent by @kjkmadness in https://github.com/pinpoint-apm/pinpoint/pull/8476
* [#noissue] [WEB/UI] add webhook url & alias validation; max length by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/8504
* [#8543] Fix app proxy header by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/8545
* [#8544] Enhanced Pinpoint header validation by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8546
* [#8571] Add maven-central-deploy by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8572
* [#8480] add global navigation side bar by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/8481
* [#8072] Fix bind.pinpoint api to return json by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8575
* [#8564] Update vertx-4.x plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/8565
* [#8580] Add Pinpoint Banner by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/8581
* [#8486] Add default configuration for experimental feature by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/8458
* [#8589] Correct K unit in memory side by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/8592
* [#8595] Add agent-level trace limit by sequence by @Kangji in https://github.com/pinpoint-apm/pinpoint/pull/8596
* [#8597] Convert Sequence Data Type into Int by @Kangji in https://github.com/pinpoint-apm/pinpoint/pull/8607
* [#8614] Support Empty database in MYSQL by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8615
* [#8617] Apply Awaitability to testcase by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8618
* [#8619] Extract zookeeper cluster module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8620
* [#8374] show date of start time as a tooltip in web call tree by @yjqg6666 in https://github.com/pinpoint-apm/pinpoint/pull/8375
* [#8646] Removed permission logic to avoid confusion by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/8647
* [#4044] Add Apdex score in getServerMapData by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/8425
* [#8372] Restore return type of TraceDao by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8656
* [#8663] Fix to generate DummySpanEvent on stack overflow of callstack by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8664
* [#8642] Disable async trace to limit span event by @Kangji in https://github.com/pinpoint-apm/pinpoint/pull/8643
* [#8674] Add ArrayArgumentUtils for argument access by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8675
* [#noissue] [FE] add cpp icon by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/8686
* [#8684] Remove unnecessary spanlock of cluster manager by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8685
* [#noissue] Improved znode debuggability for collector in Zookeeper by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8690
* [#8691] Separate hbase connection for batch operation by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8692
* [#noissue] Display pointing time in inspector by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/8705
* [#8699] Add getLambda method by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/8700
* [#8689] Update reactor plugins by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/8707
* ﻿[#8622] Fix thrift plugin server by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/8709
* [#8726] Update elasticsearch plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/8727
* [#8755] Refactor Application Metric by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8756
* [#8757] Remove duplicate agent metrics by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8760
* [#8762] apply throttled logger by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/8751
* [#8768] Remove duplicate StatCodec by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8769
* [#8771] Refactor Chart component by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8772
* [#8778] Apply SummaryStatistics by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8779
* [#8780] Add ContentLength Util by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8781
* [#8348] Add secondary index to ApplicationTraceIndex by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8349
* [#8806] Refactor HashMap for HttpResponse to Response object by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8808
* [#8811] Backport CURATOR-525 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8812
* [#8813] Remove unnecessary web resources from flink binary by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8814
* [#8463] Replace slf4j with log4j2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8464
* [#8834] Remove static isHeaderRecorded field from kafka plugin by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8835
* [#8865] Fix inconsistent synchronization in volatile field by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8866
* [#8877] Fix ActiveRequest not working by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8880
* [#8843] Add time series Apdex score chart by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/8844
* [#8661] Fix Hbase interceptor plugin to handle versioned getTableName by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/8662

## Dependencies
* [#8550] Upgrade flink version(1.7.1 -> 1.14.2) by @minwoo-jung https://github.com/pinpoint-apm/pinpoint/issues/8550
* [#8509] Bump Log4j 2.17.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8530
* [#8519] Bump log4j 2.12.3 for JDK7 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8520
* [#8577] Fix log4j2 CVE-2021-44832 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8578
* [#8491] Fix Log4j2 RCE vulnerability by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8492
* [#8407] Upgrade Spring Lib by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8408
* [#8734] Update SpringFramework for Spring RCE by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8735
* [#8861] update spring-framework 5.3.18 -> 5.3.20 by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/8862
* [#8745] Bump commons-compress from 1.20 to 1.21 by @dependabot in https://github.com/pinpoint-apm/pinpoint/pull/8744
* [#8747] Bump jackson-databind from 2.12.5 to 2.12.6.1 by @dependabot in https://github.com/pinpoint-apm/pinpoint/pull/8746
* [#8753] Bump commons-io from 2.6 to 2.11.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8754
* [#8785] Bump javax.annotation-api from 1.3.2 to 1.3.5 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8786
* [#8791] Bump from javax.activation-api to jakarta.activation-api by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8792
* [#8793] Bump from validation-api to jakarta.validation-api by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8794
* [#8795] Bump javax.transaction from to 1.1 to 1.3.3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8796
* [#8798] Bump hbase-client from 2.4.2 to 2.4.11 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8799
* [#8828] Bump zookeeper from 3.4.14 to 3.5.9 for hbase 2.x by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8829
* [#8452] Bump gRpc 1.43.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8750
* [#noissue] Bump javax.mail from 1.4.7 to jakarta.mail 1.6.7 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8484
* [#8722] Fix a Spring 5.3 JDK compatibility issue by @feelform in https://github.com/pinpoint-apm/pinpoint/pull/8723
* [#8600] Upgrade mysql-driver 5.1.49 -> 8.0.27 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/6991
* [#8602] Bump testcontainers 1.16.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8601
* [#8222] replace logger pattern automatically by @yjqg6666 in https://github.com/pinpoint-apm/pinpoint/pull/8228
* [#8434] Update log4j2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8435
* [#8436] Update ASM 9.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8437
* [#8438] Update Jackson 2.12.5 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8439
* [#8440] Update frontend-maven-plugin 1.12.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8441
* [#8452] Update gRpc by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8454

## New Contributors
Thank you all.
If there is someone who was inadvertently excluded, please let me know.
* @kjkmadness made their first contribution in https://github.com/pinpoint-apm/pinpoint/pull/8476
* @intr3p1d made their first contribution in https://github.com/pinpoint-apm/pinpoint/pull/8458
* @Kangji made their first contribution in https://github.com/pinpoint-apm/pinpoint/pull/8596
* @donghun-cho made their first contribution in https://github.com/pinpoint-apm/pinpoint/pull/8751
* @smilu97 made their first contribution in https://github.com/pinpoint-apm/pinpoint/pull/8860


**Full Changelog**: https://github.com/pinpoint-apm/pinpoint/compare/v2.3.1...v2.4.0

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
2.5.x  | 8-18  | 11  | 11 | 11

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
