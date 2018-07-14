using ProdCodeApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProdCodeApi.Services.Contracts
{
    public interface IUserService
    {
        bool UserExists(int id);

        void ToggleAdmin(int? id);

        ICollection<UserAdminViewModel> GetAllMatches(string searchTerm);
    }
}
