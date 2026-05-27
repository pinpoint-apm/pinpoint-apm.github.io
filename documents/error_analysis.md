[English](error_analysis.md#error-analysis) | [한국어](error_analysis.md#error-analysis-ko)

# Error Analysis <a id="error-analysis"></a>

![](<../.gitbook/assets/error_analysis_01.png>)

Error Analysis is a new feature introduced in Pinpoint v3.0.0.

The Pinpoint agent collects more detailed exception information and transmits it to the Pinpoint collector via gRPC. The Pinpoint collector then stores this data in Apache Pinot through Apache Kafka. You can view the stored Error Analysis data in the Pinpoint web interface.

# 1. Installation and Configuration Guide

## 1.1. Pinot and Kafka Setup

If Pinot and Kafka are already installed, you can skip this setup step. Otherwise, set them up by following the [Pinot installation guide](../getting-started/installation.md#pinot) before creating Error Analysis topics and tables.

## 1.2. Create Kafka Topics

You need to create a topic named `exception-trace`.
Use the following command to create the `exception-trace` topic:
```shell
$ bin/kafka-topics.sh --create --topic exception-trace --bootstrap-server ${YOUR_KAFKA_SERVER_ADDRESS}
```

## 1.3. Create Pinot Tables

Pinpoint Error Analysis requires [CLP (Compressed Log Processor)](https://docs.pinot.apache.org/basics/data-import/clp), supported from Pinot version 1.0.0, to appropriately process and group error messages. Please ensure you are using the correct version.

Due to the binary issue with `clp-ffi-java`, we recommend using an amd64-based / x86-based machine when installing Pinot version 1.0.0. [Related Issue](https://github.com/pinpoint-apm/pinpoint/issues/11170)

Create the following table in Pinot:
- `exceptionTrace`

Refer to the [table schema file](https://github.com/pinpoint-apm/pinpoint/tree/master/exceptiontrace/exceptiontrace-common/src/main/pinot) for details on creating the table.

## 1.4. Pinpoint Agent Configuration

This section covers the settings related to Error Analysis data collection. The default settings for the release profile are as follows:

```config
###########################################################
# Exception Trace
###########################################################
profiler.exceptiontrace.enable=true
# Permits per second
profiler.exceptiontrace.new.throughput=1000
profiler.exceptiontrace.errormessage.max=2048
# Permits depth of exception. if max depth is 0, it is unlimited.
profiler.exceptiontrace.max.depth=5
profiler.exceptiontrace.io.buffering.buffersize=20
```

- `profiler.exceptiontrace.enable`
  - `true`: Collects exceptions that occur. **Default**
  - `false`: Does not collect exceptions that occur.
- `profiler.exceptiontrace.new.throughput`
  - **Default**: `1000`
  - Determines how many exceptions per second to collect from the agent.
- `profiler.exceptiontrace.errormessage.max`
  - **Default**: `2048`
  - Determines the maximum length of the error message for exceptions collected by the agent.
- `profiler.exceptiontrace.max.depth`
  - **Default**: `5`
  - Determines the depth to traverse the exception chain.
  - If the value is 0, it will traverse until `Throwable.getCause()` returns null.
- `profiler.exceptiontrace.io.buffering.buffersize`
  - **Default**: `20`
  - Determines the number of exceptions to buffer.
  - This buffer is approximately the size of the buffer generated per Span.

## 1.5. Pinpoint Collector and Web Configuration and Execution

### 1.5.1. Collector Configuration and Execution

Configure and run the [collector starter](../getting-started/installation.md#collector-starter) with `BASIC` or `ALL` type before enabling exception storage.

Ensure that `pinpoint.modules.collector.exceptiontrace.enabled=true` is set to enable exception storage. **Default**: `true`

### 1.5.2. Web Configuration and Execution

Configure and run the [web starter](../getting-started/installation.md#web-starter) before reading exception data.

Additionally, ensure that `pinpoint.modules.web.exceptiontrace.enabled=true` is set to enable reading exception data. **Default**: `true`

For Error Analysis, the following setting is added to `pinpoint-web-metric.properties` to control whether the Error Analysis item is displayed in the side menu. **Default**: `true`
```config
config.show.exceptionTrace=true
```

---

# Error Analysis <a id="error-analysis-ko"></a>

Error Analysis 는 핀포인트 v3.0.0 에 신규로 추가되었다.
핀포인트 에이전트에서 보다 상세한 Exception 정보를 수집하여 gRPC 를 통해 핀포인트 콜렉터로 전달한다.
핀포인트 콜렉터는 이를 아파치 카프카를 통해 아파치 피노에 값을 저장한다.
핀포인트 웹에서 저장된 Error Analysis 를 확인할 수 있다.

# 1. 설치 및 설정 방법

## 1.1. Pinot와 Kafka 준비
Pinot와 Kafka가 이미 설치되어 있다면 이 준비 단계는 건너뛰어도 됩니다. 아직 설치하지 않았다면 Error Analysis용 topic과 table을 생성하기 전에 [Pinot 설치 가이드](../getting-started/installation.md#pinot)를 참고하여 Pinot와 Kafka를 준비합니다.

## 1.2. Kafka topic 생성
`exception-trace` 라는 이름의 topic 을 생성해야 한다.
아래와 같이 `exception-trace` 토픽을 생성한다.
```shell
$ bin/kafka-topics.sh --create --topic exception-trace --bootstrap-server ${YOUR_KAFKA_SERVER_ADDRESS}
```

## 1.3. Pinot table 생성
핀포인트는 Error Message 를 적절히 처리하고 그룹화하기 위해 Pinot 1.0.0 부터 지원하는 [CLP (Compressed Log Processor)](https://docs.pinot.apache.org/basics/data-import/clp) 가 필요하다. 버전에 주의할 것.

피노 Pinot 에 다음 테이블을 새로 생성한다.
- `exceptionTrace`
[테이블 생성 스키마 파일](https://github.com/pinpoint-apm/pinpoint/tree/master/exceptiontrace/exceptiontrace-common/src/main/pinot)의 테이블 정보를 참고하여 생성한다.

## 1.4 핀포인트 에이전트 설정

Error Analysis 데이터 수집과 관련된 설정이다.
release 프로필의 기본 설정은 다음과 같다.

```config
###########################################################
# Exception Trace
###########################################################
profiler.exceptiontrace.enable=true
# Permits per second
profiler.exceptiontrace.new.throughput=1000
profiler.exceptiontrace.errormessage.max=2048
# Permits depth of exception. if max depth is 0, it is unlimited.
profiler.exceptiontrace.max.depth=5
profiler.exceptiontrace.io.buffering.buffersize=20
```
- `profiler.exceptiontrace.enable`
	- `true`: 발생하는 exception 을 수집한다. **기본값**
	- `false` : 발생하는 exception 을 수집하지 않는다.
- `profiler.exceptiontrace.new.throughput`
	- **기본값** 1000
	- 해당 에이전트에서 초당 몇개까지의 exception 을 수집할지 결정한다. 
- `profiler.exceptiontrace.errormessage.max`
	- **기본값** 2048
	- 해당 에이전트에서 발생하는 exception 의 error message 를 몇자까지 수집할지 결정한다.
- `profiler.exceptiontrace.max.depth`
	- **기본값** 5
	- exception chain 이 주어졌을 때, 깊이를 어느정도 순회할지 결정한다.
	- 값이 0이면 Throwable.getCause() 가 null 일 때까지 순회한다.
- `profiler.exceptiontrace.io.buffering.buffersize`
	- **기본값** 20
	- buffer 에 exception 을 몇개까지 쌓아둘지 결정한다.
	- 해당 buffer 는 대략 Span 단위로 생성되는 buffer 이다.


## 1.5 핀포인트 콜렉터와 핀포인트 웹 설정 및 실행

### 1.5.1. collector 설정 및 실행
exception 저장을 활성화하려면 [collector starter](../getting-started/installation.md#collector-starter)를 `BASIC` 또는 `ALL` 타입으로 실행한다.

이에 추가적으로
`pinpoint.modules.collector.exceptiontrace.enabled=true`
로 되어있어야 exception 을 저장한다. **기본값** `true`

### 1.5.2 web 설정 및 실행
exception 데이터를 읽으려면 [web starter](../getting-started/installation.md#web-starter)를 실행한다.

이에 추가적으로
`pinpoint.modules.web.exceptiontrace.enabled=true`
로 되어있어야 exception 데이터를 읽어온다. **기본값** `true`

위 설정 외에 Error Analysis 를 위해 pinpoint-web-metric.properties에 아래 설정값이 추가되었다:
이 설정은 좌측 사이드 메뉴에서 Error Analysis 항목을 노출시킬지 결정한다.
**기본값**`true`
- ```
	config.show.exceptionTrace=true
	```
