using AutoMapper;
using ProdCodeApi.Data.Models;
using ProdCodeApi.Infrastructure.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProdCodeApi.Models
{
    public class UserAdminViewModel : IMapFrom<User>, IHaveCustomMapping
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public bool IsAdmin { get; set; }

        public void ConfigureMapping(Profile profile)
        {
            profile.CreateMap<User, UserAdminViewModel>()
                .ForMember(am => am.IsAdmin, cfg => cfg.MapFrom(u => u.Roles.Any(r => r.Role.Name == "Admin")));
        }
    }
}
