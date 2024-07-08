<!-- <latestReleaseNotes.md> -->
# What's New in v3.0.0
# Key Features
## Migrating to React
The front-end framework has been switched from Angular to React.
For more details, see the [issue](https://github.com/pinpoint-apm/pinpoint/issues/8929).

## Error Analysis
Enables detailed analysis of exception data collected by the agent.











![error_analysis_1](<./.gitbook/assets/error_analysis_01.png>)










[manual](https://pinpoint-apm.gitbook.io/pinpoint/documents/error_analysis)

## New Inspector
Stores inspector data in Apache Pinot, replacing the previous system which stored data via Flink in HBase. For more details, see the [issue](https://github.com/pinpoint-apm/pinpoint/issues/10704).
[manual](https://pinpoint-apm.gitbook.io/pinpoint/documents/new-inspector)

## Metric Storage Migration to Pinot
The storage system for metrics has been migrated to Pinot.

## New Plugins
* Support JDK HttpClient(java 11) #10656
* Support ClickHouse #9794
* Support Vert.x 4.5.0 #10534
* Supports apache environment variables for Proxy Server Monitoring #9892
* Improved support for Reactor(error, threading, retry, timeout) #10323, #10323, #10418, #10454
* Improved support for Spring 6.x version #10832, #10615
* Improve the error handling of spring tx #10492

## BugFix
* Fix Web CallTree screen that only shows one child when kafka is in multichild state #9905
* Fix Web Active Request chart where the value of the very slow item was constantly increasing #9958
* Fix repeatedly logged HTTP response values in WAS (tomcat, jetty, etc.) plugins #10355
* Fix node was a null value on the Web CallTree #10517
* Fix out-of-sync status value in a multi-threading environment during kotlin tracking #10612
* Fix destination DB was marked UNKNOWN at the time of MongoDb tracking #10940
* Fix repeatedly tracked getInputStream() method calls when using the HttpURLConnection class with JDK HTTP calls #11057

## Important Update Information
[**Spring Batch 5 Update**](https://github.com/pinpoint-apm/pinpoint/issues/10900)
This release includes an update to Spring Batch 5. Please note that schema modifications are required.
[**End of support for hbase 1.x**](https://github.com/pinpoint-apm/pinpoint/issues/10131)
HBase1 support has ended. We recommend migrating to HBase2.

**From version 3.x, the executable JAR files will be uploaded to Maven Central Repository.**

https://repo1.maven.org/maven2/com/navercorp/pinpoint/

- [pinpoint-agent-3.0.0.tar.gz](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-agent/3.0.0/pinpoint-agent-3.0.0.tar.gz)
- [pinpoint-batch-3.0.0-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-batch/3.0.0/pinpoint-batch-3.0.0-exec.jar)
- [pinpoint-collector-3.0.0-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-collector/3.0.0/pinpoint-collector-3.0.0-exec.jar)
- [pinpoint-collector-starter-3.0.0-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-collector-starter/3.0.0/pinpoint-collector-starter-3.0.0-exec.jar)
- [pinpoint-web-3.0.0-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-web/3.0.0/pinpoint-web-3.0.0-exec.jar)
- [pinpoint-web-starter-3.0.0-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-web-starter/3.0.0/pinpoint-web-starter-3.0.0-exec.jar)


## What's Changed
* [#9847] Prepare 2.6.0-SNAPSHOT by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9848
* [#noissue] Disable malicious test in mongodb-plugin-testweb by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9852
* [#9784] Fix nginx variable t=$msec parse in Proxy-User module by @geministarshine in https://github.com/pinpoint-apm/pinpoint/pull/9785
* Update 2.5.1 release by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9857
* Update 2.5.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9858
* [#noissue] Fix proxy-user plugin test by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9855
* [#9869] Separate pinpoint-web-frontend by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9870
* [#9876] Unified naming convention by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9877
* [#noissue] Converted websocket.xml to WebSocketConfig class by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9879
* [#noissue] Enable monitoring agent-server-executor by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9881
* [#noissue] Apply ConditionalOnProperty to InstallModule by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9884
* [#noissue] Fix: start realtime on init-phase on scatter by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9887
* [#9885] Apply ConditionalOnProperties to BasicLogin module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9886
* [#9876] Unified naming convention by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9891
* [#9882] Extract Grpc SSL Module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9883
* [#9892] Update agent proxy-user plugin for apache format by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9894
* [#9882] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9896
* [#9893] Merge log4j2 configurations to a single file by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9895
* [#8890] Implemented findClass in Java9ClassLoader by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9897
* [#noissue] Refactor grpc ssl initialization by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9899
* [#noissue] Cleanup by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9888
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9912
* [#9913] Apply testcontainers to redis-lettuce-plugin-it by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9914
* [#9915] Replace SocketUtils in springframework by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9916
* [#9893] Remove unnecessary log4j configurations in collector starter by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9901
* [#9905] Fix kafka on call tree view by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9906
* [#noissue] Handle ByteString annotation values of protobuf by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/9705
* [#9920] Modify binary naming rule of agent-testweb to maven standard by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9921
* [#noissue] Cleanup testweb by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9923
* [#noissue] Add pinpoint-spring-boot3-testweb by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9926
* [#noissue] Add spring-boot3-webflux-plugin-testweb by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9927
* [#noissue] Added function names, idleness in flink by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9934
* [#noissue] Remove color tag in log4j2 logging format except local by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9924
* [#9893] Merge agent log4j2 profiles by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9935
* [#9932] Reduce pinpoint-rpc dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9931
* [#9922] Enhanced resource reclaimation in hbase2 client by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9933
* [#9922] Separated flink-clean.xml by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9939
* [#noissue] Removed hard-coded default agent profile by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9937
* [#9666] Add redis pubsub atc,atc,echo by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9767
* [#9666] Fixed redis-root.properties location by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9943
* [#9666] Add redis pubsub atc,atd,echo by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9949
* [#noissue] Fixed redis pubsub test by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9954
* [#9893] Change filename log4j2.xml→log4j2-agent.xml by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9955
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9957
* [#9893] Merge batch log4j2 configurations by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9961
* [#9958] fix duplicated active trace by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9960
* [#noissue] Applied dynamic property source to redis test by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9959
* [#9666] Fixed redis properties by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9970
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9975
* [#9893] Align Log4j2 loggingsystem lookup orders by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9976
* [#noissue] Remove isParsed state of RouteResponse by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9977
* [#9666] Fixed realtime to maintain valid value by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9978
* [#9932] Remove thrift dependency of Agent module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9941
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9981
* [#9893] Fix test failure due to changed log4j2 lookup filename by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9982
* [#9932] Fix testcase failure by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9985
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9988
* [#NOISSUE] fix test fail by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9995
* [#9932] Remove thrift dependency of Tools module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9996
* [#9989] Update maven-shade-plugin configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9997
* [#9932] Rename directory name for thrift-datasender by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9986
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9998
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9999
* [#9979] add pinot offline table ingestionConfig by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/9980
* [#9936] Update unsampled async request by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9987
* [#9932] Remove thrift dependency of Collector module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10000
* [#noissue] Fix cxf-it test by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10005
* [#9983] Replaced most thrift DTOs into gRPC in realtime-module by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9984
* [#9932] Replace with Netty4 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10007
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10017
* [#10018] Suggest dynamic list of available agent profiles by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10019
* [#10023] Improve reference release timing for GC by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10022
* [#10026] Make TraceService, SqlMetaDataService abstract by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/10021
* [#10024] Update renamed batch configuration bean by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10025
* [#noissue] Enhance server-map update in realtime by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10030
* [#10035] Fixed agent list in active request by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10040
* [#10041] Add collected uri type option for spans by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10042
* [#noissue] Update README.md by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10038
* [#noissue] Remove unnecessary HttpServletRequestWrapper by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10048
* [#10049] Remove unnecessary resource locations by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10051
* [#10049] Exclude etag from fingerprinted web resources by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10052
* [#10041] Add auto option to profiler.span.collected.uri by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10044
* [#9942] Add uri stat charts by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9947
* [#10049] Apply cache & encoded resource resolver by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10054
* [#noissue] Add missing image by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10055
* [#noissue] Refactor GrpcSpanBinder by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10056
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10058
* [#10049] Modify cache policy by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10059
* [#10046] Added additional servlet registration /api/* by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10047
* [#noissue] Update server-map layout manually as default by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10061
* [#noissue] Show ptxid search on initial page by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10062
* [#noissue] Reset period when it's out of range by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10063
* [#10064] Add MaxResultsPerColumnFamily to prevent OOM by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10065
* [#noissue] Refator HbaseTraceDaoV2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10066
* [#noissue] Delete unnecessary assembly configurtion by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10067
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10069
* [#10071] Fix NPE in GithubAgentDownloadInfoDao by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10072
* [#noissue] Integrate AgentDownloadController into InstallModule by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10073
* [#noissue] Simplify Controller configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10074
* [#9597] add new inspector function by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10070
* [#noissue] Restart fetching when back to the page in realtime by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10076
* [#10077] Remove unnecessary @EnableWebMvc by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10075
* [#10077] Remove duplicate spring beans by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10078
* [#noissue] add use-suffix-pattern for *.pinpoint requests by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10082
* [#10079] Propagate pubsub req cancellation by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10080
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10085
* [#9597] Resolving duplication of bean names by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10094
* [#noissue] Remove unnecessary applicationContext-web-hbase.xml by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10086
* [#10046] Add /api/ prefix for api call by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10097
* [#10046] Added  prefix to websocket endpoints by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10096
* [#10081] Added annotations for parameter validation by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10083
* [#10099] Remove WebApplicationType.SERVET from Batch module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10100
* [#10046] Removed unnecessary ws own prefix by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10104
* [#10081] Added annotative param validations by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10106
* [#10046] Add api prefix for websocket request by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10105
* [#noissue] Enhanced getting userId from principal by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10111
* [#10114] Apply jackson-module-parameter-names by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10115
* [#10114] Remove unnecessary ObjectMapper by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10116
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10121
* [#noissue] Unify chart response foramts for uri stat and system metric by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10098
* [#9942] Add charts in url stat page by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10119
* [#noissue] Apply ReflectiveOperationException by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10122
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10125
* [#10114] Add Jackson Util by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10120
* [#10117] Unified RestTemplate configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10118
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10126
* Remove unnecessary line by @yuyivic in https://github.com/pinpoint-apm/pinpoint/pull/10057
* [#10123] Publish an event when inserting spans by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/10124
* [#noissue] remove unused code by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/10135
* [#noissue] Fix scatter data fetching condition by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10136
* [#10088] Separate webhook module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10112
* [#9666] Added null-check before converting thrift to grpc by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10138
* [#noissue] Cleanup by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10139
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10137
* [#9945] new api for server map right panel by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/9946
* [#10131] End of support for hbase 1.x by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10134
* [#noissue] Remove unnecessary source by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10144
* [#noissue] Added Logs to record route request by @LoggingResearch in https://github.com/pinpoint-apm/pinpoint/pull/10140
* [#10049] Apply compression in fe build by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10148
* [#noissue] Add Event API to WebhookAlarmService interface by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10147
* [#10131] Migrate HBase1 API to HBase2 API by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10146
* [#10149] Replace the junit4 test with junit5 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10150
* [#10143] Add batch jobs for uri stat alarms by @ghttps://repo1.maven.org/maven2/com/navercorp/pinpoint/

- [pinpoint-agent-3.0.0.tar.gz](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-agent/3.0.0/pinpoint-agent-3.0.0.tar.gz)
- [pinpoint-batch-3.0.0-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-batch/3.0.0/pinpoint-batch-3.0.0-exec.jar)
- [pinpoint-collector-3.0.0-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-collector/3.0.0/pinpoint-collector-3.0.0-exec.jar)
- [pinpoint-collector-starter-3.0.0-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-collector-starter/3.0.0/pinpoint-collector-starter-3.0.0-exec.jar)
- [pinpoint-web-3.0.0-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-web/3.0.0/pinpoint-web-3.0.0-exec.jar)
- [pinpoint-web-starter-3.0.0-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-web-starter/3.0.0/pinpoint-web-starter-3.0.0-exec.jar)a-ram in https://github.com/pinpoint-apm/pinpoint/pull/10145
* [#noissue] Change AnnotationBo to immutable object by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10153
* [#10131] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10154
* [#9666] Durable atc for delayed agent list query by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10156
* [#noissue] Remove unnecessary boxing by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10155
* [#NOISSUE] cleanup code by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10157
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10158
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10160
* [#9631] Record SpanEventException in SpanRecorder.recordException() by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9632
* [#9631] Updated submodule grpc/grpc-idl by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10161
* [#9631] Turn off exception trace module in release profile by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10163
* [#9631] Memory optimization by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10164
* [#noissue] Cleanup SpanStorePublisher by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10167
* [#noissue] Remove unnecessary configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10169
* [#noissue] Remove unnecessary tx:annotation-driven by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10171
* [#10129] Remove logback dependency of zookeeper by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10174
* [#10165] Use BootLogger to prevent recursive Appender call by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10166
* [#10165] Cleanup agent logger configuration by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10168
* [#9948] Replace non-unique sqlId with sqlUid by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/9930
* [#noissue] Optimize memory usage by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10178
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10181
* [#9597] change reponse spec. Improved data parsing logic during dao calls by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10183
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10182
* [#9948] Refactor SqlMetaDataService by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10185
* [#9666] Moved realtime module from starter into basic by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10180
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10190
* [#noissue] Remove unnecessary thrift classes by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10193
* [##10131] Remove hbase2-module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10192
* [#10131] Update link of Hbase compatibility table by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10194
* [#noissue] Cleanup spring-kafka dependency by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10184
* [#noissue] Rename SqlParser to SqlNormalizer by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/10201
* [#noissue] Added logs for responding pubsub demands by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10202
* [#10205] Provides a function to configure the pinot broker list by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10206
* [#9948] Add missing beans in batch module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10207
* [#noissue] Remove ant_path_matcher configurations by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10204
* [#noissue] Change xml config to java config in flink module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10212
* [#noissue] Cleanup Batch configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10213
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10215
* [#10208] Added channel module by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10209
* [#noissue] Fixed typo by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10216
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10217
* [#10210] Separate datasource module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10211
* [#10218] Realtime ATC on redis can switch application by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10219
* [#10210] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10222
* [#10210] Update pinot configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10223
* [#9631] Receive and send it to EmptyExceptionTraceService by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9640
* [#9631] Pass handlers to constructor by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10224
* [#9631] Fix type for GrpcAgentInfoHandler by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10225
* [#noissue] Refactor UriStat module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10226
* [#noissue] Cleanup InspectorWebApp by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10228
* [#noissue] Cleanup UriStat Module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10229
* [#noissue] Fix property source by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/10230
* [#10220] Add `profiler.uri.stat.collect.http.method` option to collect uri statistics with http methods by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10221
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10231
* [#10232] Separated redis property sources by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10234
* [#noissue] Simplify CompletableFuture by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10233
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10235
* [#10236] Added redis KV channel by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10239
* [#10149] Update plugin test launcher by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10242
* [#10149] Rollback update plugin test launcher by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10243
* [#10246] Fix missing leave() of ScopedInterceptor when an exception occurs by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10247
* [#9636] Added log livetail feature by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10245
* [#10248] Add StringPrecondition by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10249
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10250
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10251
* [#10252] Improve Dynamic Registration of AlarmChecker by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10253
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10254
* [#noissue] Refactored realtime, log by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10255
* [#10244] Change serviceTypeCode type by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/10258
* [#10256] Removed rule of finalizing path for API with .pinpoint by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10257
* [#noissue] Update pinpoint.banner.configs by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10260
* [#noissue] Migrate mail settings from XML to java config by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10261
* [#noissue] Refactored log by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10263
* [#10149] Update plugin test launcher by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10267
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10271
* [#noissue] fix plugin-it testcase by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10272
* [#noissue] fix plugin it classloader by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10273
* [#noissue] fix plugin-it lib filter by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10274
* [#noissue] fix plugin-it class-path filter by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10276
* [#noissue] spring batch dependency cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10277
* [#noissue] fix plugin-it spring6 java version by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10279
* [#9631] Add exceptionTrace Module by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9707
* [#noissue] fix plugin-it spring-6 disabled by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10281
* [#noissue] fix plugin-it spring 6 pom.xml by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10282
* [#noissue] Changed realtime recentness into 5m by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10259
* [#noissue] fix plugin-it shared classloader by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10284
* [#noissue] fix plugin-it thrift-014 class by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10286
* [#noissue] fix plugin-it oracle driver by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10287
* [#noissue] fix plugin-it thrift forked by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10288
* [#noissue] fix plugin-it oracle19 forked by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10289
* [#noissue] fix plugin-it shared testcase target by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10290
* [#noissue] Cleanup Inspector by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10280
* [#noissue] Remove deprecated classes by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10296
* [#noissue] fix plugin-it debug by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10298
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10297
* [#9945] add time aggregation to new servermap api by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/10275
* [#noissue] Refactor ApplicationMap module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10304
* [#10397] Add NPE Check in Hbase plugin by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10306
* [#noissue] Generalized rule of rewriting into front by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10305
* [#noissue] Cleanup CommonComponent configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10312
* [#noissue] Refactored redis features by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10309
* [#noissue] Refactor MatcherGroup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10319
* [#noissue] fix plugin-it shared instance by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10321
* [#10323] Update reactor error handler by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10324
* [#noissue] Included v3 react front application by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10326
* [#noissue] fix plugin-it oracle19 fork by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10328
* [#10331] add default destination agent Id by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/10332
* [#10333] Update reactor publishOn, subscribeOn options by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10334
* [#noissue] Refactor PathRewriter by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10337
* [#noissue] Cleanup CommonComponent configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10320
* [#noissue] Refactor Web configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10344
* [#noissue] Remove PinpointThreadPoolExecutorFactoryBean by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10346
* [#noissue] change package name for pinot-batch by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10347
* [#NOISSUE] logging for batch exception by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10354
* [#10343] Removed cluster between web, collector by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10350
* [#noissue] Moved atd controller into authed by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10356
* [#9631] Cleanup Exception Trace Module by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10340
* [#noissue] fix serverMapDataFilter on linkSelector by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/10351
* [#noissue] Fixed default atd service by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10359
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10360
* [#noissue] Refactor Hbase configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10349
* [#noissue] Remove preStartAllCoreThreads from ExecutorFactoryBean by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10361
* [#noissue] fix plugin it spring 6 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10364
* [#10355] Fix servlet response http-status-recorder by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10357
* [#noissue] fix plugin it forked java by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10370
* [#noissue] Remove unnecessary logging dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10374
* [#noissue] Restore jul-to-slf4j dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10376
* [#noissue] Removed thrift in realtime by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10369
* [#noissue] Refactor Executor Configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10375
* [#noissue] Fixed realtime spring module by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10379
* [#noissue] Cleanup by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10380
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10382
* [#noissue] Cleanup ScatterProperties by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10381
* [#noissue] Remove incorrect validation by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10383
* [#noissue] fix plugin it mssql forked by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10384
* [#noissue] Removed emit failure handler, enhanced emit order by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10387
* [#10377] Add uri stat user input for tomcat plugin by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10378
* [#10388] Created frontend-angular by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10391
* [#NOISSUE] update datasource configuration by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10392
* [#noissue] Cleanup by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10395
* [#noissue] Update README.md by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10398
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10399
* [#noissue] Cleanup maven build by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10400
* [#noissue] Cleanup ExecutorProperties dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10393
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10402
* [#noissue] Refactor HbaseConfiguration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10403
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10406
* [#noissue] Updated grpc-idl by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10409
* [#10358] Ensure className not null for module permission by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10396
* [#noissue] Cleanup by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10410
* [#9945] add apdex score for new serverMap by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/10394
* [#9631] Limit length of errorMessage for better stability by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10413
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10416
* [#10371] Update child trace end point guard by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10373
* [#noissue] Add logs by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10412
* [#noissue] Refactor mybatis configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10411
* [#10418] Update reactor threading by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10419
* [#9631] Limit length of stackTrace strings for better stability by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10415
* [#9631] Fix typo by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10421
* [#9631] Limit length of errorMessage in groupBy for better stability by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10423
* [#noissue] fix plugin it - mongodb and mybatis by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10426
* [#noissue] Fix menu-switch on realtime by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10429
* [#noissue] fix plugin-it engine discover by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10430
* [#10420] Removed PinpointNettyServerBuilder, Tracing gRPC logId by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10428
* [#noissue] Fix when closing error popup on transaction-detail by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10434
* [#10388] Added frontend forceclean by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10435
* [#10431] Optional gRPC stat logging in agent by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10433
* [#10350] Removed zookeeper tests by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10436
* [#9631] Store errorMessage as the replaced string in the collector by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10432
* [#noissue] Fixed unstable test: FluxCommandResponseObserverTest by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10438
* [#10437] Update mark error of spring tx plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10439
* [#9631] Cleanup by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10441
* [#noissue] Make UserGroup Serializable by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10443
* [#10444] Upgrade SpringBoot3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10445
* [#10444] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10449
* [#10444] Remove slf4j dependency, Add log4j2 logger to Netty by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10451
* [#10444] Cleanup jakarta activation dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10452
* [#10444] Cleanup Batch dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10453
* [#noissue] Add build.frontend.skip profile for maven by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10455
* [#10454] Update circuit breaker, retry, timeout of reactor by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10456
* [#noissue] Fixed unstable publishing of collector state by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10446
* [#10444] Remove javax dependency of jjwt by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10458
* [#10444] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10460
* [#10463] Major version changed from 2.6.0 to 3.0.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10464
* [#9631] Change format long to String; spanId, exceptionId by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10466
* [#noissue] Add /monitor/* to ServletRegistrationBean by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10465
* [#9636] Added new livetail endpoints by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10457
* [#noissue] update spotbugs-exclude by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10471
* [#noissue] Cleanup deprecated Hbase API by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10472
* [#noissue] Cleanup deprecated Hbase API by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10473
* [#9648] Support uri stat for webflux router-handler by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10470
* [#10481] Improved to operate normally according to profile settings by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10482
* [#noissue] update spotbugs exclude for dto by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10483
* [#9631] Check length of agentId by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10484
* [#noissue] Migrate to use jdk base 64 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10485
* [#10454] update reactor retry when by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10488
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10490
* [#10454] Update resilience4j hook on error by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10491
* [#9631] Use canonical name instead of simple name by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10494
* [#noissue] Use path when indicating url, uri, path by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10495
* [#10486] Add package name to class loading rule of agent classloader by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10489
* [#9631] Use getName instead of getCanonicalName by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10502
* [#10492] Update reactor mark error by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10493
* [#9631] Change the name of groupBy attribute more user-friendly by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10503
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10501
* [#10504] Geometry filter query in the mongodb is not traced by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10505
* [#noissue] Add alpha postfix to version pattern by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10506
* [#10444] Cleanup slf4j2 dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10508
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10509
* [#10511] Update compatibility with slf4j 2.x version upgrade by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10512
* [#noissue] Handle -px as stable release version by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10516
* [#10517] Fix nodes is null in transaction info request by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10518
* [#noissue] fix plugins-it failsafe failure ignore by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10519
* [#noissue] fix plugin-it failure ignore by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10521
* [#10511] Cleanup slf4j 2.x dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10515
* [#10496] reconnect on unexpected error by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/10499
* [#9631] Add tenantId for better performance by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10522
* [#noissue] fix plugin-it agent classloader filter by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10523
* [#10046] Fix outdated url for timeline beta by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10525
* [#9631] Add ApplicationServiceType in /transactionInfo by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10514
* [#9631] Change annotation name; ExceptionLinkId to ExceptionChainId by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10526
* [#10529] determine the behavior of individual batch jobs in the properties file. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10530
* [#9631] Pass empty exceptionChainId if negative by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10533
* [#6512] flink version upgrade by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10536
* [#10531] Apply AsyncConnection of HBase by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10532
* [#10534] Update vertx plugin to support vert.x 4.5.0 version by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10535
* [#noissue] Add sqlstat web config properties by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/10539
* [#noissue] Update agentInfo error log format by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10538
* [#10046] Fix `server.error.path` to include `/api` prefix by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10540
* add clickhouse plugin by @wangjiee1 in https://github.com/pinpoint-apm/pinpoint/pull/9795
* [#noissue] Remove property for thrift ip by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10546
* [#noissue] Remove unused pinpoint-bootstrap-java8.jar by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10551
* [#10547] add zgc as jvm gc type by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10550
* [#noissue] fix scatter range setting bug and styles by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/10554
* [#10549] Add tests for Grpc converters by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10552
* #10531 Reimplement HbaseTemplate based on Async API by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10541
* [#noissue] Remove mockStatic from testcase by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10564
* [#noissue] Resolved collector tests by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10565
* [#noissue] Fix test failures by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10569
* [#10531] Enable nativeAsync by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10570
* [#10547] add zgc(java gc) type to the agent by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10568
* [#10566] Set the log level of ModuleBoot using system env by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10567
* [#noissue] Set default `pinpoint.modules.realtime.enabled` to true by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10571
* [#noissue] Added batch cache manager by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10572
* [#noissue] Patched flink hbase config by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10573
* [#10531] Improved exception handling by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10574
* [#noissue] fix common lib in plugin it by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10575
* [#10557] disable lettuce native kqueue transport by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/10562
* [#noissue] Throttled header propagation log by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10576
* [#noissue] fix plugin it clear by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10577
* [#10578] Add docker maven plugin by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10579
* [#noissue] Capture context when throwing SpanInsertEvent by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/10584
* [#noissue] Import CollectorEventConfiguration in BasicCollectorApp by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/10585
* [#noissue] Cleanup naming conventions for server maps by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10586
* [#noissue] Check logger is debug enabled by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10587
* [#noissue] Explicitly declare PropertySourcesPlaceholderConfigurer for flink module by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10588
* [#noissue] fix plugin-it resource clean by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10590
* [#noissue] fix plugin-it netty and urlconnect by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10591
* [#10531] Adjust cache timeout time of AsyncBufferedMutator by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10592
* [#noissue] Use PropertyPlaceholderAutoConfiguration by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10594
* [#noissue] Apply Pattern Matching by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10595
* [#noissue] Parse collector args with spring shell by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10597
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10600
* [#noissue] Resolve some spotbugs warnings by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10602
* [#noissue] Replace Node and Link states with JsonView by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10598
* Use GITHUB_OUTPUT envvar instead of set-output command as the latter is deprecated by @arunsathiya in https://github.com/pinpoint-apm/pinpoint/pull/10581
* [#10604] Mark multiple sql executions as error by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/10596
* [#10604] Move ExecuteQuery state to SpanEvent by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10621
* [#noissue] Fix missing JsonView configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10622
* [#noissue] Remove Deprecated API of ServerMap by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10611
* [#10615] Add new Main classes to SpringBootDetector by @nooose in https://github.com/pinpoint-apm/pinpoint/pull/10616
* [#noissue] Remove testng dependency by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10624
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10626
* [#noissue] Attach executables as artifacts by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10623
* [#noissue] Refactored live-tail by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10618
* [#9631] Make errorMessage CLP encoded by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10606
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10629
* [#10612] Fix kotlin coroutines dispatch interceptor by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10613
* [#10549] Use MapStruct to Mapping model to Protobuf in agent by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10283
* [#noissue] Remove thread local dependency of Span by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10635
* [#noissue] Added prop source for flink by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10634
* [#9597] add inspector api for application stat by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10636
* [#noissue] Fix testcase failure by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10638
* [#10637] Added trace method filter by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10639
* [#10614] add steam task check by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/10617
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10642
* [#10640] Add node limit in ServerMap to prevent OOM by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10641
* [#10549] Fix grpc async span chunk converter by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10644
* [#9631] Integrate ExceptionContext lifecycle into ExceptionRecordingService by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10619
* [#10605] Added cleanup inactive applications batch job by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10646
* [#9597] add inspector api for application stat : heap, cpu, transaction, activeTrace, responseTime, fileDescriptor, totalThreadCount, directBuffer, loadedClass by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10647
* [#10614]  Fix stream task check by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/10649
* [#10605] Merged cleaning batch job by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10650
* [#10605] Deprecated cleanupInactiveAgentsJob by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10654
* [#10658] Fix Race condition of BatchAsyncHbasePutWriter by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10659
* [#10656] Add java 11 httpclient plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10661
* [#10651] Changed transform api for plugin by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10652
* [#10549] Refactor mapping AsyncSpanChunk to PSpanChunk by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10648
* [#noissue] Fix kotlin-coroutines-it assertMethod by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10677
* [#noissue] Changed default behavior for collector-starter into 'run' by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10678
* [#10666] add span sampler for collector by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/10669
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10676
* [#10667] Removed 'boot' word from executable JAR by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10668
* [#10680] Move starter modules outside from metric module by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10681
* [#9631] Fix encoding of `errorMessage_logtype` by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10665
* [#9631] Change /errors groupBy criteria by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10682
* [#9631] Limit length of displayed GroupedFieldName by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10684
* [#9597] add datasource api for application stat by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10685
* [#9597] Insert the applicationName and tenantId values into the pinot's inspector data. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10686
* [#noissue] Cleanup by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10687
* [#noissue] rollback changes for reconnection by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/10689
* [#10643] Change behavior of disable option by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/10645
* [#9597] Enable alias operation for field name. Max data of nonHeap is also returned. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10690
* [#9597] improve inspector module by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10694
* [#NotAssigned] Support for Jetty Using Jakarta Servlet by @koo-taejin in https://github.com/pinpoint-apm/pinpoint/pull/10664
* [#noissue] Cleanup by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/10696
* [#4456] Typo correction by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10698
* [#4456] Insert ID into tag in datasource data. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10699
* [#9631] Record detailed exception startTime by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10691
* [#4456] add apdex api for inspector page by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10702
* [#4456] add apdex api for application inspector page by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10703
* [#10701] Apply resilience4j by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10700
* [#10704] Add a setting to control whether to activate the inspector function that stores data in hbase. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10705
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10709
* [#10708] Add spring cloud sleuth by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10714
* [#10711] Separate AsyncConnection from ApplicationMap by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10712
* [#noissue] Changed default maximum-pool-size of hikari cp by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10715
* [#noissue] Add agentId parameter to apdexScore api by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/10716
* [#9631] Use Clp Encoded errorMessage by default by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10720
* [#9631] Replace internal terms with intuitive words by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10721
* [#10725] Apply CompletableFuture to Pinot Async API by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10726
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10728
* [#10704] Improved the use of inspector data in pinot during alarm batch operation. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10730
* [#NotAssigned] Removed getRawStatusCode() method for removal in Spring Webflux 6.1 by @VSFe in https://github.com/pinpoint-apm/pinpoint/pull/10706
* [#NOISSUE] edit Copyright format by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10731
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10729
* [#10704] Increase query speed by adding the applicationName parameter to the agent API. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10734
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10733
* Revert "[#NotAssigned] Removed getRawStatusCode() method for removal … by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10735
* [#10693] Add enable option for grpc client reties by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/10732
* [#10737] Reduce DNS dependency of hostname API by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10738
* [#10723] Add ScanMetrics for Scan Performance Measurements by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10724
* [#10739] Add hostname to PinpointErrorData for pinpoint web by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10740
* [#10739] Cleanup by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10742
* [#10723] Improved large scanner to read in chunks by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10744
* [#10704] add sortKey about inspector data by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10745
* [#NotAssigned] Removed getRawStatusCode() method for removal in Sprin… by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10736
* [#10747] Replaced deprecated spring security methods by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10748
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10746
* [#noissue] Cleanup redundant springboot.bootstrap.main by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/10749
* [#10704] Added per-table performance measurement and comparison logic to improve read speeds. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10751
* [#10736] Separate dummy java class not to disturb spring-web dependency by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10752
* [#10736] Remove dummy classes after install the plugin by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10753
* [#noissue] Disable realtime in default by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10756
* [#10736] Use maven-clean-plugin instead of exec by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10754
* [#10757] Integrate agent module into a single module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10759
* [#10736] Split spring-stub into separate modules by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10762
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10761
* [#noissue] Update plugin-it path by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10764
* [#10701] Add io.vavr dependency for resilience4j by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10760
* [#10704] Added per-table performance measurement and comparison logic to improve read speeds. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10769
* [#noissue] Remove 'JAR will be empty' warning by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10768
* [#noissue] Fix plugin-it cassandra shared class by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10771
* [#10772] Fix interceptor option in resttemplate plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10773
* [#noissue] Apply maven standard properties by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10775
* [#noissue] Cleanup dependencies by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10763
* [#noissue] Cleanup maven by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10777
* [#noissue] Fix HBase2 compatibility by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10778
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10779
* [#NotAssigned] Resolve issue for rewritten launcher on spring-boot 3.2 by @koo-taejin in https://github.com/pinpoint-apm/pinpoint/pull/10663
* [#noissue] Cleanup maven by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10781
* [#noissue] Return empty string instead of 'total' by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10780
* [#noissue] Cleanup Deprecated HBase API by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10785
* [#noissue] Fix maven build errors by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10789
* [#noissue] Improve ARM64 compatibility of mysql-server-8 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10790
* [#noissue] Improved ARM compatibility of integration tests by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10791
* [#noissue] Replace inferring docker arch by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10788
* [#8929] Migrate FE framework from Angular to React by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/10792
* [#8929] Refactor fe-v3 by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10793
* [#noissue] Improved ARM64 compatibility by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10794
* [#noissue] Cleanup Deprecated Api by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10782
* [#10704] Increase API response speed by creating a separate application statistics table. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10800
* [#noissue] Improve ARM64 compatibility of JNA and JNR by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10801
* [#noissue] Improve ARM64 compatibility of zstd-jni by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10802
* [#noissue] Fix plugin-it classloading and dependency by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10803
* [#noissue] Cleanup testcontainers dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10799
* [#noissue] Cleanup testcontainers dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10805
* [#noissue] Improve ARM64 compatibility of elasticsearch plugin test by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10806
* [#noissue] Fix plugin-it forked required libs by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10808
* [#noissue] Fix SpotBug Warning by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10810
* [#noissue] Return the empty string as is by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10807
* [#noissue] Fix inspector agent-datasource chart by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10809
* [#noissue] Cleanup by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10804
* [#noissue] Fix route query in switching pages by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10811
* [#10757] Add pinpoint-plugins-test-module to agent-module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10813
* [#8929] fix: FE (v3) package build order by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/10797
* [#10704] Improved to operate with inspectorStatV2 table using sortkey. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10815
* [#noissue] Replace commons-logging with log4j2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10823
* [#10757] Move testcase-module to agent-module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10824
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10825
* [#10814] Prevent NPE when grpc status error message is null by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10816
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10827
* [#10704] Improved query to use index to improve query speed by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10830
* [#noissue] Added hbase client properties by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10831
* Separate application statistical data from agent statistical data and store the data in a separate Kafka topic. Make sure the sortkey matches the partition exactly. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10837
* [#10704] Code for performance testing and comparison are deleted. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10838
* [#noissue] Handle PinotResultSet implicitly convert "null" to null by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10812
* [#noissue] Cleanup GrpcSqlMetaDataHandler by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/10839
* [#noissue] Cleanup by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10843
* [#noissue] Fix intermittent testcase failure by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10842
* [#10840] Java Security is deprecated in java17 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10841
* [#10757] Integrate agent-testweb into agent-module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10845
* [#noissue] Resolve MapStruct warning due to protobuf unmapped target by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10847
* [#10757] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10849
* [#noissue] Linked application list cache by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10836
* [#noissue] Fix SpotBugs warnings by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10850
* [#10704] add segmentPruning function in application table config by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10851
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10855
* [#10852] Rename PLogger to PluginLogger by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10853
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10856
* [#noissue] Remove unwanted feature by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10835
* [#noissue] Cleanup by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10857
* [#noissue] Simplify OnClassLoader state by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10860
* [#10704] Cleanup of code added to compare performance by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10863
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10862
* [#noissue] Fix NPE of PluginTestClassLoader by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10864
* [#10858] Add InterceptorHolder instead of InterceptorRegistry by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10859
* [#10704] Attempts to improve performance and reduce disk utilization by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10871
* [#noissue] Cleanup LocalDate API by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10870
* [#noissue] Cleanup Job&Process management by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10869
* [#noissue] Eliminate unnecessary delay by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10873
* [#10859] Fix interceptorHolder on bootstrap classloader by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10874
* [#10866] Increase the coverage of the apiId cache by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10867
* [#10704] fit test fail by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10876
* [#noissue] Remove unnecessary threads by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10877
* [#noissue] Remove duplicate code by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10878
* [#10865] Added  param `serviceTypeName` by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/10868
* [#10865] Pass serviceTypeName when querying agent-list by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10875
* [#noissue] Fix incorrect date display by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10881
* [#10704] Modify the logic so that the long type sortkey is properly assigned a partition. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10891
* [#noissue] Fix realtime agent & Feat threadDump page by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/10884
* [#noissue] Change last-selected app setting key by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10892
* [#noissue] chore: fix package version by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/10893
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10902
* [#noissue] Add Java8 Date/Time type to PluginLoggerAdapter by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10903
* [#noissue] Apply Java8 Date API by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10905
* [#noissue] Add inspector menu in v3 by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10907
* [#noissue] chore: fix agent list UI by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/10908
* [#noissue] Apply Java8 Date API by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10906
* [#10704] Improved so that data in tables created with long type sortkey can be viewed by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10909
* [#noissue] Add timeout to Elasticsearch IT by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10911
* [#noissue] Update plugin-it method name by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10914
* [#10859] Fix interceptor holder log NPE by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10904
* [#noissue] Export missing component by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10915
* [#noissue] feat: add applicationList interface for few pages by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/10916
* [#noissue] Add limit to String.split by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10910
* [#noissue] Add custom hbase-schema-path by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10917
* [#noissue] Update v3 bundler version by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10920
* [#noissue] Fix loading favorite app-list by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10921
* [#noissue] Fix oracle 19 GssCredential by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10926
* [#10704] Create a minute unit statistical data table for agent by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10927
* [#noissue] Fix inspector route loader by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10929
* [#10704] After completing the performance comparison, temporarily comment out the code. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10938
* [#noissue] Replace class with record by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10937
* Modify create-dockerfiles.yml by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10939
* [#10934] Add time range check to uri stat controller by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10935
* [#10944] Improve RangeValidator by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10945
* [#10940] Fix mongodb reactive streams driver interceptor by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10941
* [#10578] Update project paths by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10949
* [#10944] Use RangeValidator to check the search time. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10950
* [#noissue] fix error boundary by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/10930
* [#10944] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10953
* [#10940] Move the class location to avoid loading the class in web to… by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10951
* [#noissue] Add codecov token by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/10957
* [#10940] Fix mongodb mongodbClient constructor by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10958
* [#noissue] fix servermap numaric display by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/10931
* [#10934] Use RangeValidator to check range in uri stat controller by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/10960
* [#10704] stored data separately in multiple tables to improve reading speed by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10963
* [#noissue] feat: add date format settings by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/10946
* [#noissue] Change inspector max date-range by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10962
* [#noissue] Unify `Range` class across common-server and metric-module by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10961
* [#10944] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10965
* [#noissue] Fix view-servers display control by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10968
* [#noissue] Add v3 build script by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10922
* [#10704] select tables based on hash value when looking up data. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10970
* [#noissue] Fix plugin-it fork shared dependency by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10971
* [#noissue] Add missing base-path by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10972
* [#noissue] Replace class with record by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10947
* [#noissue] Fix oracle19 ojdbc8 forked test by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10973
* [#10976] Limit concurrent hbase put requests to prevent OOM by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10977
* [#noissue] Remove Unnecessary boxing by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10978
* [#noissue] Cleanup SpotBug Warning by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10979
* [#noissue] Convert static field `OPTIONS` to non-static by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10980
* [#noissue] Add loglevel check by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10981
* [#noissue] Check `Range` with given parameter by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10982
* [#noissue] Remove duplicate mappers by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10983
* [#noissue] Upgrade codecov action by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/10985
* [#10704] optimize query. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10987
* [#10704] validate collected time by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/10988
* [#10966] Create virtual nodes for non-WAS `ServiceType` by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10967
* [#10966] Pass additional params for agent-list api by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10989
* [#10966] Pass additional params for agent-list api in v3 by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10990
* [#10976] Fix acquire leak by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10991
* [#9631] Add new optional parameter `filters` to errorList API by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/10986
* [#noissue] Cleanup hashcode by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10999
* [#10900] change spring batch schema because spring batch version has been upgraded. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11001
* [#noissue] Remove duplicate code in ServerMap by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11002
* [#noissue] Update secret token name for create-dockerfiles.yml by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/11006
* [#11005] Update getMethod compatibility of spring-webflux by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11008
* [#11004] Removed legacy channel api supports by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/11007
* [#10976] Add additional spanPutWriter by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10998
* [#noissue] fix view-servers scatter chart bug by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11000
* [#10704] change the CPU value to a percentage number by changing the scale by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11011
* [#noissue] Refactor ResponseTimeStatics by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11014
* [#noissue] Cleanup ServerMap by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11010
* [#10704] improved batch to work on a multi-table basis by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11013
* [#10704] deleted the logic operating based on a single table and improved the multi-table operation to be the default by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11016
* [#noissue] refactor collector span sampling by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11015
* [#noissue] Fix view-servers chart-data fetching api by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/10994
* [#10704] change the servicetype code to servicecode name for readability. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11020
* [#noissue] Unify `TimeWindow` related classes across web and metric by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11019
* [#11021] Add JsonFields for dynamic json field names by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11022
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11023
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11025
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11026
* [#noissue] feat: application link button for sidebar of Error, Inspector, Url page by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11024
* [#noissue] chore: change colors import by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11029
* [#noissue] Apply guava Ordering by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11030
* [#noissue] Change data-source chart data key by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/11031
* [#noissue] Fix load chart by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/11028
* [#noissue] Remove unnecessary gojs license by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11032
* [#11021] Apply JsonFields by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11027
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11035
* [#10704] update table schema by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11037
* [#issue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11036
* [#10704] change the URL because the module name is prefixed to the URL. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11039
* [#10704] sort the order of data to improve user readability. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11040
* [#issue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11038
* [#10704] change the url format to rest api. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11042
* [#10704] edit application metric config by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11043
* [#noissue] Change inspector api path by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/11044
* [#10704] set the format of the agent inspector table name. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11046
* [#9631] Cleanup by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11041
* [#9631] Correct string handling as originally intended by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11048
* [#11047] Add multi-table script for inspectorStatAgent table by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11049
* (#11055) refactor: remove space by @seunggabi in https://github.com/pinpoint-apm/pinpoint/pull/11056
* [#11057] Fix getInputStream() loop in jdk http plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11058
* [#11033] Change default UI to v3 by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/11034
* [#11052] Fix Caffeine Executor to not use jdk common pool by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11054
* [#11052] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11059
* [#10976] Replace AtomicInteger in ConcurrencyLimiterHelper with Semaphore by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11060
* [#10723] Add maxConcurrentAsyncScanner option by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11061
* [#11062] Change url info in pinpoint error data by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/11063
* [#noissue] Fix filteredMap merge logic by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/11064

## Dependency Update
* [#9861] Remove invalid gson dependency from hbase2 module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9862
* [#9873] Update mvnw to 3.9.1 by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9874
* [#9889] Bump log4j from 2.17.2 to 2.20.0 by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9890
* [#9910] Bump maven core from 3.8.6 to 3.8.8 for plugin test by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9911
* [#9950] Bump maven-surefire-plugin from 3.0.0-M7 to 3.1.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9951
* [#9952] Bump maven-compiler-plugin from 3.8.1 to 3.11.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9953
* [#9964] Bump maven-resources-plugin from 3.2.0 to 3.3.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9965
* [#9966] Bump maven-enforcer-plugin from 3.0.0 to 3.3.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9967
* [#9968] Bump maven-jar-plugin from 3.2.0 to 3.3.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9969
* [#9971] Bump jacoco-maven-plugin from 0.8.6 to 0.8.10 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9972
* [#9973] Bump maven-assembly-plugin from 3.3.0 to 3.6.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9974
* [#9989] Bump maven-shade-plugin from 3.1.1 to 3.4.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9990
* [#9993] Bump maven-dependency-plugin from 3.4.0 to 3.6.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9994
* [#9991] Bump build-helper-maven-plugin from 3.2.0 to 3.4.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9992
* [#10014] Bump google-guice from 5.1.0 to 7.0.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10015
* [#10036] Bump groovy-maven-plugin from 1.5 to 2.1.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10037
* [#10090] Bump springframework from 5.3.24 to 5.3.28 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10091
* [#10092] Bump springboot from 2.7.7 to 2.7.13 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10093
* [#10102] Bump hbase-client from 2.4.11 to 2.4.17 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10103
* [#10107] Bump maven-clean-plugin from 3.1.0 to 3.3.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10108
* [#10109] Bump frontend-maven-plugin from 1.12.0 to 1.13.4 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10110
* [#10129] Bump hbase2 client from 2.4.17 to 2.5.5-hadoop3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10130
* [#10132] Bump maven-surefire-plugin from 3.1.0 to 3.1.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10133
* [#10237] Bump ASM from 9.4 to 9.5 for JDK21 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10238
* [#10313] Bump spring-kafka from 2.9.4 to 2.9.11 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10314
* [#10315] Bump guava from 31.1-jre to 32.1.2-jre by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10316
* [#10352] Bump maven failsafe plugin from 2.22.2 to  3.1.2 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10353
* [#10467] Bump spring-kafka from 2.9.11 to 3.0.12 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10468
* [#10474] Bump snakeyaml from1.33 to 2.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10475
* [#10476] Bump spotbugs from 4.4.2.2 to 4.8.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10478
* [#10477] Bump pmd from 3.16.0 to 3.21.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10479
* [#10476] Bump spotbugs from 4.8.1 to 4.7.3.6 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10480
* [#10497] Bump grpc from 1.49.2 to 1.59.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10510
* [#10543] bump asm from 9.5 to 9.6 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/10548
* [#10555] Bump spring-kafka from 3.0.12 to 3.0.13 dependencies by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10556
* [#10560] Bump byte-buddy from 4.8.1 to 4.11.0 dependencies by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10561
* [#10582] Bump pinot jdbc client from 0.11.0 to 1.0.0 by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/10583
* [#10670] Bump json-path from 2.8.0 to 2.9.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10671
* [#10674] Bump spring framework from 6.0.13 to 6.0.16 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10675
* [#10672] Bump spring-boot from 3.1.5 to 3.1.8 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10673
* [#10783] Bump tiny-log from 2.1.1 to 2.7.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10784
* [#10786] Bump testcontainer from 1.17.6 to 1.19.7 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10787
* [#10795] Bump commons-compress from 1.21 to 1.26.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10796
* [#10817] Bump micrometer to 1.12.4 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10818
* [#10819] Bump junit from 5.9.3 to 5.10.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10821
* [#10820] Bump jackson from 2.15.2 to 1.16.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10822
* [#10846] Bump lettuce from 6.2.3 to 6.3.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10848
* [#10879] Bump commons-pool2 to 2.12.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10880
* [#10885] Bump springframework from 6.0.16 to 6.1.5 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10886
* [#10887] Bump spring-boot from 3.1.8 to 3.2.4 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10888
* [#10889] Bump spring-cloud to 4.1.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10890
* [#10894] Bump spring-security from 6.1.4 to 6.1.8 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10895
* [#10896] Bump spring-data to 3.2.4 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10897
* [#10898] Bump grpc from 1.59.0 to 1.62.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10899
* [#10912] Bump mybatis from 3.5.13 to 3.5.16 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10913
* [#10900] Bump spring-batch from 4.3.7 to 5https://repo1.maven.org/maven2/com/navercorp/pinpoint/

- [pinpoint-agent-3.0.0.tar.gz](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-agent/3.0.0/pinpoint-agent-3.0.0.tar.gz)
- [pinpoint-batch-3.0.0-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-batch/3.0.0/pinpoint-batch-3.0.0-exec.jar)
- [pinpoint-collector-3.0.0-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-collector/3.0.0/pinpoint-collector-3.0.0-exec.jar)
- [pinpoint-collector-starter-3.0.0-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-collector-starter/3.0.0/pinpoint-collector-starter-3.0.0-exec.jar)
- [pinpoint-web-3.0.0-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-web/3.0.0/pinpoint-web-3.0.0-exec.jar)
- [pinpoint-web-starter-3.0.0-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-web-starter/3.0.0/pinpoint-web-starter-3.0.0-exec.jar)https://repo1.maven.org/maven2/com/navercorp/pinpoint/

- [pinpoint-agent-3.0.0.tar.gz](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-agent/3.0.0/pinpoint-agent-3.0.0.tar.gz)
- [pinpoint-batch-3.0.0-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-batch/3.0.0/pinpoint-batch-3.0.0-exec.jar)
- [pinpoint-collector-3.0.0-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-collector/3.0.0/pinpoint-collector-3.0.0-exec.jar)
- [pinpoint-collector-starter-3.0.0-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-collector-starter/3.0.0/pinpoint-collector-starter-3.0.0-exec.jar)
- [pinpoint-web-3.0.0-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-web/3.0.0/pinpoint-web-3.0.0-exec.jar)
- [pinpoint-web-starter-3.0.0-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-web-starter/3.0.0/pinpoint-web-starter-3.0.0-exec.jar).1.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/10901

## New Contributors
* @geministarshine made their first contribution in https://github.com/pinpoint-apm/pinpoint/pull/9785
* @kojandy made their first contribution in https://github.com/pinpoint-apm/pinpoint/pull/9705
* @yuyivic made their first contribution in https://github.com/pinpoint-apm/pinpoint/pull/10057
* @LoggingResearch made their first contribution in https://github.com/pinpoint-apm/pinpoint/pull/10140
* @wangjiee1 made their first contribution in https://github.com/pinpoint-apm/pinpoint/pull/9795
* @arunsathiya made their first contribution in https://github.com/pinpoint-apm/pinpoint/pull/10581
* @nooose made their first contribution in https://github.com/pinpoint-apm/pinpoint/pull/10616
* @VSFe made their first contribution in https://github.com/pinpoint-apm/pinpoint/pull/10706
* @seunggabi made their first contribution in https://github.com/pinpoint-apm/pinpoint/pull/11056

**Full Changelog**: https://github.com/pinpoint-apm/pinpoint/compare/v2.5.1...v3.0.0

<!-- </latestReleaseNotes.md> -->

## Upgrade consideration

HBase compatibility table:

<!-- <compatibilityHbase.md> -->
| Pinpoint Version | HBase 1.x | HBase 2.x                                                                                                             |
|------------------|-----------|-----------------------------------------------------------------------------------------------------------------------|
| 2.0.x            | yes       | [optional](https://pinpoint-apm.gitbook.io/pinpoint/documents/hbase-upgrade#do-you-like-to-use-hbase-2x-for-pinpoint) |
| 2.1.x            | yes       | [optional](https://pinpoint-apm.gitbook.io/pinpoint/documents/hbase-upgrade#do-you-like-to-use-hbase-2x-for-pinpoint) |
| 2.2.x            | yes       | [optional](https://pinpoint-apm.gitbook.io/pinpoint/documents/hbase-upgrade#do-you-like-to-use-hbase-2x-for-pinpoint) |
| 2.3.x            | yes       | [hbase2-module](https://github.com/pinpoint-apm/pinpoint/tree/2.3.x/hbase2-module)                                    |
| 2.4.x            | yes       | [hbase2-module](https://github.com/pinpoint-apm/pinpoint/tree/2.4.x/hbase2-module)                                    |
| 2.5.x            | yes       | [hbase2-module](https://github.com/pinpoint-apm/pinpoint/tree/2.5.x/hbase2-module)                                    |
| 3.0.x            | no         | yes                                    |


<!-- </compatibilityHbase.md> -->

Agent compatibility to Collector table:

<!-- <compatibilityPinpoint.md> -->
| Agent Version | Collector 2.0.x | Collector 2.1.x | Collector 2.2.x | Collector 2.3.x | Collector 2.4.x | Collector 2.5.x | Collector 3.0.x |
|---------------|-----------------|-----------------|-----------------|-----------------|-----------------|-----------------|-----------------|
| 2.0.x         | yes             | yes             | yes             | yes             | yes             | yes             | yes             |
| 2.1.x         | no              | yes             | yes             | yes             | yes             | yes             | yes             |
| 2.2.x         | no              | no              | yes             | yes             | yes             | yes             | yes             |
| 2.3.x         | no              | no              | no              | yes             | yes             | yes             | yes             |
| 2.4.x         | no              | no              | no              | no              | yes             | yes             | yes             |
| 2.5.x         | no              | no              | no              | no              | no              | yes             | yes             |
| 3.0.x         | no              | no              | no              | no              | no              | no              | yes             |


<!-- </compatibilityPinpoint.md> -->

Additionally, the required Java version to run each Pinpoint component is given below:

<!-- <compatibilityJava.md> -->
| Pinpoint Version | Agent | Collector | Web | Flink |
|------------------|-------|-----------|-----|-------|
| 2.0.x            | 6-13  | 8         | 8   | 8     |
| 2.1.x            | 6-14  | 8         | 8   | 8     |
| 2.2.x            | 7-14  | 8         | 8   | 8     |
| 2.3.x            | 7-17  | 8         | 8   | 8     |
| 2.4.x            | 7-18  | 11        | 11  | 11    |
| 2.5.x            | 8-19  | 11        | 11  | 11    |
| 3.0.x            | 8-21  | 17        | 17  | 17    |


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
