# Use the base image for Wildfly 10.1.0
FROM jboss/wildfly:10.1.0.Final

# Set the working directory
WORKDIR /opt/jboss/wildfly

# Copy the Apiman overlay files
COPY ./apiman-distro-wildfly/ /opt/jboss/wildfly/

# Switch to root to change permissions
USER root

# Create missing directories and apply permissions
RUN mkdir -p /opt/jboss/wildfly/standalone/data/content && \
    mkdir -p /opt/jboss/wildfly/standalone/log && \
    chmod -R 777 /opt/jboss/wildfly/standalone/data && \
    chmod -R 777 /opt/jboss/wildfly/standalone/data/content && \
    chmod -R 777 /opt/jboss/wildfly/standalone/configuration && \
    chmod -R 777 /opt/jboss/wildfly/standalone/deployments && \
    chmod -R 777 /opt/jboss/wildfly/standalone/log

# Switch back to the jboss user
USER jboss

# Expose the port Wildfly is running on
EXPOSE 8080

# Run Wildfly with the Apiman configuration
CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-c", "standalone-apiman.xml", "-b", "0.0.0.0"]

