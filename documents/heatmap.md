
[English](heatmap.md#heatmap) | [한국어](heatmap.md#heatmap-ko)


# 1 Overview <a id="heatmap"></a>

Heatmap is a new visualization feature introduced in Pinpoint v3.1.0. It provides a statistics-based view of transaction response time distribution alongside the existing Scatter Chart.

While Scatter Chart plots every individual transaction, Heatmap aggregates transactions into time/elapsed-time buckets and displays density using color intensity. This approach significantly improves rendering performance for high-volume applications and makes it easier to quickly grasp overall transaction distribution patterns.

Both views coexist — users can switch between Heatmap and Scatter Chart via a toggle button.

![](<../.gitbook/assets/heatmap_01.png>)

# 2 Architecture

Heatmap data flows through the following pipeline:

1. Pinpoint Agent sends span data to Pinpoint Collector via gRPC.
2. Collector aggregates response time data and publishes to Kafka (`heatmap-stat-app-*` topics).
3. Apache Pinot ingests from Kafka into the `heatmapStatApp` table, aggregating counts per time bucket (10-second intervals).
4. Pinpoint Web queries Pinot to render the heatmap visualization.

Pinot schema and table configuration details are described in [section 3.3](#33-create-pinot-tables) below.

# 3 Installation and Configuration

## 3.1 Pinot and Kafka Setup

If Pinot and Kafka are already installed, you can skip this step. Otherwise, set them up by following the [Pinot installation guide](../getting-started/installation.md#pinot) before creating Heatmap topics and tables.

## 3.2 Create Kafka Topics

Create a Kafka topic with the name below:

- `heatmap-stat-app-00`

```
$ bin/kafka-topics.sh --create --topic heatmap-stat-app-00 --bootstrap-server ${YOUR_KAFKA_SERVER_ADDRESS}
```

The topic name follows the pattern `{prefix}{index}`, where `prefix` is `heatmap-stat-app-` and `index` is zero-padded to 2 digits.

## 3.3 Create Pinot Tables

Create the `heatmapStatApp` table in both REALTIME and OFFLINE modes (hybrid table) for optimal query performance.

Schema and table configuration files are located in [`collector/src/main/pinot/`](https://github.com/pinpoint-apm/pinpoint/tree/master/collector/src/main/pinot):

| File | Description |
|---|---|
| `pinot-heatmap-stat-application-schema.json` | Table schema |
| `pinot-heatmap-stat-application-realtime-table.json` | Realtime table config |
| `pinot-heatmap-stat-application-offline-table.json` | Offline table config |

Refer to the [Pinot documentation](https://docs.pinot.apache.org/basics/components/table#streaming-table-creation) for table creation instructions.

Default retention is defined in the table configuration files. You can adjust it in the Pinot table settings as needed.

## 3.4 Configure and Run Pinpoint Collector and Web

### Collector

Configure and run the [collector starter](../getting-started/installation.md#collector-starter) with `BASIC` or `ALL` type.

Heatmap is enabled by default in the `application.yml` of `collector-starter`:

```yaml
pinpoint:
  modules:
    collector:
      heatmap:
        enabled: true
```

Collector Kafka settings are configured by default in `heatmap-collector.properties`:

```properties
kafka.heatmap.topic.count=1
kafka.heatmap.topic.prefix=heatmap-stat-app-
kafka.heatmap.topic.padding.length=2
kafka.heatmap.key.partition.count=1
```

### Web

Configure and run the [web starter](../getting-started/installation.md#web-starter).

Heatmap is enabled by default in the `application.yml` of `web-starter`:

```yaml
pinpoint:
  modules:
    web:
      heatmap:
        enabled: true
```

Web Pinot settings are configured by default in `heatmap-web.properties`:

```properties
pinot.heatmap.topic.count=1
pinot.heatmap.topic.prefix=heatmap-stat-
pinot.heatmap.topic.padding.length=2
```

# 4 Usage

1. Select an application in Pinpoint Web.
2. Click the toggle button on the Scatter Chart area to switch to the Heatmap view.
3. The heatmap displays transaction distribution with color intensity indicating density — darker colors represent higher transaction counts.
4. Click on a cell to drill down into the individual transactions for that time/response-time range.

# 5 Scatter Chart vs Heatmap

| | Scatter Chart | Heatmap |
|---|---|---|
| Data | Individual transactions | Aggregated statistics |
| Performance | Degrades with high volume | Consistent regardless of volume |
| Use case | Detailed analysis of individual transactions | Quick overview of distribution patterns |
| Storage | HBase (real-time) | Pinot (pre-aggregated) |

# 6 Notes

- Heatmap feature is enabled by default starting from v3.1.0.
- No additional agent configuration is required — heatmap data is derived from the same span data collected by the existing agent.
- Both Scatter Chart and Heatmap can be used simultaneously.


------------------------------------------


# 1 개요 <a id="heatmap-ko"></a>

Heatmap은 Pinpoint v3.1.0에 새로 추가된 시각화 기능입니다. 기존 Scatter Chart와 함께 트랜잭션 응답시간 분포를 통계 기반으로 보여줍니다.

Scatter Chart는 개별 트랜잭션을 하나씩 점으로 표시하지만, Heatmap은 트랜잭션을 시간/응답시간 구간별로 집계하여 색상 농도로 밀도를 표현합니다. 이 방식은 대량 트랜잭션 환경에서 렌더링 성능을 크게 향상시키며, 전체 트랜잭션 분포 패턴을 빠르게 파악할 수 있게 합니다.

두 뷰는 공존하며, 토글 버튼으로 Heatmap과 Scatter Chart를 전환할 수 있습니다.

![](<../.gitbook/assets/heatmap_01.png>)

# 2 구조

Heatmap 데이터는 다음 파이프라인으로 처리됩니다:

1. Pinpoint Agent가 gRPC로 span 데이터를 Collector에 전송합니다.
2. Collector가 응답시간 데이터를 집계하여 Kafka (`heatmap-stat-app-*` topic)에 발행합니다.
3. Apache Pinot가 Kafka에서 데이터를 수집하여 `heatmapStatApp` 테이블에 저장합니다 (10초 단위로 집계).
4. Pinpoint Web이 Pinot에서 데이터를 조회하여 heatmap을 렌더링합니다.

Pinot 스키마 및 테이블 설정은 아래 [3.3 Pinot table 생성](#33-pinot-table-생성)에서 자세히 설명합니다.

# 3 설치/설정 방법

## 3.1 Pinot와 Kafka 준비

Pinot와 Kafka가 이미 설치되어 있다면 이 준비 단계는 건너뛰어도 됩니다. 아직 설치하지 않았다면 Heatmap용 topic과 table을 생성하기 전에 [Pinot 설치 가이드](../getting-started/installation.md#pinot)를 참고하여 Pinot와 Kafka를 준비합니다.

## 3.2 Kafka topic 생성

아래 topic을 생성합니다.

- `heatmap-stat-app-00`

```
$ bin/kafka-topics.sh --create --topic heatmap-stat-app-00 --bootstrap-server ${YOUR_KAFKA_SERVER_ADDRESS}
```

topic 이름은 `{prefix}{index}` 형식으로, prefix는 `heatmap-stat-app-`이고 index는 2자리로 zero-padding됩니다.

## 3.3 Pinot table 생성

`heatmapStatApp` 테이블을 REALTIME과 OFFLINE 모드 모두로 생성합니다 (hybrid table).

스키마 및 테이블 설정 파일은 소스코드의 [`collector/src/main/pinot/`](https://github.com/pinpoint-apm/pinpoint/tree/master/collector/src/main/pinot) 디렉토리에 있습니다.

| 파일 | 설명 |
|---|---|
| `pinot-heatmap-stat-application-schema.json` | 테이블 스키마 |
| `pinot-heatmap-stat-application-realtime-table.json` | Realtime 테이블 설정 |
| `pinot-heatmap-stat-application-offline-table.json` | Offline 테이블 설정 |

테이블 생성 방법은 [Pinot 가이드](https://docs.pinot.apache.org/basics/components/table#streaming-table-creation)를 참고하세요.

기본 retention은 테이블 설정 파일에 정의되어 있습니다. 필요에 따라 Pinot 테이블 설정에서 변경할 수 있습니다.

## 3.4 Collector와 Web 설정 및 실행

### Collector

[collector starter](../getting-started/installation.md#collector-starter)를 `BASIC` 또는 `ALL` 타입으로 실행합니다.

Heatmap 기능은 `collector-starter`의 `application.yml`에서 기본적으로 활성화되어 있습니다:

```yaml
pinpoint:
  modules:
    collector:
      heatmap:
        enabled: true
```

Collector Kafka 설정은 `heatmap-collector.properties`에 기본적으로 설정되어 있습니다:

```properties
kafka.heatmap.topic.count=1
kafka.heatmap.topic.prefix=heatmap-stat-app-
kafka.heatmap.topic.padding.length=2
kafka.heatmap.key.partition.count=1
```

### Web

[web starter](../getting-started/installation.md#web-starter)를 실행합니다.

Heatmap 기능은 `web-starter`의 `application.yml`에서 기본적으로 활성화되어 있습니다:

```yaml
pinpoint:
  modules:
    web:
      heatmap:
        enabled: true
```

Web Pinot 설정은 `heatmap-web.properties`에 기본적으로 설정되어 있습니다:

```properties
pinot.heatmap.topic.count=1
pinot.heatmap.topic.prefix=heatmap-stat-
pinot.heatmap.topic.padding.length=2
```

# 4 사용 방법

1. Pinpoint Web에서 애플리케이션을 선택합니다.
2. Scatter Chart 영역의 토글 버튼을 클릭하여 Heatmap 뷰로 전환합니다.
3. Heatmap은 색상 농도로 트랜잭션 분포를 표시합니다 — 색이 진할수록 트랜잭션 수가 많습니다.
4. 셀을 클릭하면 해당 시간/응답시간 구간의 개별 트랜잭션을 확인할 수 있습니다.

# 5 Scatter Chart vs Heatmap

| | Scatter Chart | Heatmap |
|---|---|---|
| 데이터 | 개별 트랜잭션 | 집계된 통계 |
| 성능 | 대량 데이터 시 성능 저하 | 데이터 양에 관계없이 일정 |
| 용도 | 개별 트랜잭션 상세 분석 | 분포 패턴 빠른 파악 |
| 저장소 | HBase (실시간) | Pinot (사전 집계) |

# 6 참고사항

- Heatmap 기능은 v3.1.0부터 기본으로 활성화되어 있습니다.
- 별도의 Agent 설정은 필요 없습니다 — heatmap 데이터는 기존 Agent가 수집하는 span 데이터에서 파생됩니다.
- Scatter Chart와 Heatmap을 동시에 사용할 수 있습니다.
