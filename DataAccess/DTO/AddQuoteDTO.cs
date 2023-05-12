namespace DataAccess.DTO;

public class AddQuoteDto
{
    public string Text { get; set; }
    public string Author { get; set; }
    public int Dashboard_Id { get; set; }
    public AddQuoteDto(string text, string author)
    {
        Text = text;
        Author = author;

    }
}