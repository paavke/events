# Apiman on WildFly 10.1.0.Final (matches the working local setup)
# Overlay is downloaded at build time from Maven Central (not committed to git).

FROM alpine:3.20 AS overlay
RUN apk add --no-cache curl unzip
WORKDIR /tmp
ARG APIMAN_VERSION=1.5.5.Final
RUN curl -fsSL \
      -o overlay.zip \
      "https://repo1.maven.org/maven2/io/apiman/apiman-distro-wildfly10/${APIMAN_VERSION}/apiman-distro-wildfly10-${APIMAN_VERSION}-overlay.zip" \
    && mkdir -p /overlay \
    && unzip -q overlay.zip -d /overlay

FROM jboss/wildfly:10.1.0.Final

USER root

COPY --from=overlay /overlay/ /opt/jboss/wildfly/

RUN mkdir -p \
      /opt/jboss/wildfly/standalone/data/content \
      /opt/jboss/wildfly/standalone/log \
    && chown -R jboss:jboss /opt/jboss/wildfly \
    && chmod -R ug+rwX /opt/jboss/wildfly/standalone

USER jboss

EXPOSE 8080

CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-c", "standalone-apiman.xml", "-b", "0.0.0.0"]
