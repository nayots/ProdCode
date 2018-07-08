using AutoMapper;

namespace ProdCodeApi.Infrastructure.AutoMapper
{
    public interface IHaveCustomMapping
    {
        void ConfigureMapping(Profile profile);
    }
}