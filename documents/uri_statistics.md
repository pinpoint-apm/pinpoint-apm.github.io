[English](uri_statistics.md#uri_statistics) | [한글](uri_statistics.md#URI_통계)

# URI Statistics
URI statistics menu is newly added to Pinpoint in v2.5.0.
Pinpoint Agent aggregates URI templates and send them to Pinpoint collector via GRPC.
Pinpoint Collector saves the data to Pinot via Apache Kafka.
Pinpoint Web accesses Pinot to display the data.

![](<../.gitbook/assets/uri_statistics_01.png>)

## 1. Installation and Configuration
### 1.1 Install and Run Kafka
Kafka enables real-time streaming of URI statistics data from Pinpoint collector to Pinot.
If you have already [set up Kafka for Pinpoint System Metric](https://pinpoint-apm.gitbook.io/pinpoint/documents/system_metric#3.2.a-kafka-installation-guide), please skip this step.

- Please refer to [this document](https://kafka.apache.org/quickstart) to get Kafka and start the Kafka environment.

### 1.2 Create Kafka Topics for Pinpoint URI Statistics
Create a topic with the name `uri-stat`

```
$ bin/kafka-topics.sh --create --topic uri-stat --bootstrap-server ${YOUR_KAFKA_SERVER_ADDRESS}
```

### 1.3 Install and Run Pinot
This section describes how to install Pinot which is used in Pinpoint to save URI statistics data.
If you have already [set up Pinot for Pinpoint System Metric](https://pinpoint-apm.gitbook.io/pinpoint/documents/system_metric#3.1-install-pinot), please skip this step.

- Install Pinot according to [Pinot Getting Started guide](https://docs.pinot.apache.org/basics/getting-started).
- Above guide gives you the way to run Pinot locally, in Docker, and in Kubernetes.

### 1.4 Create Pinot Tables

- Pinot table schema for Pinpoint URI statistics is provided in [our github repository](https://github.com/pinpoint-apm/pinpoint/tree/master/metric-module/metric/src/main/pinot).
- Please refer to [Pinot documents](https://docs.pinot.apache.org/basics/components/table#streaming-table-creation) to create necessary tables in your Pinot cluster.
- Table `uriStat` should be created. Use `pinot-uriStat-schema.json` and `pinot-uriStat-table.json` to create the table.

### 1.5 Configure and Attach Pinpoint Agent
This section describes the URI stat configuration values added for URI statistics.

#### 1.5.1 Configuration values for URI Statistics
Below are default agent configuration values for URI statistics.

```
###########################################################
# URI Stat
###########################################################
profiler.uri.stat.enable=true
profiler.uri.stat.spring.webmvc.enable=true
profiler.uri.stat.spring.webmvc.useuserinput=false
profiler.uri.stat.spring.webflux.enable=true
profiler.uri.stat.spring.webflux.useuserinput=false
profiler.uri.stat.vertx.enable=true
profiler.uri.stat.vertx.useuserinput=false
```
- profiler.uri.stat.enable: whether Pinpoint Agent collects URI statistics or not.
  - `true`: collects URI statistics
  - `false`: doesn't collect URI statistics
- profiler.uri.stat.spring.webmvc.enable: whether Pinpoint Agent collects URI statistics from Spring Web MVC applications.
  - `true`: collects URI statistics from Spring Web MVC applications.
  - `false`: doesn't collect URI statistics from Spring Web MVC applications.
- profiler.uri.stat.spring.webmvc.useuserinput: whether Pinpoint Agent uses user-input request attribute values for URI templates when available.
  - `true`: uses user-input request attribute values.
  - `false`: ignores user-input request attribute values.
  
  Set attribute `pinpoint.metric.uri-template` to your Spring web request as shown below to override default URI template provided by Pinpoint. 
  
  ```
    @RequestMapping("/testUserInputRequestAttribute")
    public Map<String, Object> testUserInputAttribute(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", "test user input attribute");
        request.setAttribute("pinpoint.metric.uri-template", "/userInput");
        return map;
    }
  ```
- profiler.uri.stat.spring.webflux.enable: whether Pinpoint Agent collects URI statistics from Spring Webflux applications.
  - `true`: collects URI statistics from Spring Webflux applications.
  - `false`: doesn't collect URI statistics from Spring Webflux applications.
- profiler.uri.stat.spring.webflux.useuserinput: whether Pinpoint Agent uses user-input request attribute values for URI templates when available.
  - `true`: uses user-input request attribute values.
  - `false`: ignores user-input request attribute values.
  
  Set attribute `pinpoint.metric.uri-template` to your Spring web request as shown below to override default URI template provided by Pinpoint. 
  
  ```
    @GetMapping("/server/welcome/**")
    public Mono<String> welcome(ServerWebExchange exchange) {
        exchange.getAttributes().put("pinpoint.metric.uri-template", "/test");
        return Mono.just("Welcome Home");
    }
  ```
  
- profiler.uri.stat.vertx.enable: whether Pinpoint Agent collects URI statistics from Vert.x applications.
  - `true`: collects URI statistics from Vert.x applications.
  - `false`: doesn't collect URI statistics from Vert.x applications.
- profiler.uri.stat.vertx.useuserinput: whether Pinpoint Agent uses user-input routing context attribute values for URI templates when available.
  - `true`: uses user-input routing context attribute values.
  - `false`: ignores user-input routing context attribute values.
    
  Set attribute `pinpoint.metric.uri-template` to your Vert.x routing context as shown below to override default URI template provided by Pinpoint. 
  
  ```
    router.get("/routinContextAttributeAdded").handler(routingContext -> {
        routingContext.put("pinpoint.metric.uri-template", "/test");
        routingContext.response().end("pinpoint.metric.uri-tempate = /test");
    });
  ```

To change the configuration values described above, update `pinpoint.config` under [each profile directory](https://github.com/pinpoint-apm/pinpoint/tree/master/agent/src/main/resources/profiles) and rebuild the project.
Or, you can simply pass these properties when starting your application with Pinpoint Agent (e.g. `-Dprofiler.uri.stat.enable=false`).

### 1.6 Configure and Run Pinpoint Collector & Web with URI Statistics
Instead of the default Pinpoint Collector and Web binaries, you should use those compiled under metric-module. 

Please check [here](https://pinpoint-apm.gitbook.io/pinpoint/documents/system_metric#3.4-configure-and-run-pinpoint-collector-with-system-metrics) for Pinpoint Metric Collector properties.

- Enable URI statistics by adding the below line at [pinpoint-collector.properties](https://github.com/pinpoint-apm/pinpoint/tree/master/metric-module/collector-starter/src/main/resources/profiles):

	```
	collector.stat.uri=true
	```
- `pinpoint.collector.type=METRIC` argument should be used to collect URI statistics in collector.

Please check [here](https://pinpoint-apm.gitbook.io/pinpoint/documents/system_metric#3.5-configure-and-run-pinpoint-web-with-system-metrics) for Pinpoint Metric Web properties. 

- Enable URI statistics by adding the below line at [pinpoint-web-metric.properties](https://github.com/pinpoint-apm/pinpoint/tree/master/metric-module/metric/src/main/resources/pinot-web/profiles):

	```
	config.show.urlStat=true
	```
	
## 2. View Collected URI Statistics Data
![](<../.gitbook/assets/uri_statistics_02.png>)
1. Click `URL Statistic` on the side bar menu in Pinpoint web.
2. Search for the application name you used to configure Pinpoint Agent.
3. Top 50 URIs used in your application will be displayed below the empty chart.
4. Click each URI to load the chart.


# URI 통계
URI 통계 기능은 핀포인트 v2.5.0에 신규로 추가되었다.
핀포인트 에이전트에서 URI 템플릿 정보를 수집하여 GRPC를 사용해 핀포인트 콜렉터에 전달하고, 핀포인트 콜렉터는 아파치 카프카를 통해 아파치 피노에 값을 저장한다.
핀포인트 웹에서 저장된 URI 통계 데이터를 확인할 수 있다.

![](<../.gitbook/assets/uri_statistics_01.png>)

## 1. 설치 및 설정 방법
### 1.1 카프카 설치 및 실행
실시간으로 핀포인트 콜렉터에서 데이터를 전달받아 피노에 저장하기 위해서 카프카를 설치해야 한다.
이미 [시스템 메트릭 설정을 하면서 카프카를 설치](https://pinpoint-apm.gitbook.io/pinpoint/documents/system_metric#3.2-kafka)하였다면, 이 부분은 건너뛰십시오.

- [설치 방법 가이드](https://kafka.apache.org/quickstart)를 참고하여 kafka를 설치한다.

### 1.2 카프카 토픽 생성
아래와 같이 `uri-stat` 토픽을 생성한다.

```
$ bin/kafka-topics.sh --create --topic uri-stat --bootstrap-server ${YOUR_KAFKA_SERVER_ADDRESS}
```

### 1.3 피노 설치 및 실행
URI 통계 값을 저장하는 피노를 설치하는 법을 안내한다.
이미 [시스템 메트릭 설정을 하면서 피노를 설치](https://pinpoint-apm.gitbook.io/pinpoint/documents/system_metric#3.1.a.-pinot)하였다면, 이 부분은 건너뛰십시오.

- [피노 설치 가이드](https://docs.pinot.apache.org/basics/getting-started)를 참고하여 피노를 설치한다.
- 다양한 환경 (local, docker, kubernetes)에서 피노 실행 환경을 구성할 수 있으니 위 가이드를 참고하자.

### 1.4 피노 테이블 스키마 및 테이블 생성

- [핀포인트 깃헙 저장소](https://github.com/pinpoint-apm/pinpoint/tree/master/metric-module/metric/src/main/pinot)에 URI 통계를 위한 피노 테이블 스키마와 테이블 정보가 있다.
- 위 경로에서 `pinot-uriStat-schema.json` 와 `pinot-uriStat-table.json`를 참고하여 `uriStat` 테이블을 생성한다.
- 피노에 필요한 테이블을 구성하는 방법은 [피노 공식 문서](https://docs.pinot.apache.org/basics/components/table#streaming-table-creation)를 참고하자.

### 1.5 핀포인트 에이전트 설정
URI 통계 수집을 위해 핀포인트 에이전트에 설정해야 하는 값들을 안내한다.

#### 1.5.1 URI 통계 수집을 위한 설정 값
URI 통계 수집과 관련된 핀포인트 에이전트의 설정 기본값들은 아래와 같다.

```
###########################################################
# URI Stat
###########################################################
profiler.uri.stat.enable=true
profiler.uri.stat.spring.webmvc.enable=true
profiler.uri.stat.spring.webmvc.useuserinput=false
profiler.uri.stat.spring.webflux.enable=true
profiler.uri.stat.spring.webflux.useuserinput=false
profiler.uri.stat.vertx.enable=true
profiler.uri.stat.vertx.useuserinput=false
```
- profiler.uri.stat.enable: 핀포인트 에이전트가 URI 통계를 수집하는지 여부.
  - `true`: URI 통계를 수집한다.
  - `false`: URI 통계를 수집하지 않는다.
- profiler.uri.stat.spring.webmvc.enable: 핀포인트 에이전트가 스프링 웹 MVC 어플리케이션에서 URI 통계를 수집하는지 여부.
  - `true`: 스프링 웹 MVC 어플리케이션에서 URI 통계를 수집힌다.
  - `false`: 스프링 웹 MVC 어플리케이션에서 URI 통계를 수집하지 않는다.
- profiler.uri.stat.spring.webmvc.useuserinput: 핀포인트 에이전트가 스프링 웹 어플리케이션에서 사용자 정의 URI 템플릿을 우선적으로 사용하는지 여부.
  - `true`: 스프링 웹 어플리케이션에서 사용자 정의 URI 템플릿을 우선적으로 사용한다.
  - `false`: 스프링 웹 어플리케이션에서 사용자 정의 URI 템플릿을 확인하지 않고 핀포인트가 수집한 템플릿만 사용한다.
  
  핀포인트에서 수집하는 URI 템플릿을 사용하지 않고 사용자 정의 URI 템플릿을 사용하고 싶다면, 아래 예제와 같이 스프링 웹 리퀘스트 객체 attribute에 `pinpoint.metric.uri-template`를 key 값으로 하는 속성 값을 설정해야 한다. 
  
  ```
    @RequestMapping("/testUserInputRequestAttribute")
    public Map<String, Object> testUserInputAttribute(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", "test user input attribute");
        request.setAttribute("pinpoint.metric.uri-template", "/userInput");
        return map;
    }
  ```
- profiler.uri.stat.spring.webflux.enable: 핀포인트 에이전트가 스프링 웹플럭스 어플리케이션에서 URI 통계를 수집하는지 여부.
  - `true`: 스프링 웹플럭스 어플리케이션에서 URI 통계를 수집힌다.
  - `false`: 스프링 웹플럭스 어플리케이션에서 URI 통계를 수집하지 않는다.
- profiler.uri.stat.spring.webflux.useuserinput: 핀포인트 에이전트가 스프링 웹플럭스 어플리케이션에서 사용자 정의 URI 템플릿을 우선적으로 사용하는지 여부.
  - `true`: 스프링 웹플럭스 어플리케이션에서 사용자 정의 URI 템플릿을 우선적으로 사용한다.
  - `false`: 스프링 웹플럭스 어플리케이션에서 사용자 정의 URI 템플릿을 확인하지 않고 핀포인트가 수집한 템플릿만 사용한다.
  
  핀포인트에서 수집하는 URI 템플릿을 사용하지 않고 사용자 정의 URI 템플릿을 사용하고 싶다면, 아래 예제와 같이 스프링 웹 리퀘스트 객체 attribute에 `pinpoint.metric.uri-template`를 key 값으로 하는 속성 값을 설정해야 한다. 
  
  ```
    @GetMapping("/server/welcome/**")
    public Mono<String> welcome(ServerWebExchange exchange) {
        exchange.getAttributes().put("pinpoint.metric.uri-template", "/test");
        return Mono.just("Welcome Home");
    }
  ```
  
- profiler.uri.stat.vertx.enable: 핀포인트 에이전트가 Vert.x 어플리케이션에서 URI 통계를 수집하는지 여부.
  - `true`: Vert.x 어플리케이션에서 URI 통계를 수집힌다..
  - `false`: Vert.x 어플리케이션에서 URI 통계를 수집하지 않는다.
- profiler.uri.stat.vertx.useuserinput: 핀포인트 에이전트가 Vert.x 어플리케이션에서 사용자 정의 URI 템플릿을 우선적으로 사용하는지 여부.
  - `true`: Vert.x 어플리케이션에서 사용자 정의 URI 템플릿을 우선적으로 사용한다.
  - `false`: Vert.x 어플리케이션에서 사용자 정의 URI 템플릿을 확인하지 않고 핀포인트가 수집한 템플릿만 사용한다.
    
  핀포인트에서 수집하는 URI 템플릿을 사용하지 않고 사용자 정의 URI 템플릿을 사용하고 싶다면, 아래 예제와 같이 Vert.x RoutingContext 객체에  `pinpoint.metric.uri-template` 를 key 값으로 하는 속성 값을 설정해야 한다.
    
  ```
    router.get("/routinContextAttributeAdded").handler(routingContext -> {
        routingContext.put("pinpoint.metric.uri-template", "/test");
        routingContext.response().end("pinpoint.metric.uri-tempate = /test");
    });
  ```

위 설정 값들을 변경하려면 원하는 [핀포인트 프로파일 경로](https://github.com/pinpoint-apm/pinpoint/tree/master/agent/src/main/resources/profiles)의 `pinpoint.config` 파일에서 값을 변경하여 핀포인트를 재빌드한다. 파일을 수정하지 않고, 핀포인트 에이전트를 붙힐 어플리케이션을 실행할 때 `-Dprofiler.uri.stat.enable=false`와 같이 값을 넣어도 된다.

### 1.6 핀포인트 콜렉터와 핀포인트 웹 설정 및 실행
URI 통계를 수집하고 값을 확인하려면, 핀포인트 v2.5.0 이전 버전에서 사용하던 콜렉터와 웹 JAR 파일이 아니라 metric-module 밑에 생성되는 파일을 사용해야 한다.

[핀포인트 메트릭 콜렉터를 설명한 문서](https://pinpoint-apm.gitbook.io/pinpoint/documents/system_metric#3.4-collector)에 자세한 설명이 있으니 참고해서 메트릭 콜렉터 설정값을 세팅하자. 

- 위 설정 외에 URI 통계를 위해 [pinpoint.collector.properties](https://github.com/pinpoint-apm/pinpoint/tree/master/metric-module/collector-starter/src/main/resources/profiles)에 아래 설정값이 추가되었다:

	```
	collector.stat.uri=true
	```
- URI 통계를 수집하기 위해서는 콜렉터를 시작할 때 `pinpoint.collector.type=METRIC` argument를 넣어야 한다.

[핀포인트 메트릭 웹을 설명한 문서](https://github.com/pinpoint-apm/pinpoint/tree/master/metric-module/collector-starter/src/main/resources/profiles)에 자세한 설명이 있으니 참고해서 메트릭 웹 설정값을 세팅하자.

- 위 설정 외에 URI 통계를 위해 [pinpoint-web-metric.properties](https://github.com/pinpoint-apm/pinpoint/tree/master/metric-module/metric/src/main/resources/pinot-web/profiles)에 아래 설정값이 추가되었다:

	```
	config.show.urlStat=true
	```
	

## 2. URI 통계 데이터 조회
![](<../.gitbook/assets/uri_statistics_02.png>)
1. 핀포인트 메트릭 웹을 실행하여 왼쪽 `URL Statistic` 메뉴를 선택한다.
2. 상단의 seslect box에서 핀포인트 에이전트에 설정한 어플리케이션 이름을 조회한다..
3. 초기 화면에서는 선택한 어플리케이션에서 가장 많이 사용한 상위 50개 URI가 빈 차트 밑에 표시된다.
4. 원하는 URI를 클릭하면 차트에 데이터가 표시된다.

