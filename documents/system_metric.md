# ※ Document is being written. The function has not been opened yet!


[English](system_metric.md#system_metrics) | [한글](alarm.md#1_system_metrics_기능이란?)


# 1 System Metrics
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
## 3.1 Install Pinot
This section describes how to install Pinot which is used in Pinpoint to save system metrics data.
### 3.1.A Install and Run Pinot
- Install Pinot according to [Pinot Getting Started guide](https://docs.pinot.apache.org/basics/getting-started)
- Above guide gives you the way to run Pinot locally, in Docker, and in Kubernetes.

### 3.1.B Create Pinot Tables
- Pinot table schema for Pinpoint system metrics is provided in [our github repository](https://github.com/pinpoint-apm/pinpoint/tree/master/metric-module/metric/src/main/pinot).
- Please refer to [Pinot documents](https://docs.pinot.apache.org/basics/components/table#streaming-table-creation) to create necessary tables in your Pinot cluster.
- Total 4 tables should be created.
  - systemMetricDataType: this table saves type informations on collected data.
  - systemMetricTag: this table saves metadata (i.e., host, tags) for collected data.
  - systemMetricDouble: this table saves metric data in double.
  - systemMetricLong: this table saves metric data in long.

## 3.2 Install Kafka
Kafka enables real-time streaming of system metrics data from Pinpoint collector to Pinot.
### 3.2.A Kafka Installation Guide
Please refer to [this document](https://kafka.apache.org/quickstart) to get Kafka and start the Kafka environment.
### 3.2.B Create Kafka Topics for Pinpoint System Metrics
Create 4 topics with the names below:

- `system-metric-data-type`
- `system-metric-tag`
- `system-metric-double`
- `system-metric-long`

## 3.3 Install and Configure Talegraf Agent
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


--


- Install Telegraf according to this [installation guide](https://docs.influxdata.com/telegraf/v1.21/introduction/installation/).
- Add below configuration to `telegraf.conf` file to send collected metrics to Pinpoint collector via http.

  ```
              [[outputs.http]]
                url = "http://{PINPOINT_COLLECTOR_IP}:8081/telegraf"
                 
                 [outputs.http.headers]
                 hostGroupName = {applicationName}
                 Content-Type = "application/json"  
  ```
  - `url`: substitute `{PINPOINT_COLLECTOR_IP}` to your Pinpoint collector address so that telegraf can send collected metrics to Pinpoint collector
  - `hostGroupName`: this value will be used as the key in Pinpoint web when querying the metrics details. It is recommended to use your applicationName already used in Pinpoint.

## 3.4 Configure and Run Pinpoint Collector with System Metrics
There are additional configurations for Pinpoint collector to collect the metrics data from Telegraf agents.

### 3.4.A Pinpoint Collector Settings for System Metrics
Modify the files under [this directory](https://github.com/pinpoint-apm/pinpoint/tree/master/metric-module/metric/src/main/resources/pinot-collector/profiles) as of your environment.

- kafka-producer-factory.properties: Update the Kafka address.

  ```
  pinpoint.metric.kafka.bootstrap.servers=--KAFKA_ADDRESS--
  ```
- jdbc.properties: Update pinot address to the one you have set up in [3.1](#3.1-Install-Pinot)

  ```
  pinpoint.pinot.jdbc.url=jdbc:pinot://localhost:9000
  pinpoint.pinot.jdbc.username=userId
  pinpoint.pinot.jdbc.password=password
  ```

### 3.4.B Run Pinpoint Collector with System Metrics
After successfully building Pinpoint project, run `pinpoint-collector-starter-boot-XXXX.jar` file created under `pinpoint/metric-module/collector-starter/target/deploy`.

## 3.5 Configure and Run Pinpoint Web with System Metrics
There are additional configurations for Pinpoint web to display the system metrics data stored in Pinot.

### 3.5.A Pinpoint Web Settings for System Metrics
Modify the files under [this directory](https://github.com/pinpoint-apm/pinpoint/tree/master/metric-module/metric/src/main/resources/pinot-web/profiles) as of your environment.

- jdbc-pinot.properties: Update the information of the Pinot cluster you have set up in [3.1](#3.1-Install-Pinot)

  ```
  pinpoint.pinot.jdbc.driverClassName=org.apache.pinot.client.PinotDriver
  pinpoint.pinot.jdbc.url=jdbc:pinot://localhost:9000
  pinpoint.pinot.jdbc.username=userId
  pinpoint.pinot.jdbc.password=password
  ```
- pinpoint-web-metric.properties: Enable system metrics by adding the line below:

  ```
  config.show.systemMetric=true
  ```

### 3.5.B Run Pinpoint Web with System Metrics
After successfully building Pinpoint project, run `pinpoint-web-starter-boot-XXXX.jar` file created under `pinpoint/metric-module/web-starter/target/deploy`.

### 3.6 Additional Information
Pinpoint web and collector binaries with system metrics is located under different directories from those of the original Pinpoint web and collector.

- original collector: pinpoint/collector/deploy -> collector with system metrics: pinpoint/metric-module/collector-starter/target/deploy
- original web: pinpoint/web/deploy -> web with system metrics: pinpoint/metric-module/web-starter/target/deploy

## 4 View Collected System Metrics Data
1. Click `Infrastructure` on the side bar menu in Pinpoint web.
2. Search for the hostGroupName you have configured for Telegraf agents as decribed [in 3.4](#3.4-Install-and-Configure-Talegraf-Agent).
3. A list of hosts will be displayed on the left, and you can view the system metrics data by clicking each of them.
   ![](<../.gitbook/assets/system_metric_03.png>)

## 5 Notes
- Other metrics and statistics data will be stored in Pinot to enhance Pinpoint experience in near future.
- Currently this system metrics versions are in beta. It will be officially released when when we can make sure that everything works as we intended.


------------------------------------------


# 1 system metrics 기능이란?
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

## 3.1 pinot 설치 및 실행

시스템 메트릭 데이터를 저장하는 pinot를 설치하는 법을 안내한다.

### 3.1.A. pinot 설치 및 실행

- pinot 사이트에서 [설치 방법 가이드](https://docs.pinot.apache.org/basics/getting-started)를 참고하여 pinot를 설치한다.
- 다양한 환경(local, docker, Kubernetes)에서 pinot 실행 환경을 구성할 수 있으니 위 가이드를 참고하자.

### 3.1.B. 테이블 스키마 및 생성

- [테이블 생성 스키마 파일](https://github.com/pinpoint-apm/pinpoint/tree/master/metric-module/metric/src/main/pinot)에 테이블 정보가 있다.
- 테이블 생성 방법은 [pinot가이드](https://docs.pinot.apache.org/basics/components/table#streaming-table-creation)를 참고하여 pinot 실행 환경 맞게 테이블을 생성하면 된다.
- 생성하는 테이블은 총 4개이다.
  - systemMetricDataType : 수집되는 데이터의 type 정보를 저장하는 테이블이다.
  - systemMetricTag : 수집되는 데이터의 metadata(host 정보, 데이터의 tag 정보)를 저장하는 테이블이다.
  - systemMetricDouble : double 데이터를 저장하는 테이블이다.
  - systemMetricLong : long 데이터를 저장하는 테이블이다.

## 3.2 kafka 설치 및 실행

실시간으로 collector에서 데이터를 전달받아 pinot에 저장하기 위해서 kafka를 설치해야 한다.

### 3.2.A. kafka 설치

- [설치 가이드 링크](https://kafka.apache.org/quickstart)를 보고 kafka를 다운 받아 실행하자.

### 3.2.B. topic 생성

- 아래 4개 topic을 생성하자.
  -`system-metric-data-type`, `system-metric-tag`, `system-metric-double`, `system-metric-long`

## 3.3 telegraf agent 설치 및 설정
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
    - ```
                [[outputs.http]]
                  url = "http://{PINPOINT_COLLECTOR_IP}:8081/telegraf"
                   
                   [outputs.http.headers]
                   hostGroupName = {applicationName}
                   Content-Type = "application/json"
                ```

    - `url`: {PINPOINT_COLLECTOR_IP} 자리에 데이터를 수집하는 collector의 주소를 설정한다.
    - `outputs.http.headers`은 서버 그룹의 key와 Content-Type을 설정한다.
      -  `hostGroupName`: {applicationName}에 설정한 값을 key로 pinpoint-web에서 데이터를 조회할 수 있다. 핀포인트를 이미 사용 중이라면 application을 추적할 때 agent 설정 값으로 사용했던 applicationName을 사용하는 것을 추천한다.

## 3.4 collector 설정 및 실행

telegraf agent로 부터 전송된 데이터를 수집하기 위해서 collector에 설정을 추가한다.

### 3.4.A. collector 설정

- collector의 [설정파일](https://github.com/pinpoint-apm/pinpoint/tree/master/metric-module/metric/src/main/resources/pinot-collector/profiles)들을 profile에 맞게 수정해야 한다.
- kafka-producer-factory.properties 설정 : kafka 의 주소를 설정한다.
  - ```
            pinpoint.metric.kafka.bootstrap.servers=--KAFKA_ADDRESS--
         ```
- jdbc.properties 설정 : [3.1](#3.1-pinot-설치-및-실행)에서 설치한 pinot의 주소를 설정한다.
  - ```
        pinpoint.pinot.jdbc.url=jdbc:pinot://localhost:9000
        pinpoint.pinot.jdbc.username=userId
        pinpoint.pinot.jdbc.password=password
        ```

### 3.4.B. collector 실행 방법

빌드 후 pinpoint/metric-module/collector-starter/target/deploy에 생성된 `pinpoint-collector-starter-boot-XXXX.jar`을 실행하면 된다.

## 3.5 web 설정 및 실행

pinot에 저장된 시스템 메트릭 데이터를 보여주기 위해서 web 설정을 수정한다.

### 3.5.A. web 설정

- web의 [설정파일](https://github.com/pinpoint-apm/pinpoint/tree/master/metric-module/metric/src/main/resources/pinot-web/profiles)들을 profile에 맞게 설정을 수정해야 한다.
- jdbc-pinot.properties 설정 : [3.1](#3.1-pinot-설치-및-실행)에서 설치한 pinot의 주소를 설정한다.
  - ```
        pinpoint.pinot.jdbc.url=jdbc:pinot://localhost:9000
        pinpoint.pinot.jdbc.username=userId
        pinpoint.pinot.jdbc.password=password
        ```
- pinpoint-web-metric.properties 설정 : system metric 기능을 web에서 활성화한다.
  - ```
        config.show.systemMetric=true
        ```

### 3.5.B. web 실행 방법

빌드 후 pinpoint/metric-module/web-starter/target/deploy에 생성된 `pinpoint-web-starter-boot-XXXX.jar`을 실행하면 된다.

## 3.6 참고

- 참고로 web, collector의 실행파일이 과거 버전과 다르게 다른곳에 존재한다.
- 기존의 web, collector 실행파일 경로와 다르게 system metric기능이 포함된 collector, web은 실행 파일 경로는 다음과 같다.
  - collector : pinpoint/collector/deploy -> pinpoint/metric-module/collector-starter/target/deploy
  - web :  pinpoint/web/deploy -> pinpoint/metric-module/web-starter/target/deploy

# 4 데이터 조회

- pinpoint-web에서 왼쪽 `Infrastructure` 메뉴를 선택하여 system metric 화면으로 이동한다.
- 상단의 select box에서 telegraf.conf 파일에 설정한 hostGroupName 값을 찾아서 선택한다.
- 아래와 같이 왼쪽에 호스트 목록이 나오고, 호스트를 선택해서 system metric 데이터를 확인할 수 있다.

![](<../.gitbook/assets/system_metric_03.png>)

# 5 기타
- pinot에는 system metric 뿐만아니라 pinpoint의 다양한 메트릭 데이터와 통계 데이터를 저장할 예정이다. 즉 pinot는 다양한 데이터를 저장하는 목적으로 사용될 것이다.
- system metric의 경우 당분간은 beta 기능으로 제공할것이고 안정적으로 기능이 운영되는 경험이 쌓이면 공식적으로 기능을 제공할 것이다.




