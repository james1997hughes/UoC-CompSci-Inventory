using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Http;
using MimeKit;
using SMTPConnection.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SMTPConnection.Features.Messaging.Email;

namespace SMTPConnection.Features.Messaging
{
    public class MessageService : IMessageService
    {
        private readonly IViewRenderer _viewRenderer;

        public MessageService(IViewRenderer viewRenderer)
        {
            _viewRenderer = viewRenderer;
        }

        public async Task SendEmailAsync(
            string fromDisplayName, 
            string fromEmailAddress, 
            string toName, 
            string toEmailAddress, 
            string subject, 
            string message)
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(fromDisplayName, fromEmailAddress));
            email.To.Add(new MailboxAddress(toName, toEmailAddress));
            email.Subject = subject;

            var body = new BodyBuilder
            {
                HtmlBody = message
            };

            using (var client = new SmtpClient()){
                client.ServerCertificateValidationCallback =
                    (sender, certificate, certChainType, errors) => true;
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                await client.ConnectAsync("smtp.office365.com", 587, true).ConfigureAwait(false);
                await client.AuthenticateAsync("5019TEST@csmb365.onmicrosoft.com", "gs4atbRc").ConfigureAwait(false);
                await client.SendAsync(email).ConfigureAwait(false);
                await client.DisconnectAsync(true).ConfigureAwait(false);

            }
        }

        public async Task SendEmailToSupport(string subject, string message)
        {
            //make a no-reply email address
            await SendEmailAsync("No Reply", "5019TEST@csmb365.onmicrosoft.com", 
                "Support", "C01519@csmb365.onmicrosoft.com", subject, message);
        }

        public async Task SendExceptionEmailAsync(Exception e, HttpContext context)
        {
            var message = _viewRenderer.Render("Features/Messaging/Email/ExceptionEmail", new ExceptionEmailModel(e, context));
            await SendEmailToSupport("Exception", message);
            //I Want this Aysncronous?

        }
    }
}
