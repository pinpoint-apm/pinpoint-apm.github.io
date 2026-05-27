[English](uri_statistics.md#uri-statistics) | [한국어](uri_statistics.md#uri-statistics-ko)

# URI Statistics <a id="uri-statistics"></a>
URI statistics menu is newly added to Pinpoint in v2.5.0.
Pinpoint Agent aggregates URI templates and send them to Pinpoint collector via GRPC.
Pinpoint Collector saves the data to Pinot via Apache Kafka.
Pinpoint Web accesses Pinot to display the data.

![](<../.gitbook/assets/uri_statistics_01.png>)

## 1. Installation and Configuration
### 1.1 Pinot and Kafka Setup
If Pinot and Kafka are already installed, you can skip this setup step. Otherwise, set them up by following the [Pinot installation guide](../getting-started/installation.md#2-pinot) before creating URI Statistics topics and tables.

### 1.2 Create Kafka Topics for Pinpoint URI Statistics
Create a topic with the name `url-stat`

```
$ bin/kafka-topics.sh --create --topic url-stat --bootstrap-server ${YOUR_KAFKA_SERVER_ADDRESS}
```

### 1.3 Create Pinot Tables

- Pinot table schema for Pinpoint URI statistics is provided in [our github repository](https://github.com/pinpoint-apm/pinpoint/tree/master/uristat/uristat-common/src/main/pinot).
- Please refer to [Pinot documents](https://docs.pinot.apache.org/basics/components/table#streaming-table-creation) to create necessary tables in your Pinot cluster.
- Let's create the uriStat table by referencing the schema file and table settings from the provided path. To enable hybrid table functionality, let's create both REALTIME and OFFLINE tables for the 'uriStat' table.

### 1.4 Configure and Attach Pinpoint Agent
This section describes the URI stat configuration values added for URI statistics.

#### 1.4.1 Configuration values for URI Statistics
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
profiler.uri.stat.tomcat.useuserinput=false
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

- profiler.uri.stat.tomcat.useuserinput: (Added in v2.5.3) whether Pinpoint Agent uses user-input attribute values from Tomcat for URI templates when available.
  - `true`: collects URI statics from Tomcat user-input attribute values.
  - `false`: doesn't check Tomcat request attributes for URI statistics.
  
  This is provided to collect URI statistics information in Tomcat applications without supported frameworks(Spring WebMVC, Spring Webflux, VertX).
  If you are using supported frameworks, it is recommended to use framework-specific options and disable this option.
  Since there is no default URI template provided by tomcat, users need to set attribute `pinpoint.metric.uri-template` to your Tomcat request to start collecting URI statistics information.

To change the configuration values described above, update `pinpoint.config` under [each profile directory](https://github.com/pinpoint-apm/pinpoint/tree/master/agent/src/main/resources/profiles) and rebuild the project.
Or, you can simply pass these properties when starting your application with Pinpoint Agent (e.g. `-Dprofiler.uri.stat.enable=false`).

### 1.5 Configure and Run Pinpoint Collector & Web with URI Statistics
Configure and run the [collector starter](../getting-started/installation.md#collector-starter) with `BASIC` or `ALL` type.
Configure and run the [web starter](../getting-started/installation.md#web-starter) to display URI Statistics data.

- Enable URI statistics collection by adding the below line at [pinpoint-collector.properties](https://github.com/pinpoint-apm/pinpoint/tree/master/metric-module/collector-starter/src/main/resources/profiles):

	```
	collector.stat.uri=true
	```

- Show the URI Statistics menu by adding the below line at [pinpoint-web-uristat.properties](https://github.com/pinpoint-apm/pinpoint/tree/master/uristat/uristat-web/src/main/resources/profiles):

	```
	config.show.urlStat=true
	```
	
## 2. View Collected URI Statistics Data
![](<../.gitbook/assets/uri_statistics_02.png>)
1. Click `URL Statistic` on the side bar menu in Pinpoint web.
2. Search for the application name you used to configure Pinpoint Agent.
3. Top 50 URIs used in your application will be displayed below the empty chart.
4. Click each URI to load the chart.


# URI 통계 <a id="uri-statistics-ko"></a>
URI 통계 기능은 핀포인트 v2.5.0에 신규로 추가되었다.
핀포인트 에이전트에서 URI 템플릿 정보를 수집하여 GRPC를 사용해 핀포인트 콜렉터에 전달하고, 핀포인트 콜렉터는 아파치 카프카를 통해 아파치 피노에 값을 저장한다.
핀포인트 웹에서 저장된 URI 통계 데이터를 확인할 수 있다.

![](<../.gitbook/assets/uri_statistics_01.png>)

## 1. 설치 및 설정 방법
### 1.1 Pinot와 Kafka 준비
Pinot와 Kafka가 이미 설치되어 있다면 이 준비 단계는 건너뛰어도 됩니다. 아직 설치하지 않았다면 URI Statistics용 topic과 table을 생성하기 전에 [Pinot 설치 가이드](../getting-started/installation.md#2-pinot)를 참고하여 Pinot와 Kafka를 준비합니다.

### 1.2 Kafka topic 생성
아래와 같이 `url-stat` 토픽을 생성한다.

```
$ bin/kafka-topics.sh --create --topic url-stat --bootstrap-server ${YOUR_KAFKA_SERVER_ADDRESS}
```

### 1.3 Pinot table 생성

- [핀포인트 깃헙 저장소](https://github.com/pinpoint-apm/pinpoint/tree/master/uristat/uristat-common/src/main/pinot)에 URI 통계를 위한 피노 테이블 스키마와 테이블 정보가 있다.
- 위 경로에서 스키마 파일과 테이블 설정을 참고해서 `uriStat` 테이블을 생성한다. hybrid table 기능 사용을 위해서 REALTIME, OFFLINE 테이블 둘다 생성하자.
- 피노에 필요한 테이블을 구성하는 방법은 [피노 공식 문서](https://docs.pinot.apache.org/basics/components/table#streaming-table-creation)를 참고하자.

### 1.4 핀포인트 에이전트 설정
URI 통계 수집을 위해 핀포인트 에이전트에 설정해야 하는 값들을 안내한다.

#### 1.4.1 URI 통계 수집을 위한 설정 값
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
profiler.uri.stat.tomcat.useuserinput=false
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
  - `true`: Vert.x 어플리케이션에서 URI 통계를 수집힌다.
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
- profiler.uri.stat.tomcat.useuserinput: (v2.5.3에 추가 됨) 핀포인트 에이전트가 Tomcat 어플리케이션에서 사용자 정의 URI 템플릿을 사용하여 통계를 수집하는지 여부.
  - `true`: Tomcat 어플리케이션에서 사용자 정의 URI 템플릿을 사용하여 URI 통계를 수집한다.
  - `false`: URI 통계 수집을 할 때 Tomcat 리퀘스트 attribute를 확인하지 않는다.
  
  이 옵션은 지원하는 프레임워크(Spring WebMVC, Spring Webflux, VertX)를 사용하지 않는 Tomcat 어플리케이션에서 URI 통계를 수집하기 위해 추가되었습니다.
  만약 지원하는 프레임워크를 사용하고 있다면, 해당 프레임워크 관련 URI 통계 옵션을 사용하고 이 옵션은 false로 사용하는 것을 권장합니다.
  지원하는 프레임워크에서와는 다르게 Tomcat 자체적으로 URI 템플릿을 제공하지 않기 때문에, 이 옵션을 사용할 경우, 사용자가 직접 Tomcat request attribute에 `pinpoint.metric.uri-template`를 추가하여야만 URI 통계가 수집됩니다.

위 설정 값들을 변경하려면 원하는 [핀포인트 프로파일 경로](https://github.com/pinpoint-apm/pinpoint/tree/master/agent/src/main/resources/profiles)의 `pinpoint.config` 파일에서 값을 변경하여 핀포인트를 재빌드한다. 파일을 수정하지 않고, 핀포인트 에이전트를 붙힐 어플리케이션을 실행할 때 `-Dprofiler.uri.stat.enable=false`와 같이 값을 넣어도 된다.

### 1.5 핀포인트 콜렉터와 핀포인트 웹 설정 및 실행
URI 통계를 수집하려면 [collector starter](../getting-started/installation.md#collector-starter)를 `BASIC` 또는 `ALL` 타입으로 실행한다.
URI 통계 데이터를 확인하려면 [web starter](../getting-started/installation.md#web-starter)를 실행한다.

- URI 통계 수집을 활성화하려면 [pinpoint.collector.properties](https://github.com/pinpoint-apm/pinpoint/tree/master/metric-module/collector-starter/src/main/resources/profiles)에 아래 설정값을 추가한다:

	```
	collector.stat.uri=true
	```

- URI Statistics 메뉴를 표시하려면 [pinpoint-web-uristat.properties](https://github.com/pinpoint-apm/pinpoint/tree/master/uristat/uristat-web/src/main/resources/profiles)에 아래 설정값을 추가한다:

	```
	config.show.urlStat=true
	```
	

## 2. URI 통계 데이터 조회
![](<../.gitbook/assets/uri_statistics_02.png>)
1. 핀포인트 웹을 실행하여 왼쪽 `URL Statistic` 메뉴를 선택한다.
2. 상단의 select box에서 핀포인트 에이전트에 설정한 어플리케이션 이름을 조회한다.
3. 초기 화면에서는 선택한 어플리케이션에서 가장 많이 사용한 상위 50개 URI가 빈 차트 밑에 표시된다.
4. 원하는 URI를 클릭하면 차트에 데이터가 표시된다.
