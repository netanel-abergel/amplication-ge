using Service_1.Infrastructure;

namespace Service_1.APIs;

public class CustomersService : CustomersServiceBase
{
    public CustomersService(Service_1DbContext context)
        : base(context) { }
}
