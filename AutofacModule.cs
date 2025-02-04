using Autofac;

public class AutofacModule : Module
{
    protected override void Load(ContainerBuilder builder)
    {
        // Register Equipment services
        builder.RegisterType<EquipmentService>().As<IEquipmentService>().InstancePerLifetimeScope();
        builder.RegisterType<EquipmentRepository>().As<IEquipmentRepository>().InstancePerLifetimeScope();

        // Register Authentication services
        builder.RegisterType<AuthService>().As<IAuthService>().InstancePerLifetimeScope();

        // Register Dashboard services
        builder.RegisterType<DashboardService>().As<IDashboardService>().InstancePerLifetimeScope();

        // Register Breakdown services
        builder.RegisterType<BreakdownService>().As<IBreakdownService>().InstancePerLifetimeScope();
        builder.RegisterType<BreakdownRepository>().As<IBreakdownRepository>().InstancePerLifetimeScope();

        // Register Report services
        builder.RegisterType<ReportService>().As<IReportService>().InstancePerLifetimeScope();
    }
}
