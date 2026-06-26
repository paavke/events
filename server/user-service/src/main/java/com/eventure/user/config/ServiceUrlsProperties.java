package com.eventure.user.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "services")
public class ServiceUrlsProperties {

    private final ServiceEndpoint eventService = new ServiceEndpoint();
    private final ServiceEndpoint taskService = new ServiceEndpoint();

    public ServiceEndpoint getEventService() {
        return eventService;
    }

    public ServiceEndpoint getTaskService() {
        return taskService;
    }

    public static class ServiceEndpoint {
        private String url = "http://localhost:8082";

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }
}
