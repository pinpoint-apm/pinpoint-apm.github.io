## Compatibility

Java version required to run Pinpoint:
<!-- <compatibilityJava.md> -->
| Pinpoint Version | Agent | Collector | Web | Batch | 
|------------------|-------|-----------|-----|-------|
| 2.0.x            | 6-13  | 8         | 8   | 8     |
| 2.1.x            | 6-14  | 8         | 8   | 8     |
| 2.2.x            | 7-14  | 8         | 8   | 8     |
| 2.3.x            | 7-17  | 8         | 8   | 8     |
| 2.4.x            | 7-18  | 11        | 11  | 11    |
| 2.5.x            | 8-19  | 11        | 11  | 11    |
| 3.0.x            | 8-21  | 17        | 17  | 17    |
| 3.1.x            | 8-25  | 17        | 17  | 17    |
| 4.0.x            | 8-25  | 17        | 17  | 17    |

<!-- </compatibilityJava.md> -->
HBase compatibility table:
<!-- <compatibilityHbase.md> -->
| Pinpoint Version | HBase 1.x | HBase 2.x                                                                                                             |
|------------------|-----------|-----------------------------------------------------------------------------------------------------------------------|
| 2.0.x - 2.2.x    | yes       | [optional](https://pinpoint-apm.gitbook.io/pinpoint/documents/hbase-upgrade#do-you-like-to-use-hbase-2x-for-pinpoint) |
| 2.3.x - 2.5.x    | yes       | [hbase2-module](https://github.com/pinpoint-apm/pinpoint/tree/2.3.x/hbase2-module)                                    |
| 3.0.x            | no        | yes                                                                                                                   |
| 3.1.x            | no        | yes                                                                                                                   |
| 4.0.x            | no        | yes                                                                                                                   |

<!-- </compatibilityHbase.md> -->
Agent - Collector compatibility table:
<!-- <compatibilityPinpoint.md> -->

| Agent Version | Collector 2.x.x | Collector 3.0.x | Collector 3.1.x | Collector 4.0.x |
|---------------|-----------------|-----------------|-----------------|-----------------|
| 2.x.x         | yes             | yes             | yes             | yes             |
| 3.0.x         | no              | yes             | yes             | yes             |
| 3.1.x         | no              | no              | yes             | yes             |
| 4.0.x         | no              | no              | no              | yes             |

<!-- </compatibilityPinpoint.md> -->
Pinot compatibility table:
<!-- <compatibilityPinot.md> -->
| Pinpoint Version | Pinot 0.11.0 | Pinot 0.12.0 | Pinot 1.0.0 | [Pinot 1.2.0](https://github.com/pinpoint-apm/pinpoint/issues/11613) | Pinot 1.3.0 | Pinot 1.5.0 |
|------------------|--------------|--------------|-------------|----------------------------------------------------------------------|-------------|-------------|
| 2.5.x            | yes          | yes          | yes         | yes                                                                  | yes         | -           |
| 3.0.x            | no           | no           | yes         | yes                                                                  | yes         | -           |
| 3.1.x            | no           | no           | no          | no                                                                   | yes         | -           |
| 4.0.x            | no           | no           | no          | no                                                                   | no          | yes         |
<!-- </compatibilityPinot.md> -->
