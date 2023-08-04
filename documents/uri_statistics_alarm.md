# URI Statistics Alarms
Alarms for URI statistics are introduced to Pinpoint in v2.6.0.
Similar to the existing [alarms in Pinpoint](https://pinpoint-apm.gitbook.io/pinpoint/documents/alarm), pinpoint-batch server checks every 3 minutes if configured alarm rules are triggered with data in the last 5 minutes.

## 1. Alarm Rules
Alarms rules can be created for each URI, using data collected with [URI Statistics](https://pinpoint-apm.gitbook.io/pinpoint/documents/uri_statistics).

### Alarm Data
- APDEX: The APDEX score of the specified URI for the past 5 minutes (0.00 ~ 1.00)
- Average Response Time: The avgerage response time of the specified URI for the past 5 minutes (ms)
- Maximum Response Time: The maximum response time of the specified URI for the past 5 minutes (ms)
- Total Request Count: The total number of requests made to the specified URI in the past 5 minutes
- Failed Request Count: The number of failed requests to the specified URI in the past 5 minutes

### Alarm Condition
When setting up a new alarm, the conditions for triggering the alarm need to be specified.
You can choose from the following comparison operators:

- (collected value) `>` (threshold value)
- (collected value) `>=` (threshold value)
- (collected value) `==` (threshold value)
- (collected value) `<` (threshold value)
- (collected value) `<=` (threshold value)

## 2. Configuration and Implementation
To use URI Statistics Alarms, MYSQL table `pinot_alarm_history`, `pinot_alarm_rule`, and `pinot_webhook_send` need to be added.

```
CREATE TABLE `pinot_alarm_history` (
  `history_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rule_id` int(10) unsigned NOT NULL,
  `timestamp` datetime NOT NULL,
  PRIMARY KEY (`history_id`)
);
```

```
CREATE TABLE `pinot_alarm_rule` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `service_name` varchar(30) NOT NULL,
  `application_name` varchar(30) NOT NULL,
  `category_name` varchar(30) NOT NULL,
  `checker_name` varchar(30) NOT NULL,
  `target` varchar(256) NOT NULL,
  `condition` varchar(30) NOT NULL,
  `threshold` decimal(10,2) DEFAULT NULL,
  `baseline` varchar(30) DEFAULT NULL,
  `user_group_id` varchar(30) NOT NULL,
  `sms_send` char(1) DEFAULT NULL,
  `email_send` char(1) DEFAULT NULL,
  `webhook_send` char(1) DEFAULT NULL,
  `notes` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
```

```
CREATE TABLE `pinot_webhook_send` (
  `webhook_send_info_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `webhook_id` int(10) unsigned NOT NULL,
  `rule_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`webhook_send_info_id`),
  UNIQUE KEY `webhook_send_info_id_UNIQUE` (`webhook_send_info_id`)
);
```

## 3. How to add alarms on Web UI
(TO BE UPDATED)


# URI 통계 알람
[URI 통계](https://pinpoint-apm.gitbook.io/pinpoint/documents/uri_statistics)를 이용한 알람 기능은 핀포인트 2.6.0에 추가되었습니다.
기존 [핀포인트 알람](https://pinpoint-apm.gitbook.io/pinpoint/documents/alarm)에서와 동일하게 pinpoint-batch 서버가 매 3분동안 지난 5분간의 데이터가 알람 조건을 만족하는 지 체크합니다.

## 1. 설정 가능한 알람
[URI 통계](https://pinpoint-apm.gitbook.io/pinpoint/documents/uri_statistics) 기능으로 수집한 통계값을 사용하여 특정 URI에 대해 아래와 같은 조건으로 알람을 설정할 수 있습니다.

### 알람 대상 데이터
- APDEX: 해당 URI의 과거 5분 동안의 APDEX 점수 (0.00 ~ 1.00)
- 평균 응답 속도: 해당 URI의 과거 5분 동안의 평균 응답 속도 (ms)
- 최대 응답 속도: 해당 URI의 과거 5분 동안의 최대 응답 속도 (ms)
- 전체 요청 수: 해당 URI의 과거 5분 동안의 전체 request 개수
- 실패 요청 수: 해당 URI의 과거 5분 동안 실패한 request의 개수

### 알람 조건
새로운 알람을 등록할 때 수집한 값이 지정한 임계값과 비교해서 어떤 조건일 때 알람이 울리는 지 설정하게 됩니다.
다음 비교 연산자 중에서 선택할 수 있고 아래 조건이 만족하면 알람이 울립니다.

- (수집한 값) `>` (설정한 값)
- (수집한 값) `>=` (설정한 값)
-  (수집한 값) `==` (설정한 값)
-  (수집한 값) `<` (설정한 값)
-  (수집한 값) `<=` (설정한 값) 


## 2. 설치 및 설정 방법
URI 통계 알람을 사용하기 위해서는 MYSQL table 세 개( `pinot_alarm_history`, `pinot_alarm_rule`, `pinot_webhook_send`)를 추가해야 합니다.

```
CREATE TABLE `pinot_alarm_history` (
  `history_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `rule_id` int(10) unsigned NOT NULL,
  `timestamp` datetime NOT NULL,
  PRIMARY KEY (`history_id`)
);
```

```
CREATE TABLE `pinot_alarm_rule` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `service_name` varchar(30) NOT NULL,
  `application_name` varchar(30) NOT NULL,
  `category_name` varchar(30) NOT NULL,
  `checker_name` varchar(30) NOT NULL,
  `target` varchar(256) NOT NULL,
  `condition` varchar(30) NOT NULL,
  `threshold` decimal(10,2) DEFAULT NULL,
  `baseline` varchar(30) DEFAULT NULL,
  `user_group_id` varchar(30) NOT NULL,
  `sms_send` char(1) DEFAULT NULL,
  `email_send` char(1) DEFAULT NULL,
  `webhook_send` char(1) DEFAULT NULL,
  `notes` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
```

```
CREATE TABLE `pinot_webhook_send` (
  `webhook_send_info_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `webhook_id` int(10) unsigned NOT NULL,
  `rule_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`webhook_send_info_id`),
  UNIQUE KEY `webhook_send_info_id_UNIQUE` (`webhook_send_info_id`)
);
```

## 3. 알람 추가하는 법
[ Web 구현 후 추가 예정]

