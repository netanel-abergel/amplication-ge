using Microsoft.AspNetCore.Mvc;

namespace Service_1.APIs;

[ApiController()]
public class OrdersController : OrdersControllerBase
{
    public OrdersController(IOrdersService service)
        : base(service) { }
}
