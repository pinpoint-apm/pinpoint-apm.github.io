<!-- <latestReleaseNotes.md> -->
# What's New in v3.0.1
# Key Features

## New Plugins
* Support arcus java client 1.13.4 #11593
* Support mariadb java client 3.x #11578
* Support ktor #11400

## BugFix
* Fix MongoDB FindPublisherImpl method interceptor #11156
* Fix interceptor holder lazyloading #11154
* Fix DirectByteBuffer leak in active thread count #11529

## New Features
* Add mini charts to the right side when viewing grouped Error Analysis 
  ![ss_error-analysis2](https://github.com/user-attachments/assets/7d58d9ac-cab7-4d9c-a6cb-41e11733fa4a)
  ![ss_error-analysis3](https://github.com/user-attachments/assets/cb480d1b-b234-4915-bd0c-4ac180015a44)

### Support SQL cache bypassing
- If an SQL query exceeds a specified length, bypass the SQL cache to reduce memory usage and improve cache hit rates.
- #11166
- configuration
```
# Do not cache queries longer than 2048 characters
# If set to -1, SQL queries will always be cached
profiler.jdbc.sqlcachelengthlimit=2048
```

### Support trimming of long SQL queries
- #11310, #11449
- configurations
```
# Limit query length to 65536 characters (agent-side)
# Queries longer than this will be trimmed before being sent to the collector
profiler.jdbc.maxsqllength=65536

# Limit query length to 65536 characters (collector-side)
# Queries longer than this will be trimmed before being inserted into the database
collector.metadata.sql.max-length=65536
```

---

**From version 3.x, the executable JAR files will be uploaded to Maven Central Repository.**
https://repo1.maven.org/maven2/com/navercorp/pinpoint/

- [pinpoint-agent-3.0.1.tar.gz](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-agent/3.0.1/pinpoint-agent-3.0.1.tar.gz)
- [pinpoint-batch-3.0.1-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-batch/3.0.1/pinpoint-batch-3.0.1-exec.jar)
- [pinpoint-collector-3.0.1-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-collector/3.0.1/pinpoint-collector-3.0.1-exec.jar)
- [pinpoint-collector-starter-3.0.1-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-collector-starter/3.0.1/pinpoint-collector-starter-3.0.1-exec.jar)
- [pinpoint-web-3.0.1-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-web/3.0.1/pinpoint-web-3.0.1-exec.jar)
- [pinpoint-web-starter-3.0.1-exec.jar](https://repo1.maven.org/maven2/com/navercorp/pinpoint/pinpoint-web-starter/3.0.1/pinpoint-web-starter-3.0.1-exec.jar)


## What's Changed
* [#11067] Prepare 3.0.1-SNAPSHOT by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11082
* [#noissue] Delete Google Groups by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11083
* [#11084] Bump maven-source-plugin from 3.2.0 to 3.3.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11085
* [#noissue] Fix incorrect package name by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11086
* [#11087] Bump mvnw from 3.9.1 to 3.9.7 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11088
* [#noissue] Fix missing groupId in maven-javadoc-plugin by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11089
* [#noissue] Remove unnecessary spotless-maven-plugin by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11090
* [#noissue] Cleanup maven-javadoc-plugin by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11091
* [#noissue] Apply standard maven.source.skip properties by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11093
* [#noissue] Change maven.source.skip=true by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11094
* [#noissue] Apply standard maven.javadoc.skip properties by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11095
* [#noissue] Remove unused properties by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11096
* [#noissue] Cleanup javadoc configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11097
* [#noissue] Add maven.javadoc.skip=false to maven.central.release by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11098
* [#noissue] Remove JDK7 from github workflow by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11099
* [#noissue] Bump Ubuntu in workflow from 20.04 to 22.04 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11100
* [#11107] Bump workflow action from v3 to v4 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11101
* [#noissue] Fix incorrect test directory by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11103
* [#11050] Extract LinkHistogramSummaryView by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11110
* [#noissue] Upgrade docker actions versions by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/11112
* [#11050] Refactor HistogramView by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11115
* [#11111] Remove unnecessary depth to exception trace pinot table schemas by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/11114
* [#noissue] Fix menu display based on configuration by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/11120
* [#noissue] Cleanup SqlCountService by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/11121
* [#noissue] feat: timeline v3 by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11051
* [#11126] modify the pinpoint link in the body of the email alarm. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11127
* [#11129] Fix `RecentRunningFilter` to include shutdown agents in range by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11130
* [#11111] Modify name for exception trace pinot tables and schema by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/11128
* [#11123] Add '/api' explicitly by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11124
* [#11050] Replace StopFlag with CompletableFuture.cancel by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11125
* [#noissue] fix: fix search to fuzzy search by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11136
* [#noissue] Remove unused field by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11138
* [#11050] Fix potential NPE by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11137
* [#noissue] Handle v2 url format by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/11131
* [#11123] Add '/api' explicitly by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11139
* [#11050] Refactor NodeHistogram by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11118
* [#noissue] Adjust agent data collection interval to 10 seconds by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11140
* [#noissue] Cleanup ResponseTimeHistogramService by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11141
* [#11050] Extract FilterView from FilteredServerMap by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11142
* [#noissue] Force layout update in servermap when it's not realtime by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/11144
* [#11050] Remove duplicate code in TimeHistogramFormat by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11143
* [#11145] Use Spring ProblemDetail to describe exceptions by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/11146
* [#noissue] Add special path for public api by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11148
* [#noissue] Remove rowkey copy of Put by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11152
* [#11150] Add WAL durability setting to collector by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11151
* [#11153] Fix interceptor holder lazyloading by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11154
* [#11155] Fix MongoDB FindPublisherImpl method interceptor by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11156
* [#noissue] Enhanced exception handling by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11157
* [#11158] Change gRPC hedging to default retransmission policy by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11159
* [#noissue] fix: prettier config by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11162
* [#11145] Change server-error-response field by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/11149
* [#11164] Change /api prefix to /api-publicfor serverTime and error pages by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/11165
* [#noissue] feat: add search and link func into timeline UI by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11161
* [#noissue] Update tooltip contents on data update by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/11173
* [#11167] fix basic login error by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/11171
* Use openTelemetry to collect micrometric data.  by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11174
* [#11170] Align `exceptionTrace` tableName with manual by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11176
* [#11168] Update qualifier of redis connection factory by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11178
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11179
* [#noissue] fix: transaction exec percentage's worng value by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11180
* [#11158] Add Testcase by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11163
* [#noissue] fix: sidebar highlighting bug by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11181
* [#10776] Clean up duplicate code by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11184
* [#noissue] add max duration days by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11183
* [#noissue] fix: instance count bug when it is empty by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11182
* [#noissue] fix: save scatter axis y by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11187
* [#11190] Add AsyncWarmup to prevent OOM on collector startup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11191
* [#11192] Bump dropwizard-metrics from 3.2.6 to 4.2.26 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11193
* [#noissue] fix: flame graph by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11189
* [#noissue] Cleanup Executor.shutdown by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11194
* [#11195] Update reactor onNext by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11196
* [#11158] Refactor GrpcDataSender by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11200
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11201
* [#11166] Bypass cache for long SQL queries by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/11177
* [#noissue] Cleanup by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11203
* [#noissue] Delete unnecessary dbunit by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11207
* [#noissue] feat: useExpiredLocalStorage by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11199
* [#11205] Update CacheManager constructor args of arcus plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11206
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11209
* [#noissue] Add ErrorMockController for error page testing by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11208
* [#11158] Refactor GrpcDataSender by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11204
* [#noissue] fix: pacakge.json by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11212
* [#noissue] Handle html error response by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/11197
* [#11210] Update DispatcherHandler.handleResult() of spring webflux 6 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11211
* [#11186] Change gRPC UNARY response based on header value by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11215
* [#noissue] Remove unused code by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11216
* [#11217] Update NULL pattern of uri template by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11218
* [#11186] Refactor DataSender by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11222
* [#11219] Bump netty.io from 4.1.100.Final to 4.1.111.Final by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11220
* [#noissue] Display jvm info only when it exists in inspector by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/11221
* [#noissue] Support colon-base time format by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/11223
* [#11186] Change retry header key for collector response by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11225
* [#noissue] Replace servlet-context-collector.xml with JavaConfig by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11228
* [#11140] Increase max limit to align with new default value by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11230
* [#noissue] Cleanup Response by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11233
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11234
* [#11235] Bump grpc from 1.62.2 to 1.64.1 due to compatibility by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11236
* [#noissue] Cleanup PMD warning by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11242
* [#noissue] Replace XML in GRPC with java config  by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11226
* [#noissue] Cleanup GrpcConfiguration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11243
* [#noissue] Refactor ChannelzConfiguration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11244
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11246
* [#noissue] Remove applicationContext-collector.xml by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11247
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11249
* [#noissue] Replaced test.xml with java config by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11250
* [#noissue] Refactor `exceptiontrace-web` module by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11248
* [#noissue] Feat global search by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11229
* [#11252] Quickly return `true` if the AgentStatus is running. by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11253
* [#noissue] fix: tailwind config by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11254
* [#noissue] Reduce Memory Usage by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11255
* [#noissue] Replace Grpc Status conversion with build-in API by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11251
* [#noissue] Cleanup Server.shutdown by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11258
* [#noissue] fix: GlobalSearch, Inspector styles by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11263
* [#noissue] fix: keyboard event propagation by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11266
* [#10776] Remove unnecessary class loading by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11264
* [#11261] Fix missing metadata trailer in ServerCall.close by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11262
* [#11256] Apply RateLimiter to the server stream in gRPC by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11257
* [#10776] Improve the /metricDefinition/info api. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11269
* [#11256] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11271
* [#11265] Improve logging of StreamObserver.onError by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11270
* [#noissue] fix: transaction list api param by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11272
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11277
* [#11278] Add gRPC transport and stream monitoring by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11279
* [#10776] Add /metricDef/userDefined api logic. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11281
* [#11282] Bump hbase-client from 2.5.5 to 2.5.9 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11283
* [#10776] Add api to get defined Metric list by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11284
* [#noissue] change inspector minimal time slot by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11280
* [#11278] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11285
* [#11252] Limit query to one row for faster response by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11273
* [#10776] Add api to update defined Metric list by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11292
* [#noissue] Fix typo bitField by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/11297
* [#11276] Align `exceptionTrace` tableName with manual by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11294
* [#11298] Fix concurrency bug in GrpcAgentConnectionRepository by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11299
* [#10776] Create an ID to distinguish between metric definitions by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11304
* [#10776] Save the layout values for the metric position and size by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11306
* [#11256] Fix stream leak of FlowControl by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11305
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11307
* [#11308] Apply gRPC MAX_CONNECTION_AGE by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11309
* [#10776] Implement micrometer ui by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/11303
* [#11256] Improved atomicity of completion events by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11313
* [#11256] Fix a bug that incorrectly assigned bucket to interceptor by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11314
* [#11267] Add micrometer for monitoring collector by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11268
* [#11267] Fix test failures and Configurations by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11316
* [#11256] Fix not to close grpc stream when exception is thrown in wor… by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11315
* [#11318] Bump hbase-client from 2.5.9 to 2.5.10 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11319
* [#11256] Refactor gRPC Stream by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11317
* [#noissue] Fix typos by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11322
* [#11310] Abbreviate sql in sql metadata if sql is too long by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/11311
* [#11256] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11323
* [#11256] Remove Deprecated legacy StreamRateLimiter by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11324
* [#11256] Remove unused properties by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11325
* [#11267] Add gRPC metric interceptors by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11326
* [#11320] Add validation of parentApplicationName by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11321
* [#11267] Add netty ByteBufAllocator metrics by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11329
* [#11328] improve getApplicationHostinfo api by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11331
* [#noissue] Cleanup micrometer dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11334
* [#11256] Add ServerStreamId for debug by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11333
* [#noissue] Add service type by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11335
* [#10776] Add the field concept to the metric definition. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11336
* [#10776] Change property name for layout by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11338
* [#noissue] Increase http max header size by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11339
* [#11337] Fix fast escape when checking agent status by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11341
* [#11267] Add log4j2 metrics by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11340
* [#nossiue] Add Agent Count to AgentMapByHost by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11343
* [#10693] enable grpc built-in retry by default by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11345
* [#nossiue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11344
* [#11337] Improve performance for Active Agent by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11342
* [#11346] Optimize agent lookup for agent compatibility by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11347
* [#noissue] Fix Runtime error by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11352
* [#11350] Add write option to AsyncBufferedMutatorBuilder by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11351
* [#11320] Add debug information when validation fail by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11354
* [#noissue] Memory optimization for PingSession by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11355
* [#11267] Use micrometer metric as default by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11349
* [#10776] Add the aggregation function attribute to the metric definition by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11353
* [#noissue] Refactor PingSession by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11356
* [#11320] Root node has no parent information by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11360
* [#11328] cleanup getApplicationHostinfoV2 ActiveAgent by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11357
* [#11337] Cleanup semver4j dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11361
* [#10776] Add metric data api. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11359
* [#noissue] Fix SpotBug Warning by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11367
* [#noissue] Add ListMergeResultsExtractor by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11368
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11369
* [#11346] Refactory AgentEventQuery by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11370
* [#noissue] Refactor AgentInfoQuery by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11371
* [#noissue] Add EnableScheduling annotation by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11373
* [#10776] Use the aggregation function entered by the user. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11374
* [#11267] Separate `collector-monitor` module by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11375
* [#noissue] Cleanup versionPrefixRewriter by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11300
* [#11377] Fix Pinpoint jboss plugin build failure by @feelform in https://github.com/pinpoint-apm/pinpoint/pull/11378
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11382
* [#11379] Add AsyncPollingPutWriter by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11380
* [#9631] Add ErrorSummary for improved analytic insights by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11241
* [#10776] Improvements to the metric data api. Changes to response format and user input data. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11385
* [#11379] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11386
* [#11350] Allow default property by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11387
* [#11388] Optimize Async call chain of maxColumnValue by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11389
* [#noissue] Validate SqlUidMetaDataBo by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/11330
* [#11394] Bump commons-io from 2.11.0 to 2.16.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11395
* [#11390] Update reactor lift of spring-cloud-sleuth plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11391
* Add a concept for setting up a metric dashboard.  by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11402
* [#11403] Add support for module-info and package-info to PluginLoader by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11404
* [#11406] Bump commons-validator to 1.9.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11407
* [#11396] Bump commons-lang3 from 3.12.0 to 3.16.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11398
* [#11408] Bump commons-codec from 1.15 to 1.17.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11409
* [#11397] Bump commons-compress from 1.26.1 to 1.27.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11405
* [#noissue] Cleanup IOUtils by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11410
* [#11388] Add HbaseAsyncTemplate by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11393
* [#11411] Improve performance of ServerMap Link  by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11412
* [#11399] Add ktor plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11400
* [#11388] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11413
* [#11419] Adjust flush interval for node and link information by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11420
* [#noissue] feat: server image fallback by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11312
* [#11392] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11430
* [#9631] Merge ErrorSummary into ExceptionGroupSummary by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11425
* [#noissue] Precompile regex in replacePlaceHolders by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11426
* [#11431] Separate AsyncConnections for Span by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11432
* [#noissue] Fe sprint 3.1.0 by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/11434
* [#11435] Bump jacoco from 0.8.10 to 0.8.12 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11436
* [#11437] Replace commons-lang3 RandomUtils with Random by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11438
* [#11440] Bump commons-lang3 from 3.16.0 to 3.17.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11441
* [#noissue] Remove unused prop by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/11442
* [#11379] Remove unnecessary Math.abs by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11444
* [#11431] Striping span connection by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11445
* [#noissue] Return original object when pattern does not match by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11451
* [#noissue] Change temp params by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/11454
* [#11414] Update exceptionTrace table configuration by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11455
* [#noissue] Cleanup by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11456
* [#noissue] Fix chart format handler by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/11457
* [#11449] Trim long sql from agent by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/11450
* [#noissue] Cleanup SqlUidMetaDataServiceTest by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/11458
* [#10776] Rename chart type. Change keyname of response format of metric data api by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11460
* [#10776] Add a setting to allow the metric to represent data as a stack. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11461
* [#noissue] fix: opentelmetric intl by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11459
* [#11417] Add telelgraf proctstat fd metric by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11418
* [#noissue] Fix otlp chart data property name by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/11463
* [#9631] Format values as a chart by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11462
* [#noissue] Cleanup Kafka-It by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11452
* [#issue] Cleaneup filter in plugin test by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11453
* [#noissue] Remove unnecessary log4j dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11465
* [#noissue] Remove unnecessary log4j dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11466
* [#11468] Bump jsonassert to 1.5.3  by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11467
* [#11469] Bump HdrHistogram to 2.2.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11470
* [#11471] Bump commons-logging from 1.2.0 to 1.3.4 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11472
* [#11473] Bump commons-cli to 1.9.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11474
* [#11475] Bump perfmark-api to 0.27.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11476
* [#noissue] Cleanup log4j dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11477
* [#noissue] Cleanup it test by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11478
* [#9631] Fix query error when a specific agentId is provided by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11480
* [#11481] Fix DirectByteBuffer leak in ActiveThreadCount by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11483
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11484
* [#11328] remove ping event check by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11485
* [#10776] Specifies the micrometer-registry-otlp library version. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11482
* [#11301] Fix spring-boot-starter-tomcat dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11487
* [#noissue] feat: stack switch into metric definition form by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11479
* [#11489] Bump reactor-bom to 2023.0.9 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11490
* [#noissue] Cleanup spring-boot-maven-plugin configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11492
* [#10776] Fix static otlp params by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/11493
* [#10776] Support stacked chart by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/11488
* [#noissue] remove: temp app id in otlp by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11494
* [#11489]  Cleanup reactor dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11495
* [#11498] Replace AtomicReference with AtomicReferenceFieldUpdater by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11499
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11505
* [#11506] Update MSSQL docker images by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11507
* [#11503] Remove duplicate code in SimpleCache by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11504
* [#11267] Add Hbase client side metrics by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11500
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11510
* [#noissue] Refactor MicrometerMonitor by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11511
* [#11506] Add MSSQL license by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11515
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11514
* [#noissue] Update mongo docker images by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11516
* [#noissue] Update kafka docker images by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11517
* [#noissue] Cleanup ActiveMQClientIT by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11520
* [#noissue] Cleanup elasticsearch-rest-high-level-client dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11521
* [#noissue] Refactor MicrometerMonitor permission by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11527
* [#11267] Fix netty ByteBufAllocator default value by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11528
* [#11497] Fix DirectByteBuffer leak in active thread count by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11529
* [#11531] Add websocket options to web module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11532
* [#11423] Fix not to use userId param when there is no userId by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/11523
* [#noissue] Servermap > button cannot appear as a descedant of button by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11536
* [#11497] Cleanup error log when closing ActiveThreadCount by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11537
* [#11497] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11538
* Bump org.xerial.snappy:snappy-java from 1.1.10.2 to 1.1.10.4 by @dependabot in https://github.com/pinpoint-apm/pinpoint/pull/11539
* [#noissue] Remove unnecessary protobuf-maven-plugin version by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11542
* [#11543] Remove unnecessary EnumerationFilter  by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11544
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11545
* [#10776] Improve the ability to set fields and tags in a 1 : N relationship when defining metrics. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11546
* [#11543] Improve debuggability by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11548
* [#11497] Fix potential NPE by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11549
* [#10776] Improve the metrics data API to allow fields and tags to be set in a 1:N relationship When calling the metrics data API. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11550
* [#noissue][FE] fix: filtermap scatter to transactionList bug fix by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11535
* [#10776] Adding property to fieldClusterList in the metric properties API by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11551
* [#10776] Clean up the Metrics Data API by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11552
* [#11553] Update mongodb-plugin backward compatibility for 5.2.x by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11554
* [#10776] Field and tag can be selected as 1:N by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11556
* [#noissue] Improved maven-failsafe-plugin to only work with it-modules by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11557
* [#noissue] Fix redis-lettuce-it 6.5.0-RC1 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11559
* [#10776] Make "ALL" bold & Remove total if stack is false by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11558
* [#noissue] Update plugins-it version filter by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11560
* [#10776] Set null if value is -1 by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11561
* [#11497] Refactor ActiveThreadCountStreamSocket  by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11555
* [#11497] Add isReady check to the ping stream by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11563
* [#10776] Improved otlp metric data table to store and retrieve data as a multiple table. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11565
* [#NOISSUE] Rename the method for consistency. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11566
* OpenTelemetry > Fix dateRange bug & Apply text ellipsis to chart tooltip by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11568
* [#11497]  Improve atomicity and performance of Redis call in ActiveThread by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11567
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11569
* [#10776] Sort metric property data. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11570
* [#10776] OpenTelemetry > Leave confirm alert by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11571
* [#11497] Improved atomicity by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11564
* [#10776] OpenTelemetry > Add interval/show total to form by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11572
* [#noissue] Rename activeAgentService to Validator by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/11575
* [#noissue] Cleanup fastjson by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11574
* [#noissue] Fix AvoidBranchingStatementAsLastInLoop  of Spotbugs by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11576
* [#noissue] Improve reuse of CommandStub by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11573
* [#11577] Update mariadb-plugin to support mariadb java client 3.x by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11578
* [#10776] Improved API to store stackDetails and samplingInterval values by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11582
* [#11497] Apply ClientCallStateStreamObserver by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11581
* [#11579] Update httpclient5 plugin option - mark.error by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11583
* OpenTelemetry > Apply stackDetails & samplingInterval by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11584
* [#11278] Fix atomicity of transportTerminated by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11585
* [#10776] OpenTelemetry > Save the changed layouts when create/edit/delete by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11587
* [#11589] Disable OtlpMetricsExportAutoConfiguration.  by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11590
* [#noissue] Fix intermittent object initialization issue by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11586
* [#10776] OpenTelemetry > Send agentId by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11594
* [#11592] Update arcus-plugin to support arcus java client 1.13.4 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11593
* [#11497] Apply ClientCallContext by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11598
* [#7497] ErrorAnalysis > Summary mini chart by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11596
* [#10776] Remove the agentId from the tag data in the oltp data.  by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11602


**Full Changelog**: https://github.com/pinpoint-apm/pinpoint/compare/v3.0.0...v3.0.1

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
