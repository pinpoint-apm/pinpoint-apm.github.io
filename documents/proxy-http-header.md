---
title: Monitoring Proxy Server
keywords: 'proxy, http, header'
last_updated: 'Feb 1, 2018'
sidebar: mydoc_sidebar
permalink: proxyhttpheader.html
disqus: false
---

# Monitoring Proxy Server

## Proxy monitoring using HTTP headers <a id="proxy-monitoring-using-http-headers"></a>

It is used to know the elapsed time between proxy and WAS.

![overview](../.gitbook/assets/proxy-http-header-overview.png)

## Pinpoint Configuration

pinpoint.config

```text
profiler.proxy.http.header.enable=true
```

## Proxy Configuration

### Apache HTTP Server

* [http://httpd.apache.org/docs/2.4/en/mod/mod\_headers.html](http://httpd.apache.org/docs/2.4/en/mod/mod_headers.html)

Add HTTP header.

```text
Pinpoint-ProxyApache: t=991424704447256 D=3775428 i=51 b=49
```

e.g.

httpd.conf

```text
<IfModule mod_jk.c>
...
RequestHeader set Pinpoint-ProxyApache "%t %D %i %b"
...
</IfModule>
```

**%t is required value.**

### Nginx

* [http://nginx.org/en/docs/http/ngx\_http\_core\_module.html](http://nginx.org/en/docs/http/ngx_http_core_module.html)
* [http://nginx.org/en/docs/http/ngx\_http\_proxy\_module.html\#proxy\_set\_header](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_set_header)

Add HTTP header.

```text
Pinpoint-ProxyNginx: t=1504248328.423 D=0.123
```

e.g.

nginx.conf

```text
...
  server {
        listen       9080;
        server_name  localhost;

        location / {
            ...
            set $pinpoint_proxy_header "t=$msec D=$request_time";
            proxy_set_header Pinpoint-ProxyNginx $pinpoint_proxy_header;
        }
  }
...
```

or

```text
http {
...

    proxy_set_header Pinpoint-ProxyNginx t=$msec;

...
}
```

**t=$msec is required value.**

### App

Milliseconds since epoch \(13 digits\) and app information.

Add HTTP header.

```text
Pinpoint-ProxyApp: t=1594316309407 app=foo-bar
```

**t=epoch is required value.**

