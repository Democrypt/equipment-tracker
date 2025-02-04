using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

public class DataSeeder
{
    public static async Task SeedRolesAndAdminUser(IServiceProvider serviceProvider)
    {
        using (var scope = serviceProvider.CreateScope())
        {
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            string[] roleNames = { "Administrator", "Engineer", "Observer" };

            foreach (var roleName in roleNames)
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }

            // Create an Admin User
            string adminEmail = "admin@example.com";
            string adminPassword = "Admin123!";

            var adminUser = await userManager.FindByEmailAsync(adminEmail);
            if (adminUser == null)
            {
                var newAdmin = new ApplicationUser
                {
                    UserName = adminEmail,
                    Email = adminEmail,
                    Role = "Administrator"
                };

                var createUserResult = await userManager.CreateAsync(newAdmin, adminPassword);
                if (createUserResult.Succeeded)
                {
                    await userManager.AddToRoleAsync(newAdmin, "Administrator");
                }
            }
        }
    }
}
