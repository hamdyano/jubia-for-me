using AutoMapper;
using Jubia.API.Models;
using Jubia.API.Resources;  // Updated namespace

namespace Jubia.API
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
        }
    }
}



















/*using AutoMapper;
using Jubia.API.Controllers.Resources;
using Jubia.API.Models;

namespace Jubia.API
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Map from Domain Models to API Resources
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
            
            // Map from API Resources to Domain Models
          
        }
    }
}*/