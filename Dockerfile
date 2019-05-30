FROM andrewgaul/compy:latest as compy-base

FROM ubuntu:18.04 as compy-run
MAINTAINER Kibo Hikari <enra@sayonika.moe>

RUN apt update && \
    apt install -y \
    libjpeg8 \
    dumb-init \
    wget && \
    DEBIAN_FRONTEND=noninteractive apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \

COPY \
    --from=compy-base \
    /opt/compy \
    /opt/compy

COPY entrypoint /opt

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