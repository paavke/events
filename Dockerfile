
FROM jboss/wildfly:10.1.0.Final


WORKDIR /opt/jboss/wildfly


COPY ./apiman-distro-wildfly/ /opt/jboss/wildfly/


USER root


RUN mkdir -p /opt/jboss/wildfly/standalone/data/content && \
    mkdir -p /opt/jboss/wildfly/standalone/log && \
    chmod -R 777 /opt/jboss/wildfly/standalone/data && \
    chmod -R 777 /opt/jboss/wildfly/standalone/data/content && \
    chmod -R 777 /opt/jboss/wildfly/standalone/configuration && \
    chmod -R 777 /opt/jboss/wildfly/standalone/deployments && \
    chmod -R 777 /opt/jboss/wildfly/standalone/log


USER jboss


EXPOSE 8080


CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-c", "standalone-apiman.xml", "-b", "0.0.0.0"]

