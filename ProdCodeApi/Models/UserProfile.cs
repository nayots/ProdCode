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
    public class UserProfile : IMapFrom<User>, IHaveCustomMapping
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime? Birthdate { get; set; }

        public string[] Roles { get; set; }

        public void ConfigureMapping(Profile profile)
        {
            profile.CreateMap<User, UserProfile>()
                .ForMember(up => up.Roles, cfg => cfg.MapFrom(u => u.Roles.Select(c => c.Role.Name)));
        }
    }
}
