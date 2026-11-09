<!-- <latestReleaseNotes.md> -->
# What's New in v4.0.1
## Improvements
**[Agent]** Enhanced Reactor tracing — propagate unsampled traces across publishOn, subscribeOn, delay, and interval (#14604)
**[Agent]** Propagate unsampled traces across Reactor subscribe and retry (#14594)
**[Agent]** Propagate unsampled traces across coroutine dispatch (#14592)
**[Agent]** Added user-supplied URI template support for URI stat in the Jetty plugins (#14546)
**[Agent]** Added serviceName to the span event ContextData
**[Collector]** Apply the durability setting to SpanChunk (#14544)
**[Web]** Added a search box to the sidebar service selector
**[Web]** Added a search box to the server map service selector
**[Web]** Switched the alarm modules from thymeleaf to thymeleaf-spring6 (#14534)

## Bug Fixes
**[Agent]** Fixed a class retransform issue by keeping the original constant pool indices when rewriting a class from its class file (#9246)
**[Agent]** Fixed a Base64 decoding compatibility issue by downgrading commons-codec to 1.22.1 (#14605)
**[Agent]** Fixed an unnecessary retransform by skipping Spring beans that declare no method to intercept
**[Agent]** Fixed the trace block depth in DisableTrace and DisableChildTrace traceBlockEnd()
**[Web]** Fixed the DEFAULT servicemap not applying the search option (#14600)
**[Web]** Fixed the server map right-click handlers to read the latest disableMenu state
**[Web]** Fixed the Apdex hover popup to attach to the side of the node that has room
**[Web]** Fixed the Apdex and service group popups disappearing when the server map menu is disabled
**[Web]** Fixed an extra drawer scroll when viewing servers
**[Web]** Fixed the group-by remove button showing when the error table cannot remove a group
**[Web]** Fixed focus to return to the service search box with ArrowUp from the first result

## Security
**[Agent]** Bumped fastjson from 1.2.83 to 1.2.84 to fix CVE-2026-16723 (RCE under the default configuration) (#14584)
**[Web]** Bumped handlebars, storybook, and shell-quote to fix critical vulnerabilities
**[Web]** Bumped vite, zod, and transitive dependencies to fix high vulnerabilities
**[Web]** Bumped postcss-selector-parser to 7.1.7 to fix a moderate vulnerability
**[Web]** Reported by @Hamaecco: Reject admin API calls when admin.password is not set (#14533)

## Dependency Updates
**[Build]** 
- Spring Boot 3.5.14 → 3.5.16
- Spring Framework 6.2.18 → 6.2.19
- Spring Security 6.5.10 → 6.5.11
- Spring Batch 5.2.5 → 5.2.6
- Spring Data 3.5.11 → 3.5.13
- Spring Cloud 4.3.0 → 4.3.3
- Spring Kafka 3.3.15 → 3.3.16
- Spring Retry 2.0.12 → 2.0.13
- Spring Shell 3.4.2 → 3.4.3
**[Build]** 
- log4j2 2.25.4 → 2.25.5
- jackson 2.21.4 → 2.21.8
- snakeyaml 2.4 → 2.7
- bouncycastle 1.81 → 1.86
- httpclient5 5.4.4 → 5.6.5
- tomcat-embed 10.1.55 → 10.1.61
- snappy-java 1.1.10.4 → 1.1.10.12
**[Build]** 
- oshi-core 6.9.1 → 7.7.3
- jna 5.18.1 → 5.19.1
- zstd-jni 1.5.7-16 → 1.5.7-25
- HikariCP 7.0.1 → 7.1.0
- commons-lang3 3.18.0 → 3.21.0
- commons-io 2.20.0 → 2.22.0
- commons-codec 1.17.1 → 1.23.0
- commons-pool2 2.12.0 → 2.13.1
- commons-collections4 4.4 → 4.6.0
- hamcrest 2.2 → 3.0


## Downloads

Binaries are attached to this release:

- pinpoint-agent-4.0.1.tar.gz
- pinpoint-batch-4.0.1-exec.jar
- pinpoint-alarm-batch-starter-4.0.1-exec.jar
- pinpoint-collector-4.0.1-exec.jar
- pinpoint-collector-starter-4.0.1-exec.jar
- pinpoint-web-4.0.1-exec.jar
- pinpoint-web-starter-4.0.1-exec.jar

## What's Changed
* [#14502] Prepare 4.0.1-SNAPSHOT by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/14505
* [#noissue] Update the live demo address by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14509
* [#14521] Dispatch only the release id to pinpoint-apm.github.io by @feelform in https://github.com/pinpoint-apm/pinpoint/pull/14522
* [#noissue] Document the authorization scope of basic login by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14506
* [#14510] Bump spring framework from 6.2.18 to 6.2.19 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14523
* [#14511] Bump spring boot from 3.5.14 to 3.5.16 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14524
* [#14514] Bump spring batch from 5.2.5 to 5.2.6 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14525
* [#14515] Bump spring security from 6.5.10 to 6.5.11 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14526
* [#14516] Bump spring retry from 2.0.12 to 2.0.13 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14527
* [#14512] Bump jackson from 2.21.4 to 2.21.8 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14528
* [#14513] Bump log4j2 from 2.25.4 to 2.25.5 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14529
* Bump snappy-java from 1.1.10.4 to 1.1.10.12 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14532
* [#14533] Reject admin API calls when admin.password is not set by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14531 
* [#14534] Switch the alarm modules from thymeleaf to thymeleaf-spring6 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14535
* [#14517] Bump spring data from 3.5.11 to 3.5.13 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14536
* [#14519] Bump spring cloud from 4.3.0 to 4.3.3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14537
* [#14520] Bump spring kafka from 3.3.15 to 3.3.16 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14538
* [#noissue] Hide the group by remove button when the error table cannot remove a group by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14539
* [#14540] Bump spring shell from 3.4.2 to 3.4.3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14541
* [#14542] Bump tomcat embed from 10.1.55 to 10.1.61  by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14543
* [#14544] Collector does not apply the durability setting to SpanChunk by @koo-taejin in https://github.com/pinpoint-apm/pinpoint/pull/14545
* [#noissue] Skip the spring beans retransform when the bean declares n… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14547
* [#14550] Bump HikariCP from 7.0.1 to 7.1.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14551
* [#14546] Support the user-supplied URI template for URI stat in the Jetty plugins by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14549
* [#14517] Manage spring-data-commons in the root pom so spring-batch r… by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14552
* [#9246] Keep the original constant pool indices when rewriting a clas… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14548
* [#14553] Bump commons-lang3 from 3.18.0 to 3.21.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14554
* [#noissue] Remove the commons-io dependency from the agent testwebs by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14555
* [#14556] Bump commons-collections4 from 4.4 to 4.6.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14557
* [#noissue] Remove the unused cglib-nodep version pin by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14559
* [#14560] Bump hamcrest from 2.2 to 3.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14561
* [#noissue] Remove the MySQL Connector/J 6.x branches from the mysql-jdbc plugin by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14563
* [#14564] Bump commons-pool2 from 2.12.0 to 2.13.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14566
* [#14562] Bump commons-codec from 1.17.1 to 1.23.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14565
* [#noissue] Remove the MySQL Connector/J 6.x plugin ITs by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14567
* [#14568] Bump bouncycastle from 1.81 to 1.86 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14569
* [#noissue] Remove the unused jakarta.transaction-api version pin by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14570
* [#14571] Bump httpclient5 from 5.4.4 to 5.6.5 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14572
* [#14573] Bump commons-io from 2.20.0 to 2.22.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14574
* [#14575] Bump zstd-jni from 1.5.7-16 to 1.5.7-25 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14576
* [#14577] Bump jna from 5.18.1 to 5.19.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14578
* [#14579] Bump snakeyaml from 2.4 to 2.7 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14580
* [#14581] Bump oshi-core from 6.9.1 to 7.7.3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14583
* [#14584] Bump fastjson from 1.2.83 to 1.2.84 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14586
* [#noissue] Fix the server map popups when the menu is disabled and the hover popup placement by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14585
* [#noissue] Add a search box to the sidebar service selector by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14588
* [#14592] Propagate unsampled traces across coroutine dispatch by @cj848 in https://github.com/pinpoint-apm/pinpoint/pull/14593
* [#14594] Propagate unsampled traces across Reactor subscribe and retry by @cj848 in https://github.com/pinpoint-apm/pinpoint/pull/14595
* [#noissue] Fix web-frontend npm Dependabot alerts by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14597
* [#noissue] Decrease depth in DisableTrace and DisableChildTrace traceBlockEnd() by @cj848 in https://github.com/pinpoint-apm/pinpoint/pull/14599
* [#14605] Downgrade commons-codec to 1.22.1 for Base64 decoding compatibility by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14606
* [#noissue] Fix the agent path and the agent JVM arguments of the agen… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14607
* [#14600] Apply the search option to the DEFAULT servicemap by @cj848 in https://github.com/pinpoint-apm/pinpoint/pull/14601
* [#14604] Seed the AsyncContext at reactor publishOn, subscribeOn, del… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14609
* [#noissue] Remove the unused StackTraceProcessor SPI by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14611
* [#noissue] Add serviceName to the span event ContextData by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14608
* [#noissue] Clean up native scrollbar color and the extra server view scroll by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14613
* [#14612] 4.0.1 release by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/14614


**Full Changelog**: https://github.com/pinpoint-apm/pinpoint/compare/v4.0.0...v4.0.1

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
| 4.0.x            | no        | yes                                                                                                                   |


<!-- </compatibilityHbase.md> -->

Agent compatibility to Collector table:

<!-- <compatibilityPinpoint.md> -->

| Agent Version | Collector 2.x.x | Collector 3.0.x | Collector 3.1.x | Collector 4.0.x |
|---------------|-----------------|-----------------|-----------------|-----------------|
| 2.x.x         | yes             | yes             | yes             | yes             |
| 3.0.x         | no              | yes             | yes             | yes             |
| 3.1.x         | no              | no              | yes             | yes             |
| 4.0.x         | no              | no              | no              | yes             |


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
| 3.1.x            | 8-25  | 17        | 17  | 17    |
| 4.0.x            | 8-25  | 17        | 17  | 17    |


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
