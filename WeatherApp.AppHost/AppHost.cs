var builder = DistributedApplication.CreateBuilder(args);

builder.AddDockerComposeEnvironment("compose")
    .WithDashboard(enabled: false);
var weatherApi = builder.AddProject<Projects.WeatherApp_ApiService>("apiservice")
    .WithHttpHealthCheck("/health")
    .PublishAsDockerComposeService((resource, service) => { service.Name = "apiservice"; });

builder.AddNpmApp("frontend", "../WeatherApp.client")
    .WithReference(weatherApi)
    .WaitFor(weatherApi)
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints()
    .PublishAsDockerFile();

builder.Build().Run();