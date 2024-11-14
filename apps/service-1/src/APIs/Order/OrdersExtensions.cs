using Service_1.APIs.Dtos;
using Service_1.Infrastructure.Models;

namespace Service_1.APIs.Extensions;

public static class OrdersExtensions
{
    public static Order ToDto(this OrderDbModel model)
    {
        return new Order
        {
            CreatedAt = model.CreatedAt,
            CustomerId = model.CustomerIdId,
            Id = model.Id,
            UpdatedAt = model.UpdatedAt,
        };
    }

    public static OrderDbModel ToModel(
        this OrderUpdateInput updateDto,
        OrderWhereUniqueInput uniqueId
    )
    {
        var order = new OrderDbModel { Id = uniqueId.Id };

        if (updateDto.CreatedAt != null)
        {
            order.CreatedAt = updateDto.CreatedAt.Value;
        }
        if (updateDto.CustomerId != null)
        {
            order.CustomerIdId = updateDto.CustomerId;
        }
        if (updateDto.UpdatedAt != null)
        {
            order.UpdatedAt = updateDto.UpdatedAt.Value;
        }

        return order;
    }
}
