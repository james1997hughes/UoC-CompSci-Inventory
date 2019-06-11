using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMTPConnection.Infrastructure
{
    public interface IViewRenderer
    {
        string Render<TModel>(string name, TModel model);
    }
}
