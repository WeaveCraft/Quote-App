using System.Data;
using Npgsql;
using Dapper;
using Microsoft.Extensions.Configuration;
using DataAccess.Context.Interface;


namespace DataAccess.Context;

public class DbContext : IDbContext
{
    private readonly IDbConnection _db;
    public DbContext(IConfiguration configuration)
    {
        _db = new NpgsqlConnection(configuration.GetConnectionString("OPanelDB"));
    }

    public async Task<List<T>> GetAll<T>(string command, object parms)
    {
        List<T> result = new();

        result = (await _db.QueryAsync<T>(command, parms)).ToList();

        return result;
    }

    public async Task<T> GetASync<T>(string command, object parms)
    {
        T result;

        result = (await _db.QueryFirstOrDefaultAsync<T>(command, parms).ConfigureAwait(false));

        return result;

    }
    public async Task<int> EditData(string command, object parms) //Fix so it doesnt return int
    {
        int result;

        result = await _db.ExecuteAsync(command, parms);

        return result;
    }

}
