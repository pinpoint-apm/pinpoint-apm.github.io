# Introduction

[![Maven](https://img.shields.io/github/actions/workflow/status/pinpoint-apm/pinpoint/maven.yml?branch=master&label=build&logo=github)](https://github.com/pinpoint-apm/pinpoint/actions?query=workflow%3AMaven) 
[![codecov](https://codecov.io/gh/pinpoint-apm/pinpoint/branch/master/graph/badge.svg)](https://codecov.io/gh/pinpoint-apm/pinpoint)

**Pinpoint** is an APM \(Application Performance Management\) tool for large-scale distributed systems written in Java / [PHP](https://github.com/pinpoint-apm/pinpoint-c-agent). Inspired by [Dapper](http://research.google.com/pubs/pub36356.html), Pinpoint provides a solution to help analyze the overall structure of the system and how components within them are interconnected by tracing transactions across distributed applications.

You should definitely check **Pinpoint** out If you want to

* understand your [application topology](want-a-quick-tour/overview.md) at a glance
* monitor your application in _Real-Time_
* gain code-level visibility to every transaction
* install APM Agents without changing a single line of code
* have minimal impact on the performance \(approximately 3% increase in resource usage\)

![](.gitbook/assets/ss_server-map.png)

## Live Demo

* [demo](http://223.130.142.103:8080/main/ApiGateway@SPRING_BOOT/5m?inbound=1&outbound=4&wasOnly=false&bidirectional=false) - Here is a Demo, So that you can take a look at Pinpoint right away.

## Want a quick tour?

* [Overview](want-a-quick-tour/overview.md) / [History](want-a-quick-tour/history.md) / [Tech Details](want-a-quick-tour/techdetail.md) to get to know more about Pinpoint 
* [Videos](want-a-quick-tour/videos.md) - Checkout our videos on Pinpoint

{% embed url="https://youtu.be/U4EwnB34Dus" %}

## Getting Started

* [Quick-start guide\(Lastest Snapshot\)](getting-started/quickstart/) for simple test run of Pinpoint
* [Installation guide\(Lastest Snapshot\)](getting-started/installation.md) for further instructions.

## Google Analytics

The web module has google analytics attached that tracks the number and the order of button clicks in the server map, transaction list, and the inspector view.

This data is used to better understand how users interact with the Web UI which gives us valuable information in improving Pinpoint Web's user experience. To disable this for any reason, set the following option to false in _pinpoint-web.properties_ for your web instance.

```text
config.sendUsage=false
```

## Is your application created with PHP?

Pinpoint has started to support application written in PHP. [Check-out our php-agent repository](https://github.com/pinpoint-apm/pinpoint-c-agent).

## Looking for place to ask questions?

[Questions and FAQ](faq.md)

## License

Pinpoint is licensed under the Apache License, Version 2.0. See [LICENSE](https://github.com/pinpoint-apm/pinpoint/blob/master/LICENSE) for full license text.

```text
Copyright 2019 NAVER Corp.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

