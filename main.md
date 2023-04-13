<!-- <latestReleaseNotes.md> -->
# What's New in v2.5.1
# Key Features
## Support Spring Framework 6, Spring Boot 3, Tomcat 10
- issue : #9599, #9667
## Apache Pinot performance optimization 
- issue : https://github.com/pinpoint-apm/pinpoint/issues/9791#issuecomment-1491486262
  Improved to use scattering read for all pinot servers.
  - Convert table type from Realtime to Hybrid
  - Index Optimization
## URI Metric Improvement
- New features :  Apdex Score, Sorting, Failure Count Chart, Fetch Limit


![image](https://user-images.githubusercontent.com/7564547/231360497-a35635ad-d4a1-427c-ae86-472820b799a9.png)


## New Plugins
- Support Tomcat 10 #9674
- Support  Spring-framework6, Spring Boot3 #9676
- Support kafka-streams 2.5 ~ 3.2 #9689
- Improvements to support spring-data-mongodb-reactive #9610

# BugFix
- Improved transform for lambda classes in java15+ #9588
- Improve async state propagation of non sampling state for full statistics #9595
## What's Changed
* [#9538] Update README.md by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9544
* [#noissue] Prepare 2.5.1-SNAPSHOT by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9546
* [#noissue] Update README.md by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9547
* [#9558] Configurable flink rest port by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9559
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9565
* [#9563] Dynamic loading of GrpcMetricHandler by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9564
* [#9567] exclude kafka dependency in web-starter by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9568
* [#noissue] Apply computeIfAbsent by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9574
* [#9575] Cleanup junit dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9577
* [#9569] Add Pinot Module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9570
* [#9584] Add LocalTraceRoot for DisableTrace by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9585
* [#noissue] Resize call-tree on window resize by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9590
* [#noissue] fix wrong ui/ux by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/9582
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9596
* [#9380] Add line-number and location info on call-tree by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9605
* [#9606] Fix redis-lettuce plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9607
* [#9588] Improved transform for lambda classes by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9598
* [#9603] Add uri stat modules by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9604
* [#9573] Refactor TagParser to TagUtils, Apply regex precompile by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/9600
* [#9601] Fix tests aarch64 compatible by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9602
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9612
* [#9575] Polishing by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9613
* [#9610] Improvements to spring-data-mongodb-reactive by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9611
* [#noissue] Put uristat modules under uristat parent module by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9620
* [#9614] Apply temporary fix to Pinot #9614 issue by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9615
* [#noissue] Add debug log for reactor by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9617
* [#9522] Polishing by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9619
* [#noissue] Fix mongodb plugin IT by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9622
* [#9623] Remove private pinpoint error data on PinpointErrorAttributes by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9624
* [#9603] Changed path of property source for uri collector by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9628
* [#noissue] Fix reactive it of mongodb plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9629
* [#9603] Add @Configuration and change filename by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9630
* [#9633] Replace List with Map by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9634
* [#9633] Add ScopeUtils by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9635
* [#noissue] Change side-menu order by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9639
* [#9633] Polishing by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9637
* [#9595] Improve async state propagation in NonSampling  state by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9627
* [#9642] Add Generic ArgumentValidator by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9643
* [#9595] Refactor AsyncState by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9645
* [#9518] Add sorting UI for agent-list in inspector page by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9638
* [#noissue] Polishing UrlTraceSampler by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9647
* [#9595] Refactor ActiveThreadDump by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9651
* [#9189] Add apdex-score formula in the apdex-score guide popup by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9649
* [#noissue] Cleanup logger name by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9656
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9657
* [#noissue] Refactor AgentInfoFilter by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9659
* [#8666] Fix redis lettuce connection problem by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9660
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9663
* [#9595] Improve async state propagation in NonSampling  state by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9654
* [#9641] Add new API for agent statistics by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9646
* [#noissue] Cleanup Assertions.assertThrows by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9668
* [#9669] Add log to accept event converter by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9670
* [#9653] Add plugin package class requirement filter by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/9658
* [#noissue] fix plugin package class requirement filter by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/9672
* [#noissue] Add close-callback on error popup by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9675
* [#noissue] Add Intellij configuration directory to gitignore by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9681
* [#noissue] Adding Logger for Kafka Callback by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9680
* [#9641] Replace agent-stat api by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9682
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9686
* [#9684] Add pinpoint-agent-testweb-commons module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9685
* [#9667] tomcat 10 support by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/9674
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9687
* [#9599] spring-framework 6 support by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/9676
* [#noissue] Cleanup unused code by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9690
* [#9673] Support kafka-streams 2.5 ~ 3.2 by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9689
* [#9317] Use agent-list api for the list on main page by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9688
* [#9595] Fix missing close of DisableTrace by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9692
* [#9614] Add temporary getter + setter functions for WrappedPinotPrepa… by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9621
* [#9693] CallStack OverFlow check is missing in AsyncChildTrace by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9694
* [#noissue] update github action by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/9697
* [#noissue] enhance system metric dataType query by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/9698
* [#9595] Refactor AsyncContext by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9700
* [#9702] Update reactor-netty plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9704
* [#9595] Clean up async context end-point patterns by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9709
* [#9967] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9710
* [#9717][Frontend] update node version by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/9696
* [#9595] Fix an issue where metric values in non sampling state were incorrect by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9715
* [#9595] Cleanup AsyncContext by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9701
* [#9595] Remove close state check by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9722
* [#9724] To defend against nullPointerexception when select hostGroupName about system metric function by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9725
* [#9595] Fix precision of uri-metric in the vertx plugin by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9726
* [#9712] Add more data for uri statistics by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9729
* [#noissue] Add copy & paste interface on agent-list by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9731
* [#noissue] Add loading on url-metric by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9733
* [#noissue] Fix error scoping by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9736
* [#5649] change partition key of kafka for system metric double table by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9737
* [#noissue] Update configurations by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9738
* [#9734] Update to support vertx client versions 3.4 to 3.7 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9735
* [#noissue] Control apdex-score visibility by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9740
* [#noissue] Polishing Interceptor by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9739
* [#noissue] Explicitly create topics for kafka-streams integration tests by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9745
* [#9595] Improve AsyncContext propagation of reactor netty plugin by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9741
* [#noissue] Modified QueryParameter class to use the builder pattern by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9743
* [#9595] Improve AsyncContext propagation of grpc plugin by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9746
* [#noissue] delete duplicate config by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9752
* [#9744] Fix collector starter behaviors by arguments by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9747
* [#noissue] Update mybatis IT - 3.5.12 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9754
* [#noissue] Fix server-list update condition by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9755
* [#noissue] Add load status on system-metric by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9756
* [#9724] Move the null check logic to sql by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9758
* [#noissue] Update Pinot compatibility table by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9759
* [#noissue] Refactor LinkData by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9757
* [#noissue] Fix AgentList to be created with the given sorting rule by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9763
* [#9748] skip java 17 it-test by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/9749
* [#9765] Add pinot-config module to remove redundant configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9766
* [#9760] Move setting kafka endpoint address to FetchResponseInterceptor by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9761
* [#9764] Add scatter-chart v2 by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9768
* [#noissue] Widen url-info and total-count column by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9770
* [#9765] Move TenantProvider to pinot-datasource by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9771
* [#9765] Add pinot-kafka module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9772
* [#noissue] fix uri stat summary null check bug by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9774
* [#9765] Cleanup Pinot dependencies by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9775
* [#9712] remove -1 value check for uri stat apdex by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9778
* [#9765] Refactor MyBatis configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9779
* [#9765] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9780
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9782
* [#9773] Enhance url-statistic page by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9786
* [#9765] Refactor metric configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9788
* [#9765] Move KafkaCallbacks to pinot-kafka module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9790
* [#9793] Modify the schema of pinot tables and change index settings. Apply hybrid table to improve performance. by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9793
* [#9765] Add missing Number alias by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9798
* [#9799] Add connection factory to spring r2dbc plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9800
* [#noissue] Update scatter-chart dependency by @binDongKim in https://github.com/pinpoint-apm/pinpoint/pull/9802
* [#noissue] update github action by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/9769
* [#9804] Modularization by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9805
* [#9804] Refactor FrontendConfigController by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9806
* [#9178] Discard some warning logs about invalid trace by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9801
* [#9804] Cleanup FrontendConfigExportConfiguration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9807
* [#9791] add uriStat offline table. change config(replicasPerPartition) by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9808
* [#9791] RealtimeToOfflineSegmentsTask on uriStat table by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9810
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9809
* [#9791] Change uri stat pinot schema by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/9812
* [#9791] change retentionTimeValue by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9814
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9818
* [#noissue] Unified dependency versions: logback, gson, errorprone, pr… by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9816
* [#9817] Add spring tx plugin and update kotlin coroutine by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9819
* [#9822] Fix service type detector for vertx 4.x by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9823
* [#noissue] Add h2 database serveramp img by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9824
* [#9804] Modularization by @smilu97 in https://github.com/pinpoint-apm/pinpoint/pull/9826
* [#noissue] Cleanup by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9825
* [#9828] Separate basic login from web module by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9829
* [#9804] Refactor QueryService by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9830
* [#noissue] Fix some typos by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/9783
* [#noissue] Refactor TransactionInfoViewModel by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9831
* [#noissue] Cleanup dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9832
* [#noissue] Cleanup AutoConfiguration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9835
* [#noissue] Remove unnecessary /webjars path by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9836
* #9838 Update Range.java by @ryetan in https://github.com/pinpoint-apm/pinpoint/pull/9833
* [#9839] fix batch fail by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9840
* [#NOISSUE] code cleanup by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/9834
* [#9842] 2.5.1 release by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9846
## Dependency Update
* [#9592] Bump spring-kafka 2.3.10.RELEASE to 2.9.4, kafka-clients from… by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/9593
* [#9625] Bump google guice from 4.2.2 to 5.1.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9626
* [#9661] Bump git-commit-id-plugin from 4.0.0 to 4.0.5 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9662
* [#9750] Bump springdoc-openapi-ui from 1.4.4 to 1.6.14 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9751
* [#9548] Bump springframework from 5.3.20 to 5.3.24 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9549
* [#9554] Bump spring-batch from 4.3.3 to 4.3.7 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9555
* [#9552] Bump spring-security from 5.5.8 to 5.8.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9553
* [#9556] Bump spring-boot from 2.5.12 to 2.7.7 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9557
* [#9560] Bump jackson from 2.13.4 to 2.14.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9561
* [#9571] Bump HikariCP from 4.0.3 to 5.0.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9572
* [#9575] Bump junit5 from 5.7.2 to 5.8.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9576
* [#9578] Bump maven-core from 3.6.3 to 3.8.6 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9579
* [#9580] Bump maven-dependency-plugin from 3.1.2 to 3.4.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/9581
* [#9608] Bump build-helper-maven-plugin from 1.10 to 3.3.0 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/9609

## New Contributors
* @ryetan made their first contribution in https://github.com/pinpoint-apm/pinpoint/pull/9833

**Full Changelog**: https://github.com/pinpoint-apm/pinpoint/compare/v2.5.0...v2.5.1

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
