<!-- <latestReleaseNotes.md> -->
# What's New in v3.1.0
## Highlights
  
  ### ApplicationName: 254-Character Support

  The maximum length of `applicationName` has been expanded from 24 to 254 characters, aligning it with `SERVICE_NAME_MAX_LEN`.

  **Impact**: Users with long, structured application identifiers (e.g., `team.service.environment.region`) can now register them as-is, removing the prior naming constraint that forced abbreviations.

  ### ServerMap V3 — Performance Improvements
  
  ServerMap has been rebuilt as **ServerMap V3** with a redesigned storage layout and query path.

  - New Map Tables: `MapAppSelf`, `MapAgentSelf`, `MapAppOut`, `MapAppIn`, `MapAppHost`
  - Schema: [`hbase-create-snappy.hbase`](https://github.com/pinpoint-apm/pinpoint/blob/master/hbase/scripts/hbase-create-snappy.hbase#L23)

  **Impact**: Faster initial render and time-range navigation on large topologies, lower HBase read amplification, and improved support for 254-character ApplicationName values.

  ### GrpcBatchDataSender — Unary Span Transport

  A new span transport, `SpanBatchGrpcDataSender`, replaces the long-lived gRPC bidirectional stream (`SpanGrpcDataSender`) with a unary `SendSpanList` RPC that ships spans in independent batches.

  Starting from 3.1.0, `BATCH` is the default in both local and release profiles:
  
  ```properties
  # pinpoint-root.config
  profiler.transport.grpc.span.sender.type=BATCH    # BATCH | STREAM
  ```

  **Collector-side support**: the receiver-side `SpanService` exposes the new `SendSpanList` RPC and returns batch-level results. 
  **Requires a 3.1.0+ collector.** Older collectors should keep `sender.type=STREAM`.

  **Impact**: simpler operational model (no stream restarts on partial failures), better resilience behind L7 proxies and rolling collector deploys, 
  and tunable batching that lets operators trade latency versus RPC overhead per workload.

  ### OpenTelemetry Metric Collection
  
  Pinpoint Collector now supports receiving metrics via the **OTLP protocol**. 
  Applications can send metrics using the OpenTelemetry SDK or OpenTelemetry Collector without requiring the Pinpoint Agent.

  ### Heatmap View
  
  A new **Heatmap** view is now available alongside Scatter Chart. 
  While Scatter Chart plots individual transactions, Heatmap provides a statistics-based visualization for faster data overview.

<img width="540" height="396" alt="image" src="https://github.com/user-attachments/assets/8b35f79d-90f9-406f-a97a-25d272e8bf26" />

  ### Error Reason Categorization

  Errors are now categorized (e.g. `exception`, `http-status`, `sql`) and the category is shown on the call stack in the web UI, 
  so you can tell at a glance why a span was marked as an error.

<img width="800" alt="997ae8c6-66a9-4542-8198-f77b7455a94e" src="https://github.com/user-attachments/assets/c15be8f8-4ad9-4792-ade9-609ae94107dd" />

  Opt-in via agent configuration:

  ```properties
  profiler.error.enable=true
  ```

  Choose which categories should mark a span as an error (default: all enabled):

  ```properties
  # Allow-list
  profiler.error.mark=http-status,sql
  # Or deny-list
  profiler.error.mark.exclude=exception
  ```
  
  ### JDBC SQL Cache Expiration

  The SQL cache now expires entries after a configurable time, causing the agent to re-send the metadata periodically.

  ```properties
  # Default: 168 hours (7 days). Set 0 or negative to disable.
  profiler.jdbc.sqlcacheexpirehours=168
  ```

  ### System Metric — Multi-table Mode
  
  System Metric now supports **multi-table mode** for improved performance and scalability in large environments.

  ---
  
  ## Deprecation

  ### Flink-based Inspector

  The legacy Inspector that relied on Apache Flink for statistics aggregation has been **deprecated**. 
  The new Inspector uses **Apache Pinot** for data collection and display. Please migrate to the new Pinot-based Inspector.

  ---
  
  ### Compatibility Improvements

  - Apache HttpClient 5.6
  - MongoDB Java Driver 5.6
  - Kafka 4.x
  - async-http-client 3.x
  - ClickHouse Java Client V2 (0.8.0)
  - Spring R2DBC plugin: `io.asyncer:r2dbc-mysql` support
  - New plugin: **IBM DB2**

  ### Observability and Tracing Improvements
  
  - **Reactor / reactor-netty**: reduced excessive span event generation to lower trace noise
  - **Kafka Streams**: entry point changed so requests are traced individually rather than only at the queue polling level
  - **Spring Kafka**: new entry point options for `KafkaMessageListenerContainer`, including container-level tracing and error marking
  - **Lettuce Pub/Sub**: transaction tracing for `RedisPubSubListener` implementations
  - **HTTP clients (Apache HttpClient, JDK HTTP, Ning, Google, OkHttp)**: configurable `mark.error` option to control whether client-side errors mark a transaction as failed

### What's Changed
* [#11607] Prepare 3.1.0-SNAPSHOT by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11608
* [#7497] ErrorAnalysis > Show groupedFieldName.uriTemplate by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11609
* [#10776] Adding sortkey for kafka partition distribution by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11610
* [#11433] Add Application agent list query options by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11547
* [#7374] Apply help popover to v3 by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11614
* [#noissue] Update README by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11616
* [#noissue] Bump actions/setup-java@v3 to actions/setup-java@v4 by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11617
* [#noissue] Fix type error of HelpPopover by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11619
* [#noissue] Fix type error of HelpPopover2 by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11623
* [#11620] Bump springframework from 6.1.5 to 6.1.14 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11621
* [#11622] Bump spring-boot from 3.2.4 to 3.3.5 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11624
* [#noissue] Cleanup springframework dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11625
* [#noissue] Update README.md by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11630
* [#noissue] Update README.md by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11631
* [#10776] add test code by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11632
* [#10776] If metricGroup, metric, and field name are empty string, put the default value by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11633
* [#10776] OpenTelemetry > Prepare beta open by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11634
* [#noissue] Update plugins url by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11635
* [#11628] Bump spring-boot2 from 2.7.13 to 2.7.17 for plugin-test by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11629
* [#11626] Bump springframework5 from 5.3.28 to 5.3.39 for plugin-test by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11627
* [#noissue] Fix renderHelpContent error by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11636
* [#11638] Bump spring-data from 3.2.2 to 3.3.3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11639
* [#noissue] Remove unnecessary zk cluster from  web module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11637
* [#7374] Apply help popover to v3 (NAVBAR, REAL_TIME, CALL_TREE) by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11641
* [#NOISSUE] Disable KafkaAutoConfiguration. Because it is not used. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11642
* [#11643] Bump spring-batch from 5.1.1 to 5.1.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11644
* [#11611] Update mysql-jdbc-plugin support to mysql-connector-j 9.x by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11612
* [#noissue] Add docs on sql related configs by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/11650
* [#11647] Update httpclient5-plugin support to httpclient5 5.4 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11649
* [#11640] Introduce redis-timeseries module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11645
* [#11653] Bump kafka-client from 3.3.2 to 3.7.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11654
* [#10776] Improve logic for parsing names of metricGroup, metric, and field. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11655
* [#noissue] Cleanup kafka dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11656
* [#11433] Change servermap agent list condition by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11657
* [#11659] Replaced log4 1.x with reload4j by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11660
* [#11659] Remove log4j 1.x dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11661
* [#10776] Add index to tables and schema of otlpmetric. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11667
* [#11663] Update mark.error option of httpclient plugins by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11664
* [#noissue] Fix support version range of vertx-plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11665
* [#10776] Change id to name in the otlp logic. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11668
* [#11670] Bump spring-cloud from 4.1.2 to 4.1.4 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11671
* [#11672] Bump spring-cloud from 3.1.8 to 3.1.9 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11673
* [#noissue] Improve compatibility with thrift 0.21 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11669
* [#11674] Bump guava from 32.1.2-jre to 33.3.1-jre by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11675
* [#11677] Bump gson from Gson 2.10.1 to Gson 2.11.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11678
* [#11679] Bump grpc from 1.64.1 to 1.68.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11680
* [#noissue] export ui/table by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11682
* [#NOISSUE] reserved ports for use by OpenTelemetry data collection. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11685
* [#11681] add dameng-jdbc plugin by @yjqg6666 in https://github.com/pinpoint-apm/pinpoint/pull/11683
* [#noissue] Add network metrics by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11689
* [#11681] plugin, dameng-jdbc, update urlparser. Add UI V3 servermap image. by @yjqg6666 in https://github.com/pinpoint-apm/pinpoint/pull/11690
* [#7374] Change style of popover by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11692
* [#noissue] Bump jna from 5.14.0 to 5.15.0 by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11696
* [#6807] Config > Admin > Users by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11699
* [#7370] Chang UserForm, UsersTableFetcher by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11700
* [#noissue] Add allOfAsync to FutureUtils by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11701
* [#11703] Bump mockito-junit-jupiter from 4.8.1 to 4.11.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11704
* [#11705] Bump junit-jupiter 5.10.2 from to 5.11.3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11706
* [#noissue] Remove unnecessary pinpoint-pugins-test-utils by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11707
* If it is today's date, it shows the seconds. by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11712
* [#noissue] Generalize CachingSqlNormalizer by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/11711
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11713
* [#noissue] Optimize hashing by reusing hasher instance by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/11715
* [#10776] Returns whether the OtlpMetric menu is visible. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11717
* [#7680] Check isWithinFiveMinutes by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11714
* [#6839] Always show seconds in ReChart & Apply configuration.showExce… by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11718
* [#11503] Delegate cache creation to SimpleCacheFactory by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/11716
* [#11705] Improve compatibility of Junit with It tests by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11719
* [#noissue] Fix agent management list by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11720
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11327
* [#7693] OpenTelemetry > Change url from /openTelemetry to /openTeleme… by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11721
* [#noissue] fix: datepicker's maxrange validation by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/11722
* [#noissue] Remove deprecated PLogger API by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11725
* [#noissue] Fix deprecated API by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11724
* [#11726] Bump maven-surefire-plugin from 3.1.2 to 3.5.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11727
* [#noissue] Cleanup protobuf-maven-plugin by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11728
* [#7674] Update billboard.js to 3.14.0 by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11731
* [#noissue] Fix deprecated API by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11732
* [#10776] Use the SamplingInterval value as the minimum time slotwhen searching data. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11723
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11733
* [#noissue] Fix visibility of node histogram during concurrent execution by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11736
* [#noissue] Remove Thrift serializer by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11734
* [#noissue] Use general character to mark replaced tokens by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11735
* [#11729] RFC 7239 Forwarded Header based RealIpHeaderResolver by @beyond-seunghyun in https://github.com/pinpoint-apm/pinpoint/pull/11730
* [#7371] Config > Admin > Agent Management by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11737
* [#noissue] Cleanup ThreadDump serializer by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11739
* [#noissue] Fix it test failure by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11740
* [#11729] Update agent's realipheader value to the list type. by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11742
* [#noissue] Cleanup kafka test by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11743
* [#11705] Refactor PluginTestEngine by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11738
* [#11745] Replace groovy-maven-plugin with templating-maven-plugin by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11746
* [#11745] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11747
* [#noissue] Remove deprecated Charsets.java by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11750
* [#noissue] Move commons.task package to commons-server module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11749
* [#noissue] Fix `testRecordNotChainedException` test failure by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11748
* [#11745] Apply  templating-maven-plugin to TestcontainersOption version by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11753
* [#11745] Apply log4j2 templating to plugin-test module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11754
* [#noissue] Refactor DefaultExceptionRecorderTest by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11756
* [#noissue] Add newDriver to JDBCDriverClass by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11757
* [#11758] Separate banner into module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11759
* [#noissue] Delete testcase directory by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11760
* [#noissue] Memory Optimization for ChainedTaskDecorator by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11761
* [#noissue] Apply junit AutoClose by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11762
* [#11763] Bump maven-compiler-plugin from 3.11.0 to 3.13.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11764
* [#noissue] Bump slash-command-dispatch from v2 to v4 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11766
* [#noissue] Replace ChainedTaskDecorator with CompositeTaskDecorator by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11767
* [#11768] Migrate TimerTaskDecorator to TaskDecorator by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11769
* [#11745] Apply Version templating to plugin-test module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11770
* [#noissue] Reduce commons dependency of test-plugin by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11771
* [#11768] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11772
* [#noissue] Extract JavaHomeResolver by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11773
* [#7716] Config > Admin > Agent Statistic by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11775
* [#noissue] Cleanup plugins-test by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11774
* [#7722] OpenTelemetryMetric > Change title & icon by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11776
* [#7722] OpenTelemetryMetric > Change title & icon by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11777
* [#11640] Async timeseries command support  by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11693
* [#7728] Check permission to create alarm by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11779
* [#7733] Fix application favorite list by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11781
* [#7688] Toast clear all by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11784
* [#noissue] Add ExceptionRecordingStateTest by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11783
* [#noissue] Cleanup IdValidateUtils by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11785
* [#noissue] Add permission to slashCommandDispatch by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11786
* [#noissue] Cleanup AgentIdResolver by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11788
* [#noissue] Apply MoreExecutors by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11789
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11790
* [#11792] Refactor ModuleBootLoader by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11793
* [#7758] Does not call metric data api if the metric is not inView by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11791
* [#noissue] Cleanup PinpointStarter by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11794
* [#noissue] Revert #11791 by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11796
* [#noissue] Replace SimpleProperty with Properties by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11797
* [#noissue] Remove TransportModule by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11798
* [#noissue] Cleanup AgentProperties  by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11799
* [#noissue] Remove pinpoint-bootstrap dependency from pinpoint-profile… by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11800
* [#7737] Make the drag area of the scatter chart loose by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11795
* [#noissue] Cleanup Bootstrap by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11801
* [#7758] Apply lazy loading to OpenTelemetryMetricFetcher by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11802
* [#noissue] Admin > Agent Management > Change delete application/agent method from DELETE to GET by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11803
* [#11805] Fix reactor-plugin empty mono and flux by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11806
* [#noissue] Cleanup Path by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11809
* [#noissue] Implement EvenRangeSplitter by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/11782
* [#7774] FlameGraph > zoom in/out by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11811
* [#noissue] Cleanup plugins-test by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11812
* [#11813] Add trim to StringUtils by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11814
* [#11816] Remove noLookups warning log from Log4j2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11817
* [#11818] Bump log4j2 from 2.22.0 to 2.24.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11819
* [#11818] Add log4j module permission by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11821
* [#NOISSUE] Change the package name for consistency. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11820
* [#noissue] Update http request header size format by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11787
* [#11822] Replace commons-logging with spring-jcl by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11823
* [#noissue] Remove CommonLogger Adapter by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11824
* [#noissue] Remove CommonLogger by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11825
* [#noissue] Cleanup ValueResolver by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11826
* [#11828] Remove duplicate JdbcConfig code by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11830
* [#noissue] Replace deprecated API by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11831
* [#noissue] Replace File with Path by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11832
* [#11854] Fix possible NPE in ConnectionCountServerTransportFilter by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/11833
* [#11828] Fix Cassandra test failures by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11836
* [#11834] Extract JdbcOption from ProfilerConfig by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11835
* [#noissue] Add suffix for hbase DistributionSummary metrics by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11840
* [#11828] Fix incorrect name for JdbcAutoCommitConfig by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11839
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11837
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11841
* [#11842] Support for property placeholders in ProfilerConfig.readXXX by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11843
* [#7785] Admin > Agent Management > Show agentVersion instead of vmVer… by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11845
* [#11828] Fix Cassandra test failures by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11846
* [#11828] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11847
* [#noissue] Fix CXF client test failures by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11849
* [#11828] Fix testcase failures on Windows Env by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11851
* [#11852] Support for MAVEN_REPOSITORY in plugin integration tests by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11853
* [#noissue] Cleanup ClickHouseIT by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11857
* [#11858] Bump httpcomponents5 to 5.2.3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11859
* [#noissue] Cleanup JDBC by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11860
* [#noissue] Fix JDBC test failures by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11861
* [#noissue] Fix JDBC test failures by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11864
* [#noissue] Cleanup JDBC test by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11865
* [#11867] Bump slf4j from 2.0.9 to 2.0.16 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11868
* [#11869] Bump kotlin-maven-plugin from 1.7.22 to 1.8.22 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11870
* [#noissue] Cleanup DisableOptions by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11872
* [#noissue] Cleanup Agent boot log by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11873
* [#noissue] Apply @AutoClose by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11855
* [#noissue] Apply @AutoClose by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11875
* [#noissue] Apply @AutoClose by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11876
* [#noissue] Cleanup PluginTest by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11879
* [#noissue] Remove deprecated logic and simplify query for clarity by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11881
* [#noissue] Remove unnecessary Thrift SpanFactory by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11883
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11884
* [#noissue] Use MapStruct to map query entities to models by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11882
* [#noissue] Cleanup PluginTest by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11886
* Fix compilation - execution still fails by @DaGeRe in https://github.com/pinpoint-apm/pinpoint/pull/11885
* [#noissue] Fix missing LauncherSession.close by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11888
* [#noissue] Remove pinpoint-commons dependency of bootstrap module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11889
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11890
* [#noissue] Fix quickstart test app by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11891
* [#11892] Bump springframework from 6.1.14 to 6.1.16 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11893
* [#11894] Bump springboot from 3.3.5 to 3.3.7 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11895
* [#11896] Bump springdata from 3.3.5 to 3.3.7 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11897
* [#noissue] Remove unused javax.servlet property by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11898
* [#noissue] Remove pinpoint-commons dependency of bootstrap module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11902
* Change package structure by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11901
* [#11877] Improved Agent initialization by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11899
* [#11903] Bump spring-security from 6.1.8 to 6.4.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11904
* [#11905] Disable the batch for checking Flink server operation. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11907
* [#11906] Switch log4j2 configuration format from XML to YAML by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11900
* [#11908] Improve JVM compatibility of the bootstrap classloader by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11909
* [#11912] Fix missing close on Jar InputStream in Plugin by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11913
* [#11906] Use jackson instead of snakeyaml by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11910
* [#7795] Modify UserGroupMember for API key by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11914
* [#noissue] FlameGraph > fix bug & add zoom in/out button' by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11915
* [#noissue] Allow blank agentId for global txId search by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/11922
* [#11905] Delete the logic associated with flink. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11923
* [#11924] Update kafka plugin for compatibility with kafka 3.x version by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11925
* Fix link to feature guide by @DaGeRe in https://github.com/pinpoint-apm/pinpoint/pull/11917
* [#11921] FlameGraph > Set colors for each application name by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11920
* [#11905] Delete the logic associated with flink. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11929
* [#noissue] Remove deprecated TCP configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11932
* [#noissue] V2 inspector notice message by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11928
* [#11933] Bump zookeeper from 3.8.1 to 3.8.4 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11934
* [#11905] Deprecated the application stat api.  by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11935
* [#11905] Remove deprecated module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11936
* [#noissue] Fix missing RegionLocator.close by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11937
* [#noissue] Improved error logs in PluginTest by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11939
* [#11940] Add DBCP integration tests by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11941
* [#11942] Bump micrometer from 1.13.2 to 1.13.9 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11943
* [#11942] Remove micrometer-jakarta9 dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11945
* [#noissue] Remove netty3 dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11946
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11947
* [#11905] Add thrift dependency for pinot driver by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11948
* [#11949] Bump mysql driver from 8.0.28 to 8.4.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11950
* [#noissue] Add applicationName as parmeters to getAgentStatusTimeline api by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11951
* [#11953] Update io.asyncer:r2dbc-mysql of spring r2dbc plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11954
* [#11955] Bump lettuce from 6.5.0 to 6.5.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11956
* [#noissue] Remove unused javax.annotation dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11961
* [#11963] Improve the logic for retrieving deadlock stat data to fetch it from Pinot instead of HBase. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11964
* [#11959] Bump opentelemetry to 1.46.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11960
* [#11944] Include chart in `/uriStat/summary` response by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11958
* [#11963] Adds an empty object when the inspector module is disable. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11969
* [#11905] Fixing invalid message handlers by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11970
* [#11971] Extract micrometer module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11972
* [#noissue] Remove deprecated @Mappings annotations by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11976
* [#noissue] Refactor DataSender by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11977
* [#11963] Add test code by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11978
* [#11980] Add async nested of reactor plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/11981
* [#11962] Equalizer Bar Chart to replace real time chart by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11975
* [#noissue] Refactor TransactionId by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11952
* [#noissue] Add missing dependency by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/11984
* [#noissue] FlameGraph > Application name info by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11986
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/11989
* [#11982] URL stat > mini chart by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11991
* [#11967] Skip leading space when binding values by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/11968
* [#noissue] Handle opentelemetry getMetricData api error by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11994
* [#11990] Suppress MultiStageEngine query ClassCastException in logs by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11988
* [#11982] Math.round to long maxValue by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/11996
* [#11997] Delete logic that stores stat data in hbase. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/11998
* [#11944] Fix incorrect logic for chart calculations by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/11999
* [##11962] Handle not OK data & ThreadDump open button by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12003
* [#11997] Add test code by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12010
* [#11818] Improve log4j context initialization by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12013
* [#noissue] Add AgentOption to console logging by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12014
* [#noissue]Highlight Error by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12017
* [#11512] Bump pinot jdbc client to 1.2.0 by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11513
* [#noissue] Update node version to 22.13.1 by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12018
* [#12019] Add logic to prevent error when metadata is missing. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12020
* [#12021] Hide sensitive information such as cookie data by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12022
* [#noissue] Remove Header for thrift by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12027
* [#12019] Show message with popover when metricData has message by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12023
* [#noissue] ErrorAnalysis > Set minichart column size by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12028
* [#noissue] Remove HeaderEntity for Thrift by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12029
* [#noissue] Remove Header for Thrift by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12030
* [#NOISSUE] Clean up dependencies in batch module by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12031
* [#11905] Remove flink module. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12033
* [#noissue] Move dataSender to MetaDataService by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/12036
* [#noissue] Refactor ServerRequest for gRpc by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12032
* [#12040] Allow setting max query period per function in API calls by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12042
* [#12040] Include maximum query period in configuration API by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12043
* [#noissue] Remove AcceptedTimeService for parallelism by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12041
* [#12044] Update matchable transform list by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12045
* [#12046] Update plugin it verifier by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12047
* [#12040] Change key name for easier configuration parsing by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12049
* [#noissue] Refacotor PingSession by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12051
* [#noissue] Reconfigure monorepo packages with yarn & remove tsup, turborepo by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12050
* [#noissue] Cleanup AgentUriMetricHandler by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12053
* [#noissue] Fix realtime scatter chart bug (missing data) by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12054
* [#noissue] Realtime > Remove "Active Request" header by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12055
* [#noissue] Realtime > Fix active request lock application bug by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12056
* [#noissue] Remove AcceptedTimeService for parallelism by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12052
* [#noissue] Remove AcceptedTimeService by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12057
* [#noissue] Fix text in README.md by @akageun in https://github.com/pinpoint-apm/pinpoint/pull/12037
* [#noissue] Fix application select popover style bug in darkmode by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12059
* [#noissue] Fixed invalid AgentMetricHandler by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12060
* [#noissue] Improved Reliability of PingSession lifecycle by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12058
* [#11992] Add ServiceId creation and deletion api by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/11993
* [#noissue] Save last application, searchParameters to atom by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12065
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12063
* [#12066] If empty AgentName, replace with AgentId by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12067
* [#noissue] Remove test message by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12069
* [#noissue] Add begin and end in ExceptionRecord by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12068
* [#11979] Add Pulsar plugin by @CodePrometheus in https://github.com/pinpoint-apm/pinpoint/pull/12038
* [#12071] Update reactor subscriber.subscribeOn by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12072
* [#12081] Remove commons-buffer from Agent module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12082
* [#12021] Replace ErrorAttributes with ProblemDetail by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12035
* [#noissue] Add fallback timestamp by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12085
* [#12066] Replace empty agentName with agentId in web by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12080
* [#noissue] Log only necessary data by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12090
* [#noissue] Fix copyJavaSystemProperty() by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/12088
* [#noissue] Add missing placeholder in log message by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/12091
* [#12025] Experimental V4 Id feature by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12026
* [#noissue] Update vite v6 by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12089
* [#12093] Adding Table Configuration for Search Speed Optimization by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12094
* [#12025] Remove unnecessary ID validation by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12096
* [#12025] Remove unnecessary grpc imports by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12097
* [#12092] Implement simple property-based feature flag by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/12099
* [#12100] Update clickhouse plugins for compatibility with 0.8.0 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12101
* [#noissue] Fix pulsar plugin IT test by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12103
* [#11992] Change serviceUid Type to int by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12095
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12106
* [#12105] Apply react-resizable-panel to the sidebar in the content by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12109
* [#11992] Optimize ServiceUid by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12110
* [#12025] Add ServerHeader for Uid by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12104
* [#noissue] OpenTelemetryMetric > fix edit&delete save alert bug by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12111
* [#12115] Fix java.lang.NoClassDefFoundError: java/sql/Date in spring … by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12116
* [#12107] Update pubsub to lettuce plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12108
* [#12064] add applicationUid by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12112
* [#10318] Improved serialization performance of primitive values by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12121
* [#noissue] Fix transactionDetail page error when accessing global search by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12122
* [#noissue] Move Infrastructure to end of menu by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12123
* [#noissue] Thin the lines of the resizable pannel by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12124
* [#12025] Apply UidCache to ServerHeader by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12120
* [#noissue] AgentSearchList style by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12128
* [#12064] Rename package with id as uid by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12130
* [#noissue] Cleanup Boundary checking by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12132
* [#noissue] ServerList > Tooltip for agentName, agentId by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12131
* [#12064] Extract Uid domain by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12133
* [#12135] Enable configuration of period interval list for data query by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12136
* [#12145] Replace SimpleDateFormat with DateTimeFormatter for thread safety. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12146
* [#12138] Add block interceptor in agent by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12142
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12147
* [#12048] Fix datetime/time columns config for Ingestion Aggregations by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12143
* [#12064] Extract web Uid domain by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12141
* [#noissue] Apply configuration.periodMax, periodInterval by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12148
* [#12149] Update avoid tracking unnecessary subscribe method of reactor by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12150
* [#12025] Refactor applicationId to applicationName by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12144
* [#12064] Seperate hbase connection for Uid by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12126
* [#noissue] Remove duplicated code (ServerMap, Realtime, FilteredMap) by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12152
* [#noissue] Update cytoscape by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12153
* [#12025] Refactor applicationId to applicationName by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12155
* [#noissue] Change applicationName field to uri in /transactionInfo by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12154
* [#12025] Refactor applicationId to applicationName by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12156
* [#noissue] Remove redundant fields of AgentStatDataPoint by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12157
* [#noissue] Fix missing ConditionalOnProperty by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12158
* [#12025] Integrate UidFetcher into gRPC services by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12134
* [#12025] Fix UidFetcher NPE by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12161
* [#noissue] Remove unnecessary stacktrace from header validation by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12162
* [#12159] Store span response time in Pinot and aggregate it into statistical data during storage. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12163
* [#12159] Change kafka.heatmap.topic.prefix configuration value by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12165
* [#noissue] Change applicationId field to applicationName in /transactionInfo by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12166
* [#12025] Refactor AgentStatDataPoint interface by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12164
* [#noissue] Refactor ColumnName by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12170
* [#noissue] Extract ApplicationMapModule by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12171
* [#noissue] Improve logging for stream errors by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/12167
* [#noissue] Improve naming conventions for ServerMap by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12172
* [#noissue] Deprecate getPingSlotNumber API by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12173
* [#noissue] Refactor ResponseColumnName by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12174
* [#12159] Store elapsed time directly as a column value instead of using a variable by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12177
* [#12025] Remove deprecated getApplicationId in TransactionInfoViewModel by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12176
* [#noissue] Improve naming conventions for ServerMap by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12175
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12178
* [#noissue] Remove unnecessary histogramSlot check by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12182
* [#12159] Change schema for heatmap table by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12185
* [#12092] Refactor FeatureFlagService by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/12102
* [#12064] Add async ApplicationUid Service by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12169
* [#noissue] Refactor ServiceTypeCategory by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12187
* [#noissue] Refactor Histogram by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12188
* [#12159] Change default value for serviceName column by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12190
* [#12092] Change type of FeatureFlagProperties from Map to List by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/12186
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12191
* [#12193] Bump ASM from 9.6 to 9.7.1 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12194
* [#noissue] Refactor datatype of ServiceType in Server from short to int by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12192
* [#noissue] Remove ServiceType field from SpanChunkBo by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12196
* [#12198] Fix potential class loading deadlock in HbaseColumnFamily by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12199
* [#12198] Fix potential class loading deadlock in HbaseColumnFamily by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12200
* [#12159] Add heatmap web feature with service and DAO layers by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12201
* [#11906] Fix log4j2 configuration YAML by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12202
* [#noissue] Cleanup unused code by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12197
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12204
* [#12025] Validate applicationName and agentId using StringPrecondition by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12206
* [#12159] Enhance heatmap data retrieval by adding min and max Y-axis parameters by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12207
* [#noissue] Add spring kafka plugin testweb by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12203
* [#12208] Add UnsignedByte Util by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12209
* [#12208] Add UnsignedByte Util by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12212
* [#12210] Add size, lastmodified, rollover-strategy-max to logging opt by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12211
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12205
* [#12159] Refactor HeatmapChartController constructor to remove TenantProvider parameter. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12213
* [#12159] Improve time range segmentation for elapsedTime in query by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12214
* [#12216] Update spring kafka container entry point of kafka plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12217
* [#12064] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12221
* [#12159] Improve the operation of creating buckets from elapsedTime values using interval by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12223
* [12208] Fix invalid unsigned version by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12226
* [#12222] Prevent inconsistent results in UID module by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12225
* [#noissue] Add non-null check for agentId for ServerMap by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12227
* [#noissue] Fix long to int for hashBytes by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12228
* [#12025] Add NodeCategory to ServiceTypeCategory by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12215
* [#12229] Remove boxing from Annotation types by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12230
* [#noissue] Remove unused SpanUriGetter from GrpcSpanMessageConverterProvider by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12231
* [#noissue] Refactor ChartGroupBuilder by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12232
* [#noissue] Cleanup ChartTransform by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12234
* [#12235] Improve windowRangeCount for TimeWindows to be precomputed by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12236
* [#12238] Add virtual TimeseriesWindows to TimeWindow by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12239
* [#12241] Apply Primitive Containers to optimize memory usage by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12242
* [#noissue] Remove unused SystemMetricChart by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12243
* [#12244] Add MetricCollectorProperties for configurable cache size by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12245
* [#noissue] Simplify StatPoint creation by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12233
* [#noissue] Refactor SystemMetricPoint for improve memory efficiency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12247
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12251
* [#noissue] Remove unused JoinStatBo by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12253
* [#12244] Change the distribution key of the systemMetricTag table by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12248
* [#noissue] Refactor MetricPoint for improve memory efficiency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12255
* [#noissue] Refactor UriMetric for improve memory efficiency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12256
* [#12159] Create TimeSeriesBuilder for generating response data by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12258
* [#noissue] Refactor QueryParameter by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12257
* [#noissue] Refactor QueryParameter by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12259
* [#noissue] Refactor AsyncQueueingUriStatStorage to use UriTransformer for improved URI handling by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12260
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12261
* [#noisie] Improved debuggability of TimeSeriesVirtualList by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12262
* [#12265] Update the entry point for kafka stream by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12266
* [#noissue] Cleanup TimeWindowSampler by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12264
* [#noissue] Refactor Array utility by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12268
* [#noissue] Refactor UriMetric by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12263
* [#12159] Develop API to return heatmap data at the application level by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12269
* [#noissue] Refactor metric point classes by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12270
* [#12273] Add timeseries-module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12271
* [#noissue] Cleanup Point initialization by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12274
* [#12240] Heatmap component made with echarts by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12250
* [#noissue] Refactor AgentUriStatBo by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12275
* [#noissue] Cleanup InspectorMetric by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12276
* [#12159] Add heatmap visualization configuration to properties by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12277
* [#noissue] Cleanup TableNameManager by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12279
* [#noissue] Refactor AgentStatService by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12278
* [#12280] Bump hbase-client from 2.5.10 to 2.5.11 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12281
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12282
* [#12240] Heatmap > outlink button by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12283
* [#12159] Change sort key combination to improve query performance by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12284
* [#12287] Bump SpotBugs from 4.7.3.6 to 4.9.3.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12288
* [#noissue] Cleanup PinotMetricMetaDataDao by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12289
* [#noissue] Refactor LinkData by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12290
* [#noissue] Refactor TimeHistogramViewModel by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12292
* [#12287] Rollback spotbugs 4.7.3.6 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12294
* [#noissue] Cleanup TimeCount by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12295
* [#noissue] Add validate commit messgae workflow by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12297
* [#noissue] Update validate commit workflow fetch depth by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12300
* [#noissue] Update validate commit workflow message by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12301
* [#noissue] Update validate commit workflow git show by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12302
* [#noissue] Update validate commit workflow commit_msg by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12303
* [#noissue] Update commit message convention of CONTRIBUTING.md by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12306
* [#12285] Update 3.x to async-http-client plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12291
* [#noissue] Extract ApplicationMapView by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12299
* [#noissue] Remove JsonView from ApplicationMap by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12307
* [#noissue] Cleanup api prefix of ServerMap by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12310
* [#noissue] Cleanup MapController validation by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12311
* [#12064] Add cache in async opertations by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12296
* [#noissue] Remove unused TimeHistogramFormat in Link by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12312
* [#noissue] Cleanup FilteredMapController by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12313
* [#noissue] Changed the independence relationship for the servermap of scatterchart. Improved to cause partial failure. by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12309
* [#noissue] Change servermap endpoint by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12314
* [#noissue] Update validate commit workflow quote by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12317
* [#noissue] Refactor ResponseTimeViewModelBuilder by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12319
* [#12315] Optimize servermap json by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12316
* [#noissue] Add missing agentName field by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12320
* [#noissue] Fix missing data in Inspector by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12321
* [#noissue] Change ServerMap json from ts to timestamp by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12323
* [#12159] Add summary information of total success/fail count to response data by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12293
* [#noissue] Get apdexScore with serviceTypeName instead of serviceTypeCode by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12322
* [#noissue] Cleanup AgentStat by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12324
* [#12240] Heatmap apply getHeatmapAppData api by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12325
* [#noissue] Show error.stack if error.stack exist by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12326
* [#noissue] Cleanup MapModule by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12327
* [#12159] Change the url to heatmap api by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12328
* Show message when trying to view scatter chart by agent with heatmap. by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12330
* [#noissue] Update rechart version by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12331
* [#noissue] Remove duplicate paths in MapModule by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12329
* [#noissue] Cleanup FilteredMapBuilder by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12332
* [#12328] Heatmap > onDragend events by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12334
* [#12159] Doubled the precision of the time slot in the chart. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12335
* [#nouissue] Refactor timestamp handling by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12339
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12341
* [#12342] Remove pinpoint-web-angular module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12343
* [#12328] Heatmap > Change drag rect style by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12344
* [#noissue] Remove "Go to Pinpoint v2" link by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12345
* [#noissue] Fix max depth to 4 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12348
* [#noissue] LocalStorage error when JSON.parse by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12349
* [#noissue] Revert useExpiredLocalStorage by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12350
* [#noissue] Change localStorage value check condition by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12351
* [#noissue] Apply hydratedValue to localStorage by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12352
* [#12336] Support multi-table mode for systemMetric by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12338
* [#12328] Heatmap > Change visualMap location & Apply Number.MAX_SAFE_INTEGER by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12354
* [#noissue] Revert #12352 by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12356
* [#12159] Replace imported class by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12357
* [#noissue] Refactor HyperLinkFactory dependencies by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12337
* [#noissue] Refactor LinkList and NodeList by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12360
* [#noissue] Refactor MapViewV3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12361
* [#12159] Change HeatMap data time order to ascending by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12363
* [#noissue] Update latest release date in README.md by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12366
* [#noissue] Refactor MapViews by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12362
* [#noissue] Rename LinkSerializerTest to LinkViewTest by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12367
* [#12368] Clear unnecessary branches in CallTree by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12369
* [#noissue] Refactor iterator in JsonFields to use Iterators.forArray by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12371
* [#noissue] Refactor FilteredMap by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12372
* [#12373] Update kafka plugin for compatibility with kafka 4.x by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12374
* [#noissue] Improve empty list handling in NodeList by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12375
* [#noissue] Remove viewVersion from FilteredMap by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12333
* [#noissue] Cleanup FilterMapView by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12381
* [#noissue] Cleanup FilteredMapController by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12384
* Heatmap realtime by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12386
* [#noissue] Fix kafka plugin transform parameter by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12385
* An error occurs when pressing the pause button while servermap filter is in progress by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12387
* [#12159] Resolve anyone matching rule malfunction for tag in systemetric. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12388
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12389
* [#noissue] Refactor FilterMap by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12390
* [#noissue] Refactor TransactionController by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12391
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12392
* [#noissue] Refactor LinkView by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12393
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12395
* [#noissue] Refactor TransactionController by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12394
* [#noissue] Extract HistogramFormat in Link by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12398
* [#12396] Update duplicated node in call tree by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12397
* [#noissue] Refactor AgentHistogramList by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12399
* [#noissue] Refactor NodeView to simplify service type checks by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12400
* [#12222] Add Inconsistent applicationName Uid cleanup task by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12402
* [#12159] Add offline table for heatmapStatApp by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12403
* [#noissue] Ignore generated classes from jacoco by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/12404
* [#noissue] Prevent NPE in CustomExceptionHandler by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12382
* [#noissue] Prevent use of unknown or corrupted span as a viewpoint by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12405
* [#12315] Apply optimized servermap json by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12401
* [#noissue] Cleanup down sampling  by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12406
* [#noissue] Refactor FilteredMap by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12407
* [#12240] Apply feedbacks of heatmap by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12409
* [#noissue] Refactor FilteredMap by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12408
* [#12410] Fix NPE of elasticsearch plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12411
* [#noissue] Apply try/catch to error risk factors by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12415
* [#12315] Fix filteredMap merge function by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12417
* [#12159] Change heatmap eventTime from startTime to CollectorAcceptTime by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12418
* [#noissue] Reduced memory usage in ResponseTime by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12412
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12416
* [#12419] Cleanup duplicate Agent field in ServerMap by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12420
* [#noissue] Refactor ApplicationTimeHistogramBuilder by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12422
* [#12419] Grouping Filter field in ServerMap by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12421
* [#12240] Fix heatmap checkedLegends by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12423
* [#noissue] Fix JsonInclude import by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12425
* Groundwork for frontend testing by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12424
* [#noissue] Cleanup ResponseTimeResultExtractor by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12427
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12428
* [#noissue] Refactor ApplicationResponse by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12426
* [#12419] Fix agents field in NodeView by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12431
* [#noissue] Add AgentResponse by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12430
* [#noissue] Refactor Comparator by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12432
* [#12419] Cleanup duplicate Agent field in ServerMap by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12429
* [#12419] Remove unused json field in ServerMap by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12433
* [#12240] Heatmap > Show Apdex & HelpPopover by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12436
* [#12434] Rename StatisticsService to LinkService by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12437
* [#12434] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12439
* [#12315] Fix ServerChartsBoardFetcher bug by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12442
* [#12440] Improved reuse of ObjectMapper in Agent by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12441
* [#12434] Move HostApplicationMapDao to servermap package by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12444
* [#12434] Changed Link stat to Application stat by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12443
* [#12419] Fix agents field in LinkView by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12445
* [#12434] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12446
* [#12240] Set heatmap as default by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12448
* [#12240] Apply tooltip to ChartTypeButton by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12449
* [#12240] Display message when heatmap API error occurs by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12450
* [#12159] Enable heatmap visualization in properties by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12447
* [#12452] Changed kafka_streams serviceType desc by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12453
* [#12159] Enable all configurations for heatmap support by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12454
* [#12455] Add S3(Simple Storage Service) client plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12456
* [#12195] Add new agent list using uid by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12249
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12459
* [#12434] Change InLink stats to Application stats by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12460
* [#12434] Optimize scanner caching by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12461
* [#12434] Refactor HostApplicationDao by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12463
* [#12434] Remove unnecessary agent interpolation by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12464
* [#12434] Reduce Memory usage in InLinkMapper by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12465
* [#12434] Change node limit of servermap from 100 to 200 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12462
* [#12466] Upgrade spring boot from 3.3.7 to 3.3.11 by @yjqg6666 in https://github.com/pinpoint-apm/pinpoint/pull/12467
* [#12466] Bump springboot3 from 3.3.7 to 3.3.11 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12468
* [#12469] Bump springframework from 6.1.16 to 6.1.20 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12471
* [#12470] Bump springsecurity from 6.4.2 to 6.4.6 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12472
* [#12473] Bump springdata from 3.3.7 to 3.3.12 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12474
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12475
* [#noissue] Reduced netty3 dependency for future removal by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12476
* [#12364] Bump pinot jdbc client from 1.2.0 to 1.3.0 by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12365
* [#12477] Bump maven-wrapper from 3.9.7 to 3.9.9 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12478
* [#noissue] Remove antrun plugin from pom.xml by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12479
* [#12480] Bump maven-enforce-plugin from 3.3.0 to 3.5.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12481
* [#12434] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12482
* [#12483] Bump maven-release-plugin from 3.0.0-M1 to 3.1.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12484
* [#12455] Update s3 client error mark by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12485
* [#noissue] Replace StringUtils.defaultString with Objects.toString for null handling by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12488
* [#12434] Refactor BasicSpan by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12487
* [#noissue] Replace deprecated API by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12491
* [#noissue] Extract ExceptionInfo by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12490
* [#12493] gzip compression for application/json by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12494
* [#noissue] Change heatmap kafka key to agentId by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12495
* [#noissue] Add Separate api to get response histogram by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12489
* [#noissue] Change heatmap kafka key for distribution by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12496
* [#noissue] Remove JsonViewUtils by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12498
* [#noissue] Cleanup ObjectMapper by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12497
* [#noissue] Cleanup by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12499
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12500
* [#12434] Add Node Interpolation by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12506
* [#12503] Do not allow the HttpClient to run in an nested by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12504
* [#noissue] Improve boundary checking by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12507
* [#12493] gzip compression for application/json by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12508
* [#noissue] Optimize TagUtils by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12509
* [#12502] Add alias support for agent profiles by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12505
* [#noissue] Refactor SystemMetric by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12510
* [#12511] Remove partitioner class config by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/12512
* Revert "[#12511] Remove partitioner class config" by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/12513
* [#noissue] Increase timeout for docker image readiness check by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12516
* [#noissue] Refactor ApplicationPairsConverter by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12517
* [#12518] Bump commons-beantuils from 1.9.4 to 1.11.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12519
* [#noissue] Refactor JacksonSerde by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12515
* [#12521] Add annotation key of http method by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12522
* [#noissue] Refactor tagList comparison function by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12520
* [#12524] Bump jetty 9 from 9.2.11.v20150529 to 9.4.57.v20241219 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12525
* [#12526] Bump postgresql-jdbc-driver to 42.3.10 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12527
* [#12528] Bump snakeyaml to 2.4 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12529
* [#12530] Bump grpc from 1.68.1 to 1.68.3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12531
* [#noissue] Bump httpclient to 4.5.14 for quickstart by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12533
* [#noissue] Fix grpc plugin it endPoint by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12532
* [#12535] Bump httpcomponents from 4.5.13 to 4.5.14 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12536
* [#12537] End support for Resin 3 Application Server by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12538
* [#noissue] Remove deprecated API in HeatMapService by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12539
* [#noissue] Remove deprecated API for Histogram by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12534
* [#12511] Add `pinpoint.metric.kafka.partitionerClass` config by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/12540
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12542
* [#12537] Remove resin icon & add javascript icon by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12541
* [#12543] Avoid potential conflicts in YAMLMapper by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12544
* [#noissue] Remove javascript icon & add close to i18n by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12547
* [#noissue] Cleanup Objects.toString by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12551
* [#noissue] Remove web-frontend commit hook by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12552
* [#noissue] Remove unused MetricsQueryParameter by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12549
* [#12555] Bump spring-kafka from 3.2.4 to 3.2.9 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12556
* [#noissue] Remove deprecated util functions by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12546
* [#12537] Deprecate RESIN and RESIN_METHOD service types in ServiceType by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12558
* [#12554] Add isolate system properties by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12557
* [#12537] Remove resin icon by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12548
* [#noissue] Add buttonProps to ClipboardCopyButton by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12560
* [#12561] Update forwarding server call tracking in grpc plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12562
* [#noissue] Bug fix in AsyncQueueingUriStatStorage by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12567
* [#12434] Remove unnecessary OutLink stats for UserNode by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12569
* [#12434] Change Queue Link to application stats by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12545
* [#12434] Refactor ServerMap by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12570
* [#12571] Update mono runnable interceptor of reactor pulgin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12572
* [#noissue] Fix sys properties isolate config by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12563
* [#12573] Improved SpringBoot application detection by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12574
* [#12559] Update README.md by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12577
* [#12434] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12578
* [#12581] Add Java ServiceType for JavaAgent by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12582
* [#noissue] Fix api `/getResponseTimeHistogramDataV2` by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12580
* [#12584] Bump spring-security-rsa from 1.0.11.RELEASE to 1.0.13.RELEASE by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12585
* [#12586] Bump bouncycastle to 1.81 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12587
* [#12109] Upgrade billboard.js to 3.15.1 by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12583
* [#noissue] Add constructor to OtlpMetricDataView by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/12588
* [#12589] Bump checkerframework to 3.49.3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12590
* [#noissue] Fix ArrayIndexOutOfBoundsException message in BytesUtils by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12591
* [#12592] Bump aspectjweaver from 1.9.5 to 1.9.24 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12593
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12594
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12597
* [#12596] Add mysql service module by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12598
* [#noissue] Activate option button even when servermap query error occurs by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12600
* [#noissue] Remove animation to OpenTelemetryMetricChart by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12601
* [#noissue] Refactor message type code handling to use int instead of short by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12602
* [#noissue] Cleanup AgentDispatchHandler by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12604
* [#12575] Fix Call Tree focus of Web by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12576
* [#12606] Fix CallStack NPE of web by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12608
* [#noissue] Improved scrollbar UX of agent list by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12611
* [#12609] Fix kafka plugin streams interceptor by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12610
* [#12596] Change serviceUid cache policy by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12612
* [#12617] Add server.port to PinpointSpringBanner by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12618
* [#12622] Improved maintainability of SqlNormalizer by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12621
* [#12619] gRPC Service Simplifications by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12620
* [#7122] Agent Management > Password input in remove popover by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12625
* [#12623] PostgreSQL Positional Parameters by @feelform in https://github.com/pinpoint-apm/pinpoint/pull/12624
* [#12622] Refactor SQL comment handling to unify readComment by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12627
* [#noissue] Add missing /api prefix by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12631
* [#noissue] Cleanup by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/12628
* [#12622] Refactor skipLine by merging with readLine by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/12629
* [#noissue] Add missing ThreadDump by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12630
* [#noissue] utils/size.ts by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12632
* [#12622] Refactor comment handling in ParserContext for improved readability by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12633
* [#noissue] Add profile alias info to exception message by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12626
* [#12635] Bump grpc from 1.68.3 to 1.72.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12636
* [#noissue] Delete unnecessary nested dependencies of netty-handler by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12637
* [#12634] Add hbase-uid module by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12550
* [#noissue] Update create-dockerfiles.yml by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/12638
* [#noissue] Refactor PResult to optimize memory allocation by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12642
* [#noissue] Refactor application map configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12643
* [#12645] Relocate sematext-hbasewd to pinpoint-commons-hbase by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12646
* [#12606] Fix NPE of kafka stream acceptorHost is null by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12641
* [#12645]  Refactor HBaseWD to improve code clarity and performance by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12648
* [#12615] Fix nested jar loading of instrument class scanner by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12650
* [#noissue] Transaction > Call Tree > Set focus by focusCallStackId by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12647
* [#12649] Transaction List > Flame Graph async arrow by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12652
* [#noissue] Cleanup by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12651
* [#noissue] Change CIDR filtering library to `com.github.seancfoley:ipaddress` by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12640
* [#12645] Optimize memory allocation for ByteHasher by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12653
* [#noissue] Separate new histogram api controller by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12660
* [#noissue] Cleanup by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12655
* [#12649] Change arrow style by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12669
* [#noissue] Update testweb server to disabled by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12670
* [#noissue] Separate new histogram api from old one by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12671
* [#12662] Add DoubleHash for Hbase Rowkey Distribution by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12663
* [#noissue] Add compression to ApplicationTraceIndex M column family by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/12672
* Add Jib plugin configuration to use instead of spring boot maven plugin by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/12675
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12676
* [#noissue] Remember to refresh the size of AgentList by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12677
* [#12673] Change ServiceUid cache miss handling by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12678
* [#12606] Fix NPE when acceptorHost is null by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/12679
* [#noissue] Update enum for MessageType by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12680
* [#noissue] System Metric > Change Host list style by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12681
* [#noissue] Refactor RowKeyEncoder by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12682
* [#noissue] Reduce memory usage of FuzzyRowKey by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12683
* [#noissue] Remove unused API by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12684
* [#noissue] Remove unused API by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12688
* [#noissue] Refactor LimitRowMapperResultsExtractor by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12687
* [#noissue] Reduce memory copy of RowKeyEncoder by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12691
* [#12692] Update separate API the CallTree and ServerMap by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12693
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12694
* [#noissue] Refactor MetadataEncoder by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12696
* [#noissue] Reduce memory copy of RowKeyEncoder by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12697
* [#12692] Update separate API the CallTree and ServerMap by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12702
* [#12692] Transaction > TraceServerMap by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12701
* [#noissue] Reduce memory copy of BulkWriter by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12703
* [#12673] Use random generated serviceUid by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12704
* [#12692] Fix web transaction trace serviceType by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12705
* [#noissue] Refactor to replace ByteSaltKey with SaltKey by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12706
* [#noissue] Remove unused RowKeyDistributor by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12708
* [#noissue] Cleanup BulkConfiguration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12707
* [#12692] Transaction > Remove applicationMapData in /transaction/trace by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12709
* [#noissue] Refactor Hasher by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12710
* [#noissue] Insert AgentInfo data into pinot by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12714
* [#12715] Config > General > Timezone by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12716
* [#noissue] Refactor Hasher by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12718
* [#noissue] Use pp. prefix to localStorage by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12717
* [#noissue] Set resizable panel min/max size by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12719
* [#12692] Update web transaction trace view by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12713
* [#noissue] ServerMap > FilterWizard > Error screen displayed when entering Korean in URL Pattern by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12720
* [#12673] Change UidFetcher to use async method by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12685
* [#noissue] Handle general case for `/histogram/statistics` by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12721
* [#noissue] Set FilterWizard scrollY & Fix style of Response Time by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12722
* [#noissue] Add api for get link histogram data by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12723
* [#noissue] Add instanceCount, instanceErrorCount by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12725
* [#12692] Update web ServerMap API by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12724
* [#12726] Bump grpc from 1.72.0 to 1.74.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12727
* [#noissue] Enhance RangeDoubleHash with SecondaryHashFunction by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12729
* [#12673] Include serviceType in applicationUid creation by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12728
* [#noissue] Add serviceInfosString to use text_match in pinot by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12732
* [#noissue] Add qualifierToShort to CellUtils by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12734
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12733
* [#noissue] Memory Optimization of DistributedScanner by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12735
* [#noissue] Refactor HbaseApplicationTraceIndexDao by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12736
* [#12711] Update collector kafka max.block.ms option by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12712
* [#noissue] Remove unused tables by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12739
* [#noissue] Refactor Rowkey handling by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12737
* [#12740] Bump hbase-client from 2.5.11-hadoop3 to 2.5.12-hadoop3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12741
* [#noissue] Not use ApplicationValidator with nodeKey by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12743
* [#12730] Update s3 http auth header by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12738
* [#noissue] Update submodule grpc-idl by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12748
* [#noissue] Add SearchOptionForm for search parameters in application map by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12747
* [#12749] Update agent parent service name by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12750
* [#noissue] Remove unused histogram format by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12752
* [#noissue] Return specific service type name by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12754
* [#12673] Prepare applcation list migration by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12744
* [#noissue] Revert "[#noissue] Return specific service type name" by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12756
* [#12753] Improved servermap representation of single transactions by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12755
* [#noissue] Add new nodeKey to further api call by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12759
* [#12764] Fix collector parent application name NPE by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12765
* [#12673] Change row key separator for proper lexicographical order by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12763
* [#noissue] Remove unused legacy Map api by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12758
* [#noissue] Add new linkKey to further api call by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12767
* [#noissue] ServerMap > Click merged node to select individual nodes, then change the timeRange to cause an error by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12768
* [#noissue] Cleanup ServerInstanceDatasourceService by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12766
* [#12673] Prepare agent list migration by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12770
* [#12771] Update agent "not matched stack id" error log by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12775
* [#noissue] Refactor NodeHistogram by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12774
* [#12771] Update agent record service type by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12777
* [#noissue] Fix clickhouse jdbc plugin it by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12778
* [#noissue] Simplify minimap in uristats by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12779
* [#noissue] Fix timeSeriesApdexInfo bug > Transaction list servermap by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12780
* [#noissue] Update ci jdk-http plugin IT by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12782
* [#noissue] useFilterWizardOnClickApply, useServerMapOnClickMenuItem by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12781
* [#noissue] Fix ci resttemplate it by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12784
* [#noissue] Update ci redis lettuce it by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12785
* [#12788] Bump jackson from 2.16.2 to 2.19.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12789
* [#12790] Bump zstd-jni from 1.5.5-11 to 1.5.7-4 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12791
* [#noissue] Add JsonToStringMapList function to MapStructUtils by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/12787
* Revert "[#noissue] Simplify minimap in uristats" by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12792
* [#12793] Bump HikariCP from 5.0.1 to 7.0.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12794
* [#12795] Bump log4j from 2.24.2 to 2.25.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12796
* [#noissue] Simplify minimap in uristats by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12797
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12800
* [#noissue] Extract HbaseTable interface for adding tables by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12802
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12803
* [#noissue] Cleanup for null safety by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12804
* [#12673] Add default uidFetcher by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12798
* [#noissue] Enhance logging in GrpcSpanChunkHandler and GrpcSpanHandler for better traceability by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12805
* [#noissue] replace dataFormat sss to SSS by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12806
* [#12807] Remove grpc it old version and dubbo plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12808
* [#noissue] Remove unnecessary ObjectMapper bean by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12809
* [#8716] Transaction list > Call tree focusRow scroll function error by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12810
* [#12811] Update collector reactor hook onErrorDropped by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12813
* [#noissue] Fix favorite error of application list main input by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12817
* [#12814] Fix agent NPE in annotation value mapper by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12816
* [#noissue] Change useSWR to useQuery (/api/userGroup, /api/userGroup/… by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12818
* [#noissue] SystemMetric > Fixed an error (data was not displayed) by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12820
* [#12823] Bump grpc from 1.74.0 to 1.75.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12824
* [#12825] Bump netty from 4.1.110.Final to 4.1.124.Final by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12826
* [#12829] Bump springframework from 6.1.20 to 6.2.10 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12830
* [#12831] Bump springboot from 3.3.11 to 3.5.5 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12832
* [#12833] Bump httpclient5 from 5.2.3 to 5.4.4 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12834
* [#12837] Bump spring-data from 3.3.12 to 3.5.3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12838
* [#noissue] Fix @TransactionalEventListener to @EventListener by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12836
* [#12839] Bump spring-security from 6.4.6 to 6.5.3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12840
* [#12842] Bump spring-retry from 2.0.6 to 2.0.12 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12841
* [#noissue] Change useSWR to useQuery by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12822
* [#12843] Bump micrometer from 1.13.9 to 1.15.3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12844
* [#12847] Bump spring-security-rsa from 1.0.13.RELEASE to 1.1.5 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12848
* [#12845] Bump opentelemetry from 1.46.0 to 1.53.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12846
* [#12849] Bump commons-lang3 from 3.17.0 to 3.18.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12850
* [#12851] Bump commons-io from 2.16.1 to 2.20.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12852
* [#12814] Rollback agent NPE in annotation value mapper by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12854
* [#noissue] Remove unnecessary versions of netty-tcnative-boringssl-static by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12853
* [#12855] Bump protobuf from 3.25.5 to 3.25.8 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12856
* [#12823] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12858
* [#noissue] Refactor ApplicationCombinedList by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12857
* [#noissue] Remove unused defaultString method by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12861
* [#12673] Use seprate uidFetcher and cache for each server request by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12821
* [#noissue] Update application uid properties by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12863
* [#noissue] fix /ui eslint error by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12862
* [#noissue] Reduce excessive collector log by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12864
* [#12866] Optimize Pinot table configuration by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12867
* Use `pinpoint.modules.*.*.enabled` properties to enable/disable modules by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/12869
* [#12865] Remove unused property and relocate the path by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/12871
* [#12865] Remove unused property and relocate the path by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/12872
* [#noissue] Apply configuration.showInspector, showHeatmap by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12873
* [#12877] Rollback hbase-client from 2.5.12-hadoop3 to 2.5.11-hadoop3 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12878
* [#12865] Update logs and missing default config by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/12876
* [#noissue] Refactor TimeWindowFunction usage and remove redundant method by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12875
* [#noissue] Fix ChartTypeButton with configuration bugs by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12879
* [#noissue] Refactor Vertex and RowKey imports to common.server package by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12880
* [#noissue] Throttle warning logs of RequestNotPermittedException by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/12881
* [#noissue] Memory Optimization by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12882
* [#noissue] Memory Optimization of SpanMapper by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12884
* [#noissue] Fix malfunctioning behavior of /links API by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12885
* [#12890] Refactor Buffer management to use getStartOffset and getEndOffset by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12891
* [#noissue] Add ResponseStatistics in LinkHistogramSummaryView by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12892
* [#12895] Prefer String.getBytes(Charset) over String.getBytes(String) by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12896
* [#noissue] Change fieldname by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12899
* [#12898] Add jakarta mail dependencies and rename user module packages by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/12900
* [#noissue] Add UnsignedBytePrefix API to Buffer by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12902
* [#12886] Update agent interceptorHolder bootstrap by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12887
* [#noissue] Disable otlp.metrics.export for basic collector by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/12903
* [#noissue] Remove duplicate mapLinkRowKeyDistributor by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12908
* [#noissue] Refactor LinkRowKey by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12911
* [#noissue] Update pulsar IT range of 4.1.0 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12909
* [#noissue] Restore `/statistics` api by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12912
* [#noissue] Apply /histogram/statistics, /histogram/statistics/links by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12786
* [#noissue] Update agent mongodb plugin for reactivestreams 5.6.0 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12913
* [#noissue] Refactor LinkRowKeyDecoder by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12914
* [#12859] Update agent directory scanner path by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12916
* [#12814] Fix agent NPE in annotation value mapper by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12918
* [#12888] Application list keyboard arrow key support by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12893
* [#noissue] Refactor ServerMap for ServiceGroup Support by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12915
* [#noissue] Remove swr by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12922
* [#12923] Update agent interceptorHolder generated class module by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12924
* [#12673] Remove ApplicationUid usage by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12917
* [#noissue] Remove timeseries data in LinkView and NodeView by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12925
* [#noissue] Refactor BulkWriter by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12921
* [#noissue] Fix VIEW SERVERS error by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12927
* [#12928] Bump asm from 9.7.1 to 9.8 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12929
* [#noissue] Add more terminal node info by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12930
* [#noissue] Cleanup code by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/12932
* [#11658] Not render Insepctor button if hasInspecotr is FALSE by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12933
* [#12934] Fix missing abs in RangeDoubleHash's secondaryHashFunction by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12935
* [#noissue] Refactor ServerMapV3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12926
* [#12940] Added timestamp in seconds relative to 2010 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12941
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12942
* Storybook update from v7 to v9 by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12939
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12944
* [#noissue] Refactor to use HistogramSlot in application map data handling by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12943
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12945
* [#noissue] Refactor EventPublisher by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12953
* [#noissue] Cleanup log4j2-test.xml by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12954
* [#noissue] Fix missing saltkey masking by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12956
* [#noissue] Enhance SpanStorePublisher to support ContextSupplier by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12958
* [#12950] Change ServerMapV3 statistics to timestamps in seconds by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12951
* [#12831] Bump spring-cloud from 4.1.4 to 4.3.0 by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/12952
* [#noissue] Refactor CacheKey to use record for improved readability and conciseness by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12960
* [#12901] Add Kubernetes deployment to README by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12964
* [#noissue] Remove unnecessary `collector.scatter.serverside-scan` property by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12968
* [#noissue] Remove unnecessary `collector.scatter.serverside-scan` pro… by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12969
* [#12961] Remove validation annotations from high-frequency collector methods to fix performance regression by @Copilot in https://github.com/pinpoint-apm/pinpoint/pull/12965
* [#noissue] Update Latest Release Date(README.md) by @liljoon in https://github.com/pinpoint-apm/pinpoint/pull/12976
* [#noissue] Refactor SqlUidMetaDataMapper by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12977
* [#12978] Update agent mongodb plugin 5.6 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12979
* [#noissue] Update hbase client from 2.5.11-hadoop3 to 2.5.12-hadoop3 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/12959
* [#noissue] Add NumberPrecondition utility by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12984
* [#noissue] Update eslint v8 to v9 by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12957
* [#noissue] Refactor stream unrolling by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12982
* [#12980] Apply Jspecify Annotation by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12981
* [#12936] Add a new version of ApplicationTraceIndex table by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12937
* [#12971] Introducing jitter-based scheduling for LinkScheduler by @koo-taejin in https://github.com/pinpoint-apm/pinpoint/pull/12975
* [#noissue] Revert "[#noissue] Remove timeseries data in LinkView and … by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/12985
* [#noissue] Add serviceType parameter to /api/getScatterData, /api/heatmap/applicationData, /api/heatmap/drag by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12989
* [#noissue] Relax validation constraints by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12990
* [#12971] Add TestCase for JitterStartTimeDistributor by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12987
* [#noissue] DataTable > Add "minHeight" props by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12991
* [#noissue] Refactor HbaseAgentInfoDao to remove unused methods by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12994
* [#noissue] Update jest, cpx vite by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12995
* [#12989] Change serviceType to serviceTypeName by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12997
* [#noissue] Update vite@6.4.1, @playwright/test@1.56.1 by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/12998
* [#noissue] Cleanup testcase by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/12999
* [#noissue] Add slotCode to HistogramSchema by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13000
* [#noissue] Update properties for new tables by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/12996
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13005
* [#13001] Improve node query performance in ServerMapV3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13002
* [#noissue] Fix Webhook ui & Alarm, User sheet ui by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13003
* [#12581] Rollback the default value for applicationservertype. Changed in version 4.0.0. by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13006
* [#noissue] Add property to skip SpotBugs analysis in pom.xml by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13007
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13010
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13008
* [#13001] Fixed slotCode bug in SelfAgentNodeFactoryV3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13011
* [#noissue] Refactor PinotExceptionMetaDataService by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13013
* [#13001] Remove Unused HistogramSlotMapBuilder by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13014
* [#noissue] Fix application focus error when keydown/up after mousemove by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13012
* [#noissue] Fix Batch startup failure by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/13016
* [#noissue] Update service_name and application_name size to 127 by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/13018
* [#11286] Implement error filtering and introduce bit-masked error code by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/13004
* [#noissue] Refactor ApplicationIndexService v1 by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/13021
* [#13023] Bump spring-security from 6.5.3 to 6.5.6 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13024
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13022
* [#noissue] Refactor NodeView to consolidate agent count writing logic by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13025
* [#noissue] Change application name encoding to padString by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/13009
* [#13026] Apply Apdex to ServerMap Node by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13027
* [#11286] Show error reasons on web by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/13020
* [#noissue] Refactor ApplicationMap by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13028
* [#noissue] Check validation of date in format function by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13034
* [#noissue] Implement ViewRender by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13029
* [#noissue] Refactor NodeRender and ServerListNodeView to remove HyperLinkFactory dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13035
* [#noissue] Add MapViewConfiguration and update serialization for Link… by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13037
* [#noissue] Refactor MapController by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13041
* [#noissue] Update pom lettuce properties by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13039
* [#13032] Bump ASM from 9.8 to 9.9 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13038
* [#noissue] Fix incorrect package name for jetty plugin by @koo-taejin in https://github.com/pinpoint-apm/pinpoint/pull/13019
* [#noissue] Use TimeHistogramFormat.V3 to compress response json by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/13017
* Use v3 format by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13046
* [#13044] Applying ApdexScore to Servermap node by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13045
* [#noissue] Cleanup NodeView by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13047
* [#noissue] Refactor TimeSeriesBuilder and HeatMapData by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13015
* Server node json by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13048
* [#noissue] Refactor metric value retrieval by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13049
* [#noissue] Add nodeCategory to LinkView by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13050
* [#13050] Use nodeCategory instead of isWas in linkDataArray.sourceInf… by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13053
* [#noissue] Refactor metric value retrieval by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13051
* [#noissue] Add AgentServerGroupListWriter for improved agent serialization by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13056
* [#noissue] Refactor timeseries chart types by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13059
* [#noissue] Replace @NotNull annotations with @NonNull from jspecify by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13060
* [#noissue] Refactor HeatMapController and DragAreaQuery by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13061
* [#noissue] Show total, satisfied, tolerating, frustrated instead of apdexScore by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13063
* [#noissue] Refactor histogram calculations by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13066
* [#noissue] Refactor application response handling to return agent IDs directly by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13065
* [#noissue] Add AgentServerGroupListWriter to NodeView and LinkView serializers by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13068
* [#noissue] Add dual write support for LinkService by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13067
* [#noissue] Remove unused heatmap by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/13069
* [#noissue] Remove unused MyBatisConfiguration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13070
* [#noissue] OpenTeleMetry > Show no longer collected tags/fields by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13064
* [#noissue] Cleanup javax.servlet-api dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13071
* [#13072] Bump oshi from 6.6.5 to 6.9.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13073
* [#13074] Bump commons-text to 1.14.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13075
* [#13063] Change Servermap node apdexScore color by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13076
* [#noissue] Refactor CustomExceptionHandler to improve null safety and stack trace handling by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13077
* [#noissue] Remove unused jcl-over-slf4j by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13078
* [#noissue] Remove spring-boot-starter-logging exclusions from dependencies in pom.xml by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13079
* [#noissue] Improved error handling in CustomExceptionHandler by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13080
* [#noissue] Fix a bug where dragging a heatmap would lead to the wrong… by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13082
* [#noissue] Cleanup reactor-netty-plugin by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13081
* [#noissue] Improvement StackTrace Log by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13083
* [#noissue] Refactor GrpcAnnotationHandler to use switch expression by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13086
* [#noissue] Change the limit for parentApplicationName to 127 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13087
* [#noissue] OpenTelemetry > Apply ChartSkeleton during isPending by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13088
* [#noissue] Cleanup JavaAssistUtils by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13090
* [#noissue] Refactor BindVariableFilter to use MethodSignature by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13089
* [#noissue] Remove unused code by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13091
* [#noissue] Add ErrorCategoryResolver to categorize error codes by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13092
* [#noissue] Refactor AnnotationUtils by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13093
* [#noissue] Refactor SpanServiceImpl by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13094
* [#noissue] Add HttpMethod class to represent standard HTTP methods by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13096
* [#noissue] Add UNKNOWN HttpMethod constant by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13097
* [#noissue] Fix HttpMethodTest to assert UNKNOWN method correctly by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13101
* [#noissue] Replace StringUtils.equals by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13099
* [#noissue] Refactor AnnotationRecordFormatter and related classes for improved handler management by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13095
* [#noissue] Replace with switch expressions by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13102
* [#13103] Apply eclipse-collection by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13104
* [#noissue] Cleanup TransactionController by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13105
* [#noissue] Apply Lists.transform for metadata by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13106
* [#noissue] Refactor TimeHistogram handling to use TimeHistogramView for improved clarity and consistency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13108
* [#13098] React v18.3 by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13100
* [#noissue] Remove useStatisticsAgentState parameter in /api/transaction/trace by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13109
* [#noissue] Update Jackson module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13107
* [#noissue] Add worflow: Upload Pinpoint binaries to GitHub Release by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/13110
* [#noissue] Add HBase tables for MapV3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13112
* [#13057] Add apdexSlot to servermap node by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/13058
* [#13054] Migrate to maven central publisher by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/13116
* [#13114] Fix missing accessOrder in LRUCache by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13115
* [#noissue] Refactor AcceptApplicationLocalCache by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13117


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
| 3.1.x            | 8-24  | 17        | 17  | 17    |


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
