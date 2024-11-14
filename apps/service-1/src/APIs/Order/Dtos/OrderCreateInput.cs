namespace Service_1.APIs.Dtos;

public class OrderCreateInput
{
    public DateTime CreatedAt { get; set; }

    public Customer CustomerId { get; set; }

    public string? Id { get; set; }

    public DateTime UpdatedAt { get; set; }
}
