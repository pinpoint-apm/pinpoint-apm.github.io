<!-- <latestReleaseNotes.md> -->
# What's New in v4.0.0
Pinpoint 4.0.0 is a **major release** that opens the 4.x line. It has three highlights:

- **Service**, now on by default, groups applications so that each team can focus on its own service.
- **OpenTelemetry Trace Support** brings applications instrumented with OpenTelemetry into Pinpoint without the Pinpoint agent.
- **Service Alarm** is a renewed alarm system built around services. New **Alarm Templates** make it easy to set up the same alarms for many applications.

It also adds Spring Boot 4.1 / Spring Framework 7.0 support and includes the agent-stability work that shipped in 3.1.1.

This release changes defaults and removes several legacy code paths, so please read the **Upgrade guide** before upgrading in place from 3.1.x.

## Highlights

### Service (enabled by default)

![Service model](https://pinpoint-apm.gitbook.io/pinpoint/~gitbook/image?url=https%3A%2F%2F2967689678-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MgQ1Is59jDrgEN5nG-0-3931491796%252Fuploads%252Fgit-blob-dfcb4828486d704cdf50df229824e92f7d072200%252Fservice_01.gif%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=1ad125734989224e670e0f3e61c66077&sv=3)

Pinpoint 4.0.0 introduces the Service feature.
You can group several applications into one service and see how services call each other on the Service Map.
Screens that support the service feature show only the data of the applications in the selected service.

- **Monitoring**: Focus on the data of the service you own and find the cause of a problem faster.
- **Operations**: As applications grow, group them by service to keep the monitoring targets clear.

Monitoring targets form a `Service → Application → Agent` hierarchy. The `demo-shop-commerce` service of the demo shopping mall looks like this:

```
Service: demo-shop-commerce          products and orders
├─ Application: Shopping-Order       order processing
│  ├─ Agent: shop-order-01
│  └─ Agent: shop-order-02
└─ Application: Shopping-Product     product lookup
   └─ Agent: shop-product-01
```

Data that is not assigned to a service, such as data collected before the upgrade or sent by agents older than 4.0.0, stays in the `DEFAULT` service. Creating a new service does not move existing data into it. To use the service feature, create the service in the Web first, then set `pinpoint.serviceName` on the agents (see *Agent*). See the [Service guide](https://pinpoint-apm.gitbook.io/pinpoint/documents/service) for details.

### OpenTelemetry Trace Support

<img width="1500" height="1444" alt="image" src="https://github.com/user-attachments/assets/55b9e821-464b-470b-990e-af10aaa63c37" />

Pinpoint 4.0.0 receives OpenTelemetry traces directly. Applications instrumented with the OpenTelemetry Java agent, any OTel SDK, or the OpenTelemetry Collector appear in the same server map, transaction list and call tree as agent-collected data, without the Pinpoint agent.

* **OTLP over gRPC and HTTP**
  Traces are accepted over gRPC and over HTTP in both protobuf and JSON, with gzip and standard OTLP responses. Span time keeps nanosecond precision (#13923).

* **URL Statistic and Error Analysis**
  URL Statistic is built from OTel server spans using the route template (#14229). Exceptions recorded on OTel spans flow into Error Analysis with multi-language stacktrace parsing (JVM, Go, Node.js, Python) and grouping by route (#14233). SQL text is shown in the call tree.

* **Server map and service map links**
  Caller → callee edges between OTel-instrumented applications are drawn from a `pp` entry in the W3C `tracestate` header, written by the sender via [pinpoint-otel-extension](https://github.com/pinpoint-apm/pinpoint-otel-extension) (OpenTelemetry Java agent extension, plus guides for Java SDK, Python, Go and Node.js). When the caller cannot propagate it, the collector and a batch job join the two sides and fill in the edge (#14453). OTel span links open the linked transaction (#13596).

* **Error log collection**
  The collector also receives OTLP logs. Exceptions that were caught and only logged are stored in Error Analysis and linked to the span they were logged in (#14299).

* **Other changes**
  * GenAI spans are summarized in the call tree: the model that served the request, input/output token usage including cached tokens, and time to first token.
  * Sensitive span attributes are never stored: HTTP headers, credentials and tokens are dropped, and URL query strings and command-line arguments are stripped before the span is written.


### Service Alarm

![Service Alarm](https://pinpoint-apm.gitbook.io/pinpoint/~gitbook/image?url=https%3A%2F%2F2967689678-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MgQ1Is59jDrgEN5nG-0-3931491796%252Fuploads%252Fgit-blob-d927bf77e1b88e427fc44b3aa70df21a7f33c7fa%252Fservice_alarm_01.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=3ce215faa289f31f0ccb56b52bd070f3&sv=3)
![Alarm Rules](https://pinpoint-apm.gitbook.io/pinpoint/~gitbook/image?url=https%3A%2F%2F2967689678-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MgQ1Is59jDrgEN5nG-0-3931491796%252Fuploads%252Fgit-blob-0c70aee36c62357f5a6daeffbf6d8582d688fa83%252Fservice_alarm_03.jpg%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=27672959c09e39ba8d3020a8a020d2c3&sv=3)

Alarms are rebuilt around services (#14282). The team that owns a service manages its rules and notification channels in one place. Alerts can be tuned to how serious a problem is, and each one leads straight to where you can investigate. Rules can watch response quality (slow and error rates, Apdex), calls to another application, agent resources (heap, CPU, connection pool) and deadlocks.

Alarm Templates are sets of rules that you apply to many applications at once. Start from a built-in preset for agent health or response quality, or make your own. When you change a template, every application that uses it updates automatically.

| | Legacy Alarm | Service Alarm |
| --- | --- | --- |
| Conditions | One metric per rule | Several metrics combined with AND / OR, so you can cut noisy alerts |
| Severity | None | `WARNING` / `CRITICAL` |
| Timing | Fixed 5-minute window, checked every 3 minutes | Window, check interval and repeat interval set per rule |
| Setup | Rules registered one application at a time | Templates and built-in presets apply a rule set to many applications |
| Channels | Configured on each rule | Email, SMS and webhook (Slack included) registered once per service and shared |
| After an alert | No history in the UI | Rule status and firing history in the UI; notifications link to the Service Map or Inspector |

See the full [Alarm comparison](https://pinpoint-apm.gitbook.io/pinpoint/documents/alarm#alarm-comparison) in the Alarm guide. Existing alarm rules are not migrated automatically, but a template lets you apply the same alarms to many applications at once. See *Upgrade guide → Service Alarm* before you switch.

### Agent

* **Service name is now required (#14379).** Every agent starts with a service name that has been registered in the Web, and the agent ID is generated automatically instead of being set by hand. Agents configured the 3.x way do not start until a service name is added; the 3.1.x identifiers can still be chosen by configuration.
* **Application type for services (#14455).** Applications in a service are shown as `JAVA` rather than as the detected server such as `TOMCAT` or `JETTY`, so icons and per-type statistics on the server map change. The previous behavior can be restored by configuration.
* **Compressed transport (#14477).** Spans and statistics are sent compressed by default, reducing network traffic to the collector with no collector change.
* **More reliable async tracing (#14391).** Async spans are no longer lost or reported as corrupted call stacks when their scope ends early.
* Spring Boot 4.1 / Spring Framework 7.0 are supported; Spring Framework 3.x and 4.x are no longer supported.
* New plugins: Apache Pekko HTTP (#13818) and Ktor client.
* okhttp 4.x and 5.x are supported (#14221).
* Tomcat 9 to 11 are supported (#14481); Tomcat 8 is no longer supported.

### Security

- **Webhook host allowlist** (#13857): configured hosts may resolve into otherwise-rejected private ranges, closing the gap left by the 3.1.1 SSRF validation. Carries the 3.1.1 basic-login hardening (required JWT secret, `HttpOnly` cookie).

### Removals & cleanup

- **Legacy server map v2 support removed** (#13905).
- **Legacy application & agent list table (`ApplicationIndex`) support removed** (#14028).
- **Legacy trace index table (`ApplicationTraceIndex`) support removed** (#14028).
- The emptied `pinpoint-plugins-bom` module removed and plugin library versions declared explicitly (#14486); the `otlptrace-otel-extension` module removed in favor of `pinpoint-apm/pinpoint-otel-extension`.

## Upgrade guide

### Defaults that changed

- **The service feature is on by default.** To restore 3.1.x behavior, set the three switches back to `false`:

  ```properties
  # web
  experimental.enableServiceMap.value=false
  pinpoint.modules.web.servicemap.enabled=false
  # collector
  pinpoint.collector.service.lookup.enabled=false
  ```

  With the service feature off, the collector stores all data in the `DEFAULT` service, whatever service name the agent reports, and does not check that the service is registered. 4.0.0 agents still need `pinpoint.serviceName` to start: set it to `DEFAULT` so that the application type is detected as in 3.1.x (`TOMCAT`, `JETTY`, ...) instead of `JAVA`.

- **Default `pinpoint.modules.uid.version` / NameVersion is now `v4`** (#14379). If the agent reports to a **collector older than 4.0.0**, pin it explicitly:

  ```properties
  pinpoint.modules.uid.version=v3
  ```

- **Agent gRPC compression is on by default.** It is backward compatible, but to disable it:

  ```properties
  profiler.transport.grpc.span.batch-sender.compression=none
  profiler.transport.grpc.stat.sender.compression=none
  ```

### Service Alarm

- Service Alarm is evaluated and sent by the new `alarm-batch-starter` process. It needs MySQL, Spring Batch metadata, HBase and Pinot. The agent statistics table settings (`alarm.agent-stat.table.prefix`, `padding-length`, `count`) are required, or startup fails.
- The legacy alarm still runs in the `batch` module, for the `DEFAULT` service only.
- Legacy alarm rules are not migrated automatically. Re-register them as Service Alarm rules; the [Alarm guide](https://pinpoint-apm.gitbook.io/pinpoint/documents/alarm) maps each legacy checker to its Service Alarm equivalent.
- Legacy SMS, email and webhook settings are not migrated either. If you enable the same condition in both systems, you get duplicate notifications.
- Service Alarm requires the service feature. With `pinpoint.modules.web.servicemap.enabled=false`, only the legacy alarm screen appears.
- The alarm API has `@PreAuthorize` hooks for a custom permission evaluator. Open-source Web does not enable method security, so these hooks are not enforced by default: anyone who can access the Web can view and change the rules, channels and templates of every service.

### Schema

Upgrading to 4.0.0 requires the schema changes below. See [Schema changes in 4.0.0](https://pinpoint-apm.gitbook.io/pinpoint/documents/service#id-7.-4.0.0).

- **MySQL 5.x is no longer supported.** 4.0.0 requires MySQL 8.4+; upgrade MySQL before upgrading Pinpoint if you run 5.7 (end of life since October 2023).
- **Pinot**: add the `serviceName` column (STRING, default `DEFAULT`) to the `exceptionTrace` table (`pinot-exceptionTrace-schema.json`).
- **MySQL** (8.4+, configuration columns use the JSON type):
  - Create the `service` table with `Service-Schema.sql`.
  - Create the alarm tables with `CreateTableStatement-mysql.sql`: `alarm_template`, `alarm_template_item`, `alarm_rule_v2`, `alarm_rule_local_config`, `alarm_notification_channel`, `alarm_channel_binding`, `alarm_state`, `alarm_history_v2`, `alarm_notification_outbox`.
  - Create the Spring Batch metadata for Alarm Batch with `SpringBatchJobRepositorySchema-mysql.sql`; Alarm Batch does not create it automatically.
- **HBase**: add the tables listed in [HBase table changes for 3.1.0](https://pinpoint-apm.gitbook.io/pinpoint/documents/hbase-table-changes#id-3.1.0) (`MapAppSelf`, `MapAgentSelf`, `MapAppOut`, `MapAppIn`, `MapAppHost`, `TraceIndex`, `Application`, `AgentId`) if they do not exist yet. Downgrading a 4.0.0 collector back to 3.1.x in place is not supported.

### Removed configuration

- The deprecated XML batch configuration and `EnableBatchProcessing` are removed — batch runs on the annotation-based config only (#13830).

### Build

- Build JDK is 17; minimum Maven is 3.9.0 (the bundled `mvnw` is unaffected).

## Compatibility

| Component | Requirement | Notes |
| --- | --- | --- |
| Agent JDK | 8+ | verified on 8 / 11 / 17 / 21 / 25 |
| Collector / Web / Batch JDK | 17+ | |
| Collector for agent 4.0.0 | 4.0.0+ | with the default `uid.version=v4`; pin `v3` for older collectors |
| MySQL | 8.4+ | new `service` and alarm tables |
| Pinot schema | migration | `serviceName` column added to `exceptionTrace` |
| HBase schema | migration | add tables (`MapApp*`, `MapAgentSelf`, `TraceIndex`, `Application`, `AgentId`) |
| Build Maven | 3.9.0+ | |

---

## Downloads

Binaries are attached to this release:

- pinpoint-agent-4.0.0.tar.gz
- pinpoint-batch-4.0.0-exec.jar
- pinpoint-alarm-batch-starter-4.0.0-exec.jar
- pinpoint-collector-4.0.0-exec.jar
- pinpoint-collector-starter-4.0.0-exec.jar
- pinpoint-web-4.0.0-exec.jar
- pinpoint-web-starter-4.0.0-exec.jar

## What's Changed
* [#13693] Update README by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/13703
* [#13693] Prepare 4.0.0-SNAPSHOT by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/13705
* [#noissue] Align OTel wrapper root span start time with earliest child by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13700
* [#13708] Bump exec-maven-plugin from 3.0.0 to 3.6.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13709
* [#13693] Add Name and descriptions by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/13710
* [#13714] Change default NameVersion to v3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13717
* [#13712] Change JAVA_HOME to jdk 17 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13713
* [#13719] Bump maven-compiler-plugin from 3.13.0 to 3.15.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13720
* [#13712] Remove fork option from agent-testweb spring-boot plugin by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13721
* [#noissue] Refine VIEW SERVERS button visibility and empty states by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13716
* [#13712] Bump required Maven version from 3.5 to 3.7 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13722
* [#13719] Move maven-compiler-plugin version to pluginManagement by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13723
* [#13726] Bump maven-surefire-plugin from 3.5.2 to 3.5.5 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13727
* [#13728] Bump maven-failsafe-plugin from 3.5.2 to 3.5.5 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13729
* [#13735] Update maven plugins by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13736
* [#13738] Bump springframework from 6.2.10 to 6.2.18 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13739
* [#noissue] Update README.md by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/13742
* [#13740] Bump spring-security from 6.5.6 to 6.5.10 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13743
* [#noissue] Remove dependabot-issue workflow by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13747
* [#13748] Bump GitHub Actions runner from ubuntu-22.04 to ubuntu-24.04 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13749
* [#13744] Bump spring-boot3 from 3.5.5 to 3.5.14 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13746
* [#noissue] Bump actions/checkout from v4 to v5 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13751
* [#13745] Bump spring-batch from 5.1.2 to 5.2.5 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13750
* [#noissue] Bump actions/cache from v4 to v5 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13752
* [#noissue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13753
* [#13754] Bump spring-data3 from 3.5.3 to 3.5.11 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13755
* [#13756] Bump log4j2 from 2.25.1 to 2.25.4 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13757
* [#noissue] Bump actions/cache from v4 to v5 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13758
* [#noissue] Update README.md Supported Modules by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13759
* [#noissue] Refine OTel-attribute-driven trace mapping in collector by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13706
* [#13760] Bump spring-kafka from 3.2.9 to 3.3.15 and kafka-client3 from 3.7.1 to 3.8.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13763
* [#13761] Bump assertj-core from 3.23.1 to 3.27.7 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13762
* [#noissue] Fix Pinot compatibility table for v3.1.x by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/13767
* [#13768] Bump spring-shell from 3.2.3 to 3.4.2 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13769
* [#13770] Bump jackson from 2.19.2 to 2.21.3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13771
* [#13534] Add @ServiceParam to ExceptionTraceController by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/13772
* [#13774] Bump guava from 33.3.1-jre to 33.6.0-jre by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13775
* [#13534] Add service-level permission check to ExceptionTraceController by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/13773
* [#noissue] Add service group menu and configuration pages by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13776
* [#13779] Bump build-helper-maven-plugin from 3.4.0 to 3.6.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13780
* [#13779] Bump jaxb2-maven-plugin from 3.1.0 to 4.1.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13781
* [#noissue] Add h2 dependency to spring-data-r2dbc plugin by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13783
* [#13784] Refactor VersionPrefixRewriter into SpaFallbackRewriter by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13785
* [#13786] Bump testcontainers from 1.21.4 to 2.0.5 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13787
* [#noissue] Add OTel tracestate pp entry propagation by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13765
* [#noissue] Bump springdoc-openapi-ui from 1.6.14 to 1.8.0 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13791
* [#noissue] Add Spring 7 / Spring Boot 4 plugin support and drop Spring 4 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13788
* [#13793] Unify agent-testweb and plugins bom into pinpoint-plugins-bom by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13794
* [#13792] Fix ShellCollectorTypeParser for Spring Shell 3.4.x API change by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13796
* [#noissue] Add pinpoint.agentName support to OTLP trace collector by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13800
* [#noissue] Remove unnecessary maven-surefire plugin configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13801
* [#noissue] Move clickhouse-jdbc shared dependency to last for version mediation by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13804
* [#noissue] Reorder and format kafka SharedDependency in kafka-it by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13806
* [#noissue] Upgrade MariaDB test container image to 10.6.27-ubi9 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13807
* [#noissue] Cleanup Cassandra-plugin-it by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13808
* [#issue] Cleanup by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13799
* [#noissue] Cleanup PulsarClient-plugin-it by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13809
* [#noissue] Cleanup Dameng-plugin-it by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13810
* [#noissue] Cleanup StdoutRecorder by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13811
* [#noissue] Cleanup Oracle-it by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13813
* [#noissue] Move AgentParam from web to commons-server by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/13812
* [#noissue] Cleanup Oracle-it by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13814
* [#13784] Fix SpaFallbackRewriter to fall back unregistered paths to index.html by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13815
* [#noissue] Rename oracle-it modules by ojdbc driver version by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13816
* [#noissue] Fix negative timestamp when opening errorAnalysis from CallTree by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13817
* [#noissue] Remove spring 4 IT by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13803
* [#13818] Add Apache Pekko HTTP plugin by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13819
* [#13777] Bump grpc from 1.75.0 to 1.81.0 and netty4 from 4.1.124.Fi… by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13778
* Feat/service setting validation by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13795
* [#noissue] Show selected service name under sidebar Service menu by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13822
* [#noissue] Rename hbase-testcluster module and remove HbaseDaoTest by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13823
* [#noissue] Use dynamic free port in ChannelFactoryTest by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13821
* [#noissue] Remove maven-eclipse-plugin from grpc-plugin-testweb by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13826
* [#noissue] Gate OTLP trace applicationName-as-agentId fallback by config by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13820
* [#noissue] Switch oracledb-ojdbc8 IT to gvenzl/oracle-xe:18-slim image by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13825
* [#noissue] Ignore git mergetool temp files by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13827
* [#noissue] Stop warn-logging client-side faults in OTLP trace mapping by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13829
* [#13830] Disable deprecated JobRegistryBeanPostProcessor by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/13831
* [#noissue] Prefer http.route over url.path for OTLP server span rpc by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13832
* [#noissue] Remove bo.codec package from CommonsHbaseConfiguration com… by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13828
* [#noissue] Bump deps to resolve all open npm critical/high Dependabot alerts by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13824
* [#13824] Update yarn.lock by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13833
* Fix server map centering for unauthorized node and transaction skeleton by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13834
* [#noissue] Refactor AttributeValue to non-generic interface with typed value accessors by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13835
* [#noissue] Replace stream with loop in RecordFactory.toPlainObject by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13837
* [ #13838] Introduce bitmask-based ErrorCategorySet by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13836
* [#13839] Fix heatmap Kafka topic name in Pinot realtime table config by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/13840
* [#noissue] Extract error instance count into HistogramAggregator by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13841
* [#13842] Separate otlptrace gRPC config and add memory/size by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13844
* [#noissue] Propagate serviceName and serviceUid through spans and transaction call tree by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13843
* [#noissue] Refactor switch statement to use enhanced switch expression in GrpcSpanBinder by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13848
* [#13842] Handle uncaught export errors and close SSL streams in OTLP … by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13847
* [#noissue] Add serviceUid support to RecordFactoryTest and remove unused method by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13850
* [#noissue] Refactor AttributeValueBytes constructor to simplify byte array handling by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13849
* [#noissue] Guard against empty metricValueGroups in SystemMetricChartFetcher by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13846
* [#noissue] Refactor TraceIndexFilterBuilder to use a static SUCCESS_C… by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13851
* Fix missing pServiceName header on service-map API requests by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13845
* [#noissue] Extract UTF-8 truncation into StringTruncator  by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13852
* [#noissue] Link OTLP exception traces to the transaction root span by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13853
* [#noissue] Encode empty OTLP bytes attribute as empty string instead … by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13854
* [#noissue] Reject NUL bytes in null-terminated buffer values by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/13856
* [#noissue] Truncate OTLP attribute values in a single pass via TransformContext by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13855
* [#noissue] Avoid defensive byte[] copies when serializing attribute bytes by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13860
* [#noissue] Rename StringTruncator to Utf8 and extract truncateIndex by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13862
* [#noissue] Optimize Utf8.truncateIndex with charAt-based scanning by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13865
* [#13845] Decouple ui package from configurationAtom in service-name interceptor by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13863
* [#13846] Fix empty tags in system metric chart group selector by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13866
* [#13867] Move Jetty 12 entry point to ServletHandler.handle to avoid … by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13868
* [#13871] Propagate serviceName through inspector stat collector pipeline by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/13872
* [#noissue] Tag OTel/Pinpoint source in span by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13874
* [#13875] Propagate serviceName through inspector web query pipeline by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/13876
* [#13875] Propagate serviceName through inspector stat pipeline by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/13880
* [#noissue] Replace parent application fields with ParentApplication by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13878
* [#noissue] Replace parent application fields with ParentApplication by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13881
* [#13858] Secure basic login JWT cookie by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/13879
* [#13857] Add SSRF validation and update webhook payload by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/13877
* [#noissue] Avoid empty span chunk application map updates by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13884
* [#noissue] Refactor getParentVertex method to accept ParentApplication directly by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13887
* [#noissue] Keep error toasts interactive while a modal is open by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13886
* [#13858] Fix basic login authentication recursion by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/13888
* [#13858] Disable basic login secure cookie by default by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/13891
* Add tests for service-map logic and extract testable helpers/hooks by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13893
* [#noissue] Add byte array indexOf helper by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13894
* [#noissue] Make V4 gRPC apiKey optional and thread serviceUid through the application map by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13895
* [#noissue] Update application map log messages by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13885
* [#noissue] Replace hardcoded UI strings with i18n keys by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13896
* [#13875] Add serviceName filter to inspector Pinot queries by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/13900
* [#13903] Cache ColumnNameV3 instances by slot code by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13901
* [#noissue] Use vertex service uid for link row keys by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13899
* [#noissue] Refactor queue accept vertex creation by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13898
* [#13905] Remove legacy server map v2 support by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13907
* [#noissue] Clarify Invalid span logging by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13909
* [#13910] Bump jackson from 2.21.3 to 2.21.4 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13911
* [#noissue] Use vertex service uid for self rows by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13912
* Fix URL stat chart legend overlapping x-axis labels by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13908
* [#noissue] Upgrade billboard.js to v4 and render charts with canvas by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13902
* [#noissue] Add apply-review skill for applying PR code reviews by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13913
* [#13904] Add Call Tree timeline rendering by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13906
* [#noissue] Simplify Service equality by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13916
* [#noissue] Update Tomcat metrics configuration by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13917
* [#noissue] Use service uid in trace index row keys by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13919
* [#noissue] Reorder null check for spanEventBoList in insertSpanChunk by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13920
* [#noissue] Include service uid in application map vertices by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13922
* [#noissue] Apply ServiceUid by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13925
* [#noissue] Add service uid query service by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13927
* [#13923] Support precise OTLP trace timestamps by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13928
* [#noissue] Fix O(n^2) scatter chart render (incremental legend count + in-place data append) by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13921
* [#noissue] Use service uid in request handling by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13926
* [#13924] Introduce ServiceModelResolver and refactor Service model by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/13929
* [#noissue] Store OTLP trace time as V3 nanos instead of a start-time … by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13932
* [#13914] Add cached serviceUid lookup and apply to agent channel by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/13915
* Migrate Error Analysis and System Metric charts from billboard.js to ECharts by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13930
* [#noissue] Fix flaky MariaDB CallableStatement plugin IT by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13935
* [#13924] Add BatchServiceModule for batch module service bean configuration by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/13937
* [#13924] Narrow BatchServiceModule component scan to ServiceRegistryServiceImpl by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/13938
* [#noissue] Add standalone OTLPTRACE collector type with OTLP/HTTP adm… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13940
* [#13914] Use agent serviceUid for agent lifecycle state updates by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/13939
* [#noissue] Store counterpart serviceUid in application-map link rowkey by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13934
* [#noissue] Pass parent Vertex to HostApplicationMap insert by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13941
* [#noissue] Log OTel-sourced invalid spans at debug level by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13942
* [#noissue] Show OTLP span attributes in the Call Tree by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13933
* [#13943] Replace AtomicLongUpdateMap with DedupCache in HbaseHostApplicationMapDao by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13944
* [#noissue] Simplify TraceSourceType.of with explicit branches by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13948
* [#13914] Disable service cache warmup by default by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/13946
* [#noissue] Make SpanBo/SpanChunkBo traceSourceType a final constructor argument by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13947
* Migrate inspector charts from billboard.js to ECharts by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13945
* [#noissue] Cleanup Node.toString by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13950
* [#noissue] Map OTel span errors to Pinpoint Span/SpanEvent exceptions by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13949
* Refine ECharts charts after the billboard.js migration by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13951
* [#noissue] Extract DroppedCounts/TruncatedCounts for annotation values by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13952
* [#noissue] Harden otlptrace-collector ingestion path by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13953
* [#noissue] Document requesting Copilot PR review via the MCP tool by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13955
* Align service-group node double-ring and sync its highlight by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13957
* [#13864] Skip duplicate accessor member injection in ASMClass by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13960
* [#noissue] Keep message-only OTel exception events in span exceptionInfo by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13954
* [#noissue] Extract SpanOwner from SpanBo/SpanChunkBo  by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13964
* [#noissue] Extract generic findEvent(events, name) in ExceptionAttributeUtils by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13965
* [#13958] Add caching to ServiceModelResolver by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/13959
* [#noissue] Add user group deletion listener hook by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/13961
* [#noissue] Extract OtelLinkValue.parse into OtelLinkValueParser by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13971
* [#noissue] Use commons-io StringBuilderWriter for JSON string building by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13972
* [#noissue] Share JsonNodeUtils.isNull with OtelLinkValueSerde by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13973
* [#noissue] Refactor OtelTraceSpanMapper by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13966
* [#13914] Enable health probes for collector by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/13969
* [#noissue] Support Spring Boot 4.1 and Spring Framework 7.0 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13967
* [#noissue] Extract OtlpAttributeBoMapper bean  by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13974
* [#noissue] Stream tag list JSON directly with Jackson core in TagList… by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13977
* [#noissue] Stream JSON directly with Jackson core in MapStructUtils by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13978
* [#noissue] Return AnnotationBo from toDroppedAnnotation instead of a Consumer sink by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13980
* [#noissue] Extract OtelLink record and stream link annotation JSON directly by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13979
* [#noissue] Extract OtelEvent record and stream event annotation JSON … by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13982
* [#13983] Apply service concept to /api/agents by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/13984
* [#noissue] Map OTLP Envoy proxy spans to Envoy service types by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13981
* [#noissue] Add plugin supported-version table README by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13975
* [#13830] Remove deprecated XML batch config and EnableBatchProcessing by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/13870
* Frontend: encapsulate sibling imports, drop unused dep, add loader/API-hook tests by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13976
* [#noissue] Map Next.js next.route to the rpc uriTemplate by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13986
* [#noissue] Promote HTTP response status code to an annotation on Span… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13987
* [#noissue] Promote HTTP method to an HTTP_METHOD annotation by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13988
* [#noissue] Add legacy and URL fallbacks for OTLP client span endPoint… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13989
* [#noissue] Filter only consumed attribute keys via a per-span consume… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13990
* [#noissue] Fix typo in frontend filenames (Sever->Server, Metic->Metric) by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13991
* [#noissue] Promote the gRPC status code to the grpc.status annotation by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13994
* [#noissue] Keep OTLP Envoy spans on the generic OpenTelemetry Service… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13993
* [#13995] Bump jakarta.validation-api from 3.0.2 to 3.1.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13996
* [#noissue] Surface silent GET query failures via a global error toast by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/13992
* [#13997] Bump reactor-bom from 2023.0.9 to 2024.0.18 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/13998
* [#noissue] Write attribute bytes with JsonGenerator.writeBinary by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14001
* [#noissue] Fix heatmap error overlay bounds and keep sidebar submenu label on one line by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14000
* [#noissue] Base64 cleanups in AttributeBoWriter and mongo WriteContext by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14002
* [#noissue] Render MiniChart with ECharts and skip redundant resize re-render by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14003
* [#noissue] Define bootstrap interceptor holders dynamically into the … by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14007
* [#14011] Apply service concept to uristat by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/14012
* [#noissue] Surface the OTel instrumentation scope in the transaction by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/13999
* [#noissue] Migrate AgentStatisticChart from Recharts to ECharts by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14009
* [#14017] Keep StringUtils.abbreviate from splitting surrogate pairs by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14015
* [#14016] Fix apdex and avgTimeMs returning 0 in uriStat summary by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/14018
* [#noissue] Drop explicitly unsampled OTel spans and report them as re… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14013
* [#13958] Add service registry cache configuration properties by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/14023
* [#noissue] Migrate the OpenTelemetry metric chart from Recharts to ECharts by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14019
* [#14004] Add per-type ValueEncoder to AnnotationTranscoder by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14005
* [#noissue] Merge the OpenTelemetry preview chart into OpenTelemetryMetricChart by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14020
* [#noissue] Pin OTel span applicationServiceType to OPENTELEMETRY_SERVER by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14025
* [#14024] Add serviceName to heatmap data path by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/14026
* [#noissue] Split BatchApplicationIndexService into v1/v2 beans by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14027
* [#noissue] Enhance SqlUid getter to batch by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/14029
* [#noissue] Only treat OTel spans as unsampled from the trace-flags byte by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14030
* [#noissue] Exclude servlet security auto-config from the OTLP trace c… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14031
* [#14028] Remove ApplicationIndex(V1) usage from web/batch by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14034
* [#noissue] Introduce SpanHeader enum for the trace qualifier type byte by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14033
* [#13596] Add OTel Link jump to Transaction List by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14035
* [#noissue] Show OTel instrumentation scope in the Call Tree Class column by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14038
* [#noissue] Migrate AgentActiveChart from Recharts to ECharts by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14032
* [#noissue] Point deprecated AttributeUtils getters to commons-collections4 MapUtils by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14043
* [#noissue] Remove recharts after migrating all charts to ECharts by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14041
* [#14036] Support service in admin API by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14045
* [#noissue] Fix otlptrace mapper and sampler bugs by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14042
* [#14044] Keep coroutine resume trace blocks balanced by @cj848 in https://github.com/pinpoint-apm/pinpoint/pull/14046
* Prevent Call Tree toolbar from overlapping tabs on narrow transaction detail panel by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14048
* [#14051] Fix FixedBuffer.getByte ignoring the index argument by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14052
* [#noissue] Resolve OTel agentStartTime from process.creation.time by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14050
* [#noissue] Support Release Candidate rpc semconv keys in the OTLP tra… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14053
* [#14039] Query serviceMap by service unit by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/14040
* Refetch application list on service change without a full reload by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14055
* [#14039] Remove obsolete query parameters from serviceMap request by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/14056
* [#14036] Move agent list endpoint out of admin API by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14059
* [#noissue] Drop sensitive OTel Span attributes at storage by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14058
* [#noissue] Inject StringAllocatorFactory into the span row mapper by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14061
* [#14044] Strengthen coroutine lifecycle regression by @cj848 in https://github.com/pinpoint-apm/pinpoint/pull/14047
* [#noissue] Remove legacy LinkRowKey and ResponseTimeMapper by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14054
* [#noissue] Apply the service concept to the agent management page by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14060
* [#noissue] Implement OTLP/HTTP trace export response semantics by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14063
* [#noissue] Support gzip request decompression on the OTLP/HTTP trace … by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14065
* [#noissue] Raise OTLP gRPC inbound limit to 4MB and align the admissi… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14066
* [#noissue] Validate OTLP trace and span IDs at ingestion by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14067
* [#noissue] Force DEFAULT serviceName for OTLP spans by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14069
* [#noissue] Enhance ApiMetaData batch get by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/14071
* [#14072] Upgrade hbase client to 2.5.15-hadoop3 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14073
* [#noissue] Print only the uid number in ServiceUid.toString by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14074
* [#14076] Add serviceName to exception trace data path by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/14077
* [#noissue] Introduce SpanHeader enum and a QualifierFilter-friendly serviceUid layout by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14078
* [#14079] Apply the selected service to scatter chart V2 query by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/14080
* Keep list scroll position on non-navigation key press by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14075
* [#noissue] Move the DEFAULT supplier constants into ServiceNameSuppli… by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14081
* [#noissue] Narrow the agent management error boundary to the table area by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14082
* [#noissue] Print only the name in ServiceName.toString by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14084
* [#noissue] Resolve serviceName eagerly at span decode time by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14087
* [#noissue] Inject a dedicated RowKeyDistributor for OTel trace row keys by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14089
* [#noissue] Expose Servicemap as its own menu and scope requests per service by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14085
* [#14083] Apply the selected service to heatmap drag query by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/14091
* [#noissue] Fix redisson reactive command tracing for redisson 3.17+ by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14094
* [#noissue] Add ServiceHeaderEnabled to gate SpanHeaderFactory via pinpoint.modules.service-header.enabled by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14093
* [#noissue] Apply the selected service consistently across every screen by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14092
* [#14028] Remove ApplicationTraceIndex(V1) usage from web by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14064
* [#14095] Apply service to server map histogram API by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/14096
* [#noissue] Replace duplicated reserved-uid check with ServiceUid.isReservedUid by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14098
* [#14028] Remove ApplicationIndex(v1) usage from collector by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14097
* Remember the last selected service across browser restarts by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14102
* [#noissue] Preserve the async subtree's sibling chain in sorted sibli… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14104
* [#noissue] Deduplicate identical type-provider definitions by content by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14105
* [#noissue] Read configuration from configurationAtom in packages/ui by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14101
* [#noissue] Extract span timestamp unit conversion into TraceTimeAccessor by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14088
* [#noissue] Declare covariant get() in ServiceUidSupplier for readability by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14108
* [#noissue] Fetch configuration once instead of on every page entry by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14106
* [#noissue] Remove the development-only TEST_SERVICE constant by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14107
* [#noissue] Remove unused mock ServiceResolver by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14109
* [#noissue] Deduplicate ThrottledLogger level methods via private log(Level, ...) by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14112
* [#14099] Return 400 for invalid serviceName and missing applicationName in serviceMap API by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/14111
* [#14114] Add time-based throttling to ThrottledLogger by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14115
* [#noissue] Add no-var coding style rule to CLAUDE.md by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14117
* [#14114] Extend ThrottledLogger parameterized overloads up to 6 argum… by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14118
* Add a merge-check skill for pre-merge PR review by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14116
* Draw the whole service map without picking an application by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14113
* [#noissue] Unify the reactor AsyncContext carrier into a single injected field by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14119
* [#noissue] Wrap the reactor Publisher seams and scheduler task carriers behind config gates by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14120
* [#14114] Add uncounted interval logger to ThrottledLogger by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14122
* [#noissue] Require curly braces for single-line if statements in CLAU… by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14123
* Let the HTTP cache revalidate /api/applications by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14121
* [#14125] Apply service context to apdex score endpoints by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/14126
* [#noissue] Preserve reactor periodic, retry, and seam subscriber lifecycle correctness by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14129
* [#noissue] Gate the generic reactor CoreSubscriber instrumentation be… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14131
* [#noissue] Generate a monomorphic exception-guard wrapper per interce… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14132
* [#noissue] Lint every frontend workspace and drop dead files by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14130
* [#13914] Handle unregistered service in collector by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14133
* [#noissue] Add a ResultReplaceBlock interceptor shape carrying the tr… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14134
* [#14028] Drop ApplicationIndex(v2) enable properties from collector by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14110
* [#noissue] Fix heatmap crash when adjusting the visual map by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14136
* [#14028] Remove ApplicationTraceIndex(v1) from collector by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14137
* [#noissue] Import CommonsServerConfiguration into the batch module instead of a local TimeSlot bean by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14142
* [#13857] Allow configured hosts to resolve into private webhook ranges by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14141
* [#noissue] Document the timer tick downstream coverage gap in reactor… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14143
* [#noissue] Add a realtime view for the servicemap by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14138
* [#noissue] Enable the interceptor exception-guard codegen by default by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14145
* [#noissue] Fix ExceptionChainSampler failing on non-positive throughput by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14144
* [#14139] Introduce service uid to metadata key model by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/14140
* [#noissue] Build an ApplicationMapModel from the span before storing the map statistics by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14128
* [#14103] Remove dead codes by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14150
* [#14127] return empty PAnnotationValue for NullAnnotation to prevent NPE by @waterWang in https://github.com/pinpoint-apm/pinpoint/pull/14135
* [#noissue] Add an opt-in JDK 9+ define-path unit test for the interce… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14146
* [#noissue] Map OTel Span.Link on child spans by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14151
* [#14103] Require jwt secret key for basic login by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14158
* Connect the servicemap to the filteredMap by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14147
* [#noissue] Remove cached protobuf builders from grpc mappers by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14159
* Type-check the frontend the way Vite resolves modules by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14165
* [#noissue] Use the casted local variable in AnnotationValueMapper by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14166
* [#noissue] Redact Claude Code sensitive attributes at storage by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14163
* [#noissue] Promote GenAI model and token usage to annotations by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14164
* [#noissue] Inject the ApplicationMapBuilder instead of constructing i… by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14162
* [#noissue] Dump the full application map model when debug logging is … by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14167
* [#noissue] Promote time to first token to the gen_ai.ttft annotation by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14169
* [#noissue] Render Call Tree Exec(%) bars for INTERNAL_METHOD rows by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14170
* Fix the frontend build and keep it building in CI by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14168
* [#noissue] Gate bare GenAI keys on gen_ai context and consume total_t… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14171
* [#noissue] Avoid casting non-inet remote addresses in HttpClientHandlerRequestWithBodyInterceptor by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14173
* Update web-frontend v3 dependencies: drop dead @types, in-range bumps, and the narrow majors by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14172
* [#noissue] Resolve the parent application serviceUid through ServiceLookupService by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14174
* [#noissue] Provide a static DEFAULT ServiceLookupService when service lookup is disabled by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14176
* [#noissue] Replace the static ServiceUidService utility with StaticServiceLookupService by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14177
* [#14178] Bump grpc from 1.81.0 to 1.82.4 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14179
* Query servicemap charts with the selected node's own service by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14175
* [#noissue] Register ServiceLookup configurations in the OTLPTRACE col… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14180
* [#noissue] Add Ktor client tracing instrumentation by @cj848 in https://github.com/pinpoint-apm/pinpoint/pull/14090
* [#noissue] Resolve serviceName in agent list APIs by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14181
* [#noissue] Manage async-http-client plugin versions as agent-module properties by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14183
* [#14184] Bump mybatis from 3.0.3 to 3.0.5 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14185
* Add step in/out to the Call Tree and Flame Graph by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14186
* [#noissue] Add TraceIndexScanKey for trace index scan start/end keys by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14193
* [#noissue] Add OPENTELEMETRY_HTTP_CLIENT and record HTTP_URL on OTLP by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14194
* [#noissue] Map Spring Boot micrometer-tracing keys in the OTLP trace … by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14198
* [#14197] Resolve serviceName in the realtime active thread count path by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/14199
* [#noissue] Keep well-known serviceUids out of the DEFAULT fallback by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14189
* [#14187] Replace exceptionChainId with errorKey in call tree exception rows by @feelform in https://github.com/pinpoint-apm/pinpoint/pull/14195
* [#noissue] Add unit tests for Ktor client tracing instrumentation by @cj848 in https://github.com/pinpoint-apm/pinpoint/pull/14182
* Scope the realtime active thread panel to the node's own service by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14201
* Open the agent id/name tooltip beside the list instead of over it by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14204
* [#noissue] Add OTel-SDK sample testwebs that export spans to Pinpoint… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14200
* [#noissue] Move Service to the commons-server uid package by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14202
* [#noissue] Harden server-side endPoint / rpc / remoteAddr mapping in … by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14205
* [#noissue] Accept OTLP/JSON on the HTTP trace endpoint by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14207
* [#noissue] Replace null-or-empty checks with CollectionUtils.isEmpty and StringUtils.hasLength by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14206
* [#noissue] Fix inverted namespace check in HbaseTestCluster and drop io.micrometer.common usages by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14209
* [#14210] Cache the singletons behind the Guice Providers on the trace… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14211
* [#14210] Inject AsyncContextFactory directly instead of resolving a Provider per recorder by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14212
* Find service-grouped applications in the service map search by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14213
* [#noissue] Upgrade react-router to 7.18.3 and import it as react-router by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14214
* [#noissue] Print sqlUid as hex string in user-facing messages by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/14215
* [#noissue] Extract named sequence comparators in CallSteps by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14216
* [#noissue] Name ServiceRegistryDao lookups by key and validate servic… by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14208
* Cleanup Spring-It by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14220
* [#14224] Decouple service map activation from experimental.enableServiceMap flag by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/14225
* [#noissue] Make enableServiceMap a user-settable experimental by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14226
* [#14188] Bump pinot jdbc client from 1.3.0 to 1.5.1 by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14190
* [#14218] Support the Iterable-based RestTemplate constructor of Sprin… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14219
* [#14221] Support okhttp 4.x and 5.x by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14222
* Upgrade i18next, date-fns and usehooks-ts (dependency catch-up, stage 3) by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14223
* [#14229] Feed URI stat from OTLP trace entry-point spans by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14230
* [#noissue] Move the transaction id parse test out of DefaultTraceContextTest by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14235
* [#noissue] Split the spring webmvc ITs by version and add a spring 7 IT by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14231
* Upgrade zod, react-toastify, react-grid-layout, react-resizable-panels and tailwindcss by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14232
* [#noissue] Keep virtualized table cells inside their column by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14236
* [#14235] Parse multi-language OTLP exception stacktraces by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14234
* [#14235] Group OTLP exceptions by route template or rpc.method, never… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14237
* [#14229] Use the shared route template for OTLP URI stat by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14238
* [#14229] Aggregate unrouted OTLP HTTP requests under /NULL in URI sta… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14239
* [#14228] Upgrade JUnit to 5.14.4 and reuse the jupiter class lifecycle by delegation by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14217
* [#14228] Pass the test class to TestDescriptorBuilder instead of reading it from the descriptor by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14241
* [#14229] Count a request once in OTLP URI stat when a SERVER span wra… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14240
* [#14228] Report the forked dependency descriptor as CONTAINER so the IDE does not duplicate its node by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14242
* [#noissue] Remove the unused profiler LRUCache by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14244
* [#noissue] Track the transformer matching time with AtomicLongFieldUpdater and validate IndexValue arguments by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14247
* [#noissue] Inject the bounded active trace map into DefaultActiveTrac… by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14246
* [#14229] Record OTLP ingest volume, rejection reasons, wire bytes and… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14243
* [#noissue] Record suspended Ktor client completion on the resume trace by @cj848 in https://github.com/pinpoint-apm/pinpoint/pull/14227
* [#noissue] Add diagnostic log for OTEL rawTags exceeding Pinot maxLength by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/14250
* [#noissue] Remove the unmodifiable list wrapping from the internal class metadata and share the empty list for empty inputs by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14251
* [#noissue] Give the servicemap its own help content by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14254
* [#14256] Upgrade maven-resolver to 1.9.27 and maven-core to 3.9.16 in plugins-test by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14257
* [#14259] Bump the maven wrapper distribution from 3.9.12 to 3.9.16 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14260
* [#noissue] Close the input stream on every path of IOUtils.toByteArray by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14252
* [#noissue] Provide the collectorExecutorCustomizer bean in the OTLP t… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14261
* Show only one map menu at a time and move the hidden one's URLs by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14255
* Stop the servermap chart board from querying the same target twice by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14253
* Tie the map search option to the base application it searches from by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14258
* Refactor TransformerRegistry by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14263
* [#noissue] Align the OTLP trace mapper with the current RPC, messagin… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14249
* [#noissue] Always give an OTLP messaging consumer span an acceptorHos… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14262
* [#noissue] Expect the Unknown endPoint fallback when an OTLP consumer… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14265
* [#noissue] Import the Error Analysis storage config into the OTLPTRAC… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14268
* [#noissue] Inline the map chart query parameters and keep the map root as their base by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14264
* Carry the service name in the scatter/heatmap full screen URL by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14270
* [#noissue] Open the OTLP trace collector seams a co-hosted OTLP logs … by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14269
* Resolve the request service through a single rule by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14271
* [#noissue] Remove unused single-service GET endpoint and stale TODO in ServiceRegistryController by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/14272
* [#noissue] Remove ServiceRegistryController tests for the deleted GET endpoint by @feelform in https://github.com/pinpoint-apm/pinpoint/pull/14273
* [#14276] Fix NoSuchMethodError in the WebFlux and RestTemplate header… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14277
* Hide configuration menus without leaving their slot, and take hidden page rules from the consuming app by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14274
* [#noissue] Add direct-call adaptor ITs and server-side WebFlux/MVC IT… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14281
* [#14275] Add agent level heatmap stat topic to collector by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14280
* [#14284] Make the pinot kafka producer buffer.memory and linger.ms co… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14285
* [#noissue] Move the Alarms and Webhook pages under service by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14283
* [#noissue] Keep the service config screens on one path each by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14286
* [#14282] Add the pinpoint-alarm module by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14288
* [#14282] Manage the pinpoint-alarm version in the root pom by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14289
* Refactor Maven resolver by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14267
* [#14282] Apply review follow-ups to the alarm template preset loader by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14292
* Refactor plugin test class loaders and simplify package predicates by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14293
* Upgrade the web-frontend dev tooling: eslint 10, storybook 10, vite 7, stylelint 17 by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14291
* [#14296] Add collector aggregation for heatmap stats by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14297
* [#14303] Bump zstd-jni from 1.5.7-4 to 1.5.7-16 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14304
* Refactor plugin test annotations into pinpoint-plugins-test-api by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14301
* [#14306] Fix uriStat summary ORDER BY for avgTimeMs and apdex by @feelform in https://github.com/pinpoint-apm/pinpoint/pull/14307
* [#14296] Evaluate heatmap scheduler conditions per bean by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14305
* [#14282] Add the pinpoint-alarm-batch module by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14294
* [#14299] Receive OTLP logs in the OTLPTRACE collector and feed except… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14300
* [#noissue] Fix the commented compressionType key in the pinot kafka p… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14302
* [#14308] Return the disabled instance from DefaultCallStack.peek() … by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14309
* [#noissue] Hide the favorite application list on a non-DEFAULT service by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14311
* [#14282] Apply review follow-ups to the alarm batch module by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14314
* [##14316] Carry the TraceBlock through OnErrorSubscriberInterceptor … by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14317
* Refactor plugins-it module and add integration test guide by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14320
* [#noissue] Move the application map data access below web by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14315
* [#14322] Wire the interceptor guard codegen through DI instead of static state by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14323
* [#14325] Enable the service feature by default in web and collector by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/14326
* [#14282] Lay out the alarm modules and move the shared readers out of web by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14324
* [#14327] Set an explicit LIMIT on the agent stat alarm queries by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14328
* Show an aggregated Apdex score on service group nodes by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14290
* [#noissue] Remove unused server map atoms by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14330
* [#noissue] Track the closed state of DefaultPluginTestInstance explicitly by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14333
* [#noissue] Throttle the corrupted call stack dumps of DefaultTrace an… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14313
* [#noissue] Build the JDK 17 testwebs by default and keep only Microna… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14332
* [#noissue] Switch the ClassLoading logger to tinylog and drop the unused commons-lang3 dependency by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14334
* [#noissue] Look the trace loggers up once per class instead of once p… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14329
* Show each application's Apdex score in the service group list by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14331
* [#noissue] Fix map help text that misdescribes the UI by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14336
* [#noissue] Move .claude/CLAUDE.md to AGENTS.md by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14340
* [#noissue] Avoid casting non-inet remote addresses in HttpClientReque… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14346
* [#noissue] Move web-frontend .claude/CLAUDE.md to AGENTS.md in English by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14350
* [#noissue] Generate per-class guards for the Block and ResultReplace … by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14335
* [#noissue] Merge the pre-release version patterns into one case-insensitive alternation by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14353
* [#noissue] Extract HandlerIdParser so the ignore-error-handler key pattern is compiled once per parse by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14354
* [#noissue] Close the trace block opened by before() even when after()… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14351
* [#noissue] Delegate JVM descriptor parsing in JavaAssistUtils to ASM … by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14355
* [#noissue] Check id characters with a loop instead of a regex Matcher by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14356
* [#noissue] Split the OTLP metric name into a String array instead of a LinkedList by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14360
* [#14341] Write the alarm timestamps in UTC and carry the offset in the api by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14349
* [#14275] Add agent level heatmap chart api by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14287
* [#noissue] Remove the parked reactor publisher seam wrapper by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14359
* [#noissue] Hold the stacktrace parser sniff order in an array by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14363
* [#noissue] Remove the unused ResultReplace interceptor shapes by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14362
* Show a permission notice when an API answers 403 by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14345
* Refactor OtelStackTrace by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14364
* [#noissue] Resolve the plugin test annotations through ConfigResolver… by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14361
* Refactor Stacktrace by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14366
* [#noissue] Extract ranged rightTrimIndex from StringUtils.rightTrim by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14367
* [#noissue] Parse the OTLP/HTTP protobuf body straight off the request stream by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14368
* [#14370] Replace commons-codec Hex/Base16 with java.util.HexFormat on the server side by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14369
* [#noissue] Parse the OTLP/HTTP protobuf body straight off the request stream by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14371
* [#14282] Move the agent index readers and the service model cache out of web by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14372
* [#14282] Add the core alarm data sources and a process that evaluates them by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14338
* [#noissue] Read the guard codegen flag in the GuardedInterceptorFactoryProvider constructor by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14374
* [#noissue] Carry the service name in the URL of the remaining menu screens by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14373
* [#noissue] Recover OTLP/JSON hex IDs after the JsonFormat parse instead of rewriting the JSON first by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14375
* [#14296] Bound heatmap flush time and drop remaining keys on timeout by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14377
* [#noissue] Expand and collapse service groups on the service map by double-click by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14365
* [#14388] Load the maven resolver behind @Dependency from its own distribution in a child class loader by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14389
* [#14381] Update README by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14387
* [#14390] Bump micrometer from 1.15.3 to 1.17.1 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14392
* [#14391] Carry the AsyncContext from before() to after() in the trace… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14393
* [#14395] Bump dropwizard-metrics from 4.2.26 to 4.2.40 by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14396
* [#noissue] Keep the Call Tree focus mark and scroll when another transaction opens by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14394
* [#noissue] Fetch the HBase tarball with ADD instead of apt-get and cu… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14397
* [#noissue] Clear the map selection when leaving the map page by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14398
* [#noissue] Keep the URL Statistic row selection when switching tabs by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14400
* [#noissue] Sync datetime-picker with rich-datetime-picker 1.1.2 by @BillionaireDY in https://github.com/pinpoint-apm/pinpoint/pull/14376
* [#noissue] Remove the deprecated AgentId, AgentName and ApplicationName binding annotations by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14399
* [#noissue] Check the agentId when requiring the pinpoint.agentId resource attribute by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14402
* [#14282] Add the alarm v2 screen and the core alarm it manages by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14385
* [#noissue] Explain double-click expand and collapse in the service map help by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14405
* [#14403] Pass applications of each search depth to ServerMapDataFilter at once by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/14404
* [#noissue] Store a pushed-out exception chain by its own sampling sta… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14401
* [#noissue] Fall back to the endPoint and then to "Unknown" for the qu… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14407
* [#14282] Split the alarm v2 page into components and hooks by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14409
* [#noissue] Lower the "targetLinkData not found" log of VirtualLinkHan… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14410
* [#noissue] Pin the pp tracestate wire contract with a fixture shared … by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14411
* [#14282] Delete the alarm rules of an application the cleanup job deletes by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14412
* [#14282] Open the alarm history link on the service and application of the rule by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14413
* [#14282] Mark an alarm channel whose user group reaches nobody by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14414
* [#14282] Carry the service of the rule in the alarm detail link by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14415
* [#noissue] Resolve the OTLP serviceName through the service lookup by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14416
* [#noissue] Read the filtered map selection through the path-scoped hooks by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14417
* [#noissue] Exclude the Pinot server-side dependencies from pinot-jdbc-client by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14418
* [#14282] Make the service alarm page work in the web by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14419
* [#noissue] Parse the OTLP resource attributes once per ResourceMetrics into OtlpResource by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14408
* [#14282] Dim a template source that cannot join the picked category by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14422
* Refactor Mongodb  by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14423
* [#noissue] Show the relative range label only while the range still matches by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14421
* [#noissue] Gather and reset the filtered map in one hook by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14420
* [#noissue] Replace the Guava cache with Caffeine in GrpcActiveThreadCountService by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14425
* [#14379] Change the default NameVersion to v4 and remove unused ObjectName code by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14424
* [#noissue] Disable heapdump endpoints by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/14428
* [#14275] Make heatmap application table name configurable by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14427
* [#noissue] Shrink the initial bundle so route-level lazy loading takes effect by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14426
* [#noissue] Remove the otlptrace-otel-extension module superseded by p… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14429
* [#14379] Fall back to v4 for an unknown ObjectNameVersion value by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14430
* [#noissue] Fix OTel Long Aggregation by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/14431
* [#noissue] Upgrade git-commit-id-plugin 4.0.5 to git-commit-id-maven-plugin 10.0.1 in the agent by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14432
* [#14435] Require Maven 3.9.0 or higher in the enforcer rule by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14436
* [#noissue] Build the docker images with the Maven wrapper in the GitH… by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14437
* [#noissue] Scroll the URL Statistic and Error Analysis tables instead of the whole page by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14434
* [#noissue] Delete the group memberships of a deleted user by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14438
* [#noissue] Add conditional query for version by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/14433
* [#noissue] Keep the bottom gap under the URL Statistic and Error Analysis tables on small windows by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14439
* [#noissue] Support serviceName in property-based feature flag by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/14357
* [#noissue] Replace ad-hoc z-index values with a named layer scale by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14440
* [#noissue] Replace google-libphonenumber with libphonenumber-js/max to shrink the Users chunk by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14441
* [#noissue] Import the OTLP trace property sources before the conditio… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14442
* [#14444] Drop the java.nio --add-opens to reproduce HBASE-30256 in CI by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14070
* [#noissue] Validate applicationName by serviceType in ApplicationValidator by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14443
* [#noissue] Remove the unused LPUSH init from RedisPubChannelProvider by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14446
* [#noissue] Guard localStorage access so the app runs in storage-blocked sandbox iframes by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14447
* [#noissue] Split ErrorAnalysisChartCore out of ErrorAnalysisChartFetcher by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14448
* [#noissue] Split CallTreeCore and TimelineCore so the transaction views draw from props by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14449
* [#noissue] Bind service cache refresh interval as Duration by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14450
* [#noissue] Remove the duplicate serviceModelResolver bean in batch by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14451
* [#14457] Validate the service name when a service is created from the web by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/14458
* [#14453] Add the OTLP link index and otlpLinkJoinJob for OTel calls w… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14454
* [#noissue] Make batch application and agent lists service-aware by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14445
* [#14455] Add profiler.applicationservertype.mode and default the application type to JAVA for named services by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14456
* [#14457] Validate the service name in the web service add form by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14459
* [#noissue] Require typing the service name to delete a service by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14461
* [#14463] Require at least 3 characters for the service name by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14465
* [#14457] Require at least 3 characters for a service name by @minwoo-jung in https://github.com/pinpoint-apm/pinpoint/pull/14460
* [#noissue] Add batchMetaCleanupJob to delete old Spring Batch meta data by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14462
* [#noissue] Hide the delete button for reserved services by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14467
* [#14466] Add serviceUid to AgentInfo by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14469
* [#noissue] Dismiss favorite toasts when the application list closes by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14470
* [#noissue] Split HeatmapChartCore out so the heatmap and its toolbar draw without the router by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14471
* [#noissue] Hide heatmap toolbar buttons per button like the scatter chart by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14473
* [#noissue] Replace Service.DEFAULT with the resolved service by @donghun-cho in https://github.com/pinpoint-apm/pinpoint/pull/14472
* [#noissue] Suppress the OTLP link index entries that stay unmatched f… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14475
* [#14477] Add gzip compression to the agent's span batch sender and st… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14478
* Add minimum length validation for ID and service name in gRPC by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14479
* [#noissue] Remove dataSource import from DatabaseFeatureFlag by @kojandy in https://github.com/pinpoint-apm/pinpoint/pull/14468
* [#14481] Change the supported Tomcat version range of the tomcat plugin to [9, 11] by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14482
* [#noissue] Carry service names in filteredMap filters from the service map by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14485
* [#noissue] Apply the current service name rules to pinpoint.serviceNa… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14484
* [#noissue] Remove the unused ehcache, cassandra-all and activemq-all … by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14483
* Refactor plugin version management and remove pinpoint-plugins-bom by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14488
* [#noissue] Build the hbase image on eclipse-temurin:8u504-b01-jre-nob… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14487
* Import junit-bom first and update undertow and fastjson versions by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14490
* [#14474] Add Envoy service type and annotation keys to display Envoy trace data by @dwkang in https://github.com/pinpoint-apm/pinpoint/pull/14476
* [#noissue] Bump Node.js from 22.13.1 to 22.23.4 for the web frontend by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14492
* [#noissue] Make the selected service name stand out in the servicemap header by @jihea-park in https://github.com/pinpoint-apm/pinpoint/pull/14493
* Improve error handling and refactor PluginTestReport status management by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14491
* [#14494] Pin brotli4j to 1.24.0 through brotli4j-bom and import it ah… by @emeroad in https://github.com/pinpoint-apm/pinpoint/pull/14495
* [#noissue] Update the plugin supported-version table for 4.0.0 by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14496
* [#noissue] Limit the share of the link index slot quota one identifie… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14497
* [#noissue] Suppress the OTLP link index SERVER entries whose callers … by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14498
* [#noissue] Give the link index quota back when the queue is full, poo… by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14500
* [#noissue] Clean up old alarm history in the batch by @ga-ram in https://github.com/pinpoint-apm/pinpoint/pull/14499
* [#noissue] Select the link index probes by a hash independent of the … by @jaehong-kim in https://github.com/pinpoint-apm/pinpoint/pull/14501
* [#14502] 4.0.0 release by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/14503
* [#14502] Update README.md by @intr3p1d in https://github.com/pinpoint-apm/pinpoint/pull/14504

## New Contributors
* @cj848 made their first contribution in https://github.com/pinpoint-apm/pinpoint/pull/14046
* @waterWang made their first contribution in https://github.com/pinpoint-apm/pinpoint/pull/14135

**Full Changelog**: https://github.com/pinpoint-apm/pinpoint/compare/v3.1.1...v4.0.0

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
