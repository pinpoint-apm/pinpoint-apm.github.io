<!-- <latestReleaseNotes.md> -->
# What's New in v2.3.0
##  Key Features
### Support Dark Mode 
* Servermap 
![image](https://user-images.githubusercontent.com/14918660/123748950-d955e300-d8ef-11eb-981a-3fd79ece9276.png)
* Distributed callstack
![dark-call](https://user-images.githubusercontent.com/10057874/126583513-8d8f3cb9-d411-4a20-a312-6dacc7722341.jpg)
* Inspector 
![darkinspector](https://user-images.githubusercontent.com/10057874/126583523-851c5cc6-a456-4e66-8d38-17f4aa3004d3.jpg)
* Issue : #7990 
<br>

### Support Avg & Max response summary
* Servermap 
![avgmax](https://user-images.githubusercontent.com/10057874/126583693-d5642ab7-d1bb-48dd-ad40-ea8a7e1e031c.jpg)
* Issue : #7559 
(Thank you @yjqg6666  for your contribution)
<br>

### Support Async SDK support
* Distributed callstack
![async](https://user-images.githubusercontent.com/10057874/126584403-152f547d-0937-4512-a915-1c7a23bfb3d9.jpg)
* Document
https://github.com/pinpoint-apm/pinpoint/blob/master/agent-sdk/README.md
* Issue : #7654, #7750 
(Thank you @zhangyinhao1234   for your contribution)
<br>

### Support Agent Name 
* Description 
Pinpoint has been resolved 24 character limit via agentName.
```
# Pinpoint OPTS 
-javaagent:${PINPOINT_BOOTSTRAP} -Dpinpoint.agentName=pinpoint_has_been_resolved_24_character_limit_agentName -Dpinpoint.applicationName=${APPLICATION_NAME}
```
<br>

* Servermap
![image](https://user-images.githubusercontent.com/1879641/113987104-95b78400-9880-11eb-80d6-32683cd67940.png)
* Distributed callstack
![image](https://user-images.githubusercontent.com/1879641/112813099-71092280-90b0-11eb-912f-5b9c798b990f.png)
* Inspector
![image](https://user-images.githubusercontent.com/1879641/112812867-2d161d80-90b0-11eb-85cc-f9380d6cbb03.png)
* Issue : #7788  
(Thank you @yjqg6666  for your contribution)
<br>

### Separated into batch logic module
In the future, the module is separated so that the batch is operated as a separate process instead of running the batch job in the web.
Please refer to the guide document below for how to run batch.
* issue : #7808
* Document
https://github.com/pinpoint-apm/pinpoint/blob/v2.3.0/doc/alarm.md


### Support webhook notifications for alarms
![alarm_figure06](https://github.com/pinpoint-apm/pinpoint/blob/v2.3.0/doc/images/alarm/alarm_figure06.png)
* Document
https://github.com/pinpoint-apm/pinpoint/blob/v2.3.0/doc/alarm.md
* Issue : #7142
(Thank you @cwJohnPark, @doll6777, @imbf  for your contribution)
<br>

### Support Hbase2 
* Issue : #7808 

<br>

## Release Notes
### Plugins
* [Plugins issues](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.0+is%3Aclosed+label%3Amodule%3Aplugin)

### Enhancements
* [Agent](https://github.com/naver/pinpoint/issues?q=is%3Aissue+label%3Aenhancement+milestone%3A2.3.0+is%3Aclosed+label%3Amodule%3Aagent)

* [Plugin](https://github.com/naver/pinpoint/issues?q=is%3Aissue+label%3Aenhancement+milestone%3A2.3.0+is%3Aclosed+label%3Amodule%3Aplugin)

* [Collector](https://github.com/naver/pinpoint/issues?q=is%3Aissue+label%3Aenhancement+milestone%3A2.3.0+is%3Aclosed+label%3Amodule%3Acollector)

* [Web](https://github.com/naver/pinpoint/issues?q=is%3Aissue+label%3Aenhancement+milestone%3A2.3.0+is%3Aclosed+label%3Amodule%3Aweb)

* [Batch](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.0+is%3Aclosed+label%3Aenhancement+label%3Amodule%3Abatch)

* [Flink](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.0+is%3Aclosed+label%3Aenhancement+label%3Amodule%3Aflink)

* [Common](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.0+is%3Aclosed+label%3Aenhancement+label%3Amodule%3Aproject-common)

### Bugs
* [Agent](https://github.com/naver/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.0+is%3Aclosed+label%3Abug+label%3Amodule%3Aagent)

* [Plugin](https://github.com/naver/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.0+is%3Aclosed+label%3Abug+label%3Amodule%3Aplugin)

* [Collector](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.0+is%3Aclosed+label%3Abug+label%3Amodule%3Acollector)

* [Web](https://github.com/naver/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.0+label%3Abug+is%3Aclosed+label%3Amodule%3Aweb)

* [Batch](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.0+label%3Abug+is%3Aclosed+label%3Amodule%3Abatch)

* [Test](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.0+is%3Aclosed+label%3Abug+label%3Amodule%3Atest)

### Cleanup
* [Agent](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.0+is%3Aclosed+label%3Acleanup+label%3Amodule%3Aagent)

* [Plugin](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.0+is%3Aclosed+label%3Acleanup+label%3Amodule%3Aplugin)

### Dependency
* [All](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.0+is%3Aclosed+label%3Adependencies)

### Document
* [All](https://github.com/pinpoint-apm/pinpoint/issues?q=is%3Aissue+milestone%3A2.3.0+is%3Aclosed+label%3Adocument)


<br>

## Thank You
to
whom provided or suggested valuable features
whom fixed or reported bugs
whom showed interest in Pinpoint and shared it to others.

Thank you all.
If there is someone who was inadvertently excluded, please let me know.
@brito-wang
@cwJohnPark 
@davide-parini
@doll6777
@hoverwinter
@imbf 
@kkojaeh
@linux0x5c 
@messi-gao 
@stanvl
@tankilo 
@theLazyCat775


<!-- </latestReleaseNotes.md> -->

## Upgrade consideration

HBase compatibility table:

<!-- <compatibilityHbase.md> -->
| Pinpoint Version | HBase 0.98.x | HBase 1.0.x | HBase 1.2.x | HBase 2.0.x |
| :--- | :--- | :--- | :--- | :--- |
| 1.5.x | not tested | yes | not tested | no |
| 1.6.x | not tested | not tested | yes | no |
| 1.7.x | not tested | not tested | yes | no |
| 1.8.x | not tested | not tested | yes | no |
| 2.0.x | not tested | not tested | yes | optional |
<!-- </compatibilityHbase.md> -->

Agent compatibility to Collector table:

<!-- <compatibilityPinpoint.md> -->
| Agent Version | Collector 1.5.x | Collector 1.6.x | Collector 1.7.x | Collector 1.8.x | Collector 2.0.x |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1.5.x | yes | yes | yes | yes | yes |
| 1.6.x | not tested | yes | yes | yes | yes |
| 1.7.x | no | no | yes | yes | yes |
| 1.8.x | no | no | no | yes | yes |
| 2.0.x | no | no | no | no | yes |
<!-- </compatibilityPinpoint.md> -->

Additionally, the required Java version to run each Pinpoint component is given below:

<!-- <compatibilityJava.md> -->
| Pinpoint Version | Agent | Collector | Web |
| :--- | :--- | :--- | :--- |
| 1.5.x | 6-8 | 7-8 | 7-8 |
| 1.6.x | 6-8 | 7-8 | 7-8 |
| 1.7.x | 6-8 | 8 | 8 |
| 1.8.0 | 6-10 | 8 | 8 |
| 1.8.1+ | 6-11 | 8 | 8 |
| 2.0.x | 6-11 | 8 | 8 |
<!-- </compatibilityJava.md> -->

## Supported Modules

* JDK 6+
* Supported versions of the \* indicated library may differ from the actual version.

<!-- <modules.md> -->
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
| [Elasticsearch](https://github.com/pinpoint-apm/pinpoint/tree/master/plugins/elasticsearch-bboss) | bboss-elasticsearch-rest-jdbc | 5.6.9 | 5.8.2 |  |  |
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
