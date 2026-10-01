> **Note** This guide is a preview published ahead of the official Pinpoint 4.0.0 release. Details may change until the release.  
> **안내** 이 문서는 Pinpoint 4.0.0 정식 릴리스에 맞춰 공개되는 사전 공개본입니다. 릴리스 전까지 내용이 일부 변경될 수 있습니다.

---

[English](service.md#service) | [한국어](service.md#service-ko)


# Pinpoint Service Guide <a id="service"></a>

Pinpoint has released the Service feature.  
You can group multiple applications into a single service and check the call relationships between services on the Service Map.
On screens that support the Service feature, you can view only the data of the applications that belong to the selected service.

This lets you focus on the data of the service you are responsible for and analyze the cause of problems faster.
Even as applications increase, you can clearly separate monitoring targets by service.

![Main screens of the Service feature](<../.gitbook/assets/service_01.gif>)

This document provides content for both Pinpoint users who use services and Pinpoint operators who deploy and operate the Service feature. Check the guide below that matches your role.

| Audience | What to check in this document |
|---|---|
| Pinpoint users | User Guide, chapters 1 to 5: the Service concept, creating and selecting a service, agent settings, using the Service Map, and FAQ |
| Pinpoint operators | Operator Guide, chapters 6 to 7: components and settings, schema changes in 4.0.0 |

# User Guide

This part explains how to create a service, connect agents, and then view monitoring data by service.

## 1. What Is a Service?

**A Service is a higher-level monitoring unit that represents one service made up of multiple applications.**

Pinpoint's monitoring targets consist of three levels: `Service → Application → Agent`.
Decide which applications to treat as one service according to your organization's service structure and operational boundaries.

| Level | Meaning | Example |
|---|---|---|
| Service | A higher-level monitoring unit that contains multiple applications | `demo-shop-commerce` |
| Application | A monitoring unit with a specific role within a service | `Shopping-Order` |
| Agent | An individual instance of an application running on a server or in a container | `shop-order-01` |

A simplified view of the `demo-shop-commerce` service in the demo shopping mall is as follows. To explain the relationship between service, application, and agent, this example assumes that each application runs as two agent instances.

```text
Service: demo-shop-commerce                  product and order domain
├─ Application: Shopping-Order               order processing
│  ├─ Agent: shop-order-01
│  └─ Agent: shop-order-02
└─ Application: Shopping-Product             product lookup
   ├─ Agent: shop-product-01
   └─ Agent: shop-product-02
```

### 1-1. What Changes with the Service Feature

With the Service feature, an application is identified by the `Service + Application` combination, not by its name alone.

| Change | Description |
|---|---|
| Separate query scope | Only the data of the applications in the selected service is viewed. |
| Duplicate application names allowed | The same application name can be used in different services. |
| Call relationships | Calls with other services are checked on the Service Map. |

### 1-2. Selecting a Service

![Service selection menu](<../.gitbook/assets/service_02.png>)

Click the **Service** menu at the bottom left, and select the service to view from the **Select Service** list on the right.

Selecting a service takes you to that service's Service Map.
The currently selected service is marked with a check. The list shows the current service first, then `DEFAULT`, then the remaining services sorted by name.

The service selection is kept independently per browser tab. In a new tab, the last selected service is used as the default.

When you select `demo-shop-commerce`, you can view only the applications and monitoring data that belong to that service.
The application list and the queried data also change based on the selected service.

### 1-3. Service Map

![demo-shop-commerce Service Map](<../.gitbook/assets/service_03.png>)

The Service Map shows, on one screen, the application calls inside the selected service and the call relationships with directly connected services.

| Target | How it is shown |
|---|---|
| Selected service | Its applications are expanded into individual nodes. |
| Other services with call relationships | Multiple applications are shown as one group node. |
| Number on a group node | The number of applications in that service. |

When `demo-shop-commerce` is selected in the demo shopping mall, the call relationships are shown as follows.

```text
[Service: demo-shop-front]
             │
             ▼
[Service: demo-shop-commerce]
Shopping-Order ─────→ Shopping-Product
      │                       │
      ├────────→ MySQL ←──────┘
      ▼
[Service: demo-shop-payment]
```

`Shopping-Order` (application), `Shopping-Product` (application), and `MySQL` (database), which belong to the selected `demo-shop-commerce` service, are shown as individual nodes. The connected `demo-shop-front` and `demo-shop-payment` services are each shown as a single service group node.

See chapter 4 for the display range and the limitations of group nodes.

### 1-4. Role of the DEFAULT Service and Data Handling

`DEFAULT` is the default service name where data from agents without a specified service is collected.

| Case | Handling |
|---|---|
| Data collected without a specified service | Viewed under the default service, `DEFAULT`. |
| Data collected after a service is set on the agent and the agent is restarted | Viewed under the configured service. |
| Existing data collected before a service was specified | Stays in `DEFAULT` and does not move to the new service. |

Creating a new service by itself does not move existing applications and data.

See chapter 3 for how to configure agents.

## 2. Getting Started with Services

**Turn on the Service feature, create a service, and apply the agent settings in order.**

The following order is recommended for the first setup.

```text
Turn on the Service feature
→ Create a service
→ Set the service on the agents
→ Verify the data
```

### 2-1. Turning On the Service Feature

![Service option under Experimental](<../.gitbook/assets/service_04.png>)

1. Click **Configuration** at the bottom left.
2. Select **Experimental**.
3. Turn on **Enable service-based application map grouping.**
4. Check that **Service** and **Servicemap** appear in the left menu.

This setting is saved per browser.

You need to set it again in other browsers or devices.

If the option or the menus are not visible, contact your Pinpoint operator.

### 2-2. Creating a Service

![Service management screen](<../.gitbook/assets/service_05.png>)

![New Service dialog](<../.gitbook/assets/service_06.png>)

1. Click **Service** at the bottom left.
2. Click **Service Setting**.
3. Click **New Service**.
4. Enter the service name and click **Save**.
5. Check that the created service is selected as the current service.

The service name is used as-is for the agent's `pinpoint.serviceName`.

Enter the name according to the following rules so that it can be linked with agents.

| Item | Rule |
|---|---|
| Length | 1 to 254 characters |
| Allowed characters | Uppercase and lowercase letters, digits, period (`.`), underscore (`_`), hyphen (`-`) |
| Not allowed | Spaces, Korean characters, slashes |
| Duplicate names | A name that differs from an existing service only in letter case cannot be used |
| Reserved names | `DEFAULT`, `ERROR`, `UNKNOWN`, `NULL`, `TEST` |

Examples of usable names are `demo-shop-commerce`, `member-platform`, and `finance-platform`.

Right after a service is created, it has no applications.

Applications are displayed once you finish the agent settings in chapter 3 and data is collected.

### 2-3. Selecting a Service

You can select a service in the following two places.

- The **Service** menu at the bottom left
- **Switch To** in the **Service Setting** list

Check the selected service in the Service menu at the bottom left.

### 2-4. Deleting a Service

**When a service is deleted, existing data is not recovered.**

Deleting a service has the following effects.

| Item | State after deletion |
|---|---|
| Service registration | Deleted. |
| Existing monitoring data | Remains, but does not move to another service. |
| A service re-created with the same name | Registered as a new service and not linked to the existing data. |

If the agents of a deleted service are restarted, registration may fail and new data may not be collected.

If you need to delete a service, follow this order.

1. Stop the agents that use the service, or change them to another service.
2. Check that new data is collected under the changed service.

It may take some time for a deleted service to disappear from the list.

`DEFAULT` cannot be deleted.

## 3. Setting the Service on Agents

**The Service feature is available in Pinpoint Agent 4.0.0 or later.**

When you set the service, application, and agent names in the agent startup options, Pinpoint builds the membership relationships.

### 3-1. Before You Start

Decide the service, application, and agent names according to the structure and operational standards of each environment.

This chapter assumes that the product and order domain is configured as one service with the following names.

| Level | Example name |
|---|---|
| Service | `demo-shop-commerce` |
| Application | `Shopping-Order` |
| Agent | `shop-order-01` |

Create the `demo-shop-commerce` service in Pinpoint Web before starting the agent. In a real environment, replace the names above with the names decided for each environment.

If the Pinpoint Agent is older than 4.0.0, upgrade it and then set the service. The service and application names must match the values shown in Pinpoint Web, including letter case.

### 3-2. JVM Options

Set the example names decided in 3-1 as JVM options as follows.

| Setting | Example value | Meaning |
|---|---|---|
| `pinpoint.modules.uid.version` | `v4` | Uses the agent identification scheme that includes service information. |
| `pinpoint.serviceName` | `demo-shop-commerce` | The service the agent belongs to. It must be registered in Pinpoint Web first. |
| `pinpoint.applicationName` | `Shopping-Order` | The application the agent belongs to. |
| `pinpoint.agentName` | `shop-order-01` | A name that identifies the running instance. Optional. |

```bash
-Dpinpoint.modules.uid.version=v4
-Dpinpoint.serviceName=demo-shop-commerce
-Dpinpoint.applicationName=Shopping-Order
-Dpinpoint.agentName=shop-order-01
```

`pinpoint.serviceName` and `pinpoint.applicationName` must be set.

If `pinpoint.agentName` is omitted, the agent generates an instance name automatically.

To easily tell apart instances before and after a restart, specifying the name directly is recommended.

### 3-3. Applying and Verifying the Settings

1. Apply the settings and restart the agent.
2. Check in the agent log whether registration succeeded.
3. Select the registered service in Pinpoint Web.
4. Check that the configured application appears in the application list and on the Service Map.
5. Check transactions and agent status in a recent time range.

## 4. Supported Scope and Current Limitations

**On screens that support the Service feature, data is viewed based on the selected service.**

### 4-1. Main Features with Service Support

| Area | Service support |
|---|---|
| Applications and agents | View only the applications and agents that belong to the selected service |
| Service Map | View the call relationships between the applications of the selected service and other services<br>Refresh the Service Map, Heatmap, and Scatter in real time, and view the Active Requests of the selected application |
| Transaction analysis | View Heatmap, Scatter, Histogram, Apdex, and the transaction list and details |
| Statistics and analysis | View Inspector, URL Statistic, and Exception Trace |

### 4-2. Current Limitations

| Feature | Current limitation | Notes |
|---|---|---|
| Service Map | Inbound and outbound calls are each viewed up to one hop from the selected service | Services two or more hops away may not be displayed |
| Group nodes | Not every application call inside a collapsed service may be represented | Use group nodes to check the connections between services |
| Infrastructure | Service scope is not applied | Data from multiple services may be shown together |
| OpenTelemetry Metric | Service scope is not applied | Data may be shown together regardless of the selected service |

## 5. FAQ

### 5-1. Where do I see the data if I turn the Service feature off?

When the Service feature is off, the `DEFAULT` data is viewed in the legacy `Servermap`.

Data stored under a specific service does not move to `DEFAULT` and is not shown in the legacy `Servermap`.

To see that data, turn the Service feature back on and select the correct service.

### 5-2. I created a service, but no application appears

Check the following in order.

1. The Pinpoint Agent is 4.0.0 or later.
2. The agent's `pinpoint.modules.uid.version` is `v4`.
3. The service was created before the agent.
4. `pinpoint.serviceName` and `pinpoint.applicationName` satisfy the allowed characters and the 254-character limit.
5. `pinpoint.serviceName` matches the registered service, including letter case.
6. If the service was created after the agent, wait up to 10 minutes and restart the agent.
7. The agent registration log shows no errors.
8. The correct service and a recent time range are selected in Pinpoint Web.

### 5-3. Can I use the same application name in several services?

Yes, you can.

`commerce-service / order-api` and `partner-service / order-api` are treated as different applications.

### 5-4. Can I rename a service?

Service names cannot be changed.

Create a new service, change the agent's `pinpoint.serviceName`, and restart the agent.

Only data collected after the change is stored in the new service.

Existing data is not copied to the new service.

### 5-5. If I re-create a deleted service with the same name, is the data restored?

Monitoring data is not restored.

Even if you re-create it with the same name, it is registered as a new service, and the monitoring data from before the deletion is not linked.

### 5-6. A connected service does not appear on the Service Map

Check the following.

1. There is actual call data in the queried time range.
2. The agents on both sides of the call are 4.0.0 or later and registered under the correct services.
3. The connected service is within one hop of the current service.

# Operator Guide

This part explains how to prepare Pinpoint Web and Collector and apply the Service feature.

## 6. Architecture and Default Settings

### 6-1. Components

The Service feature works with the following components together.

| Component | Role |
|---|---|
| Pinpoint Agent | Sends the configured service, application, and agent information to the Collector. |
| Pinpoint Collector | Looks up the service name sent by the agent in the Service Registry and links the collected data to that service. |
| Pinpoint Web | Provides the APIs and screens for creating and deleting services and for querying by service. |
| MySQL | Stores the Service Registry, which manages service names and service UIDs. |
| HBase | Stores the data used for the Service Map, transactions, and application and agent lookups. |
| Pinot | Stores Heatmap, Inspector, URL Stat, Exception Stat, Infrastructure, and OpenTelemetry Metric data. |

Pinpoint Web and Collector must look up the same Service Registry. If the two components use the `service` table in different MySQL databases, the Collector cannot find a service created in Web.

The flow in which service information is stored and looked up is as follows.

![Service feature architecture and data flow](<../.gitbook/assets/service_07.png>)

The MySQL Service Registry stores service names and UIDs. Monitoring data is stored in HBase and Pinot without passing through MySQL.

The service name created in Web and the service name set on the agent must be the same for the collected data to be viewed under the correct service.

### 6-2. Checking the Default Settings

In Pinpoint 4.0.0, the Service feature is enabled by default. The related settings are as follows.

| Layer | Setting | 4.0.0 default | Source file |
|---|---|---|---|
| Collector | `pinpoint.collector.service.lookup.enabled` | `true` | `collector/src/main/resources/pinpoint-collector-root.properties` |
| Service Map API | `pinpoint.modules.web.servicemap.enabled` | `true` | `web/src/main/resources/pinpoint-web-root.properties` |
| Browser UI initial value | `experimental.enableServiceMap.value` | `true` | `web/src/main/resources/pinpoint-web-root.properties` |

## 7. Schema Changes in 4.0.0

Upgrading to Pinpoint 4.0.0 requires schema changes.

### 7-1. Pinot

- `exceptionTrace` table: column added
  - Change: `serviceName` column added (STRING, default `DEFAULT`)
  - Schema: [pinot-exceptionTrace-schema.json](https://github.com/pinpoint-apm/pinpoint/blob/master/exceptiontrace/exceptiontrace-common/src/main/pinot/pinot-exceptionTrace-schema.json)

### 7-2. MySQL

- `service` table
  - Schema: [Service-Schema.sql](https://github.com/pinpoint-apm/pinpoint/blob/master/service-module/src/main/resources/sql/Service-Schema.sql)
- Alarm tables
  - Schema: to be added

### 7-3. HBase

- The service-related tables were already added in version 3.1.0.
- If you upgrade to 4.0.0 from a version earlier than 3.1.0, add the HBase tables by referring to the guide below.
- https://pinpoint-apm.gitbook.io/pinpoint/documents/hbase-table-changes#id-3.1.0

---

# Pinpoint Service 가이드 <a id="service-ko"></a>

Pinpoint에서 Service 기능을 출시했습니다.  
여러 Application을 하나의 Service로 구성하고, Service 간 호출 관계를 Service Map에서 확인할 수 있습니다.
Service 기능을 지원하는 화면에서는 선택한 Service에 속한 Application의 데이터만 조회할 수 있습니다.

이를 통해 담당 Service의 데이터에 집중하고, 문제 원인을 더 빠르게 분석할 수 있습니다.
Application이 늘어나도 모니터링 대상을 Service 단위로 명확하게 구분할 수 있습니다.

![Service 기능 주요 화면](<../.gitbook/assets/service_01.gif>)

이 문서는 Service를 사용하는 Pinpoint 사용자와 Service 기능을 배포·운영하는 Pinpoint 운영자를 위한 내용을 함께 제공합니다. 역할에 따라 아래 가이드를 확인합니다.

| 대상 | 이 문서에서 확인할 내용 |
|---|---|
| Pinpoint 사용자 | 사용자 가이드 1장부터 5장: Service 개념, 생성과 선택, Agent 설정, Service Map 사용과 FAQ |
| Pinpoint 운영자 | 운영자 가이드 6장부터 7장: 구성 요소와 설정, 4.0.0 스키마 변경사항 |

# 사용자 가이드

Service를 생성하고 Agent를 연결한 뒤, Service 단위로 모니터링 데이터를 조회하는 방법을 설명합니다.

## 1. Service란

**Service는 여러 Application으로 구성된 하나의 서비스를 나타내는 상위 모니터링 단위입니다.**

Pinpoint의 모니터링 대상은 `Service → Application → Agent`의 세 단계로 구성됩니다.
어떤 Application을 하나의 Service로 볼지는 조직의 서비스 구성과 운영 경계에 맞게 정합니다.

| 구분 | 의미 | 예시 |
|---|---|---|
| Service | 여러 Application을 포함하는 상위 모니터링 단위 | `demo-shop-commerce` |
| Application | Service 안에서 특정 역할을 담당하는 모니터링 단위 | `Shopping-Order` |
| Agent | 서버나 컨테이너에서 실행 중인 Application의 개별 인스턴스 | `shop-order-01` |

데모 쇼핑몰의 `demo-shop-commerce` Service를 단순화하면 다음과 같습니다. Service, Application, Agent의 관계를 설명하기 위해 각 Application이 두 Agent 인스턴스로 실행된다고 가정합니다.

```text
Service: demo-shop-commerce                  상품·주문 영역
├─ Application: Shopping-Order               주문 처리
│  ├─ Agent: shop-order-01
│  └─ Agent: shop-order-02
└─ Application: Shopping-Product             상품 조회
   ├─ Agent: shop-product-01
   └─ Agent: shop-product-02
```

### 1-1. Service 기능으로 달라지는 점

Service 기능을 사용하면 Application은 이름만이 아니라 `Service + Application` 조합으로 구분됩니다.

| 변화 | 설명 |
|---|---|
| 조회 범위 분리 | 선택한 Service에 속한 Application의 데이터만 조회합니다. |
| Application 이름 중복 허용 | Service가 다르면 같은 Application 이름을 사용할 수 있습니다. |
| 호출 관계 확인 | 다른 Service와의 호출을 Service Map에서 확인합니다. |

### 1-2. Service 선택

![Service 선택 메뉴](<../.gitbook/assets/service_02.png>)

왼쪽 아래 **Service** 메뉴를 누르고, 오른쪽 **Select Service** 목록에서 조회할 Service를 선택합니다.

Service를 선택하면 해당 Service의 Service Map으로 이동합니다.
현재 선택한 Service에는 체크 표시가 나타납니다. 목록은 현재 Service, `DEFAULT`, 나머지 Service 이름순으로 표시됩니다.

Service 선택은 브라우저 탭마다 독립적으로 유지됩니다. 새 탭에서는 마지막으로 선택한 Service가 기본값으로 사용됩니다.

`demo-shop-commerce`를 선택하면 해당 Service에 속한 Application과 모니터링 데이터만 조회할 수 있습니다.
Application 목록과 조회 데이터도 선택한 Service를 기준으로 바뀝니다.

### 1-3. Service Map

![demo-shop-commerce Service Map](<../.gitbook/assets/service_03.png>)

Service Map은 선택한 Service 내부의 Application 호출과 직접 연결된 Service 간 호출 관계를 한 화면에 보여줍니다.

| 표시 대상 | 표시 방식 |
|---|---|
| 선택한 Service | 소속 Application을 개별 노드로 펼쳐서 표시합니다. |
| 호출 관계가 있는 다른 Service | 여러 Application을 하나의 그룹 노드로 표시합니다. |
| 그룹 노드의 숫자 | 해당 Service에 포함된 Application 수를 표시합니다. |

데모 쇼핑몰에서 `demo-shop-commerce`를 선택하면 호출 관계는 다음과 같이 표시됩니다.

```text
[Service: demo-shop-front]
             │
             ▼
[Service: demo-shop-commerce]
Shopping-Order ─────→ Shopping-Product
      │                       │
      ├────────→ MySQL ←──────┘
      ▼
[Service: demo-shop-payment]
```

선택한 `demo-shop-commerce`(Service)에 속한 `Shopping-Order`(Application), `Shopping-Product`(Application), `MySQL`(Database)은 개별 노드로 표시됩니다. 연결된 `demo-shop-front`(Service)와 `demo-shop-payment`(Service)는 각각 하나의 Service 그룹 노드로 표시됩니다.

표시 범위와 그룹 노드의 제한 사항은 4장을 참고합니다.

### 1-4. DEFAULT Service의 역할과 데이터 처리

`DEFAULT`는 Service를 지정하지 않은 Agent의 데이터가 모이는 기본 Service 이름입니다.

| 구분 | 처리 방식 |
|---|---|
| Service를 지정하지 않고 수집한 데이터 | 기본 Service인 `DEFAULT`에서 조회합니다. |
| Agent에 Service를 설정하고 재기동한 뒤 수집한 데이터 | 설정한 Service에서 조회합니다. |
| Service를 지정하기 전에 수집한 기존 데이터 | `DEFAULT`에 남고 새 Service로 이동하지 않습니다. |

새 Service를 만드는 것만으로 기존 Application과 데이터가 이동하지는 않습니다.

Agent 설정 방법은 3장을 참고합니다.

## 2. Service 시작하기

**Service 기능을 켠 뒤 Service를 만들고 Agent 설정을 순서대로 적용합니다.**

처음 설정할 때는 다음 순서를 권장합니다.

```text
Service 기능 켜기
→ Service 생성
→ Agent에 Service 지정
→ 데이터 확인
```

### 2-1. Service 기능 켜기

![Experimental의 Service 활성화 옵션](<../.gitbook/assets/service_04.png>)

1. 왼쪽 아래 **Configuration**을 누릅니다.
2. **Experimental**을 선택합니다.
3. **Enable service-based application map grouping.**을 켭니다.
4. 왼쪽 메뉴에 **Service**와 **Servicemap**이 표시되는지 확인합니다.

이 설정은 브라우저별로 저장됩니다.

다른 브라우저나 기기에서는 다시 설정해야 합니다.

옵션이나 메뉴가 보이지 않으면 Pinpoint 운영자에게 문의합니다.

### 2-2. Service 생성

![Service 관리 화면](<../.gitbook/assets/service_05.png>)

![새 Service 생성 화면](<../.gitbook/assets/service_06.png>)

1. 왼쪽 아래 **Service**를 누릅니다.
2. **Service Setting**을 누릅니다.
3. **New Service**를 누릅니다.
4. Service 이름을 입력하고 **Save**를 누릅니다.
5. 생성한 Service가 현재 Service로 선택됐는지 확인합니다.

Service 이름은 Agent의 `pinpoint.serviceName`에 그대로 사용합니다.

Agent와 연결할 수 있도록 다음 규칙에 맞춰 입력합니다.

| 항목 | 규칙 |
|---|---|
| 길이 | 1~254자 |
| 허용 문자 | 영문 대소문자, 숫자, 마침표(`.`), 밑줄(`_`), 하이픈(`-`) |
| 사용할 수 없는 문자 | 공백, 한글, 슬래시 |
| 중복 이름 | 기존 Service와 대소문자만 다른 이름도 사용 불가 |
| 예약 이름 | `DEFAULT`, `ERROR`, `UNKNOWN`, `NULL`, `TEST` |

사용 가능한 이름의 예는 `demo-shop-commerce`, `member-platform`, `finance-platform`입니다.

Service를 만든 직후에는 소속 Application이 없습니다.

3장의 Agent 설정을 마치고 데이터가 수집되면 Application이 표시됩니다.

### 2-3. Service 선택

다음 두 위치에서 Service를 선택할 수 있습니다.

- 왼쪽 아래 **Service** 메뉴
- **Service Setting** 목록의 **Switch To**

선택한 Service는 왼쪽 아래 Service 메뉴에서 확인합니다.

### 2-4. Service 삭제

**Service 삭제 시 기존 데이터는 복구되지 않습니다.**

Service 삭제가 미치는 영향은 다음과 같습니다.

| 항목 | 삭제 후 상태 |
|---|---|
| Service 등록 정보 | 삭제됩니다. |
| 기존 모니터링 데이터 | 남아 있지만 다른 Service로 이동하지 않습니다. |
| 같은 이름으로 다시 만든 Service | 새로운 Service로 등록되며 기존 데이터와 연결되지 않습니다. |

Service를 삭제한 뒤 해당 Service의 Agent를 재기동하면 등록이 실패하고 신규 데이터가 수집되지 않을 수 있습니다.

삭제가 필요한 경우 다음 순서를 따릅니다.

1. 해당 Service를 사용하는 Agent를 중지하거나 다른 Service로 변경합니다.
2. 변경한 Service에서 신규 데이터가 수집되는지 확인합니다.

삭제한 Service가 목록에서 사라지는 데 시간이 걸릴 수 있습니다.

`DEFAULT`는 삭제할 수 없습니다.

## 3. Agent에 Service 설정

**Service 기능은 Pinpoint Agent 4.0.0 이상에서 사용할 수 있습니다.**

Agent 시작 옵션에 Service, Application, Agent 이름을 설정하면 Pinpoint가 소속 관계를 구성합니다.

### 3-1. 설정 전 확인

Service, Application, Agent 이름은 각 환경의 구성과 운영 기준에 맞게 정합니다.

이 장에서는 상품·주문 영역을 하나의 Service로 구성하고, 다음과 같이 이름을 정했다고 가정합니다.

| 구분 | 예시 이름 |
|---|---|
| Service | `demo-shop-commerce` |
| Application | `Shopping-Order` |
| Agent | `shop-order-01` |

Agent를 기동하기 전에 Pinpoint Web에서 `demo-shop-commerce` Service를 먼저 만듭니다. 실제 환경에서는 위 이름을 각 환경에서 정한 이름으로 바꿔서 설정합니다.

Pinpoint Agent가 4.0.0보다 낮다면 업그레이드한 뒤 Service를 설정합니다. Service와 Application 이름은 Pinpoint Web에 표시된 값과 대소문자까지 같아야 합니다.

### 3-2. JVM 옵션 설정

3-1에서 정한 예시 이름을 JVM 옵션에 다음과 같이 설정합니다.

| 설정 | 예시 값 | 의미 |
|---|---|---|
| `pinpoint.modules.uid.version` | `v4` | Service 정보를 포함하는 Agent 식별 체계를 사용합니다. |
| `pinpoint.serviceName` | `demo-shop-commerce` | Agent가 속할 Service입니다. Pinpoint Web에 먼저 등록돼 있어야 합니다. |
| `pinpoint.applicationName` | `Shopping-Order` | Agent가 속할 Application입니다. |
| `pinpoint.agentName` | `shop-order-01` | 실행 중인 인스턴스를 구분하는 이름입니다. 선택 항목입니다. |

```bash
-Dpinpoint.modules.uid.version=v4
-Dpinpoint.serviceName=demo-shop-commerce
-Dpinpoint.applicationName=Shopping-Order
-Dpinpoint.agentName=shop-order-01
```

`pinpoint.serviceName`과 `pinpoint.applicationName`은 반드시 설정합니다.

`pinpoint.agentName`을 생략하면 Agent가 인스턴스 이름을 자동으로 생성합니다.

재기동 전후의 인스턴스를 쉽게 구분하려면 이름을 직접 지정하는 것을 권장합니다.

### 3-3. 설정 적용과 확인

1. 설정을 반영한 뒤 Agent를 재기동합니다.
2. Agent 로그에서 등록 성공 여부를 확인합니다.
3. Pinpoint Web에서 등록한 Service를 선택합니다.
4. Application 목록과 Service Map에서 설정한 Application이 표시되는지 확인합니다.
5. 최근 시간 범위에서 Transaction과 Agent 상태를 확인합니다.

## 4. 현재 지원 범위와 제한 사항

**Service 기능을 지원하는 화면에서는 선택한 Service를 기준으로 데이터를 조회합니다.**

### 4-1. Service가 적용된 주요 기능

| 영역 | Service 적용 내용 |
|---|---|
| Application과 Agent | 선택한 Service에 속한 Application과 Agent만 조회 |
| Service Map | 선택한 Service의 Application과 다른 Service의 호출 관계 조회<br>Service Map, Heatmap, Scatter를 실시간으로 갱신하고 선택한 Application의 Active Request 조회 |
| Transaction 분석 | Heatmap, Scatter, Histogram, Apdex, Transaction 목록과 상세 조회 |
| 통계와 분석 | Inspector, URL Statistic, Exception Trace 조회 |

### 4-2. 현재 제한 사항

| 기능 | 현재 제한 | 사용 시 주의사항 |
|---|---|---|
| Service Map | 선택한 Service를 기준으로 들어오는 호출과 나가는 호출을 각각 한 단계까지 조회 | 두 단계 이상 떨어진 Service는 표시되지 않을 수 있음 |
| 그룹 노드 | 접힌 Service 내부의 Application 호출을 모두 표현하지 못할 수 있음 | 그룹 노드는 Service 간 연결을 확인하는 용도로 사용 |
| Infrastructure | Service 범위가 적용되지 않음 | 여러 Service의 데이터가 함께 보일 수 있음 |
| OpenTelemetry Metric | Service 범위가 적용되지 않음 | 선택한 Service와 관계없이 데이터가 함께 보일 수 있음 |

## 5. FAQ

### 5-1. Service 기능을 끄면 데이터는 어디에서 보나요?

Service 기능을 끄면 기존 `Servermap`에서 `DEFAULT` 데이터를 조회합니다.

특정 Service에 저장된 데이터는 `DEFAULT`로 이동하지 않으며 기존 `Servermap`에도 표시되지 않습니다.

해당 데이터를 보려면 Service 기능을 다시 켜고 올바른 Service를 선택합니다.

### 5-2. Service를 만들었는데 Application이 보이지 않습니다

다음을 순서대로 확인합니다.

1. Pinpoint Agent가 4.0.0 이상인지 확인합니다.
2. Agent의 `pinpoint.modules.uid.version`이 `v4`인지 확인합니다.
3. Agent보다 먼저 Service를 만들었는지 확인합니다.
4. `pinpoint.serviceName`과 `pinpoint.applicationName`이 허용 문자와 254자 제한을 만족하는지 확인합니다.
5. `pinpoint.serviceName`이 등록한 Service와 대소문자까지 같은지 확인합니다.
6. Service를 Agent보다 늦게 만들었다면 최대 10분 기다린 뒤 Agent를 재기동합니다.
7. Agent 등록 로그에서 오류가 없는지 확인합니다.
8. Pinpoint Web에서 올바른 Service와 최근 시간 범위를 선택합니다.

### 5-3. 같은 Application 이름을 여러 Service에서 써도 되나요?

사용할 수 있습니다.

`commerce-service / order-api`와 `partner-service / order-api`는 서로 다른 Application으로 구분됩니다.

### 5-4. Service 이름을 바꿀 수 있나요?

Service 이름은 변경할 수 없습니다.

새 Service를 만든 뒤 Agent의 `pinpoint.serviceName`을 변경하고 재기동해야 합니다.

변경 이후에 수집한 데이터만 새 Service에 저장됩니다.

기존 데이터는 새 Service로 복사되지 않습니다.

### 5-5. 삭제한 Service를 같은 이름으로 만들면 복구되나요?

모니터링 데이터는 복구되지 않습니다.

같은 이름으로 다시 만들어도 새로운 Service로 등록되며, 삭제 전 모니터링 데이터는 연결되지 않습니다.

### 5-6. Service Map에 연결된 Service가 보이지 않습니다

다음을 확인합니다.

1. 조회 시간 범위에 실제 호출 데이터가 있는지 확인합니다.
2. 호출 양쪽 Agent가 4.0.0 이상이고 올바른 Service로 등록됐는지 확인합니다.
3. 연결된 Service가 현재 Service에서 한 단계 안에 있는지 확인합니다.

# 운영자 가이드

Pinpoint Web과 Collector를 준비하고 Service 기능을 적용하는 방법을 설명합니다.

## 6. 구조와 기본 설정

### 6-1. 구성 요소

Service 기능은 다음 구성 요소가 함께 동작합니다.

| 구성 요소 | 역할 |
|---|---|
| Pinpoint Agent | 설정한 Service, Application, Agent 정보를 Collector로 전송합니다. |
| Pinpoint Collector | Agent가 보낸 Service 이름을 Service Registry에서 확인하고 수집 데이터를 해당 Service와 연결합니다. |
| Pinpoint Web | Service 생성·삭제와 Service 단위 조회 API 및 화면을 제공합니다. |
| MySQL | Service 이름과 Service UID를 관리하는 Service Registry를 저장합니다. |
| HBase | Service Map, Transaction, Application과 Agent 조회에 사용하는 데이터를 저장합니다. |
| Pinot | Heatmap, Inspector, URL Stat, Exception Stat, Infrastructure, OpenTelemetry Metric 데이터를 저장합니다. |

Pinpoint Web과 Collector는 동일한 Service Registry를 조회해야 합니다. 두 구성 요소가 서로 다른 MySQL의 `service` 테이블을 사용하면 Web에서 생성한 Service를 Collector가 찾을 수 없습니다.

Service 정보가 저장되고 조회되는 흐름은 다음과 같습니다.

![Service 기능 구성과 데이터 흐름](<../.gitbook/assets/service_07.png>)

MySQL Service Registry에는 Service 이름과 UID를 저장합니다. 모니터링 데이터는 MySQL을 거치지 않고 HBase와 Pinot에 저장됩니다.

Web에 생성한 Service 이름과 Agent에 설정한 Service 이름이 같아야 수집 데이터를 올바른 Service에서 조회할 수 있습니다.

### 6-2. 기본 설정 확인

Pinpoint 4.0.0에서는 Service 기능이 기본으로 활성화됩니다. 관련 설정은 다음과 같습니다.

| 계층 | 설정 | 4.0.0 기본값 | 기준 파일 |
|---|---|---|---|
| Collector | `pinpoint.collector.service.lookup.enabled` | `true` | `collector/src/main/resources/pinpoint-collector-root.properties` |
| Service Map API | `pinpoint.modules.web.servicemap.enabled` | `true` | `web/src/main/resources/pinpoint-web-root.properties` |
| 브라우저 UI 초기값 | `experimental.enableServiceMap.value` | `true` | `web/src/main/resources/pinpoint-web-root.properties` |

## 7. 4.0.0 스키마 변경사항

Pinpoint 4.0.0 버전 업그레이드 시 스키마 변경이 필요합니다.

### 7-1. Pinot

- `exceptionTrace` 테이블 컬럼 추가
  - 변경 내용: `serviceName` 컬럼 추가 (STRING, 기본값 `DEFAULT`)
  - 스키마: [pinot-exceptionTrace-schema.json](https://github.com/pinpoint-apm/pinpoint/blob/master/exceptiontrace/exceptiontrace-common/src/main/pinot/pinot-exceptionTrace-schema.json)

### 7-2. MySQL

- `service` 테이블
  - 스키마: [Service-Schema.sql](https://github.com/pinpoint-apm/pinpoint/blob/master/service-module/src/main/resources/sql/Service-Schema.sql)
- 알람 테이블
  - 스키마: 추가 예정

### 7-3. HBase

- 3.1.0 버전에서 service에 관련된 테이블이 이미 추가되었습니다.
- 만약 3.1.0 미만 버전에서 4.0.0으로 업그레이드하는 경우 아래 가이드를 참고하여 HBase 테이블을 추가해주세요.
- https://pinpoint-apm.gitbook.io/pinpoint/documents/hbase-table-changes#id-3.1.0
