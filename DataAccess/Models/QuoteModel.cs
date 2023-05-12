namespace DataAccess.Models;
public class QuoteModel
{
    public int Id { get; set; }
    public string Text { get; set; }
    public string Author { get; set; }
    public int Dashboard_Id { get; set; } = 0;
    public QuoteModel(string text, string author)
    {
        Text = text;
        Author = author;
    }
}