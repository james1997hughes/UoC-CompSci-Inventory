using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMTPConnection.Features.Messaging
{
    public interface IMessageService
    {
        Task SendEmailAsync(
            string fromDisplayName,
            string fromEmailAddress,
            string toName,
            string toEmailAddress,
            string subject,
            string message);

        Task SendEmailToSupport(string subject, string message);

        Task SendExceptionEmailAsync(Exception e, HttpContext context)

        
;    }
}
