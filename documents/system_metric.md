
[English](system_metric.md#system-metrics) | [한국어](system_metric.md#system-metrics-ko)


# 1 System Metrics <a id="system-metrics"></a>
System metrics menu is newly added to Pinpoint in v2.5.0.
Pinpoint uses [telegraf agent](https://portal.influxdata.com/downloads/) to collect system metrics data to Pinpoint Collector in which the data are saved in Pinot.
Saved system metrics data are accessible via Pinpoint web.

![](<../.gitbook/assets/system_metric_01.png>)

Pinot is a real-time distributed OLAP datastore. For further information please refer to [their official documents](https://docs.pinot.apache.org).

# 2 Architecture
![](<../.gitbook/assets/system_metric_02.jpeg>)

1. Telegraf agent sends system metrics data to Pinpoint collector.
2. Pinpoint collector saves data to Pinot through Kafka.
  - Kafka is necessary to stream data to Pinot.
3. Pinpoint web accesses Pinot to display collected metrics data.

# 3 Installation and Configuration

## 3.1 Pinot and Kafka Setup

If Pinot and Kafka are already installed, you can skip this setup step. Otherwise, set them up by following the [Pinot installation guide](../getting-started/installation.md#pinot) before creating System Metric topics and tables.

## 3.2 Create Kafka Topics for Pinpoint System Metrics
Create 3 topics with the names below:

- `system-metric-data-type`
- `system-metric-tag`
- `system-metric-double`

## 3.3 Create Pinot Tables
- Pinot table schemas for Pinpoint system metrics is provided in [our github repository](https://github.com/pinpoint-apm/pinpoint/tree/master/metric-module/metric/src/main/pinot).
- Please refer to [Pinot documents](https://docs.pinot.apache.org/basics/components/table#streaming-table-creation) to create necessary tables in your Pinot cluster.
- Total 3 tables should be created.
  - systemMetricDataType: this table saves type informations on collected data.
  - systemMetricTag: this table saves metadata (i.e., host, tags) for collected data.
  - systemMetricDouble: this table saves metric data in double. In order to use the hybrid table feature, create both REALTIME and OFFLINE tables.


## 3.4 Configure and Run Pinpoint Collector and Web with System Metrics

Configure and run the [collector starter](../getting-started/installation.md#collector-starter) with `METRIC` or `ALL` type.
Configure and run the [web starter](../getting-started/installation.md#web-starter) to display System Metric data stored in Pinot.

To show the System Metric menu, enable the following option in [pinpoint-web-metric.properties](https://github.com/pinpoint-apm/pinpoint/tree/master/metric-module/metric/src/main/resources/pinot-web/profiles):

```
config.show.systemMetric=true
```

## 3.5 Install and Configure Telegraf Agent <a id="install-and-configure-telegraf-agent"></a>
Telegraf collects below metrics information on the host machine:

- cpu
- disk usage
- disk usage (percent)
- inode usage
- memory usage
- memory usage(percent)
- swap
- system load
- nginx
- apache

---

- Install Telegraf according to this [installation guide](https://docs.influxdata.com/telegraf/v1.21/introduction/installation/).
- Add below configuration to `telegraf.conf` file to send collected metrics to Pinpoint collector via http.
  - **Note**: Starting from Pinpoint v3.0.2, the metric port has been changed from `15200` to `9995`.
  - ```
              [[outputs.http]]
                url = "http://{PINPOINT_COLLECTOR_IP}:9995/telegraf"
                 
                 [outputs.http.headers]
                 hostGroupName = {applicationName}
                 Content-Type = "application/json"  
    ```
  - `url`: substitute `{PINPOINT_COLLECTOR_IP}` to your Pinpoint collector address so that telegraf can send collected metrics to Pinpoint collector
  - `hostGroupName`: this value will be used as the key in Pinpoint web when querying the metrics details. It is recommended to use your applicationName already used in Pinpoint.


## 4 View Collected System Metrics Data
1. Click `Infrastructure` on the side bar menu in Pinpoint web.
2. Search for the hostGroupName you have configured for Telegraf agents as described [in 3.5](#install-and-configure-telegraf-agent).
3. A list of hosts will be displayed on the left, and you can view the system metrics data by clicking each of them.

![](<../.gitbook/assets/system_metric_03.png>)

## 5 Notes
- Other metrics and statistics data will be stored in Pinot to enhance Pinpoint experience in near future.
- Currently this system metrics versions are in beta. It will be officially released when when we can make sure that everything works as we intended.
- If you have been using the system metric feature in version 2.5.0 or lower and are upgrading, please refer to [guide](https://github.com/pinpoint-apm/pinpoint/issues/9791#issuecomment-1491486262) for instructions.

------------------------------------------


# 1 system metrics 기능이란? <a id="system-metrics-ko"></a>
system metrics 기능은 v2.5.0에 핀포인트에 새로 추가되었다.
[telegraf agent](https://portal.influxdata.com/downloads/) 를 사용하여 system metric 데이터를 collector에 전달하고 pinot에 데이터를 저장한다.
pinpoint web에서 저장된 system metric 데이터를 확인할 수 있다.

![](<../.gitbook/assets/system_metric_01.png>)


pinot는 실시간 분산 OLAP 데이터 저장소이다. 자세한 사항은 [pinot 사이트](https://docs.pinot.apache.org)를 참고하도록 하자.


# 2 구조

![](<../.gitbook/assets/system_metric_02.jpeg>)

- ① telgegraf agent에서 system metric 데이터를 collector에 전달한다.
- ② collector는 kafka에 데이터를 전송하여 pinot에 데이터를 저장한다.
  - 참고로 pinot는 stream 데이터 전송을 위해서 kafka를 반드시 필요로 한다.
- ③ web은 pinot에서 데이터를 조회하여 화면으로 데이터를 보여준다.

# 3 설치/설정 방법

## 3.1 Pinot와 Kafka 준비

Pinot와 Kafka가 이미 설치되어 있다면 이 준비 단계는 건너뛰어도 된다. 아직 설치하지 않았다면 System Metric용 topic과 table을 생성하기 전에 [Pinot 설치 가이드](../getting-started/installation.md#pinot)를 참고하여 Pinot와 Kafka를 준비한다.

## 3.2 Kafka topic 생성

- 아래 3개 topic을 생성하자.
  -`system-metric-data-type`, `system-metric-tag`, `system-metric-double`


## 3.3 Pinot table 생성

- [테이블 생성 스키마 파일](https://github.com/pinpoint-apm/pinpoint/tree/master/metric-module/metric/src/main/pinot)에 테이블 정보가 있다.
- 테이블 생성 방법은 [pinot가이드](https://docs.pinot.apache.org/basics/components/table#streaming-table-creation)를 참고하여 pinot 실행 환경 맞게 테이블을 생성하면 된다.
- 생성하는 테이블은 총 3개이다.
  - systemMetricDataType : 수집되는 데이터의 type 정보를 저장하는 테이블이다.
  - systemMetricTag : 수집되는 데이터의 metadata(host 정보, 데이터의 tag 정보)를 저장하는 테이블이다.
  - systemMetricDouble : double 데이터를 저장하는 테이블이다. hybrid table 기능 사용을 위해서 REALTIME, OFFLINE 테이블 둘다 생성하자.
  
## 3.4 collector와 web 설정 및 실행

System Metric 데이터를 수집하려면 [collector starter](../getting-started/installation.md#collector-starter)를 `METRIC` 또는 `ALL` 타입으로 실행한다.
Pinot에 저장된 System Metric 데이터를 확인하려면 [web starter](../getting-started/installation.md#web-starter)를 실행한다.

System Metric 메뉴를 표시하려면 [pinpoint-web-metric.properties](https://github.com/pinpoint-apm/pinpoint/tree/master/metric-module/metric/src/main/resources/pinot-web/profiles)에 아래 설정값을 추가한다:

```
config.show.systemMetric=true
```

## 3.5 telegraf agent 설치 및 설정
telegraf agent를 통해 수집된 시스템 메트릭은 다음과 같다.
- cpu
- disk usage
- disk usage(percent)
- inode usage
- memory usage
- memory usage(percent)
- swap
- system load
- nginx
- apache

---

- 시스템 메트릭 데이터를 수집하는 telegraf agent를 설치하자.
  - [telegraf agent 설치 가이드](https://docs.influxdata.com/telegraf/v1.21/introduction/installation/)
- telegraf agent가 http 프로토콜로 collector에 데이터를 전달할 수 있도록 설정파일을 수정 해야한다.
  - telegraf.conf 설정 방법
    - http 프로토콜로 데이터를 전달수 있도록 output http plugin 아래 설정을 추가한다.
      - **참고**: Pinpoint v3.0.2부터 메트릭 포트가 `15200`에서 `9995`로 변경되었습니다.
      - ```
                [[outputs.http]]
                  url = "http://{PINPOINT_COLLECTOR_IP}:9995/telegraf"
                   
                   [outputs.http.headers]
                   hostGroupName = {applicationName}
                   Content-Type = "application/json"
        ```
    - `url`: {PINPOINT_COLLECTOR_IP} 자리에 데이터를 수집하는 collector의 주소를 설정한다.
    - `outputs.http.headers`은 서버 그룹의 key와 Content-Type을 설정한다.
      -  `hostGroupName`: {applicationName}에 설정한 값을 key로 pinpoint-web에서 데이터를 조회할 수 있다. 핀포인트를 이미 사용 중이라면 application을 추적할 때 agent 설정 값으로 사용했던 applicationName을 사용하는 것을 추천한다.

# 4 데이터 조회

- pinpoint-web에서 왼쪽 `Infrastructure` 메뉴를 선택하여 system metric 화면으로 이동한다.
- 상단의 select box에서 telegraf.conf 파일에 설정한 hostGroupName 값을 찾아서 선택한다.
- 아래와 같이 왼쪽에 호스트 목록이 나오고, 호스트를 선택해서 system metric 데이터를 확인할 수 있다.

![](<../.gitbook/assets/system_metric_03.png>)

# 5 기타
- pinot에는 system metric 뿐만아니라 pinpoint의 다양한 메트릭 데이터와 통계 데이터를 저장할 예정이다. 즉 pinot는 다양한 데이터를 저장하는 목적으로 사용될 것이다.
- system metric의 경우 당분간은 beta 기능으로 제공할것이고 안정적으로 기능이 운영되는 경험이 쌓이면 공식적으로 기능을 제공할 것이다.
- 2.5.0 이하 버전에서 system metric 기능을 사용하다가 버전을 업그레이드 하는 경우 [guide](https://github.com/pinpoint-apm/pinpoint/issues/9791#issuecomment-1491486262) 설명을 참고하자. 
