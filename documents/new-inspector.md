
[English](new-inspector.md#new-inspector) | [한국어](new-inspector.md#new-inspector-ko)

# 1 Overview <a id="new-inspector"></a>
There has been changes in inspector in v3.0.0. The newly renewed inspector will be referred to as 'New Inspector' below, while the previous version will be referred to as 'Legacy Inspector' ([Legacy Application Inspector](https://pinpoint-apm.gitbook.io/pinpoint/v/v2.5.4/documents/application-inspector)).

Although users won't see significant changes on front-end, but the whole architecture has been rebuilt from the scratch.
The data storage has been changed from HBase to Pinot.
And the APIs have been improved so that it is more easily extenable and their responses more clear to understand.

# 2 Installation and Configuration

## 2.1 Pinot and Kafka Setup

If Pinot and Kafka are already installed, you can skip this setup step. Otherwise, set them up by following the [Pinot installation guide](../getting-started/installation.md#pinot) before creating New Inspector topics and tables.

## 2.2 Create Kafka Topics for New Inspector

Create the Kafka topics below with the partition counts shown. These counts match the `numPartitions` values in Pinpoint's default Pinot table configurations, which use `segmentPartitionConfig`.

| Kafka topic | Pinot table | Partitions |
| --- | --- | --- |
| `inspector-stat-agent-00` | `inspectorStatAgent00` | 32 |
| `inspector-stat-app` | `inspectorStatApp` | 64 |

```
$ bin/kafka-topics.sh --create --topic inspector-stat-agent-00 --partitions 32 --bootstrap-server ${YOUR_KAFKA_SERVER_ADDRESS}
$ bin/kafka-topics.sh --create --topic inspector-stat-app --partitions 64 --bootstrap-server ${YOUR_KAFKA_SERVER_ADDRESS}
```

## 2.3 Create Pinot Tables

- Create 2 tables with the names below:
  - inspectorStatAgent00: This table stores agent inspector data. The [script file to create the table](https://github.com/pinpoint-apm/pinpoint/tree/master/inspector-module/inspector-collector/src/main/pinot/multi-table) is provided in our github repository.
  - inspectorStatApp: This table stores application inspector data.
- Refer to the [github repository](https://github.com/pinpoint-apm/pinpoint/tree/master/inspector-module/inspector-collector/src/main/pinot) for table schema and configuration settings.

## 2.4 Configure and Run Pinpoint Collector, Web, and Batch with New Inspector
Configure and run the following with matching [Pinot connection settings](../getting-started/installation.md#pinot-connection-settings):

- [Collector starter](../getting-started/installation.md#collector-starter) with `BASIC` or `ALL` type — collects New Inspector data.
- [Web starter](../getting-started/installation.md#web-starter) — displays New Inspector data from Pinot.
- [Pinpoint Batch](../getting-started/installation.md#pinot-connection-settings) — processes New Inspector alarms.
- **New Inspector feature options are enabled by default, so no additional feature option changes are required for the configuration files provided in our github repository.**
- When upgrading from Pinpoint version below 3.0 to version 3.0.0 or above, some of the options may be missing in the configuration properties files you have been using. Please refer to the related configurations in the following section to check if any changes are needed in your settings.

# 3 Related Settings of Pinpoint Components
- The following configurations are already set by default in Pinpoint version 3.0.
- When upgrading from Pinpoint version below 3.0 to version 3.0.0 or above and when you wish to continue using customized configuration files you have been using, please check if below mentioned configurations are well set in your files.

## Pinpoint Collector
- `application.yml` file in `collector-starter` module:

```
pinpoint:
  modules:
    collector:
      inspector:
        enabled: true
```

## Pinpoint Web
- `application.yml` file in `web-starter` module:


```
pinpoint:
  modules:
    web:
      inspector:
        enabled: true
```

## Pinpoint Batch
- `batch-root.properties` file in `batch` module:


```
alarm.collector.version=2
```

# 4 Q&A

### A Can we still use the Legacy Inspector to save the data to HBase?

Yes, but Legacy Inspector will be deprecated in v3.0.1 so we recommended you to use the New Inspector.

To use Legacy Inspector with v3.0.0, you need to add the following settings to the Pinpoint components:

**Modify `application.yml` file in `collector-starter` module OR add java vm option when running Pinpoint Collector.**

- application.yml

```
pinpoint:
  modules:
    collector:
      inspector:
        hbase:
          enabled: true
```

- java vm option


```
-Dpinpoint.modules.collector.inspector.hbase.enabled=true
```

**Modify `batch-root.properties` file in `batch` module OR add java vm option when running Pinpoint Batch.**

- batch-root.properties


```
alarm.collector.version=1
```

- java vm option


```
-Dalarm.collector.version=1
```


### B Why change database to Pinot when there are no additional features provided to users?

New Inspector saves and retrieves the data faster than the Legacy Inspector thanks to Pinot. As Pinot project gets mature over time, there can be further improvements on performance or additional features can be introduced to Pinpoint Inpsector as well.

### C Reading inspector-stat-agent table becomes slow as more data is being stored.

You can improve performance by distributing the data across multiple tables. Follow the steps below to create multiple Pinot tables and Kafka topics. Then, add settings to Pinpoint components to read and write data from multiple Pinot tables.

**Create More Kafka Topics**

- Create N Kafka topics. (From 00 to N-1)
- The format of the topics is as follows:
  - inspector-stat-agent-00
  - inspector-stat-agent-01
  - ...
  - inspector-stat-agent-99

**Create More Pinot Tables**

- Create N Pinot tables. (From 00 to N-1)
  - [The script file](https://github.com/pinpoint-apm/pinpoint/tree/master/inspector-module/inspector-collector/src/main/pinot/multi-table) creating multiple Pinot tables is provided in our github repository.
- The format of the table names and schema names is as follows:
  - inspectorStatAgent00
  - inspectorStatAgent01
  - ...
  - inspectorStatAgent99

**Modify `application.yml` file in `collector-starter` module OR add java vm option when running Pinpoint Collector**

- application.yml


```
kafka:
  inspector:
    agent:
      table:
        count: N
```

- java vm option


```
-Dkafka.inspector.agent.topic.count=N
```

**Modify `application.yml` file in `web-starter` module OR add java vm option when running Pinpoint Web**

- application.yml


```
pinot:
  inspector:
    agent:
      table:
        count: N
```

- java vm option


```
-Dpinot.inspector.agent.topic.count=N
```

**Modify `batch-root.properties` file in `batch` module OR add java vm option when running Pinpoint Batch**

- batch-root.properties


```
job.alarm.agent.inspector.stat.table.count=N
```

- java vm option

```
-Djob.alarm.agent.inspector.stat.table.count=N
```


------------------------------------------


# 1 개요 <a id="new-inspector-ko"></a>
inspector가 Pinpoint v3.0.0에서 새로워졌습니다.
이하 새로워진 inspector를 'New Inspector'이라고 부르고 과거의 inspector는 'Legacy Inspector'라고 칭합니다 ([Legacy Application Inspector](https://pinpoint-apm.gitbook.io/pinpoint/v/v2.5.4/documents/application-inspector)). 

New Inspector에서 사용자가 보는 화면은 크게 달라진 건은 없습니다.
그러나 내부적으로 많은 변화가 있었습니다. 데이터를 저장하는 저장소가 HBase에서 Pinot로 변경이 되었습니다. api를 쉽게 확장할 수 있고, response를 명확한 형식으로 개편했습니다.
즉 inspector 기능을 추가하고 확장하기 쉽게 개선되었습니다.


# 2 설치/설정 방법

## 2.1 Pinot와 Kafka 준비

Pinot와 Kafka가 이미 설치되어 있다면 이 준비 단계는 건너뛰어도 됩니다. 아직 설치하지 않았다면 New Inspector용 topic과 table을 생성하기 전에 [Pinot 설치 가이드](../getting-started/installation.md#pinot)를 참고하여 Pinot와 Kafka를 준비합니다.

## 2.2 Kafka topic 생성

아래 Kafka topic을 지정된 partition 수로 생성합니다. 이 partition 수는 `segmentPartitionConfig`를 사용하는 Pinpoint 기본 Pinot table 설정의 `numPartitions` 값과 일치합니다.

| Kafka topic | Pinot table | partitions |
| --- | --- | --- |
| `inspector-stat-agent-00` | `inspectorStatAgent00` | 32 |
| `inspector-stat-app` | `inspectorStatApp` | 64 |

```
$ bin/kafka-topics.sh --create --topic inspector-stat-agent-00 --partitions 32 --bootstrap-server ${YOUR_KAFKA_SERVER_ADDRESS}
$ bin/kafka-topics.sh --create --topic inspector-stat-app --partitions 64 --bootstrap-server ${YOUR_KAFKA_SERVER_ADDRESS}
```


## 2.3 Pinot table 생성

- 아래 2개 테이블을 생성합니다.
  - inspectorStatAgent00: 이 테이블은 agent inspector data를 저장합니다. [스크립트](https://github.com/pinpoint-apm/pinpoint/tree/master/inspector-module/inspector-collector/src/main/pinot/multi-table)로 생성이 가능합니다.
  - inspectorStatApp: 이 테이블은 application inspector data를 저장합니다.
- table schema와 configuration은 [github repository](https://github.com/pinpoint-apm/pinpoint/tree/master/inspector-module/inspector-collector/src/main/pinot)를 참고해주세요.


## 2.4 Pinpoint Collector, Web, Batch의 New Inspector 기능 활성화

아래 컴포넌트들을 동일한 [Pinot connection settings](../getting-started/installation.md#pinot-connection-settings)로 설정하고 실행한다:

- [Collector starter](../getting-started/installation.md#collector-starter) — `BASIC` 또는 `ALL` 타입으로 실행, New Inspector 데이터를 수집한다.
- [Web starter](../getting-started/installation.md#web-starter) — Pinot에 저장된 New Inspector 데이터를 표시한다.
- [Pinpoint Batch](../getting-started/installation.md#pinot-connection-settings) — New Inspector 알람을 처리한다.
- **New Inspector 기능 옵션은 기본적으로 활성화되어 있으므로 github repository에서 제공하는 설정 파일에서 별도 기능 옵션 변경은 필요하지 않습니다.**
- Pinpoint 3.0 미만버전에서 3.0.0 이상버전으로 업그레이드 시 일부 옵션이 누락되는경우 아래 관련 옵션 설명을 참고해주세요.

# 3 Pinpoint 컴포넌트의 관련 설정

- 아래 설정들은 Pinpoint 3.0 버전에서 기본적으로 설정되어있습니다.
- Pinpoint 버전을 3.0으로 업그레이드하는경우 일부 설정이 누락되는 경우 참고하기 위해서 설정을 명시해놓습니다.


## Pinpoint Collector

- `collector-starter` 모둘의 `application.yml` 파일:

```
pinpoint:
  modules:
    collector:
      inspector:
        enabled: true
```

## Pinpoint Web

- `web-starter` 모듈의 `application.yml` 파일:

```
pinpoint:
  modules:
    web:
      inspector:
        enabled: true
```


## Pinpoint Batch

- `batch` 모듈의 `batch-root.properties` 파일:

```
alarm.collector.version=2
```


# 4 Q&A

### A HBase에 데이터를 저장하는 Legacy Inspector를 사용할 수 없나요?

가능합니다. 그러나 3.0.1 버전 이상 부터는 Legacy Inspector를 삭제할 예정이므로 Pinpoint 버전이 올라갈수록 기능을 사용할수 없으므로 New Inspector를 사용하는것을 권장합니다.
기능을 사용하려면 Pinpoint 컴포넌트들에 아래 설정을 추가해야합니다.

**collector-starter 프로젝트의 application.yml 파일이나 java vm option에 아래 설정을 추가해주세요.**

- application.yml
```
pinpoint:
  modules:
    collector:
      inspector:
        hbase:
          enabled: true
```

- java vm option
```
-Dpinpoint.modules.collector.inspector.hbase.enabled=true
```

**batch 프로젝트에서 batch-root.properties 파일이나 java vm option에 아래 설정을 추가해주세요.**

- batch-root.properties
```
alarm.collector.version=1
```

- java vm option
```
-Dalarm.collector.version=1
```


### B 사용자에게 제공되는 기능은 비슷한데 Pinot기반으로 inspector를 개선한 이유는 뭘까요?

다양한 데이터를 빠르게 저장하고 확인하고 위해서 Pinot로 데이터를 저장하도록 개선되었고
아직 부족한 기능이 많지만 Pinot의 발전에 맞춰서 기능을 보완하도록 하겠습니다.

### C inspector-stat-agent 테이블의 데이터가 많아서 읽기 속도가 느려집니다.

여러 개의 체이블에 데이터를 나누어 저장해서 성능 향상을 얻을 수 있습니다.
아래를 단계를 따라 전체 N 개의 Pinot table과 Kafka topic을 생성하고, Pinpoint 컴포넌트들에 설정을 추가해서 data를 수집/조회합니다.

**Kafka topic 생성**

- N개 Kafka topic을 생성합니다. (00에서 N-1까지)
- topic의 형식은 다음과 같습니다.
  - inspector-stat-agent-00
  - inspector-stat-agent-01
  - ...
  - inspector-stat-agent-99


**Pinot table 생성**

- N개 Pinot table을 생성합니다. (00에서 N-1까지)
  - [스크립트](https://github.com/pinpoint-apm/pinpoint/tree/master/inspector-module/inspector-collector/src/main/pinot/multi-table)로 다수의 테이블 생성이 가능합니다.
- table name과 schema name의 형식은 다음과 같습니다.
  - insepctorStatAgent00
  - insepctorStatAgent01
  - ...
  - insepctorStatAgent99


**`collector-starter` 모듈의 `application.yml` 파일이나 java vm option에 아래 설정을 추가해 주세요.**

- application.yml
```
kafka:
  inspector:
    agent:
      table:
        count: N
```

- java vm option
```
-Dkafka.inspector.agent.topic.count=N
```

**`web-starter` 모듈의 `application.yml` 파일이나 java vm option에 아래 설정을 추가해 주세요.**
- application.yml
```
pinot:
  inspector:
    agent:
      table:
        count: N
```

- java vm option
```
-Dpinot.inspector.agent.topic.count=N
```

**`batch` 모듈의 `batch-root.properties` 파일이나 java vm option에 아래 설정을 추가해 주세요.**
- batch-root.properties
```
job.alarm.agent.inspector.stat.table.count=N
```

- java vm option
```
-Djob.alarm.agent.inspector.stat.table.count=N
```
