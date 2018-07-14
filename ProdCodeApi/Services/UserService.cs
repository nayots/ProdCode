using AutoMapper.QueryableExtensions;
using ProdCodeApi.Data;
using ProdCodeApi.Data.Models;
using ProdCodeApi.Models;
using ProdCodeApi.Services.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProdCodeApi.Services
{
    public class UserService : IUserService
    {
        private ProdCodeDbContext db;

        public UserService(ProdCodeDbContext db)
        {
            this.db = db;
        }

        public void ToggleAdmin(int? id)
        {
            User userToToggle = this.db.Users.Single(u => u.Id == id.Value);
            this.db.Entry(userToToggle).Collection(u => u.Roles).Load();
            foreach (var r in userToToggle.Roles)
            {
                this.db.Entry(r).Reference(ur => ur.Role).Load();
            }

            if (userToToggle.Roles.Any(r => r.Role.Name == "Admin"))
            {
                userToToggle.Roles.Remove(userToToggle.Roles.Where(r => r.Role.Name == "Admin").First());
            }
            else
            {
                userToToggle.Roles.Add(new UserRole()
                {
                    RoleId = this.db.Roles.First(r => r.Name == "Admin").Id
                });
            }

            this.db.SaveChanges();
        }

        public ICollection<UserAdminViewModel> GetAllMatches(string searchTerm)
        {
            return this.db.Users.Where(u => u.Name.Contains(searchTerm) || u.Email.Contains(searchTerm))
            .OrderByDescending(u =>  u.Id)
            .Take(string.IsNullOrEmpty(searchTerm) ? 12 : int.MaxValue)
            .ProjectTo<UserAdminViewModel>().ToList();
        }

        public bool UserExists(int id)
        {
            return this.db.Users.Any(u => u.Id == id);
        }
    }
}
