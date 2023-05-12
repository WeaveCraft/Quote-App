

namespace DataAccess.Context.Interface;
public interface IDbContext
{
    Task<T> GetASync<T>(string command, object parms);
    Task<List<T>> GetAll<T>(string command, object parms);
    Task<int> EditData(string command, object parms);
}