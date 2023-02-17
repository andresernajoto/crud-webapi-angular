using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CrudApi.Models
{
    public class Contexto : DbContext
    {
        public Contexto(DbContextOptions options) : base(options)
        {
            
        }
        public DbSet<Pessoa> Pessoas { get; set; }
    }
}