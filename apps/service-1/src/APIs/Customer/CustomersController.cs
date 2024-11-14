using Microsoft.AspNetCore.Mvc;

namespace Service_1.APIs;

[ApiController()]
public class CustomersController : CustomersControllerBase
{
    public CustomersController(ICustomersService service)
        : base(service) { }
}
