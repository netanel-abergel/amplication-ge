using Service_1.Infrastructure;

namespace Service_1.APIs;

public class OrdersService : OrdersServiceBase
{
    public OrdersService(Service_1DbContext context)
        : base(context) { }
}
