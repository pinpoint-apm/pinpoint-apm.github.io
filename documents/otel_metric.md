> **⚠ This document is currently being written.**

---

[English](otel_metric.md#opentelemetry-metric) | [한국어](otel_metric.md#opentelemetry-metric-ko)


# OpenTelemetry Metric <a id="opentelemetry-metric"></a>

## 1. Overview

Pinpoint provides OpenTelemetry metric ingestion via HTTP. Send metric data in OpenTelemetry format to Pinpoint Collector, and view the data through Pinpoint Web.

[OpenTelemetry](https://opentelemetry.io/) is an open-source framework for tracking and monitoring application performance and health.

![](<../.gitbook/assets/otel_metric_01.png>)

---

## 2. Prerequisites

- Apache Pinot and Kafka must be installed. If they are already installed, you can skip this setup step. Otherwise, see [Pinot installation](../getting-started/installation.md#pinot).
- Pinpoint Collector must be installed and deployed.
- Pinpoint Web must be installed and deployed.
- MySQL must be installed.

---

## 3. Storage Configuration (Apache Pinot)

You need to create tables in Apache Pinot to store OTel metric data.

### 3.1 Pinot and Kafka Setup

If Pinot and Kafka are already installed, you can skip this setup step. Otherwise, set them up by following the [Pinot installation guide](../getting-started/installation.md#pinot) before creating OTel Metric topics and tables.

### 3.2 Create Kafka Topics

Create 3 topics with the names below:

- `otlp-metric-double-00`
- `otlp-metric-long-00`
- `otlp-metric-metadata`

### 3.3 Create Pinot Tables

For realtime tables, create the Kafka topics referenced by the table configuration before creating the Pinot tables.

Three tables are required.

| Table | Purpose |
|---|---|
| `otlpMetricDouble` | Stores double-type metric values |
| `otlpMetricLong` | Stores long-type metric values |
| `otlpMetricMetadata` | Stores metric metadata |

Schema and table configuration files are located in the [`otlpmetric/pinot-tables/`](https://github.com/pinpoint-apm/pinpoint/tree/master/otlpmetric/pinot-tables) directory.

| File | Description |
|---|---|
| `pinot-otlpmetric-double-schema.json` | Double table schema |
| `pinot-otlpmetric-long-schema.json` | Long table schema |
| `pinot-otlpmetric-metadata-schema.json` | Metadata table schema |
| `pinot-otlpmetric-double-realtime-table.json` | Double realtime table config |
| `pinot-otlpmetric-long-realtime-table.json` | Long realtime table config |
| `pinot-otlpmetric-metadata-realtime-table.json` | Metadata realtime table config |
| `pinot-otlpmetric-double-offline-table.json` | Double offline table config |
| `pinot-otlpmetric-long-offline-table.json` | Long offline table config |

### 3.4 Data Retention

Default retention is defined in the table configuration files. You can adjust it in the Pinot table settings as needed.

---

## 4. MySQL Configuration

You need to create a table in MySQL to store dashboard definition data.

The SQL file is located at `otlpmetric/otlpmetric-web/src/main/resources/sql/CreateTableStatement-mysql.sql`.

```sql
CREATE TABLE `application_metric_definition` (
     `application_name` VARCHAR(255) NOT NULL,
     `metric_definition` text NOT NULL,
     `schema_version` int(10) NOT NULL,
     PRIMARY KEY (`application_name`)
);
```

---

## 5. Collector Configuration

OTel metric ingestion is enabled by default.

Configure and run the [collector starter](../getting-started/installation.md#collector-starter) with `METRIC` or `ALL` type.

Running with `METRIC` or `ALL` type starts an HTTP server on port 9995, receiving metric data at the `POST /opentelemetry` endpoint.

---

## 6. Web Configuration

Configure and run the [web starter](../getting-started/installation.md#web-starter).
OTel metric viewing is enabled by default. When you run Web, the OpenTelemetry menu item appears in the left sidebar.

---

## 7. Client Setup

This example uses [Micrometer](https://micrometer.io/), a library that sends metrics in OpenTelemetry format.

### 7.1 Add Dependency

```xml
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-otlp</artifactId>
    <version>1.13.3</version>
</dependency>
```

### 7.2 application.yml Configuration

Add the following configuration to send Micrometer metric data in OpenTelemetry format.

```yaml
management:
  otlp:
    metrics:
      export:
        enabled: true
        step: 30s
        batch-size: 10000
        url: http://<your-collector-host>:9995/opentelemetry
  opentelemetry:
    resource-attributes:
      service.name: ${pinpoint.applicationName}
      pinpoint.agentId: ${pinpoint.agentId}
```

**resource-attributes**

- `service.name`: Set this to your Pinpoint applicationName.
- `pinpoint.agentId`: Set this to your Pinpoint agentId.

### 7.3 Micrometer Guide

- Micrometer quick guide: https://www.baeldung.com/micrometer
- Micrometer OTLP export guide: https://docs.micrometer.io/micrometer/reference/implementations/otlp.html

---

## 8. Metric Dashboard

Unlike other metric pages, you need to build the dashboard yourself.

### 8.1 Define Metrics

**Step 1: Select Application**

Select an application at the top and click the 'Create a new metric' button to add a metric.

![](<../.gitbook/assets/otel_metric_04.png>)

**Step 2: Define Metric**

![](<../.gitbook/assets/otel_metric_05.png>)

**Data Configuration**

Define a metric by matching the stored metric data's metricGroupName, metricName, field, and tag.

Tags and fields have an N:N relationship. Select one primary search condition from either tag or field first, then select the remaining as multiple values.

**Graph Configuration**

Define how the graph should be displayed.

The stack option allows you to view data values stacked on top of each other.

### 8.2 Adjust Metric Position and Size

Added metrics can be repositioned and resized.

Click a metric to move its position. Click the bottom-right corner to resize.

### 8.3 Save Timing

Dashboard definitions are saved each time a metric is added.

When the 'Save Dashboard' button in the upper right blinks, it means the dashboard definition has changed and needs to be saved.

![](<../.gitbook/assets/otel_metric_06.png>)

---

## 9. Dashboard Example

![](<../.gitbook/assets/otel_metric_02.png>)

---

## 10. Notes

- The OpenTelemetry feature is in beta; page layout and features may change.
- Libraries other than Micrometer may require additional testing and improvements.

------------------------------------------


# 1. OpenTelemetry Metric 기능이란? <a id="opentelemetry-metric-ko"></a>

## 1. 개요

OpenTelemetry metric 데이터를 HTTP 방식으로 Pinpoint Collector에 전송하면, Pinpoint Web에서 데이터를 확인할 수 있는 기능을 제공합니다.

[OpenTelemetry](https://opentelemetry.io/)는 애플리케이션의 성능과 상태를 추적하고 모니터링하기 위한 오픈소스 프레임워크입니다.

![](<../.gitbook/assets/otel_metric_01.png>)

---

## 2. 사전 조건

- Apache Pinot와 Kafka가 설치되어 있어야 합니다. 이미 설치되어 있다면 이 준비 단계는 건너뛰어도 됩니다. 아직 설치하지 않았다면 [Pinot 설치](../getting-started/installation.md#pinot)를 참고하세요.
- Pinpoint Collector가 설치 및 배포되어 있어야 합니다.
- Pinpoint Web이 설치 및 배포되어 있어야 합니다.
- MySQL이 설치되어 있어야 합니다.

---

## 3. 스토리지 설정 (Apache Pinot)

OTel metric 데이터 저장을 위해 Apache Pinot에 테이블을 생성해야 합니다.

### 3.1 Pinot와 Kafka 준비

Pinot와 Kafka가 이미 설치되어 있다면 이 준비 단계는 건너뛰어도 됩니다. 아직 설치하지 않았다면 OTel Metric용 topic과 table을 생성하기 전에 [Pinot 설치 가이드](../getting-started/installation.md#pinot)를 참고하여 Pinot와 Kafka를 준비합니다.

### 3.2 Kafka topic 생성

아래 3개 topic을 생성합니다.

- `otlp-metric-double-00`
- `otlp-metric-long-00`
- `otlp-metric-metadata`

### 3.3 Pinot table 생성

realtime table은 Pinot table을 생성하기 전에 table 설정에서 참조하는 Kafka topic을 먼저 생성해야 합니다.

총 3개의 테이블이 필요합니다.

| 테이블 | 용도 |
|---|---|
| `otlpMetricDouble` | double 타입 metric 값 저장 |
| `otlpMetricLong` | long 타입 metric 값 저장 |
| `otlpMetricMetadata` | metric 메타데이터 저장 |

스키마 및 테이블 설정 파일은 소스코드의 [`otlpmetric/pinot-tables/`](https://github.com/pinpoint-apm/pinpoint/tree/master/otlpmetric/pinot-tables) 디렉토리에 있습니다.

| 파일 | 설명 |
|---|---|
| `pinot-otlpmetric-double-schema.json` | double 테이블 스키마 |
| `pinot-otlpmetric-long-schema.json` | long 테이블 스키마 |
| `pinot-otlpmetric-metadata-schema.json` | metadata 테이블 스키마 |
| `pinot-otlpmetric-double-realtime-table.json` | double realtime 테이블 설정 |
| `pinot-otlpmetric-long-realtime-table.json` | long realtime 테이블 설정 |
| `pinot-otlpmetric-metadata-realtime-table.json` | metadata realtime 테이블 설정 |
| `pinot-otlpmetric-double-offline-table.json` | double offline 테이블 설정 |
| `pinot-otlpmetric-long-offline-table.json` | long offline 테이블 설정 |

### 3.4 Data Retention

기본 retention은 테이블 설정 파일에 정의되어 있습니다. 필요에 따라 Pinot 테이블 설정에서 변경할 수 있습니다.

---

## 4. MySQL 설정

대시보드 정의 데이터를 저장하기 위해 MySQL에 테이블을 생성해야 합니다.

SQL 파일은 소스코드의 `otlpmetric/otlpmetric-web/src/main/resources/sql/CreateTableStatement-mysql.sql`에 있습니다.

```sql
CREATE TABLE `application_metric_definition` (
     `application_name` VARCHAR(255) NOT NULL,
     `metric_definition` text NOT NULL,
     `schema_version` int(10) NOT NULL,
     PRIMARY KEY (`application_name`)
);
```

---

## 5. Collector 설정

OTel metric 수신 기능은 기본으로 활성화되어 있습니다.

[collector starter](../getting-started/installation.md#collector-starter)를 `METRIC` 또는 `ALL` 타입으로 실행합니다.

`METRIC` 또는 `ALL` 타입으로 실행하면 포트 9995에서 HTTP 서버가 시작되며, `POST /opentelemetry` 엔드포인트로 metric 데이터를 수신합니다.

---

## 6. Web 설정

[web starter](../getting-started/installation.md#web-starter)를 실행합니다.
OTel metric 조회 기능은 기본으로 활성화되어 있습니다. Web을 실행하면 좌측 메뉴에 OpenTelemetry 항목이 노출됩니다.

---

## 7. 클라이언트 설정

OpenTelemetry 스펙으로 metric을 전송하는 라이브러리 중 [Micrometer](https://micrometer.io/)를 사용하여 metric을 전송하는 예제입니다.

### 7.1 dependency 추가

```xml
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-otlp</artifactId>
    <version>1.13.3</version>
</dependency>
```

### 7.2 application.yml 설정

Micrometer metric 데이터를 OpenTelemetry 형태로 전송되도록 설정을 추가합니다.

```yaml
management:
  otlp:
    metrics:
      export:
        enabled: true
        step: 30s
        batch-size: 10000
        url: http://<your-collector-host>:9995/opentelemetry
  opentelemetry:
    resource-attributes:
      service.name: ${pinpoint.applicationName}
      pinpoint.agentId: ${pinpoint.agentId}
```

**resource-attributes 설정**

- `service.name`에는 Pinpoint의 applicationName을 넣으면 됩니다.
- `pinpoint.agentId`에는 Pinpoint의 agentId을 넣으면 됩니다.

### 7.3 Micrometer 가이드

- Micrometer quick guide: https://www.baeldung.com/micrometer
- Micrometer OTLP export guide: https://docs.micrometer.io/micrometer/reference/implementations/otlp.html

---

## 8. Metric 대시보드

다른 metric 페이지들과 다르게 대시보드를 직접 구성해야 합니다.

### 8.1 metric 정의

**step 1 : application 선택**

상단의 application을 선택하고 'Create a new metric' 버튼을 클릭하여 metric을 추가합니다.

![](<../.gitbook/assets/otel_metric_04.png>)

**step 2 : metric 정의**

![](<../.gitbook/assets/otel_metric_05.png>)

**Data configuration 영역**

저장된 metric 데이터의 metricGroupName, metricName, field, tag를 매칭시켜서 metric을 정의합니다.

tag, field는 N:N 관계를 갖고 있고, tag, field 중에 우선시 되는 검색 조건을 먼저 하나 선택하고 나머지를 다중으로 선택할 수 있습니다.

**Graph configuration 영역**

graph를 어떤 형태로 출력할지 정의합니다.

stack 옵션은 출력되는 데이터의 수치값을 stack 형태로 값을 쌓아서 볼 수 있습니다.

### 8.2 메트릭 위치, 크기 조절

추가된 metric은 위치 크기 조절이 가능합니다.

메트릭을 클릭하여 위치를 옮길 수 있고, 오른쪽 하단을 클릭하면 크기를 변경할 수 있습니다.

### 8.3 저장 타이밍

메트릭을 추가할 때마다 dashboard의 정의 내용은 저장됩니다.

오른쪽 상단의 save dashboard 버튼이 깜빡이면 dashboard 정의 값이 변경되어 저장이 필요하다는 뜻입니다.

![](<../.gitbook/assets/otel_metric_06.png>)

---

## 9. 대시보드 예시

![](<../.gitbook/assets/otel_metric_02.png>)

---

## 10. 참고사항

- OpenTelemetry 기능은 beta라 페이지 구성과 기능이 변경될 수 있습니다.
- Micrometer 라이브러리 외에 다른 수집 라이브러리는 테스트 및 개선이 필요할 수 있습니다.
