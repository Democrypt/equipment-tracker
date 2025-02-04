# Use .NET 9.0 SDK for building the project
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copy everything first to avoid unnecessary cache invalidation
COPY . .

# Restore dependencies explicitly setting package directory
RUN dotnet restore --packages /root/.nuget/packages

# Build the project
RUN dotnet build EquipmentTracker.csproj --configuration Release --no-restore -o /build

# Publish the project
RUN dotnet publish EquipmentTracker.csproj --configuration Release --no-restore -o /publish

# Use runtime image for deployment
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /publish .

# Set environment variable to expose the application
ENV ASPNETCORE_URLS=http://+:5000

# Expose port
EXPOSE 5000

# Run the API
CMD ["dotnet", "EquipmentTracker.dll"]
