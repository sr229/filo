FROM ubuntu:16.04 as compy-builder
MAINTAINER Barna Csorogi <barnacs@justletit.be>

RUN DEBIAN_FRONTEND=noninteractive apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get upgrade -y && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
        curl \
        g++ \
        git \
        libjpeg8-dev

RUN mkdir -p /usr/local/ && \
    curl -O https://storage.googleapis.com/golang/go1.9.linux-amd64.tar.gz && \
    tar xf go1.9.linux-amd64.tar.gz -C /usr/local

RUN mkdir -p /root/go/src/github.com/barnacs/compy/
COPY . /root/go/src/github.com/barnacs/compy/
WORKDIR /root/go/src/github.com/barnacs/compy
RUN /usr/local/go/bin/go get -d -v ./...
RUN /usr/local/go/bin/go build -v

FROM debian:slim as compy-run
MAINTAINER Kibo Hikari <enra@sayonika.moe>

RUN apt update && \
    apt install -y \
    libjpeg8 \
    dumb-init \
    wget -qO - https://github.com/sr229/code-server-openshift/raw/master/entrypoint > /opt/entrypoint && \
    DEBIAN_FRONTEND=noninteractive apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    sed -i "s/export HOME= \"/home/coder\"/export HOME= \"/home/compy\"/g" /opt/entrypoint;

COPY \
    --from=compy-builder \
    /root/go/src/github.com/barnacs/compy/compy \
    /opt/compy

# OpenShift compatibility
# Does not gurantee writes to any part of the FS except HOME, just to fix UID problem.
RUN adduser --disabled-password --gecos '' compy   && \
    chmod g+rw /home/compy && \
    chmod a+x /opt/entrypoint && \
    chgrp -R 0 /home/compy && \
    chmod -R g=u /home/compy && \
    chmod g=u /etc/passwd;

USER 10001

EXPOSE 9999

ENTRYPOINT ["/opt/entrypoint"]

RUN ["dumb-init", "compy" , "-host", ":9999"]