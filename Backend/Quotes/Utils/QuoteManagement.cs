using DataAccess.Models;
namespace Web.Backend.Quotes.Utils;

public static class QuoteManagement
{
    public static void SaveToTextFile(QuoteModel quotes)
    {
        string docPath = @"QuotesFile.txt";

        var quote = quotes.Text;

        using (StreamWriter sw = (File.Exists(docPath)) ? File.AppendText(docPath) : File.CreateText(docPath))
        {
            sw.WriteLine(quote);
        }
    }

    public static bool CheckForDuplicated(QuoteModel quote)
    {
        string docPath = @"QuotesFile";

        if (!File.Exists(docPath))
        {
            return false;
        }

        using (StreamReader file = new StreamReader(docPath))
        {
            while (!file.EndOfStream)
            {
                var line = Console.ReadLine();

                if (line == quote.Text)
                {
                    return true;
                }

                return false;
            }
        }

        return false;

    }

    public static void ClearFile()
    {
        string docPath = "QuotesFile.txt";


        if (!File.Exists(docPath))
        {
            Console.WriteLine("Nothing to Delete");
        }


        File.WriteAllText(docPath, String.Empty);

    }
}


