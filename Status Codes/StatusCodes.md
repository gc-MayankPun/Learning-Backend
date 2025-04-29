## 🛠️ HTTP Status Codes Classes

| Class | Range   | Description             |
| ----- | ------- | ----------------------- |
| 1xx   | 100-199 | Informational responses |
| 2xx   | 200-299 | Success                 |
| 3xx   | 300-399 | Redirection             |
| 4xx   | 400-499 | Client errors           |
| 5xx   | 500-599 | Server errors           |

---

## 🔢 Total Number of Official Status Codes:

There are 63 official HTTP status codes defined in RFCs (as of 2024). Some extra codes are added by services like Cloudflare, AWS, and Nginx.

## 📋 List of Common HTTP Status Codes

🔵 1xx – Informational

| Code  | Meaning             | When Used                                                                       |
| ----- | ------------------- | ------------------------------------------------------------------------------- |
| `100` | Continue            | Client should continue with the request (usually used with large payloads).     |
| `101` | Switching Protocols | Server is switching protocols (e.g., from HTTP to WebSocket).                   |
| `102` | Processing          | Used in WebDAV when request is being processed but not yet complete.            |
| `103` | Early Hints         | Sent before final response, allows preload of resources (used for performance). |

## 🟢 2xx – Success

| Code  | Meaning                | When Used                                                    |
| ----- | ---------------------- | ------------------------------------------------------------ |
| `200` | OK                     | Standard response for successful GET/POST/PUT/etc.           |
| `201` | Created                | A new resource has been created (e.g., after POST request).  |
| `202` | Accepted               | Request accepted for processing but not completed.           |
| `203` | Non-Authoritative Info | Response from a third-party source, not the origin server.   |
| `204` | No Content             | Successful, but no content to return (e.g., after a DELETE). |
| `205` | Reset Content          | Client should reset the form/view that sent the request.     |
| `206` | Partial Content        | Used when sending part of a resource (e.g., for streaming).  |

## 🟡 3xx – Redirection

| Code  | Meaning            | When Used                                                        |
| ----- | ------------------ | ---------------------------------------------------------------- |
| `300` | Multiple Choices   | Resource has multiple options (rare).                            |
| `301` | Moved Permanently  | Resource permanently moved to a new URL.                         |
| `302` | Found              | Temporary redirect (browser should use old URL again next time). |
| `303` | See Other          | Redirect to another URL using GET (common after POST).           |
| `304` | Not Modified       | Resource not changed since last fetch (used with caching).       |
| `307` | Temporary Redirect | Like 302 but method (POST/GET) is preserved.                     |
| `308` | Permanent Redirect | Like 301 but method is preserved.                                |

## 🔴 4xx – Client Errors

| Code  | Meaning                       | When Used                                                        |
| ----- | ----------------------------- | ---------------------------------------------------------------- |
| `400` | Bad Request                   | Malformed request syntax.                                        |
| `401` | Unauthorized                  | No or invalid authentication.                                    |
| `403` | Forbidden                     | Client is authenticated but not allowed.                         |
| `404` | Not Found                     | Resource doesn't exist.                                          |
| `405` | Method Not Allowed            | Method (e.g., PUT) is not supported by that URL.                 |
| `406` | Not Acceptable                | Cannot respond in acceptable content-type.                       |
| `407` | Proxy Authentication Required | Like 401, but for proxy authentication.                          |
| `408` | Request Timeout               | Client took too long to send request.                            |
| `409` | Conflict                      | Conflict with current resource state (e.g., duplicate username). |
| `410` | Gone                          | Resource was once here but is permanently gone.                  |
| `411` | Length Required               | Content-Length header is missing.                                |
| `413` | Payload Too Large             | Body too large.                                                  |
| `414` | URI Too Long                  | URL is too long to process.                                      |
| `415` | Unsupported Media Type        | Server doesn’t support the request’s Content-Type.               |
| `418` | I'm a teapot                  | Joke code (Easter egg in HTTP spec).                             |
| `429` | Too Many Requests             | Client sent too many requests (rate limiting).                   |
| `451` | Unavailable for Legal Reasons | Content blocked for legal reasons (e.g., DMCA).                  |

## 🔴 5xx – Server Errors

| Code  | Meaning                         | When Used                                         |
| ----- | ------------------------------- | ------------------------------------------------- |
| `500` | Internal Server Error           | Generic catch-all for unhandled server error.     |
| `501` | Not Implemented                 | Server doesn't support the requested method.      |
| `502` | Bad Gateway                     | Received invalid response from upstream server.   |
| `503` | Service Unavailable             | Server is down or overloaded.                     |
| `504` | Gateway Timeout                 | Upstream server took too long to respond.         |
| `505` | HTTP Version Not Supported      | Client used an unsupported version.               |
| `507` | Insufficient Storage            | WebDAV server is out of disk space.               |
| `511` | Network Authentication Required | Network login required (e.g., hotel Wi-Fi login). |
