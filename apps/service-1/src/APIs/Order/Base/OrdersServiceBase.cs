using Microsoft.EntityFrameworkCore;
using Service_1.APIs;
using Service_1.APIs.Common;
using Service_1.APIs.Dtos;
using Service_1.APIs.Errors;
using Service_1.APIs.Extensions;
using Service_1.Infrastructure;
using Service_1.Infrastructure.Models;

namespace Service_1.APIs;

public abstract class OrdersServiceBase : IOrdersService
{
    protected readonly Service_1DbContext _context;

    public OrdersServiceBase(Service_1DbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Create one order
    /// </summary>
    public async Task<Order> CreateOrder(OrderCreateInput createDto)
    {
        var order = new OrderDbModel
        {
            CreatedAt = createDto.CreatedAt,
            UpdatedAt = createDto.UpdatedAt
        };

        if (createDto.Id != null)
        {
            order.Id = createDto.Id;
        }
        if (createDto.CustomerId != null)
        {
            order.CustomerId = await _context
                .Customers.Where(customer => createDto.CustomerId.Id == customer.Id)
                .FirstOrDefaultAsync();
        }

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        var result = await _context.FindAsync<OrderDbModel>(order.Id);

        if (result == null)
        {
            throw new NotFoundException();
        }

        return result.ToDto();
    }

    /// <summary>
    /// Delete one order
    /// </summary>
    public async Task DeleteOrder(OrderWhereUniqueInput uniqueId)
    {
        var order = await _context.Orders.FindAsync(uniqueId.Id);
        if (order == null)
        {
            throw new NotFoundException();
        }

        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();
    }

    /// <summary>
    /// Find many orders
    /// </summary>
    public async Task<List<Order>> Orders(OrderFindManyArgs findManyArgs)
    {
        var orders = await _context
            .Orders.Include(x => x.CustomerId)
            .ApplyWhere(findManyArgs.Where)
            .ApplySkip(findManyArgs.Skip)
            .ApplyTake(findManyArgs.Take)
            .ApplyOrderBy(findManyArgs.SortBy)
            .ToListAsync();
        return orders.ConvertAll(order => order.ToDto());
    }

    /// <summary>
    /// Meta data about order records
    /// </summary>
    public async Task<MetadataDto> OrdersMeta(OrderFindManyArgs findManyArgs)
    {
        var count = await _context.Orders.ApplyWhere(findManyArgs.Where).CountAsync();

        return new MetadataDto { Count = count };
    }

    /// <summary>
    /// Get one order
    /// </summary>
    public async Task<Order> Order(OrderWhereUniqueInput uniqueId)
    {
        var orders = await this.Orders(
            new OrderFindManyArgs { Where = new OrderWhereInput { Id = uniqueId.Id } }
        );
        var order = orders.FirstOrDefault();
        if (order == null)
        {
            throw new NotFoundException();
        }

        return order;
    }

    /// <summary>
    /// Update one order
    /// </summary>
    public async Task UpdateOrder(OrderWhereUniqueInput uniqueId, OrderUpdateInput updateDto)
    {
        var order = updateDto.ToModel(uniqueId);

        if (updateDto.CustomerId != null)
        {
            order.CustomerId = await _context
                .Customers.Where(customer => updateDto.CustomerId == customer.Id)
                .FirstOrDefaultAsync();
        }

        _context.Entry(order).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Orders.Any(e => e.Id == order.Id))
            {
                throw new NotFoundException();
            }
            else
            {
                throw;
            }
        }
    }

    /// <summary>
    /// Get a customer record for order
    /// </summary>
    public async Task<Customer> GetCustomerId(OrderWhereUniqueInput uniqueId)
    {
        var order = await _context
            .Orders.Where(order => order.Id == uniqueId.Id)
            .Include(order => order.CustomerId)
            .FirstOrDefaultAsync();
        if (order == null)
        {
            throw new NotFoundException();
        }
        return order.CustomerId.ToDto();
    }
}
