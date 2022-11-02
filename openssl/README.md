# Development Certificate Generation

[How to create...](https://devopscube.com/create-self-signed-certificates-openssl/)

## Generate the Certificate Authority

Run this command:

```
openssl req -x509 \
            -sha256 -days 356 \
            -nodes \
            -newkey rsa:2048 \
            -subj "/CN=*.sendpicks-local.football/C=US/L=Raleigh" \
            -keyout rootCA.key -out rootCA.crt
```

This will generate `rootCA.key` and `rootCA.crt` which will be used to sign the certificate.

## Generate certificate using openssl

### Create the server private key

Run this command to generate the server private key:

```
openssl genrsa -out server.key 2048
```

The output will be the file `server.key`

### Create the certificate signing request configuration

Use the `csr.conf` file.

### Generate certificate signing request using the server private key

Run the command:

```
openssl req -new -key server.key -out server.csr -config csr.conf
```

This will generate:

-   `server.csr`
-   `server.key`

### Generate SSL certificate with self-signed CA

Use the `cert.conf` file.

Run the command:

```
openssl x509 -req \
    -in server.csr \
    -CA rootCA.crt -CAkey rootCA.key \
    -CAcreateserial -out server.crt \
    -days 365 \
    -sha256 -extfile cert.conf
```

This will generate `server.crt`

## Trust the root CA

-   On Windows, right click the `rootCA.crt` file
-   "Install Certificate"
-   For current user
-   Place all certs in the following store: `Trusted Root Certification Authorities`
-   Finish
-   Click `Yes`

## Done!!!
