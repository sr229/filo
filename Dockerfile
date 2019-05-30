FROM andrewgaul/compy:latest as compy-base

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
    --from=compy-base \
    /opt/compy \
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