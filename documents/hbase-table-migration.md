# HBase Table Migration

## 3.1.0

Table creation scripts for 3.1.0:

- [hbase-create.hbase](https://github.com/pinpoint-apm/pinpoint/blob/v3.1.0/hbase/scripts/hbase-create.hbase)
- [hbase-create-snappy.hbase](https://github.com/pinpoint-apm/pinpoint/blob/v3.1.0/hbase/scripts/hbase-create-snappy.hbase)

### Before You Start

Create the new HBase tables before changing table-related properties or starting upgraded components.

The property values shown below are the 3.1.0 defaults and use the new tables.

### Upgrade Order

1. Create the new HBase tables.
2. Enable dual write for each feature (see each feature's **Transition**).
3. Switch reads to the legacy tables during migration (see each feature's **Transition**).
4. Run the copy APIs to migrate historical data, if supported.
5. Switch reads back to the new tables, if changed in step 3.
6. Disable legacy writes once the new tables are confirmed healthy.

## Application & Agent List

### Tables

`ApplicationIndex` is split into two new tables:

| Legacy | New |
|---|---|
| `ApplicationIndex` | `Application`, `AgentId` |

### Properties

#### Collector

```properties
pinpoint.collector.application.index.v1.enabled=false
pinpoint.collector.application.index.v2.enabled=true
```

#### Web

```properties
# v1/v2 enabled properties are used for delete operations.
pinpoint.web.application.index.v1.enabled=false
pinpoint.web.application.index.v2.enabled=true
pinpoint.web.application.index.read.v2=true
```

#### Batch

```properties
pinpoint.batch.application.index.read.v2=true

# Legacy ApplicationIndex cleanup
job.cleanup.inactive.applications.enable=true
job.cleanup.inactive.applications.cron=0 0 3 * * THU
job.cleanup.inactive.applications.emptydurationthreshold=P35D
# - emptyItemWriter: Not actually removes application
# - cleanTargetWriter: Actually removes application
job.cleanup.inactive.applications.writer=emptyItemWriter

# New Application and AgentId table cleanup
# Disabled by default; enable after verifying with dry-run.
job.cleanup.inactive.agent-application.enable=false
job.cleanup.inactive.agent-application.cron=0 0 4 * * THU
# Test run only. Does not delete data.
job.cleanup.inactive.agent-application.dry-run=true
job.cleanup.inactive.agent-application.threshold-days=30
```

### Transition

- Collector: set `pinpoint.collector.application.index.v1.enabled=true` for dual write.
- Web: set `pinpoint.web.application.index.v1.enabled=true` to delete from the legacy table during migration.
- Web: set `pinpoint.web.application.index.read.v2=false` to read from the legacy table during migration.
- Batch: set `pinpoint.batch.application.index.read.v2=false` to read from the legacy table during migration.

### Data Migration

Application & Agent List supports historical data migration through Web copy APIs.

| API | Description |
|---|---|
| `/api/admin/copy/applications` | Copy all application index data |
| `/api/admin/copy/agents/all` | Copy all agent index data, using more time and resources |
| `/api/admin/copy/agents?durationDays=30` | Copy agent index data for recent `durationDays` |
| `/api/admin/copy/agents?applicationName=app` | Copy agent index data for a specific `applicationName` |
| `/api/admin/copy/agents?serviceTypeCode=1000` | Copy agent index data for a specific `serviceTypeCode` |

Notes:

- Copy APIs are exposed on the Web component.
- Agent copy APIs use the `AgentInfo` table; Java agents send `AgentInfo` periodically, so `durationDays` can include long-running active agents.
- Some agents may not send `AgentInfo` periodically; use `serviceTypeCode` for them.
- `durationDays` and `/agents/all` copy a wider range of data, so they may take longer to complete.
- `applicationName` and `serviceTypeCode` copy the least required data.

Example:

```bash
# copy all applications
curl -X POST /api/admin/copy/applications

# copy all agents
curl -X POST /api/admin/copy/agents/all

# copy agents for recent 30 days
curl -X POST "/api/admin/copy/agents?durationDays=30"

# copy agents for a specific application
curl -X POST "/api/admin/copy/agents?applicationName=my-app"

# copy agents for a specific service type
curl -X POST "/api/admin/copy/agents?serviceTypeCode=1000"
```

## ServerMap

### Tables

`ApplicationMapStatisticsSelf_Ver2` is split into two new tables:

| Legacy | New |
|---|---|
| `HostApplicationMap_Ver2` | `MapAppHost` |
| `ApplicationMapStatisticsCaller_Ver2` | `MapAppOut` |
| `ApplicationMapStatisticsCallee_Ver2` | `MapAppIn` |
| `ApplicationMapStatisticsSelf_Ver2` | `MapAppSelf`, `MapAgentSelf` |

### Properties

#### Collector

```properties
# v2: legacy table, v3: new table, dual: dual write for data migration
pinpoint.modules.uid.version=v3
```

#### Web

```properties
# v2: legacy table, v3: new table
pinpoint.modules.uid.version=v3
```

### Transition

- Collector: set `pinpoint.modules.uid.version=dual` for dual write.
- Web: set `pinpoint.modules.uid.version=v2` to read from the legacy tables during migration.

## TraceIndex

### Tables

| Legacy | New |
|---|---|
| `ApplicationTraceIndex` | `TraceIndex` |

### Properties

#### Collector

```properties
pinpoint.collector.application.trace.index.v1.enabled=false
pinpoint.collector.application.trace.index.v2.enabled=true
```

#### Web

```properties
pinpoint.web.trace.index.read.v2=true
```

### Transition

- Collector: set `pinpoint.collector.application.trace.index.v1.enabled=true` for dual write.
- Web: set `pinpoint.web.trace.index.read.v2=false` to read from the legacy table during migration.