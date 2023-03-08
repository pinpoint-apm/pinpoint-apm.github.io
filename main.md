<!-- <latestReleaseNotes.md> -->
# What's New in v2.5.0
# Key Features
## End of support for JDK7
 * issue : https://github.com/pinpoint-apm/pinpoint/issues/8867
## Introduced Apache Pinot as metric store
- Pinpoint now uses [Apache Pinot](https://pinot.apache.org/) as a repository for metrics.
### URI Metric 
- Supported frameworks : Spring Web MVC, Spring WebFlux, Vert.x-Web
- [manual](https://pinpoint-apm.gitbook.io/pinpoint/documents/uri_statistics)


![URI-Metric](https://user-images.githubusercontent.com/7564547/209653291-1cd050ed-5509-4973-b332-c0160cc24b79.png)


### Infrastructure Metric
- Pinpoint now supports [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [manual](https://pinpoint-apm.gitbook.io/pinpoint/documents/system_metric)


![Infrastructure-metric](https://user-images.githubusercontent.com/7564547/209653571-d02a150a-4db3-4024-9147-a7c76e1515ec.png)


## Improved CallTree UX 
- CallTree's search interface has been improved #9272


![call-tree2](https://user-images.githubusercontent.com/7564547/209653638-443f6ec5-9e69-464b-a13e-c8869fc9e0e5.png)


## New Plugins
- Supports Spring Data R2DBC #9089
- Supports Cassandra Java Driver 4.x #9452 
- Supports Apache HttpClient 5.x #9242 
- Add a sampling rate specification for each URL #9153 

## Bug Fixes
- Improved stability of Pinpoint collector #9264
  - Prevents collector's native memory leak due to malfunction of grpc agent
    Fixed in [go agent 1.0.1](https://github.com/pinpoint-apm/pinpoint/pull/9266)
## What's Changed
* [#8893] Prepare 2.5.0-SNAPSHOT by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8895
* [#noissue] Update readme.md by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8897
* [#noissue] Update Compatibility Table for 2.5.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8898
* [#8899] Upgrade jdk8 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8900
* [#8899] Update JDK8 of plugin test by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8905
* [#8904] Fix broken binary compatibility of THRIFT 0.13 of thrift plugin by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8910
* [#8911] Fix testcase failures in MongoDBIT by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8912
* [#noissue] Fig bug issue 8902, 890 by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/8920
* [#8911] Change the temp directory of mongod by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8916
* [#noissue] Update postgresql jdbc for jdk8 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8864
* [#noissue] Update amqp spring-rabbit for jdk8 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8936
* [#8937] Remove boostrap-java8 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8938
* [#8939] Remove profiler-optional-jdk7 for JDK8 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8940
* [#8930] Update lettuce reactive by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/8942
* [#noissue] Replace embedded-elasticsearch with testcontainers-elasticsearch by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8943
* [#8945] End of support for elasticsearch bbose client plugin by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8947
* [#8941] Update reactor plugin for subscribeOrReturn method. by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/8948
* [#8885] Fix to work normally without stack trace by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8949
* [#noissue] Remove internal LongAdder for jdk7 compatibility by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8950
* [#noissue] Add jetty plugin testweb by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/8951
* [#8004] system metric by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/8958
* [#8004] Modify the test code to bypass the build failure. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/8962
* [#8952] Replace guava cache with caffeine cache by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8953
* [#noissue] Fix port conflicts in ActiveMq test by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8960
* [#8945] Add ElasticSearch Annotation to type-provider by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8963
* [#8934] Change existing agent list lookup policy in inspector by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/8935
* [#8965] Add SharedTestLifeCycle to simplify plugin integration tests by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8966
* [#4851] fix test fail by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/8968
* [#8965] Apply SharedTestLifeCycle to plugin test by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8969
* [#8965] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8974
* [#8890] ServiceLoader does not work properly in OpenJ9 by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/8903
* [#8890] openj9 module layer binding by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/8976
* [#8965] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8977
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8982
* [#noissue] Cleanup getClassLoadingLock by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8984
* [#8965] Apply SharedTestLifeCycle to Oracle by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8981
* [#8985] edit spring security properties in metric moudle by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/8987
* [#8979] Use ResponseStatusException to make error responses by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/8983
* [#8988] to fix hbase error(ClassNotFoundException). by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/8992
* [#noissue] Apply testcontainers-elasticsearch to testweb by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8994
* [#noissue] Fix port conflicts in integration test by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8996
* [#noissue] Fix missing mssql server configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8997
* [#8965] Simplified thread flow control of SharedTestLifeCycle by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8998
* [#noissue] Cleanup ASMClassNodeLoader by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8999
* [#9000] Use insertRuleExceptWebhookSend when webhook.enable=false by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9001
* [#8915] Migrate most of junit4 test to junit5 test by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/8975
* [#8993] Add apdex alarm by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/8995
* [#9000] Use updateRuleExceptWebhookSend when webhook.enable=false by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9007
* [#8979] Remove unnecessary ResponseEntity by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9010
* [#8934] Refactor AgentInfoFilter by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9012
* [#noissue] Checks webhook url validity by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9013
* [#noissue] Fix period selection by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9020
* [#9017] Add max limit to getApplicationHostInfo for OOM prevent by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9018
* [#9021] Reduce memory usage by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9022
* [#9023] Reduce memory usage for AgentInfo query by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9024
* [#9015] Update mongodb plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9019
* [#9025] Update thrift plugin for 0.14 or later by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9026
* [#8979] Remove ModelAndView responses for browser clients to keep all error responses in JSON by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9031
* [#8915] Fix IT test by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/9033
* [#8979] change json error res format by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/9034
* [#9037] Added property to set "zookeeper.znode.parent" of hbase by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9040
* [#9037] Refactor AgentInfo by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9041
* [#noissue] Clean unused import by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9043
* [#9023] Fix: batch cannot find AgentInfoBoMapper by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9049
* [#9023] Polishing by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9053
* [#noissue] Fix period selection by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9056
* [#noissue] Fix incorrect style in inspector and metric page by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9057
* [#9023] Refactor ApplicationAgentList by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9060
* [#noissue] Guard NPE while processing phone number by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9050
* [#9023] Add hyperlink factory in batch by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9062
* [#9063] Added option to operate only metric module by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9064
* [#noissue] Fix duplicated request in changing host-group by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9070
* [#noissue] Refactor ServerBuilder by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9065
* [#noissue] Fix style syntax by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9071
* [#noissue] Refactor NPE check by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9072
* [#9074] Add setting for exception handling by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9075
* [#8878] Add support to kafka version 2.8 ~ 3.2 for kafka plugin by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9051
* [#9023] Reduce memory usage of AgentInfo by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9073
* [#9052] Improve AlarmJob performance by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9077
* [#noissue] Refactor HbaseTable enum class by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9084
* [#9089] Add spring data r2dbc plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9092
* [#noissue] Fixed `Range` returns `from` instead of `to` in `getToDateTime` by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9093
* [#noissue] Update 2.4.1 release by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9099
* [#noissue] Fix spring data r2dbc plugin testweb by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9100
* [#noissue] Fix testcase port by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9101
* [#9078] Stable cleanup by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9088
* [#noissue] Polishing MongoPlugin by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9103
* [#noissue] Refactor ApplicationAgentsList by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9105
* [#noissue] Refactor Model Package by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9107
* [#noissue] Mark alarmWriterInterceptor is nullable by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9109
* [#noissue] Fix it port range. by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9110
* [#9111] Fix NPE bug in mongo-plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9112
* [#9086] Lightened agentCountJob by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9096
* [#noissue] Fix port range in grpc it by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9118
* [#noissue] Fix port range in thrift it by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9119
* [#9115] Improve legacyCompatibilityCheck by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/9116
* [#9122] Fix NPE of JVMInfo in DetailedAgentInfo by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9123
* [#noissue] Remove log4j2 configuration to reattach ErrorPageFilter error logs by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9132
* [#9128] Manage data by moving the metadata table(tag, datatype) from mysql to pinot by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9129
* [#noissue] Fix some typos by @cuishuang in https://github.com/pinpoint-apm/pinpoint/pull/9004
* [#noissue] Replace with java.time.Clock by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9138
* [#9139] Enable user can modify mybatis error marking rule by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9140
* [#noissue] Polishing by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9143
* [#noissue] Apply @GuardedBy to ActiveThreadCountHandler by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9147
* [#9145] Optimizing memory usage of buffer pool for UDP receiver by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9146
* [#noissue] Polishing by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9159
* [#noissue] Refactor groupBy of ApplicationAgentList by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9126
* [#9148] activeThreadCountWorkerRepository uses ClusterKey as key type by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9155
* [#noissue] Polishing by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9160
* [#NOISSUE] edit table config by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9161
* [#NOISSUE] change port by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9162
* [#9153] Add URL sampler by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9156
* [#9157] Prevent initializing active thread workers multiple times by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9158
* [#noissue] Polishing by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9166
* [#noissue] Ascended logging level of managing collector zknodes by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9169
* [#9164] Update vert.x plugin for 4.x by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9165
* [#noissue] Change chart layout by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9171
* [#9176] Improved code so that connection object of pinot is reused by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9177
* [#9181] Change agent's gRPC stream log level by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9182
* [#9183] Fix rabbitmq consumer handle by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9184
* [#9185] Fix log level of abstract method transform by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9186
* [#noissue] Keep previous state in switching pages on the sidebar by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9195
* [#noissue] Increased thrift container max length by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9196
* [#9187] Fix span dispatch failed by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9194
* [#NOISSUE] add log for performance test by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9197
* [#noissue] fix realtime container height by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/9192
* [#9189] Make ApdexScore pass additional information used in calculating ApdexScore by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9193
* [#9198] Fix agent callstack overflow log by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9199
* [#9210] Beaned TFActiveTraceMapper by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9211
* [#noissue] Add select-option text-color to handle os issue by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9212
* [#9210] Removed getStartTimestamp by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9214
* [#9215] Fixed positions of metric measurers by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9216
* [#9217] Change distribution logic for kafka key by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9218
* [#9220] Add missing AuthorizationConfig by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9221
* [#noissue] Change TimeWindowSampler, window range in metric module by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/9213
* [#9176] Add PinotDataSource by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9219
* [#9217] Change distribution logic for kafka key in collector by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9222
* [#9224] Add PinotAsyncTemplate by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9225
* [#noissue]  Cleanup Hbase plugin by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9188
* [#noissue] Add more logs for collector grpc server by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9230
* [#9229] Fix incorrect AKKA ServiceType by @koo-taejin in https://github.com/pinpoint-apm/pinpoint/pull/8921
* [#noissue] LoggingRejectedExecutionHandler logs first in-come by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9231
* [#9244] Improved for updating datatype save period by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9245
* [#noissue] Cleanup Collections.sort by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9247
* [#9242] Add http client 5.x plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9246
* [#noissue] Cleanup Comparator by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9248
* [#noissue] Refactor ApplicationAgentsList by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9228
* [#noissue] Provide a different query-period for metric page by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9253
* [#noissue] Reduce memory usage for getParameterTypes by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9252
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9256
* [#noissue] Fix spotbugs warning by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9251
* [#noissue] Fix postgresql it 42.50 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9257
* [#noissue] Fix spotbugs warning - performance by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9259
* [#noissue] Add HBase HTable method dataSize intercept to HBase plugin by @jimolonely in https://github.com/pinpoint-apm/pinpoint/pull/8875
* [#9240] get system metric charts seperately by tags by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/9241
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9262
* [#noissue] Fix spring-amqp-rabbit it by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9265
* [#9267] Add Clock with millisecond precision by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9268
* [#9264] Guarded ping only when stream is ready by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9266
* [#NOISSUE] add log for performance test by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9271
* [#noissue] Enhance calltree search user-experience by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9272
* [#noissue] Update kafka IT 3.x by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9273
* [#9270] Fix a bug in constructing servermap agents list by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9274
* [#noissue] Clean up unused code by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9276
* [#noissue] Update rabbitmq IT by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9277
* [#noissue] Fix netty IT by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9279
* [#9280] Matching rules have been improved by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9282
* [#noissue] Change metric groupName by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/9283
* [#noissue] Polishing: remove unused comparator by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9284
* [#noissue] remove whitespace in metric groupName by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/9287
* [#noissue] Cleanup legacy commons-lang dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9288
* [#noissue] Refactor metric in fetching data by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9292
* [#9295] Remove commons-text dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9300
* [#9254] Collects and retrieves URL statistics using Pinot by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9255
* [#9298] Downgrade to Dubbo 2.6.11 due to workflow build failure by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9307
* [#noissue] Polishing by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9304
* [#9254] Fix Testcase failure by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9309
* [#noissue] Generify AgentsListMap for use in elsewhere by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9310
* [#9254] Update dependency of dubbo-plugin-testweb by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9313
* [#noissue] update grpc-idl hash by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9318
* [#noissue] Fix log level of cluster manager by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9312
* [#NOISSUE] cleanup code (unused code, mysql logic) by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9320
* [#9322] Remove unnecessary guava dependencies by @JaneQ9900 in https://github.com/pinpoint-apm/pinpoint/pull/9321
* [#noissue] Update jdk7 it by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9325
* [#noissue] Add httpclient4 testweb by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9303
* [#noissue] cleanup by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/9326
* [#noissue] Remove agent-search-input component by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9327
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9328
* [#noissue] Add GA for transaction-search by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9329
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9330
* [#9331] Bump apache hbase client from 1.7.1 to 1.7.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9332
* [#noissue] Apply generic to CodeResult by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9335
* [#noissue] Apply try-with-resources by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9336
* [#noissue] Remove unnecessary ObjectUtils by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9337
* [#9323] GRPC server utilize call executor by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9324
* [#9323] Fix gRpc receiver configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9339
* [#noissue] Polishing by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9341
* [#9315] Add order in collected metric info, metric host info by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/9316
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9343
* [#9254] Fixing omitted changes for url statistics end time by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9352
* [#9350] Replace Base64 with java.util.Base64 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9351
* [#9317] Separate AgentListController by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9319
* [#9340] Add url statistics for vertx by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9342
* [#noissue] cleanup by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9354
* [#9350] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9353
* [#noissue] Fix SpotBugs Warnings by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9359
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9360
* [#9355] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9366
* [#9357] Saves spring mvc bestMatchingPattern to request attribute when error happens by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9358
* [#8915] Cleanup junit4 dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9365
* [#9355] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9373
* [#9344] Fix incorrect bytes encoding in ZookeeperClusterManager by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9345
* [#noissue] Fix SpotBugs Warnings by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9378
* [#9348] Add lambda expression matcher by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9349
* [#noissue] remove JAVA_9_HOME by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9377
* [#noissue] Fix junit testcase import by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9381
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9382
* [#noissue] Rollback  by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9386
* [#9384] Implements the basis for implementing the concept of tanent by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9385
* [#noissue] fix kafka test failure by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9387
* [#noissue] Polishing by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9388
* [#5249] Add namespace file for tenant by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9391
* [#9389] Replace hamcrest into assertj by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9390
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9396
* [#noissue] Add config properties by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9397
* [#9393] Return full range of timestamps and fill empty values to zero by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9395
* [#noissue] Keep the state between menus by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9402
* [#noissue] Change the way of getting user agent info by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9406
* [#9400] Implement URL statistic page by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9401
* [#9389] Re-include hamcrest for test by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9408
* [#9317] Change AgentListController api url by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9368
* [#9407] Add tenant id column for url stat by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9410
* [#9317] Change AgentListController api url by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9413
* [#9163] Add netty-handler-proxy.jar to agent by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9418
* [#9163] Remove unnecessary netty-handler-proxy from main pom.xml by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9419
* [#noissue] Display the webhook menu based on the config by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9420
* [#9411] Add SecurityContextUtils by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9403
* [#9371] Add agent load-balancer which periodically change collector server by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9372
* [#9414] Refer classpath for querying available libraries by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9416
* [#noissue] Fix url-stat-info layout by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9423
* [#9411] Polishing by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9426
* [#noissue] Exclude Spring6 from plugin-test by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9427
* [#noissue] Remove unused Javassist package by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9429
* [#noissue] Exclude Spring6 from plugin-test by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9434
* [#9431] Fix missing dependency of agent by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9436
* [#noissue] Update readme by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9435
* [#9431] Fix missing plugin dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9437
* [#9438] Update google httpclient plugin enable option by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9439
* [#9400] Set first chart-area and keep selected url by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9440
* [#9089] Update config of spring-data-r2dbc plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9443
* [#noissue] move spring web mvc url template intercept point and add user input attribute uri template option by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9442
* ﻿[#9445] Update plugin enable option by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9447
* [#noissue] Add toString by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9448
* [#8934] Filter agent list to sure that the agent is truly active by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9446
* [#noissue] Change uri stat config names by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9449
* Cleanup CachingConfigurerSupport by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9451
* [#9453] Refactor Command-line Arguments of MultipleApplications to SpringBoot style by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9454
* [#5249] send metric data including tenantId by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9457
* [#9452] Add cassandra4 plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9458
* [#9459] Add commons-config module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9456
* [#noissue] Fix cassandra4 it by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9461
* [#noissue] Remove unnecessary log4j-slf4j-impl dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9463
* [#noissue] Fix cassandra4 it by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9464
* [#noissue] Add copyright by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9465
* [#noissue] url stat: checks often-used-urls at the last moment by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9462
* [#9466] fix bug when processing transaction data by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9467
* [#noissue] Fix cassandra4 it by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9471
* [#9460] Fix path of reactor-netty server by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9469
* [#9470] Add HttpStatusUtils by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9472
* [#noissue] Remove invalid filter logic by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9476
* [#noissue] Add default empty string to MonitorConfig oftenUsedResources by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9479
* [#9474] Add serverCallExecutor in grpcReceiverConfiguration by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9475
* [#9481] Vertx's URI Metric Support by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9484
* [#9478] Uses tick time to aggregate uri stat by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9488
* [#noissue] Polishing by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9486
* [#noissue] Update readme kotlin plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9491
* [#9477] Add ExposePathWithinMappingInterceptor to SpringWebMvcPlugin by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9487
* [#noissue] add agent-plugins readme by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9492
* [#noissue] change uri stat pinot table index by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9490
* [#9317] Add default parameter for AgentListController by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9494
* [#9495] Resolving application tps data consistency issues by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9496
* [#noissue] Add testcase of spring data r2dbc h2 parser by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9497
* [#noissue] Apply GuardLogStatement for classes that execute a lot by @koo-taejin in https://github.com/pinpoint-apm/pinpoint/pull/9499
* [#9482] Await termination of grpc server by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9483
* [#9480] fix trace end time and unsampled trace uris by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9485
* [#noissue] Polishing by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9501
* [#noissue] Polishing by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9500
* [#noissue] cleanup by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9506
* [#9504] Change to collect URI Template in Trace by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9505
* [#9481] Add user input uri template for vert.x uri statistics by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9508
* [#9504] Refactor DisableTrace to store metrics by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9509
* [#9504] Add Vert.x main page for test by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9511
* [#noissue] Remove build WARNING by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9513
* [#9504] Move recordUriTemplate() to SpanRecorder by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9514
* [#9317] Change api for agent-management page by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9516
* [#9504] Check user input attributes for spring web mvc uri statistics by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9512
* [#9317] change SortByAgentInfo rules name by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9515
* [#noissue] Add AsyncContextUtils by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9517
* [#noissue] update uri stat pinot table by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9521
* [#9504] Refactor runOnContext trace by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9520
* [#9522] Support URI statistics for Spring Webflux by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9523
* [#9380] Supports Line number and location in Callstack by @feelform in https://github.com/pinpoint-apm/pinpoint/pull/9450
* [#9489] Increase webhook url size by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9524
* [#9424] Export the 'mail.smtp.ssl.enable' in the batch.  by @JunRadish in https://github.com/pinpoint-apm/pinpoint/pull/9441
* [#9527] Set the compression type of Kafka messages by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9528
* [#noissue] Adjust Log Level of URI-metric by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9530
* [#9474] Fix server call executor configs by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9531
* [#noissue] Remove legacy layout option by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9174
* [#NOISSUE] cleanup code in metric-module by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9532
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9533
* [#9534] Missing maven dependency of pinpoint-test module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9535
* [#noissue] Exclude CXF 4.x test by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9536

## Dependencies
* [#8906] Bump PMD plugin from 3.15.0 to 3.16.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8907
* [#8913] Bump guava from 30.1 to 31.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8914
* [#noissue] Bump Testcontainers from 1.16.2 to 1.17.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8933
* [#8970] Bump jaxb2-maven-plugin from 2.4 to 2.5.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8971
* [#8986] Bump log4j from 2.17.1 to 2.17.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8989
* [#8990] Bump jackson from 2.12.6 to 2.13.3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/8991
* [#9079] Bump thrift compiler from 0.12.0 to 0.16.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9080
* [#9149] Bump Spring Security from 5.5.3 to 5.5.8 CVE-2022-22978 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9150
* [#9238] Bump grpc from 1.43.2 to 1.49.1 by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9239
* [#9289] Bump jackson from 2.13.3 to 2.13.4 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9290
* [#9291] Bump snakeyaml from 1.27 to 1.33 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9293
* Bump commons-text from 1.9 to 1.10.0  by @dependabot in https://github.com/pinpoint-apm/pinpoint/pull/9294
* Bump mysql-connector-java from 8.0.27 to 8.0.28 by @dependabot in https://github.com/pinpoint-apm/pinpoint/pull/9296
* [#9298] Bump Alibaba Dubbo from 2.5.3 to 2.6.12 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9299
* [#9308] Bump Apache Dubbo from 2.7.2 to 2.7.18 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9301
* [#9298] Bump alibaba dubbo to 2.6.12 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9314
* [#9346] Bump asm to 9.4 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9347
* [#9355] Bump mockito from 2.82.2 to 4.8.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9356
* [#9361] Bump commons-lang3 from 3.8.1 to 3.12.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9362
* [#9363] Bump commons-codec from 1.14 to 1.15 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9364
* [#9369] Bump mybatis from 3.5.7 to 3.5.11 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9370
* [#9374] Bump awaitility from 3.1.5 to 4.2.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9375
* [#9404] Bump maven wrapper from 3.6.3 to 3.8.6 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9405
* [#9431] Bump maven-assembly-plugin to 3.4.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9432
* [#9525] Bump pinot-jdbc-client from 0.9.3 to 0.11.0 by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/9526
* [#9540] Bump zstd-jni from 1.4.0-1 to 1.5.2-5 by @donghun-cho https://github.com/pinpoint-apm/pinpoint/issues/9540

## New Contributors
* @cuishuang made their first contribution in https://github.com/pinpoint-apm/pinpoint/pull/9004
* @jimolonely made their first contribution in https://github.com/pinpoint-apm/pinpoint/pull/8875
* @JaneQ9900 made their first contribution in https://github.com/pinpoint-apm/pinpoint/pull/9321
* @JunRadish made their first contribution in https://github.com/pinpoint-apm/pinpoint/pull/9441

**Full Changelog**: https://github.com/pinpoint-apm/pinpoint/compare/v2.4.0...v2.5.0

<!-- </latestReleaseNotes.md> -->

## Upgrade consideration

HBase compatibility table:

<!-- <compatibilityHbase.md> -->
| Pinpoint Version | HBase 1.0.x | HBase 1.2.x | HBase 1.4.x | HBase 2.0.x                                                                                                           |
|------------------|-------------|-------------|-------------|-----------------------------------------------------------------------------------------------------------------------|
| 2.0.x            | not tested  | yes         | yes         | [optional](https://pinpoint-apm.gitbook.io/pinpoint/documents/hbase-upgrade#do-you-like-to-use-hbase-2x-for-pinpoint) |
| 2.1.x            | not tested  | yes         | yes         | [optional](https://pinpoint-apm.gitbook.io/pinpoint/documents/hbase-upgrade#do-you-like-to-use-hbase-2x-for-pinpoint) |
| 2.2.x            | not tested  | yes         | yes         | [optional](https://pinpoint-apm.gitbook.io/pinpoint/documents/hbase-upgrade#do-you-like-to-use-hbase-2x-for-pinpoint) |
| 2.3.x            | not tested  | yes         | yes         | [hbase2-module](https://github.com/pinpoint-apm/pinpoint/tree/master/hbase2-module)                                   |
| 2.4.x            | not tested  | yes         | yes         | [hbase2-module](https://github.com/pinpoint-apm/pinpoint/tree/master/hbase2-module)                                   |
| 2.5.x            | not tested  | yes         | yes         | [hbase2-module](https://github.com/pinpoint-apm/pinpoint/tree/master/hbase2-module)                                   |


<!-- </compatibilityHbase.md> -->

Agent compatibility to Collector table:

<!-- <compatibilityPinpoint.md> -->
| Agent Version | Collector 2.0.x | Collector 2.1.x | Collector 2.2.x | Collector 2.3.x | Collector 2.4.x | Collector 2.5.x |
|---------------|-----------------|-----------------|-----------------|-----------------|-----------------|-----------------|
| 2.0.x         | yes             | yes             | yes             | yes             | yes             | yes             |
| 2.1.x         | no              | yes             | yes             | yes             | yes             | yes             |
| 2.2.x         | no              | no              | yes             | yes             | yes             | yes             |
| 2.3.x         | no              | no              | no              | yes             | yes             | yes             |
| 2.4.x         | no              | no              | no              | no              | yes             | yes             |
| 2.5.x         | no              | no              | no              | no              | no              | yes             |


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
